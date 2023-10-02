var express = require("express");
const StubController = require("../controllers/StubController");

var routerStub = express.Router();
routerStub.post("/getstub", StubController.getstub);

module.exports = routerStub;