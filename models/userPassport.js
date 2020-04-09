const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

const UserPassport = mongoose.model('UserPassport', UserSchema)

module.exports = UserPassport