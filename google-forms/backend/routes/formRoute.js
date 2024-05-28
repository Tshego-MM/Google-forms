const express = require('express');
const router = express.Router();
const Form = require('../models/formModel');


router.post('/', async (req, res) => {
    try {
      const responseObject = await Form.createForm(res.body.ownerId,res.body.questions);

      res.json({ message: 'Form created' }); //return a lilnk with formId
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating response' });
    }
  });
  
  router.get('/:formId', async (req, res) => {
    try {
      const responses = await Form.getFormById(req.params.formId);
      res.json({ responses });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error getting responses' });
    }
  });

module.exports = router;