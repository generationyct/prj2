const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
  author: [ { 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  }]
})

const Tip = mongoose.model('Tip', tipSchema)

module.exports = Tip