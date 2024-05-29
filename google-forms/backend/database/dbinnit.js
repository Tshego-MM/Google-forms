const { query } = require('express');
const {Pool} =require('pg');

const pool= new Pool({
    user:"admin",
    password:"super_cool_password",
    host:"localhost",
    port:5432,
    database:"google_form"
})

module.exports={
    query: (text, params) => pool.query(text, params)
}