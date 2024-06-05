const express = require('express');
const router = express.Router();

router.get("/testJWT", async(req,res) =>{
  res.send(200);
})

module.exports = router;
