var express = require('express');
var Admin = require('../models/admin.js');
var merges = require('../self_modules/merges/merges.js');
var router = express.Router();

/**middleware*/
router.use("/*",function(req,res,next){
  var admin =  req.session.admin;
    console.log("indexjs 8",admin);
    if(!req.session.admin){
        res.render('back/login1');
    }
    next();
});



/* login page. */
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

/** main page*/
router.get('/main', function(req, res, next) {
  res.render('back/main');
});

/**top page*/
router.get('/top', function(req, res, next) {
  res.render('back/top');
});

router.get('/default', function(req, res, next) {
  res.render('back/default');
});

router.get('/computer', function(req, res, next) {
  res.render('back/computer');
});


/** left page*/
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

/**login*/
router.post("/login",function(req,res){
  var admin = merges.copy(req,Admin);
  if(admin.name == "admin" && admin.password == "a12345"){
     console.log("indexjs 105",admin);
      req.session.admin = 123;
      console.log("indexJS 109",req.session.admin);
      res.redirect('/main');
  }else{
      res.redirect('back');
  }
});

module.exports = router;
