'use strict';

var http       = require('http'),
    expressApp = require('./expressApp');

module.exports = http.createServer(expressApp);