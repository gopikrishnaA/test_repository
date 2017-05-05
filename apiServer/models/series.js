var mongoose = require("mongoose");

var SeriesSchema = new mongoose.Schema({
  'field1': {
    type: String
  },
  'field2':{
    type: String
  },
  'field3':{
    type: String
  },
  'field4':{
    type: String
  },
  'field5':{
    type: String
  },
  'field6': {
    type: String
  },
  'field7':{
    type: String
  },
  'field8':{
    type: String
  },
  'field9':{
    type: String
  },
  'field10':{
    type: String
  },
  'field11':{
    type: String
  },
  'field12': {
    type: String
  },
  'field13':{
    type: String
  },
  'field14':{
    type: String
  }
}, { strict: false });



module.exports = mongoose.model('series', SeriesSchema, 'series');


