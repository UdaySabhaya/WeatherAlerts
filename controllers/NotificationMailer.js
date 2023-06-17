const nodemailer = require("nodemailer");
const requests = require("requests");
const cron = require("node-cron");
const response = require("./../helper/helper");
require("dotenv").config();
const otpSchema = require("../models/data");
const mongoose = require("mongoose");
// const crud = require("./../Repository/Crud");

let json2;

const arr = new Array(5);
arr[0] = parseInt(response.getTempHours(1));
arr[1] = parseInt(response.getTempHours(2));
arr[2] = parseInt(response.getTempHours(3));
arr[3] = parseInt(response.getTempHours(4));
const hour_2 = new Array(5);
hour_2[0] = parseInt(response.getCurrentHours_H(1));
hour_2[1] = parseInt(response.getCurrentHours_H(2));
hour_2[2] = parseInt(response.getCurrentHours_H(3));
hour_2[3] = parseInt(response.getCurrentHours_H(4));

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  service: "Gmail",
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

  let uri = "mongodb+srv://udaysabhaya:Ud%40y3301@cluster0.3e5qz.mongodb.net/test";

mongoose
  .connect(uri, { useNewUrlParser: true })
  .then((result) => console.log("connected to db successfully in NotificationSender"))
  .catch((err) => console.log("Error occured in connecting db"));

let t_days = 0;
let date_h = response.getCurrentDate();
let day_h = response.getCurrentDay();
let month_h = response.getCurrentMonth();

exports.MailSender = async (req, res, next) => {
  console.log("MailSender Running....");
  otpSchema.find((err, data) => {
    if (err) {
      console.log(err);
    } else {
      // console.log(data[0]);
      data.forEach((element) => {
        requests(`http://api.weatherapi.com/v1/forecast.json?key=cff857ca8f5e4d23a1c43656222005&q=${element.location}&days=3&aqi=yes&alerts=yes`).on("data", (chunk) => {
          const objData = JSON.parse(chunk);
          const arrData = [objData];
          json2 = {
            location: arrData[0].location.name,
            country: arrData[0].location.country,
            date: date_h,
            day: day_h,
            month: month_h,
            one: {
              time: hour_2[0],
              temp_val: arrData[0].forecast.forecastday[0].hour[arr[0]].temp_c,
              condition: arrData[0].forecast.forecastday[0].hour[arr[0]].condition.text,
            },
            two: {
              time: hour_2[1],
              temp_val: arrData[0].forecast.forecastday[0].hour[arr[1]].temp_c,
              condition: arrData[0].forecast.forecastday[0].hour[arr[1]].condition.text,
            },
            three: {
              time: hour_2[2],
              temp_val: arrData[0].forecast.forecastday[0].hour[arr[2]].temp_c,
              condition: arrData[0].forecast.forecastday[0].hour[arr[2]].condition.text,
            },
            four: {
              time: hour_2[3],
              temp_val: arrData[0].forecast.forecastday[0].hour[arr[3]].temp_c,
              condition: arrData[0].forecast.forecastday[0].hour[arr[3]].condition.text,
            },
          };

          // console.log(element, json2);
          send(element, json2);
          // console.log("................");
        });
        // console.log(element);
      });
    }
  });
};

let abc;
async function send(element, json2) {
  if (element.notification == "true") {
    abc = 1;
  }
  if (element.days != "ALL") {
    abc = 0;
    t_days = element.days;
  }
  let mailOptions = {
    to: element.email,
    subject: "Weather Alerts: ",
    html:
      "<h2 style='font-family: 'Times New Roman', Times, serif;'>Do checkout the weather for next 4 hours before you step out from the house</h2>" +
      "<h4 style='font-family: 'Times New Roman', Times, serif;'>Location: " +
      json2.location +
      "<br>Time: " +
      json2.one.time +
      "<br>Temp: " +
      json2.one.temp_val +
      "<br>Condition: " +
      json2.one.condition +
      "<br><br>Time: " +
      json2.two.time +
      "<br>Temp: " +
      json2.two.temp_val +
      "<br>Condition: " +
      json2.two.condition +
      "<br><br>Time: " +
      json2.three.time +
      "<br>Temp: " +
      json2.three.temp_val +
      "<br>Condition: " +
      json2.three.condition +
      "<br><br>Time: " +
      json2.four.time +
      "<br>Temp: " +
      json2.four.temp_val +
      "<br>Condition: " +
      json2.four.condition +
      "</h4>",
  };
  if (abc == 1) {
    cron.schedule(`32 8,9,14,19 * * *`, async () => {
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          console.log(element.email, "sent");
        }
      });
    });
  } else if (t_days != 0) {
    // console.log(t_days);
    // console.log(element.email, "Arrived");
    cron.schedule(`30 8,11,14,19 * * ${t_days}`, async () => {
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    });
  }
}
