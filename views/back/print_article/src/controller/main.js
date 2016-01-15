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
    $scope.show.$regist('articlelist',['articlelist']);
    $scope.show.$regist('articleadd',['articleadd']);
    /***********************分类列表************************/
    //uploadPojo 
    $scope.articlePojo = {
        "picture":true
    }
    $scope.datas = [];
    
    //获取列表
    dataService.getArticles(null)
    .success(function(datas){
        if(datas){
            $scope.datas = datas;
        }
    });

    $scope.saveArticle = function(){
         $scope.articlePojo.typeArray = [];
        dataService.saveArticle($scope.articlePojo)
        .success(function(data){
            if(data){
                $scope.datas.push(data);
                $scope.articlePojo = {};
            }else{
                alert("添加错误");
            }
        });
    }

    $scope.removeArticle = function(pojo){
        dataService.removeArticle(pojo._id)
        .success(function(data){
            data ? $scope.datas.remove(pojo) : alert("删除错误");
        });
    }

    /****************************图片列表****************************/
    //转变视图
    $scope.temparticle = {};  //article
    $scope.uparticle = {}; //TypeArray
    var uploader = $scope.uploader = new FileUploader({
        url: '/upload',
        alias:'fileName'
    });
    uploader.onAfterAddingFile = function(item) {
       item.upload();
    };
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        $scope.uparticle.picUrl = response.path;
    };
    $scope.viewArticlelist = function(pojo){
        $scope.temparticle = pojo;
        $scope.show.$set("articlelist");
    };
    $scope.viewArticleadd = function(pojo){
        pojo ? $scope.uparticle = pojo : $scope.uparticle = {};
        $scope.show.$set("articleadd");
    };
    $scope.saveOrUparticle =function(){
        $scope.uparticle.typeArray = [];
        if(!$scope.uparticle._id){
            dataService.push_typeArray(
                $scope.temparticle._id,
                $scope.uparticle)
            .success(function(data){
                if(data){
                    data.createDate = new Date();
                    $scope.temparticle.typeArray.push(data);
                    $scope.show.$set("articlelist");
                }else{
                    alert("添加错误");
                }
            });
        }else{
            dataService.update_typeArray(
                $scope.temparticle._id,
                $scope.uparticle)
            .success(function(data){
                $scope.show.$set("articlelist");
                if(!data)
                    alert("更新失败");
            });
        }
    }
    $scope.pull_typeArray = function(pojo){
        dataService.pull_typeArray($scope.temparticle._id,pojo._id)
        .success(function(data){
            if(data){
                $scope.temparticle.typeArray.remove(pojo);
            }else{
                alert("删除错误");
            }
        })
    }



}]);
