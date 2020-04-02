const express = require('express')
const userRouter = new express.Router()

// user routes
// userRouter.post('/users', async (req, res) => {
//   const user = new user(req.body)

//   try {
//     await user.save()
//     res.status(201).send({ user })

//   } catch (err) {
//     res.send(400).send(err)
//   }
// })