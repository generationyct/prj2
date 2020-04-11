const express = require('express')
const Tip = require('../models/tip')
const User = require('../models/user')
const tipRouter = new express.Router()
const { ensureAuthenticated } = require('../config/auth')

tipRouter.get('/tips', (req, res, next) => {
  Tip.find()
    .then(tipsFromDB => {
      // console.log('Retrieved books from DB:', tipsFromDB);
      res.render('tips', { user: req.user, tips: tipsFromDB });
    })
    .catch(error => {
      console.log('Error while getting the tips from the DB: ', error);
    })
});

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

tipRouter.get('/:tipId', (req, res, next) => {
  res.render('tip-details');
});


tipRouter.get('/tips-detail', (req, res) => {
  res.render('tips-detail')
})

// tipRouter.get('/tips-add', ensureAuthenticated, (req, res) => {
//     res.render('tips-add')
// })

tipRouter.get('/tips-add', (req, res) => {
  res.render('tips-add')
})





module.exports = tipRouter