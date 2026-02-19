const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const knex = require('knex')({
  client: 'mysql2',
  connection: { host: '127.0.0.1', user: 'root', password: '', database: 'angular_portfolio' }
});

const app = express();
app.use(cors()); // Allows Angular to talk to Node
app.use(express.json());

const SECRET_KEY = '038f6b3c5727e8fe22cd96f38a789f786fbcce830e694cadf079a46781c98615fc7ab2e0b39bdc03640a18626cedfbafb80871258b54f10581004ea41daea10d';

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  console.log("--- Request reached INDEX.JS ---");
  console.log("Login attempt for:", email);

  try {
    const user = await knex('admins').where({ email: email.trim() }).first();
    
    if (!user) {
      console.log("❌ User not found in DB");
      return res.status(401).json({ message: 'Invalid credentials 1' }); // Don't use 404 for security
    }

    // DEBUG: Check if we are actually getting a hash
    console.log("Hash from DB:", user.password);
    
    const isMatch = await bcrypt.compare(password, user.password.trim());
    console.log("Match Result:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials 2' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '2h' });
    res.json({ token, name: user.name });

  } catch (err) {
    console.error("🔥 Server Error:", err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.listen(3000, () => console.log('API running on http://localhost:3000'));