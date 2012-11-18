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
        },

        bucketCounts: function() {
            return this.get("counts").slice(0, 100);
        },
        
        bucketSums: function() {
            return [];
        },

        maxVal: function() {
            if (this.max) return this.max;
            this.max = d3.max(_.map(this.get("counts"), function(d) {
                return d[1];
}));
            return this.max;
        },
    });
});
