const express = require('express');
const multer = require('multer');
const path = require('path');
const Item = require('../models/Item'); // The Item model to save data

const router = express.Router();

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});

const upload = multer({ storage });

// POST route for reporting a lost item
router.post('/report', upload.single('image'), async (req, res) => {
  try {
    const { description, phoneNumber } = req.body;
    const image = req.file ? req.file.filename : null; // Save the filename of the uploaded image

    const newItem = new Item({ description, phoneNumber, image });
    await newItem.save();

    res.status(200).json({ message: 'Item reported successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while reporting item' });
  }
});

// GET route to fetch all reported lost items
router.get('/search', async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 }); // Sort by most recent
    res.status(200).json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while fetching items' });
  }
});

// Update item status
router.put('/status/:id', async (req, res) => {
  const { status } = req.body;
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.status(200).json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating item status' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
});


module.exports = router;
