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
    toMap: function () {
        var GoTo = "components/productMap/productMap.html?id=" + product.barcode;
        app.mobileApp.navigate(GoTo);
    },
});