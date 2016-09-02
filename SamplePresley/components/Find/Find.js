'use strict';

app.Find = kendo.observable({
    onShow: function () {},
    afterShow: function () {},
    takePic: function () {
        if (window.navigator.simulator === true) {
            alert("Not Supported in Simulator.");
        }
        else {
            cordova.plugins.barcodeScanner.scan(
                function (result) {
                    if (!result.cancelled) {
                        alert(result.text);
                        window.Data.data.filter({
                            field: "barcode",
                            operator: "eq",
                            value: result.text
                        });
                        if (window.Data.data.view()[0]) {
                            var GoTo = "components/productDetails/productDetails.html?id=" + result.text;
                            app.mobileApp.navigate(GoTo);
                        }
                        else {
                            window.Data.data.filter([]);
                            var GoTo = "components/addProduct/addProduct.html?id=" + result.text;
                            app.mobileApp.navigate(GoTo);
                        }
                    }
                },
                function (error) {
                    alert("Error: " + error);
                    app.mobileApp.navigate("components/Home/Home.html");
                });
        }
    },
    showEl: function () {
        window.Data.data.add({
            ID: 4,
            name: "Pen",
            barcode: "123456",
            site_url: "http://www.gbg.bg",
            image_url: "data/img/pen.jpg",
            is_favorite: true,
            Latitudes: [52.3602160, 52.3702160, 52.3732160],
            Longitudes: [4.8891680, 4.8911680, 4.8941680]
        });
        console.log(window.Data.data.view())
    }
});