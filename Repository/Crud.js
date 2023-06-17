const otpSchema = require("../models/data");
const helper = require("../helper/helper");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
let uri = "mongodb+srv://udaysabhaya:Ud%40y3301@cluster0.3e5qz.mongodb.net/test";
mongoose
  .connect(uri, { useNewUrlParser: true })
  .then((result) => console.log("connected to db successfully in Crud-File"))
  .catch((err) => console.log("Error occured in connecting db"));

exports.create = (name, emailid, otp, loc) => {
  let newCredential = new otpSchema({
    uname: name,
    email: emailid,
    location: loc,
    notification: "true",
    days: "ALL",
    otpg: otp,
  });

  newCredential.save(function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log("Data inserted");
    }
  });
};

exports.update = (emailid, otp) => {
  otpSchema
    .findOne({ email: emailid })
    .sort({ createdAt: -1 })
    .limit(1)
    .exec(function (err, data) {
      otpSchema.findByIdAndUpdate(data.id, { otpg: otp }, function (err, data) {
        if (err) {
          console.log(err);
        } else {
          console.log("Data updated!");
        }
      });
    });
};

function generateAccessToken(email) {
  return jwt.sign(email, process.env.ACCESS_TOKEN_SECRET);
}

exports.read = (res, emailid, otp) => {
  otpSchema
    .findOne({ email: emailid })
    .sort({ createdAt: -1 })
    .limit(1)
    .exec(function (err, data) {
      if (data.otpg == otp) {
        // status = 200;
        const email_t = { name: emailid };
        const accessToken = generateAccessToken(email_t);
        let j3 = {
          status: "success",
          accesstokentoken: accessToken,
          message: "OTP Verified Successfully",
        };
        helper.SendResponse(res, 200, j3);
        // res.status(200).json(j3);
      } else {
        let j4={
          status:"fail",
          message:"Invalid OTP"
        };
        helper.SendResponse(res, 401, j4);
      }
    });
};

exports.tokenChecker = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null)
    return res.json({
      status: "fail",
      message: "Invalid Token",
    });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, t_email) => {
    if (err)
      return res.json({
        status: "fail",
        message: "Invalid Token",
      });
    otpSchema.findOne({ email: t_email.name }).exec((err, data) => {
      if (data) {
        next();
      } else {
        return res.json({
          status: "fail",
          message: "Invalid Token",
        });
      }
    });
  });
};
