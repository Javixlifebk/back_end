// CreateIndex.js
const EzeRxConroller = require("../controllers/EzeRxConroller");

// router
const router = require("express").Router();

// use routers
router.post("/addRecord", EzeRxConroller.addRecord);
router.post("/getRecord", EzeRxConroller.getRecord);


module.exports = router;