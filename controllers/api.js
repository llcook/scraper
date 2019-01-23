var express = require("express");

var router = express.Router();

var db = require("../models");

// Scraping tools
var axios = require("axios");
var cheerio = require("cheerio");

///////////////////////////////////////////
///////////////// ROUTES ////////////////// 
///////////////////////////////////////////


///////////////// SAVED ////////////////// 

// Load saved articles
router.get("/saved", function (req, res) {
    db.Headline.find({ saved: true })
        .then(function (dbSaved) {
            res.render("saved", {
                saved: dbSaved
            });
        })
        .catch(function (err) {
            console.log(err);
        });
});

// Save article
router.get("/save/:id", function (req, res) {
    db.Headline.update(req.body)
        .then(function (dbHeadline) {
            return db.Headline.findOneAndUpdate({ _id: req.params.id }, { $set: { saved: true } });
        })
        .then(function (dbHeadline) {
            res.json(dbHeadline);
        })
        .catch(function (err) {
            res.json(err);
        });
});

// Unsave article

router.get("/unsave/:id", function (req, res) {
    db.Headline.update(req.body)
        .then(function (dbHeadline) {
            return db.Headline.findOneAndUpdate({ _id: req.params.id }, {$set: { saved: false } });
        })
        .then(function (dbHeadline) {
            res.json(dbHeadline);
        })
        .catch(function (err) {
            res.json(err);
        });
});

///////////////// NOTES //////////////////

// Route for grabbing specific Headline by ID and populate it with its note
router.get("/headlines/:id", function (req, res) {
    // Using ID passed in ID parameter, prepare query that finds the matching one in our db...
    db.Headline.findOne({ _id: req.params.id })
        // ...and populate all notes associated with it
        .populate("note")
        .then(function (dbHeadline) {
            // If we successfully find Headline with given ID, send to client
            res.json(dbHeadline);
        })
        .catch(function (err) {
            // If error, send to client
            res.json(err);
        });
});

// Route for saving/updating Headline's associated Note
router.post("/headlines/:id", function (req, res) {
    // Create new note and pass req.body to entry
    db.Note.create(req.body)
        .then(function (dbNote) {
            // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
            // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
            // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
            return db.Headline.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
        })
        .then(function (dbHeadline) {
            // If we successfully update Headline, send back to client
            res.json(dbHeadline);
        })
        .catch(function (err) {
            // If error, send to client
            res.json(err);
        });
});

/////////////////////////////////////////////
/////////////////////////////////////////////

module.exports = router;