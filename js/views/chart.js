var app = app || {};

$(function($) {
    'use strict';

    var BAR_MIN_WIDTH = 14;
    var BAR_HEIGHT = 25;
    var CHART_RIGHT_PAD = 120;

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

            $(window).resize(_.bind(this.windowResized, this));
            this.windowResized();
        },

        windowResized: function() {
            var h, bucketSize;
            h = $("#chart").height();
            bucketSize = Math.floor(h/BAR_HEIGHT);
            this.model.set("bucketSize", bucketSize);
            this.render();
        },

        dataChanged: function() {
            this.render();
        },

        pageChanged: function() {
            this.render();
        },

        searchChanged: function() {
            this.render();
        },

        render: function() {
            var x, h, w, counts, value, label, barsD, barsE;

            w = $("#chart").width() - CHART_RIGHT_PAD;
            h = $("#chart").height();

            counts = this.model.bucketCounts(this.scroller.pageNum);
            value = function(d) { return d[1]; }
            label = function(d) { return d[0]; }

            x = d3.scale
                .linear()
                .domain([0, this.model.max()])
                .range([BAR_MIN_WIDTH + "px", w + "px"]);

            barsD = d3.select("#chart").selectAll("div.bar")
                .data(counts);
            barsE = barsD.enter().append("div")
                .attr("class", "bar");
            barsE.append("div")
                .attr("class", "label");
            barsE.append("div")
                .attr("class", "count");
            barsD.exit().remove();
            barsD.style("width", function(d) {
                return x(value(d));
            }).style("background-color", function(d) {
                return "rgb(70, 130, " + 
                    (Math.min(value(d) * 4, 100) + 150) + 
                ")";
            });

            barsD.select("div.label")
                .text(label);
            barsD.select("div.count")
                .text(value);
        },
    });
});
