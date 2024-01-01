var express = require("express");
const AuthController = require("../controllers/AuthController");
const AuthUpdateController = require("../controllers/AuthUpdateController");
const AdminAproval = require("../controllers/AdminAproval");
const MenuController = require("../controllers/MenuController");
var router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/getuser", AuthController.getuser);
router.post("/verify-otp", AuthController.verifyConfirm);
router.post("/resend-verify-otp", AuthController.resendConfirmOtp);

router.post("/forgotpw", AuthUpdateController.forgotpassword);
router.post("/updatepw", AuthUpdateController.updatepassword);

router.post("/authlist", AuthController.authListByStatus);

router.post("/addrole", MenuController.addRole);
router.post("/addaction", MenuController.addAction);

router.post("/mymenulist", MenuController.mymenulist);

router.post("/approve", AdminAproval.updateAuthentication);

module.exports = router;

