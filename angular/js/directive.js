wifiportal.directive("exampleDirective", function () {
    return {
        restrict: 'E',
        scope: {
            yourDirective: '='
        },
        link: function (scope, element, attrs) {
            // some ode
        },
        templateUrl: function (elem, attrs) {
            console.log(attrs.templateUrl);
            return attrs.templateUrl || 'angular/partials/campaign/campaignListing.html'
        }
    }
});

wifiportal.directive("leftSidebar", [function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            //On click
            jQuery(elem).click(function () {
                $(".editPro_leftBar_outer").toggleClass("openLeft_menu");
            });
        }
    }
}]);

// Open Popup like Delete....
wifiportal.directive("openPopup", [function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            //On click
            jQuery(elem).click(function () {
                if (angular.element(elem).hasClass('allPopupOpen')) {
                    $("." + angular.element(elem).attr('data-popup-class')).addClass("open_popup");
                    $("body").addClass("hidden");
                } else {
                    $(".popup_delete").addClass("open_popup");
                    $("body").addClass("hidden");
                }

            });
        }
    }
}]);

// Events for Multiple Dom
wifiportal.directive('commonEvents', function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            var eventType = angular.element(elem).attr('common-events');
            if (eventType == 'andOr') {
                angular.element(elem).find('.campSchedule_endDate_andBtn').click(function () {
                    angular.element('.campSchedule_endDate_OrBtn').removeClass('active');
                    angular.element(this).addClass('active');
                });

                angular.element(elem).find('.campSchedule_endDate_OrBtn').click(function () {
                    angular.element('.campSchedule_endDate_andBtn').removeClass('active');
                    angular.element(this).addClass('active');
                });
            }
        }
    }
});

// Datepicker Directive
wifiportal.directive("datePickerWifi", [function () {
    return {
        restrict: "A",
        require: 'ngModel',
        link: function (scope, elem, attrs, ngModel) {
            $(elem).datepicker({
                autoclose: true,
                onSelect: function (dateText) {
                    scope.$apply(function () {
                        ngModel.$setViewValue(dateText);
                    });
                    if ($(elem).datepicker("widget").is(":visible")) {
                        $(elem).datepicker("hide");
                    }
                },
                onClose: function () {
                    //$(elem ).datepicker( "refresh" );
                }
            });

            var datepicker = $(".datepicker");
            if (datepicker.length > 0 && $(elem).datepicker("widget").is(":visible")) {
                //$(elem).datepicker( "refresh" );
            }
            /*var datepicker = $(".datepicker");
             if (datepicker.length > 0) {
             $(".datepicker").datepicker({dateFormat: 'mm/dd/yy'});
             }*/
        }
    }
}]);

// Select Box
wifiportal.directive("selectBox", [function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            angular.element(elem).change(function (e) {
                var srchFiltr_val = angular.element(this).find(":selected").text();
                if (angular.element(this).hasClass('showText')) {
                    srchFiltr_val = angular.element(this).find(":selected").text();
                }
                angular.element(this).parent().find("span").text(srchFiltr_val);
            });

        }
    }
}]);

// Select Box UL Base
wifiportal.directive("selectBoxUl", [function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            angular.element("body").on("click", ".clsrScrol_cstm li", function (e) {
                var srchFiltr_val = angular.element(this).find("a").text();
                var getPt = angular.element(this).attr('data-parent');
                angular.element('.' + getPt).find("span").text(srchFiltr_val);
                angular.element('.' + getPt).removeClass('active');
            });

        }
    }
}]);

// Toggle list Menus: Click on "Dots in Table"
wifiportal.directive("listingMenus", [function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            //On click
            jQuery(elem).click(function () {
                var status = 1;
                var thisClicks = $(this);

                if ($(thisClicks).parents("li").hasClass("active_editMod")) {
                    $(".cL_listing_tableInn ul li").removeClass("active_editMod");
                    status = 1;
                    return;
                }
                $(".cL_listing_tableInn ul li").removeClass("active_editMod");
                if (status == 1) {
                    $(thisClicks).parents("li").addClass("active_editMod");
                    status = 0;
                } else {
                    $(thisClicks).parents("li").removeClass("active_editMod");
                    status = 1;
                }
            });
        }
    }
}]);

// NOT USE
// Load Crousel Slider - Like in New Campaign
wifiportal.directive("loadCrousel", [function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            var owl = angular.element(".browserSlider");
            if (owl.length > 0) {
                owl.owlCarousel({
                    items: 6, //10 items above 1000px browser width
                    itemsDesktop: [1100, 4], //5 items between 1000px and 901px
                    itemsDesktopSmall: [900, 3], // 3 items betweem 900px and 601px
                    itemsTablet: [600, 2], //2 items between 600 and 0;
                    itemsMobile: [320, 1] // itemsMobile disabled - inherit from itemsTablet option
                });

                // Custom Navigation Events
                $(".next").click(function () {
                    owl.trigger('owl.next');
                });
                $(".prev").click(function () {
                    owl.trigger('owl.prev');
                });
                $(".play").click(function () {
                    owl.trigger('owl.play', 1000);
                });
                $(".stop").click(function () {
                    owl.trigger('owl.stop');
                });
            }
        }
    }
}]);
/*wifiportal.directive("sliderImage", [function () {
 return {
 restrict: "A",
 link: function (scope, elem, attrs) {
 var slides = document.querySelectorAll('#slides .slide');
 //var slides = $(document).find('#slides .slide');
 var currentSlide = 0;

 function nextSlide(){

 slides[currentSlide].className = 'slide';
 currentSlide = (currentSlide+1)%slides.length;
 slides[currentSlide].className = 'slide showing';
 }

 var slideInterval = setInterval(nextSlide, 2000);

 }
 }
 }]);*/

wifiportal.directive("radioButton", [function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            //On click
            jQuery(elem).click(function () {
                $(".addNew_campaign_content_radioBtn, .info_campaignFinance_cpmRadio").removeClass("checked");
                jQuery(this).parent().addClass("checked");

            });
        }
    }
}]);

wifiportal.directive('owlCarousel', [function () {
    return {
        restrict: 'EA',
        transclude: false,
        scope: {
            owlOptions: '='
        },
        link: function (scope, element, attrs) {
            scope.initCarousel = function () {
                $(element).owlCarousel(scope.owlOptions);
            };

            $(".crtv_uploadPic_circle_Icon label input[type='radio']").click(function (e) {
                $('.crtv_uploadPic_circle_Icon label').removeClass("active");
                $(this).parent().addClass("active");
            });
        }
    }
}]);

wifiportal.directive('owlCarouselItem', [function () {
    return function (scope) {
        if (scope.$last) {
            $('.parentCrousel').owlCarousel({
                items: 6, //10 items above 1000px browser width
                itemsDesktop: [1100, 4], //5 items between 1000px and 901px
                itemsDesktopSmall: [900, 3], // 3 items betweem 900px and 601px
                itemsTablet: [600, 2], //2 items between 600 and 0;
                itemsMobile: [320, 1] // itemsMobile disabled - inherit from itemsTablet option
            });

            // Custom Navigation Events
            $(".next").click(function () {
                $('.owl-wrapper').trigger('owl.next');
            });
            $(".prev").click(function () {
                $('.owl-wrapper').trigger('owl.prev');
            });
            $(".play").click(function () {
                $('.owl-wrapper').trigger('owl.play', 1000);
            });
            $(".stop").click(function () {
                $('.owl-wrapper').trigger('owl.stop');
            });
        }
    };
}]);

/*wifiportal.directive('owlCarouselItemCreative', [function () {
 return function (scope) {
 if (scope.$last) {

 $('.parentCrouselForCrtv').owlCarousel({
 items: 6, //10 items above 1000px browser width
 itemsDesktop: [1100, 4], //5 items between 1000px and 901px
 itemsDesktopSmall: [900, 3], // 3 items betweem 900px and 601px
 itemsTablet: [600, 2], //2 items between 600 and 0;
 itemsMobile: [320, 1] // itemsMobile disabled - inherit from itemsTablet option
 });

 // Custom Navigation Events
 $(".next").click(function () {
 $('.owl-wrapper').trigger('owl.next');
 });
 $(".prev").click(function () {
 $('.owl-wrapper').trigger('owl.prev');
 });
 $(".play").click(function () {
 $('.owl-wrapper').trigger('owl.play', 1000);
 });
 $(".stop").click(function () {
 $('.owl-wrapper').trigger('owl.stop');
 });
 }
 };
 }]);*/

wifiportal.directive('owlCarouselItemCreative', [function () {
    return {
        link: function (scope, element, attrs) {
            if (scope.$last) {

                $(element).parent().owlCarousel({
                    items: 6, //10 items above 1000px browser width
                    itemsDesktop: [1100, 4], //5 items between 1000px and 901px
                    itemsDesktopSmall: [900, 3], // 3 items betweem 900px and 601px
                    itemsTablet: [600, 2], //2 items between 600 and 0;
                    itemsMobile: [320, 1] // itemsMobile disabled - inherit from itemsTablet option
                });

                // Custom Navigation Events
                $(".next").click(function () {
                    $('.owl-wrapper').trigger('owl.next');
                });
                $(".prev").click(function () {
                    $('.owl-wrapper').trigger('owl.prev');
                });
                $(".play").click(function () {
                    $('.owl-wrapper').trigger('owl.play', 1000);
                });
                $(".stop").click(function () {
                    $('.owl-wrapper').trigger('owl.stop');
                });
            }


        }
    }
}]);


wifiportal.directive('activeBox', [function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            // On Click
            var element = angular.element(elem);
            element.click(function () {

                if (element.hasClass('active_focus')) {
                    return false;
                }

                // Check if Current Box is in Edit Mode
                if (angular.element('.active_focus').find('.infoBoxes_title_icon_edit').hasClass('fa-check')) {
                    angular.element('.active_focus').find('.saveChanges').addClass('saveAlert');
                    var removeIt = setInterval(function () {
                        angular.element('.active_focus').find('.saveChanges').removeClass('saveAlert');
                        clearInterval(removeIt);
                    }, 1200);
                    return false;
                }

                angular.element('.showOnFocusContent').removeClass('showContent').addClass('hideContent');
                angular.element('.insightInfo_boxesInn').removeClass('active_focus').removeClass('editing');
                element.removeClass('opacity_unactive').addClass('active_focus').addClass('editing');

                /*if (element.hasClass('showHideContent')) {
                 var classToManipluate = element.attr('data-class');
                 classToManipluate = angular.element('.' + classToManipluate);
                 (classToManipluate.hasClass('showContent')) ? classToManipluate.removeClass('showContent').addClass('hideContent')
                 : classToManipluate.addClass('showContent').removeClass('hideContent');
                 }*/
            });
        }
    }
}]);


///$rafiq -- directive for end date select options under ng-repeat options

wifiportal.directive("selectInput", function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            $(".nc_Camaign_costFinance_opsSlct").each(function (index, element) {
                $(this).on('click', 'span', function (e) {

                    e.stopPropagation();
                    $(this).parent().find('ul').show();
                });
                $(this).on('click', 'li', function () {
                    var slctLst_val = $(this).html();
                    $(this).parents(".nc_Camaign_costFinance_opsSlct").find("span").html(slctLst_val);
                    $(this).parent().hide();
                });
            });
        }
    }
});
//for selection of languages
wifiportal.directive("selectLang", function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            $(".trgt_lang_dropdown_check input:checkbox").click(function () {
                $(this).parent().toggleClass("checked");
            });
        }
    }
});


///---for check box

wifiportal.directive("checkInput", function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {

            $(elem).on('click', function () {
                if (angular.element(elem).hasClass('vstrCap_topchckbox')) {
                    if ($(this).hasClass('checked')) {
                        //alert('has');
                        $(this).removeClass('checked');
                        $(this).parents(".insightInfo_boxes_white").find(".vstrCap_amounts_tbl").addClass("opacity");

                        //return false;
                    } else {

                        $(this).addClass('checked');
                        $(this).parents(".insightInfo_boxes_white").find(".vstrCap_amounts_tbl").removeClass("opacity");


                        // return false;
                    }
                } else if (angular.element(elem).hasClass('genderChckBox')) {
                    // for Gender

                    $(this).toggleClass('checked');
                }
                else if (angular.element(elem).hasClass('lifecycle')) {
                    // for lifestage

                    $(this).toggleClass('checked');
                } else if (angular.element(elem).hasClass('ostargetting')) {
                    // for os selection

                    $(this).toggleClass('checked');

                } else if (angular.element(elem).hasClass('browsersel')) {
                    // for browser selection


                    $(this).toggleClass('active');
                }
                else if (angular.element(elem).hasClass('selectit_lang')) {
                    // for language selection
                    $(this).toggleClass('checked');
                }


                else if (angular.element(elem).hasClass('agedB')) {
                    //alert('here');
                    // for browser selection
                    $('.agedB').removeClass('active');
                    $(elem).toggleClass('active');
                    //$(".lefthand-ranger").trigger('click');
                    //alert('here');
                    //$(document).find(".rz-pointer-max").trigger("click");
                    //$(document).find(".rz-pointer-max").click();
                    //$(document).find(".rz-pointer-min").trigger("click");
                    //$('rz-pointer').trigger('click');



                    //alert('here');

                }


            });
        }
    }
});


///---for datepicker

wifiportal.directive("datePicker", function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {


            $("#datepicker_radio").datepicker({
                changeMonth: true,
                changeYear: true,
                showOtherMonths: true,
                onSelect: function (dateText, inst) {
                    //alert();
                    $('#datepicker_radio_hidden').val($(this).val());

                }

            });


        }
    }
});///---for datepicker for input

///---for devices
wifiportal.directive("deviceType", function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {


            $(elem).on('click', function () {
                //$(".trgtSlct_deviceType_check").removeClass("checked");
                $(this).parent().toggleClass("checked");
            });


        }
    }
});///---for datepicker for input

wifiportal.directive("datepickerInput", function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {

            $(".datepicker_input1").datepicker({
                changeMonth: true,
                changeYear: true,
                showOtherMonths: true,
                onSelect: function (dateText, inst) {
                    //alert(dateText);
                    //alert(inst);
                    $(this).val(dateText);

                }

            });
        }
    }
});
///--- for radio and or

wifiportal.directive("radioInput", function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {

            var element = angular.element(elem);
            element.click(function () {

                if ($(this).prop("checked") === true) {
                    $(this).parents(".campSchedule_endDate_andOr").find("label").removeClass("active");
                    $(this).parent().addClass("active");
                } else {
                }
            });


        }
    }
});
///--- dayparting checkbox

wifiportal.directive("daypartCheck", function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {

            var element = angular.element(elem);


            $(".campSchedule_dayparting_Checkbox input:checkbox").click(function () {
                if ($('.campSchedule_dayparting_Checkbox').hasClass('checked')) {

                    $('.Dshowhidecheck').removeClass("hideContent");
                    $('.Dshowhidecheck').addClass("showContent");

                } else {
                    $('.Dshowhidecheck').removeClass("showContent");
                    $('.Dshowhidecheck').addClass("hideContent");

                }
            });


        }
    }
});


//-- $rafiq


wifiportal.directive("componentsMenu", [function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            $(".goodiesTems_lftBr_mid h2 a").click(function () {
                if ($(this).hasClass("active") == false) {
                    $(".goodiesTems_lftBr_mid h2 a").removeClass("active");
                    $(this).addClass("active");
                    $(".goodies_leftBr_acordianShow").stop().slideUp("500");
                    $(this).parents("li").find(".goodies_leftBr_acordianShow").stop().slideDown("500");
                } else {
                    $(".goodiesTems_lftBr_mid h2 a").removeClass("active");
                    $(".goodies_leftBr_acordianShow").stop().slideUp("500");
                }
            });
        }
    }
}]);

// Validate Number Only
wifiportal.directive('inputPrice', function () {
    return {
        restrict: 'EA',
        template: '<input name="{{inputName}}" ng-model="inputValue" />',
        scope: {
            inputValue: '=',
            inputName: '='
        },
        link: function (scope) {
            scope.$watch('inputValue', function (newValue, oldValue) {
                if (String(newValue).indexOf(',') != -1)
                    scope.inputValue = String(newValue).replace(',', '.');
                else {
                    var index_dot,
                        arr = String(newValue).split("");
                    if (arr.length === 0) return;
                    if (arr.length === 1 && (arr[0] == '-' || arr[0] === '.')) return;
                    if (arr.length === 2 && newValue === '-.') return;
                    if (isNaN(newValue) || ((index_dot = String(newValue).indexOf('.')) != -1 && String(newValue).length - index_dot > 3 )) {
                        scope.inputValue = oldValue;
                    }
                }
            });
        }
    };
});

wifiportal.directive('initDropZone', function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            function flashMsg(msgType, msg) {
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
                ele.html(msg);
                setTimeout(function () {
                    ele.slideUp(1000);
                    $('.flashMsg').removeClass(change);
                }, 4000);
            }

            if ($("div#image-creative-dropzone").length > 0) {
                var image_name;
                var image_height;
                var image_width;
                var API_KEY = "PulSCqMnXGchW0pC0s5o9ngHVTWMeLqk";

                var myDropzone = new Dropzone("div#image-creative-dropzone", {
                    url: "AdServer/AdCreative/creative_image",
                    paramName: 'file',
                    params: {'type': 'banner', "X-API-KEY": API_KEY},
                    maxFiles: 1,
                    acceptedFiles: 'image/*',
                    clickable: true,
                    thumbnailWidth: 120,
                    thumbnailHeight: 120,
                    maxfilesexceeded: function (file) {
                        this.removeAllFiles();
                        this.addFile(file);
                    },
                    success: function (file, response) {
                        var file_info = $.parseJSON(response);
                        if (file_info.status) {
                            file.temp_name = file_info.image;
                            image_name = file_info.image;
                            image_height = file_info.height;
                            image_width = file_info.width;
                            $('#UploadCreativeImage').val(image_name);
                            flashMsg('success', 'Image uploaded');
                        } else {
                            flashMsg('error', 'Image upload failed.');
                        }
                    },
                    error: function (dta) {
                        flashMsg('error', 'Creative upload failed.');
                    }
                });

                $("div#image-creative-dropzone").click(function () {
                    myDropzone.hiddenFileInput.click();
                });

                myDropzone.on("sending", function (file) {
                    if (myDropzone.files.length >= myDropzone.options.maxFiles) {
                        myDropzone.removeAllFiles();
                    }
                });

                myDropzone.on("addedfile", function (file) {
                    // Create the remove button
                    var removeButton = Dropzone.createElement("<button class='removeBtnUpload deleteButtonImageBanner'>Remove</button>");

                    // Capture the Dropzone instance as closure.
                    var _this = this;

                    // Listen to the click event
                    removeButton.addEventListener("click", function (e) {

                        // Make sure the button click doesn't submit the form:
                        e.preventDefault();
                        e.stopPropagation();

                        // Remove the file preview.
                        _this.removeFile(file);

                        var image_name = file.temp_name;
                        // If you want to the delete the file on the server as well,
                        // you can do the AJAX request here.
                        $.ajax({
                            type: "POST",
                            data: {image_name: image_name},
                            url: 'creative/delete/image',
                            dataType: 'json',
                            cache: false,
                            success: function (response) {
                                if (response == "deleted") {
                                    image_name = null;
                                }
                            }
                        });

                    });

                    // Add the button to the file preview element.
                    file.previewElement.appendChild(removeButton);
                });
            }


            /*----------- HTML Zip Drop Zone -----------*/
            if ($("div#htmlzip-creative-dropzone").length > 0) {
                var html_image_name;
                var html_image_height;
                var html_image_width;
                var htmlDropzone = new Dropzone("div#htmlzip-creative-dropzone", {
                    url: "AdServer/AdCreative/creative_image",
                    paramName: 'file',
                    params: {'type': 'zip', "X-API-KEY": API_KEY},
                    maxFiles: 1,
                    acceptedFiles: '.zip',
                    maxfilesexceeded: function (file) {
                        this.removeAllFiles();
                        this.addFile(file);
                    },
                    success: function (file, response) {
                        var file_info = $.parseJSON(response);
                        if (file_info.status) {
                            file.temp_name = file_info.file;
                            html_image_name = file_info.file;
                            html_image_height = 1;
                            html_image_width = 2;
                            $('#UploadCreativeHtmlZip').val(html_image_name);
                            flashMsg('success', 'Image uploaded');
                        } else {
                            flashMsg('error', 'Image upload failed.');
                        }
                    },
                    error: function (dta) {
                        flashMsg('success', 'Image upload failed.');
                    }
                });

                $("div#htmlzip-creative-dropzone").click(function () {
                    htmlDropzone.hiddenFileInput.click();
                });
                htmlDropzone.on("sending", function (file) {
                    if (htmlDropzone.files.length >= htmlDropzone.options.maxFiles) {
                        htmlDropzone.removeAllFiles();
                    }
                });
                htmlDropzone.on("addedfile", function (file) {

                    // Create the remove button
                    var removeButton = Dropzone.createElement("<button class='removeBtnUpload deleteButtonHtml'>Remove file</button>");


                    // Capture the Dropzone instance as closure.
                    var _this = this;

                    // Listen to the click event
                    removeButton.addEventListener("click", function (e) {

                        // Make sure the button click doesn't submit the form:
                        e.preventDefault();
                        e.stopPropagation();

                        // Remove the file preview.
                        _this.removeFile(file);
//                                                                        console.log(file);
                        var image_name = file.temp_name;
                        // If you want to the delete the file on the server as well,
                        // you can do the AJAX request here.
//                                                                        console.log(image_name);return;
                        $.ajax({
                            type: "POST",
                            data: {image_name: image_name},
                            url: 'creative/delete/image?type=html',
                            dataType: 'json',
                            cache: false,
                            success: function (response) {
                                if (response == "deleted") {
                                    image_name = null;
                                }
                            }
                        });

                    });

                    // Add the button to the file preview element.
                    file.previewElement.appendChild(removeButton);
                });
            }


            /*----------- Video Drop Zone -----------*/
            if ($("div#htmlzip-creative-dropzone").length > 0) {
                var video_image_name;
                var video_image_height;
                var video_image_width;
                var videoDropzone = new Dropzone("div#video-creative-dropzone", {
                    url: "AdServer/AdCreative/creative_image",
                    paramName: 'file',
                    params: {'type': 'video', "X-API-KEY": API_KEY},
                    maxFiles: 1,
                    acceptedFiles: 'video/*',
                    maxfilesexceeded: function (file) {
                        this.removeAllFiles();
                        this.addFile(file);
                    },
                    success: function (file, response) {
                        var file_info = $.parseJSON(response);
                        if (file_info.status) {
                            file.temp_name = file_info.video;
                            video_image_name = file_info.video;
                            video_image_height = 1;
                            video_image_width = 2;
                            $('#UploadCreativeVideo').val(video_image_name);
                            flashMsg('success', 'Image uploaded');
                        } else {
                            flashMsg('error', 'Image upload failed.');
                        }
                    },
                    error: function (dta) {
                        flashMsg('success', 'Image upload failed.');
                    }
                });

                $("div#video-creative-dropzone").click(function () {
                    videoDropzone.hiddenFileInput.click();
                });
                videoDropzone.on("sending", function (file) {
                    if (videoDropzone.files.length >= videoDropzone.options.maxFiles) {
                        videoDropzone.removeAllFiles();
                    }
                });
                videoDropzone.on("addedfile", function (file) {

                    // Create the remove button
                    var removeButton = Dropzone.createElement("<button class='removeBtnUpload deleteButtonVideo'>Remove</button>");


                    // Capture the Dropzone instance as closure.
                    var _this = this;

                    // Listen to the click event
                    removeButton.addEventListener("click", function (e) {

                        // Make sure the button click doesn't submit the form:
                        e.preventDefault();
                        e.stopPropagation();

                        // Remove the file preview.
                        _this.removeFile(file);
//                                                                        console.log(file);
                        var image_name = file.temp_name;
                        // If you want to the delete the file on the server as well,
                        // you can do the AJAX request here.
//                                                                        console.log(image_name);return;
                        $.ajax({
                            type: "POST",
                            data: {image_name: image_name},
                            url: 'creative/delete/image',
                            dataType: 'json',
                            cache: false,
                            success: function (response) {
                                if (response == "deleted") {
                                    image_name = null;
                                }
                            }
                        });

                    });

                    // Add the button to the file preview element.
                    file.previewElement.appendChild(removeButton);
                });
            }

            function preloadFiles(myDropzone, imageName, type) {
                var mockFile = {name: imageName};
                var removeBtnClass = 'deleteButton';
                var deleteExtraType = '';
                if (type == 'banner') {
                    removeBtnClass = 'deleteButtonImageBanner';
                    deleteExtraType = '';
                } else if (type == 'html') {
                    removeBtnClass = 'deleteButtonHtml';
                    deleteExtraType = '?type=html';
                } else if (type == 'video') {
                    removeBtnClass = 'deleteButtonVideo';
                    deleteExtraType = '?type=html';
                }

                removeBtnClass = removeBtnClass + " removeBtnUpload";
                var removeButton = Dropzone.createElement("<button class=" + removeBtnClass + ">Remove</button>");
                myDropzone.options.addedfile.call(myDropzone, mockFile);

                if (type == 'html') {
                    myDropzone.options.thumbnail.call(myDropzone, mockFile, "assets/images/creatives/files/" + imageName);
                } else {
                    myDropzone.options.thumbnail.call(myDropzone, mockFile, "assets/images/creatives/" + imageName);
                }


                myDropzone.options.complete.call(myDropzone, mockFile);
                myDropzone.options.processing.call(myDropzone, mockFile);
                myDropzone.files.push(mockFile);
                mockFile.previewElement.appendChild(removeButton);
                removeButton.addEventListener("click", function () {
                    myDropzone.options.removedfile.call(myDropzone, mockFile);
                    // If you want to the delete the file on the server as well,
                    // you can do the AJAX request here.
                    $.ajax({
                        type: "POST",
                        data: {image_name: imageName},
                        url: 'creative/delete/image' + deleteExtraType,
                        dataType: 'json',
                        cache: false,
                        success: function (response) {
                            if (response == "deleted") {
                                //image_name = '';
                            }
                        }
                    });
                });
            }

            $('#preloadImgNow').on('click', function () {
                var imageName = $('#preloadImgName').val();
                var type = $('#preloadImgType').val();
                if (type == 'banner') {
                    preloadFiles(myDropzone, imageName, type);
                } else if (type == 'html') {
                    preloadFiles(htmlDropzone, imageName, type);
                } else if (type == 'video') {
                    preloadFiles(videoDropzone, imageName, type);
                }
            });
        }
    }
})
