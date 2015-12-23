var express = require('express');
var merges = require('../../self_modules/merges/merges.js');
var Product = require('../../models/product.js');
var router = express.Router();

//保存产品分类
router.post("/saveTitle",function(req,res,next){
	var pro = new Product(req.body.upPojo);
	pro.typeArray = [];
	pro.save(function(err){
		!err ? res.json(pro) : res.send("false");
	})
});

//获取分类列表
router.post("/getList",function(req,res,next){
	var searchPojo = req.body.searchPojo;
	Product.find(searchPojo,function(err,docs){
		!err ? res.json(docs):res.send("false");
	});
});

//更新
router.post("/updatePro",function(req,res,next){
	var updatePojo = req.body.updatePojo;
	var _id = updatePojo._id;
	Product.update({"_id":_id},{
		title:updatePojo.title,
		show:updatePojo.show,
		picUrl:updatePojo.picUrl,
		sort:updatePojo.sort
	},function(err){
		!err ? res.send("true"):res.send("false");
	})
});

//删除
router.post('/removePro',function(req,res,next){
	Product.remove({"_id":req.body._id},function(err){
		!err ? res.send("true"):res.send("false");
	})
});




module.exports = router;
