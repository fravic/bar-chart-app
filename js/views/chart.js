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
            model.on("change:counts", this.countsChanged);
        },

        countsChanged: function(model, counts) {
        },

        render: function() {
        }
    });
});
