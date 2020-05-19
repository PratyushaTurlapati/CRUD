var app = angular.module('myApp',[]);
app.controller('myController', function($scope){
 $scope.user = [];
  $scope.saveData = function(users){
  		
  		$scope.user.push(users);
  		console.log($scope.users);
  		$scope.users = {};
	}
  $scope.removeData = function($index,users){
		$scope.user.splice($index,1);
    }	
})