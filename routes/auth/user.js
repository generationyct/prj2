const express = require('express')
const User = require('../../models/user')
const auth = require('../../middleware/auth')
const userRouter = new express.Router()

// user routes

userRouter.get('/signup', (req, res) => {
  res.render('auth/signup')
})

userRouter.get('/login', (req, res) => {
  res.render('auth/login')
})

userRouter.get('/users', auth, async (req, res) => {
  try {
    const users = await User.find({})
    res.render('auth/users')
  } catch (err) {
    res.status(500).send()
  }
})

// user post routes

userRouter.post('/signup', async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({ user, token })

  } catch (err) {
    res.status(400).send({ err })
  }
})

userRouter.post('/login', async (req, res) => {
  try {
      const user = await User.findByCredentials(req.body.email, req.body.password)
      const token = await user.generateAuthToken()
      res.send( { user })
  } catch (err) {
      res.status(400).send('Login failed')
  }
})

module.exports = userRouter