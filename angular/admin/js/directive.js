adminApp.directive('sideMenuAnimate', [function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            //$(elem).metisMenu();
        }
    };
}]);

adminApp.directive('toggleChatBox', [function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            angular.element(elem).click(function () {
                $('#chatItemsParent').slideToggle(400, 'swing', function () {
                    if ($('#chatBoxFooter').is(":visible")) {
                        $('#chatBoxFooter').addClass('hide');
                        angular.element(elem).children('.fa').addClass('fa-window-maximize').removeClass('fa-window-minimize');
                    } else {
                        $('#chatBoxFooter').removeClass('hide');
                        angular.element(elem).children('.fa').addClass('fa-window-minimize').removeClass('fa-window-maximize');
                    }
                });
            });
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