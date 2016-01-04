/**
*@version 1.1
*@auther yq
*@work 提供后台数据接口
*/
    angular.module('service.dataService',[]).service("dataService",["$http"
    ,function($http){
        this.getPhotos = function(pojo){
            return $http.post("/back/print/getPhotos",{"searchPojo":pojo});
        },
        this.savePhoto = function(pojo){
            return $http.post("/back/print/savePhoto",{"savePojo":pojo});
        }
    }]);
