var app = app || {};

$(function($) {
    'use strict';

    app.Data = Backbone.Model.extend({
        defaults: {
            "data": null,
            "counts": {}
        },
        
        load: function(url) {
            var self = this;
            d3.json(url, function(json) {
                self.parse(json);
            });
        },

        // Set the "counts" variable on the data model
        /* abstract */ parse: function(json) {
            throw "Subclass abstract method parse";
        }
    });
});
