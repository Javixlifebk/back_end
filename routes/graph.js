var express = require("express");
const GraphController = require("../controllers/GraphController");

var routerGraph = express.Router();
routerGraph.post("/getlist", GraphController.listGraph);

module.exports = routerGraph;