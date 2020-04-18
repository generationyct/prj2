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
  // picture: {
  //   type: String,
  //   default: 'img/user-1.svg'
  // },
  avatar: {
    type: String,
    default: 'img/user-1.svg',
    required: false
  }
})

const UserPassport = mongoose.model('UserPassport', UserSchema)

module.exports = UserPassport