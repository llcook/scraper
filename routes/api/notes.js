// ROUTES/API/NOTES.JS

var router = require("express").Router();
var noteController = require("../../controllers/note");

router.get("/all", noteController.findAll);
router.get("/:id", noteController.findOne);
router.post("/", noteController.create);
router.put("/:id", noteController.update);
router.delete("/:id", noteController.delete);

module.exports = router; 