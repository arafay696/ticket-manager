adminApp.controller('RootCtrl', ['$scope', '$rootScope', 'common', function ($scope, $rootScope, common) {
    $rootScope.title = "Welcome - TMS";

    var isLoggedIn = true;
    if (isLoggedIn) {
        $rootScope.pusher = common.pusher.init();
        var channel = $rootScope.pusher.subscribe('my-channel');
        channel.bind('my-event', function (data) {
            common.flashMsg('success', data.message);
        });
    }
}]);

adminApp.controller('DashboardCtrl', ['$scope', '$rootScope', 'common', function ($scope, $rootScope, common) {
    $rootScope.title = "Dashboard - TMS";

    $scope.workerStatus = function (status) {
        if (status == 'available') {
            $rootScope.pusher = common.pusher.init();
        } else {
            common.pusher.disconnect($rootScope.pusher);
        }
    }

    $scope.state = function () {
        alert($rootScope.pusher.connection.state);
    }
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