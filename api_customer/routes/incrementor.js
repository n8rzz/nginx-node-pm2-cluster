const express = require('express');

const incrementorRoutes = express.Router();

incrementorRoutes.get('/', (req, res) => {
    if (!req.session.count) {
        req.session.count = 0;
    }

    res.send(`current count: ${req.session.count}`);
});

incrementorRoutes.get('/add', (req, res) => {
    if (!req.session.count) {
        req.session.count = 0;
    }

    req.session.count++;

    res.send(`count incremented: ${req.session.count}`);
});

incrementorRoutes.get('/sub', (req, res) => {
    if (!req.session.count) {
        req.session.count = 0;
    }

    req.session.count--;

    res.send(`count decremented: ${req.session.count}`);
});

module.exports = incrementorRoutes;
