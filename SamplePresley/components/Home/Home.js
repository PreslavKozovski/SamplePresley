'use strict';

app.Home = kendo.observable({
    onShow: function () {},
    afterShow: function () {},
    load: function () {
    },
    
});

window.Data = {
    data: new kendo.data.DataSource({
        transport: {
            read: {
                url: "data/data.js",
                type: "get",
                dataType: "json"
            }
        },
        schema: {
            data: "data"
        }
    })
}

/*
everlive.Files.get().then(function (data) {
            var files = [];
            data.result.forEach(function (image) {
                files.push(image.Uri);
            });
            $("#images").kendoMobileListView({
                dataSource: files,
                template: "<img src='#: data #'>"
            });
        });



        var dataProvider = everlive;

        //Initialize the Kendo DataSource
        var source = new kendo.data.DataSource({
            type: 'everlive',
            serverFiltering: true,
            transport: {
                typeName: 'Products',
                dataProvider: dataProvider
            },
            pageSize: 5
        });
        console.log(source);
*/