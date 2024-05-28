const express = require('express');
const router = express.Router();
const Responses = require('../models/responseModel');


router.post('/', async (req, res) => {
    try {
      const responseObject = await Responses.captureResponses(req.body.formId,req.body);
      const resp = Responses.sendVerificationLink(responseObject.email);

      res.json({ message: 'Check your email for verification' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating response' });
    }
  });
  
  router.get('/:formId', async (req, res) => {
    try {
      const responses = await Responses.getFormResponses(req.params.formId);
      res.json({ responses });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error getting responses' });
    }
  });

module.exports = router;