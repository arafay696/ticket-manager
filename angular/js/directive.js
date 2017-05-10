myApp.directive('toggleChatBox', [function () {
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