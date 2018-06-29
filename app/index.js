const express = require('express');
const morgan = require('morgan');
const app = express();
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redisClient = require('./clients/redisClient');
// const pgClient = require('./clients/pgClient');

// const REDIS_OPTIONS = {};
const PORT_NUMBER = process.env.PORT_NUMBER || 8080;
const LOG_LEVEL = process.env.LOG_LEVEL || 'combined';

app.use(morgan(LOG_LEVEL));

app.use(session({
    saveUninitialized: true,
    store: new RedisStore({
        client: redisClient
    }),
    secret: 'llamasaurus',
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: true
    }
}));

app.get('/', (req, res) => {
    if (!req.session.count) {
        req.session.count = 0;
    }

    res.send(`current count: ${req.session.count}`);
});

app.get('/add', (req, res) => {
    if (!req.session.count) {
        req.session.count = 0;
    }

    req.session.count++;

    res.send(`count incremented: ${req.session.count}`);
});

app.get('/sub', (req, res) => {
    if (!req.session.count) {
        req.session.count = 0;
    }

    req.session.count--;

    res.send(`count decremented: ${req.session.count}`);
});

app.get('/pg', (req, res) => {
    res.send('do postgres');
});

app.listen(PORT_NUMBER, () => {
    console.log(`Example app listening on port ${PORT_NUMBER}!`);
});

