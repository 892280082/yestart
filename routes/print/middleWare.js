var Product = require('../../models/product.js');
var Photo = require('../../models/photo.js');
var Article = require('../../models/article.js');
var Connect = require('../../models/connect.js');

var service = {};
service.getAllDatas = function(callback){
	Product.find(null,function(err,productDocs){
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


module.exports = service;