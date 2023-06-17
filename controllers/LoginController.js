const nodemailer = require("nodemailer");
// const jwt = require("jsonwebtoken");
require("dotenv").config();
const crud = require("../Repository/Crud");
const helper = require("./../helper/helper");
// const { x } = require("../Repository/Crud");

function OTPgenerator() {
  let otp = Math.random();
  otp = otp * 10000;
  otp = parseInt(otp);
  // console.log(otp);
  return otp;
}

let mailOptions;

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

let j1 = {
  status: "success",
  message: "OTP Generated Successfully",
};
let Err = {
  status: "fail",
  message: "Error occurred",
};

exports.SendOTP = (req, res) => {
  const otp = OTPgenerator();
  crud.create(req.body.name, req.body.email, otp, req.body.location);
  mailOptions = {
    to: req.body.email,
    subject: "Otp for registration is: ",
    html: "<h3>OTP for account verification is </h3>" + "<h2 style='font-weight:bold;'>" + otp + "</h2>", // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      helper.SendResponse(res, 404, Err);
      return console.log(error);
    }

    // console.log("Message sent: %s", info.messageId);
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    console.log("OTP sent");
    helper.SendResponse(res, 200, j1);
  });
};

let j2 = {
  status: "success",
  message: "OTP Regenerated Successfully",
};

exports.ResendOTP = (req, res) => {
  const otp = OTPgenerator();
  crud.update(req.body.email, otp);

  mailOptions = {
    to: req.body.email,
    subject: "Otp for registration is: ",
    html: "<h3>OTP for account verification is </h3>" + "<h2 style='font-weight:bold;'>" + otp + "</h2>", // html body
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      helper.SendResponse(res, 404, Err);
    }
    // console.log("Message sent: %s", info.messageId);
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    console.log("OTP Resent");
    helper.SendResponse(res, 200, j2);
  });
};

exports.VerifyOTP = (req, res) => {
  email_2 = req.body.email;
  otp_2 = req.body.otp;
  crud.read(res, email_2, otp_2);
};
