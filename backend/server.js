require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const app = express();

// 1. Database Connection (PostgreSQL)
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false } 
}); 

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error("❌ PostgreSQL Connection Error:", err.message);
    } else {
        console.log("✅ PostgreSQL Connected! Server time:", res.rows[0].now);
    }
});

// 2. CORS & Middleware Configuration
app.use(cors({
    origin: ['https://your-portfolio.vercel.app', 'http://localhost:4200'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));

// 3. Multer Setup
const uploadDir = path.resolve(__dirname, 'public', 'resumes');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
        const prefix = file.fieldname === 'photo' ? 'photo' : 'resume';
        cb(null, `${prefix}-${Date.now()}${path.extname(file.originalname)}`);
    }
});
const upload = multer({ storage: storage });

const JWT_SECRET = process.env.JWT_SECRET;

// 4. Auth Middleware
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return next(); 

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return next();
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

// --- ROUTES ---

app.get('/', (req, res) => {
    res.send('Portfolio Backend API is running on PostgreSQL');
});

// Auth / Login
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await pool.query("SELECT * FROM admins WHERE email = $1", [email.trim()]);

        if (result.rows.length === 0) return res.status(401).json({ message: "Invalid credentials" });

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password.trim());

        if (isMatch) {
            const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ token, user: { id: user.id, email: user.email } });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Profile
app.get('/api/profile', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM profile_info LIMIT 1");
        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).json({ message: "No profile data found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/profile/:id', upload.fields([{ name: 'resume', maxCount: 1 }, { name: 'photo', maxCount: 1 }]), async (req, res) => {
    const { id } = req.params;
    const { full_name, current_title, summary, email, phone, address_line_1, address_line_2, city, state, zip_code, experience_years } = req.body;
    const resumeFilename = req.files['resume'] ? req.files['resume'][0].filename : null;
    const photoFilename = req.files['photo'] ? req.files['photo'][0].filename : null;

    try {
        let sql = `UPDATE profile_info SET full_name=$1, current_title=$2, summary=$3, email=$4, phone=$5, address_line_1=$6, address_line_2=$7, city=$8, state=$9, zip_code=$10, experience_years=$11`;
        let values = [full_name, current_title, summary, email, phone, address_line_1, address_line_2, city, state, zip_code, experience_years];
        let idx = 12;

        if (resumeFilename) { sql += `, resume=$${idx++}`; values.push(resumeFilename); }
        if (photoFilename) { sql += `, photo=$${idx++}`; values.push(photoFilename); }

        sql += ` WHERE id=$${idx} RETURNING *`;
        values.push(id);

        const result = await pool.query(sql, values);
        res.status(200).json({ message: "Update Successful", data: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Projects
app.get('/api/projects', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM projects");
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch projects" });
    }
});

app.post('/api/projects', verifyToken, async (req, res) => {
    const { title, company, category, type_class, description, features, link, status } = req.body;
    try {
        const sql = `INSERT INTO projects (title, company, category, type_class, description, features, link, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`;
        const result = await pool.query(sql, [title, company, category, type_class, description, JSON.stringify(features), link, status]);
        res.status(201).json({ id: result.rows[0].id, ...req.body });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Messages
app.post('/api/contact', async (req, res) => {
    const { name, email, phone, message } = req.body;
    try {
        await pool.query("INSERT INTO messages (name, email, phone, message) VALUES ($1, $2, $3, $4)", [name, email, phone, message]);
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_TO,
            subject: `New Contact from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        };
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Data saved and Email sent!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Social Links
app.get('/api/social-links', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM social_links ORDER BY platform_name ASC");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/social-links', verifyToken, async (req, res) => {
    const { profile_id, platform_name, url, icon_class } = req.body;
    try {
        const result = await pool.query("INSERT INTO social_links (profile_id, platform_name, url, icon_class) VALUES ($1, $2, $3, $4) RETURNING id", [profile_id || 1, platform_name, url, icon_class]);
        res.status(201).json({ message: "Link added successfully", id: result.rows[0].id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Final Listener
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
});