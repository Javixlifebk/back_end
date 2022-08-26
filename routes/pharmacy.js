var express = require("express");
const PharmacyController = require("../controllers/PharmacyController");
var routerPharmacy = express.Router();
routerPharmacy.post("/addprofile", PharmacyController.addPharmacy);
routerPharmacy.post("/updatePharmacy", PharmacyController.updatePharmacy);
routerPharmacy.post("/updatePharmacyDetails", PharmacyController.updatePharmacyDetails);
routerPharmacy.post("/pharmacyList", PharmacyController.pharmacyList);
routerPharmacy.post("/pharmacyById", PharmacyController.pharmacyProfile);

module.exports = routerPharmacy;