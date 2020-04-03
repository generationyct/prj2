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

// user post routes

userRouter.post('/signup', async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    res.status(201).send({ user })

  } catch (err) {
    res.status(400).send({ err })
  }
})

userRouter.post('/login', async (req, res) => {
  try {
      const user = await User.findByCredentials(req.body.email, req.body.password)
      res.send(user)
  } catch (err) {
      res.status(400).send()
  }
})

module.exports = userRouter