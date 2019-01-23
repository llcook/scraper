const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = {
    clear: function (req, res) { },
    scrape: function (req, res) {
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
            // RELOAD THE PAGE INSTEAD OF THIS RES.SEND
            res.send("Scrape complete!");
        });
    },
    findAll: function (req, res) {
        db.Headline.find({})
            .then(function (dbHeadline) {
                // If all articles successfully found, send back to client
                res.json(dbHeadline);
            })
            .catch(function (err) {
                console(err);
            });
    },
    findOne: function (req, res) { },
    update: function (req, res) { },
    deleteOne: function (req, res) { }
}