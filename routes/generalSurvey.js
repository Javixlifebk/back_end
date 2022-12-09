var express = require("express");

const GeneralSurveyController = require("../controllers/GeneralSurveyController");

var routerGSurvey = express.Router();
routerGSurvey.post("/addGeneralSurvey", GeneralSurveyController.addGeneralSurvey);
routerGSurvey.post("/GeneralSurveyList", GeneralSurveyController.GeneralSurveyList);
routerGSurvey.post("/searchdata", GeneralSurveyController.searchdata);
routerGSurvey.post("/screeningScreener", GeneralSurveyController.tmp_out0List1);
routerGSurvey.post("/lungtestCase", GeneralSurveyController.tmpTestData);
routerGSurvey.post("/screenersevika", GeneralSurveyController.tmp_out1List);
routerGSurvey.post("/criticallipid", GeneralSurveyController.tmp_outList);
module.exports = routerGSurvey;