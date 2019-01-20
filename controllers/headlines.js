var express = require("express");

var router = express.Router();

var db = require("../models");

// Scraping tools
var axios = require("axios");
var cheerio = require("cheerio");

router.get("/", function(req, res) {
    res.render("index")
});

router.get("/scrape", function (req, res) {
    // First, we grab the body of the html with axios
    axios.get("https://www.packagingdigest.com/sustainable-packaging?qt-content_tabs=1#qt-content_tabs").then(function (response) {
        // Then load that into cheerio and save to $ for shorthand selector
        var $ = cheerio.load(response.data);

        // Save empty result object
        var result = {};
        
        $("div.views-row").each(function (i, element) {
            // Add the text, href of each link and save as properties of result object
            result.headline = $(this)
                .find(".views-field-title")
                .find("a")
                .text();
            result.link = "https://www.packagingdigest.com" + $(this)
                .find(".views-field-title")
                .find("a")
                .attr("href");
            result.description = $(this)
                .find(".views-field-body")
                .find("p")
                .text();

            // Create a new Headline using "result" object built from scraping
            db.Headline.create(result)
                .then(function (dbHeadline) {
                    // View added result in the console
                    console.log(dbHeadline);
                })
                .catch(function (err) {
                    // If error, log it
                    console.log(err);
                });
        });

        // Send a message to the client
        res.send("Scrape complete!");
    });
});

// Retrieve all articles from the db
router.get("/headlines", function (req, res) {
    db.Headline.find({})
        .then(function (dbHeadline) {
            // If all articles successfully found, send back to client
            res.json(dbHeadline);
        })
        .catch(function (err) {
            res.json(err);
        });
});

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

module.exports = router;