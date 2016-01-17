var express = require('express');
var router = express.Router();
var Product = require('../../models/product.js');
var Photo = require('../../models/photo.js');
var Article = require('../../models/article.js');
var printService = require("./middleWare");

router.get("/index",function(req,res,next){
	printService.getAllDatas(function(err,datas){
		!err ? res.render("print/index.html",datas) : res.send("system error!");
	});
});

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

module.exports = router;