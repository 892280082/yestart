var express = require('express');
var Admin = require('../../models/student.js');
var merges = require('../../self_modules/merges/merges.js');
var router = express.Router();


//保存学生信息
router.post('/saveStu',function(req,res){
	merges.save(req,Student,function(err,stu){
		!err ? res.json(stu) : res.json({err:true});
	});
});

//查询学生信息  返回：{学生列表+分页对象}
router.post('/stuData',function(req,res){
	var query = merges.getQuery(req,Student,{
		name:'like'
	});
	merges.getPage(query,Student,function(err,data){
		!err ? res.json(data) : res.json({err:true});
	});
});

//删除学生信息
router.post('/removeStu',function(req,res){
	merges.removeById(req,Student,function(err){
		!err ? res.send('true') : res.send('false');
	})
});

//更新学生信息
router.post('/updateStu',function(req,res,next){
	merges.updateById(req,Student,function(err){
		!err ? res.send('true') : res.send('false');
	});
});

router.get('/test',function(req,res){
	res.send("hahaha");
});


module.exports = router;
