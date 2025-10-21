const express = require('express');
const { ObjectId } = require('mongodb');
const { verifyToken } = require('../middleware/authMiddleware');
const { client, dbName } = require('../config/db');
const auth = require("../middleware/auth");

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
router.get("/api/passwords", auth, async (req, res) => {
  const passwords = await db.collection("passwords").find({ userId: req.user.id }).toArray();
  res.json(passwords);
});

router.post("/api/passwords", auth, async (req, res) => {
  const { site, username, password } = req.body;
  await db.collection("passwords").insertOne({
    site,
    username,
    password,
    userId: req.user.id
  });
  res.json({ message: "Password added successfully" });
});

router.delete("/api/passwords/:id", auth, async (req, res) => {
  const { ObjectId } = require("mongodb");
  const result = await db.collection("passwords").deleteOne({
    _id: new ObjectId(req.params.id),
    userId: req.user.id
  });

  if (result.deletedCount === 1)
    res.json({ message: "Password deleted" });
  else
    res.status(404).json({ message: "Password not found" });
});

module.exports = router;
