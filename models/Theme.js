var mongoose = require('mongoose');

var ThemeSchema = new mongoose.Schema({
    name: String,
    class: String
});

module.exports = mongoose.model('Theme', ThemeSchema);