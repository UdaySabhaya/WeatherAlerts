const { string } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const loginSchema = new Schema(
  {
    uname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    notification: {
      type: String,
      required: true,
    },
    days: {
      type: String,
    },
    otpg: {
      type: Number,
      required: true,
    },
    // min: {
    //   type: Number,
    // },
  },
  {
    timestamps: true,
  }
);
const Otp = mongoose.model("Otp", loginSchema);
module.exports = Otp;
