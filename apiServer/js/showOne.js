'use strict';

var series = require('../models/series');
module.exports = function (req, res) {
    series.find({ "field1": req.params.id }, {"__v":0,"_id":0,"field1":0}).exec(function(err, seriesData) {
        if (err) res.send(err)

        res.send(seriesData);
    });
};
