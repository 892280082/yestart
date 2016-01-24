var express = require('express');
var router = express.Router();
var Product = require('../../models/product.js');
var Photo = require('../../models/photo.js');
var Article = require('../../models/article.js');
var printService = require("./middleWare");
var then = require('thenjs');

//主页
router.get("/index",function(req,res,next){
	printService.getAllDatas(function(err,datas){
		!err ? res.render("print/index.html",datas) : res.send("system error!");
	});
});

//产品分类页面
router.get("/product",function(req,res,next){
	printService.getAllDatas(function(err,datas){
		var ranIndex = parseInt(datas.productDocs.length*Math.random());
		if(datas.productDocs[ranIndex]._id == req.query._id){
			ranIndex++;
			ranIndex%=datas.productDocs.length;
		}
		printService.getProById(datas.productDocs[ranIndex]._id,function(err,ranPro){
			datas._id = req.query._id;
			datas._cateId = req.query._cateId;
			datas.ranPro = ranPro;
			!err ? res.render("print/product.html",datas) : res.send("system error!");
		});
	});
});

//产品详情页面
router.get("/proDetail",function(req,res,next){
	printService.getAllDatas(function(err,datas){
		var _id = req.query._id;
		var _cateId = req.query._cateId;
		var _proId = req.query._proId;
		var ranIndex = parseInt(datas.productDocs.length*Math.random());
		if(datas.productDocs[ranIndex]._id == _id){
			ranIndex++;
			ranIndex%=datas.productDocs.length;
		}
		printService.getProById(datas.productDocs[ranIndex]._id,function(err,ranPro){
			printService.getProArray(_id,_cateId,function(err,proArray){
				if(err){
					console.log(err);
				}
				datas.ranPro = ranPro;
				datas._id = _id;
				datas._cateId = _cateId;
				datas._proId = _proId;
				datas.proArray = proArray;
				res.render("print/proDetail.html",datas);
			});
		});
		
	});
});

//获取产品分类数组
router.post("/getProArray",function(req,res,next){
	var searchPojo = req.body.searchPojo;
	printService.getProArray(searchPojo._id,searchPojo._cateId
	,function(err,proArray){
		!err ? res.json(proArray) : res.json(false);
	});
});

//文章详情页面
router.get("/getAirticle",function(req,res){
	then(function(defer){
		printService.getAllDatasByThen(function(err,datas){
			defer(err,datas);
		});
	}).then(function(defer,datas){
		var _id = req.query._id;
		var _typId = req.query._typId;
		Article.getTypeOne(_id,function(err,doc){
			datas.airticle = doc;
			datas._typId = _typId;
			doc.typeArray.forEach(function(air){
				if(air._id == _typId){
					datas.currentAir = air;
				}
			});
			!err ? res.render("print/airticle.html",datas)
	 	 		 : res.send("system error!");
		});
	}).fail(function(defer,err){
		res.send("system error!");
	});
});

//获取文章分类列表
router.post('/getAirTypeArry',function(req,res){
	var searchPojo = req.body.searchPojo;
	console.log(searchPojo);
	Article.getTypeOne(searchPojo._id,function(err,doc){
		!err ? res.json(doc) : res.json(false);
	});
});

//搜索页面
router.post('/getSearch',function(req,res){
	var search = req.body.q;
	then(function(defer){
		printService.getAllDatasByThen(function(err,datas){
			defer(err,datas);
		});
	}).then(function(defer,datas){
		printService.searchAllDatas(search,function(err,data){
			datas.searchData = data;
			!err ? res.render("print/search.html",datas)
	 	 		 : res.send("system error!");
		});
	});
});


module.exports = router;