var express = require("express");
const ScreenerLoggedInController = require("../controllers/ScreenerLoggedInController");
const DoctorLoggedInController = require("../controllers/DoctorLoggedInController");


var routerScreenerLoggedIn = express.Router();
routerScreenerLoggedIn.post("/updateloginscreener", ScreenerLoggedInController.updateLoggedInScreeners);
routerScreenerLoggedIn.post("/createloginscreener", ScreenerLoggedInController.addDetails);
//routerScreenerLoggedIn.post("/onlinescreener", ScreenerLoggedInController.onlineList);

routerScreenerLoggedIn.post("/getjavixid", ScreenerLoggedInController.getJavixId);

//var routerDoctorLoggedIn = express.Router();
routerScreenerLoggedIn.post("/updatelogindoc", DoctorLoggedInController.updateLoggedInDoctors);

module.exports = routerScreenerLoggedIn;

