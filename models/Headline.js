var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using Schema constructor, create new HeadlineSchema object
// This is similar to a Sequelize model
var HeadlineSchema = new Schema({
    headline: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    note: [
        {
            type: Schema.Types.ObjectId,
            ref: "Note"
        }
    ],
    saved: {
        type: Boolean,
        default: false
    }
});

// Create model from above schema using mongoose's model method
var Headline = mongoose.model("Headline", HeadlineSchema);

// Export Headline model
module.exports = Headline;

