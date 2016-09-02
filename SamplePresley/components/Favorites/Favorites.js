'use strict';

app.Favorites = kendo.observable({
    onShow: function () {
        window.Data.data.filter({
            field: "is_favorite",
            operator: "eq",
            value: true
        });
    },
    afterShow: function () {
        window.Data.data.filter([]);
    }
});