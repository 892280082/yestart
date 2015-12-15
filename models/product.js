var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/yestart')

var ProductSchema = new Schema({ 
	title : { type : String},
	typeArray : { type : Array }
});

ProductSchema.static('pushTypeArrayByTitle',function(title,pojo,callback){
	this.update({
		'title':title
	},{
		'$push':{
			'typeArray':pojo
		}
	},function(err){
		callback(err);
	})
})

var  Product = mongoose.model("Product", ProductSchema);



// Product.say("you are my friend");
/**
productCollection = {
	title:String,
	typeArray:[
		{
			'cateName':String
			'productArray':[
				{
					id:ObjectId();
					name:String;
					Content:String;
					createDate:Date;
					picture:String;
					price:Number;
					unit:String;
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
var typecate = {
	'cateName':'fffffff',
	'productArray':[]
}



Product.pushTypeArrayByTitle('yinshua',typecate,function(err){
	console.log(err);
})

Product.find(function(err,docs){
	console.log(docs);
})

// Product.remove(function(err,docs){
// 	!err ? console.log("remove ok") :
// 	console.log("remove error!");
// })

