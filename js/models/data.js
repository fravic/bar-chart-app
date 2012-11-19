var app = app || {};

$(function($) {
    'use strict';

    var BUCKET_SIZE = 30;

    app.Data = Backbone.Model.extend({
        defaults: {
            "data": null,
            "counts": {},
            "searchTerm": null
        },
        
        load: function(url) {
            var self = this;
            d3.json(url, function(json) {
                self.parse(json);
            });
        },

        // Set the "counts" variable on the data model
        /* abstract */ parse: function(json) {
            throw "Subclass abstract method parse";
        },

        /* private */ _max: function() {
            return d3.max(_.map(this.filteredCounts(), function(d) {
                return d[1];
            }));
        },

        /* private */ _letterBuckets: function() {
            var i, counts, buckets, n;

            counts = this.filteredCounts();
            buckets = [];
            for (i = 0; i < counts.length; i += BUCKET_SIZE) {
                n = this.summarizeBucket(
                    counts.slice(i, i + BUCKET_SIZE)
                );
                buckets.push(n);
            }
            return buckets;
        },

        max: function() {
            return _.memoize(_.bind(this._max, this))();
        },

        filteredCounts: function() {
            var searchTerm;
            searchTerm = this.get("searchTerm");

            if (searchTerm == null || searchTerm.length == 0) {
                return this.get("counts");
            }
            return _.filter(this.get("counts"), function(d) {
                return d[0].indexOf(searchTerm) >= 0;
            });
        },

        bucketCounts: function(pageNum) {
            var i;
            i = pageNum * BUCKET_SIZE;
            return this.filteredCounts().slice(i, i + BUCKET_SIZE);
        },
        
        letterBuckets: function() {
            return _.memoize(_.bind(this._letterBuckets, this))();
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
            this.set("searchTerm", term);
        }
    });
});
