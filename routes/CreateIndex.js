// CreateIndex.js
const createIndexConroller = require("../controllers/CreateIndexConroller");

// router
const router = require("express").Router();

// use routers
router.post("/addindex", createIndexConroller.addindex);
// router.post("/correctPiechartValues", createIndexConroller.correctPiechartValues);


module.exports = router;