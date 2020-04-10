const express = require('express')
const Tip = require('../models/tips')
const User = require('../models/user')
const tipRouter = new express.Router()
const { ensureAuthenticated } = require('../config/auth')


tipRouter.get('/tips', (req, res) => {
    res.render('tips')
})

tipRouter.get('/tips-detail', (req, res) => {
    res.render('tips-detail')
})

// tipRouter.get('/tips-add', ensureAuthenticated, (req, res) => {
//     res.render('tips-add')
// })

tipRouter.get('/tips-add', (req, res) => {
    res.render('tips-add')
})

tipRouter.post('/tips', (req, res, next) => {
    console.log('Post route triggered');
    const { name, category, description, website, address, imageUrl, date, author } = req.body;
    const newTip = new Tip({ name, category, description, website, address, imageUrl, date, author })
    console.log(Tip);
    newTip.save()
    .then((tip) => {
      res.redirect('/tips');
    })
    .catch((error) => {
      console.log(error);
    })
});

// tipRouter.post('/tips', async (req, res) => {
//     // const tip = new Tip(req.body)
//     // await req.user.populate('tip').execPopulate()
//     // console.log(req.user._id);
//     const tip = new Tip({
//         ...req.body,
//         // author: req.user._id
//     })

//     try {
//         await tip.save()
//         // const token = await user.generateAuthToken()
//         // res.cookie('auth_token', token)
//         res.render('tips')

//     } catch (err) {
//         res.status(400).send({ err })
//     }
// })



module.exports = tipRouter