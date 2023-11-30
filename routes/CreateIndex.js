// CreateIndex.js
const createIndexConroller = require("../controllers/CreateIndexConroller");

// router
const router = require("express").Router();

// use routers
router.post("/addindex", createIndexConroller.addindex);
router.post("/correctPiechartValues", createIndexConroller.correctPiechartValues);
router.post("/correctLabTestUpdateBloodGlucose", createIndexConroller.correctLabTestUpdateBloodGlucose);


module.exports = router;