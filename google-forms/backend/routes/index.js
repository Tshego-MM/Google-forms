var express = require('express');
const db =require("../database/dbinnit")
var router = express.Router();


router.get('/', async function(req, res, next) {
  try{
    const result=await db.query('SELECT * FROM google_form.forms');
    res.json(result.rows);
  }catch(e){
    res.status(500).send(e);
  }
  
});

module.exports = router;
