const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Iron Food' });
});

module.exports = router;
