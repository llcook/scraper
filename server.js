const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

// Define port
const PORT = 8080;

// Initialize express
const app = express();

// Configure middleware

    // Use morgan logger for logging requests
    app.use(logger("dev"));
    // Parse request body as JSON
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    // Public static folder
    app.use(express.static("public"));

// Handlebars
    const exphbs = require("express-handlebars");
    app.engine("handlebars", exphbs({ defaultLayout: "main" }));
    app.set("view engine", "handlebars");

// Import routes and give server access
const routes = require("./routes");

app.use(routes);

// Hook mongojs configuration to the db variable
mongoose.connect("mongodb://localhost/newsscraper", { useNewUrlParser: true });

// Start the server
app.listen(PORT, function () {
    console.log(`App running on port ${PORT}!`)
})