var app = angular.module('taskApp', []);
app.controller('taskController',['$scope','$http',function($scope,$http){
 $scope.task = [];
 $scope.settask = function(t1){
    // console.log("hlo");
    //$scope.task.push(t1);
    console.log($scope.t1);
    $http({
      method : 'POST',
      url : '/posttask',
      data : $scope.t1
    }).then( function success(response){
      alert('Registered Successfully');
      $scope.t1 = {};
    }, function error(response){
      //console.log("hlo");
      alert('Registration Failed, Please try again');
    });
  }
  //$scope.gettask =function(){
   
  //}
   $http({
       method:'GET',
        url:'/gettasks',
      }).then(function success(response){
      // $scope.task=response.data;
      $scope.data=response.data;
      console.log(response.data);
      alert("Got data");
      },function error(response){
      alert('error occured')
    })
}])