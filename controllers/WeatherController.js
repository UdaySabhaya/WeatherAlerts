const requests = require("requests");
const helper = require("../helper/helper");
const otpSchema = require("../models/data");
const mongoose = require("mongoose");
require("dotenv").config();

let json1, json2, json3;

let uri = "mongodb+srv://udaysabhaya:Ud%40y3301@cluster0.3e5qz.mongodb.net/test";
mongoose
  .connect(uri, { useNewUrlParser: true })
  .then((result) => console.log("connected to db successfully in WeatherController"))
  .catch((err) => console.log("Error occured in connecting db"));

// function fetch_l(emailid) {
//
// }

function fetch_l(emailid) {
  otpSchema
    .findOne({ email: emailid })
    .sort({ createdAt: -1 })
    .limit(1)
    .exec(function (err, data) {
      if (err) {
        console.log(err);
      } else {
        // console.log(data);
      }
      let xy = data.location;
      console.log(xy);
      return data.location;
    });
}

exports.getWeatherDetails = (req, res) => {
  otpSchema
    .findOne({ email: req.body.email })
    .sort({ createdAt: -1 })
    .limit(1)
    .exec(function (err, data) {
      if (err) {
        console.log(err);
      } else {
        // console.log(data);
        loc = data.location;
        requests(`http://api.weatherapi.com/v1/forecast.json?key=cff857ca8f5e4d23a1c43656222005&q=${loc}&days=3&aqi=yes&alerts=yes`).on("data", (chunk) => {
          const objData = JSON.parse(chunk);
          const arrData = [objData];

          let date_h = helper.getCurrentDate();
          let day_h = helper.getCurrentDay();
          let month_h = helper.getCurrentMonth();
          json1 = {
            location: arrData[0].location.name,
            country: arrData[0].location.country,
            date: date_h,
            day: day_h,
            month: month_h,
            temp_val: arrData[0].current.temp_c,
            temp_status: arrData[0].current.condition.text,
            temp_max: arrData[0].forecast.forecastday[0].day.maxtemp_c,
            temp_min: arrData[0].forecast.forecastday[0].day.mintemp_c,
          };

          let arr = new Array(5);
          arr[0] = parseInt(helper.getTempHours(1));
          arr[1] = parseInt(helper.getTempHours(2));
          arr[2] = parseInt(helper.getTempHours(3));
          arr[3] = parseInt(helper.getTempHours(4));

          json2 = {
            location: arrData[0].location.name,
            country: arrData[0].location.country,
            temp_val: {
              one: arrData[0].forecast.forecastday[0].hour[arr[0]].temp_c,
              two: arrData[0].forecast.forecastday[0].hour[arr[1]].temp_c,
              three: arrData[0].forecast.forecastday[0].hour[arr[2]].temp_c,
              four: arrData[0].forecast.forecastday[0].hour[arr[3]].temp_c,
            },
            temp_status: {
              1: arrData[0].forecast.forecastday[0].hour[arr[0]].condition.text,
              2: arrData[0].forecast.forecastday[0].hour[arr[1]].condition.text,
              3: arrData[0].forecast.forecastday[0].hour[arr[2]].condition.text,
              4: arrData[0].forecast.forecastday[0].hour[arr[3]].condition.text,
            },
          };

          let curr = new Date();
          let hr = curr.getHours();
          let i = 0;
          let day_1 = helper.getCurrentDay_D(i);
          let date_1 = parseInt(helper.getCurrentDate_D(i));
          let flag_1 = parseInt(helper.getFlag(i));
          let month_1 = helper.getCurrentMonth_D(flag_1);

          i = 1;
          let day_2 = helper.getCurrentDay_D(i);
          let date_2 = parseInt(helper.getCurrentDate_D(i));
          let flag_2 = parseInt(helper.getFlag(i));
          let month_2 = helper.getCurrentMonth_D(flag_2);

          i = 2;
          let day_3 = helper.getCurrentDay_D(i);
          let date_3 = parseInt(helper.getCurrentDate_D(i));
          let flag_3 = parseInt(helper.getFlag(i));
          let month_3 = helper.getCurrentMonth_D(flag_3);

          json3 = {
            location: arrData[0].location.name,
            country: arrData[0].location.country,
            today: {
              date: date_1,
              day: day_1,
              month: month_1,
              temp: arrData[0].forecast.forecastday[0].hour[hr].temp_c,
              status: arrData[0].forecast.forecastday[0].hour[hr].condition.text,
            },
            tomorrow: {
              date: date_2,
              day: day_2,
              month: month_2,
              temp: arrData[0].forecast.forecastday[1].hour[hr].temp_c,
              status: arrData[0].forecast.forecastday[1].hour[hr].condition.text,
            },
            after: {
              date: date_3,
              day: day_3,
              month: month_3,
              temp: arrData[0].forecast.forecastday[2].hour[hr].temp_c,
              status: arrData[0].forecast.forecastday[2].hour[hr].condition.text,
            },
          };
          // console.log(json1);
        });
      }
    });
  helper.SendResponse(res, 200, json1);
};

exports.getWeatherByHours = (req, res) => {
  // console.log(loc);
  helper.SendResponse(res, 200, json2);
};

exports.getForecastWeatherDetails = (req, res) => {
  helper.SendResponse(res, 200, json3);
};
