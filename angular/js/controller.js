myApp.controller('RootCtrl', ['$scope', '$rootScope', 'common', 'PusherConfig', function ($scope, $rootScope, common, PusherConfig) {
    $rootScope.title = "Welcome - TMS";
}]);

myApp.controller('DashboardCtrl', ['$scope', '$rootScope', 'common', function ($scope, $rootScope, common) {
    $rootScope.title = "Dashboard - TMS";
}]);

myApp.controller('TrackIssueCtrl', ['$scope', '$route', '$rootScope', 'common', 'PusherConfig', function ($scope, $route, $rootScope, common, PusherConfig) {
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

    //$scope.pusher = common.pusher.init();
    $scope.callBackFunc = function (data) {
        common.flashMsg('success', data.message);
    }

    // Init Pusher
    $scope.pusher = common.pusher.init();

    // Add Message to Chat Box
    $scope.addMessage = function (data) {
        alert(data.message);
    }

    // Save Issue and Request to Workers
    $scope.saveIssue = function () {
        common.http.post('issue/save', $scope.issueData).then(
            function (response) {
                response = response.data;
                if (response.status) {
                    common.flashMsg('success', 'Processing request....');
                    $scope.issueData = {
                        'name': '',
                        'email': '',
                        'category': '1',
                        'description': ''
                    };

                    var channel = $scope.pusher.subscribe('userchannel-' + "-test" + response.user_detail);
                    channel.bind('requestProcessed', function (data) {
                        common.flashMsg('success', data.message);
                    });

                    // Chat Event to Send or Receive Message
                    channel.bind('chatMessage', $scope.addMessage);

                    // Reload Route to Reset Form
                    $route.reload();
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