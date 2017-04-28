adminApp.controller('RootCtrl', ['$scope', '$rootScope', 'common', 'PusherConfig', function ($scope, $rootScope, common, PusherConfig) {
    $rootScope.title = "Welcome Admin - TMS";

    $scope.callBackFunc = function (data) {
        common.flashMsg('success', data.message);
    }

    var isLoggedIn = true;
    if (isLoggedIn) {
        var pusher = common.pusher.init();
        var channel = pusher.subscribe(PusherConfig.channelName);
        channel.bind(PusherConfig.issueRequestEvent, $scope.callBackFunc);
    }

    // Update User Status
    $scope.workerStatus = function (status) {
        angular.element('.userStatus').removeClass('fa-check');
        if (status == 1) {
            angular.element('.available').addClass('fa-check');
            common.flashMsg('success', "Welcome Again...!");
            channel.bind(PusherConfig.issueRequestEvent, $scope.callBackFunc);
        } else {
            angular.element('.busy').addClass('fa-check');
            common.flashMsg("error", "You're now offline. Good Bye.");
            channel.unbind(PusherConfig.issueRequestEvent, $scope.callBackFunc);
        }
    }

    $scope.state = function () {
        alert(pusher.connection.state);
    }
}]);

adminApp.controller('DashboardCtrl', ['$scope', '$rootScope', 'common', function ($scope, $rootScope, common) {
    $rootScope.title = "Admin Dashboard - TMS";
}]);

adminApp.controller('TrackIssueCtrl', ['$scope', '$rootScope', 'common', function ($scope, $rootScope, common) {
    $rootScope.title = "Issue - TMS";

    $scope.issueData = {
        'name': '',
        'email': '',
        'category': '1',
        'description': ''
    };

    // Load Issue Categories
    $scope.categories = [];
    $scope.loadCategories = function () {
        common.http.get('issue/categories').then(
            function (response) {
                response = response.data;
                if (response.status) {
                    $scope.categories = response.categories;
                }
            }, function () {
                // Handle error here
                common.flashMsg('error', 'Categories not found.');
            }
        );
    }
    // Init Categories
    $scope.loadCategories();

    $scope.saveIssue = function () {
        common.http.post('issue/save', $scope.issueData).then(
            function (response) {
                response = response.data;
                if (response.status) {
                    common.flashMsg('success', 'Processing request....')
                    $scope.issueData = {
                        'name': '',
                        'email': '',
                        'category': '1',
                        'description': ''
                    };
                } else {
                    common.flashMsg('error', 'Issue could not be saved.');
                }
            }, function () {
                // Handle Error
                common.flashMsg('error', 'Issue not saved.');
            }
        );
    }


}]);