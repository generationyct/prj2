const express = require('express')
const passportRouter = express.Router()


passportRouter.get('/', (req, res, next) => {
  // res.send('Hi from the passport route');
  res.render('passport/index', { title: 'Iron Food Passport' });
});

module.exports = passportRouter