const express             = require('express')
const passportUserRouter  = express.Router()
const bcrypt              = require('bcryptjs')
const passport            = require('passport')

// User model
const UserPassport = require('../../models/userPassport')

// login Page
passportUserRouter.get('/login', (req, res, next) => {
  res.render('passport/login', { title: 'Iron Food Passport' });
});


// register Page
passportUserRouter.get('/register', (req, res, next) => {
  res.render('passport/register', { title: 'Iron Food Passport' });
});

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
    errors.push({ msg: 'Passwords do not match'})
  }

  // check password length
  if(password.length <6 ) {
    errors.push({ msg: 'Password should be at least 6 characters'})
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
    successRedirect: '/tips-detail',
    failureRedirect: '/error',
    // failureFlash: true
  })(req, res, next)
})

// 
module.exports = passportUserRouter