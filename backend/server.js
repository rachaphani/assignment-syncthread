const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const users = [{ username: 'admin', password: 'password' }];

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(userreq => userreq.username === username && userreq.password === password);
    if (user) {
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token });
    }
    res.status(401).json({ message: 'Invalid credentials' });
});

const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: 'User not logged in' });
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = decoded;
        next();
    });
};

app.get('/api/dashboard', authenticate, (req, res) => {
    res.json({ cards: [{ id: 1, name: 'Card 1' }, { id: 2, name: 'Card 2' }] });
});

app.get('/api/map', authenticate, (req, res) => {
    res.json({ 20.5937, 78.9629 });
});

app.listen(3000, () => console.log('Server running on port 3000'));
