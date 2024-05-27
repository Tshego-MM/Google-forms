const { query } = require('express');
const {Pool} =require('pg');

const pool= new Pool({
    user:"postgres_admin",
    password:"magical_password",
    host:"localhost",
    port:5432,
    database:"google forms"
})

module.exports={
    query: (text, params) => pool.query(text, params)
}