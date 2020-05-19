var app = angular.module('birthdayApp', []);
app.controller('birthdayController',['$scope','$http',function($scope,$http){
 $scope.birthdays = [];
 $scope.sendmail = function(birth){
  	console.log('hi');
    //console.log($scope.birth);
    $http({
      method : 'POST',
      url : '/postbirthday',
      data : $scope.birth
    }).then(function success(response){
    	alert('Sent');
     // $scope.birthdays.push(birth);
      //$scope.birth={};
    }, function error(response){
    	alert('Failed, Please try again');
    })
  }
}])