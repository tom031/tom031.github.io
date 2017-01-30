(function () {
    var app = angular.module('app', ['ngMaterial', 'ngAnimate', 'ngMdIcons', 'ngMessages']);

    //TODO: Get Json File
    app.factory('sendData', function ($http) {
        var sendData = {
            get: function (_url) {
                var req = {
                    method: 'get',
                    url: _url
                }
                return $http(req);
            },
            post: function (_data) {
                var req = {
                    method: "post",
                    data: _data,
                    url: '//formspree.io/' + String.fromCharCode(116, 111, 109, 100, 105, 110, 104, 110, 122) + String.fromCharCode(64) + String.fromCharCode(103, 109, 97, 105, 108) + '.' + String.fromCharCode(99, 111, 109),
                    dataType: "json"
                }
                return $http(req);
            }
        };
        return sendData;
    });

    app.controller('appCtrl', function ($scope, $mdSidenav, $mdMedia, $window, $mdDialog, $mdToast, sendData) {

        //TODO: sideNav controlling
        //screen size variable
        $scope.screenSize = $scope.$watch(function () {
            return $mdMedia('(min-width: 1279px)');
        }, function (trueOrfalse) {
            //("ScreenSize", trueOrfalse);
            return $scope.screenSize = trueOrfalse;
        });

        $scope.client = {};
        $scope.resetClient = angular.copy($scope.client);
        $scope.save = function (valid) {
            if (valid) {
                var clientData = $scope.client;

                sendData.post(clientData).then(function successCallback(response) {
                    //("got it", response.data.next.length);
                    if (response.data.next.length != 0) {
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('Contact sent!')
                                .position('top right')
                                .hideDelay(4000)
                        );
                        var confirm = $mdDialog.confirm()
                            .title('Success!')
                            .textContent('Thank you for contacting me. I will keep in touch with you shortly !.')
                            .ariaLabel('Thanks')
                            .ok('Keep discovering')
                            .cancel('Back to homepage');
                        $mdDialog.show(confirm).then(function () {
                            $scope.client = angular.copy($scope.resetClient);
                            //$window.location.reload();
                        }, function () {
                            $window.location.href = '/';
                        });
                    } else {
                        $window.alert("something was wrong, Please reload your browser!")
                        //("st wrong");
                    }

                    //("st right", response);
                }), function (response) {
                    //("st wrong", response);
                };
            } else {
                //('invalid');
            }
        };


        this.isOpen = false;
        this.hover = false;
        var isOpenRight;

        $scope.buttonSidenav = $scope.$watch(
            function () {
                return $scope.screenSize;
            },
            function (openOrNot) {
                //("Nav open?", openOrNot);
                $scope.buttonSidenav = openOrNot;
            });

        $scope.openSidenav = function () {
            $mdSidenav('right').open().then(function (isOpenRight = true) {
                //("isOpenRight", isOpenRight);
            });
        };
        $scope.closeSidenav = function () {
            $mdSidenav('right').close().then(function (isOpenRight = false) {
                //("isOpenRight", isOpenRight);
                //$scope.isOpenRight = false;
            });
        };

        //TODO: hosting link changing
        $scope.domainname = null;
        var hosting = document.domain;
        $scope.fullDomainName = document.domain;
        //("host on", hosting);
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
                sendData.get(hostDataUrl).then(function successCallback(response) {
                    $scope.hostData = response.data;
                    //(response.data);
                }), function (response) {
                    //defer.reject('could not find someFile.json');
                    //(response.data);
                };
            };
            init();
            $scope.$on('$viewContentLoaded', function () {
                var hostDataUrl = '/jsonfiles/hosting.json';
                sendData.get(hostDataUrl).then(function successCallback(response) {
                    $scope.hostData = response.data;
                    //(response.data.hostProviders[0]);
                }), function (response) {
                    //defer.reject('could not find someFile.json');
                    //(response.data);
                };
                //("content loaded", response.data);
            });
        } else {
            //("can't accsess files")
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


                var cleanup = function () {
                    $interval.cancel(tabsAutoplayInterval);
                    elm.off('click', cleanup);
                };
                elm.on('click', cleanup);
                scope.$on('$destroy', cleanup);
            },
        }
    });

})();

