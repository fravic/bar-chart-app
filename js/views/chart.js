var app = app || {};

$(function($) {
    'use strict';

    app.ChartView = Backbone.View.extend({
        initialize: function(a) {
            var model;

            if (!a["dataModel"]) {
                throw "No data model specified";
            }

            model = a["dataModel"];
            model.on("change:counts", this.countsChanged, this);
        },

        countsChanged: function(model, counts) {
            this.render(counts);
        },

        render: function(counts) {
            d3.select("#chart").selectAll("div").data(counts).enter().append("div").style("width", function(d) { return (d[1] * 10) + "px"}).text(function(d) { return d[0] });
        }
    });
});
