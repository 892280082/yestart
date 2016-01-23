var Product = require('../../models/product.js');
var Photo = require('../../models/photo.js');
var Article = require('../../models/article.js');
var Connect = require('../../models/connect.js');
var then = require('thenjs');

var service = {};
//获取product所有的数据，不包括子产品。
service.getAllDatas = function(callback){
	Product.find(null,{ 
		"typeArray.productArray":0
	},function(err,productDocs){
		if(err){
			console.log(err);
			return callback(err);
		}else{
			Photo.find(null,function(err,photoDocs){
				if(err){
					console.log(err);
					return callback(err);
				}else{
					Article.find(null,function(err,articleDocs){
						if(err){
							console.log(err);
							return callback(err);
						}else{
							Connect.findOne(null,function(err,connectInfo){
								if(err){
									console.log(err);
								}
								var datas = {
									"productDocs":	productDocs,
									"photoDocs":photoDocs,
									"articleDocs":articleDocs,
									"connectUs":connectInfo
								}
							callback(null,datas);
							});
						}
					});	
				}
			});
		}
	});
}

//随机获取一个分类的子产品 @param _id id值  count返回的数量
service.getProById = function(_id,callback){
	Product.findOne({"_id":_id},function(err,doc){
		if(err){
			console.log(err);
			return callback(err);
		}
		callback(null,doc);
	});
}

//根据_id和_cateId获取productArray信息
service.getProArray = function(_id,_cateId,callback){
	Product.findOne({
		"_id":_id
		},{
		"typeArray":{"$elemMatch":{ "_id":_cateId }}
		},function(err,doc){
		if(err){
			console.log(err);
			return callback(err);
		}
		var proArray = doc.typeArray[0].productArray;
		proArray.forEach(function(pro){
			pro._parentId = {
				_id:_id,
				_cateId:_cateId
			};
		});
		callback(null,proArray);
	});
}

//根据thenjs库重写getAllDatas方法
service.getAllDatasByThen = function(callback){
	var deferParam = {
		"productDocs":null,
		"photoDocs":null,
		"articleDocs":null,
		"connectUs":null
	};
	then(function(defer){
		Product.find(null,{"typeArray.productArray":0},function(err,docs){
			deferParam.productDocs = docs;
			defer(err,deferParam);
		})
	})
	.then(function(defer,deferParam){
		Photo.find(null,function(err,docs){
			deferParam.photoDocs = docs;
			defer(err,deferParam);
		});
	})
	.then(function(defer,deferParam){
		Article.find(null,function(err,docs){
			deferParam.articleDocs = docs;
			defer(err,deferParam);
		});
	})
	.then(function(defer,deferParam){
		Connect.findOne(null,function(err,doc){
			deferParam.connectUs = doc;
			callback(err,deferParam);
		});
	})
	.fail(function(defer,err){
		console.log(err);
		callback(err);
	});
}



module.exports = service;