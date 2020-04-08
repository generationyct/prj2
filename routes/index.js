const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Iron Food' });
});


router.get('/tips-detail', function(req, res, next) {
  res.render('tips-detail', { title: 'Tips detail' });
});

module.exports = router;
