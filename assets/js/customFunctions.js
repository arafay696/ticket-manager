lengthElement = $(document).find("#frame div").length;
$('#frame').highlighter();
if (lengthElement == 0) {
    $(".noModule").css("display", "block");
} else {
    $(".styleData").css("display", "block");
}
function hideEditLink() {

    $('#edit_link').hide();
    $('.change_link').removeClass('change_link');

}


$(window).resize(function () {

    var heightWindow;

    $("#sidebar, #modules, .styleChanger").css({height: $(window).innerHeight()});

});


$(document).ready(function () {

    var heightWindow;

    $("#sidebar, #modules, .styleChanger").css({height: $(window).innerHeight()});


    text = "";


    $('.dragElement ').draggable({
        connectToSortable: '#frame',
        scroll: false,
        zIndex: 1000,
        helper: 'clone',
        delay: 100,
        revert: 'invalid',
        cursor:'move',
            start: function (event, ui) {
            //make the frame sortable
            $('#frame').sortable({});
            //set cursor
            $('.dragElement').css('cursor', '-webkit-grabbing');
            //ui helper 250px
            ui.helper.css({
                width: 250,
                height: 'auto',
            });

            $('.ui-draggable.ui-draggable-dragging').css('outline', 'none');


        },

        stop: function (event, ui) {
            //reset cursor
            $('.dragElement').css('cursor', '-webkit-grab');
        },

        cursorAt: {left: 125, top: 15},

        complete: function (event, ui) {
            //on complete
        },
    });


    $('#frame').on('mouseenter', '[data-module]', function (e) {
        e.stopPropagation();


        if ($(this).next().is('.moduleCode')) {

            return false;

        }



        table = $(this);
            divHeightdivHeight=parseInt($('#frame').offset());
            if($(table).attr('data-module') =='buttonArea' || $(table).attr('data-module') =='textArea'|| $(table).attr('data-module') =='buttonArea' ){
                mod_h = parseInt($(this).position().top +30);
            }else if( $(table).attr('data-module') =='areaDivider'){
                mod_h = parseInt($(this).position().top +10);
            }else if($(table).attr('data-module') =='Header' || $(table).attr('data-module') =='HeaderSignup'){
//                mod_h = parseInt($(this).position().top +260);
                mod_h = $(table).position().top + parseInt($(this).css("height"))/2;
            }else if($(table).attr('data-module') =='socialDivider' ||$(table).attr('data-module') =='socialDivider1' ||$(table).attr('data-module') =='socialDivider2'){
                mod_h = parseInt($(this).position().top +10);

            }else if( $(table).attr('data-module') =='imageUpload'){
                mod_h = parseInt($(table).position());
            }else if( $(table).attr('data-module') =='header'){
                mod_h = parseInt($(table).position()+20);

            }else if( $(table).attr('data-module') =='imageArea'){
                mod_h = $(table).position().top + parseInt($(this).css("height"))/2;

            }else{
                mod_h = parseInt($(this).position().top +100);
            }

        $(table).prepend('<div class="moduleCodeButton preventSelection" style="top: ' + mod_h + 'px"><div class="codeButton"></div></div><div class="moduleDuplicateButton preventSelection" style="top: ' + mod_h + 'px"><div class="duplicateButton"></div></div><div class="moduleDragButton preventSelection" style="top: ' + mod_h + 'px"><div class="dragButton"></div></div><div class="moduleDeleteButton preventSelection" style="top: ' + mod_h + 'px"><div class="deleteButton"></div></div>');

        $("#frame").sortable('enable');
        $('#frame').sortable({
            items: 'div[data-module]',
            axis: 'y',
            distance: 5,
            handle: '.dragButton',
            opacity: 0.85,
            cursor: '-webkit-grabbing',
            start: function (event, ui) {

                if ($('.ui-draggable.ui-draggable-dragging').length > 0) {


                }

                else {

                    h_module = $('.dragButton').closest('div').height();

                    $('.ui-sortable-placeholder').css('height', '3px');

                }

            },
            stop: function (event, ui) {

                $('#frame').css('-webkit-transform', 'scale(1)');

//                allowSave();


            }
        });

        $('.codeButton, .dragButton, .deleteButton, .duplicateButton').delay(500).animate({

            width: '100%'

        }, {duration: 400, easing: 'easeInOutBack'});
        if ($('#frame').find("div").hasClass('parent')) {

            $('#frame div  a').each(function () {
/*
                if (!($(this).parent().hasClass('tooltip'))) {
                    $(this).wrap('<div class="tooltip"></div>');
                    $(this).after('<span class="tooltiptext changeALink" style="width:135px;overflow: hidden;"><i class="fa fa-link" style="color: #f2f2f2;margin: 0px 5px;"></i><input type="text" class="aUrl" style="width: 74px;" /><i class="fa fa-check aLink" style="color: #f2f2f2; margin-right: 6px; margin-left: 6px;cursor: pointer;"></i></span>');
                }*/
            });
        }
        if ($('#frame').find('div').hasClass('parent')) {

            $('#frame div  img').each(function () {

               /* if (!($(this).parent().hasClass('tooltip'))) {
                    $(this).wrap('<div class="tooltip"></div>');
                    $(this).after('<span class="tooltiptext changeImage" style="width:203px;overflow: hidden; "><span  class="changeImgBtn" style="cursor:pointer; color: whitesmoke; padding: 4px; text-transform: capitalize">Change</span><form style="float: left; overflow: hidden; width: 72px;" action="" method="post" enctype="multipart/form-data" class="postImg"><input name="images" id="file_field" class="changeImageFile" type="file" style="width: 100%;display: none;margin-right: 1px;"></form><i class="fa fa-link" style="color: #f2f2f2;margin: 0px 2px;"></i>&nbsp;&nbsp;<input type="text" class="imageUrl" style="width: 74px;" /><i class="fa fa-check imageLink" style="color: #f2f2f2; margin-right: 6px; margin-left: 6px;cursor: pointer;"></i></span>');
                }*/
            });
        }

    }).on('mouseleave', '[data-module]', function (e) {


        $('.moduleCodeButton, .moduleDragButton, .moduleDeleteButton, .moduleDuplicateButton').remove();

    });

    //Delete Module
    $('#frame').on('click', '.deleteButton', function (ev) {
        headline = 'Would you like to delete this module?';
        paragraph = 'If confirmed, you won\'t be able to undo.';

        btnTrue2 = 'Yes';
        btnTrueId2 = 'delete_module_true';
        hiddenField=$(this).parent().parent().attr('id');



        btnFalse  = 'No';

        openPopup();

    });

    var isCopy = false;
    $('#frame').on('click', '.duplicateButton', function (ev) {
        ev.preventDefault();
        ev.stopImmediatePropagation();
        var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        var uniqid = randLetter + Date.now();
        if (!isCopy) {
            //alert();
            var c_obj = $(this).parent().parent('div[data-module]');

            var clone_obj = $(this).parent().parent('div[data-module]').clone();

            $(c_obj).after(clone_obj);
            $(clone_obj).attr('id',''+uniqid);

            isCopy = true;

        }

        setTimeout(function () {
            isCopy = false;
        }, 2000);

    });
    $("#frame").on("click", "[data-module]", function () {
        table = $(this);

    });
    //make the thumbnails draggable z
    /*$('body').find('#modules_widgets div').draggable({

     connectToSortable: '#frame',
     scroll: false,
     zIndex: 1000,
     helper: 'clone',
     delay: 100,
     revert: 'invalid',
     start : function(event, ui){

     //make the frame sortable
     $('#frame').sortable({ });

     //set cursor
     $('#modules_widgets div img, #modules_widgets div p').css('cursor','-webkit-grabbing');

     //ui helper 250px
     ui.helper.css({
     width: 250,
     height: 'auto',
     });

     $('.ui-draggable.ui-draggable-dragging p').css('outline','none');


     $(document).mousemove(function(e) {

     mouseX = e.pageX;
     mouseY = e.pageY;
     windowY = $(window).height();
     threshold = 100;
     step = 10;

     if(mouseY > windowY - threshold){

     s_top = $('#canvas').scrollTop();
     $('#canvas').scrollTop(s_top + step);

     }

     else if(mouseY < threshold){

     s_top = $('#canvas').scrollTop();
     $('#canvas').scrollTop(s_top - step);

     }

     });


     },
     stop: function(event, ui){

     //reset cursor
     $('#modules_widgets div img, #modules_widgets div p').css('cursor','-webkit-grab');

     },
     cursorAt: { left: 125, top: 15 },
     complete: function(event, ui){

     //on complete

     },

     });*/


    setTimeout(function () {


        $('#loginData [data-id]').css('opacity', '1').css('display', 'block');
        $('#signUpImages [data-id]').css('opacity', '1').css('display', 'block');
$('#landingPageData [data-id]').css('opacity', '1').css('display', 'block');

    }, 250)
});
function openModules() {

    //Unhide the modules bar
    $('#modules').show();

    /*//Animate the modules bar
     $('#modules').animate({

     marginLeft: 0

     }, { duration: 360, easing: 'easeOutBack', complete: function(){

     }

     });*/

}
function allowSave() {

    $('.de').removeClass('de');
    $('.ani').removeClass('ani');

}
/*  $(document).ready(function(){

 $('#font_colorpicker').farbtastic('#font_colorpicker_value');

 });*/

$("body").on("click", "[data-name='h']", function (e) {


    $("[data-name='h']").removeClass('active-header');
    $("[data-name='h']").removeClass('active-header');
    //$(this).removeClass('active-header');


    $(this).addClass("active-header");
    $(this).attr("contenteditable", true);

    $(this).focus();


    /*  toggleEditable(this);*/

});

$("body").on("click", "[data-name='p']", function () {


    $("[data-name='p']").removeClass('active-p');
    $("[data-name='p']").removeClass('active-p');
    //$(this).removeClass('active-header');


    $(this).addClass("active-p");
    $(this).attr("contenteditable", true);
    $(this).focus();


    /*  toggleEditable(this);*/

});
$("body").on("click", "[data-name='a']", function () {


    $("[data-name='a']").removeClass('active-a');
    //$(this).removeClass('active-header');


    $(this).addClass("active-a");
    $(this).attr("contenteditable", true);
    $(this).focus();


    /*  toggleEditable(this);*/

});
$("body").on("click", "[data-name='button']", function () {


    $("[data-name='button']").removeClass('active-b');
    //$(this).removeClass('active-header');


    $(this).addClass("active-b");
    $(this).attr("contenteditable", true);
    $(this).css("cursor", "pointer");
    $(this).focus();


    /*  toggleEditable(this);*/

});
$(".signIn_dropAbleArea_title").on("click", "#clear_template", function () {
    headline = 'Would you like to start over?';
    paragraph = 'If confirmed, you won\'t be able to undo.';

    btnTrue = 'Yes, start over';
    btnTrueId = 'clear_template_true';

    btnFalse  = 'No, keep template';

    openPopup();
});

$("body").on("change", ".paragraph", function () {
    size = $(this).val();
    if (size > 16 && size < 32) {

        extra = 1.45

    }

    else if (size < 17) {

        extra = 1.7

    }

    else {

        extra = 1

    }
    $(".active-p[data-name='p']").css('font-size', size + 'px').css('line-height', size * extra + 'px');
});
$("body").on("change", "#headingSize", function () {
    size = $(this).val();
    if (size > 16 && size < 32) {

        extra = 1.45

    }

    else if (size < 17) {

        extra = 1.7

    }

    else {

        extra = 1

    }
    $(".active-header[data-name='h']").css('font-size', size + 'px').css('line-height', size * extra + 'px');
});
$("body").on("change", "#anchorSize", function () {
    size = $(this).val();
    if (size > 16 && size < 32) {

        extra = 1.45

    }

    else if (size < 17) {

        extra = 1.7

    }

    else {

        extra = 1

    }
    $(".active-a[data-name='a']").css('font-size', size + 'px').css('line-height', size * extra + 'px');
});
$("body").on("change", "#buttonSiz", function () {
    size = $(this).val();
    if (size > 16 && size < 32) {

        extra = 1.45

    }

    else if (size < 17) {

        extra = 1.7

    }

    else {

        extra = 1

    }
    $(".active-b[data-name='button']").css('font-size', size + 'px').css('line-height', size * extra + 'px');
});
$("#menu_btn").click(function (e) {
  e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    if ($(this).hasClass("closed")) {
        $(".stroke_1").css({'transform': 'rotate(0rad)', 'top': '0px'});
        $(".stroke_3").css({'transform': 'rotate(0rad)', 'top': '8px'});
        $(".stroke_2").css("opacity", "1");
        $("#menu").css("display", "none");
        $(this).removeClass("closed");
    } else {

        $(".stroke_1").css({'transform': 'rotate(0.7854rad)', 'top': '4px'});
        $(".stroke_3").css({'transform': 'rotate(-0.7854rad)', 'top': '4px'});
        $(".stroke_2").css("opacity", "0");
        $("#menu").css("display", "block");
        $(this).addClass("closed");
    }
});
function screen(event) {

    customHtml = '<div id="iphone_header_preview"><div class="closeMobile" onclick="closePopup();"></div></div><iframe id="mobilePreviewFrame"></iframe><div id="iphone_footer_preview"></div><style>#iphone_header_preview { width: 100%; height: 53px; background-image: url(assets/css/images/top.png); background-repeat:no-repeat; background-size: 100%; /!*position: absolute; left: 0px; top: 0px;*!/ } #iphone_footer_preview { width: 100%; height: 50px; background-image: url(assets/css/images/bottom.png);  background-repeat:no-repeat; background-size: 100% /!*position: absolute; left: 0px; bottom: 0px;*!/ } #popup { background-color: transparent; padding: 10px !important; padding-top: 0px !important; width: 600px;  /!*padding-top: 65px; padding-bottom: 45px;*!/ box-sizing: border-box; background-color: #FFF;} #popupOverlay { background-color: rgba(0,0,0,0.85); /*padding-top: 81px; padding-bottom: 80px;*/ box-sizing: border-box; } #mobilePreviewFrame {overflow-y:auto;height: 400px !important; width: 100%; background-color: #FFFFFF}</style>';
    openPopup();

    document.getElementById('mobilePreviewFrame').srcdoc = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';

    html = $('#frame').html();
    meta = $('#meta_holder').html();
    title = $('#titles_holder').html();
    style = $('#styles_holder').html();
    style = style.replace(/body\[yahoofix\]/g, '');

    if (typeof title === 'undefined') {

        title = '';

    }

    setTimeout(function () {

        //Clone the template into an iframe
        // $('#popup iframe').contents().find('body').html('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head>'+meta+'<title>Full Screen</title>'+style+'</head><body marginwidth="0" marginheight="0" style="margin-top: 0; margin-bottom: 0; padding-top: 0; padding-bottom: 0; width: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;" offset="0" topmargin="0" leftmargin="0">'+html+'</body></html>');
        $('#popup iframe').contents().find('html').before('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">')
        $('#popup iframe').contents().find('body').html(html);
        $('#popup iframe').contents().find('head').append(meta)
        $('#popup iframe').contents().find('head').append(style)
        $('#popup iframe').contents().find('body').css('background-color', '#FFFFFF').css('overflow-x', 'hidden');
        $('#popup iframe').contents().find('[contenteditable]').removeAttr('contenteditable');
        $('#popup iframe').contents().find('.tooltip').contents().unwrap('div');
        $('#popup iframe').contents().find('.tooltiptext').remove();
        $('#popup iframe').contents().find('.editable').removeClass('editable')
        $('#popup iframe').contents().find('.image_target').removeClass('image_target');
        $('#popup iframe').contents().find('.ui-sortable-handle').removeClass('ui-sortable-handle')
        $('#popup iframe').contents().find('[href]').attr('onclick', '');
        $('#popup iframe').contents().find('.parentOfBg').contents().unwrap('div');
        $('#popup iframe').contents().find('[href="#"]').attr('onclick', 'event.preventDefault()');
        $('#popup iframe').contents().find('#clear_template, .moduleDeleteButton, .moduleDragButton, .moduleCodeButton, .highlighter-container, .edit_link').remove();
        $('#popup iframe').contents().find('.last-table').removeClass('last-table');
        $('#popup iframe').contents().find('.currentTable').removeClass('currentTable');

        outcomeHtml = $('#popup iframe').contents().find('body').find('div').html();

        if (typeof outcomeHtml === 'undefined') {

            $('#popup iframe').contents().find('body').html('<div style="width: 100%; height: 100%; text-align: center;"><img src="img/icons/empty_mobile.png" style="padding-top: 90px; padding-bottom: 30px;"><br/><span style="font-family: Helvetica, Arial, sans-serif!important; color: #4a4a4a; line-height: 24px;"><b>Oops</b>. No Content.</span><br/><br/> <span style="font-family: Helvetica, Arial, sans-serif!important; color: #4a4a4a; line-height: 24px; font-size: 14px;">Try dragging a few modules to your<br/>editing canvas. Don\'t be shy!</span></div>')

        }

    }, 500)

}
/*function screen(event) {

 customHtml = '<div id="iphone_header_preview"><div class="closeMobile" onclick="closePopup();"></div></div><iframe id="mobilePreviewFrame"></iframe><div id="iphone_footer_preview"></div><style>#iphone_header_preview { width: 100%; height: 65px; background-repeat:no-repeat; background-image: url(assets/css/images/iphone_preview_header.png); position: absolute; left: 0px; top: 0px; } #iphone_footer_preview { width: 100%; height: 45px; background-image: url(assets/css/images/iphone_preview_footer.png);  background-repeat:no-repeat ; position: absolute; left: 0px; bottom: 0px; } /!*#popup { background-color: transparent; padding: 0px; width: 320px; height: 100%; padding-top: 65px; padding-bottom: 45px; box-sizing: border-box; background-color: #FFF;} #popupOverlay { background-color: rgba(0,0,0,0.85); padding-top: 81px; padding-bottom: 80px; box-sizing: border-box; }*!/ #mobilePreviewFrame { height: 100%; width: 94%; background-color: #FFFFFF}</style>';
 openPopup();

 document.getElementById('mobilePreviewFrame').srcdoc = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';

 html = $('#frame').html();
 meta = $('#meta_holder').html();
 title = $('#titles_holder').html();
 style = $('#styles_holder').html();
 style = style.replace(/body\[yahoofix\]/g,'');

 if(typeof title === 'undefined'){

 title = '';

 }

 setTimeout(function(){

 //Clone the template into an iframe
 // $('#popup iframe').contents().find('body').html('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head>'+meta+'<title>Full Screen</title>'+style+'</head><body marginwidth="0" marginheight="0" style="margin-top: 0; margin-bottom: 0; padding-top: 0; padding-bottom: 0; width: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;" offset="0" topmargin="0" leftmargin="0">'+html+'</body></html>');
 $('#popup iframe').contents().find('html').before('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">')
 $('#popup iframe').contents().find('body').html(html);
 $('#popup iframe').contents().find('head').append(meta)
 $('#popup iframe').contents().find('head').append(style)
 $('#popup iframe').contents().find('body').css('background-color','#FFFFFF').css('overflow-x','hidden');
 $('#popup iframe').contents().find('[contenteditable]').removeAttr('contenteditable');
 $('#popup iframe').contents().find('.editable').removeClass('editable')
 $('#popup iframe').contents().find('.image_target').removeClass('image_target');
 $('#popup iframe').contents().find('.ui-sortable-handle').removeClass('ui-sortable-handle')
 $('#popup iframe').contents().find('[href]').attr('onclick','');
 $('#popup iframe').contents().find('.parentOfBg').contents().unwrap('div');
 $('#popup iframe').contents().find('[href="#"]').attr('onclick','event.preventDefault()');
 $('#popup iframe').contents().find('#clear_template, .moduleDeleteButton, .moduleDragButton, .moduleCodeButton, .highlighter-container, .edit_link').remove();
 $('#popup iframe').contents().find('.last-table').removeClass('last-table');
 $('#popup iframe').contents().find('.currentTable').removeClass('currentTable');

 outcomeHtml = $('#popup iframe').contents().find('body').find('table').html();

 if(typeof outcomeHtml === 'undefined'){

 $('#popup iframe').contents().find('body').html('<div style="width: 100%; height: 100%; text-align: center;"><img src="img/icons/empty_mobile.png" style="padding-top: 90px; padding-bottom: 30px;"><br/><span style="font-family: Helvetica, Arial, sans-serif!important; color: #4a4a4a; line-height: 24px;"><b>Oops</b>. No Content.</span><br/><br/> <span style="font-family: Helvetica, Arial, sans-serif!important; color: #4a4a4a; line-height: 24px; font-size: 14px;">Try dragging a few modules to your<br/>editing canvas. Don\'t be shy!</span></div>')

 }

 }, 500)

 }*/
/*function openPopup() {

    $('body, html').css('overflow', 'hidden');
    $('#popupOverlay').remove();

    $tmp = $('<div></div>');

    if (typeof icon === 'undefined') {
    }
    else {
        $tmp.append('<div style="text-align: center!important; padding-bottom: 40px;"><img src="assets/css/images/' + icon + '" style="margin: auto!important;"></div>')
    }

    if (typeof headline === 'undefined') {
    }
    else {
        $tmp.append('<h3>' + headline + '</h3>')
    }

    if (typeof paragraph === 'undefined') {
    }
    else {
        $tmp.append('<p>' + paragraph + '</p>')
    }

    if (typeof btnTrue === 'undefined') {
    }
    else {
        $tmp.append('<input type="button" value="' + btnTrue + '" id="' + btnTrueId + '" class="btnTrue semi_bold" style="left: 0px;">')
    }

    if (typeof btnTrue2 === 'undefined') {
    }
    else {
        $tmp.append('<input type="button" value="' + btnTrue2 + '" id="' + btnTrueId2 + '" class="btnTrue2 semi_bold" style="right: 0px;">')
    }

    if (typeof btnFalse === 'undefined') {
    }
    else {
        $tmp.append('<input type="button" value="' + btnFalse + '" class="btnFalse semi_bold" style="right: 0px;" onclick="closePopup();">')
    }

    if (typeof textArea === 'undefined') {
    }
    else {
        $tmp.append('<textarea id="' + textAreaId + '" class="regular">' + textArea + '</textarea>')
    }

    if (typeof inputField === 'undefined') {
    }
    else {
        $tmp.append('<input type="text" placeholder="' + inputField + '" id="' + inputFieldId + '" class="light inputField">');
    }

    if (typeof customHtml === 'undefined') {
    }
    else {
        $tmp.append(customHtml)
    }


    content = $tmp.html();

    $('body').prepend('<div id="popupOverlay"><div id="popup">' + content + '<div class="closePopup"></div></div>');

    setTimeout(function () {

        $('#popupOverlay').css({
            'opacity': '1',
            'transition': '0.4s all ease',
        });

        $('#popup').css({
            'opacity': '1',
            'transition': '0.4s all ease',
            'transform': 'scale(1) translateY(-50%)'
        });

        $('.stackSR').css({
            'transition': '0.4s all ease',
            'transform': 'scale(0.9)'
        });

    }, 50);

    btn_size = $('#popup input[type="button"]').size();
    submit_size = $('#popup input[type="submit"]').size();
    size = btn_size + submit_size;

    if (size > 1) {

        $('#popup input[type="button"], #popup input[type="submit"]').each(function () {

            $(this).css('width', '50%');

        })

    }

    if (typeof invert === 'undefined') {
    }
    else {
        $('.btnFalse, .btnTrue, #popup input[type="submit"]').addClass('invert');
    }

    $('#popup input[type="text"], #popup input[type="password"], #popup textarea').focus();

    delete window.icon;
    delete window.headline;
    delete window.paragraph;
    delete window.btnTrue;
    delete window.btnTrue2;
    delete window.btnFalse;
    delete window.textArea;
    delete window.inputField;
    delete window.customHtml;
    delete window.invert;

    $(document).keyup(function (e) {

        if (e.keyCode == 27) {

            closePopup();

        }

    });

    $('.inputField').keyup(function (e) {

        if (e.keyCode == 13) {

            $('.btnTrue').trigger('click');

        }

    });


}

function closePopup() {

    $('#popupOverlay').css({
        'opacity': '0',
    });

    $('#popup').css({
        'opacity': '0',
        'transform': 'translateY(-50%) scale(0.8)'
    });

    $('.stackSR').css({
        'transform': 'scale(1)'
    });


    setTimeout(function () {

        $('html, body').css('overflow', '');
        $('#popupOverlay').remove();

    }, 400);

    $('.image_target').removeClass('image_target');

}*/

$("body").on("mouseover", ".elem", function () {
    var tableID = $(this).children("div").attr('id');
    $(this).children(".hoveElement").css("display", "block");
    $(this).children(".duplicate").css("display", "block");

});

$("body").on("mouseout", ".elem", function () {
    var tableID = $(this).children("div").attr('id');
    $(this).children(".hoveElement").css("display", "none");
    $(this).children(".duplicate").css("display", "none");
    $("[data-name='h']").focusout();


});

$('#cmdBold').click(function (e) {
    document.execCommand('bold', false, true);
//    allowSave();
});


//Command italic
$('#cmdItalic').click(function (e) {
    document.execCommand('italic', false, true);
//    allowSave();
});
$("body").on("click", ".hoveElement", function () {
    var tableID = $(this).siblings("div").attr('id');
    $('#' + tableID).remove();
    $(this).next().remove();
    $(this).remove();
    $("[data-name='h']").removeClass('active-header');


});

$("body").on("click", ".imageLink", function (e) {
    var getUrl = $(this).siblings(".imageUrl").val();
    if (getUrl === "") {
        return false;
    }
    if ($(this).closest(".changeImage").siblings('img').length > 0) {
        $(this).closest(".changeImage").siblings('img').wrap("<a href='" + getUrl + "'></a>");
    } else {
        $(this).closest(".changeImage").siblings('a').attr("href", getUrl);
    }
});

$("body").on("click", ".aLink", function (e) {
    var getUrl = $(this).siblings(".aUrl").val();
    if (getUrl === "") {
        return false;
    }
    $(this).closest(".changeALink").siblings('a').attr("href", getUrl);
});

/*$("body").on("click", "table", function () {
 var getClass = $(this).attr('class');
 if(!$('.styleChanger').is(':visible')){
 $('.styleChanger').animate({ width: 'toggle' }, 300, "easeOutBack");
 $('.module').hide();
 }
 });*/

$('.showStyle').click(function () {
    $('.styleChanger').animate({width: 'toggle'}, 300, "easeOutBack");
    $('.module').hide();
});

$('.showModule').click(function () {
    $('.styleChanger').hide();
    $('.module').animate({width: 'toggle'}, 300, "easeOutBack");
});


$("body").on("click", "#color", function () {

    $(".colorChangerDiv").css({"display": "block", "opacity": "1"});
    $("#colorpicker1").css("display", "none");
    $("#colorpicker2").css("display", "none");
    $('#btnColorPickerr').css("display", "none");
    $('#btnBgcolor').css("display", "none");
    $('#anchColorBG').css("display", "none");
    $('#anchColor1').css("display", "none");


    $('#colorpicker').farbtastic(function (color) {

        $(".myActive").css({"background-color": color});
        $("#color").css({"background-color": color});

        $("#color").val(color);

    });

    $('#colorpicker').css("display", "block");
});
$("body").on("click", "#color2", function () {
    $(".colorChangerDiv").css({"display": "block", "opacity": 1});

    $("#colorpicker1").css("display", "none");
    $("#colorpicker").css("display", "none");
    $('#btnColorPickerr').css("display", "none");
    $('#btnBgcolor').css("display", "none");
    $('#anchColorBG').css("display", "none");
    $('#anchColor1').css("display", "none");

    $('#colorpicker2').farbtastic(function (color) {

        $("div .myActive .active-header:header,.myActive .active-header[data-name='h']").css({"color": color});
        $("#color2").css({"background-color": color});
        $("#color2").val(color);

    });
    $('#colorpicker2').css("display", "block");
});


$("body").on("click", "#color1", function () {

    $(".colorChangerDiv").css({"display": "block", "opacity": 1});

    $("#colorpicker").css("display", "none");
    $("#colorpicker2").css("display", "none");
    $('#btnColorPickerr').css("display", "none");
    $('#btnBgcolor').css("display", "none");
    $('#anchColorBG').css("display", "none");
    $('#anchColor1').css("display", "none");

    $('#colorpicker1').farbtastic(function (color) {

        $(".myActive  .active-p[data-name='p']").css({"color": color});
        $("#color1").css({"background-color": color});

        $("#color1").val(color);


    });

    $('#colorpicker1').css("display", "block");
});

$("body").on("click", "#btnColor", function () {

    $(".colorChangerDiv").css({"display": "block", "opacity": 1});

    $("#colorpicker").css("display", "none");
    $("#colorpicker2").css("display", "none");
    $("#colorpicker1").css("display", "none");
    $("#btnBgcolor").css("display", "none");
    $('#anchColorBG').css("display", "none");
    $('#anchColor1').css("display", "none");

    $('#btnColorPickerr').farbtastic(function (color) {

        $("div .myActive button a,div .myActive button,div .myActive input:button,div .myActive input:submit,.active-b[data-name='button']").css({"color": color});
        $("#btnColor").css({"background-color": color});

        $("#btnColor").val(color);


    });


    $('#btnColorPickerr').css("display", "block");
});

$("body").on("click", "#btnbgColor", function () {

    $(".colorChangerDiv").css({"display": "block", "opacity": 1});

    $("#colorpicker").css("display", "none");
    $("#colorpicker2").css("display", "none");
    $("#colorpicker1").css("display", "none");
    $("#btnColorPickerr").css("display", "none");
    $('#anchColorBG').css("display", "none");
    $('#anchColor1').css("display", "none");

    $('#btnBgcolor').farbtastic(function (color) {

        $("div .myActive button,div .myActive input:button,div .myActive .active-b[data-name='button']").css({"background-color": color});
        $("#btnbgColor").css({"background-color": color});

        $("#btnbgColor").val(color);


    });


    $('#btnBgcolor').css("display", "block");
});

$("body").on("click", "#anchColor", function () {

    $(".colorChangerDiv").css({"display": "block", "opacity": 1});

    $("#colorpicker").css("display", "none");
    $("#colorpicker2").css("display", "none");
    $("#colorpicker1").css("display", "none");
    $("#btnColorPickerr").css("display", "none");
    $('#btnBgcolor').css("display", "none");
    $('#anchColor1').css("display", "none");

    $('#anchColorBG').farbtastic(function (color) {

        $("div .myActive .active-a[data-name='a']").css({"background-color": color});
        $("#anchColor").css({"background-color": color});
        $("#anchColor").val(color);


    });


    $('#anchColorBG').css("display", "block");
});

$("body").on("click", "#ancgBgcolor", function () {

    $(".colorChangerDiv").css({"display": "block", "opacity": 1});

    $("#colorpicker").css("display", "none");
    $("#colorpicker2").css("display", "none");
    $("#colorpicker1").css("display", "none");
    $("#btnColorPickerr").css("display", "none");
    $('#btnBgcolor').css("display", "none");
    $('#anchColorBG').css("display", "none");


    $('#anchColor1').farbtastic(function (color) {

        $("div .myActive .active-a[data-name='a']").css({"color": color});
        $("#ancgBgcolor").css({"background-color": color});

        $("#ancgBgcolor").val(color);


    });

    $('#anchColor1').css("display", "block");
});
$("body").on("mouseover", ".tooltipadd", function () {
    if (!($(this).parent().hasClass('tooltip'))) {
        $(this).addClass("activeAlign");
        $(this).wrap('<div class="tooltip"></div>');
        $(this).after('<span class="tooltiptext"><span id="centerAlign"><img src="images/Align-Center-icon.png" width="20" height="20"></span>&nbsp;&nbsp;<span id="leftAlign"><img src="images/align_left.png" width="20" height="20"></span>&nbsp;&nbsp;<span id="rightAlign"><img src="images/format-align-right-128.png" width="20" height="20"></span></span>');
    }
});
$("body").on("mouseover", "#CentreText", function () {
    if (!($(this).parent().hasClass('tooltip'))) {
        $(this).addClass("activeAlign");
        $(this).wrap('<div class="tooltip"></div>');
        $(this).after('<span class="tooltiptext"><span id="centerAlign"><img src="images/Align-Center-icon.png" width="20" height="20"></span>&nbsp;&nbsp;<span id="leftAlign"><img src="images/align_left.png" width="20" height="20"></span>&nbsp;&nbsp;<span id="rightAlign"><img src="images/format-align-right-128.png" width="20" height="20"></span></span>');
    }
});
$("body").on("click", "#centerAlign", function () {
    var element = $(this).parent().parent().find(".activeAlign");
    $(".tooltip h2,.activeAlign *[data-name='h']").css({"text-align": "center", "color": "red"});
    $(element).css({"text-align": "center"});
    // $(this).parent().removeClass('activeAlign');

});
$("body").on("click", "#leftAlign", function () {
    var element = $(this).parent().parent().find(".activeAlign");

    $(".tooltip h2,.activeAlign *[data-name='h']").css({"text-align": "left", "color": "blue"});
    $(element).css({"text-align": "left"});

});
$("body").on("click", "#rightAlign", function () {
    var element = $(this).parent().parent().find(".activeAlign");

    $(".tooltip h2").css({"text-align": "right", "color": "green"});
    $(element).css({"text-align": "right"});

});


$("body").on("click", ".changeImageFile", function () {
    $(this).closest('span').siblings('img').addClass('activeImg');
    //$('.activeImg').attr('src', 'assets/templates/01/images/img3.png');
});

$("body").on("change", "input:file", function (e) {
    var fileName = $(this).val();
    e.preventDefault();

    $(this).closest('form').submit();
});

$("body").on('submit', ".postImg", function (e) {
    e.preventDefault();
    $.ajax({
        url: "upload.php", // Url to which the request is send
        type: "POST",             // Type of request to be send, called as method
        data: new FormData(this), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
        contentType: false,       // The content type used when sending data to the server.
        cache: false,             // To unable request pages to be cached
        processData: false,        // To send DOMDocument or non processed data file it is set to false
        success: function (data)   // A function to be called if request succeeds
        {
            var rs = JSON.parse(data);
            $('.activeImg').attr('src', rs.image);
            $('.activeImg').removeClass('activeImg');
        }
    });
});
$("body").on("click", ".changeImgBtn", function (e) {
    e.preventDefault();
    $(this).next().find('.changeImageFile').click();

});
$("body").on("click", "#sme a", function (e) {
    e.preventDefault();
    e.stopPropagation();
});


$("body").on("click", "[data-name='h']", function (e) {


    $("[data-name='h']").removeClass('active-header');
    $("[data-name='p']").attr("contenteditable", false);
    $("[data-name='button']").attr("contenteditable", false);
    $("[data-name='a']").attr("contenteditable", false);
    //$(this).removeClass('active-header');


    $(this).addClass("active-header");
    $(this).attr("contenteditable", true);

    $(this).focus();


    /*  toggleEditable(this);*/

});



$("#menuID").click(function () {
    $("#menuCollapse").toggle();
    if ($(this).hasClass('fa-bars')) {
        $(this).removeClass('fa-bars');
        $(this).addClass('fa-times ');
    } else {
        $(this).addClass('fa-bars');
    }
});

$("#modules_link").css("display", "block");
$("#modules_link ul").css("display", "block");
$("#modules_link ul li:eq(0)").addClass("active");
$("#editOption").css("display", "block");

$("#modules_link").click(function () {
    $("#modules_link ul").css("display", "block");
    $("#preview_link ul").css("display", "none");
    $("#preview_link").removeClass('active');
    $("#options_link").removeClass('active');
    $(this).addClass('active');
    $("#options_link ul").css("display", "none");
});
$("#modules_link ul li").click(function () {

    if ($(this).hasClass('active')) {
        $(this).removeClass('active');
    } else {
        $("#modules_link ul li").removeClass('active');
        $(this).addClass('active');
        //$("#editOption li").css("display","block");
    }
    if ($(this).attr("id") == 'modules_widget') {
        $("#modules").css('display', "block");
        $("#modules_widgets").css('display', "block");
    } else {
        $("#modules").css('display', "none");
        $('.styleChanger').animate({width: 'toggle'}, 300, "easeOutBack");
    }

});

$('.dummMenu').click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    $('.dummMenu').removeClass('active');
    $(this).addClass('active');
});

$("#preview_link").click(function () {
    $("#modules_link ul").css("display", "none");
    $("#options_link").removeClass('active');
    $("#modules_link").removeClass('active');
    $(this).addClass('active');
    $("#options_link ul").css("display", "none");
    $("#preview_link ul").css("display", "block");

});

/*$("#preview_link ul li").click(function () {
 $(this).attr("id");
 alert();
 if ($(this).hasClass('active')) {


 $(this).removeClass('active');


 } else {
 $("#preview_link ul li").removeClass('active');
 $(this).addClass('active');


 //$("#editOption li").css("display","block");
 }

 });*/
$("#options_link").click(function () {
    $("#modules_link ul").css("display", "none");
    $("#options_link ul").css("display", "block");
    $("#preview_link ul").css("display", "none");

    $("#modules_link").removeClass('active');
    $("#preview_link").removeClass('active');
    $(this).addClass('active');


});

/*$("#options_link ul li").click(function () {
 alert();

 if ($(this).hasClass('active')) {


 $(this).removeClass('active');


 } else {
 $("#options_link ul li").removeClass('active');
 $(this).addClass('active');


 //$("#editOption li").css("display","block");
 }
 });*/

$('#cmdLeftAlign').click(function () {

    $('#frame div[contenteditable="true"]').css('text-align', 'left');
//    allowSave();

});


//Command align center
$('#cmdCenterAlign').click(function () {

    $('#frame div[contenteditable="true"]').css('text-align', 'center');
//    allowSave();


});


//Command align right
$('#cmdRightAlign').click(function () {

    $('#frame div[contenteditable="true"]').css('text-align', 'right');
//    allowSave();

});


function createLink() {

    m = Math.floor(Math.random() * 1E7)

    // There's actually no need to save and restore the selection here. This is just an example.
    var savedSel = saveSelection();
    var url = 'http://www.newlink.com?' + m
    restoreSelection(savedSel);
    document.execCommand("CreateLink", false, url);

    $('*').removeClass('new_link');
    $('*').removeClass('change_link');
    $('#frame a[href="http://www.newlink.com?' + m + '"]').addClass('new_link')

    link_color2 = $('.new_link').closest('[data-link-color]').attr('data-link-color');
    link_size = $('.new_link').closest('[data-link-size]').attr('data-link-size');
    link_style = $('.new_link').closest('[data-link-style]').attr('data-link-style');


    var array1 = [];
    var array2 = [];
    var array3 = [];
    y = 0;
    x = 0;
    z = 0;


    $('#frame .new_link').closest('td').find('a:not([data-bgcolor])').each(function () {

        array1[y++] = $(this).attr('data-color');
        array2[x++] = $(this).attr('style');
        array3[z++] = $(this).attr('data-size');

    });

    var counts1 = {}, max1 = 0, res1;
    var counts2 = {}, max2 = 0, res2;
    var counts3 = {}, max3 = 0, res3;

    for (var v1 in array1) {
        counts1[array1[v1]] = (counts1[array1[v1]] || 0) + 1;
        if (counts1[array1[v1]] > max1) {
            max1 = counts1[array1[v1]];
            res1 = array1[v1];
        }
    }

    for (var v2 in array2) {
        counts2[array2[v2]] = (counts2[array2[v2]] || 0) + 1;
        if (counts2[array2[v2]] > max2) {
            max2 = counts2[array2[v2]];
            res2 = array2[v2];
        }
    }

    for (var v3 in array3) {
        counts3[array3[v3]] = (counts3[array3[v3]] || 0) + 1;
        if (counts3[array3[v3]] > max3) {
            max3 = counts3[array3[v3]];
            res3 = array3[v3];
        }
    }

    link_data_style = res2;
    link_data_color = res1;
    link_data_size = res3;

    if (typeof link_style !== 'undefined') {

        $('#frame a.new_link').attr('style', link_style).attr('data-color', link_color2).attr('data-size', link_size);

    }

    else if (typeof link_data_style !== 'undefined') {

        // your code here.
        $('#frame  a.new_link').attr('style', link_data_style).attr('data-color', link_data_color).attr('data-size', link_data_size);

    }

    else {

        $('#frame  a.new_link').css('color', link_color2);

    }

    $('#style_widget').trigger('click');

    $('#frame  a[href="http://www.newlink.com?' + m + '"]').attr('href', '')


//    allowSave();


}

function saveSelection() {
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            var ranges = [];
            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                ranges.push(sel.getRangeAt(i));
            }
            return ranges;
        }
    } else if (document.selection && document.selection.createRange) {
        return document.selection.createRange();
    }
    return null;
}

function restoreSelection(savedSel) {
    if (savedSel) {
        if (window.getSelection) {
            sel = window.getSelection();
            sel.removeAllRanges();
            for (var i = 0, len = savedSel.length; i < len; ++i) {
                sel.addRange(savedSel[i]);
            }
        } else if (document.selection && savedSel.select) {
            savedSel.select();
        }
    }
}

$("body").on("click", "a", function (e) {
    e.preventDefault();

    e.stopImmediatePropagation();
});

$("body").on("click","[data-name='p']",function() {

    //console.log('ok');
    $("body").find("#selectValue").prop('selectedIndex', 0);
    ;
    $("body").find("#fontSize").prop('selectedIndex', 0);
    ;
    $("body").find("[data-name='p']").removeClass('activeParagraph');
    $(".rightBar_Innr ul li,.rightBar_icons em, .rightBar_Innr ul li.active .rightBar_icons em").trigger('hover');
    $("body").find('.landing_rightBr_icon1').trigger('click');
    $(this).addClass('activeParagraph');
    var testData = $(this).text();
    var fontSize = $(this).css('font-size');
    var fontFamily = $(this).css('font-family');
    var fontcolor = $(this).css('color');
    var dataColor = rgb2hex(fontcolor);
    if ($(this).prop("style")["font-weight"] == 'bold') {
        $("body").find(".rb_text_styles_boldBtn").addClass('active1')
    } else {
        $("body").find(".rb_text_styles_boldBtn").removeClass('active1')
    }

    if ($(this).prop("style")["font-style"] == 'italic') {
        $("body").find(".rb_text_styles_itaicBtn").addClass('active1')
    } else {
        $("body").find(".rb_text_styles_itaicBtn").removeClass('active1')
    }


    if ($(this).prop("style")["text-decoration"] == 'underline') {
        $("body").find(".rb_text_styles_UnderLineBtn").addClass('active1')
    } else {
        $("body").find(".rb_text_styles_UnderLineBtn").removeClass('active1')
    }
    $("body").find("#rightAlignText").removeClass('rb_text_styles_AlignText_right_active');
    $("body").find("#middleAlignText").removeClass('rb_text_styles_AlignText_center_active');
    $("body").find("#leftAlignText").removeClass('rb_text_styles_AlignText_left_active');
    $("body").find("#justifyAlignText").removeClass('rb_text_styles_AlignText_justify_active');
    ///-----------------------------------------  /////////////////////////////
    if ($(this).prop("style")["text-align"] == 'right') {
        $("body").find("#rightAlignText").addClass('rb_text_styles_AlignText_right_active')
    } else {
        $("body").find("#rightAlignText").removeClass('rb_text_styles_AlignText_right_active')
    }
    if ($(this).prop("style")["text-align"] == 'center') {
        $("body").find("#middleAlignText").addClass('rb_text_styles_AlignText_center_active')
    } else {
        $("body").find("#middleAlignText").removeClass('rb_text_styles_AlignText_center_active')
    }
    if ($(this).prop("style")["text-align"] == 'left') {
        $("body").find("#leftAlignText").addClass('rb_text_styles_AlignText_left_active')
    } else {
        $("body").find("#leftAlignText").removeClass('rb_text_styles_AlignText_left_active')
    }
    if ($(this).prop("style")["text-align"] == 'right') {
        $("body").find("#rightAlignText").addClass('rb_text_styles_AlignText_right_active')
    } else {
        $("body").find("#rightAlignText").removeClass('rb_text_styles_AlignText_right_active')
    }
if ($(this).prop("style")["text-align"] == 'justify') {
        $("body").find("#justifyAlignText").addClass('rb_text_styles_AlignText_justify_active')
    } else {
        $("body").find("#justifyAlignText").removeClass('rb_text_styles_AlignText_justify_active')
    }

    $("body").find(".rightBr_first_popupInn_scroll #fontSizeSpan").text(fontSize);
    $("body").find(".rightBr_first_popupInn_scroll #fontFamily").text(fontFamily);

    $("body").find(".rightBr_first_popupInn_scroll #fontDefault1").val(dataColor.color);
    $("body").find(".rightBr_first_popupInn_scroll #fontDefault1").css("background",dataColor.textColor);

    $("body").find(".rightBr_first_popupInn_scroll #backfontDefault").val(dataColor.color);
    //$("body").find(".rightBr_first_popupInn_scroll #backfontDefault").css("background",dataColor.textColor);

    $("body").find(".rightBr_first_popupInn_scroll #fontDefault2").val(dataColor.color);
    $("body").find(".rightBr_first_popupInn_scroll #fontDefault2").css("background",dataColor.textColor);

    $("body").find(".rightBr_first_popupInn_scroll #fontDefault3").val(dataColor.color);
    $("body").find(".rightBr_first_popupInn_scroll #fontDefault3").css("background",dataColor.textColor);

    $("body").find(".rightBr_first_popupInn_scroll #fontDefault4").val(dataColor.color);
    $("body").find(".rightBr_first_popupInn_scroll #fontDefault4").css("background",dataColor.textColor);

    var fonts = $('.activeParagraph').css('font-family');
    fonts = fonts.split(',');
    var font_size = $('.activeParagraph').css('font-size');

    if(fonts[0] == '"robotoregular"'){
        $(".textFontChangeSpan").text("Select Font");
        $(".textFontChange").val("");
    }else{
        $(".textFontChangeSpan").text(fonts[0]);
        $(".textFontChange").val(fonts[0]);
    }

    $(".textFontSizeSpan").text(font_size);
    $(".textFontSize").val(font_size);

    $(".rb_text_content_area").val($.trim(testData));
    $("body").find(".rb_text_content_area").attr("contenteditable", true);
    var theColorIs = $('.activeParagraph').css("color");
    var rgb = theColorIs.replace(/^(rgb|rgba)\(/,'').replace(/\)$/,'').replace(/\s/g,'').split(',');

    var rgb1 = rgb[2] | (rgb[1] << 8) | (rgb[0] << 16);
    var hex_color  = '#' + (0x1000000 + rgb1).toString(16).slice(1)
    $(".colorpicker_rgb_r :input").val(rgb[0]);
    $(".colorpicker_rgb_g :input").val(rgb[1]);
    $(".colorpicker_rgb_b :input").val(rgb[2]);

    $(".colorpicker_hex :input").val(hex_color.replace("#", ''));

    var p_width = $(".activeParagraph").css("width").replace("px", '');
    var p_height = $(".activeParagraph").css("height").replace("px", '');
    $(".activeTextWidth").val(p_width);
    $(".activeTextHeight").val(p_height);
    //console.log('CODE BY VICKY');

    if ($(this).hasClass("alignleft")) {
        if($('#leftAlignSetText').hasClass('rb_text_styles_AlignText_left_active')){
                $('#leftAlignSetText').removeClass('rb_text_styles_AlignText_left_active');
                $('#leftAlignSetText').addClass('rb_text_styles_AlignText_left');

            } else{

                $('#leftAlignSetText').addClass('rb_text_styles_AlignText_left_active');
                $('#rightAlignSetText').removeClass('rb_text_styles_AlignText_right_active');
                $('#middleAlignSetText').removeClass('rb_text_styles_AlignText_center_active');
            }
    } else if($(this).hasClass("alignright")) {
       if($('#rightAlignSetText').hasClass('rb_text_styles_AlignText_right_active')){
                $('#rightAlignSetText').removeClass('rb_text_styles_AlignText_right_active');
                $('#rightAlignSetText').addClass('rb_text_styles_AlignText_right');
            }else{
                $('#leftAlignSetText').removeClass('rb_text_styles_AlignText_left_active');
                $('#rightAlignSetText').addClass('rb_text_styles_AlignText_right_active');
                $('#middleAlignSetText').removeClass('rb_text_styles_AlignText_center_active');

            }
    } else if($(this).hasClass("aligncenter")){
        if($('#middleAlignSetText').hasClass('rb_text_styles_AlignText_center_active')){
                    $('#middleAlignSetText').removeClass('rb_text_styles_AlignText_center_active');
                    $('#middleAlignSetText').addClass('rb_text_styles_AlignText_middle');
                }else{
                    $('#middleAlignSetText').addClass('rb_text_styles_AlignText_center_active');
                    $('#leftAlignSetText').removeClass('rb_text_styles_AlignText_left_active');
                    $('#rightAlignSetText').removeClass('rb_text_styles_AlignText_right_active');
                }
    } else {
                    $('#middleAlignSetText').removeClass('rb_text_styles_AlignText_center_active');
                    $('#leftAlignSetText').removeClass('rb_text_styles_AlignText_left_active');
                    $('#rightAlignSetText').removeClass('rb_text_styles_AlignText_right_active');
    }

});

function rgb2hex(rgb) {
    var R = parseInt(rgb.substring(1, 3), 16);
    var G = parseInt(rgb.substring(3, 5), 16);
    var B = parseInt(rgb.substring(5, 7), 16);


    R = (R < 255) ? R : 255;
    G = (G < 255) ? G : 255;
    B = (B < 255) ? B : 255;

    var RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
    var GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
    var BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    var x = (rgb && rgb.length === 4) ? "#" +
    ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
    var b = "#" + RR + GG + BB;
    return {color: x, textColor: b}
}

$("body").find(".rb_text_content_area").on('change keyup paste', function() {
    $("body").find(".activeParagraph").html($(this).val());
    $("body").find(".activeParagraph").css("line-height","200%")

});
$("body").on("click","[data-name='button']",function(){
    $("body").find("[data-name='button']").removeClass('activeActiveButton');
    $(".rightBar_Innr ul li,.rightBar_icons em, .rightBar_Innr ul li.active .rightBar_icons em").trigger('hover');
    $("body").find('.landing_rightBr_icon6').trigger('click');
    $(this).addClass("activeActiveButton");
    $("body").find("#textFieldValue").val($(this).text());
    if($(this).is("input")) {
        $("body").find("#textFieldValue").val($(this).val());
    }

});

$("body").on("click",".button",function(){
    var fontSize=$(this).css('font-size');

    $("body").find(".activeActiveButton").css('font-size',fontSize);
    $("body").find(".activeActiveButton").css('padding',fontSize);

});$("body").on("change","#borderWidth",function(){
    var fontSize=$(this).val();

    $("body").find(".activeActiveButton").css('border-width',fontSize+'px');


});

$("body").on("click","[data-name='facebook']",function(){

    $("body").find("[data-name='facebook']").removeClass('activeActiveFacebook');
    $(".rightBar_Innr ul li,.rightBar_icons em, .rightBar_Innr ul li.active .rightBar_icons em").trigger('hover');
    $("body").find('.landing_rightBr_icon9').trigger('click');
    $(this).addClass("activeActiveFacebook");
    $("body").find(".facebook").val($(this).parent().attr('href'));

});

$("body").on("click","[data-name='dividerArea']",function(){

    $("#frame").find("[data-name='dividerArea']").removeClass('activeDivider');

    $("body").find('.landing_rightBr_icon4').trigger('click');
    $(this).addClass("activeDivider");
    var dividerTop = parseInt($(".activeDivider").css("margin-top"));
    var dividerBottom = parseInt($(".activeDivider").css("padding-bottom"));
    if(dividerTop != 0){
        $(".dividerTop").val(dividerTop);
    }else{
        $(".dividerTop").val("1");
    }

    if(dividerBottom != 0){
        $(".dividerBottom").val(dividerBottom);
    }else{
        $(".dividerBottom").val("1");
    }

    var boderStroke = parseInt($(".activeDivider").css('borderTopWidth'));
    if(boderStroke != 0){
        $(".boderStroke").val(boderStroke);
    }else{
        $(".boderStroke").val("");
    }

});
$("body").on("change",'#dividerTop', function () {

    $("body").find('.activeDivider').css({"margin-top":$(this).val()+'px '});
});
$("body").on("change",'#dividerBottom', function () {

    $("body").find('.activeDivider').css({"padding-bottom":$(this).val()+'px'});
});

$("body").on("change",".facebook",function(){
        $("body").find(".activeActiveFacebook").prev().attr('href',$(this).val);
});

function fontWeight(eve,name){

    if (name == 'bold') {

        if($("body").find(".activeParagraph").prop("style")["font-weight"]  == 'bold'){
            $(eve).removeClass('active1');
            $("body").find(".activeParagraph").css('font-weight','normal');
        }else{
            $(eve).addClass('active1');
            var html=$("body").find(".activeParagraph").css('font-weight','Bold');
        }


    }else if(name =='italic'){
        if($("body").find(".activeParagraph").prop("style")["font-style"]  == 'italic'){
            $(eve).removeClass('active1');
            $("body").find(".activeParagraph").css('font-style','normal');
        }else{
            $(eve).addClass('active1');
            var html=$("body").find(".activeParagraph").css('font-style','italic');
        }

    }else{
        if($("body").find(".activeParagraph").prop("style")["text-decoration"]  == 'underline'){
            $(eve).removeClass('active1');
            $("body").find(".activeParagraph").css('text-decoration','none');
        }else{
            $(eve).addClass('active1');
            var html=$("body").find(".activeParagraph").css('text-decoration','underline');
        }
    }


}




function openPopup() {

    $('body, html').css('overflow','hidden');
    $('#popupOverlay').remove();

    $tmp = $('<div></div>');

    if(typeof icon === 'undefined'){}
    else { $tmp.append('<div style="text-align: center!important; padding-bottom: 40px;"><img src="img/icons/'+icon+'" style="margin: auto!important;"></div>') }

    if(typeof headline === 'undefined'){}
    else { $tmp.append('<h3 class="font-bold">'+headline+'</h3>') }

    if(typeof paragraph === 'undefined'){}
    else { $tmp.append('<p>'+paragraph+'</p>') }

    if(typeof btnTrue === 'undefined'){}
    else { $tmp.append('<input type="button" value="'+btnTrue+'" id="'+btnTrueId+'" class="btnTrue semi_bold" style="left: 0px;">') }

    if(typeof btnTrue2 === 'undefined'){}
    else { $tmp.append('<input type="button" value="'+btnTrue2+'" id="'+btnTrueId2+'" class="btnTrue semi_bold" style="left: 0px;">') }

    if(typeof btnFalse === 'undefined'){ }
    else { $tmp.append('<input type="button" value="'+btnFalse+'" class="btnFalse semi_bold" style="right: 0px;" onclick="closePopup();">') }

    if(typeof textArea === 'undefined'){}
    else { $tmp.append('<textarea id="'+textAreaId+'" class="regular">'+textArea+'</textarea>') }

    if( typeof  hiddenField === 'undefined'){}
    else{$tmp.append('<input  type="hidden" value="'+hiddenField+'" id="DeleteModule">')}

    if(typeof inputField === 'undefined'){}
    else { $tmp.append('<input type="text" placeholder="'+inputField+'" id="'+inputFieldId+'" class="regular inputField">'); }

    if(typeof customHtml === 'undefined'){}
    else { $tmp.append(customHtml) }


    content = $tmp.html();

    $('body').prepend('<div id="popupOverlay"><div id="popup">'+content+'<div class="closePopup"></div></div>');

    setTimeout(function() {

        $('#popupOverlay').css({
            'opacity': '1',
            'transition': '0.4s all ease',
        });

        $('#popup').css({
            'opacity': '1',
            'transition': '0.4s all ease',
            'transform': 'scale(1) translateY(-50%)'
        });

        $('#wrapper').css({
            'transition': '0.4s all ease',
            'transform': 'scale(0.9)'
        });

    }, 50);

    btn_size = $('#popup input[type="button"]').size();
    submit_size = $('#popup input[type="submit"]').size();
    size = btn_size + submit_size;

    if(size > 1) {

        $('#popup input[type="button"], #popup input[type="submit"]').each(function(){

            $(this).css('width','50%');

        })

    }

    if(typeof invert === 'undefined'){ }
    else { $('.btnFalse, .btnTrue, #popup input[type="submit"]').addClass('invert'); }

    $('#popup input[type="text"], #popup input[type="password"], #popup textarea').focus();

    delete window.icon;
    delete window.headline;
    delete window.paragraph;
    delete window.btnTrue;
    delete window.btnTrue2;
    delete window.btnFalse;
    delete window.textArea;
    delete window.inputField;
    delete window.customHtml;
    delete window.invert;

    $(document).keyup(function(e){

        if (e.keyCode == 27) {

            closePopup();

        }

    });

    $('.inputField').keyup(function(e){

        if (e.keyCode == 13) {

            $('.btnTrue').trigger('click');

        }

    });


}

function closePopup() {

    $('#popupOverlay').css({
        'opacity': '0',
    });

    $('#popup').css({
        'opacity': '0',
        'transform': 'translateY(-50%) scale(0.8)'
    });

    $('#wrapper').css({
        'transform': 'scale(1)'
    });


    setTimeout(function(){

        $('html, body').css('overflow','');
        $('#popupOverlay').remove();

    }, 400);

    $('.image_target').removeClass('image_target');

}
$(document).on('click', '#clear_template_true', function(){

    $('#clear_template').remove();
    $('#frame div').remove();
    $('#frame').addClass('empty');
    $('#frame').addClass('empty').css('min-height','250px');
    $(".rb_text_content_area").val('');
    $(".rb_pop_content_topTabs_btn").removeClass("active");
    $(".rb_pop_content_topTabs_btn :first").addClass("active");
    $(".rb_pop_content_topTabs_btn :first").trigger("click");
    $(".rightBr_first_tabClos").trigger("click");

    $(".activeTextWidth").val('');
    $(".activeTextHeight").val('');

    closePopup();

});

$(document).on("click","#delete_module_true",function(){
    var moduleVal=$(document).find("#DeleteModule").val();

//    console.log(moduleVal);

    var  valueFind=$('#frame').find('div[id^="' + moduleVal + '"]');
    var is_image = $('#frame').find('div[id^="' + moduleVal + '"]').attr("data-module");
//    if(is_image == "imageArea"){
        $(".activeImage").attr("src", "assets/template/images/rb_img_content_loadedPic.png");
        $(".activeImageName").text("clouds.1.jpg");
        $(".activeImageWidth").text("1200");
        $(".activeImageHeight").text("235");

        $(".rb_text_content_area").val('');
        $(".rb_pop_content_topTabs_btn").removeClass("active");
        $(".rb_pop_content_topTabs_btn :first").addClass("active");
        $(".rb_pop_content_topTabs_btn :first").trigger("click");
//        $(".rightBr_first_tabClos").trigger("click");

        $(".activeTextWidth").val('');
        $(".activeTextHeight").val('');

//    }

    $(valueFind).remove();


    count = $('#frame div[data-module]').size();

    if ($(count).length > 0) {

        $('#frame').removeClass('empty').css('min-height', '250px');

        if ($('#clear_template').length > 0) {


        }

        else {

            $('.signIn_dropAbleArea_title').prepend('<input type="button" id="clear_template" class="semi_bold" value="Clear Template">');

        }

    }

    else {

        $('#frame').addClass('empty').css('min-height', '250px');
        $('.signIn_dropAbleArea_title #clear_template').remove();
        $('#frame').css('background-color', 'none');
        $(".styleData").css("display", "none");
        $(".noModule").css("display", "block");

    }
    closePopup();


});

function sliderImages(e){





    var simple_slideshow	= $(".carousel-inner");
    var dimens	= $(".carousel-indicators");
    listItems 			= simple_slideshow.children('div');
    dots 			= dimens.children('li');
    for (i = 0; i < listItems.length; i++) {
        $(simple_slideshow).find(listItems[i]).css("display","none");
        $(listItems[i]).addClass('animated');
    }
    for (j = 0; j < dots.length; j++) {

        $(dots[j]).removeClass("active");
    }
    $(dimens).find("#"+e).addClass("active");
    $(".carousel-inner").find("#"+e).css("display","block");
}



 $('#frame').on('click', '[data-module]', function (e) {

        $("#frame").find("[data-module]").removeClass('backColor');



         $(this).addClass('backColor');


 });

$("body").on("change paste",'.textAreatCaption',function(){
    var txt = $(this).val()
    $("#frame").find("#CurrentCaption").text(txt);
});
