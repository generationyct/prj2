const express = require('express')
const passportUserRouter = express.Router()

// login Page
passportUserRouter.get('/login', (req, res, next) => {
  res.render('passport/login', { title: 'Iron Food Passport' });
});


// register Page
passportUserRouter.get('/register', (req, res, next) => {
  res.render('passport/register', { title: 'Iron Food Passport' });
});

// register Post handler
passportUserRouter.post('/register', (req, res) => {
  const { name, email, password, confirmpassword } = req.body
  let errors = []

  // check required fields
  if(!email || !password || confirmpassword) {
    errors.push({ msg: 'Please fill in all required fields'})
  }

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
    res.send('pass registration')
  }

})

module.exports = passportUserRouter