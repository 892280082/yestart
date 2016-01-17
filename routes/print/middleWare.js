var Product = require('../../models/product.js');
var Photo = require('../../models/photo.js');
var Article = require('../../models/article.js');
var Connect = require('../../models/connect.js');

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
		console.log(doc);
		callback(null,doc);
	});
}


module.exports = service;