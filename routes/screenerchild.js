var express = require("express");
const ScreenerChildController = require("../controllers/ScreenerChildController");

var routerScreenerChild = express.Router();
routerScreenerChild.post("/addMapping", ScreenerChildController.addMapping);
routerScreenerChild.post("/showMappingList", ScreenerChildController.mappingList);
module.exports = routerScreenerChild;