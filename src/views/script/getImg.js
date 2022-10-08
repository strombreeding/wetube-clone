"use strict";
const getImg = () => {
    $(document).ready(function () {
        $.ajax({
            type: "POST",
            url: "/api/:id/userPlace",
            data: {},
            dataType: "JSON",
            success: function (response) {
            }
        });
    });
};
