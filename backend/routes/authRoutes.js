const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { client, dbName } = require('../config/db');

const router = express.Router();

// Signup
router.post(
  '/signup',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

    const { name, email, password } = req.body;
    const db = client.db(dbName);
    const users = db.collection('users');

    try {
      const existing = await users.findOne({ email: email.toLowerCase() });
      if (existing) return res.status(400).json({ success: false, message: 'Email already registered' });

      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await users.insertOne({
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        createdAt: new Date(),
      });

      const token = jwt.sign({ id: result.insertedId, email: email.toLowerCase() }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d',
      });

      res.status(201).json({
        success: true,
        message: 'User created',
        user: { id: result.insertedId, name, email: email.toLowerCase() },
        token,
      });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
);

// Login
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

    const { email, password } = req.body;
    const db = client.db(dbName);
    const users = db.collection('users');

    try {
      const user = await users.findOne({ email: email.toLowerCase() });
      if (!user) return res.status(400).json({ success: false, message: 'Invalid email or password' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ success: false, message: 'Invalid email or password' });

      const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d',
      });

      res.status(200).json({
        success: true,
        message: 'Login successful',
        user: { id: user._id, name: user.name, email: user.email },
        token,
      });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
);

module.exports = router;
