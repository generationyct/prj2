const express             = require('express')
const passportUserRouter  = express.Router()
const bcrypt              = require('bcryptjs')
const passport            = require('passport')
const multer              = require('multer')

// S3 Storage integration
const aws                 = require('aws-sdk')
const multerS3            = require('multer-s3')

const s3 = new aws.S3()

// User and tip model
const UserPassport = require('../../models/userPassport')
const Tip          = require('../../models/tip')


// login Page
passportUserRouter.get('/login', (req, res, next) => {
  res.render('passport/login', { title: 'Iron Food Passport' });
});


// register Page
passportUserRouter.get('/register', (req, res, next) => {
  res.render('passport/register', { title: 'Iron Food Passport' });
});

// Profile Page
passportUserRouter.get('/profile', (req, res, next) => {
  console.log('req.user' + req.user._id)
  Tip.find({author: req.user._id})
  .then(tipsByCurrentUser => {
    console.log(tipsByCurrentUser)
    res.render('user/profile', { title: 'User profile' , user: req.user, tips: tipsByCurrentUser});
  })
});

// Profile Avatar upload max 10MB files
const upload = multer({
    // dest: 'uploads/avatars',
    limits: {
        fileSize: 10000000
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(new Error('Please upload an image file in JPG or PNG format.'))
      }
      cb(undefined, true)
    }
})

passportUserRouter.post('/profile', upload.single('avatar'), async (req, res) => {
  req.user.avatar = req.file.buffer
  await req.user.save()
  Tip.find({author: req.user._id})
  .then(tipsByCurrentUser => {
    console.log(tipsByCurrentUser)
    res.render('user/profile', { title: 'User profile' , user: req.user, tips: tipsByCurrentUser});
  })
})


// route for profile pics

passportUserRouter.get('/users/:id/avatar', async (req, res) => {
  try {
    const user = await UserPassport.findById(req.params.id)

    if (!user || !user.avatar) {
      throw new Error()
    }
    res.set('Content-Type', 'image/jpg')
    res.send(user.avatar)
    } catch (e) {
      res.statu(404).send()
    }
})

// Error page route
passportUserRouter.get('/error', (req, res, next) => {
  res.render('passport/error', { title: 'Iron Food Passport Error' });
});

// register Post handler
passportUserRouter.post('/register', (req, res) => {
  const { name, email, password, confirmpassword } = req.body
  let errors = []

  // check required fields
  // if(!email || !password || confirmpassword) {
  //   errors.push({ msg: 'Please fill in all required fields'})
  // }

  // check passwords match
  if(password !== confirmpassword) {
    res.render('passport/register', { msg: 'Passwords do not match'})
  }

  // check password length
  if(password.length <6 ) {
    // errors.push({ msg: 'Password should be at least 6 characters'})
    res.render('passport/register', { msg: 'Password should be at least 6 characters'})

  }

  if(errors.length > 0) {
    res.send( {
      errors,
      name,
      email,
      password,
      confirmpassword
  })

  }else {
    // Validation passed
    UserPassport.findOne( { email })
      .then(user => {
        if(user) {
          // user exists
          errors.push({ msg: 'Email is already registered'})
          res.render('passport/error', {
            errors,
            name,
            email,
            password,
            confirmpassword
          })
        } else {
          const newUser = new UserPassport({
            name,
            email,
            password
          })


          // Hash Password
          bcrypt.genSalt(10, (err, salt) => 
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if(err) throw err
              // Set password to hash
              newUser.password = hash
              // Save user
              newUser.save()
                .then(user => {
                  console.log(req.flash('success_msg', 'You are now registered and can log in')) 
                  res.redirect('/tips')
                })
                .catch(err => console.log(err))
          }))
        }
      })
  }

})

// Login Handle
passportUserRouter.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/tips',
    failureRedirect: '/error',
    // failureFlash: true
  })(req, res, next)
})

passportUserRouter.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'You are logged out')
  res.redirect('/login')
})

// 
module.exports = passportUserRouter