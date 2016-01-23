/**
*@work 程序主控制口
*@auther yq
*@version 1.0.1
*/
angular.module("controller.main",[
                                    "ng.ueditor",
                                    'service.analyzeUrl',
                                ])
.controller('main',['$scope','showCtrl','dataService','FileUploader','analyzeUrl'
,function($scope,showCtrl,dataService,FileUploader,analyzeUrl){
    /*********************注册show service**************************/
    $scope.show = showCtrl;
    $scope.show.$regist('catelist',['catelist'],true);
    $scope.show.$regist('photolist',['photolist']);
    $scope.show.$regist('photoadd',['photoadd']);
    /***********************分类列表************************/
    //uploadPojo 
    $scope.photoPojo = {}
    $scope.datas = [];
    
    //获取列表
    dataService.getPhotos(null)
    .success(function(datas){
        if(datas){
            $scope.datas = datas;
        }
    });

    $scope.savePhoto = function(){
         $scope.photoPojo.typeArray = [];
        dataService.savePhoto($scope.photoPojo)
        .success(function(data){
            if(data){
                $scope.datas.push(data);
                $scope.photoPojo = {};
            }else{
                alert("添加错误");
            }
        });
    }

    $scope.removePhoto = function(pojo){
        dataService.removePhoto(pojo._id)
        .success(function(data){
            data ? $scope.datas.remove(pojo) : alert("删除错误");
        });
    }

    /****************************图片列表****************************/
    //转变视图
    $scope.tempPhoto = {};  //Photo
    $scope.upPhoto = {}; //TypeArray
    var uploader = $scope.uploader = new FileUploader({
        url: '/upload',
        alias:'fileName'
    });
    uploader.onAfterAddingFile = function(item) {
       item.upload();
    };
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        $scope.upPhoto.picUrl = response.path;
    };
    $scope.viewPhotolist = function(pojo){
        $scope.tempPhoto = pojo;
        $scope.show.$set("photolist");
    }
    $scope.viewPhotoadd = function(pojo){
        pojo ? $scope.upPhoto = pojo : $scope.upPhoto = {}; 
        $scope.show.$set("photoadd");
    }
    $scope.saveOrUpPhoto =function(){
        var url = $scope.upPhoto.linkUrl;
        if(analyzeUrl.$strict(url)){
            var parObject = analyzeUrl.$parseUrl(url);
            $scope.upPhoto.linkUrl = parObject.pathname + parObject.search;
        }
        if(!$scope.upPhoto._id){
            $scope.upPhoto.linkUrl = 1;
            dataService.push_typeArray(
                $scope.tempPhoto._id,
                $scope.upPhoto)
            .success(function(data){
                if(data){
                    $scope.tempPhoto.typeArray.push(data);
                    $scope.show.$set("photolist");
                }else{
                    alert("添加错误");
                }
            });
        }else{
            dataService.update_typeArray(
                $scope.tempPhoto._id,
                $scope.upPhoto)
            .success(function(data){
                $scope.show.$set("photolist");
                if(!data)
                    alert("更新失败");
            });
        }
    }
    $scope.pull_typeArray = function(pojo){
        dataService.pull_typeArray($scope.tempPhoto._id,pojo._id)
        .success(function(data){
            if(data){
                $scope.tempPhoto.typeArray.remove(pojo);
            }else{
                alert("删除错误");
            }
        })
    }



}]);
