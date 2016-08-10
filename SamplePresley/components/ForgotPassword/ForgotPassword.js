'use strict';

app.ForgotPassword = kendo.observable({
    onShow: function () {},
    afterShow: function () {},
    submit: function () {
        if (!this.email) {
            navigator.notification.alert("Email address is required.");
            return;
        }
        $.ajax({
            type: "POST",
            url: "https://api.everlive.com/v1/" + apiKey + "/Users/resetpassword",
            contentType: "application/json",
            data: JSON.stringify({
                Email: this.email
            }),
            success: function () {
                navigator.notification.alert("Your password was successfully reset. Please check your email for instructions on choosing a new password.");
                app.mobileApp.navigate("components/LogIn/LogIn.html");
            },
            error: function () {
                navigator.notification.alert("Unfortunately, an error occurred resetting your password.")
            }
        });
    }
});