var express = require('express');
var merges = require('../../self_modules/merges/merges.js');
var Product = require('../../models/product.js');
var Photo = require('../../models/photo.js');
var Article = require('../../models/article.js');
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

//添加组别
router.post("/pushTypeArray",function(req,res){
	var pushPojo = req.body.pushPojo;
	Product.pushTypeArray(pushPojo._id,pushPojo.pojo,function(err,pojo){
		!err ? res.json(pojo) : res.json(false);
	});
});

//删除组别
router.post("/pullTypeArray",function(req,res){
	var pullPojo = req.body.pullPojo;
	Product.pullTypeArray(pullPojo._id,pullPojo._cateId,function(err){
		!err ? res.json(true) : res.json(false);
	});
});

router.post("/pushProductArray",function(req,res){
	var upPojo  = req.body.upPojo;
	Product.pushProductArray(upPojo._id,upPojo._cateId,upPojo.pojo,
		function(err,pojo){
		!err ? res.json(pojo) : res.json(false);
		});
});

router.post("/pullProductArray",function(req,res){
	var pullPojo = req.body.pullPojo;
	Product.pullProductArray(pullPojo._id,pullPojo._cateId,pullPojo._productId
		,function(err){
			!err ? res.json(true) : res.json(false);
		})
});

router.post("/editTypeProPro",function(req,res){
	var editPojo = req.body.editPojo;
	Product.editTypeProPro(editPojo._id,editPojo._cateId,editPojo.pojo
		,function(err){
			!err ? res.json(true) : res.json(false);
		})
});

router.post("/savePhoto",function(req,res){
	var photo = new Photo(req.body.savePojo);
	photo.save(function(err){
		!err ? res.json(photo) : res.json(false);
	});
});

router.post("/getPhotos",function(req,res){
	Photo.find(req.body.searchPojo,function(err,docs){
		!err ? res.json(docs) : res.json(false);
	});
});

router.post("/removePhoto",function(req,res){
	var _id = req.body._id;
	Photo.remove({"_id":_id},function(err,info){
		!err ? res.json(true) : res.json(false);
	});
});

router.post("/push_typeArray",function(req,res){
	var pushPojo = req.body.pushPojo;
	Photo.push_typeArray(pushPojo._id,pushPojo.pojo
	,function(err,info,pojo){
		!err ? res.json(pojo) : res.json(false);
	});
});


router.post("/update_typeArray",function(req,res){
	var updatePojo = req.body.updatePojo;
	Photo.update_typeArray(updatePojo._id,updatePojo.pojo
	,function(err,info){
		!err ? res.json(true):res.json(false);
	});
});

router.post("/pull_typeArray",function(req,res){
	var pullPojo = req.body.pullPojo;
	Photo.pull_typeArray(pullPojo._id,pullPojo.typeArrayId
	,function(err,info){
		!err ? res.json(true):res.json(false);
	});
});

router.post("/getArticles",function(req,res){
	Article.find(req.body.searchPojo,function(err,docs){
		!err ? res.json(docs) : res.json(false);
	});
});

router.post("/saveArticle",function(req,res){
	var article = new Article(req.body.savePojo);
	article.save(function(err){
		!err ? res.json(article) : res.json(false);
	});
});

router.post("/removeArticle",function(req,res){
	var _id = req.body._id;
	Article.remove({
		'_id':_id
	},function(err,info){
		!err ? res.json(info) : res.json(false);
	});
});
















module.exports = router;
