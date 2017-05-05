'use strict';

var series = require('../models/series');

const getSeries = function () {
    return new Promise(function (resolve, reject) {
        series.find({},{field1:1,_id:0}).sort({field1: 1}).exec(function(err, todos) {
            if (err){
                reject(err)
            } else {
                resolve(todos)
            }
        });
    })
};
module.exports = getSeries;

