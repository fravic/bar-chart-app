var app = app || {};

$(function($) {
    'use strict';

    var SELECT_HEIGHT = 30;

    app.ScrollerView = Backbone.View.extend({
        initialize: function(a) {
            if (!a["dataModel"]) {
                throw "No data model specified";
            }

            this.model = a["dataModel"];
            this.model.on("change:counts", this.dataChanged, this);
            this.model.on("change:bucketSize", this.dataChanged, this);
            this.model.on("change:searchTerm", this.searchChanged, this);

            this.pageNum = this.lastPageNum = -1;
            $("#scroller").scroll(_.bind(this.onScroll, this));
        },

        onScroll: function() {
            var pos, h;
            pos = $("#scroller").scrollTop() + SELECT_HEIGHT;
            h = $("#side")[0].scrollHeight;
            this.pageNum = Math.floor(pos/h * this.numPages);

            if (this.pageNum != this.lastPageNum) {
                $(".page_" + this.pageNum).addClass("highlight");
                $(".page_" + this.lastPageNum).removeClass("highlight");


                this.trigger("scrollToPage", this, this.pageNum);
                this.lastPageNum = this.pageNum;
            }
        },

        dataChanged: function(model, counts) {
            this.numPages = this.model.pageCount();
            this.render();
            this.onScroll();
        },

        searchChanged: function() {
            $("#scroller").scrollTop(0);
            this.numPages = this.model.pageCount();
            this.render();
        },

        render: function() {
            var buckets, letters, bucketD, sideD;

            buckets = this.model.letterBuckets();
            letters = this.model.letters();

            bucketD = d3.select("#buckets")
                .selectAll("div.page")
                .data(buckets);
            bucketD.enter().append("div")
                .attr("class", function(d, i) {
                    return "page page_" + i;
                });
            bucketD.exit().remove();
            bucketD.text(function(d) {
                return d[0];
            });

            sideD = d3.select("#side")
                .selectAll("div.letter")
                .data(letters);
            sideD.enter().append("div")
                .attr("class", "letter");
            sideD.exit().remove();
            sideD.text(String);
        }
    });
});
