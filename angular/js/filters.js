// Format Datetime
wifiportal.filter('formatDateWithTime', function () {

    function formatTime(formatToTime, returnType) { // birthday is a date

        if (typeof (formatToTime) == "undefined" || formatToTime === null) {
            return '';
        }

        var today = null;
        var t = formatToTime.split(/[- :]/);
        var currentTime = new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5]);
        var Month = new Array("Jan", "Feb", "Mar",
            "Apr", "May", "June", "July", "Aug", "Sept",
            "Oct", "Nov", "Dec");
        var Suffix = new Array("th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th");
        var day = currentTime.getDate();
        var month = currentTime.getMonth();
        var year = currentTime.getFullYear();
        if (day % 100 >= 11 && day % 100 <= 13) {
            today = day + "th";
            today = day;
        } else {
            today = day + Suffix[day % 10];
            today = day;
        }

        var hours = currentTime.getHours();
        var minutes = currentTime.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;

        today = (today < 10) ? "0" + today : today;
        var chk = {
            day: today,
            month: Month[month],
            year: year,
            hours: hours,
            minutes: minutes,
            ampm: ampm
        };
        return chk[returnType];
        //return today + " " + Month[month] + " " + year + " " + strTime;
    }

    return function (formatToTime, returnType) {
        return formatTime(formatToTime, returnType);
    };
});


// Get Date Difference b/w Two Dates In Days/Hour
wifiportal.filter('datediff', function () {
    function dateDiffInDys(date) {
        // The number of milliseconds in one day, hour, and minute
        var ONE_DAY = 1000 * 60 * 60 * 24;
        var ONE_HOUR = 1000 * 60 * 60;
        var ONE_MINUTE = 1000 * 60;

        var old_date = date;
        var new_date = new Date();

        // Convert both dates to milliseconds
        var old_date_obj = new Date(old_date).getTime();
        var new_date_obj = new Date().getTime();

        // Calculate the difference in milliseconds
        var difference_ms = Math.abs(new_date_obj - old_date_obj)

        // Convert back to days, hours, and minutes
        var days = Math.round(difference_ms / ONE_DAY);
        var hours = Math.round(difference_ms / ONE_HOUR) - (days * 24) - 1;
        var minutes = Math.round(difference_ms / ONE_MINUTE) - (days * 24 * 60) - (hours * 60);

        var dayText = (days > 1) ? 'Days' : 'Day';
        var hourText = (hours > 1) ? 'Hours' : 'Hour';
        if (days > 0) {
            return days + ' ' + dayText + ' Ago';
        } else {
            if (hours > 0) {
                return hours + ' ' + hourText + ' Ago';
            } else {
                return minutes + ' min Ago'
            }

        }

        return days + ' ' + dayText + ', ' + hours + ' ' + hourText + ' and ' + minutes + ' min.';

    }

    return function (date) {
        return dateDiffInDys(date);
    };
});

// Start From Records - For Pagination
wifiportal.filter('startFrom', function () {
    return function (input, start) {
        if (input) {
            start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
});

wifiportal.filter('dateWithFormat', function () {

    function formatTime(formatToTime, format) { // birthday is a date
        if (typeof (formatToTime) == "undefined" || formatToTime === null) {
            return '';
        }

        var today = null;
        var currentTime = formatToTime;
        var Month = new Array("Jan", "Feb", "Mar",
            "Apr", "May", "June", "July", "Aug", "Sep",
            "Oct", "Nov", "Dec");
        var Suffix = new Array("th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th");
        var day = currentTime.getDate();
        var month = currentTime.getMonth();
        var year = currentTime.getFullYear();
        if (day % 100 >= 11 && day % 100 <= 13)
            today = day + "th";
        else
            today = day + Suffix[day % 10];

        var hours = currentTime.getHours();
        var minutes = currentTime.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;

        if (format === 'dd M yy') {
            return day + " " + Month[month] + " " + year;
        } else if (format == 'yy-mm-dd') {
            if (day < 10) {
                day = "0" + day;
            }
            month += 1;
            if (month < 10) {
                month = "0" + month;
            }
            if (month > 12) {
                month = 12;
            }
            return year + "-" + month + "-" + day;
        } else if (format == 'mm/dd/yy') {
            if (day < 10) {
                day = "0" + day;
            }
            month += 1;
            if (month < 10) {
                month = "0" + month;
            }
            if (month > 12) {
                month = 12;
            }
            return month + "/" + day + "/" + year;
        }

    }

    return function (formatToTime, format) {
        return formatTime(formatToTime, format);
    };
});

// Get Dimension Detail by ID
wifiportal.filter('dimensionDetail', function () {
    return function (input, scope) {
        var dimensionDetail = '';
        angular.forEach(scope.DimesnionList, function (value) {
            if (value['id'] == parseInt(input)) {
                dimensionDetail = value['width'] + "px * " + value["height"] + "px";
            }
        });
        return dimensionDetail;
    }
});

// Get Day Part Group Detail by ID
wifiportal.filter('dayPartDetail', function () {
    return function (input, scope, returnType) {
        var dayPartGroupDetail = (returnType == 'color') ? '#006bcf' : 'Select One Group..';
        angular.forEach(scope.dayPartGroups, function (value) {
            if (value['id'] == parseInt(input)) {
                dayPartGroupDetail = (returnType == 'color') ? value['color'] : value['name'];
            }
        });
        return dayPartGroupDetail;
    }
});