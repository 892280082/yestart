/**
*@version 1.1
*@auther yq
*@work 提供后台数据接口
*/
    angular.module('service.dataService',[]).service("dataService",["$http"
    ,function($http){
        this.getArticles = function(pojo){
            return $http.post("/back/print/getArticles",{"searchPojo":pojo});
        },
        this.saveArticle = function(pojo){
            return $http.post("/back/print/saveArticle",{"savePojo":pojo});
        },
        this.removeArticle = function(_id){
        	return $http.post("/back/print/removeArticle",{"_id":_id});
        },
        this.push_typeArray = function(_id,pojo){
        	var pushPojo = {
        		"_id":_id,
        		"pojo":pojo
        	}
        	return $http.post("/back/print/ar_push_typeArray",{
        		"pushPojo":pushPojo
        	});
        },
        this.update_typeArray = function(_id,pojo){
        	var updatePojo = {
        		"_id":_id,
        		"pojo":pojo
        	}
        	return $http.post("/back/print/ar_update_typeArray",{
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
