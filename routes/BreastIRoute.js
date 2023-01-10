// import controllers  banner
const breasttestController = require("../controllers/BreastITestController");

// router
const router = require("express").Router();

// use routers
router.post("/addbreasttest", breasttestController.addBreasttest);
router.post("/getAllBreastTest", breasttestController.getAllBreastTest);
router.post("/getByCaseId", breasttestController.getByCaseId);

module.exports = router;
