const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tipSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  category: { type: String, 
    enum: ['Coffee', 'Lunch', 'Snacks', 'Dinner'] 
  },
  description: {
    type: String,
  },
  website: {
    type: String,
  },
  address: {
    type: String,
  },
  imageUrl: {
    type: String,
    default: 'img/cat_lunch.png'
  },
  date: {
    type: Date,
    default: Date.now
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'UserPassport'
  }
})

const Tip = mongoose.model('Tip', tipSchema)

module.exports = Tip