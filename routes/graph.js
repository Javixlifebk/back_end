var express = require("express");
const GraphController = require("../controllers/GraphController");

var routerGraph = express.Router();
routerGraph.post("/getlist", GraphController.listGraph);

routerGraph.post("/updatecaselist", GraphController.updateNgoIdAllcase);

module.exports = routerGraph;