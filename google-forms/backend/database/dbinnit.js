const { query } = require('express');
const {Pool} =require('pg');

const pool= new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    // ssl: {
    //     rejectUnauthorized: false
    // },
    ssl:false
})

pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    console.log('Database connected successfully');
    release();
});

module.exports={
    query: (text, params) => pool.query(text, params),
    connect: () => pool.connect()
}