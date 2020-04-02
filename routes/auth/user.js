const express = require('express')
const User = require('../../models/user')
const userRouter = new express.Router()

// user routes

userRouter.get('/users', (req, res) => {
  res.send('Hello from the /users route!')
})


// userRouter.post('/users', async (req, res) => {
//   const user = new user(req.body)

//   try {
//     await user.save()
//     res.status(201).send({ user })

//   } catch (err) {
//     res.send(400).send(err)
//   }
// })

module.exports = userRouter