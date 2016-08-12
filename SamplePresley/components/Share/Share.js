'use strict';

app.Share = kendo.observable({
    onShow: function () {},
    afterShow: function () {},
    takePic: function () {
        var success = function (data) {
            var d = new Date();
            var n = d.getTime();
            el.Files.create({
                Filename: n + ".jpg",
                ContentType: "image/jpeg",
                base64: data,
            });
        };
        var error = function () {
            navigator.notification.alert("Unfortunately we could not add the image");
        };
        var config = {
            destinationType: Camera.DestinationType.DATA_URL,
            targetHeight: 640,
            targetWidth: 480
        };
        navigator.camera.getPicture(success, error, config);
    }
});