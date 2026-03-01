const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

// On remplace les secrets en dur par des appels aux variables d'environnement
const DB_CONNECTION = process.env.DB_CONNECTION || "mongodb://user:password@localhost:27017/db";
const STRIPE_SECRET_KEY = process.env.STRIPE_KEY || "sk_test_placeholder";
const SENDGRID_API_KEY = process.env.SENDGRID_KEY || "SG.placeholder";
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

app.use(express.json());

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    // Vulnérabilité intentionnelle : identifiants en dur (Section 4 du TP)
    if (username === 'admin' && password === 'admin') { 
        const token = jwt.sign({ username }, JWT_SECRET);
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

app.get('/debug', (req, res) => {
    res.json({
        dbConnection: "HIDDEN_IN_DEBUG", // Sécurité de base
        env: "PRODUCTION_ENV"
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));