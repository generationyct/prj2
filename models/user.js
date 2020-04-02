const mongoose  = require('mongoose')
const validator = require('validator')
const bcrypt    = require('bcryptjs')
const jwt       = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Email is invalid')
        }
      }
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password may not contain "password"')
      }
    }
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User