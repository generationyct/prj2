// const express = require('express')
// const User = require('../../models/user')
// const Tip = require('../../models/tips')
// const auth = require('../../middleware/auth')
// const userRouter = new express.Router()

// // user GET routes

// userRouter.get('/signup', (req, res) => {
//   res.render('auth/signup')
// })

// userRouter.get('/login', (req, res) => {
//   res.render('auth/login')
// })

// // user Profile
// userRouter.get('/users/me', auth, async (req, res) => {
//   res.send(req.user)
// })

// // user post routes

// userRouter.post('/signup', async (req, res) => {
//   const user = new User(req.body)

//   try {
//     await user.save()
//     const token = await user.generateAuthToken()
//     res.cookie('auth_token', token)
//     res.render('tips')

//   } catch (err) {
//     res.status(400).send({ err })
//   }
// })

// userRouter.post('/login', async (req, res) => {
//   try {
//       const user = await User.findByCredentials(req.body.email, req.body.password)
//       const token = await user.generateAuthToken()
//       res.cookie('auth_token', token)
//       res.render('tips')
//       // res.status(201).send({ message: "You are now logged in!" })
//   } catch (e) {
//       res.status(400).send()
//   }
// })

// userRouter.post('/logout', auth, async (req, res) => {
//   try {
//       req.user.tokens = req.user.tokens.filter((token) => {
//         return token.token !== req.token
//       })
//       await req.user.save()

//       res.send('You are now logged out!')
//   } catch (err) {
//     res.status(500).send('Something went wrong sorry!')
//   }
// })

// // userRouter.get('/logout', auth, async (req, res) => {
// //   try {
// //       req.logOut()
// //       res.status(200).clearCookie('connect.sid', {
// //         path: '/'
// //       })
// //   } catch (err) {
// //     res.status(500).send('Something went wrong sorry!')
// //   }
// // })


// module.exports = userRouter