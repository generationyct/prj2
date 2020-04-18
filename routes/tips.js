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


// Tip photo upload max 10MB files
const tipupload = multer({
  // dest: 'uploads/avatars',
  limits: {
      fileSize: 10000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image file in JPG or PNG format.'))
    }
    cb(undefined, true)
    // cb(new Error('File must be a image, png, jpg jpeg'))
    // cb(undefined, true)
    // cb(undefined, false)
  }
})

tipRouter.post('/tips', ensureAuthenticated, tipupload.single('photo'), (req, res, next) => {
  console.log('Post route triggered');
  if (req.file) {
    const tip = new Tip({
      ...req.body,
      author: req.user._id,
      photo: req.file.buffer
    })
    tip.save()
    .then((tip) => {
      res.redirect('/tips');
    })
    .catch((error) => {
      console.log(error);
    })
  } else {
    console.log('else triggered')
    const tip = new Tip({
      ...req.body,
      author: req.user._id
    })
    tip.save()
    .then((tip) => {
      res.redirect('/tips');
    })
    .catch((error) => {
      console.log(error);
    })
  }
  // const { name, category, description, website, address, imageUrl, date, author } = req.body;
  // const newTip = new Tip({ name, category, description, website, address, imageUrl, date, author })
  // console.log(Tip);
    // .catch((error) => {
    //   console.log(error);
    // })
});

// route for tip photo

tipRouter.get('/tips/:id/photo', async (req, res) => {
  try {
    const tip = await Tip.findById(req.params.id)

    if (!tip || !tip.photo) {
      throw new Error()
    }
    res.set('Content-Type', 'image/jpg')
    res.send(tip.photo)
    } catch (e) {
      res.statu(404).send()
    }
})


tipRouter.get('/tips/:tipId', (req, res, next) => {
  Tip.findById(req.params.tipId)
  .populate('author')
    .then(theTip => {
      console.log(theTip)
      res.render('tip-details', { user: req.user, tip: theTip });
    })
    .catch(error => {
      console.log('Error while retrieving tip details: ', error);
    })
});

tipRouter.post('/tips/:tipId/delete', function(req, res, next) {
  Tip.findByIdAndDelete({ _id: req.params.tipId }, (err, theTip) => {
    if (err) { return next(err); }

    theTip.remove((err) => {
      if (err) { return next(err); }

      res.redirect('/profile');
    });
  });
});

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