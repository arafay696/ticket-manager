
$(document).ready(function() {


    changeImage();
    var slideIndex = 0;

    function changeImage() {
        var change_img_time 	=10000;
        var transition_speed	= 5000;

        var simple_slideshow	= $(".carousel-inner");
        var dimens	= $(".carousel-indicators");
        listItems 			= simple_slideshow.children('div');
        dots 			= dimens.children('li');
        changeList = function () {


            for (i = 0; i < listItems.length; i++) {
                $(listItems[i]).css("display","none");


                //$(listItems[i]).addClass(init[i]);

            }

            slideIndex++;
            if (slideIndex> listItems.length) {slideIndex = 1}
            for (j = 0; j < dots.length; j++) {

                $(dots[j]).removeClass("active");
            }



            listItems[slideIndex-1].style.display = "block"
            $(dots[slideIndex-1]).addClass("active");


        };


        setInterval(changeList, change_img_time);


    }


});