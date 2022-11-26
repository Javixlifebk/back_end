var express = require("express");
const ScreeningCaseController = require("../controllers/ScreeningCaseController");

var routerScreeningCase = express.Router();
routerScreeningCase.post("/addCase", ScreeningCaseController.addScreening);
routerScreeningCase.post("/updateCase", ScreeningCaseController.updateCaseDetails);
routerScreeningCase.post("/getCaseDetails", ScreeningCaseController.screeningList);
routerScreeningCase.post("/screeningcasesList", ScreeningCaseController.screeningcasesPaginationList);
routerScreeningCase.post("/caseUnrefer", ScreeningCaseController.updateAddUnrefer);


routerScreeningCase.post("/addDetailCase", ScreeningCaseController.addDetailScreening);
routerScreeningCase.post("/getCaseDetailsList", ScreeningCaseController.screeningDetailsList);
routerScreeningCase.post("/getEncounters", ScreeningCaseController.screeningEncounters);
routerScreeningCase.post("/getscreenercases", ScreeningCaseController.screenerCasesList);
routerScreeningCase.post("/getsevikacases", ScreeningCaseController.sevikaCasesList);

routerScreeningCase.post("/addSymptoms", ScreeningCaseController.addSymptoms);
routerScreeningCase.post("/SymptomsList", ScreeningCaseController.SymptomsList);
routerScreeningCase.post("/getCount", ScreeningCaseController.screeningListCount);
routerScreeningCase.post("/getListSeverity", ScreeningCaseController.screeningListSeverity);
routerScreeningCase.get("/countByScreener", ScreeningCaseController.screeningCountperScreener);
routerScreeningCase.post("/lipidCritical", ScreeningCaseController.lipid);
routerScreeningCase.post("/secreenerSevika", ScreeningCaseController.screeningSevika);
routerScreeningCase.post("/lipidCount", ScreeningCaseController.lipidCount);
routerScreeningCase.post("/lipidC", ScreeningCaseController.lipidcritical);
routerScreeningCase.post("/screenerCaseDeleteById", ScreeningCaseController.ScreenerCaseDeletedUpdate)
routerScreeningCase.post("/updateScreenerCase", ScreeningCaseController.updateandScreenerCase)


module.exports = routerScreeningCase;