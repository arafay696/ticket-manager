$(document).ready(function (e) {

    /*$("select").each(function (index, element) {

     var selectVal = $(this).find(":selected").val();
     if ($(this).hasClass('showText')) {
     selectVal = $(this).find(":selected").text();
     }
     $(this).parent().find("span").text(selectVal);

     });*/

    $("select").change(function (e) {
        var srchFiltr_val = $(this).find(":selected").val();
        if ($(this).hasClass('showText')) {
            srchFiltr_val = $(this).find(":selected").text();
        }
        $(this).parent().find("span").text(srchFiltr_val);
    });

    $(".cl_tableRow_editDotes").click(function (e) {
        //	$(this).parents("li").toggleClass("active_editMod");
        //alert("dfdf")
    });

    // Open Delete Popup
    $(".cl_rowEdit_popOut_campaign_delete").click(function (e) {
        $(".popup_delete").addClass("open_popup");
        $("body").addClass("hidden");
    });


    $(".allPopups_closBtn").click(function (e) {
        $("body").removeClass("hidden");
        $(".allpPopups_outer").removeClass("open_popup");
        $(".cL_listing_tableInn ul li").removeClass("active_editMod");
    });

    $(".deletePop_dltBtn").click(function (e) {
        $("body").removeClass("hidden");
        $(".allpPopups_outer").removeClass("open_popup");
        //$(".allpPopups_outer").fadeOut(500);
        //$(".cL_listing_tableInn ul li.active_editMod").remove();
    });


    $(".cl_tableRow_editDotes").click(function (e) {

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


    $(".cL_listing_table_cell").click(function (e) {
        $(".cL_listing_tableInn ul li").removeClass("active_editMod");
    });


    $(".cl_tableRow_activeInactive").click(function (e) {
        var rowActiveText = "Active";
        var rowInActiveText = "Inactive"
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $(this).html(rowInActiveText);
        } else {
            $(this).addClass("active");
            $(this).html(rowActiveText);
        }

    });


    $(".editPro_genderRadio").click(function (e) {
        $(".editPro_genderRadio").removeCslass("checked");
        $(this).addClass("checked");
    });

//    $(".addNew_campaign_content_radioBtn input, .info_campaignFinance_cpmRadio input").click(function (e) {
//        $(".addNew_campaign_content_radioBtn, .info_campaignFinance_cpmRadio").removeClass("checked");
//        $(this).parent().addClass("checked");
//    });


    $(".editPro_notifications_onOff_button input, .signin_ramemberMe_check input, .funnelSlctbox_checkbox input").click(function (e) {
        if ($(this).prop("checked") != true) {

            // alert('0');
            $(this).parent().removeClass("checked");
        } else {
            // alert('1');
            $(this).parent().addClass("checked");
        }
        ///$(this).parent().toggleClass("checked");
    });

//    $(".header_navebar_editDots").click(function (e) {
//        $(".editPro_leftBar_outer").toggleClass("openLeft_menu");
//    });

    $(".contant, .compaign_landing_banerOuter, .headerMenu_outer").click(function (e) {
        $(".editPro_leftBar_outer").removeClass("openLeft_menu");
    });


    $(".addNew_campaign_typeBox input").click(function (e) {
        $(this).parent().toggleClass("active");
    });

    $(".slctFunnel_slct span").click(function (e) {
        $(this).parent().addClass("active");
    });

    $(".slctFunnel_slct_hiddenOverlay").click(function (e) {
        $(this).parent().removeClass("active");
    });

    $(".slctFunnel_slct ul li a").click(function (e) {
        $(".slctFunnel_slct ul li a").removeClass("active");
        $(this).addClass("active");
    });

    $(".nave_search_icon").click(function (e) {
        $(".searchFull_pageCont_out").addClass('open_search');
    });
    $(".demographic_lenguageAdd_btn").click(function (e) {
        $(".searchFull_pageCont_out").removeClass('open_search');
    });
    $("#siteBuilderBtn").click(function (e) {
        $(".searchFull_pageCont_out_new").removeClass('open_search');
        $(this).css("display", "none");
    });
    $(".close_preview_btn").click(function (e) {
        $(".showTemplatePreviewPopup").hide();
        $(".searchFull_pageCont_out_new").removeClass('open_search');
        $(this).css("display", "none");
    });
    $(".creativeName_multi_checksbox input").click(function (e) {
        $(this).parent().toggleClass("checked");
    });

    $(".daypartingChck input").click(function (e) {
        if ($(this).prop("checked") == true) {
            $(".creativesName_multiple_dayparting").show();
        } else {
            $(".creativesName_multiple_dayparting").hide();
        }
    });


    $(".crtv_uploadPic_circle_Icon label input[type='checkbox']").click(function (e) {
        $(this).parent().toggleClass("active");
    });

    $(".crtv_uploadPic_circle_Icon label input[type='radio']").click(function (e) {
        $('.crtv_uploadPic_circle_Icon label').removeClass("active");
        $(this).parent().addClass("active");
    });

    /*$(".creativeTypeItem label").click(function (e) {
     $('.creativeTypeItem label').removeClass("active");
     $(this).addClass("active");
     });*/

    $(".info_campaignRating_rangeUp a").click(function (e) {
        $(".info_campaignRating_rangeout ul li").removeClass("active");
        $(this).parents("li").addClass("active");
    });


    $(".campSchedule_vistr_capCheckbox input, .campSchedule_dayparting_Checkbox input, .insightInfo_campStatus_check input").click(function (e) {
        $(this).parent().toggleClass("checked");
    });

    $(".insightCamp_weightInn label").click(function (e) {
        $(".insightCamp_weightOut ul li").removeClass("active");
        $(this).parents("li").addClass("active");
    });

//    $(".banifRow_editBtn").click(function (e) {
//        alert("yessss");
//        var status = 1;
//        var thisClicks = $(this);
//
//        if ($(thisClicks).parents("li").hasClass("active_editMod")) {
//            $(".banifCont_tableContent ul li").removeClass("active_editMod");
//            status = 1;
//            return;
//        }
//
//        $(".banifCont_tableContent ul li").removeClass("active_editMod");
//
//        if (status == 1) {
//            $(thisClicks).parents("li").addClass("active_editMod");
//
//            status = 0;
//        } else {
//            $(thisClicks).parents("li").removeClass("active_editMod");
//
//            status = 1;
//        }
//
//    });


    /////////////////new campaign js//////////////////


    $(".crtv_uploadPic_circle_Icon label input:checkbox").click(function () {
        $(this).parent().toggleClass("active");
    });


    $(".crtv_uploadPic_circle_Icon label input:radio").click(function () {

        if ($(this).prop("checked") === true) {
            $(".crtv_uploadPic_circle_Icon label").removeClass("active");
            $(this).parent().addClass("active");

            $(".camp_dayparting_temp_pos").hide();
            $(this).parents(".camp_dayparting_newTemp_checksOut").find(".camp_dayparting_temp_pos").show();
        } else {

        }
    });

    $(".camp_dayparting_temp_posInnr span a").click(function () {
        $(this).parents(".camp_dayparting_temp_pos").hide();
    });


    $(".nc_campTier_radiosCheck input").click(function () {
        $(".nc_campTier_radiosCheck").removeClass("checked");
        $(this).parent().addClass("checked");
    });


    $(".nc_Camaign_costFinance_opsSlct_inn span").click(function () {
        // $(".nc_campTier_radiosCheck").removeClass("checked");
        // $(this).parents(".nc_Camaign_costFinance_opsSlct").addClass("active");


    });

    $(".nc_Camaign_costFinance_opsSlct ul li").click(function () {
        $(this).parents(".nc_Camaign_costFinance_opsSlct").removeClass("active");


    });


    /*$(".nc_Camaign_costFinance_opsSlct").each(function (index, element) {

     $(this).on('click', 'span', function (e) {
     e.stopPropagation();
     $(this).parent().find('ul').show();
     });

     $(this).on('click', 'li', function () {
     var slctLst_val = $(this).html();
     $(this).parents(".nc_Camaign_costFinance_opsSlct").find("span").html(slctLst_val);
     $(this).parent().hide();
     });

     });*/


    $(document).on('click', function () {
        $('.nc_Camaign_costFinance_opsSlct ul').hide();
    });


    $(".addCamp_accordian_title h2 span").click(function () {

        if (!$(this).parents(".addCamp_accordian_out").find(".addCamp_accordian_title").hasClass('active')) {
            $(".addCamp_accordian_showOut").stop().slideUp(500);
            $(this).parents(".addCamp_accordian_out").find(".addCamp_accordian_showOut")
                .stop().slideDown(500, function () {

                var backTo_top_poswe = $(this).parents(".addCamp_accordian_out")
                    .find(".addCamp_accordian_title").offset().top;
                $("html, body").animate({scrollTop: backTo_top_poswe}, 1000);
            });

            $(".addCamp_accordian_title").removeClass("active");
            $(this).parents(".addCamp_accordian_out").find(".addCamp_accordian_title")
                .addClass("active");
        }

    });


    $(".infoBox_backTo_topLnk").click(function () {

    });

    $(".infoBox_backTo_topLnk").click(function () {
        $('body').css("overflow", "auto");
        var backTo_top_pos = $(this).parents(".addCamp_accordian_out").find(".addCamp_accordian_title").offset().top;
        $("html, body").animate({scrollTop: backTo_top_pos}, 1000);
    });


    $(".sch_startDate_immediately_radio input").click(function (e) {
        $(".sch_startDate_immediately_radio").removeClass("checked");
        $(this).parent().addClass("checked");


        if ($(".schedule_immediately_slctDateRadio").prop("checked") == true) {
            $(".sch_startDate_immediately_datpickrDiv").show();

        } else {
            $(".sch_startDate_immediately_datpickrDiv").hide();

        }

    });

    //$rafiq

    /*
     $('.vstrCap_topchckbox').on('click', function () {
     alert('here');
     if($(this).hasClass('checked')){
     alert('has');
     $(this).removeClass('checked');
     return false;
     }else{
     alert('remove');
     $(this).addClass('checked');
     return false;
     }
     });
     */


    $(".inlineDtPkr_hiddnOverlay").click(function () {
        $(".sch_startDate_immediately_datpickrDiv").hide();
    });

    $(".nc_campTier_fillerShowBtn").click(function () {
        $(this).hide();
        $(".nc_campTier_fillerShowText").show();
    });

    $(".nc_campTier_fillerHide").click(function () {
        $(".nc_campTier_fillerShowBtn").show();
        $(".nc_campTier_fillerShowText").hide();
    });


    $(".campSchedule_endDate_andOr input:radio").click(function () {
        if ($(this).prop("checked") === true) {
            $(this).parents(".campSchedule_endDate_andOr").find("label").removeClass("active");
            $(this).parent().addClass("active");
        } else {
        }
    });


    var ops_status = 1;
    $(".sch_endDate_opsAmount_plus").on('click', function () {
        var endOption_row = '<li class="sch_endDate_opsAmount_apended"> <div class="sch_endDate_opsAmount_andoR_out"> <div class="campSchedule_endDate_andOr"> <label>AND <input type="radio" name="andoR"></label> <label>Or <input type="radio" name="andoR"></label> </div> </div> <div class="sch_endDate_opsAmount_innrRow"> <div class="sch_endDate_opsAmount_cell cell1"> <strong class="nc_Camaignfinance_title">Option</strong> <div class="nc_Camaign_costFinance_opsSlct"> <div class="nc_Camaign_costFinance_opsSlct_inn"> <span>Select Option</span> <ul> <li><em>Never</em></li> <li><em>Impressions</em></li> <li><em>Budget</em></li> <li><em>Clicks</em></li> <li><em>Date</em></li> </ul> </div> </div> </div> <div class="sch_endDate_opsAmount_cell cell2"> <strong class="nc_Camaignfinance_title">Amount </strong> <div class="nc_Camaignfinance_prClickField"> <em>$</em> <input value="5 000.00" type="text"> </div> </div> <div class="sch_endDate_opsAmount_cell cell3"> <strong class="nc_Camaignfinance_title">&nbsp; </strong> <a class="sch_endDate_opsAmount_plus" href="javascript:void(0)"></a> </div> </div> </li>';

        if (ops_status === 1) {
            $(this).parents(".sch_endDate_opsAmount_out ul").append(endOption_row);

            $(".campSchedule_endDate_andOr input:radio").click(function () {
                if ($(this).prop("checked") === true) {
                    $(this).parents(".campSchedule_endDate_andOr").find("label").removeClass("active");
                    $(this).parent().addClass("active");
                } else {
                }
            });

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


            $(document).on('click', function () {
                $('.nc_Camaign_costFinance_opsSlct ul').hide();
            });
            ops_status = 0;
        }
    });


    /* $(".vstrCap_topchckbox input:checkbox").click(function () {
     if ($(this).prop("checked") === true) {
     $(this).parents(".insightInfo_boxes_white").find(".vstrCap_amounts_tbl").removeClass("opacity");
     $(this).parent().addClass("checked");
     } else {
     $(this).parents(".insightInfo_boxes_white").find(".vstrCap_amounts_tbl").addClass("opacity");
     $(this).parent().removeClass("checked");
     }
     });*/


    /*    $(".campSchedule_dayparting_Checkbox input:checkbox").click(function () {
     if ($(this).prop("checked") === true) {
     $(this).parents(".insightInfo_boxes_white").find(".camp_dayparting_creatName_out").removeClass("opacity");

     } else {
     $(this).parents(".insightInfo_boxes_white").find(".camp_dayparting_creatName_out").addClass("opacity");
     $(".camp_dayparting_temp_pos").hide();

     }
     });*/


    $(".ncrtv_adtesting_ysNo_btn input:checkbox").click(function () {
        if ($(this).prop("checked") === true) {
            $(this).parents(".insightInfo_boxes_white").find(".crtvNew_abTsting_popShow_out").show();
            $(this).parent().addClass("checked");
        } else {
            $(this).parents(".insightInfo_boxes_white").find(".crtvNew_abTsting_popShow_out").hide();
            $(this).parent().removeClass("checked");
        }
    });


    $(".crtvNew_abTsting_popDrag_picHere input").change(function (e) {
        $(this).parents(".insightInfo_boxesInn").find(".ncrtv_abTesting_whitebox").hide();
        $(this).parents(".insightInfo_boxesInn").find(".ncrtv_abTesting_selectedImg").show();
    });


    $(".crtvNew_abTsting_radiosBtn input:radio").click(function () {

        if ($(this).prop("checked") === true) {
            $(".crtvNew_abTsting_radiosBtn").removeClass("checked");
            $(this).parent().addClass("checked");

            $(this).parents(".crtvNew_abTsting_popInn").find(".crtvNew_abTsting_radios_showOut").hide();
            $(this).parents(".crtvNew_abTsting_radiosOut_row").find(".crtvNew_abTsting_radios_showOut").show();
        } else {


        }
    });


    $(".creative_template_listings_picPos").click(function (e) {
        $(".creative_template_popupOut").fadeIn(500);
        $(".allpPopups_outer").addClass("open_popup");
        $("body").addClass("hidden");
    });

    $(".creative_template_pop_overlay").click(function (e) {
        $("body").removeClass("hidden");
        $(".allpPopups_outer").removeClass("open_popup");
        $(".allpPopups_outer").fadeOut(500);
    });


    $(".newCreative_newTemP_btnMain input:checkbox").click(function () {
        if ($(this).prop("checked") === true) {
            $(this).parents(".new_CreativesShow_out").find(".creative_new_content_main").hide();
            $(this).parents(".new_CreativesShow_out").find(".creative_template_showOut").show();
            $(".newCrtv_addCreative_plusOut").hide();
            $(this).parent().addClass("checked");

        } else {

            $(this).parents(".new_CreativesShow_out").find(".creative_template_showOut").hide();
            $(this).parents(".new_CreativesShow_out").find(".creative_new_content_main").show();
            $(".newCrtv_addCreative_plusOut").show();
            $(this).parent().removeClass("checked");

        }
    });


    vstrOptons_addPlus();

});

function vstrOptons_addPlus(obj) {

    var vstOps_row = '<li class="vstrCap_amounts_Row_apnded"> <div class="sch_endDate_opsAmount_andoR_out"> <div class="campSchedule_endDate_andOr"> <label>AND <input name="andoR" type="radio"></label> <label>Or <input name="andoR" type="radio"></label> </div> </div> <div class="sch_endDate_opsAmount_innrRow"> <div class="sch_snglVisitor_opsAmount_cell cell1"> <strong class="nc_Camaignfinance_title">Amount</strong> <div class="nc_Camaignfinance_prClickField"> <input value="12" type="text"> </div> </div> <div class="sch_snglVisitor_opsAmount_cell cell2"> <strong class="nc_Camaignfinance_title"><br></strong> <div class="sch_snglVisitor_impresion_inrow"> <span>Impression s</span> </div> </div> <div class="sch_snglVisitor_opsAmount_cell cell3"> <strong class="nc_Camaignfinance_title">Amount</strong> <div class="nc_Camaignfinance_prClickField"> <input value="01" type="text"> </div> </div> <div class="sch_snglVisitor_opsAmount_cell cell4"> <strong class="nc_Camaignfinance_title">Option</strong> <div class="nc_Camaign_costFinance_opsSlct"> <div class="nc_Camaign_costFinance_opsSlct_inn"> <span>Select Option</span> <ul style="display: none;"> <li><em>per day</em></li> <li><em>per month</em></li> </ul> </div> </div> </div> <div class="sch_snglVisitor_opsAmount_cell cell5"> <strong class="nc_Camaignfinance_title">&nbsp; </strong> <a class="snglVisitor_opsAmount_plus" onclick="vstrOptons_addPlus(this)" href="javascript:void(0)"></a> </div> </div> </li>';

    var vstrOps_listLenght = $(".vstrCap_amounts_Row_apnded").length;

    if (vstrOps_listLenght <= 2) {
        $(obj).parents(".vstrCap_amounts_apndedOut").append(vstOps_row);
    }

    $(".campSchedule_endDate_andOr input:radio").click(function () {
        if ($(this).prop("checked") === true) {
            $(this).parents(".campSchedule_endDate_andOr").find("label").removeClass("active");
            $(this).parent().addClass("active");
        } else {
        }
    });

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


    $(document).on('click', function () {
        $('.nc_Camaign_costFinance_opsSlct ul').hide();
    });
}


$(window).load(function (e) {


});

$(window).scroll(function (e) {
    var tbsBtns_ofst = $(".copaignLanding_banerTabs").offset().top;
    var windScroll = $(window).scrollTop();

    if (windScroll >= tbsBtns_ofst) {
        $(".crtv_menuSticky_outer").addClass("stickyMenu");
    } else {
        $(".crtv_menuSticky_outer").removeClass("stickyMenu");
    }
});


function clearText(field) {
    if (field.defaultValue == field.value) {
        field.value = "";
    } else if (field.value == "") {
        field.value = field.defaultValue;
    }
}
//$rafiq--
(function ($) {
    $(window).load(function () {
        $(".rightBar_Innr").mCustomScrollbar({
            axis: "y" // vertical and horizontal scrollbar
        });
        $(".editPro_leftBar_innCont").mCustomScrollbar({
            axis: "y" // vertical and horizontal scrollbar
        });

        $(".geoGraphicArea_left").mCustomScrollbar({

            axis: "y"// vertical and horizontal scrollbar
        });

        $(".geoGraphicArea_right").mCustomScrollbar({
            axis: "y" // vertical and horizontal scrollbar
        });

    });
})(jQuery);
(function ($) {
    $(window).load(function () {
        $(".clsrScrol_cstm").mCustomScrollbar({
            axis: "y" // vertical and horizontal scrollbar
        });

        $(".editPro_leftBar_innCont").mCustomScrollbar({
            axis: "y" // vertical and horizontal scrollbar
        });
    });
})(jQuery);

$(".trgt_url_targeting_Radio input:radio").click(function () {
    $(this).parents("ul").find(".trgt_url_targeting_Radio").removeClass("checked");
    $(this).parent().addClass("checked");
    $(this).parents("ul").find(".trgt_anyUrl_show").hide();
    $(this).parents("li").find(".trgt_anyUrl_show").show();


});

/*
 $(".trgtSlct_deviceType_check input").click(function() {
 $(".trgtSlct_deviceType_check").removeClass("checked");
 $(this).parent().addClass("checked");
 });
 */


$(".trgt_languages_opsSlct ul li").click(function () {
    $(this).parents(".nc_Camaign_costFinance_opsSlct").removeClass("active");
});


$(".trgt_languages_opsSlct").each(function (index, element) {
    $(this).on('click', 'span', function (e) {
        e.stopPropagation();
        $(this).parent().find('ul').show();
        $(this).parent().parent().find(".trgtLang_slctOvrly").show();
    });

    $(".trgt_languages_opsSlct ul li").on('click', function () {
        $('.trgt_languages_opsSlct ul').show();
    });
});


$(".trgtLang_slctOvrly").on('click', function () {
    $('.trgt_languages_opsSlct ul').hide();
    $(".trgtLang_slctOvrly").hide();
});


$(".trgt_lang_dropdown_check input:checkbox, .geoGraphicArea_leftChcks input:checkbox").click(function () {
    $(this).parent().toggleClass("checked");
});


//---------- DEVELOPER JS --------------------//
(function ($) {
    $(window).load(function () {
        $(".clsrScrol_cstm").mCustomScrollbar({
            axis: "y", // vertical and horizontal scrollbar
            scrollInertia: 250
        });

        $(".editPro_leftBar_innCont").mCustomScrollbar({
            axis: "y", // vertical and horizontal scrollbar
            scrollInertia: 250
        });

    });

    $('.headerMenu_outer .menu ul li a').click(function () {
        $(this).addClass('activating');
        $('.headerMenu_outer .menu ul li a').removeClass('active');
        $('.activating').addClass('active').removeClass('activating');
    });

    $('.wifiTabs ul li').click(function () {
        $('.wifiTabs ul li a').removeClass('active');
        $(this).children('a').addClass('active');

        // Active Tab Content
        $('.wifiTabsContent').removeClass('activeTabContent');
        $('#' + $(this).children('a').attr('data-tab')).addClass('activeTabContent');
    });

    // Wizard Manipulation - Click on Wizard Step Cirle
    // click on 1,2 or 3 etc
    $(document).on('click', '.activeTabContent .wizardStepNo ul li', function () {
        $('.activeTabContent .wizardStepNo ul li a').removeClass('active').removeClass('previous_active');
        $(this).children('a').addClass('active');

        var stepComplete = false;
        $('.activeTabContent .wizardStepNo ul li').each(function (i, items_list) {
            if ($(items_list).children('a').hasClass('active')) {
                stepComplete = true;
            }

            if (!stepComplete) {
                $(this).children('a').addClass('previous_active')
            }
        });

        // Active Tab Content
        $('.activeTabContent .wizardContent').removeClass('wizardActiveContent');
        $('#' + $(this).children('a').attr('data-tab')).addClass('wizardActiveContent');
    });

    $('.nextWizardStep').click(function () {
        var $next;
        var $selected = $('.activeTabContent .wizardStepNo').find(".active");

        $next = $selected.parent().next('li').length ? $selected.parent().next('li') : 'EMPTY';
        if ($next !== 'EMPTY') {
            $next.trigger('click');
        }
    });

    $('.prevWizardStep').click(function () {
        var $next;
        var $selected = $('.activeTabContent .wizardStepNo').find(".active");

        $next = $selected.parent().prev('li').length ? $selected.parent().prev('li') : 'EMPTY';
        if ($next !== 'EMPTY') {
            $next.trigger('click');
        }
    });

    // Active Header Menu - By URL
    var url = window.location.hash;
    var baseMenu = {
        '#!/campaign/new': '#!/campaigns',
        '#!/addVenue': '#!/venue',
        '#!/campaign/edit/': '#!/campaigns',
    };
    if (typeof baseMenu[url] !== typeof undefined) {
        url = baseMenu[url];
    }
    $('.headerMenu_outer .autoContent .menu ul li a').removeClass('active');
    $('.headerMenu_outer .autoContent .menu ul li a[href="' + url + '"]').addClass('active');
})(jQuery);