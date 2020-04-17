const express             = require('express')
const Tip                 = require('../models/tip')
const User                = require('../models/user')
const tipRouter           = new express.Router()
const { ensureAuthenticated } = require('../config/auth')
const multer              = require('multer')

tipRouter.get('/tips', (req, res, next) => {
  // console.log(req.user._id);
  Tip.find()
    .then(tipsFromDB => {
      // console.log('Retrieved tips from DB:', tipsFromDB);
      res.render('tips', { user: req.user, tips: tipsFromDB });
    })
    .catch(error => {
      console.log('Error while getting the tips from the DB: ', error);
    })
});

tipRouter.post('/tips', ensureAuthenticated, (req, res, next) => {
  console.log('Post route triggered');
  const tip = new Tip({
    ...req.body,
    author: req.user._id
  })
  // const { name, category, description, website, address, imageUrl, date, author } = req.body;
  // const newTip = new Tip({ name, category, description, website, address, imageUrl, date, author })
  console.log(Tip);
  tip.save()
    .then((tip) => {
      res.redirect('/tips');
    })
    .catch((error) => {
      console.log(error);
    })
});

tipRouter.get('/tips/:tipId', (req, res, next) => {
  Tip.findById(req.params.tipId)
  .populate('author', 'name')
    .then(theTip => {
      console.log(theTip)
      res.render('tip-details', { user: req.user, tip: theTip });
    })
    .catch(error => {
      console.log('Error while retrieving tip details: ', error);
    })
});

//delete tip route
tipRouter.post('/tips/:tipId/delete', async (req, res) => {
  try {
    const task = await Tip.findByIdAndDelete(req.params.tipId)

    if (!tip) {
      res.status(404).send()
    }
    res.send(tip)
  } catch (e) {
    res.status(505).send()
  }
})

tipRouter.get('/tips-detail', (req, res) => {
  res.render('tips-detail', { user: req.user})
})

tipRouter.get('/tips-add', ensureAuthenticated, (req, res) => {
    res.render('tips-add', { user: req.user})
})


// Tip image upload max 10MB files

const upload = multer({
  dest: 'uploads/tips',
  limits: {
      fileSize: 10000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload a image file'))
    }
    
    cb(undefined, true)

    // cb(new Error('File must be a image, png, jpg jpeg'))
    // cb(undefined, true)
    // cb(undefined, false)
  }
})

// Use post route for uploading tip images

tipRouter.post('/tip/image', upload.single('tip'), (req, res) => {
  res.send()
  })

module.exports = tipRouter