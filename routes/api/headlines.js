// ROUTES/API/HEADLINES.JS

const router = require("express").Router();

const headlineController = require("../../controllers/headline");

// Routes guided by the controller directory
router.get("/clear", headlineController.clear);
router.get("/scrape", headlineController.scrape);
router.get("/all", headlineController.findAll);
router.get("/:id", headlineController.findOne);
router.put("/:id", headlineController.update);
router.delete("/:id", headlineController.deleteOne);

module.exports = router;