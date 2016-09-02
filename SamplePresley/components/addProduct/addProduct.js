'use strict';
var success = function (imageUri) {
    app.addProduct.fields.image = imageUri;
};
var error = function () {
    navigator.notification.alert("Unfortunately we could not add the image");
};
var config = {
    targetHeight: 400,
    targetWidth: 400
};

app.addProduct = kendo.observable({
    fields: {
        ID: '',
        name: '',
        barcode: '',
        site: '',
        image: '',
        favorite: false,
        Latitudes: [
            52.3602160,
            52.3702160,
            52.3732160
        ],
        Longitudes: [
            4.8891680,
            4.8911680,
            4.8941680
        ]
    },
    onShow: function () {
        app.addProduct.fields.ID=window.Data.data.view().length;
        var location = window.location.toString();
        app.addProduct.fields.barcode = location.substring(location.lastIndexOf('?') + 4);
    },
    afterShow: function () {
    },
    checkboxClick: function () {
        this.fields.favorite = !this.fields.favorite;
    },
    CancelForm: function () {
        app.mobileApp.navigate("components/Home/Home.html");
    },
    SubmitForm: function () {
        window.Data.data.add({
            ID: this.fields.ID,
            name: this.fields.name,
            barcode: this.fields.barcode,
            site_url: "http://" + this.fields.site + "/",
            image_url: this.fields.image,
            is_favorite: this.fields.favorite,
            Latitudes: this.fields.Latitudes,
            Longitudes: this.fields.Longitudes
        });

        app.mobileApp.navigate("components/Home/Home.html");
    },
    takePic: function () {
        navigator.camera.getPicture(success, error, config);
    }

});

