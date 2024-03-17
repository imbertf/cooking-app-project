const express = require("express");
const router = express.Router();
const termCtrl = require("../controllers/termController");
const multer = require("../middlewares/multer-config");

router.get("/", termCtrl.getAllTerms);
router.get("/:id", termCtrl.getOneTerm);
router.post("/", termCtrl.createTerm);
router.put("/:id", termCtrl.updateTerm);
router.delete("/:id", termCtrl.deleteTerm);

module.exports = router;
