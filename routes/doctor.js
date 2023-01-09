var express = require("express");
const DoctorController = require("../controllers/DoctorController");
const PrescriptionController = require("../controllers/PrescriptionController");

var routerDoctor = express.Router();
routerDoctor.post("/addprofile", DoctorController.addProfile);
routerDoctor.post("/addDoctorDoc", DoctorController.adddoctorImg);
routerDoctor.post("/findone", DoctorController.doctorByIddoc);
routerDoctor.post("/addDoctorDoc", DoctorController.adddoctorImg);
routerDoctor.post("/doctorList", DoctorController.doctorList);
routerDoctor.post("/doctorById", DoctorController.doctorById);
routerDoctor.post("/doctorListById", DoctorController.doctorListById);
routerDoctor.post("/doctormapped", DoctorController.doctorMapped);

routerDoctor.get("/countprescription",PrescriptionController.countPrescriptionDetails);
routerDoctor.post("/addprescription", PrescriptionController.addPrescription);
routerDoctor.post("/prescriptionlist", PrescriptionController.prescriptionList);
routerDoctor.post("/updateprescription", PrescriptionController.updatePrescriptionDetails);
routerDoctor.post("/addDoctorSchedules", DoctorController.addDoctorSchedules);
routerDoctor.post("/getDoctorScheduleList", DoctorController.getDoctorScheduleList);
routerDoctor.post("/updateSignature", DoctorController.updateSignature);
routerDoctor.post("/updateAddress", DoctorController.updateDoctorAddress);
routerDoctor.post("/updateDoctor", DoctorController.updateDoctor);
routerDoctor.post("/updatemapped", DoctorController.updateDoctorMapAuth);
routerDoctor.post("/updateaddmapped", DoctorController.updateAddmapped);
routerDoctor.post("/mappedList", DoctorController.doctorMappedList);
routerDoctor.post("/unmappedList", DoctorController.doctorUnMappedList);


module.exports = routerDoctor;