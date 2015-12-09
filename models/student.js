var crypto = require('crypto');
var mongoose = require('mongoose');
var merges = require('../self_modules/merges/merges.js');

function student(){
	this.name=String;
	this.password=String;
	this.realName=String;
	this.partment=String;
	this.tel=String;
}

var student_Schema = new mongoose.Schema(new student(),{collection:'students'}) ;
var student_Model = mongoose.model('students',student_Schema);
var export_student = merges.create(student,student_Model);
module.exports = export_student;









