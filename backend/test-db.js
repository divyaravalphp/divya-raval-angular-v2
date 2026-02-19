require('dotenv').config();
const mysql = require('mysql2/promise');

async function testConnection() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME
        });
        console.log("✅ Connection Successful!");
        await connection.end();
    } catch (err) {
        console.error("❌ Connection Failed!");
        console.error("Error Code:", err.code);
        console.error("Message:", err.message);
    }
}

testConnection();