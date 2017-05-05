'use strict';

var series = require('../models/series');
const fetchData = require('./fetchData'),
    saveSeries = function (ser) {
        return new Promise(function (resolve, reject) {
            const series_data = new series(ser);
            series_data.save(function (err) {
                if (err) {
                    reject("save error");
                } else {
                    resolve('saved');
                }
            });
        });
};

module.exports = function (req, res) {

    const data = req.body.input;
    const savePromises = data.map(ser => saveSeries(ser));
    return Promise.all(savePromises)
        .then(() => fetchData())
        .then((result) => {
            return res.status(200).send(result);
        }).catch(err => {
            res.status(500).send('Failed to save data');
        })
};
