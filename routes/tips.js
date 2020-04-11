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

tipRouter.get('/tips/:tipId', (req, res, next) => {
  console.log('The ID from the URL is: ', bookId);
  res.render('tip-details');
});


tipRouter.get('/tips/:tipId', (req, res, next) => {
  Tip.findById(req.params.bookId)
    .then(theTip => {
      res.render('tip-details', { tip: theTip });
    })
    .catch(error => {
      console.log('Error while retrieving tip details: ', error);
    })
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