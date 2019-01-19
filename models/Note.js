var mongoose = require("mongoose");

// Save reference to Schema constructor
var Schema = mongoose.Schema;

// Using Schema constructor, create new NoteSchema object
// This is similar to a Sequelize model
var NoteSchema = new Schema({
    body: String
});

// This creates our model from the above schema, using mongoose's model method
var Note = mongoose.model("Note", NoteSchema);

// Export the Note model
module.exports = Note;