const Joi = require("joi");
const helper = require("./../helper/helper");

// app.use(bodyParser.urlencoded({ extended: false }));

exports.ValidateSignUp = (req, res, next) => {
  const data = req.body;
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    location: Joi.string().required(),
    email: Joi.string().email().required(),
  });
  const validation = schema.validate(data);
  if (validation.error) {
    console.log(validation.error);
    helper.SendResponse(res, 400, { status: "Fail", message: "Invalid Input Formate" });
    process.exit();
  }
  next();
};

exports.ValidateLogIn = (req, res, next) => {
  const data = req.body;
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    // Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
    otp: Joi.string()
      .length(4)
      .pattern(/^[0-9]+$/)
      .required(),
  });
  const validation = schema.validate(data);
  if (validation.error) {
    console.log(validation);
    console.log(validation.error);
    helper.SendResponse(res, 400, { status: "Fail", message: "Invalid Input Formate" });
    process.exit();
  }
  next();
};