'use strict';

const getSeries = require('./fetchData');

module.exports = function (req, res) {
  return getSeries()
      .then(result => {
          return res.status(200).send(result);
      })
      .catch(err => {
          return res.status(500).send(err);
      })
};
