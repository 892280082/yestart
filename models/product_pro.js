var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pro = new Schema({ 
	name : String,
	Content : String,
	createDate : Date,
	picture : String,
	price : Number,
	unit : String,
});

var  Product = mongoose.model("pros", pro);
module.exports = Product;
