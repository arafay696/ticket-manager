adminApp.directive('sideMenuAnimate', [function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            //$(elem).metisMenu();
        }
    };
}]);

adminApp.directive('requestReceived', ['$compile', function ($compile) {
    return {
        restrict: "EA",
        template: '<button data-confirm="yes" class="btn btn-primary confirmRequest" ng-click="requestReceived(1)">Yes</button>&nbsp;<button data-confirm="no" class="btn btn-danger confirmRequest" ng-click="requestReceived(0)">No</button>',
        link: function (scope, elem, attrs) {
            scope.$watch(function () {
                return scope.$eval(attrs.bindHtmlCompile);
            }, function (value) {
                elem.html(value);
                $compile(elem.contents())(scope);
            });

            scope.requestReceived = function (receivedOrNot) {
                alert(receivedOrNot);
            }
        }
    };
}]);