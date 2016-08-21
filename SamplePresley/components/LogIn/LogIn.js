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
        everlive.Users.login(this.username, this.password,
            function (data) {
                app.mobileApp.navigate("components/Home/Home.html");
            },
            function () {
                navigator.notification.alert("Unfortunately we could not find your account.");
            });
    },
    logFB: function () {
        if (!this.checkSimulator()) {
            facebookConnectPlugin.login(["email"], function (response) {
                if (response.status === "connected") {
                    alert("You are: " + response.status + ", details:\n\n" + JSON.stringify(response));
                    app.mobileApp.navigate("components/Home/Home.html");
                } else {
                    alert("You are not logged in");
                }
            });
        }
    },
    checkSimulator: function () {
        if (window.navigator.simulator === true) {
            alert('This plugin is not available in the simulator.');
            return true;
        } else if (window.facebookConnectPlugin === undefined) {
            alert('Plugin not found. Maybe you are running in AppBuilder Companion app which currently does not support this plugin.');
            return true;
        } else {
            return false;
        }
    }
});