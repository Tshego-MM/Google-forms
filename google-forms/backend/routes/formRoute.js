const express = require('express');
const router = express.Router();
const Form = require('../models/formModel');

router.post('/create', async (req, res) => {
  const userId = req.username;
    try {
        const questions=req.body.questions;
        const title=req.body.title;
        const description=req.body.description
        const responseObject = await Form.createForm(userId,title,description,questions);
        
        res.status(200).json({ 
            status : responseObject.status,
            formLink : responseObject.formLink });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: `${error}` });
    }
  });
  
  router.get('/:formId', async (req, res) => {
    try {
      const form = await Form.getFormById(req.params.formId);
      res.status(200).json({
        status: 'success',
        formId : req.params.formId, 
        questions : form });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 'error',
        message: 'Error while fetching questions' });
    }
  });

module.exports = router;