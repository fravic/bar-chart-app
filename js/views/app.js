var app = app || {};

$(function($) {
    'use strict';

    app.AppView = Backbone.View.extend({
        initialize: function(a) {
            var chartView;
            chartView = new app.ChartView({
                dataModel: a["dataModel"]
            });
        }
    });
});
