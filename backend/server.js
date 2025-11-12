const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const multer = require('multer');
const path = require('path');

// Routes
const userRoutes = require('./routes/userRoutes');
const itemRoutes = require('./routes/itemRoutes');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

const upload = multer({ storage: storage });

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// Serve static files (images) from the uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use the user router (signup/login)
app.use('/api/users', userRoutes);

// Use the item router for Lost & Found functionality
app.use('/api/items', itemRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(5000, () => console.log('Server running on port 5000')))
  .catch((err) => console.error('MongoDB connection error:', err));
