var app = angular.module('myApp',["service.pageResult"]);

app.filter(  
    'to_trusted', ['$sce', function ($sce) {  
        return function (text) {  
            return $sce.trustAsHtml(text);  
        }  
    }]  
) ;

app.controller('main',['$scope','dataService','pageResult'
,function($scope,dataService,pageResult){
	dataService.getAircle()
	.success(function(data){
		$scope.airArray = data.typeArray;
		//分页对象,暂时不起作用
		$scope.page = pageResult.$init($scope.airArray,10);
		$scope._currentAir = -1;
		$scope.airArray.forEach(function(air,index){
			if(air._id == globalInfo._typId){
				$scope._currentAir = index;
			}			
		});
		$scope.last = function(){
			if($scope._currentAir > 0)
				$scope._currentAir--;
		}
		$scope.next = function(){
			if($scope._currentAir < $scope.airArray.length)
				$scope._currentAir++;
		}
	});
}]);

app.service('dataService',['$http'
,function($http){
	this.getAircle = function(){
		var searchPojo = {
			"_typId":globalInfo._typId,
			"_id":globalInfo._id
		};
		return $http.post("/print/getAirTypeArry",{"searchPojo":searchPojo});
	};
}]);