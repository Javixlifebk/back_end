var express = require("express");

const CitizenController = require("../controllers/CitizenController");

const MedicalAllergyHistoryController = require("../controllers/MedicalAllergyHistoryController");

const FamilyHistoryController = require("../controllers/FamilyHistoryController");
const PersonalHistoryController = require("../controllers/PersonalHistoryController");
const WomenReproductiveHistoryController = require("../controllers/WomenReproductiveHistoryController");
//  const lipidController = require("../lipidDaily")

var routerCitizen = express.Router();
routerCitizen.post("/addprofile", CitizenController.addProfile);
routerCitizen.post("/citizenList", CitizenController.citizenList);
routerCitizen.post("/citizenReferList", CitizenController.updateReferAuth);
routerCitizen.post("/citizenNewList", CitizenController.citizenNewList);
routerCitizen.post("/citizenById", CitizenController.citizenById);
routerCitizen.post("/citizenl", CitizenController.listcity);
routerCitizen.post("/citizenCases", CitizenController.citizenCasesList);
routerCitizen.post("/addDocuments", CitizenController.addDocuments);
routerCitizen.post("/documentsList", CitizenController.recordList);
routerCitizen.post("/updateCitizen", CitizenController.updateCitizen);
routerCitizen.post("/updateAddress", CitizenController.updateCitizenAddress);
routerCitizen.post("/addHistory", MedicalAllergyHistoryController.addHistory);
routerCitizen.post("/addAllergy", MedicalAllergyHistoryController.addAllergy);

routerCitizen.post("/updateAllergy", MedicalAllergyHistoryController.updateAllergy);
routerCitizen.post("/updateHistory", MedicalAllergyHistoryController.updateHistory);

routerCitizen.post("/addPersonalHistory", PersonalHistoryController.addPersonalHistory);
routerCitizen.post("/addWomenHistory", WomenReproductiveHistoryController.addWomenReproductiveHistory);
routerCitizen.post("/addFamilyHistory", FamilyHistoryController.addFamilyHistory);
routerCitizen.post("/updateFamilyHistory", FamilyHistoryController.updateFamilyHistory);
routerCitizen.post("/updatePersonalHistory", PersonalHistoryController.updatePersonalHistory);
routerCitizen.post("/updateWomenHistory", WomenReproductiveHistoryController.updateWomenHistory);
routerCitizen.post("/citizenList100", CitizenController.citizenListSearcher);
routerCitizen.post("/citizenrefer", CitizenController.citizenRefers);
routerCitizen.post("/citizenup", CitizenController.updateCitizenR);



routerCitizen.post("/getHistoryAllergy", MedicalAllergyHistoryController.historyAllergyList);
routerCitizen.post("/getHistoryMedical", MedicalAllergyHistoryController.historyMedicalList);
routerCitizen.post("/getHistoryWomen", WomenReproductiveHistoryController.WomenHistoryList);
routerCitizen.post("/getHistoryFamily", FamilyHistoryController.FamilyHistoryList);
routerCitizen.post("/getHistoryPersonal", PersonalHistoryController.PersonalHistoryList);
// routerCitizen.get("/lipid", lipidController.lipid);

module.exports = routerCitizen;