const express = require('express');
const router = express.Router();
const Responses = require('../models/responseModel');

router.post('/', async (req, res) => {
  const { formId, override, responses } = req.body;
  const userId = req.username;
    try {
      const result = await Responses.captureResponses(formId, userId, override, responses);
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
  const userId = req.username;
    try {
      const results = await Responses.getFormResponses(req.params.formId,userId);
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
  const userId = req.username;
    try {
      const responses = await Responses.getFormResponses(req.params.formId,userId);
      res.json({ responses });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error getting responses' });
    }
  });


module.exports = router;