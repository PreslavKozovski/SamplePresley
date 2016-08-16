'use strict';

app.LogIn = kendo.observable({
    onShow: function () {
        app.LogIn.set("username", "");
        app.LogIn.set("password", "");
        app.Register.set("username", "");
        app.Register.set("password", "");
        app.Register.set("email", "");
        app.ForgotPassword.set("email", "");
    },
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
        el.Users.login(this.username, this.password,
            function (data) {
                app.mobileApp.navigate("components/Home/Home.html");
            },
            function () {
                navigator.notification.alert("Unfortunately we could not find your account.");
            });
    }
});