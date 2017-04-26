adminApp.controller('RootCtrl', ['$scope', '$rootScope', 'common', 'PusherConfig', function ($scope, $rootScope, common, PusherConfig) {
    $rootScope.title = "Welcome Admin - TMS";

    $scope.userDetail = {};
    $scope.channelName = null;
    $scope.callBackFunc = function (data) {
        $scope.userDetail = data.user_detail;
        $scope.channelName = "userchannel-" + "-test" + $scope.userDetail.id;
        var msg = 'New issue created by ' + data.user_detail.name + '. Do you want to continue?';
        common.flashMsg('success', msg + "<br /><br /><request-received></request-received>");
    }

    // Is User Logged In, then init Pusher Objects
    var isLoggedIn = true;
    $scope.channel = null;
    if (isLoggedIn) {
        var pusher = common.pusher.init();
        $scope.channel = pusher.subscribe(PusherConfig.channelName);
        $scope.channel.bind(PusherConfig.issueRequestEvent, $scope.callBackFunc);
    }

    // Update User Status
    $scope.workerStatus = function (status) {
        angular.element('.userStatus').removeClass('fa-check');
        if (status == 1) {
            angular.element('.available').addClass('fa-check');
            common.flashMsg('success', "Welcome Again...!");
            $scope.channel.bind(PusherConfig.issueRequestEvent, $scope.callBackFunc);
        } else {
            angular.element('.busy').addClass('fa-check');
            common.flashMsg("error", "You're now offline. Good Bye.");
            $scope.channel.unbind(PusherConfig.issueRequestEvent, $scope.callBackFunc);
        }
    }

    // Check Current State of Pusher
    $scope.state = function () {
        alert(pusher.connection.state);
    }

    $scope.addMessage = function (data) {
        var chatName = 'You';
        var msgFromClass = 'left';
        var msgFromImgClass = 'pull-left';
        var timeClass = 'pull-right';

        // Sending Message - Other
        if (angular.isUndefined(data.self)) {
            //alert('hereee');
            chatName = $scope.userDetail.name;
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
        $scope.msg = '';

        angular.element('#chatItemsParent').animate({scrollTop: angular.element('#chatItems').prop("scrollHeight")}, 500);
    }

    // is Worker received request or not.....!
    $scope.requestReceived = function (receivedOrNot) {
        if (receivedOrNot == 'yes') {

            // Join User Channel
            $scope.userChannel = pusher.subscribe($scope.channelName);

            // Chat Event to Send or Receive Message
            $scope.userChannel.bind('chatMsgtoWorker', $scope.addMessage);

            common.http.post('worker/request/received', {
                user_id: $scope.userDetail.id,
                user_name: $scope.userDetail.name
            }).then(
                function (response) {
                    response = response.data;
                    angular.element('.chat_sidebar').removeClass('hide');
                }, function () {
                    common.flashMsg('error', 'Something went wrong...');
                }
            );
        }
    }

    // Request Received or Not, Confirm Box - Worker
    angular.element(document).on('click', '.confirmRequest', function () {
        $scope.requestReceived(angular.element(this).attr('data-confirm'));
    });


    // Send Message - Module
    $scope.msg = '';
    $scope.sendMsg = function () {
        common.http.post('send/message', {
            channelName: $scope.channelName,
            message: $scope.msg,
            eventName: 'chatMessage'
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
    //common.flashMsg('success', "New Request received" + "<br /><request-received></request-received>");

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