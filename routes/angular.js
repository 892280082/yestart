var express = require('express');
var merges = require('../self_modules/merges/merges.js');
var Student = require('../models/student.js');
var router = express.Router();


/* login page. */


router.get('/*',function(req,res,next){
	console.log("run to this");
	next();
})

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
	var query = merges.getQuery(req,Student,{
		name:'like'
	});
	merges.getPage(query,Student,function(err,data){
		!err ? res.json(data) : res.json({err:true});
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