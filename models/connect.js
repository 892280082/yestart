var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 // mongoose.connect('mongodb://localhost/yestart')

var ConnectSchema = new Schema({
	name:String,
	tel:String,
	czTel:String,
	QQ:String,
	email:String,
	address:String,
	comAddress:String,
	picUrl:String,
	content:String
});


var Connect = mongoose.model("contents", ConnectSchema);

module.exports = Connect;


