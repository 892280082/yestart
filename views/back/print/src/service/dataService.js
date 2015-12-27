module.exports = function(app){
    app.service("dataService",["$http"
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
    }]);
    return app;
}