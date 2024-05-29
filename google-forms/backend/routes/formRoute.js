const express = require('express');
const router = express.Router();
const Form = require('../models/formModel');
const tempUserId = 'e0f1c4d2-1a53-4b61-88f1-7f5e4f1c2f45'

router.post('/create', async (req, res) => {
    try {
        const responseObject = await Form.createForm(tempUserId,req.body);
        
        res.status(200).json({ 
            status : responseObject.status,
            formLink : responseObject.formLink });

    } catch (error) {
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
        message: 'Error getting responses' });
    }
  });

module.exports = router;