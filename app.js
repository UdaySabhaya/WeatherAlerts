const express = require("express");
const bodyParser = require("body-parser");
const Login = require("./routes/LoginRoutes");
const WeatherDetails = require("./routes/WeathersRoute");
const SettingRoute = require("./routes/SettingRoute");
const NotificationMailer = require("./controllers/NotificationMailer");
const Any = require("./routes/AnyRoute");

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
NotificationMailer.MailSender();

app.use("/Login", Login);
app.use("/WeatherDetails", WeatherDetails);
app.use("/ChangeSetting", SettingRoute);
app.use("*", Any);

module.exports = app;
