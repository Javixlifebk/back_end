var express = require("express");
const MiscController = require("../controllers/MiscController");
const runner = require("../helpers/runHemo");

var routerMisc = express.Router();
routerMisc.post("/updatePhoto", MiscController.addProfilePhoto);
routerMisc.post("/updateHemo", runner.updateHemo);
routerMisc.post("/updateEye", runner.updateEye);
routerMisc.post("/updateLipid", runner.updateLipid);
module.exports = routerMisc;