var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// mongoose.connect('mongodb://localhost/yestart')

var  pro  =  new  Schema({ 
	name:String,
	content:String,
	createDate:{ type: Date, default: Date.now },
	picture:String,
	price:Number,
	unit:String,
	show:Boolean,
});

var ProductSchema = new Schema({
	title : String,
	show: Boolean,
	sort: Number,
	typeArray : [{
		'cateName':String,
		'productArray':[pro]
	}]
});



var  Product = mongoose.model("Product", ProductSchema);

//id:{type:Schema.Types.ObjectId,ref:"模型名"}

// Product.say("you are my friend");
/**
productCollection = {
	title:String,
	typeArray:[
		{
			'cateName':String
			'show':boolean
			'productArray':[
				{
					_id:ObjectId,
					name:String,
					Content:String,
					createDate:Date,
					picture:String,
					price:Number,
					'show':boolean,
					unit:String,
				}
			]
		}
	]
}
*/

// var p =  new Product({
// 	title:'yinshua',
// 	typeArray:[]
// });
// p.save(function(err){
// 	console.log(err);
// })
// var typecate = {
// 	'cateName':'fffffff',
// 	'productArray':[]
// }

// Product.pushTypeArrayByTitle('yinshua',typecate,function(err){
// 	console.log(err);
// })


// var pojo = {
// 	name:"bbbbb",
// 	Content:"bbbbb",
// 	picture:"aaaaaaaa",
// 	price:17.5,
// 	unit:"ge",
// 	extend:'if i dont show,you were ok'
// } 


// Product.pushProtoArray('yinshua','fffffff',pojo);

// Product.update({
// 		"title":'yinshua',
// 		'typeArray.cateName' : 'fffffff'
// 		},{
// 		"$pull":{  
// 			"typeArray.$.productArray": {
// 				_id:"5671257a486bf7082ef12a3e"
// 			}
// 		}
// 		},function(err){
// 			!err ? console.log("remove ok") : console.log(err);
// 		}
// 	)

// Product.removePro("yinshua","fffffff",'bbbbb',function(err){
// 	console.log(err);
// })


Product.find(function(err,docs){
	// console.log(docs);
	// console.log(docs[0].typeArray);
	var pojo = docs[0];
	var _id = pojo._id;


})

// Product.remove(function(err,docs){
// 	!err ? console.log("remove ok") :
// 	console.log("remove error!");
// })

