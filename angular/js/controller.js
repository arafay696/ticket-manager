myApp.controller('RootCtrl', ['$scope', '$rootScope', 'common', 'PusherConfig', '$route', function ($scope, $rootScope, common, PusherConfig, $route) {
    $rootScope.title = "Welcome - TMS";

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

    // Call Back function for Request Respond,
    // When worker receive and accept Request
    $scope.callBackFunc = function (data) {
        common.flashMsg('success', data.message);
        angular.element('.chat_sidebar').removeClass('hide');
    }

    // Init Pusher
    $scope.pusher = common.pusher.init();

    // Add Message to Chat Box
    $scope.yourName = 'Help Desk';
    $scope.addMessage = function (data) {
        var chatName = 'You';
        var msgFromClass = 'left';
        var msgFromImgClass = 'pull-left';
        var timeClass = 'pull-right';

        // Sending Message - Other
        if (angular.isUndefined(data.self)) {
            chatName = $scope.yourName;
            msgFromClass = 'right';
            msgFromImgClass = 'pull-right';
            timeClass = '';
        }

        var chatHtml = '<li class="' + msgFromClass + ' clearfix"> <span class="chat-img ' + msgFromImgClass + '">' +
            '<img src="http://placehold.it/50/55C1E7/fff" alt="User Avatar" class="img-circle">' +
            '</span> <div class="chat-body clearfix"> <div class="header">' +
            '<strong class="primary-font">' + chatName + '</strong>' +
            '<small class="' + timeClass + ' text-muted"> <i class="fa fa-clock-o fa-fw"></i> 12 mins ago' +
            '</small> </div> <p>&nbsp;' + data.message + '</p> </div> </li>';
        angular.element('.chatBody').append(chatHtml);
        // Reset Input Box...
        $scope.msg = '';

        // Scroll to Last New Msg...
        angular.element('#chatItemsParent').animate({scrollTop: angular.element('#chatItems').prop("scrollHeight")}, 500);
    }

    // Save Issue and Request to Workers
    $scope.channelName = null;
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

                    $scope.channelName = 'userchannel-' + "-test" + response.user_detail;

                    // Subscribe Channel b/w User and Worker
                    var channel = $scope.pusher.subscribe('userchannel-' + "-test" + response.user_detail);
                    channel.bind('requestProcessed', $scope.callBackFunc);

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

    // Send Message - Module
    $scope.msg = "";
    $scope.sendMsg = function () {
        common.http.post('send/message', {
            channelName: $scope.channelName,
            message: $scope.msg,
            eventName: 'chatMsgtoWorker'
        }).then(
            function (response) {
                response = response.data;
                $scope.addMessage({message: $scope.msg, self: true});
            }, function () {
                common.flashMsg('error', 'Something went wrong...');
            }
        );
    }

    angular.element('.textMsg').keypress(function (e) {
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            $scope.sendMsg();
        }
    });
}]);

myApp.controller('DashboardCtrl', ['$scope', '$rootScope', 'common', function ($scope, $rootScope, common) {
    $rootScope.title = "Dashboard - TMS";
}]);

myApp.controller('TrackIssueCtrl', ['$scope', '$route', '$rootScope', 'common', 'PusherConfig', function ($scope, $route, $rootScope, common, PusherConfig) {
    $rootScope.title = "Issue - TMS";

}]);