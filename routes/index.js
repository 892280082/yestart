var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('back/login', { title: 'Express' });
});

router.get('/login1', function(req, res, next) {
  res.render('back/login1');
});

router.get('/login3', function(req, res, next) {
  res.render('back/login3');
});

router.get('/login4', function(req, res, next) {
  res.render('back/login4');
});

router.get('/main', function(req, res, next) {
  res.render('back/main');
});

router.get('/top', function(req, res, next) {
  res.render('back/top');
});

router.get('/left', function(req, res, next) {
  res.render('back/left');
});

router.get('/index', function(req, res, next) {
  res.render('back/index');
});

router.get('/footer', function(req, res, next) {
  res.render('back/footer');
});




module.exports = router;
