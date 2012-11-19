var app = app || {};

$(function($) {
    'use strict';

    app.Data = Backbone.Model.extend({
        defaults: {
            "data": null,
            "counts": [],
            "searchTerm": null,
            "bucketSize": 30
        },

        // Set the "counts" variable on the data model
        /* abstract */ parse: function(json) {
            throw "Subclass abstract method parse";
        },

        load: function(url) {
            var self = this;
            d3.json(url, function(json) {
                self.parse(json);
            });
        },

        max: function() {
            return d3.max(_.map(this.filteredCounts(), function(d) {
                return d[1];
            }));
        },

        letterBuckets: function() {
            var i, counts, buckets, n, bucketSize;

            counts = this.filteredCounts();
            buckets = [];
            bucketSize = this.get("bucketSize");
            for (i = 0; i < counts.length; i += bucketSize) {
                n = this.summarizeBucket(
                    counts.slice(i, i + bucketSize)
                );
                buckets.push(n);
            }
            return buckets;
        },

        pageCount: function() {
            return this.letterBuckets().length;
        },

        filteredCounts: function() {
            var searchTerm;
            searchTerm = this.get("searchTerm");

            if (searchTerm == null || searchTerm.length == 0) {
                return this.get("counts");
            }
            
            return _.filter(this.get("counts"), function(d) {
                return d[0].toLowerCase().indexOf(searchTerm) >= 0;
            });
        },

        bucketCounts: function(pageNum) {
            var i, bucketSize;
            pageNum = Math.min(pageNum, this.pageCount()-1);
            bucketSize = this.get("bucketSize");
            i = pageNum * bucketSize;
            return this.filteredCounts().slice(i, i + bucketSize);
        },

        letters: function() {
            var letters, lastLetter;
            letters = this.letterBuckets();
            return _.reduce(letters, function(s, d) {
                if (d[0].charAt(0) != lastLetter) {
                    s.push(d[0].charAt(0));
                    lastLetter = d[0].charAt(0);
                } else {
                    s.push("");
                }
                return s;
            }, []);
        },

        summarizeBucket: function(bucket) {
            return _.max(bucket, function(d) {
                return d[1];
            });
        },
        
        search: function(term) {
            this.set("searchTerm", term.toLowerCase());
        }
    });
});
