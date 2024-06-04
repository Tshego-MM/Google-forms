const express = require('express');
const router = express.Router();

router.get("/", (req,res)=>{
    try{
        res.status(200).json({url:process.env.LOGIN_URL});
    }catch(e){
        res.status(400).send(e);
    }
})


module.exports=router