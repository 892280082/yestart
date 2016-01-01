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

var  Product = mongoose.model("Products", ProductSchema);

module.exports = Product;


