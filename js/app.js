var app = app || {};

$(function($) {
    var data, view;
    data = new app.CityData();
    view = new app.AppView({
        dataModel: data
    });
    data.load('data/citydata.json');
});
