var express = require("express");
const ReqUpdateController = require("../controllers/ReqUpdateController");
var routerRU = express.Router();
routerRU.post("/list", ReqUpdateController.ngoRequestUpdateList);
routerRU.post("/byrole", ReqUpdateController.ngoRequestUpdateByRoleId);
module.exports = routerRU;