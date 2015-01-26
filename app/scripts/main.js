/*global SharePic, $*/


window.SharePic = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
        Parse.initialize("MsvqKK0JbCULl8mRG0syxpnBEZQTE7YdCO6GtvW9", "uwJK7XXI9jqqHLGzB7VNcdZOvCK7k3CJSOEyVr6D");
    }
};

$(document).ready(function () {
    'use strict';
    SharePic.init();
});
