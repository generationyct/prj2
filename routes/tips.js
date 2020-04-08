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



module.exports = tipRouter