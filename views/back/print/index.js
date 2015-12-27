require("../../public/plugin/util/jsExtend");
require("../../public/bower_components/angular/angular-file-upload.min.js");
var angular = require("angular");
var showCtrl = require("./src/service/showCtrl");
var dataService = require("./src/service/dataService");
var main = require("./src/controller/main");

var app = angular.module('myApp',['angularFileUpload']);

app.directive('tsTool'
,function(){
    return {
        restrict:'EAC',
        templateUrl:'tools'
    }
}).directive('tsList'
,function(){
    return {
        restrict:'EAC',
        templateUrl:'list'
    }
}).directive('tsAdd'
,function(){
    return {
        restrict:'EAC',
        templateUrl:'add'
    }
}).directive('tsProList'
,function(){
    return {
        restrict:'EAC',
        templateUrl:'proList'
    }
}).directive('tsProAdd'
,function(){
    return {
        restrict:'EAC',
        templateUrl:'proAdd'
    }
});


showCtrl(app);
dataService(app);
main(app);



