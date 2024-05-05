// service-a.js
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3001;

app.use(express.json());

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

const users = [
    { subscriber_no: '12345', password: 'password123' }
];

function authenticateUser(subscriber_no, password) {
    const user = users.find(user => user.subscriber_no === subscriber_no && user.password === password);
    return !!user;
}

app.listen(port, () => {
    console.log(`Service A listening on port ${port}`);
});



