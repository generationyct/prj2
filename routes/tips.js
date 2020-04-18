const express             = require('express')
const Tip                 = require('../models/tip')
const tipRouter           = new express.Router()
const { ensureAuthenticated } = require('../config/auth')
const multer              = require('multer')

// S3 Storage integration
const aws                 = require('aws-sdk')
const multerS3            = require('multer-s3')

const s3 = new aws.S3()

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


// // Tip photo upload max 10MB files
// const tipupload = multer({
//   // dest: 'uploads/avatars',
//   limits: {
//       fileSize: 10000000
//   },
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
//       return cb(new Error('Please upload an image file in JPG or PNG format.'))
//     }
//     cb(undefined, true)
//     // cb(new Error('File must be a image, png, jpg jpeg'))
//     // cb(undefined, true)
//     // cb(undefined, false)
//   }
// })

// Tip photo upload max 10MB files
const tipPhotoUpload = multer({
  // dest: 'uploads/avatars',

  storage: multerS3({
    s3: s3,
    bucket: 'iron-express-files',
    acl: 'public-read',
    key: function(req, file, cb) {
      cb(null, Date.now().toString())
    }
  }),
  limits: {
      fileSize: 10000000
  },
})

tipRouter.post('/tips', ensureAuthenticated, tipPhotoUpload.single('photo'), (req, res, next) => {
  console.log('Post route triggered');
  if (req.file) {
    const tip = new Tip({
      ...req.body,
      author: req.user._id,
      photo: req.file.location
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
});

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

// tip photo upload route
tipRouter.post('/tips/:tipId/edit', tipPhotoUpload.single('photo'), async (req, res, next) => {
console.log('Post tip');
await Tip.updateOne({ _id: req.params.tipId }, { photo: req.file.location })
.catch(error => next(error))
Tip.find({author: req.user._id})
.then(tipsByCurrentUser => {
  console.log(tipsByCurrentUser)
  res.redirect('/profile');
}).catch(error => next(error))
})

// get route for editing a tip
tipRouter.get('/tips/:tipId/edit', (req, res, next) => {
  Tip.findById(req.params.tipId)
  .populate('author')
    .then(theTip => {
      console.log(theTip)
      res.render('tip/edit', { user: req.user, tip: theTip });
    })
    .catch(error => {
      console.log('Error while retrieving tip details: ', error);
    })
});


// post route for deleting a tip
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


// // Tip image upload max 10MB files
// const upload = multer({
//   dest: 'uploads/tips',
//   limits: {
//       fileSize: 10000000
//   },
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
//       return cb(new Error('Please upload a image file'))
//     }
//     cb(undefined, true)
//   }
// })

// // Use post route for uploading tip images
// tipRouter.post('/tip/image', upload.single('tip'), (req, res) => {
//   res.send()
//   })

module.exports = tipRouter