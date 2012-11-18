var app = app || {};

$(function($) {
    'use strict';

    app.AppView = Backbone.View.extend({
        initialize: function(a) {
            var chartView, scrollerView;
            chartView = new app.ChartView({
                dataModel: a["dataModel"]
            });
            scrollerView = new app.ScrollerView({
                dataModel: a["dataModel"]
            });
        }
    });
});
