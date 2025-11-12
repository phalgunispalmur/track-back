const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  description: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  image: { type: String, default: null },
  status: {
    type: String,
    enum: ['Collected', 'Not Collected'],
    default: 'Not Collected'
  }
}, { timestamps: true }
);


const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
