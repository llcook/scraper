// ROUTES/API

const router = require("express").Router();
const noteRoutes = require("./notes");
const headlineRoutes = require("./headlines");

// Path will be /api/headlines/---
// And /api/notes/---
router.use("/headlines", headlineRoutes);
router.use("/notes", noteRoutes);

module.exports = router;