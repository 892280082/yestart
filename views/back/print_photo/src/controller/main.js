/**
*@work 程序主控制口
*@auther yq
*@version 1.0.1
*/
angular.module("controller.main",[
                                    "ng.ueditor"
                                ])
.controller('main',['$scope','showCtrl','dataService','FileUploader'
,function($scope,showCtrl,dataService,FileUploader){
    /*********************注册show service**************************/
    $scope.show = showCtrl;
     $scope.show.$regist('catelist',['catelist'],true);
    $scope.show.$regist('photolist',['photolist']);

    //uploadPojo 
    $scope.photoPojo = {}
    $scope.datas = {};
    
    (function(){
        dataService.getPhotos(null)
        .success(function(datas){
            console.log(datas);
        });
    })();

    $scope.savePhoto = function(){
         $scope.photoPojo.typeArray = [];
        dataService.savePhoto($scope.photoPojo)
        .success(function(msg){
            if(msg) alert("yes");
        });
    }






}]);
