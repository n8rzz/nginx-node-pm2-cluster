const express = require('express');
const pg = require('pg');

const userRouter = express.Router();
const pgOptions = {
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT || 5432,
};
const pool = new pg.Pool(pgOptions);

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);

    process.exit(-1);
});

userRouter.get('/', (req, res, next) => {
    pool.query(`SELECT * FROM customer`)
        .then((result) => res.json({ result: result.rows }))
        .catch((err) => setImmediate(() => { throw err; }));
});

userRouter.get('/:id', (req, res, next) => {
    pool.query(`SELECT * FROM customer WHERE customer_id = $1`, [req.params.id])
        .then((result) => res.json({ result: result.rows }))
        .catch((err) => setImmediate(() => { throw err; }));
});



module.exports = userRouter;
