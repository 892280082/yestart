module.exports = function(app){
    app.controller('main',['$scope','showCtrl','dataService','FileUploader'
    ,function($scope,showCtrl,dataService,FileUploader){
        /*********************注册**************************/
        $scope.show = showCtrl;
        $scope.show.$regist('list',['tools','list'],true);
        $scope.show.$regist('add',['add']);
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
    }]);
    return app;
}