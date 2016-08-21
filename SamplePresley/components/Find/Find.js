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
                            alert("dsa");
                            app.mobileApp.navigate("components/addProduct/addProduct.html");
                        }
                    }
                },
                function (error) {
                    alert("Error: " + error);
                    app.mobileApp.navigate("components/Home/Home.html");
                });
        }
    },
    dsa: function () {
        var dsa = "components/Home/Home.html?id=123";
        app.mobileApp.navigate(dsa);
    }
});