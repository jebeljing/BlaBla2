var mongoose = require('mongoose');
// var Theme = require('./Theme');

var DocumentSchema = new mongoose.Schema({
  // theme: {type: mongoose.Schema.Types.ObjectId,  ref: 'Theme'},
  theme: String,
  title: String,
  body: String,
  vocabulary: [String],
  phrases: [String],
  author: String,
  date: String
});

module.exports = mongoose.model('Document', DocumentSchema);
