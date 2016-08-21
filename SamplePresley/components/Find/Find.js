'use strict';

app.Find = kendo.observable({
    onShow: function () {},
    afterShow: function () {},
    takePic: function () {
        var that = this;
        if (window.navigator.simulator === true) {
            alert("Not Supported in Simulator.");
        }
        else {
            cordova.plugins.barcodeScanner.scan(
                function (result) {
                    if (!result.cancelled) {
                        alert(reslt.text);
                        app.mobileApp.navigate("components/Home/Home.html");
                    }
                },
                function (error) {
                    alert("Error: " + error);
                    app.mobileApp.navigate("components/Home/Home.html");
                });
        }
    }
});