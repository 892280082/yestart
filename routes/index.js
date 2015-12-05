var express = require('express');
var Admin = require('../models/admin.js');
var merges = require('../self_modules/merges/merges.js');
var router = express.Router();

/**middleware*/
router.use("/*",function(req,res,next){
  if(req.baseUrl == "/back/login1" || req.baseUrl == "/back/login"){
      next();
  } else{
      req.session.admin ? next() : res.render('back/login1');
  }
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
      req.session.admin = admin;
      res.send('true');
  }else{
      res.send('false');
  }
});

/*********************后台管理员页面***GET************/
//管理员列表页面
router.get('/adminList',function(req, res, next) {
  res.render('back/admin_manager/list');
});

router.get('/AjAdminList',function(req, res, next) {
  Admin.find(null,function(err,docs){
    console.log(err,docs);
    res.json({admins:docs});
  });
});





//管理员添加页面
router.get('/adminAdd',function(req, res, next) {
  res.render('back/admin_manager/add');
});

//查看
router.get('/detailAdmin',function(req, res, next) {
  var id = req.query.id;
  Admin.findOne({'_id':id},function(err,doc){
    if(err){
      doc = null;
    }
    res.render('back/admin_manager/detail',{
      admin:doc
    })
  });
});

/*********************后台管理员页面***POST************/
//添加
router.post('/doSubAdmin',function(req, res, next) {
    merges.save(req,Admin,function(err){
      !err ? res.send('true'): res.send('false');
    });
});

//删除
router.post('/delAdmin',function(req, res, next) {
  merges.removeById(req,Admin,function(err,doc){
    !err ? res.send('true') : res.send('false');
  });
});

//更新
router.post('/updateAdmin',function(req,res,next){
  merges.updateById(req,Admin,function(err,docs){
      err ? res.send('false') : res.send('true');
  });
});

module.exports = router;
