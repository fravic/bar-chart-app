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
                self.parser(json);
            });
        },

        parser: function(json) {
            // This is specific to the data set
        }
    });
});
