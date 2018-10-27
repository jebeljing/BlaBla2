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
  date: String,
  likes: Number,
  dislikes: Number,
  comments: [{name: String, comment: String, date: Date}]
});

module.exports = mongoose.model('Document', DocumentSchema);
