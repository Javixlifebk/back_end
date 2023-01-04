var express = require("express");
const GraphController = require("../controllers/GraphController");

var routerGraph = express.Router();
routerGraph.post("/getlist", GraphController.listGraph);
routerGraph.post("/updategetlist", GraphController.updateNgoIdAllData);
routerGraph.post("/updatecaselist", GraphController.updateNgoIdAllcase);
routerGraph.post("/updatetmp0", GraphController.updateNgoIdAlltmpout0);
routerGraph.post("/updatetmp1", GraphController.updateNgoIdAlltmpout1);
module.exports = routerGraph;