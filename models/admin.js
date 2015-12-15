var crypto = require('crypto');
var mongoose = require('mongoose');
var merges = require('../self_modules/merges/merges.js');

function admin(){
	this.name=String;
	this.password=String;
	this.realName=String;
	this.partment=String;
	this.tel=String;
}

var admin_Schema = new mongoose.Schema(new admin(),{collection:'admins'}) ;
var admin_Model = mongoose.model('admins',admin_Schema);
var export_admin = merges.create(admin,admin_Model);
module.exports = export_admin;



// var req = {
// 	query:{
// 		head:'http://www.baidu.com'
// 	},
// 	param:{
// 		password:'passw0rd',
// 		old:17
// 	},	
// 	body:{
		
// 		email:'892323@qq.com',
// 		name:'andel',
// 		time:'2014-12-1'
// 	}
// }

// var admin = merges.copy(req,export_admin);
// export_admin.find(null,function(err,docs){
// 	console.log(docs);
// });

// var query = {
// 	name:'shitailong'
// }
// admin.save(function(err){
// });


// export_admin.find({
// },function(err,doc){
// 	console.log(err,doc);
// });





