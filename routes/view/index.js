// ROUTES/VIEW/INDEX.JS

var router = require("express").Router();

var db = require("../../models");

// Homepage render with all articles
router.get("/", function(req, res) {
    db.Headline
        .find({ saved: false })
        .then(function(headlines) {
            res.render("index", { headlines });
        })
});

// Saved page render with saved articles
router.get("/saved", function(req, res) {
    db.Headline
        .find({ saved: true })
        .populate("note")
        .then(function(articles) {
            res.render("saved", { headlines });
        })
        .catch(function (err) {
            console.log(err);
        });
});

module.exports = router;