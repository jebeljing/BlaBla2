var mongoose = require('mongoose');

var DocumentSchema = new mongoose.Schema({
  theme: String, 
  title: String,
  body: String,
  vocabulary: [String],
  phrases: [String],
  author: String,
  date: String
});

module.exports = mongoose.model('Document', DocumentSchema);
