var crypto = require('crypto');
var mongoose = require('mongoose');
var merges = require('../self_modules/merges/merges.js');
//mongoose.connect('mongodb://localhost/yestart');

function user(){
	this.name=String;
	this.sex=String;
	this.email=String;
	this.like=String;
}

var user_Schema = new mongoose.Schema(new user(),{collection:'users'}) ;
var user_Model = mongoose.model('users',user_Schema);
var export_user = merges.create(user,user_Model);
module.exports = export_user;





