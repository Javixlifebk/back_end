var express = require("express");
const NGOController = require("../controllers/NGOController");
const ScreenerController = require("../controllers/ScreenerController");
const NGOList = require("../services/ngo/NGOList");
const ScreenerList = require("../services/screener/ScreenerList");
var routerNGO = express.Router();
routerNGO.post("/addprofile", NGOController.addProfile);
routerNGO.post("/updateNGO", NGOController.updateNGO);
routerNGO.post("/updateNGODetails", NGOController.updateNGODetails);
routerNGO.post("/updateNGOFinal", NGOController.updateNGOFinal);
routerNGO.post("/updateNGODetailsFinal", NGOController.updateNGODetailsFinal);
routerNGO.post("/ngoList", NGOList.ngoList);
routerNGO.post("/ngoById", NGOList.ngoProfile);
routerNGO.post("/screenerList", ScreenerList.screenerList);
routerNGO.post("/approvescreenerList", ScreenerList.updatescreenerList);
routerNGO.post("/addscreener", ScreenerList.updateAddmappedscreener);
routerNGO.post("/updatescreenermap", ScreenerList.updateScreenerMapAuth);
routerNGO.post("/pedlist", ScreenerList.screenermappedList);
routerNGO.post("/screenerunmappedlist", ScreenerList.screenerunmappedList);

routerNGO.post("/sevikamappedlist", ScreenerList.sevikamappedList);
routerNGO.post("/sevikaunmappedlist", ScreenerList.sevikaunmappedList);



routerNGO.post("/screenerById", ScreenerList.screenerProfile);
routerNGO.post("/screener/addprofile", ScreenerController.addProfile);
routerNGO.post("/screener/updateScreener", ScreenerController.updateScreener);
routerNGO.post("/screener/updateScreenerDetails", ScreenerController.updateScreenerDetails);
routerNGO.post("/screener/updateScreenerSevika", ScreenerController.updateScreenerSevika);
routerNGO.post("/screener/updateScreenerNgoId", ScreenerController.updateScreenerNgoId);
routerNGO.post("/screener/updateScreenerFinal", ScreenerController.updateScreenerFinal);
routerNGO.post("/screener/updateScreenerDetailsFinal", ScreenerController.updateScreenerDetailsFinal);

routerNGO.post("/requpdate/list", NGOController.ngoRequestUpdateList);
// routerNGO.post("/screener/updateScreenerDetailsFinal", ScreenerController.);


module.exports = routerNGO;