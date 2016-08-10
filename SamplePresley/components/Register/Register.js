'use strict';

app.Register = kendo.observable({
    onShow: function () {},
    afterShow: function () {},
    submit: function () {
        if (!this.username) {
            navigator.notification.alert("Username is required.");
            return;
        }
        if (!this.password) {
            navigator.notification.alert("Password is required.");
            return;
        }
        el.Users.register(this.username, this.password, {
                Email: this.email
            },
            function () {
                navigator.notification.alert("Your account was successfully created.");
                app.mobileApp.navigate("components/LogIn/LogIn.html");
            },
            function () {
                navigator.notification.alert("Unfortunately we were unable to create your account.");
            });
    }
});