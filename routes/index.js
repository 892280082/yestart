var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/login1', function(req, res, next) {
  res.render('login1');
});

router.get('/login3', function(req, res, next) {
  res.render('login3');
});

router.get('/login4', function(req, res, next) {
  res.render('login4');
});

router.get('/main', function(req, res, next) {
  res.render('main');
});



module.exports = router;
