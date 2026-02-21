require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Portfolio Backend API is running...');
});

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// 1. CORS & Middleware Configuration
app.use(cors({
   origin: ['https://your-portfolio.vercel.app', 'http://localhost:4200'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());

// Serve the public folder so files are accessible via URL
app.use('/public', express.static(path.join(__dirname, 'public')));

// 2. Multer Setup (Upload to public/resumes)
const uploadDir = path.resolve(__dirname, 'public', 'resumes');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Use the fieldname (resume or photo) to prefix the file
        const prefix = file.fieldname === 'photo' ? 'photo' : 'resume';
        cb(null, `${prefix}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

// 3. Database Connection
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 3306,
});


db.getConnection()
    .then(connection => {
        console.log("✅ Successfully connected to the MySQL database!");
        connection.release();
    })
    .catch(err => {
        console.error("❌ Database connection failed:", err.message);
    });

const JWT_SECRET = process.env.JWT_SECRET;
// 3. Auth Middleware
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // If there is no token, we still call next() to let the request through
    if (!token) {
        console.log("⚠️ No token, but allowing anyway.");
        return next(); 
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log("⚠️ Token invalid, but allowing anyway:", err.message);
            // We don't return a 403 error, we just move to the next function
            return next();
        }
        
        req.user = decoded;
        next();
    });
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAILUSER,
    pass: process.env.MAILKEY
  }
});

app.get('/api/admin/messagesnotreplied', async (req, res) => {
    try {
        // With promise clients, query returns [rows, fields]
        const [rows] = await db.query("SELECT * FROM messages where reply_text is NULL ORDER BY submitted_at DESC");
        res.json(rows);
    } catch (err) {
        console.error("Database Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/api/admin/messages', async (req, res) => {
    try {
        // With promise clients, query returns [rows, fields]
        const [rows] = await db.query("SELECT * FROM messages ORDER BY submitted_at DESC");
        res.json(rows);
    } catch (err) {
        console.error("Database Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.post('/api/admin/reply', async (req, res) => {
    const { id, email, replyText } = req.body;

    try {
        // Save reply to database
        const sql = "UPDATE messages SET reply_text = ?, replied_at = NOW() WHERE id = ?";
        await db.query(sql, [replyText, id]);

        // Send Email via Nodemailer
        const mailOptions = {
            from: 'ravaldivyaks@gmail.com',
            to: email,
            subject: 'Re: Your message from Divya Raval',
            text: replyText
        };

        // If your transporter also uses promises (recommended):
        await transporter.sendMail(mailOptions);
        res.status(200).json({ 
            message: 'Reply saved and email sent successfully',
            success: true 
        });
         
    } catch (err) {
        console.error("Error in reply process:", err);
        res.status(500).json({ error: err.message });
    }
});


app.post('/api/contact', async (req, res) => {
    const { name, email, phone, message } = req.body;

    try {
        // Step 1: Database Insert
        const query = "INSERT INTO messages (name, email, phone, message) VALUES (?, ?, ?, ?)";
        await db.execute(query, [name, email, phone, message]);
        console.log("✅ DB Save Successful");

        // Step 2: Email Send
        const mailOptions = {
            from: process.env.EMAIL_USER, // Gmail usually requires 'from' to be the auth user
            replyTo: email,               // Use this so you can reply to the sender
            to: process.env.EMAIL_TO,
            subject: `New Contact from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`
        };

        await transporter.sendMail(mailOptions);
        console.log("✅ Email Sent Successful");

        res.status(200).json({ message: "Data saved and Email sent!" });

    } catch (error) {
        // This will tell us EXACTLY where it failed
        console.error("❌ ERROR:", error.message);
        
        if (error.code === 'ER_ACCESS_DENIED_ERROR') {
            return res.status(500).json({ error: "Database Auth Failed" });
        }
        
        res.status(500).json({ error: error.message });
    }
});
 app.get('/api/profile', async (req, res) => {
    try {
        const [rows] = await db.execute("SELECT * FROM profile_info LIMIT 1");
        if (rows.length > 0) {
            res.status(200).json(rows[0]);
        } else {
            res.status(404).json({ message: "No profile data found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// UPDATE Profile (The Fixed Route)
 app.put('/api/profile/:id', upload.fields([
    { name: 'resume', maxCount: 1 },
    { name: 'photo', maxCount: 1 }
]), async (req, res) => {
    const { id } = req.params;
    const {
        full_name, current_title, summary, email, phone,
        address_line_1, address_line_2, city, state, zip_code, experience_years
    } = req.body;

    // Access files from the fields object
    const resumeFilename = req.files['resume'] ? req.files['resume'][0].filename : null;
    const photoFilename = req.files['photo'] ? req.files['photo'][0].filename : null;

    try {
        let sql = `UPDATE profile_info SET 
            full_name=?, current_title=?, summary=?, email=?, phone=?, 
            address_line_1=?, address_line_2=?, city=?, state=?, zip_code=?, experience_years=?`;
        
        const values = [
            full_name, current_title, summary, email, phone,
            address_line_1, address_line_2, city, state, zip_code, experience_years
        ];

        // Update resume if uploaded
        if (resumeFilename) {
            sql += `, resume=?`;
            values.push(resumeFilename);
        }

        // Update photo if uploaded
        if (photoFilename) {
            sql += `, photo=?`;
            values.push(photoFilename);
        }

        sql += ` WHERE id=?`;
        values.push(id);

        await db.execute(sql, values);

        res.status(200).json({ 
            message: "Update Successful", 
            resume: resumeFilename,
            photo: photoFilename
        });
    } catch (error) {
        console.error("❌ Update Error:", error.message);
        res.status(500).json({ error: error.message });
    }
});


// app.post('/api/auth/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const [rows] = await db.execute("SELECT * FROM admins WHERE email = ?", [email.trim()]);

//         if (rows.length === 0) return res.status(401).json({ message: "Invalid credentials" });

//         const user = rows[0];
//         const isMatch = await bcrypt.compare(password, user.password.trim());

//         if (isMatch) {
//             const token = jwt.sign(
//                 { id: user.id, email: user.email }, 
//                 JWT_SECRET, 
//                 { expiresIn: '1h' }
//             );
//             res.status(200).json({ token, user: { id: user.id, email: user.email } });
//         } else {
//             res.status(401).json({ message: "Invalid credentials" });
//         }
//     } catch (error) {
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // 1. Check DB
        const [rows] = await db.execute("SELECT * FROM admins WHERE email = ?", [email.trim()]);

        if (rows.length === 0) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const user = rows[0];

        // 2. Check Password
        const isMatch = await bcrypt.compare(password, user.password.trim());

        if (isMatch) {
            // 3. SECURE JWT SIGNING
            // We use process.env directly to ensure it isn't undefined
            const secret = process.env.JWT_SECRET;
            
            if (!secret) {
                console.error("CRITICAL ERROR: JWT_SECRET is missing from .env file!");
                return res.status(500).json({ error: "Server Configuration Error" });
            }

            const token = jwt.sign(
                { id: user.id, email: user.email }, 
                secret, 
                { expiresIn: '1h' }
            );

            res.status(200).json({ token, user: { id: user.id, email: user.email } });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        // Look at your Node.js Terminal window to see this message!
        console.error(">>> [CRITICAL STACK TRACE]:", error); 
    res.status(500).json({ 
        error: "Internal Server Error", 
        details: error.message || "Unknown error" 
    });
    }
});

 
app.get('/api/projects', verifyToken, async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM projects");
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch projects" });
    }
});

app.post('/api/projects', verifyToken, async (req, res) => {
    const { title, company, category, type_class, description, features, link, status } = req.body;
    try {
        const sql = `INSERT INTO projects (title, company, category, type_class, description, features, link, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [title, company, category, type_class, description, JSON.stringify(features), link, status];
        
        const [result] = await db.query(sql, values);
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/projects/:id', verifyToken, async (req, res) => {
    const { title, company, category, type_class, description, features, link, status } = req.body;
    try {
        const sql = `UPDATE projects SET title=?, company=?, category=?, type_class=?, description=?, features=?, link=?, status=? WHERE id=?`;
        const values = [title, company, category, type_class, description, JSON.stringify(features), link, status, req.params.id];

        await db.query(sql, values);
        res.json({ message: 'Project updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/projects/:id', verifyToken, async (req, res) => {
    try {
        await db.query('DELETE FROM projects WHERE id = ?', [req.params.id]);
        res.json({ message: 'Project deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/education', verifyToken, async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM education ORDER BY id ASC");
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch Education" });
    }
}); 

app.get('/api/experiences', verifyToken, async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM professional_experiences ORDER BY period_start DESC");
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch Experiences" });
    }
}); 
app.post('/api/experiences', verifyToken, async (req, res) => {
  
    const { role, company, period_start, period_end, location, description, projects, achievements } = req.body;
    
    try {
        const sql = `INSERT INTO professional_experiences 
        (role, company, period_start, period_end, location, description, projects, achievements) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        
        const values = [
            role, 
            company, 
            period_start, 
            period_end || null, 
            location || 'Remote', 
            description, 
            JSON.stringify(projects), 
            JSON.stringify(achievements)
        ];

        const [result] = await db.query(sql, values);
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (error) {
        console.error("POST Error:", error.message);
        res.status(500).json({ error: error.message });
    }
}); 
app.put('/api/experiences/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const { role, company, period_start, period_end, location, description, projects, achievements } = req.body;

    try {
        const sql = `UPDATE professional_experiences SET 
            role=?, company=?, period_start=?, period_end=?, location=?, 
            description=?, projects=?, achievements=? 
            WHERE id=?`;
        
        const values = [
            role, 
            company, 
            period_start, 
            period_end || null, 
            location, 
            description, 
            JSON.stringify(projects), 
            JSON.stringify(achievements),
            id
        ];

        await db.query(sql, values);
        res.json({ message: 'Experience updated successfully' });
    } catch (error) {
        console.error("PUT Error:", error.message);
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/experiences/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    try {
        const sql = "DELETE FROM professional_experiences WHERE id = ?";
        const [result] = await db.query(sql, [id]);

        if (result.affectedRows > 0) {
            res.json({ message: 'Experience deleted successfully' });
        } else {
            res.status(404).json({ message: 'Experience not found' });
        }
    } catch (error) {
        console.error("DELETE Error:", error.message);
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/social-links', async (req, res) => {
    try {
        const sql = "SELECT * FROM social_links ORDER BY platform_name ASC";
        const [results] = await db.query(sql); // Array destructuring for promises
        res.json(results);
    } catch (err) {
        console.error("❌ SQL Error:", err.message);
        res.status(500).json({ error: err.message });
    }
});
app.post('/api/social-links', verifyToken, async (req, res) => {
    const { profile_id, platform_name, url, icon_class } = req.body;
    try {
        const sql = "INSERT INTO social_links (profile_id, platform_name, url, icon_class) VALUES (?, ?, ?, ?)";
        const [result] = await db.query(sql, [profile_id || 1, platform_name, url, icon_class]);
        res.status(201).json({ message: "Link added successfully", id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.put('/api/social-links/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const { platform_name, url, icon_class } = req.body;
    try {
        const sql = "UPDATE social_links SET platform_name = ?, url = ?, icon_class = ? WHERE id = ?";
        await db.query(sql, [platform_name, url, icon_class, id]);
        res.json({ message: "Link updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.delete('/api/social-links/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    try {
        const sql = "DELETE FROM social_links WHERE id = ?";
        await db.query(sql, [id]);
        res.json({ message: "Link deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => console.log('🚀 Server running on http://localhost:3000'));