var crypto = require('crypto');
var mongoose = require('mongoose');
var merges = require('./merges.js');
mongoose.connect('mongodb://localhost/blog');


function car(){
	this.name=String;
	this.password=String;
	this.email=String;
	this.head=String;
	this.time=Date;
	this.old =Number;
}

var car_Schema = new mongoose.Schema(new car(),{collection:'cars'}) ;
var car_Model = mongoose.model('cars',car_Schema);
var export_car = merges.create(car,car_Model);
module.exports = export_car;


var req = {
	query:{
		head:'http://www.xinlang.com'
	},
	params:{
		_id:'5650011e739ce0cf0239dc33',
		password:'password alery change',
		old:17
	},	
	body:{
		name:'bbbbbb',
		time:'2014-6-7'
	}
}

var car = merges.copy(req,export_car);
//car.save();
/*******update 测试******/
export_car.find({'_id':'5650011e739ce0cf0239dc33'},function(err,docs){
	console.log(docs);
});

merges.update(req,export_car);

export_car.find({'_id':'5650011e739ce0cf0239dc33'},function(err,docs){
	console.log(docs);
});




