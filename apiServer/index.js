'use strict';

const httpServer = require('./js/httpServer');

httpServer.listen(3002, '0.0.0.0', function () {
    console.log('application name server listening on port 3002');
});

process.on('uncaughtException', function (er) {
    console.log(er.stack);
    process.exit(1);
});

process.on('unhandledRejection', function (reason, p) {
    console.log('Possibly Unhandled Rejection at: Promise ', p, ' reason: ', reason);
});


