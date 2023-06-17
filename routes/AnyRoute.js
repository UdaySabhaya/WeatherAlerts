const express = require("express");
const AnyRouteController = require("./../controllers/AnyRouteController");

const router = express.Router({ mergeParams: true });
router.all("*", AnyRouteController.any);
module.exports = router;
