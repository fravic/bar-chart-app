var app = app || {};

$(function($) {
    'use strict';

    var BAR_HEIGHT = 25;
    var CHART_RIGHT_PAD = 100;

    app.ChartView = Backbone.View.extend({
        initialize: function(a) {
            if (!a["dataModel"]) {
                throw "No data model specified";
            }

            this.model = a["dataModel"];
            this.model.on("change:counts", this.dataChanged, this);
            this.model.on("change:searchTerm", this.searchChanged, this);

            if (!a["scroller"]) {
                throw "No scroller specified";
            }

            this.scroller = a["scroller"];
            this.scroller.on("scrollToPage", this.pageChanged, this);
        },

        dataChanged: function(model, counts) {
            this.setup();
        },

        pageChanged: function(scroller, pageNum) {
            this.render();
        },

        searchChanged: function() {
            this.render();
        },

        setup: function() {
            var self, h, w, chart, counts, value, label, bars;

            self = this;
            chart = d3.select("#chart");
            w = $("#chart").width() - CHART_RIGHT_PAD;
            h = $("#chart").height();

            counts = this.model.bucketCounts(this.scroller.pageNum);
            value = function(d) { return d[1]; }
            label = function(d) { return d[0]; }

            self.x = d3.scale
                .linear()
                .domain([0, this.model.max()])
                .range(["0px", w + "px"]);

            bars = chart.selectAll("div.bar")
                .data(counts)
                .enter().append("div")
                .attr("class", "bar")
                .style("width", function(d) {
                    return self.x(value(d));
                })
                .style("background-color", function(d) {
                    return "rgb(70, 130, " + 
                        (Math.min(value(d) * 4, 100) + 150) + 
                        ")";
                });

            bars.append("div")
                .attr("class", "label")
                .text(label);

            bars.append("div", ".bar")
                .attr("class", "count")
                .text(value);
        },

        render: function() {
            var self, chart, counts, value, label, bars;

            self = this;
            chart = d3.select("#chart");
            counts = this.model.bucketCounts(this.scroller.pageNum);
            value = function(d) { return d[1]; }
            label = function(d) { return d[0]; }

            bars = chart.selectAll("div.bar")
                .data(counts)
                .attr("class", "bar")
                .style("width", function(d) {
                    return self.x(value(d));
                })
                .style("background-color", function(d) {
                    return "rgb(70, 130, " + 
                        (Math.min(value(d) * 4, 100) + 150) + 
                        ")";
                });

            bars.select("div.label")
                .text(label);
            bars.select("div.count")
                .text(value);
        }
    });
});
