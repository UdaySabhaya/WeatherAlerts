const helper = require("./../helper/helper");

exports.any = (req, res) => {
  const json4 = {
    status: "fail",
    message: `Can't find ${req.originalUrl}`,
  };
  helper.SendResponse(res, 400, json4);
};
