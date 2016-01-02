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
    /*********************注册**************************/
    $scope.show = showCtrl;
    $scope.show.$regist('list',['tools','list'],true);
    $scope.show.$regist('add',['add']);
    $scope.show.$regist('dealpro',['dealpro']);
    $scope.show.$regist('prolist',['prolist']);
    $scope.show.$regist('proadd',['proadd']);
    
    //替换变量和点击变化效果
    $scope.temp = null;
    $scope.li_click = function(index,pojo){
        $scope.focus = index;
        $scope.temp = pojo;
    }
    /*********************add 上传方法**************************/
    $scope.upPojo = {};
    var uploader = $scope.uploader = new FileUploader({
        url: '/upload',
        alias:'fileName'
    });
    uploader.onAfterAddingFile = function(item) {
       item.upload();
    };
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        $scope.upPojo.picUrl = response.path;
        $scope.pushProductPojo.pojo.picture = response.path;
    };
    /************************数据层************************/
    $scope.save = function(){
        if(!$scope.upPojo._id){
            dataService.saveTitle($scope.upPojo).success(function(data){
                 $scope.datas.push(data);
            });
        }else{
            dataService.update($scope.upPojo).success(function(data){
               if(data!="true") alert("更新出错");
            });
        }
        $scope.show.$set('list');
    }
    //数据获取
    dataService.getList(null).success(function(data){
        $scope.datas = data;
    });
    //删除
    $scope.remove = function(pojo){
        dataService.remove(pojo._id).success(function(data){
            if(data == "true"){
                $scope.datas.remove(pojo);
            }
        });
        $scope.temp = null;
    }
    //排序
    $scope.doSort = function(pojo,number){
        pojo.sort+=number;
        dataService.update(pojo).success(function(data){
        });
    }
    //产品列表
    $scope.typeArray = [];
    $scope._pushTypePojo = {
        "_id":"",
        "pojo":{
            "cateName":"",
            "productArray":[]
        }
    };
    $scope.showTypeArray = function(cate){
        $scope._pushTypePojo._id = cate._id;
        $scope.typeArray = cate.typeArray;
    }
    $scope.removeCate = function(type){
        var pojo = {
            "_id":$scope._pushTypePojo._id,
            "_cateId":type._id
          }
          dataService.pullTypeArray(pojo)
          .success(function(msg){
            if(msg){
                $scope.typeArray.remove(type);
            }else{
                console.log("删除错误");
            }
          });
    }
    $scope.addTypeCate = function(){
        dataService.pushTypeArray($scope._pushTypePojo)
        .success(function(data){
            if(data){
                $scope.typeArray.push(data);
                $scope._pushTypePojo.pojo.cateName = "";
            }
        });
    }

    $scope.toTypeArray = function(proType){
             $scope.pushProductPojo._cateId = proType._id;
             $scope.tempProType = proType;
             $scope.show.$set('prolist')
    }

    /******************详细产品信息*****************/
    $scope.tempProType = {};

    $scope.pushProductPojo = {
        "_id":"",
        "_cateId":"",
        "pojo":{}
    }
    //保存产品
    $scope.saveDealPro = function(){    //保存产品信息
        $scope.pushProductPojo._id = $scope._pushTypePojo._id;
        dataService.pushProductArray($scope.pushProductPojo)
        .success(function(data){
            if(data){
                $scope.tempProType.productArray.push(data);
                $scope.show.$set("prolist");
                $scope.pushProductPojo.pojo = {};
            }
        })
    }
    //删除产品
    $scope.pullProductArray = function(product){
        var pullPojo ={
            "_id":$scope._pushTypePojo._id,
            "_cateId":$scope.pushProductPojo._cateId,
            "_productId":product._id,
        }
        dataService.pullProductArray(pullPojo)
        .success(function(data){
            if(data){
                $scope.tempProType.productArray.remove(product);
            }{
                console.log("删除错误");
            }
        });
    }
    //修改产品
    $scope.editProduct = function(product){
        $scope.pushProductPojo.pojo = product;
        $scope.show.$set("proadd");
    }


}]);
