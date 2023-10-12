const express = require("express");
const router = express.Router();
const noteCtrl = require("../controllers/noteController");

router.get("/", noteCtrl.getAllNotes);
router.get("/:id", noteCtrl.getOneNote);
router.post("/", noteCtrl.createNote);
router.put("/:id", noteCtrl.updateNote);
router.delete("/:id", noteCtrl.deleteNote);

module.exports = router;
