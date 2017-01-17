var app = angular.module('app', ['ngMaterial', 'ngAnimate', 'ngMdIcons']);
app.controller('appCtrl', function($scope, $mdSidenav) {
});
app.directive('tabsAutoplay', function($interval) {
    return {
        restrict: 'A',
        require: 'mdTabs',
        link: function(scope, elm, attrs, mdTabsCtrl) {
            var defaultDelay = 2000,
                tabsAutoplayDelay = +attrs.tabsAutoplay || defaultDelay;

            var tabsAutoplayInterval = $interval(function() {
                var nextTab;
                for (i = mdTabsCtrl.selectedIndex + 1; i <= mdTabsCtrl.tabs.length; i++) {
                    nextTab = mdTabsCtrl.tabs[i];
                    if (nextTab && (nextTab.scope.disabled !== true)) {
                        return mdTabsCtrl.select(nextTab.getIndex());
                    };
                };
                return mdTabsCtrl.select(0);
            }, tabsAutoplayDelay);

            var cleanup = function() {
                $interval.cancel(tabsAutoplayInterval);
                elm.off('click', cleanup);
            };
            elm.on('click', cleanup);
            scope.$on('$destroy', cleanup);
        },
    }
});
