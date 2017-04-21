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
        clickable:true,
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