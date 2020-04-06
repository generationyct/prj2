const mongoose = require('mongoose')

const tipSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  body: {
    type: String,
  },
  comments: [ {
    body: String,
    data: Date
  }],
  date: {
    type: Date,
    default: Date.now
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
})

const Tip = mongoose.model('Tip', tipSchema)

module.exports = Tip