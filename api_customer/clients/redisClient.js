const redis = require('redis');

const redisClient = redis.createClient('6379', 'redis');

redisClient.on('error', (err) => {
    console.log('Redis error: ', err);
});

module.exports = redisClient;
