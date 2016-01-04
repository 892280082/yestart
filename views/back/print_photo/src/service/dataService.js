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
        },
        this.removePhoto = function(_id){
        	return $http.post("/back/print/removePhoto",{"_id":_id});
        },
        this.push_typeArray = function(_id,pojo){
        	var pushPojo = {
        		"_id":_id,
        		"pojo":pojo
        	}
        	return $http.post("/back/print/push_typeArray",{
        		"pushPojo":pushPojo
        	});
        },
        this.update_typeArray = function(_id,pojo){
        	var updatePojo = {
        		"_id":_id,
        		"pojo":pojo
        	}
        	return $http.post("/back/print/update_typeArray",{
        		"updatePojo":updatePojo
        	});
        },
        this.pull_typeArray = function(_id,typeArrayId){
        	var pullPojo = {
        		"_id":_id,
        		"typeArrayId":typeArrayId
        	}
        	return $http.post("/back/print/pull_typeArray",{
        		"pullPojo":pullPojo
        	});
        }
        
    }]);
