var Product = require('../../models/product.js');
var Photo = require('../../models/photo.js');
var Article = require('../../models/article.js');

var getAllDatas = function(callback){
	Product.find(null,function(err,productDocs){
		if(err){
			console.log(err);
			return callback(err);
		}{
			Photo.find(null,function(err,photoDocs){
				if(err){
					console.log(err);
					return callback(err);
				}{
					Article.find(null,function(err,articleDocs){
						if(err){
							console.log(err);
							return callback(err);
						}{
							var datas = {
								"productDocs":	productDocs,
								"photoDocs":photoDocs,
								"articleDocs":articleDocs
							}
							callback(null,datas);
						}
					});	
				}
			});
		}
	});
}

module.exports = {
	"getAllDatas":getAllDatas
}