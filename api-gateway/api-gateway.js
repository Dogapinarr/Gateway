// api-gateway.js
const express = require('express');
const jwt = require('jsonwebtoken');
const httpProxy = require('http-proxy');

const app = express();
app.use(express.json());

// Example database
const users = [
    { subscriber_no: '12345', password: 'password123' }
];
const bills = [
    { subscriber_no: '12345', month: '2024-05', total: 100, paid_status: true }
];

function authenticateUser(subscriber_no, password) {
    const user = users.find(user => user.subscriber_no === subscriber_no && user.password === password);
    return !!user;
}

app.post('/v1/login', (req, res) => {
    const { subscriber_no, password } = req.body;

    if (!subscriber_no || !password) {
        return res.status(400).json({ msg: 'subscriber_no or password not provided' });
    }

    if (authenticateUser(subscriber_no, password)) {
        const access_token = jwt.sign({ subscriber_no }, 'secret_key'); // JSON Web Token oluştur
        return res.json({ access_token });
    } else {
        return res.status(401).json({ msg: 'Invalid subscriber_no or password' });
    }
});

const proxy = httpProxy.createProxyServer();
const serviceAUrl = 'http://localhost:3001';
const serviceBUrl = 'http://localhost:3002';


app.get('/v1/query-bill', authenticateToken, (req, res) => {
    const { subscriber_no } = req.user;

    const requested_subscriber_no = req.query.subscriber_no;
    if (requested_subscriber_no && requested_subscriber_no !== subscriber_no) {
        return res.status(400).json({ error: 'Invalid subscriber_no parameter' });
    }

    const month = req.query.month;
    if (!month) {
        return res.status(400).json({ error: 'Month parameter is missing' });
    }

    const bill = bills.find(bill => bill.subscriber_no === subscriber_no && bill.month === month);
    if (!bill) {
        return res.status(404).json({ error: 'Bill not found for the subscriber and month' });
    }

    return res.json(bill);
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, 'secret_key', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API Gateway listening on port ${PORT}`);
});
