(function () {
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

        //TODO: sideNav controlling
        //screen size variable
        $scope.screenSize = $scope.$watch(function () {
            return $mdMedia('(min-width: 1610px)');
        }, function (trueOrfalse) {
            console.log("ScreenSize",trueOrfalse);
            return $scope.screenSize = trueOrfalse;
        });

        this.isOpen = false;
        this.hover = false;
        var isOpenRight;

        $scope.buttonSidenav = $scope.$watch(
            function () {
                return $scope.screenSize;
            },
            function (openOrNot) {
                console.log("Nav open?",openOrNot);
                $scope.buttonSidenav = openOrNot;
            });

        $scope.openSidenav = function () {
            $mdSidenav('right').open().then(function (isOpenRight = true) {
                console.log("isOpenRight", isOpenRight);
            });
        };
        $scope.closeSidenav = function () {
            $mdSidenav('right').close().then(function (isOpenRight = false) {
                console.log("isOpenRight", isOpenRight);
                //$scope.isOpenRight = false;
            });
        };

        //TODO: hosting link changing
        $scope.domainname = null;
        var hosting = document.domain;
        $scope.fullDomainName = document.domain;
        console.log("host on",hosting);
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
        //TODO: Read Json data
        if ($scope.domainname !== ('aws' || 'localhost')) {
            var init = function () {
                var hostDataUrl = '/jsonfiles/hosting.json';
                getData.get(hostDataUrl).then(function successCallback(response) {
                    $scope.hostData = response.data;
                    console.log(response.data);
                }), function (response) {
                    //defer.reject('could not find someFile.json');
                    console.log(response.data);
                };
            };
            init();
            $scope.$on('$viewContentLoaded', function () {
                var hostDataUrl = '/jsonfiles/hosting.json';
                getData.get(hostDataUrl).then(function successCallback(response) {
                    $scope.hostData = response.data;
                    console.log(response.data.hostProviders[0]);
                }), function (response) {
                    //defer.reject('could not find someFile.json');
                    console.log(response.data);
                };
                console.log("content loaded", response.data);
            });
        } else {
            console.log("can't accsess files")
        }
    });

    //TODO run the slide show
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

                var extenT = function () {
                    attrs.tabsAutoplay += 5000;
                };

                var cleanup = function () {
                $interval.cancel(tabsAutoplayInterval);
                elm.off('click', cleanup);
                };
                elm.on('click', extenT);
                scope.$on('$destroy', cleanup);
            },
        }
    });

})();

