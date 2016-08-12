'use strict';

app.Settings = kendo.observable({
    onShow: function () {},
    afterShow: function () {},
    logout: function (event) {
        event.preventDefault();
        el.Users.logout(function () {
            app.mobileApp.navigate("components/LogIn/LogIn.html");
        }, function () {
            navigator.notification.alert("Unfortunately an error occurred logging out of your account.");
        });
    }
});