var express = require("express");

const HealthSurveyController = require("../controllers/HealthSurveyController");


var routerHSurvey = express.Router();
routerHSurvey.post("/addHealthSurvey", HealthSurveyController.addHealthSurvey);
routerHSurvey.post("/HealthSurveyList", HealthSurveyController.HealthSurveyList);
routerHSurvey.get("/HealthSurveydownload", HealthSurveyController.healthsurveydownload);

// routerGSurvey.post("/GeneralSurveyList", GeneralSurveyController.GeneralSurveyList);
module.exports = routerHSurvey;