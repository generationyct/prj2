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

module.exports = passportUserRouter