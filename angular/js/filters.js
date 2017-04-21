// Format Datetime
myApp.filter('formatDateWithTime', function () {

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