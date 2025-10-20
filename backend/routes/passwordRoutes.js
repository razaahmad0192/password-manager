const express = require('express');
const { ObjectId } = require('mongodb');
const { verifyToken } = require('../middleware/authMiddleware');
const { client, dbName } = require('../config/db');

const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('documents');
  const data = await collection.find({ userId: req.user.id }).toArray();
  res.json(data);
});

router.post('/', verifyToken, async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('documents');
  await collection.insertOne({ ...req.body, userId: req.user.id, createdAt: new Date() });
  res.json({ success: true, message: 'Password saved' });
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection('documents');
    const result = await collection.deleteOne({ _id: new ObjectId(req.params.id), userId: req.user.id });
    if (result.deletedCount === 1)
      res.json({ success: true, message: 'Password deleted successfully' });
    else
      res.status(404).json({ success: false, message: 'Password not found' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
