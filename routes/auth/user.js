const express = require('express')
const User = require('../../models/user')
const auth = require('../../middleware/auth')
const userRouter = new express.Router()

// user routes

userRouter.get('/signup', (req, res) => {
  res.render('auth/signup')
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

module.exports = userRouter