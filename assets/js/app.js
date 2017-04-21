// Init Application JS
var App = {
    ajax: {
        init: function () {
            $.ajaxSetup({
                headers: {
                    'X-API-KEY': 'PulSCqMnXGchW0pC0s5o9ngHVTWMeLqk',
                    'Content-Type': 'application/json; charset=utf-8',
                    'Accept': 'application/json, text/javascript'
                }
            });
        },
        get: function (url, beforeSendFn) {
            return $.ajax({
                type: 'GET',
                url: url,
                beforeSend: function () {
                    if (typeof beforeSendFn !== typeof undefined && beforeSendFn !== "") {
                        eval(beforeSendFn)();
                    }
                }
            });
        },
        post: function (url, data, beforeSendFn) {
            return $.ajax({
                type: 'POST',
                url: url,
                data: data,
                beforeSend: function () {
                    if (typeof beforeSendFn !== typeof undefined && beforeSendFn !== "") {
                        eval(beforeSendFn)();
                    }
                }
            });
        }
    }
};