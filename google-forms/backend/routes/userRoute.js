const express = require('express');
const router = express.Router();
const User = require('../models/userModel');


router.post('/', async (req, res) => {
  try {
    const userId = await User.createUser(req.body);
    res.json({ message: `User created with ID: ${userId}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating user' });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const userId = await User.getUserById(req.params.userId);
    res.json({ userId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting user' });
  }
});

module.exports = router;
