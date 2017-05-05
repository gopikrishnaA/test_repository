'use strict';
const express = require('express'),
    router  = express.Router();

router.get('/', require('./getRoot'));
router.post('/save', require('./saveData.js'));
router.get('/show', require('./showData.js'));
router.get('/show/:id', require('./showOne.js'));

module.exports = router;


