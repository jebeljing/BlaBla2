var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Document = require('../models/Document');

var Theme = require('../models/Theme');

var audio;

/* Pause the mp3 */
router.post('/pause', function(req, res, next) {
    this.audio.kill();
    res.json('success');
});


/* Generate the mp3 */
router.post('/read', function(req, res, next) {
  const fs = require('fs');
  // Imports the Google Cloud client library
  const textToSpeech = require('@google-cloud/text-to-speech');

  // Creates a client
  const client = new textToSpeech.TextToSpeechClient();
  // The text to synthesize
  const text = req.body.text;
  const outputFileName = req.body.filename;

  // Construct the request
  const request = {
    input: {text: text},
    // Select the language and SSML Voice Gender (optional)
    voice: {languageCode: 'en-US', ssmlGender: 'FEMALE'},
    // Select the type of audio encoding
    audioConfig: {audioEncoding: 'MP3'},
  };

  // Performs the Text-to-Speech request
  client.synthesizeSpeech(request, (err, response) => {
    if (err) {
      console.error('ERROR:', err);
      return next(err);
    }
    
    // Write the binary audio content to a local file
    fs.writeFile(`${outputFileName}.mp3`, response.audioContent, 'binary', err => {
      if (err) {
        console.error('ERROR:', err);
        return next(err);
      }
      console.log(`Audio content written to file: ${outputFileName}.mp3`);
      var player = require('play-sound')(opts ={})
      this.audio = player.play(`${outputFileName}.mp3`, function(err) {
        if (err) throw err
      })
      res.json('success');
    });
  });
});


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

