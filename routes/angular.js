var express = require('express');
var merges = require('../self_modules/merges/merges.js');
var Student = require('../models/student.js');
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

/**student list*/
router.get('/student',function(req,res){
	res.render("back/student/list");
});

router.post('/saveStu',function(req,res){
	merges.save(req,Student,function(err,stu){
		!err ? res.json(stu) : res.json({err:true});
	});
});

router.post('/stuData',function(req,res){
	merges.getPage(null,req,Student,function(err,stus,pageInfo){
		!err ? res.json({
			'list':stus,
			'page':pageInfo
		}) : res.json({err:true});
	});
});

router.post('/removeStu',function(req,res){
	merges.removeById(req,Student,function(err){
		!err ? res.send('true') : res.send('false');
	})
});

router.post('/updateStu',function(req,res,next){
	merges.updateById(req,Student,function(err){
		!err ? res.send('true') : res.send('false');
	});
});



module.exports = router;