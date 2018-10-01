var mongoose = require('mongoose');

var DocumentSchema = new mongoose.Schema({
  theme: String, 
  title: String,
  vocabulary: [String],
  phrases: [String]
});

module.exports = mongoose.model('Document', DocumentSchema);
