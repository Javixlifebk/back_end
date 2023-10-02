var express = require("express");

const SocioEconomicSurveyController = require("../controllers/SocioEconomicSurveyController");


var routerSESurvey = express.Router();
routerSESurvey.post("/addSocioEconomicSurvey", SocioEconomicSurveyController.addSocioEconomicSurvey);
routerSESurvey.post("/SocioEconomicSurveyList", SocioEconomicSurveyController.SocieSurveyList);
routerSESurvey.get("/SocioEconomicdownload", SocioEconomicSurveyController.sociosurveydownload);
routerSESurvey.post("/updateAddSocioSurvey", SocioEconomicSurveyController.updateAddSocioSurvey);
routerSESurvey.post("/updateSocioSurveyDeleted", SocioEconomicSurveyController.updateSocioSurveyDeleted);

//routerGSurvey.post("/GeneralSurveyList", GeneralSurveyController.GeneralSurveyList);
module.exports = routerSESurvey;