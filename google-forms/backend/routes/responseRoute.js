const express = require('express');
const router = express.Router();
const Responses = require('../models/responseModel');
const tempUserId = 'e0f1c4d2-1a53-4b61-88f1-7f5e4f1c2f52'

router.post('/', async (req, res) => {
  const { formId, override, responses } = req.body;
  //const userId = req.user.id;
    try {
      const result = await Responses.captureResponses(formId, tempUserId, override, responses);
      if (result.status === 'warning') {
          res.status(409).json(result);
      } else {
          res.json(result);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating response' });
    }
  });

router.get('/download/:formId', async (req, res) => {
    try {
      const results = await Responses.getFormResponses(req.params.formId);
      const buffer = await Responses.generateExcel(results.formResponses);
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=results.xlsx');
      
      res.send(buffer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error getting responses' });
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