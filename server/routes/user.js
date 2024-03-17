const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/userController");
const verifyPassword = require("../middlewares/verifyPassword");
const verifyEmail = require("../middlewares/verifyEmail");

router.get("/:id", userCtrl.getOneUser);
router.get("/", userCtrl.getAllUsers);
router.put("/", userCtrl.updateLogStatus);
router.put("/:id", userCtrl.updateLogStatus);
router.post("/signup", verifyEmail, verifyPassword, userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
