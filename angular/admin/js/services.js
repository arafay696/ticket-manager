// Http Request Method
adminApp.factory('common', ['$http', '$timeout', 'PusherConfig', '$compile', function ($http, $timeout, PusherConfig, $compile) {
    return {
        http: {
            post: function (url, data) {
                return $http.post(url, data);
            },
            get: function (url) {
                return $http.get(url);
            },
            put: function (url, data) {

                var putPromise = $http.put(url, data);
                return putPromise;
            },
            delete: function (url) {
                // $http returns a promise
                var getPromise = $http.delete(url);
                // Return the promise to the controller
                return getPromise;
            }
        },
        searchInString: function (find, findFrom) {
            if (findFrom.indexOf(find) <= 0) {
                return false;
            } else {
                return true;
            }
        },
        findByValue: function (input, fieldName, fieldValue) {
            // Find in Array by Value
            var i = 0, len = input.length;
            for (; i < len; i++) {
                if (input[i][fieldName] === fieldValue) {
                    return true;
                }
            }
            return false;
        }, fetchRandom: function () {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < 5; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            return text;
        },
        flashMsg: function (msgType, msg) {
            var change = 'errorMsg';
            switch (msgType) {
                case 'success':
                    change = 'successMsg';
                    break;
                case 'info':
                    change = 'infoMsg';
                    break;
                default:
                    change = 'errorMsg';
                    break;
            }
            $('.flashMsg').addClass(change);
            var ele = $('.' + change);
            ele.empty();
            ele.slideDown('slow');
            $compile(ele.html(msg));
            $timeout(function () {
                ele.slideUp(1000);
                $('.flashMsg').removeClass(change);
            }, 7000);
        },
        resetSessionValues: function (data) {
            return this.http.post('welcome/reset/session', data);
        }, encryptUrlParameter: function (str) {
            return window.btoa(encodeURIComponent(str));
        }, decryptUrlParameter: function (str) {
            return decodeURIComponent(window.atob(str));
        },
        pusher: {
            init: function () {
                // Enable pusher logging - don't include this in production
                Pusher.logToConsole = PusherConfig.log;

                var pusher = new Pusher(PusherConfig.apiKey, {
                    cluster: PusherConfig.clusterName,
                    encrypted: PusherConfig.encrypted
                });

                return pusher;
            }, disconnect: function (pusher) {
                pusher.disconnect();
            }
        }
    }
}]);