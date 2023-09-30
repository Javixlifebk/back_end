// CreateIndex.js
const createIndexConroller = require("../controllers/CreateIndexConroller");

// router
const router = require("express").Router();

// use routers
router.post("/addindex", createIndexConroller.addindex);


module.exports = router;