// ROUTES ROOT

// Require router functionality from Express
const router = require("express").Router();

// Require route directories
// It will look for index.js file in the root directory
// (And index.js requires the other files in that directory)
const apiRoutes = require("./api");
const viewRoutes = require("./view");

// To access anything in these routes, the url will start with the specified path
router.use("/api", apiRoutes);
router.use("/", viewRoutes);

module.exports = router;