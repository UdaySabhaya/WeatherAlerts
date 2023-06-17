const nodemailer = require("nodemailer");
const requests = require("requests");
const cron = require("node-cron");
const response = require("./helper/helper");
require("dotenv").config();
const otpSchema = require("./models/data");
const mongoose = require("mongoose");

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
  .then((result) => console.log("connected to db successfully"))
  .catch((err) => console.log("Error occured in connecting db"));
let abc;
let t_days = 0;
let date_h = response.getCurrentDate();
let day_h = response.getCurrentDay();
let month_h = response.getCurrentMonth();

let json2;

function getNotifications() {
  otpSchema.find((err, data) => {
    if (err) {
      console.log(err);
    } else {
      data.forEach((element) => {
        let loc = element.location;
        requests(`http://api.weatherapi.com/v1/forecast.json?key=cff857ca8f5e4d23a1c43656222005&q=${loc}&days=3&aqi=yes&alerts=yes`).on("data", (chunk) => {
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
        });

        if (element.notification == "true") {
          abc = 1;
        }
        if (element.days != "ALL") {
          t_days = element.days;
        }
        let mailOptions = {
          to: element.email,
          subject: "Weather Alerts: ",
          html: "<h3>Do checkout the weather for next 4 hours before you step out from the house </h3>" + "<h2 style='font-weight:bold;'>" + JSON.stringify(json2) + "</h2>", // html body
        };
        if (abc == 1) {
          cron.schedule("58 7,9,14,19 * * *", () => {
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log("Email sent: " + info.response);
                console.log(element.email);
                console.log(".....");
              }
            });
          });
        } else if (t_days != 0) {
          cron.schedule(`0 7,11,15,19 * * ${t_days}`, () => {
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log("Email sent: " + info.response);
              }
            });
          });
        }
        // console.log(element);
      });
    }
  });
}
// getNotifications();
let a = 5;
function print() {
  otpSchema.find((err, data) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  a = 20;
  return a;
}
console.log(a);
b = print();
console.log(a);
console.log(b);
