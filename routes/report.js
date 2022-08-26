var express = require("express");
const ReportController = require("../controllers/ReportController");

var routerGraph = express.Router();
routerGraph.post("/generatereport", ReportController.createProfileReport);
routerGraph.post("/createCaseReport", ReportController.createCaseReport);
routerGraph.post("/createHistoryReport", ReportController.createMedicalHistoryReport);
routerGraph.post("/createPrescriptionReport", ReportController.createPrescriptionReport);
module.exports = routerGraph;