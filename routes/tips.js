const express = require('express')
const Tip = require('../models/tips')
const User = require('../models/user')
const auth = require('../middleware/auth')
const tipRouter = new express.Router()


tipRouter.get('/tips', (req, res) => {
    res.render('tips-add')
  })

tipRouter.post('/tips', async (req, res) => {
    // const tip = new Tip(req.body)
    // await req.user.populate('tip').execPopulate()
    // console.log(req.user._id);
    const tip = new Tip({
        ...req.body,
        // author: req.user._id
    })

    try {
        await tip.save()
        // const token = await user.generateAuthToken()
        // res.cookie('auth_token', token)
        res.render('tips')

    } catch (err) {
        res.status(400).send({ err })
    }
})

// tipRouter.get('/tips', async (req, res) => {
//     try {
//         await req.user.populate('tip').execPopulate()
//         res.send(req.user.tip)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

// tipRouter.post('/tips', async (req, res) => {
//     console.log(req.body)
//     const tip = new Tip({
//         ...req.body,
//         author: req.user._id
//     })

//     try {
//         await tip.save()
//         res.status(201).send(tip)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })



// tipRouter.get('/tips/:id', auth, async (req, res) => {
//     const _id = req.params.id

//     try {
//         const tip = await Task.findOne({ _id, owner: req.user._id })

//         if (!tip) {
//             return res.status(404).send()
//         }

//         res.send(tip)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

// tipRouter.patch('/tips/:id', auth, async (req, res) => {
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['title', 'body']
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

//     if (!isValidOperation) {
//         return res.status(400).send({ error: 'Invalid updates!' })
//     }

//     try {
//         const tip = await tip.findOne({ _id: req.params.id, owner: req.user._id})

//         if (!tip) {
//             return res.status(404).send()
//         }

//         updates.forEach((update) => tip[update] = req.body[update])
//         await tip.save()
//         res.send(tip)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })

// tipRouter.delete('/tips/:id', auth, async (req, res) => {
//     try {
//         const tip = await tip.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

//         if (!tip) {
//             res.status(404).send()
//         }

//         res.send(tip)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

module.exports = tipRouter