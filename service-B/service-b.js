const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

const port = 3002;

const bills = [
    { subscriber_no: '12345', month: '2024-05', total: 100, paid_status: true }
];

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

app.listen(port, () => {
    console.log(`Service B listening on port ${port}`);
});
