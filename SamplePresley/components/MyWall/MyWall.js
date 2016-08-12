'use strict';

app.MyWall = kendo.observable({
    onShow: function () {},
    afterShow: function () {},
    load: function () {
        el.Files.get().then(function (data) {
            var files = [];
            data.result.forEach(function (image) {
                files.push(image.Uri);
            });
            $("#images").kendoMobileListView({
                dataSource: files,
                template: "<img src='#: data #'>"
            });
        });
    }
});