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
		!err ? res.render("print/product.html",datas) : res.send("system error!");
	});
});

module.exports = router;