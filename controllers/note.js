var db = require("../models");

module.exports = {
    findAll: function(req, res) {
        db.Note
            .find()
            .then(function(notes) {
                res.json(notes);
            });
    },
    findOne: function(req, res) {
        db.Note
            .findById(req.params.id)
            .then(function(note) {
                res.json(note);
            });
    },
    create: function(req, res) {
        db.Note
            .create({ text: req.body.text })
            .then(function(note) {
                return db.Headline.findOneAndUpdate({ _id: req.body.articleId }, { note: dbNote._id }, { new: true });
            })
            .then(function(headline) {
                res.json(headline);
            })
    },
    update: function(req, res) {
        // FUNCTION GOES HERE
    },
    delete: function(req, res) {
        // FUNCTION GOES HERE
    }
}