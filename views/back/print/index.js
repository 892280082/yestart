require("../../public/plugin/util/jsExtend");
var angular = require("angular");

/***加载显示插件****/
require("./src/service/showCtrl");
/**加载ueditor*/
// require("../../public/plugin/ueditor/ueditor.config.js");
// require("../../public/plugin/ueditor/ueditor.all.min.js");
// require("../../public/plugin/ueditor/lang/zh-cn/zh-cn.js");
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
}).directive('tsDealpro'
,function(){
    return {
        restrict:'EAC',
        templateUrl:'dealpro'
    }
}).directive('tsProlist'
,function(){
    return {
        restrict:'EAC',
        templateUrl:'prolist'
    }
}).directive('tsProadd'
,function(){
    return {
        restrict:'EAC',
        templateUrl:'proadd'
    }
});













