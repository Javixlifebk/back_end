var express = require("express");
const LabTestController = require("../controllers/LabTestController");
const VisualExamController = require("../controllers/VisualExamController");
const EyeTestController = require("../controllers/EyeTestController");
const HeartTestController = require("../controllers/HeartTestController");
const HemoglobinController = require("../controllers/HemoglobinController");
const BloodPressureController = require("../controllers/BloodPressureController");
const SPO2Controller = require("../controllers/SPO2Controller");
const TempratureController = require("../controllers/TempratureController");
const HeartRateController = require("../controllers/HeartRateController");
const BMIController = require("../controllers/BMIController");

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
routerLabTestController.post("/getBloodGlucoseGreenList", LabTestController.BloodGlucoseTestGreenList);

routerLabTestController.post("/getBloodGlucoseAmberList", LabTestController.BloodGlucoseTestAmberList);
routerLabTestController.post("/getBloodGlucoseRedList", LabTestController.BloodGlucoseTestRedList);

routerLabTestController.post("/getBloodGlucoseGreenCount", LabTestController.BloodGlucoseGreenCount);
routerLabTestController.post("/getBloodGlucoseAmberCount", LabTestController.BloodGlucoseAmberCount);
routerLabTestController.post("/getBloodGlucoseRedCount", LabTestController.BloodGlucoseRedCount);

routerLabTestController.post("/LipidPanelTestldlRedcount", LabTestController.LipidPanelTestldlRedcount);


routerLabTestController.post("/addVisualExam", VisualExamController.addVisualExam);
routerLabTestController.post("/getVisualExamList", VisualExamController.VisualExamList);
routerLabTestController.post("/addEyeTest", EyeTestController.addEyeTest);
routerLabTestController.post("/getEyeTestList", EyeTestController.EyeTestList);
routerLabTestController.post("/addHemoglobinTest", HemoglobinController.addHemoglobinTest);
routerLabTestController.post("/getHemoglobinList", HemoglobinController.HemoglobinList);
routerLabTestController.post("/getHemoglobinGreenList", HemoglobinController.HemoglobinTestGreenList);
routerLabTestController.post("/getHemoglobinAmberList", HemoglobinController.HemoglobinTestAmberList);
routerLabTestController.post("/getHemoglobinRedList", HemoglobinController.HemoglobinTestRedList);
routerLabTestController.post("/getUserPost", HemoglobinController.getUserPost);
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


//New route
routerLabTestController.post("/getBloodPressureGreenList", BloodPressureController.BloodPressureGreenList);
routerLabTestController.post("/getBloodPressureAmberList", BloodPressureController.BloodPressureAmberList);
routerLabTestController.post("/getBloodPressureRedList", BloodPressureController.BloodPressureRedList);

routerLabTestController.post("/getRightEyeAmberList", EyeTestController.RightEyeAmberList);
routerLabTestController.post("/getRightEyeGreenList", EyeTestController.RightEyeGreenList);
routerLabTestController.post("/getRightEyeRedList", EyeTestController.RightEyeRedList);

routerLabTestController.post("/getLeftEyeAmberList", EyeTestController.LeftEyeAmberList);
routerLabTestController.post("/getLeftEyeGreenList", EyeTestController.LeftEyeGreenList);
routerLabTestController.post("/getLeftEyeRedList", EyeTestController.LeftEyeRedList);


routerLabTestController.post("/getSPO2GreenList", SPO2Controller.SPO2GreenList);
routerLabTestController.post("/getSPO2AmberList", SPO2Controller.SPO2AmberList);
routerLabTestController.post("/getSPO2RedList", SPO2Controller.SPO2RedList);

routerLabTestController.post("/getTempratureGreenList", TempratureController.TempratureGreenList);
routerLabTestController.post("/getTempratureAmberList", TempratureController.TempratureAmberList);
routerLabTestController.post("/getTempratureRedList", TempratureController.TempratureRedList);


routerLabTestController.post("/getHeartRateGreenList", HeartRateController.HeartRateGreenList);
routerLabTestController.post("/getHeartRateAmberList", HeartRateController.HeartRateAmberList);
routerLabTestController.post("/getHeartRateRedList", HeartRateController.HeartRateRedList);

routerLabTestController.post("/getBMIGreenList", BMIController.BMIGreenList);
routerLabTestController.post("/getBMIAmberList", BMIController.BMIAmberList);
routerLabTestController.post("/getBMIRedList", BMIController.BMIRedList);

module.exports = routerLabTestController;