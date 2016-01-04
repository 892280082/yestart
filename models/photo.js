var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var objectid = require('objectid');
//mongoose.connect('mongodb://localhost/yestart')

var photo = new  Schema({ 
	name:String,
	picUrl:String,
	show:Boolean,
	content:String
});

 var PhotoSchema = new Schema({
 	cate:String,   //kh  zj sb
 	edit:Boolean,
	typeArray : [photo]
});

 PhotoSchema.static("push_typeArray",function(_id,pojo,cb){
 	this.update({
 		"_id":_id
 	},{
 		"$push":{ "typeArray" : pojo }
 	},function(err,info){
 		cb(err,info);
 	});
 });

 var  Photo = mongoose.model("photos", PhotoSchema);

module.exports = Photo;




