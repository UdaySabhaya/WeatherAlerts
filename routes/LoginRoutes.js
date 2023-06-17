const express = require("express");
const LoginController = require("./../controllers/LoginController");
const Validator = require("./../validator/Validator");

const router = express.Router({ mergeParams: true });
// Validator.ValidateSignUp,
router.post("/SendOTP", Validator.ValidateSignUp, LoginController.SendOTP);
router.post("/ResendOTP", LoginController.ResendOTP);
router.post("/VerifyOTP", Validator.ValidateLogIn, LoginController.VerifyOTP);

module.exports = router;
