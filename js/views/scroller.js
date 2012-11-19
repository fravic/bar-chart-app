var app = app || {};

$(function($) {
    'use strict';

    app.ScrollerView = Backbone.View.extend({
        initialize: function(a) {
            if (!a["dataModel"]) {
                throw "No data model specified";
            }

            this.model = a["dataModel"];
            this.model.on("change:counts", this.dataChanged, this);
            this.model.on("change:searchTerm", this.searchChanged, this);

            this.lastPageNum = 0;
            $("#scroller").scroll(_.bind(this.onScroll, this));
        },

        onScroll: function() {
            var pos, h;
            pos = $("#scroller").scrollTop() + $("#indicator").height() / 2;
            h = $("#side")[0].scrollHeight;
            this.pageNum = Math.floor(pos/h * this.numPages);

            if (this.pageNum != this.lastPageNum) {
                this.trigger("scrollToPage", this, this.pageNum);
                this.lastPageNum = this.pageNum;
            }
        },

        dataChanged: function(model, counts) {
            this.numPages = model.letterBuckets().length;
            this.render();
            this.onScroll();
        },

        searchChanged: function() {
            this.render();
        },

        setup: function() {
            var buckets, letters, scroller, side;

            buckets = this.model.letterBuckets();
            letters = this.model.letters();
            this.numPages = buckets.length;
            
            scroller = d3.select("#buckets");
            scroller.selectAll(".page")
                .data(buckets)
                .enter().append("div")
                .attr("class", "page")
                .text(function(d) {
                    return d[0];
                });

            buckets = d3.select("#side");
            buckets.selectAll(".letter")
                .data(letters)
                .enter().append("div")
                .attr("class", "letter")
                .text(String);
        },

        render: function() {
            var buckets, letters, scroller, side;

            buckets = this.model.letterBuckets();
            letters = this.model.letters();
            this.numPages = buckets.length;

            scroller = d3.select("#buckets")
                .data(buckets);
            
            scroller.text(function(d) {
                    return d[0];
                });
            scroller.exit().remove()

            side = d3.select("#side");
            side.selectAll(".letter")
                .data(letters)
                .text(String);
            
            
        }
    });
});
