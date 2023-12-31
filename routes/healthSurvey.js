var express = require("express");

const HealthSurveyController = require("../controllers/HealthSurveyController");


var routerHSurvey = express.Router();
routerHSurvey.post("/addHealthSurvey", HealthSurveyController.addHealthSurvey);
routerHSurvey.post("/HealthSurveyList", HealthSurveyController.HealthSurveyList);
routerHSurvey.get("/HealthSurveydownload", HealthSurveyController.healthsurveydownload);
routerHSurvey.post("/updateAddHealthsurvey", HealthSurveyController.updateAddHealthsurvey);
routerHSurvey.post("/updateHealthSurveyDeleted", HealthSurveyController.updateHealthSurveyDeleted);


// routerGSurvey.post("/GeneralSurveyList", GeneralSurveyController.GeneralSurveyList);
module.exports = routerHSurvey;