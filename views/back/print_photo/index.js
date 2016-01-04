require("../../public/plugin/util/jsExtend");
var angular = require("angular");
/***加载显示插件****/
require("./src/service/showCtrl");
require("../../lib/src/directive/angular-ueditor.js");
/**加载上传插件*/
require("../../public/bower_components/angular/angular-file-upload.min.js");
/**加载后台数据接口*/
require("./src/service/dataService");
/**加载主程序人口*/
require("./src/controller/main");


var app = angular.module('myApp',['angularFileUpload',
                                  'service.showCtrl',
                                  'service.dataService',
                                  'controller.main']);

app.directive('tsPhotolist'
,function(){
    return {
        restrict:'EAC',
        templateUrl:'photolist'
    }
}).directive('tsCatelist'
,function(){
    return {
        restrict:'EAC',
        templateUrl:'catelist'
    }
}).directive('tsPhotoadd'
,function(){
    return {
        restrict:'EAC',
        templateUrl:'photoadd'
    }
})














