'use strict';
var product;
var success = function (msg) {
    alert("Immage saved :)");
};
var error = function (err) {
    alert(err);
};
app.productDetails = kendo.observable({
    onShow: function () {
        var location = window.location.toString();
        var barcode = location.substring(location.lastIndexOf('?') + 4);
        window.Data.data.filter({
            field: "barcode",
            operator: "eq",
            value: barcode
        });
        product = window.Data.data.view()[0];
        var prod = {
            title: product.name,
            image_url: product.image_url
        };
        kendo.bind($('#pdetails'), prod, kendo.mobile.ui);
        if (product.is_favorite) {
            $('#favorite').data('kendoMobileSwitch').toggle();
        }
    },
    afterShow: function () { },
    onHide: function () {
        window.Data.data.filter([]);
    },
    openLink: function () {
        window.open(product.site_url);
    },
    setIsFavorite: function () {
        Data.data.fetch(function () {
            product.set("is_favorite", !product.get("is_favorite"));
            Data.data.sync();
        });
    },
    dwGallery: function () {
        var url = product.image_url;
        var canvas, context, imageDataUrl, imageData;
        var img = new Image();
        img.onload = function () {
            canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            context = canvas.getContext('2d');
            context.drawImage(img, 0, 0);
            try {
                imageDataUrl = canvas.toDataURL('image/jpeg', 1.0);
                imageData = imageDataUrl.replace(/data:image\/jpeg;base64,/, '');
                cordova.exec(
                    success,
                    error,
                    'Canvas2ImagePlugin',
                    'saveImageDataToLibrary',
                    [imageData]
                );
            }
            catch (e) {
                error(e.message);
            }
        };
        try {
            img.src = url;
        }
        catch (e) {
            error(e.message);
        }
    },
    uploadFile: function () {
        var fileURL = product.image_url;
        var uri = encodeURI("http://posttestserver.com/post.php");
        var options = new FileUploadOptions();

        options.fileKey = "file";
        options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
        options.mimeType = "text/plain";
        options.headers = {
            Connection: "Close"
        };
        options.chunkedMode = false;

        var ft = new FileTransfer();

        ft.upload(fileURL, uri, onSuccess, onError, options);

        function onSuccess(r) {
            alert("Success");
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent);
        }

        function onError(error) {
            alert("An error has occurred: Code = " + error.code);
            console.log("upload error source " + error.source);
            console.log("upload error target " + error.target);
        }
    },
    dwLibrary: function () {
        var that = this,
			filePath = "";

        that.getFilesystem(
				function (fileSystem) {
				    console.log("gotFS");

				    if (device.platform === "Android") {
				        that.getFolder(fileSystem, folderName, function (folder) {
				            filePath = folder.toURL() + "\/" + fileName;
				            that.transferFile(uri, filePath)
				        }, function () {
				            console.log("failed to get folder");
				        });
				    } else {
				        var filePath;
				        var urlPath = fileSystem.root.toURL();
				        if (device.platform == "Win32NT") {
				            urlPath = fileSystem.root.fullPath;
				        }
				        if (parseFloat(device.cordova) <= 3.2) {
				            filePath = urlPath.substring(urlPath.indexOf("/var")) + "\/" + fileName;
				        } else {
				            filePath = urlPath + "\/" + fileName;
				        }
				        that.transferFile(uri, filePath)
				    }
				},
				function () {
				    console.log("failed to get filesystem");
				}
		);
    },
    getFilesystem: function (success, fail) {
        window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, success, fail);
    },

    getFolder: function (fileSystem, folderName, success, fail) {
        fileSystem.root.getDirectory(folderName, { create: true, exclusive: false }, success, fail)
    },

    transferFile: function (uri, filePath) {
        var transfer = new FileTransfer();
        transfer.download(
			uri,
			filePath,
			function (entry) {
			    var targetPath = entry.toURL();
			    if (device.platform == "Win32NT") {
			        targetPath = entry.fullPath;
			    }
			    var image = document.getElementById("downloadedImage");
			    image.src = targetPath;
			    image.style.display = "block";
			    image.display = targetPath;
			},
			function (error) {
			    console.log("download error source " + error.source);
			    console.log("download error target " + error.target);
			    console.log("upload error code" + error.code);
			}
			);
    },
});