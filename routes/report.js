var express = require("express");
const ReportController = require("../controllers/ReportController");
const csvController = require("../controllers/csvreport");

var routerGraph = express.Router();
routerGraph.post("/generatereport", ReportController.createProfileReport);
routerGraph.post("/createCaseReport", ReportController.createCaseReport);
routerGraph.post("/createHistoryReport", ReportController.createMedicalHistoryReport);
routerGraph.post("/createPrescriptionReport", ReportController.createPrescriptionReport);

//csv report
routerGraph.post("/createCitizenCsv", csvController.module.createCitizencsv);
routerGraph.post("/createCitizenDetailCsv", csvController.module.createCitizenDetailcsv);
routerGraph.post("/ScreeningScreenerCsv", csvController.module.createScreeningScreenerCasecsv);
routerGraph.post("/ScreeningSevikaCsv", csvController.module.createScreeningSevikaCasecsv);
routerGraph.post("/createBPAmbercsv", csvController.module.createBPAmbercsv);
routerGraph.post("/createBPGreencsv", csvController.module.createBPGreencsv);
routerGraph.post("/createBPRedcsv", csvController.module.createBPRedcsv);
routerGraph.post("/createBmiGreencsv", csvController.module.createBmiGreencsv);
routerGraph.post("/createbmiRedcsv", csvController.module.createbmiRedcsv);
routerGraph.post("/createbmiAmbercsv", csvController.module.createbmiAmbercsv);
routerGraph.post("/createSpoAmbercsv", csvController.module.createSpoAmbercsv);
routerGraph.post("/createPulseAmbercsv", csvController.module.createPulseAmbercsv);
routerGraph.post("/createPulseGreencsv", csvController.module.createPulseGreencsv);
routerGraph.post("/createPulseRedcsv", csvController.module.createPulseRedcsv);
routerGraph.post("/createSpoRedcsv", csvController.module.createSpoRedcsv);
routerGraph.post("/createSpoGreencsv", csvController.module.createSpoGreencsv);
routerGraph.post("/createTempAmbercsv", csvController.module.createTempAmbercsv);
routerGraph.post("/createTempGreencsv", csvController.module.createTempGreencsv);
routerGraph.post("/createTempRedcsv", csvController.module.createTempRedcsv);
routerGraph.post("/createWeeklyCitizencsv", csvController.module.createWeeklyCitizencsv);
routerGraph.post("/weeklyCitizenDetailcsv", csvController.module.weeklyCitizenDetailcsv);
routerGraph.post("/lipidCriticalCitizensDetailcsv", csvController.module.lipidCriticalCitizensDetailcsv);
routerGraph.post("/unscreenedCitizenDetailcsv", csvController.module.unscreenedCitizenDetailcsv);
routerGraph.post("/generalSurveyCSV", csvController.module.generalSurveyCSV);
routerGraph.post("/healthSurveyCSV", csvController.module.healthSurveyCSV);
routerGraph.post("/socioEconomicSurveyCSV", csvController.module.socioEconomicSurveyCSV);


module.exports = routerGraph;