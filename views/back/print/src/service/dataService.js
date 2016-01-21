/**
*@version 1.1
*@auther yq
*@work 提供后台数据接口
*/
    angular.module('service.dataService',[]).service("dataService",["$http"
    ,function($http){
        this.saveTitle = function(pojo){
            return $http.post("/back/print/saveTitle",{"upPojo":pojo});
        },
        this.getList = function(search){
            return $http.post("/back/print/getList",{"searchPojo":search});
        },
        this.update = function(pojo){
            return $http.post("/back/print/updatePro",{"updatePojo":pojo});
        },
        this.remove = function(_id){
            return $http.post("/back/print/removePro",{"_id":_id});      
        }
        this.pushTypeArray = function(pojo){
            return $http.post("/back/print/pushTypeArray",{
                "pushPojo":pojo
            });
        },
        this.pullTypeArray = function(search){
            return $http.post("/back/print/pullTypeArray",{
                "pullPojo":search
            });
        },
        this.pushProductArray = function(pojo){
            return $http.post("/back/print/pushProductArray",{
                "upPojo":pojo
            });
        },
        this.pullProductArray = function(pojo){
            return $http.post("/back/print/pullProductArray",{
                "pullPojo":pojo
            });
        };
        this.editTypeProPro = function(pojo){
            console.log(pojo);
            return $http.post("/back/print/editTypeProPro",{
                "editPojo":pojo
            });
        };
    }]);
