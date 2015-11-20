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

router.get('/right', function(req, res, next) {
  res.render('back/right');
});

router.get('/imgtable', function(req, res, next) {
  res.render('back/imgtable');
});

router.get('/form', function(req, res, next) {
  res.render('back/form');
});

router.get('/imglist', function(req, res, next) {
  res.render('back/imglist');
});

router.get('/imglist1', function(req, res, next) {
  res.render('back/imglist1');
});

router.get('/tools', function(req, res, next) {
  res.render('back/tools');
});

router.get('/filelist', function(req, res, next) {
  res.render('back/filelist');
});

router.get('/tab', function(req, res, next) {
  res.render('back/tab');
});

router.get('/error', function(req, res, next) {
  res.render('back/error');
});



module.exports = router;
