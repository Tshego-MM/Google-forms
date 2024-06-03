const express = require('express');
const router = express.Router();
const Form = require('../models/formModel');

router.post('/create', async (req, res) => {
  const userId = req.username;
    try {
        const responseObject = await Form.createForm(userId,req.body);
        
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