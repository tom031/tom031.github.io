var app = angular.module('app', ['ngMaterial','ngAnimate']);
app.controller('appCtrl', function ($scope, $mdSidenav) {
$scope.open = 0;
var isShowRightContent = false;
 if (isShowRightContent) {
   $scope.open =1
 } else {
   $scope.open =1
 }
 console.log(isShowRightContent);
});
