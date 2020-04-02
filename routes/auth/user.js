const express = require('express')
const User = require('../../models/user')
const auth = require('../../middleware/auth')
const userRouter = new express.Router()

// user routes

userRouter.get('/users', (req, res) => {
  res.send('Hello from the /users route!')
})


userRouter.post('/signup', async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    res.status(201).send({ user })

  } catch (err) {
    res.sendStatus(400).send(err)
  }
})

module.exports = userRouter