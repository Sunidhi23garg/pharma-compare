// backend/routes/userRoutes.js

const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming your user model is here

const router = express.Router();

router.get('/user', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from header

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode token
    const user = await User.findById(decoded.userId); // Find user by ID in the token
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user data' });
  }
});

module.exports = router;
