var app = app || {};

$(function($) {
    'use strict';

    app.AppView = Backbone.View.extend({
        initialize: function(a) {
            var scrollerView, chartView;

            this.dataModel = a["dataModel"];

            scrollerView = new app.ScrollerView({
                dataModel: a["dataModel"]
            });
            chartView = new app.ChartView({
                dataModel: a["dataModel"],
                scroller: scrollerView
            });

            $("INPUT#search").focus(this.onSearchFocus);   
            $("INPUT#search").blur(this.onSearchBlur);
            $("INPUT#search").on('input', _.bind(this.onSearchChange, this));
        },
        
        onSearchFocus: function() {
            $("IMG.search").attr("src", "./img/search_focus.png");
        },

        onSearchBlur: function() {
            $("IMG.search").attr("src", "./img/search.png");
        },

        onSearchChange: function(e) {
            this.dataModel.search($(e.target).val());
        },
    });
});
