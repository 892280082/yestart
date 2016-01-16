var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var objectid = require('objectid')


 // mongoose.connect('mongodb://localhost/yestart')

var  pro  =  new  Schema({ 
	name:String,
	content:String,
	createDate:{ type: Date, default: Date.now },
	picture:String,
	price:Number,
	unit:String,
	show:Boolean,
	clickCount:{ type:Number , default:0 }	//点击率
});

var ProductSchema = new Schema({
	title : String,
	show: Boolean,
	picUrl:String,
	sort: {type:Number,default:1},
	typeArray : [{
		'cateName':String,
		'productArray':[pro]
	}]
});


//typeArray 插入数据
ProductSchema.static("pushTypeArray",function(_ProId,typCate,callback){
	typCate._id = objectid();
	this.update(
		{"_id":_ProId},{
			"$push":{"typeArray":typCate}
		},function(err){
			!err ? callback(err,typCate) : callback(err);
		});
});

//typeArray 删除数据
ProductSchema.static("pullTypeArray",function(_id,_cateId,callback){
	this.update({
		"_id":_id,
	},{
		"$pull":{"typeArray":{"_id":_cateId}}
	},function(err,doc){
		callback(err);
	});
});

//productArray 插入数据
ProductSchema.static("pushProductArray",function(_id,_cateId,pojo,callback){
	pojo._id = objectid();
	this.update({
		"_id":_id,
		"typeArray._id":_cateId,
	},{
		"$push":{ "typeArray.$.productArray":pojo}
	},function(err){
		callback(err,pojo);
	})
})
//productArray 更新数据
ProductSchema.static("pullProductArray"
	,function(_id,_cateId,_ProId,callback){
		this.update({
			"_id":_id,
			"typeArray._id":_cateId,
		},{
			"$pull":{ "typeArray.$.productArray" : { "_id": _ProId} }
		},function(err){
			callback(err);
		})
})

//更新 typeArray -> productArray -> pro
ProductSchema.static("editTypeProPro"
	,function(_id,_cateId,product,callback){
		var _ProId = product._id;
		delete product["_id"];
		this.update({
			"_id":_id,
			"typeArray._id":_cateId,
			"typeArray.productArray._id":_ProId
		},{
			"typeArray.$.productArray.$":product
		},function(err,doc){
			if(err) 
				console.log(err);
			callback(err);
		})
});



var  Product = mongoose.model("Products", ProductSchema);

module.exports = Product;


