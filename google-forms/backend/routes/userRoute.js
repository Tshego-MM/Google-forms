const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

router.post('/', async (req, res) => {
  try {
    const userId = await User.createUser(req.body);
    res.json({ message: `User created with ID: ${userId}` });
  } catch (error) {
    res.status(500).json({ message: `Error creating user : ${error}` });
  }
});
//Commented out becuase its blocking other end points
// router.get('/:userId', async (req, res) => {
//   try {
//     const userId = await User.getUserById(req.params.userId);
//     res.json({ userId, });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error getting user' });
//   } 
// });


router.get("/testJWT", async(req,res) =>{
  res.send(200);
})

module.exports = router;
