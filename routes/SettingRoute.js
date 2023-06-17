const express = require("express");
const Auth = require("../Repository/CRUD");
const SettingsController = require("../controllers/SettingsController");

const router = express.Router();
// Auth.tokenChecker,
router.post("/", Auth.tokenChecker, SettingsController.changeSettings);
module.exports = router;
