'use strict';
var apiKey = "j07342f56sk0kpr8",
    scheme = 'https',
    app = {
        data: {}
    };
var el = new Everlive({
    apiKey: apiKey,
    scheme: scheme
});

(function () {
    function initialize() {
        app.mobileApp = new kendo.mobile.Application(document.body, {
            skin: "nova",
            transition: "slide",
            initial: "components/LogIn/LogIn.html"
        });
        navigator.splashscreen.hide();
    }
    document.addEventListener("deviceready", initialize);
}());