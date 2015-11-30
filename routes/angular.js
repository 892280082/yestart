var express = require('express');
var merges = require('../self_modules/merges/merges.js');
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










module.exports = router;