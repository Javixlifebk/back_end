var express = require("express");

const GeneralSurveyController = require("../controllers/GeneralSurveyController");

var routerGSurvey = express.Router();
routerGSurvey.post("/addGeneralSurvey", GeneralSurveyController.addGeneralSurvey);
routerGSurvey.post("/GeneralSurveyList", GeneralSurveyController.GeneralSurveyList);
routerGSurvey.post("/searchdata", GeneralSurveyController.searchdata);
routerGSurvey.post("/screeningScreenercase", GeneralSurveyController.tmp_out0List1);
routerGSurvey.post("/screeningScreener", GeneralSurveyController.tmp_out0List);
routerGSurvey.post("/screeningScreenerCount", GeneralSurveyController.tmp_out0Count);
routerGSurvey.post("/screeningSevikaCount", GeneralSurveyController.tmp_out1Count);
routerGSurvey.post("/sevikaScreeningcase", GeneralSurveyController.tmp_out1List1);
routerGSurvey.post("/lungtestCase", GeneralSurveyController.tmpTestData);
routerGSurvey.post("/screenersevika", GeneralSurveyController.tmp_out1List);
routerGSurvey.post("/criticallipid", GeneralSurveyController.tmp_outList);
routerGSurvey.get('/download', GeneralSurveyController.download);
routerGSurvey.post('/updateadddeletegsurvey', GeneralSurveyController.updateandgsurvey);
routerGSurvey.post('/deletegsurveybyid', GeneralSurveyController.updategsurveyDeletedAuth);
module.exports = routerGSurvey;