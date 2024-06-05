var express = require('express');
const db =require("../database/dbinnit")
var router = express.Router();


router.get('/', async function(req, res, next) {
  try{
    res.send("well done, you found the test api");
  }catch(e){
    res.status(500).send(e);
  }
  
});

module.exports = router;
