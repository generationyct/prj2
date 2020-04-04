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

userRouter.get('/users/profile', auth, async (req, res) => {
  // res.render('users/profile')
  res.send('Hi from the users/profile')
  // res.send(req.user)
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
      res.send( { user, token })
  } catch (err) {
      res.status(400).send('Login failed')
  }
})

userRouter.post('/logout', auth, async (req, res) => {
  try {
      req.user.tokens = req.user.tokens.filter((token) => {
        return token.token !== req.token
      })
      await req.user.save()

      res.send()
  } catch (err) {
    res.status(500).send('You are loggout!')
  }
})

module.exports = userRouter