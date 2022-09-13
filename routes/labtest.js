var express = require("express");
const LabTestController = require("../controllers/LabTestController");
const VisualExamController = require("../controllers/VisualExamController");
const EyeTestController = require("../controllers/EyeTestController");
const HeartTestController = require("../controllers/HeartTestController");
const HemoglobinController = require("../controllers/HemoglobinController");

var routerLabTestController = express.Router();
routerLabTestController.post("/addLabTest", LabTestController.addLabTest);
routerLabTestController.post("/getLabTestList", LabTestController.LabTestList);
routerLabTestController.post("/addDrugTest", LabTestController.addDrugTest);
routerLabTestController.post("/getDrugTestList", LabTestController.DrugTestList);
routerLabTestController.post("/addLipidPanelTest", LabTestController.addLipidPanelTest);
routerLabTestController.post("/getLipidPanelTestList", LabTestController.LipidPanelTestList);
// =========================ldl route====================================
routerLabTestController.post("/LipidPanelTestldlGreenList", LabTestController.LipidPanelTestldlGreenList);
routerLabTestController.post("/LipidPanelTestldlAmberList", LabTestController.LipidPanelTestldlAmberList);
routerLabTestController.post("/LipidPanelTestldlRedList", LabTestController.LipidPanelTestldlRedList);
routerLabTestController.post("/LipidPanelTestldlDefaultList", LabTestController.LipidPanelTestldlDefaultList);
// =================================hdl route----------------------------------------

routerLabTestController.post("/LipidPanelhdlGreenList", LabTestController.LipidPanelHDLGreenList);
routerLabTestController.post("/LipidPanelhdlAmberList", LabTestController.LipidPanelHDLAmberList);
routerLabTestController.post("/LipidPanelhdlRedList", LabTestController.LipidPanelHDLRedList);
routerLabTestController.post("/LipidPanelhdlDefaultList", LabTestController.LipidPanelHDLDefaultList);

// ==================================severity_triglycerides=========================
routerLabTestController.post("/LipidPaneltriglyGreenList", LabTestController.LipidPaneltriglyGreenList);
routerLabTestController.post("/LipidPaneltriglyAmberList", LabTestController.LipidPaneltriglyAmberList);
routerLabTestController.post("/LipidPaneltriglyRedList", LabTestController.LipidPaneltriglyRedList);
routerLabTestController.post("/LipidPaneltriglyDefaultList", LabTestController.LipidPaneltriglyLDefaultList);

// ==============================            =============================
// LipidPanelCholesterolGreenList
routerLabTestController.post("/LipidPanelCholesterolGreenList", LabTestController.LipidPanelCholesterolGreenList);
routerLabTestController.post("/LipidPanelCholesterolAmberList", LabTestController.LipidPanelCholesterolAmberList);
routerLabTestController.post("/LipidPanelCholesterolRedList", LabTestController.LipidPanelCholesterolRedList);
routerLabTestController.post("/LipidPanelCholesterolDefaultList", LabTestController.LipidPanelCholesterolLDefaultList);

routerLabTestController.post("/addBloodGlucoseTest", LabTestController.addBloodGlucoseTest);
routerLabTestController.post("/getBloodGlucoseTestList", LabTestController.BloodGlucoseTestList);
routerLabTestController.post("/getBloodGlucoseTestCount", LabTestController.bloodGlucoseCount);

routerLabTestController.post("/addVisualExam", VisualExamController.addVisualExam);
routerLabTestController.post("/getVisualExamList", VisualExamController.VisualExamList);
routerLabTestController.post("/addEyeTest", EyeTestController.addEyeTest);
routerLabTestController.post("/getEyeTestList", EyeTestController.EyeTestList);
routerLabTestController.post("/addHemoglobinTest", HemoglobinController.addHemoglobinTest);
routerLabTestController.post("/getHemoglobinList", HemoglobinController.HemoglobinList);
routerLabTestController.post("/getHemoglobinCount", LabTestController.hemoTestCount);
routerLabTestController.post("/getREyeCount", LabTestController.reyeTestCount);
routerLabTestController.post("/getLEyeCount", LabTestController.leyeTestCount);

routerLabTestController.post("/getldlCount", LabTestController.ldlTestCount);
routerLabTestController.post("/gethdlCount", LabTestController.hdlcholesterolTestCount);
routerLabTestController.post("/gettriCount", LabTestController.triglyceridesTestCount);
routerLabTestController.post("/getCholestCount", LabTestController.cholesterolTestCount);

routerLabTestController.post("/addSickleCell", LabTestController.addSickleCell);
routerLabTestController.post("/getSickleCell", LabTestController.SickleCellList);
routerLabTestController.post("/addThalassemia", LabTestController.addThalassemia);
routerLabTestController.post("/getThalassemia", LabTestController.ThalassemiaList);

routerLabTestController.post("/addLungTest", LabTestController.addLungFunctionTest);
routerLabTestController.post("/getLungTest", LabTestController.LungTestList);

routerLabTestController.post("/addUrineTest", LabTestController.addUrineTest);
routerLabTestController.post("/getUrineTestList", LabTestController.UrineTestList);

routerLabTestController.post("/addHeartTest", HeartTestController.addHeartTest);
routerLabTestController.post("/getHeartTestList", HeartTestController.HeartTestList);

module.exports = routerLabTestController;