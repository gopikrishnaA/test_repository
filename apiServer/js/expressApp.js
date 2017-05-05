'use strict';

const express       = require('express'),
    app           = express(),
    bodyParser    = require('body-parser'),
    expressRoutes = require('./expressRoutes'),
    path = require('path'),
    mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function (req, res, next) {
    console.info({
        httpMethod: req.method,
        httpUrl:    req.url,
        httpPath:   req.path
    });
    next();
});
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use('/', expressRoutes);
module.exports = app;
