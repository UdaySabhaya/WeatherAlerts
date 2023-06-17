const express = require("express");
const Auth = require("../Repository/CRUD");
const WeatherDetailsController = require("./../controllers/WeatherController");

const router = express.Router();
router.get("/", Auth.tokenChecker, WeatherDetailsController.getWeatherDetails);
router.get("/getDetailsByHours", Auth.tokenChecker, WeatherDetailsController.getWeatherByHours);
router.get("/getForecastDetails", Auth.tokenChecker, WeatherDetailsController.getForecastWeatherDetails);

module.exports = router;
