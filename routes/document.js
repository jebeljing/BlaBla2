var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Document = require('../models/Document');

var Theme = require('../models/Theme');

/* GET ALL THE THEMES */
router.get('/themes', function(req, res, next) {
    Theme.find(function(err, products) {
        if (err) return next(err);
        res.json(products);
    });
});

/* GET ALL DOCUMENTS */
router.get('/', function(req, res, next) {
  Document.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE DOCUMENT BY ID */
router.get('/:id', function(req, res, next) {
  Document.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE DOCUMENT */
router.post('/', function(req, res, next) {
  Document.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE DOCUMENT */
router.put('/:id', function(req, res, next) {
  Document.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE DOCUMENT */
router.delete('/:id', function(req, res, next) {
  Document.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;

