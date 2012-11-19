var app = app || {};

$(function($) {
    'use strict';

    app.CityData = app.Data.extend({
        parse: function(json) {
            var cities, counts;

            // Take the array of city names
            cities = _.find(json["data"], function(set) {
                return set["name"] == "City";
            })["values"];
            
            // Sort and count by number of occurances
            cities = _.sortBy(cities, function(s) { 
                return s.toUpperCase();
            });
            counts = _.pairs(_.countBy(cities, function(s) {
                return s;
            }));

            this.set("counts", counts);
        }
    });
});
