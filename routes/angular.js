var express = require('express');
var merges = require('../self_modules/merges/merges.js');
var User = require('../models/user.js');
var router = express.Router();


/* login page. */
router.get('/cached', function(req, res, next) {
  res.render('angular/cached');
});

router.get('/self_cached', function(req, res, next) {
  res.render('angular/self_cached');
});

router.get('/data', function(req, res, next) {
	res.send('今天天气好啊');
});

/**resource*/
router.get('/resource_a7_7', function(req, res, next) {
  res.render('angular/resource_a7_7');
});

router.get('/data/info', function(req, res, next) {
	var action = req.query.action;
		var array = [
			{name:'aa',score:50,sex:'man'},
			{name:'aa',score:50,sex:'man'},
			{name:'aa',score:50,sex:'man'}
		]
		res.send(array);
});

router.post('/data/info', function(req, res, next) {
	res.send(0);
});

/**promise*/
router.get('/promise', function(req, res, next) {
	res.render('angular/promise');
});

router.get('/data/async', function(req, res, next) {
	res.send('天气冷冷,哈哈哈哈');
});

router.post('/data/async', function(req, res, next) {
	if(req.body._id == '1'){
		res.send('发送正确');
	}else{
		res.send('发送失败');
	}
});

/**指令*/
router.get('/ng',function(req,res){
	res.render('angular/ng');
});

/**创穿表单*/
router.post('/postUser',function(req,res,next){
	merges.save(req,User,function(err,user){
		!err ? res.json(user) : res.send('error');
	});
});

router.post('/getUsers',function(req,res,next){
	merges.getPage(null,req,User,function(err,docs){
		!err ? res.json(docs) : res.json([]);
	});
});

router.post('/removeUser',function(req,res,next){
	merges.removeById(req,User,function(err){
		!err ? res.send('true'):res.send('false');
	});
});













module.exports = router;