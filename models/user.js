const mongoose  = require('mongoose')
const validator = require('validator')
const bcrypt    = require('bcryptjs')
const jwt       = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  name: {
      type: String,
      trim: true,
  },
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

userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, 'thisisironfoodgreatfoodinamsterdam')
  return token
}

// check if the user account trying to login is present

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
      throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      throw new Error('Unable to login')
    }

    return user
}

// hash the plain text password before (pre) saving
userSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10)
  }

  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User