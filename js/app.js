var app = app || {};

$(function($) {
    var data, view;
    data = new app.Data({
        parser: function(json) {
            var cities, counts;
            cities = _.find(json["data"], function(set) {
                return set["name"] == "City";
            })["values"];
            counts = _.reduce(cities, function(c, n) {
                if (!c[n]) {
                    c[n] = 0;
                }
                c[n]++;
                return c;
            }, {});
            this.set("counts", counts);
        }
    });
    view = new app.AppView({
        dataModel: data
    });
    data.load('data/citydata.json');
});
