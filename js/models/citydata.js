var app = app || {};

$(function($) {
    'use strict';

    app.CityData = app.Data.extend({
        parser: function(json) {
            var cities, counts;
            cities = _.find(json["data"], function(set) {
                return set["name"] == "City";
            })["values"];
            counts = _.pairs(_.reduce(cities, function(c, n) {
                if (!c[n]) {
                    c[n] = 0;
                }
                c[n]++;
                return c;
            }, {}));
            this.set("counts", counts);
        }
    });
});
