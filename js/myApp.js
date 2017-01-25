var app = angular.module('app', ['ngMaterial', 'ngAnimate', 'ngMdIcons']);
//TODO: Get Json File
app.factory('getData', function ($http) {
    return {
        get: function (_url) {
            var req = {
                method: 'get',
                url: _url
            };
            return $http(req);
        }
    }
});
app.controller('appCtrl', function ($scope, $mdSidenav, $log, $mdMedia, getData) {
    //TODO: hosting link changing
    $scope.domainname = null;
    var hosting = document.domain;    
    if (hosting.match(/github/gi)) {
        return $scope.domainname = 'github';
    }
    else if (hosting.match(/azure/gi)) {
        return $scope.domainname = 'azure';
    }
    else if (hosting.match(/aws|amazon/gi)) {
        return $scope.domainname = 'aws';
    }
    else ($scope.domainname = 'localhost');

    //test hosting
    //--
  //  $scope.domainname1 = null;
  //  var hosting1 = 'tom031.github.io';
  //  if (hosting1.match(/github/gi)) {
  //      return $scope.domainname1 = 'github';
  //  }
  //  else if (hosting1.match(/azurewebsites/gi)) {
 //       return $scope.domainname1 = 'azure';
  //  }
  //  else if (hosting1.match(/aws|amazon/gi)) {
  //      return $scope.domainname1 = 'aws';
  //  }
  //  else ($scope.domainname1 = 'github');
//--

    //TODO: sideNav controlling
    this.isOpen = false;
    this.hover = false;
    var isOpenRight;

    $scope.buttonSidenav = $scope.$watch(
        function () {
            return $mdMedia('gt-md');
        },
        function (openOrNot) {
            $scope.buttonSidenav = openOrNot;
        });
    $scope.openSidenav = function () {
        $mdSidenav('right').open().then(function (isOpenRight = true) {
            $log.debug("close RIGHT is done");
            console.log("true isOpenRight", isOpenRight);
        });
    };
    $scope.closeSidenav = function () {
        $mdSidenav('right').close().then(function (isOpenRight = false) {
            $log.debug("close RIGHT is done");
            console.log("false isOpenRight", isOpenRight);
            //$scope.isOpenRight = false;
        });

    };

    //TODO: Read Json data
    var hostDataUrl = '/data/hosting.json';
    getData.get(hostDataUrl).then(function successCallback(response) {
        $scope.hostData = response.data.hostProviders;
        //console.log(response.data.hostProviders[0]);
    }), function (response) {
        defer.reject('could not find someFile.json');
    };
});
app.directive('tabsAutoplay', function ($interval) {
    return {
        restrict: 'A,E',
        require: 'mdTabs',
        link: function (scope, elm, attrs, mdTabsCtrl) {
            var defaultDelay = 2000,
                tabsAutoplayDelay = +attrs.tabsAutoplay || defaultDelay;

            var tabsAutoplayInterval = $interval(function () {
                var nextTab;
                for (i = mdTabsCtrl.selectedIndex + 1; i <= mdTabsCtrl.tabs.length; i++) {
                    nextTab = mdTabsCtrl.tabs[i];
                    if (nextTab && (nextTab.scope.disabled !== true)) {
                        return mdTabsCtrl.select(nextTab.getIndex());
                    };
                };
                return mdTabsCtrl.select(0);
            }, tabsAutoplayDelay);

            var cleanup = function () {
                $interval.cancel(tabsAutoplayInterval);
                elm.off('click', cleanup);
            };
            elm.on('click', cleanup);
            scope.$on('$destroy', cleanup);
        },
    }
});
