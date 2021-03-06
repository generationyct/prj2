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
  },
  avatar: {
    type: String,
    required: false,
    default: '/img/user-1.svg'
  }
})

const UserPassport = mongoose.model('UserPassport', UserSchema)

module.exports = UserPassport