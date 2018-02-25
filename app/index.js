const express = require('express');
const app = express();
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
// const redisClient = require('./db/redisClient');
const redis = require('redis');

// create redis client
const redisClient = redis.createClient('6379', 'redis');

redisClient.on('error', (err) => {
    console.log('Redis error: ', err);
});

const REDIS_OPTIONS = {};
const PORT_NUMBER = process.env.PORT_NUMBER || 8080;

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

    req.session.count++

    return res.send(`current count: ${req.session.count}`);
});

app.listen(PORT_NUMBER, () => {
    console.log(`Example app listening on port ${PORT_NUMBER}!`);
})

