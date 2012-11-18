var app = app || {};

$(function($) {
    'use strict';

    app.Data = Backbone.Model.extend({
        defaults: {
            "data": null,
            "parser": null,
            "counts": {}
        },

        initialize: function(a) {
            if (!a["parser"]) {
                throw "No data parser specified";
            }
            this.set("parser", a["parser"])
        },
        
        load: function(url) {
            var self = this;
            d3.json(url, function(json) {
                self.get("parser").call(self, json);
            });
        },
    });
});
