var express = require("express");

const GeneralSurveyController = require("../controllers/GeneralSurveyController");

var routerGSurvey = express.Router();
routerGSurvey.post("/addGeneralSurvey", GeneralSurveyController.addGeneralSurvey);
routerGSurvey.post("/GeneralSurveyList", GeneralSurveyController.GeneralSurveyList);
routerGSurvey.post("/screeningScreener", GeneralSurveyController.tmp_out0List);
routerGSurvey.post("/screenersevika", GeneralSurveyController.tmp_out1List);
module.exports = routerGSurvey;