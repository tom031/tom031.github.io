var app = angular.module('app', ['ngMaterial']);
app.controller('appCtrl', function ($scope, $mdSidenav) {
    $scope.hi = "Hello";
    var hi2 = "hello";
    console.log(hi2);
})
;
