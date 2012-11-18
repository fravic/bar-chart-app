var app = app || {};

$(function($) {
    'use strict';

    app.ScrollerView = Backbone.View.extend({
        initialize: function(a) {
            var model;

            if (!a["dataModel"]) {
                throw "No data model specified";
            }

            model = a["dataModel"];
            model.on("change:counts", this.countsChanged, this);
        },

        countsChanged: function(model, counts) {
            var numBuckets = 100;
        },

        render: function(buckets) {
        }
    });
});
