const UserModel = require("../models/UserModel");
const UserDetailsModel = require("../models/UserDetailsModel");
const { body, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const Imgupload = require("../middlewares/navbarLogo");
//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");
const utility = require("../helpers/utility");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailer = require("../helpers/mailer");
const { constants } = require("../helpers/constants");
var request = require("request");

/**
 * User registration.
 *
 * @param {string}      firstName
 * @param {string}      lastName
 * @param {string}      email
 * @param {string}      userName
 * @param {string}      password
 * @param {string}      newpassword
 *
 * @returns {Object}
 */

exports.register = [
  // Validate fields.
  body("firstName")
    .isLength({ min: 1 })
    .trim()
    .withMessage("First name must be specified.")
    .isAlphanumeric()
    .withMessage("First name has non-alphanumeric characters."),
  body("lastName")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Last name must be specified.")
    .isAlphanumeric()
    .withMessage("Last name has non-alphanumeric characters."),
  body("email")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Email must be specified.")
    .isEmail()
    .withMessage("Email must be a valid email address.")
    .custom((value) => {
      return UserModel.findOne({ email: value }).then((user) => {
        if (user) {
          return Promise.reject("E-mail already in use");
        }
      });
    }),
  body("userName")
    .isLength({ min: 1 })
    .trim()
    .withMessage("UserName must be specified.")
    .isAlphanumeric()
    .withMessage("UserName must be a unique userName.")
    .custom((value) => {
      return UserModel.findOne({ userName: value }).then((user) => {
        if (user) {
          return Promise.reject("userName already in use");
        }
      });
    }),
  body("password")
    .isLength({ min: 6 })
    .trim()
    .withMessage("Password must be 6 characters or greater."),
  body("newpassword")
    .isLength({ min: 6 })
    .trim()
    .withMessage("Password must be 6 characters or greater."),
  body("phoneNo").custom((value) => {
    if (value != null && value != "" && value != undefined) {
      if (value.length != 10 || value === "0" || isNaN(value)) {
        return Promise.reject(
          "Phone no. should have 10 digits with no preceeding zero!"
        );
      }
    }

    return UserDetailsModel.findOne({
      $or: [{ phoneNo: value }, { phoneNo1: value }],
    }).then((user) => {
      if (value != null && value != "" && value != undefined) {
        // if (user) {
        // 	return Promise.reject("Phone No already in use");
        // }
      }
    });
  }),

  body("phoneNo1").custom((value) => {
    if (value != null && value != "" && value != undefined) {
      if (value.length != 10 || value[0] === "0" || isNaN(value)) {
        return Promise.reject(
          "Phone no 1. should have 10 digits with no preceeding zero!"
        );
      }
    }

    return UserDetailsModel.findOne({
      $or: [{ phoneNo: value }, { phoneNo1: value }],
    }).then((user) => {
      if (value != null && value != "" && value != undefined) {
        // if (user) {
        // 	return Promise.reject("Phone No 1 already in use");
        // }
      }
    });
  }),
  body("roleId")
    .isLength({ min: 1, max: 99 })
    .trim()
    .withMessage("Invalid Form Entry [Role Id]."),

  // Sanitize fields.
  sanitizeBody("firstName").escape(),
  sanitizeBody("lastName").escape(),
  sanitizeBody("email").escape(),
  sanitizeBody("userName").escape(),
  sanitizeBody("password").escape(),
  sanitizeBody("newpassword").escape(),
  sanitizeBody("phoneNo").escape(),
  sanitizeBody("phoneNo1").escape(),
  sanitizeBody("roleId").escape(),
  // sanitizeBody("logo").escape(),
  // sanitizeBody("client_logo").escape(),
  // Process request after validation and sanitization.
  (req, res) => {
    try {
      // 		 Imgupload(req,res);
      // let dataObj = {}

      // if(req.files['logo']){
      //   const profileImage =req.files['logo'][0].path;
      //   dataObj.logo = profileImage;
      // }

      // if(req.files['client_logo']){
      //   const bannerImage = req.files['client_logo'][0].path;
      //   dataObj.client_logo = bannerImage;
      // }
      // 		// Extract the validation errors from a request.
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // Display sanitized values/errors messages.
        return apiResponse.validationErrorWithData(
          res,
          "Validation Error.",
          errors.array()
        );
      } else {
        //hash input password
        bcrypt.hash(req.body.password, 10, function (err, hash) {
          // generate OTP for confirmation
          let otp = utility.randomNumber(4);

          // Create User object with escaped and trimmed data
          var user = new UserModel({
            status: 1, //if added from admin
            userId: req.body.userName,
            ngoId: req.body.ngoId,
            roleId: req.body.roleId,
            userName: req.body.userName,
            email: req.body.email,
            password: hash,
            newpassword: req.body.newpassword,
            confirmOTP: otp,
          });
          user.save();
          console.log(user, "------------------");
          var userDetails = new UserDetailsModel({
            userId: req.body.userName,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phoneNo: req.body.phoneNo,
            phoneNo1: req.body.phoneNo1,
            // logo:dataObj.logo,
            // client_logo:dataObj.client_logo,

            // below code when added from admin isBlocked isExpired  isUnActive
            isBlocked: 0,
            isExpired: 0,
            isUnActive: 0,
          });
          userDetails.save();
          // Html email body
          let html =
            "<p>Please Confirm your Account.</p><p>OTP: " + otp + "</p>";
          //Send confirmation email
          var num;
          if (
            req.body.phoneNo != undefined &&
            req.body.phoneNo != "" &&
            req.body.phoneNo != null
          ) {
            num = "91" + req.body.phoneNo;
          } else if (
            req.body.phoneNo1 != undefined &&
            req.body.phoneNo1 != "" &&
            req.body.phoneNo1 != null
          ) {
            num = "91" + req.body.phoneNo1;
          }
          if (num != undefined && num != "" && num != null) {
            fireSms(otp, num);
          }

          return apiResponse.successResponseWithData(
            res,
            "Registration Success.",
            user
          );

          // mailer.send(
          // 	constants.confirmEmails.from,
          // 	req.body.email,
          // 	"Confirm Account",
          // 	html
          // ).then(function(){
          // 	// Save user.
          // 	user.save(function (err) {
          // 		if (err) { return apiResponse.ErrorResponse(res, err); }

          // 		//return apiResponse.successResponseWithData(res,"Registration Success.", userData);

          // 	});

          // 	userDetails.save(function (err) {

          // 		if (err) { return apiResponse.ErrorResponse(res, err); }
          // 		let userData = {
          // 			_id: user._id,
          // 			userId: user.userId,
          // 			ngoId: user.ngoId,
          // 			userName: user.userName,
          // 			firstName: userDetails.firstName,
          // 			lastName: userDetails.lastName,
          // 			email: userDetails.email,
          // 			phoneNo:userDetails.phoneNo,
          // 			phoneNo1:userDetails.phoneNo1,
          // 			logo:userDetails.logo,
          // 			client_logo:userDetails.client_logo,

          // 		};

          // 		return apiResponse.successResponseWithData(res,"Registration Success.", userData);
          // 	});

          // }).catch(err => {
          // 	return apiResponse.ErrorResponse(res,err);
          // }) ;
        });
      }
    } catch (err) {
      //throw error in json response with status 500.
      return apiResponse.ErrorResponse(res, err);
    }
  },
];
// userData.token = jwt.sign(jwtPayload, secret, jwtData);
// userData.javixid = datass; // Assuming datass is the javixid
/**
 * User login.
 *
 * 
 * @param {string}      email
 * @param {string}      password
 * @param {string}      newpassword
 *
 * @returns {Object}
 */
exports.login = [
  body("email")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Email must be specified.")
    .isEmail()
    .withMessage("Email must be a valid email address."),
  body("password")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Password must be specified."),
  sanitizeBody("email").escape(),
  sanitizeBody("password").escape(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          "Validation Error.",
          errors.array()
        );
      } else {
        UserModel.aggregate([
          { $match: { email: req.body.email } },
          { $limit: 1 },
          {
            $lookup: {
              localField: "userId",
              from: "userdetails",
              foreignField: "userId",
              as: "info",
            },
          },
          { $unwind: "$info" },
          {
            $project: {
              email: 1,
              password: 1,
              isConfirmed: 1,
              status: 1,
              roleId: 1,
              ngoId: 1,
              userId: 1,
              token:1,
              javixid:1,
              "info.firstName": 1,
              "info.lastName": 1,
              "info.phoneNo": 1,
              "info.phoneNo1": 1,
              "info.logo": 1,
              "info.client_logo": 1,
            },
          },
        ]).then((users) => {
          let user = users[0];
          console.log("user==================================", users);

          if (user) {
            //Compare given password with db's hash.
            bcrypt.compare(
              req.body.password,
              user.password,
              function (err, same) {
                if (same) {
                  user.newpassword = req.body.password;
                  user.token = req.body.token;
                  user.javixid = req.body.javixid;
                  // Check if the 'newpassword' field already exists in the document
                  if (user.newpassword) {
                    // If it exists, update the existing 'newpassword' field
                    UserModel.updateOne(
                      { _id: user._id },
                      { $set: { newpassword: user.newpassword, token: user.token, javixid: user.javixid } },
                      function (err) {
                        if (err) {
                          // Handle the error (log, return an error response, etc.)
                          console.error(
                            "Error updating newpassword in the database:",
                            err
                          );
                        } else {
                          // Log the updated newpassword
                          console.log("Updated Password:", user.newpassword);

                          // Rest of your code...

                          // Check account confirmation.
                          if (user.isConfirmed) {
                            // Check User's account active or not.
                            if (user.status) {
                              // Rest of your code...
                            } else {
                              return apiResponse.unauthorizedResponse(
                                res,
                                "Account is not active. Please contact admin."
                              );
                            }
                          } else {
                            return apiResponse.unauthorizedResponse(
                              res,
                              "Account is not confirmed. Please confirm your account."
                            );
                          }
                        }
                      }
                    );
                  } else {
                    // If it doesn't exist, set the 'newpassword' field for the first time
                    UserModel.updateOne(
                      { _id: user._id },
                      { $set: { newpassword: user.newpassword, token: user.token, javixid: user.javixid } },
                      function (err) {
                        if (err) {
                          // Handle the error (log, return an error response, etc.)
                          console.error(
                            "Error setting newpassword in the database:",
                            err
                          );
                        } else {
                          // Log the first-time newpassword
                          console.log("First-time Password:", user.newpassword);

                          // Rest of your code...

                          // Check account confirmation.
                          if (user.isConfirmed) {
                            // Check User's account active or not.
                            if (user.status) {
                              // Rest of your code...
                            } else {
                              return apiResponse.unauthorizedResponse(
                                res,
                                "Account is not active. Please contact admin."
                              );
                            }
                          } else {
                            return apiResponse.unauthorizedResponse(
                              res,
                              "Account is not confirmed. Please confirm your account."
                            );
                          }
                        }
                      }
                    );
                  }

                  let uid = user.userId;
                  let rid = user.roleId;
                  let datass = null;

                  var options = {
                    method: "POST",
                    url: "https://javixlife.org/api/login/getjavixid",
                    headers: {
                      "content-type": "application/x-www-form-urlencoded",
                    },
                    form: { roleId: rid, userid: uid },
                  };

                  request(options, function (error, response, body) {
                    if (error) datass = null;
                    else {
                      body = JSON.parse(body);
                      if (body.status == 1) datass = body.data.data[0].actorId;
                      else datass = null;

                      //Check account confirmation.
                      if (user.isConfirmed) {
                        // Check User's account active or not.
                        if (user.status) {
                          userData = {
                            _id: user._id,
                            firstName: user.info.firstName,
                            lastName: user.info.lastName,
                            email: user.email,
                            userId: user.userId,
                            roleId: user.roleId,
                            ngoId: user.ngoId,
                            phoneNo: user.info.phoneNo,
                            phoneNo1: user.info.phoneNo1,
                          };

                          //Prepare JWT token for authentication
                          const jwtPayload = userData;

                          const jwtData = {
                            expiresIn: process.env.JWT_TIMEOUT_DURATION,
                          };
                          const secret = process.env.JWT_SECRET;
                          //Generated JWT token with Payload and secret.
                          userData.token = jwt.sign(
                            jwtPayload,
                            secret,
                            jwtData
                          );
                          return apiResponse.successResponseWithData(
                            res,
                            "Login Success.",
                            userData
                          );
                        } else {
                          return apiResponse.unauthorizedResponse(
                            res,
                            "Account is not active. Please contact admin."
                          );
                        }
                      } else {
                        return apiResponse.unauthorizedResponse(
                          res,
                          "Account is not confirmed. Please confirm your account."
                        );
                      }
                    }
                  });
                } else {
                  return apiResponse.unauthorizedResponse(
                    res,
                    "Email or Password wrong."
                  );
                }
              }
            );
          } else {
            return apiResponse.unauthorizedResponse(
              res,
              "Email or Password wrong."
            );
          }
        });
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

/** */
/** */
exports.getuser = [
	async (req, res) => {
	  try {
		const users = await UserModel.aggregate([
		  {
			$lookup: {
			  localField: "userId",
			  from: "userdetails",
			  foreignField: "userId",
			  as: "info",
			},
		  },
		  { $unwind: "$info" },
		  {
			$project: {
			  email: 1,
			  password: 1,
			  newpassword: 1,
			  isConfirmed: 1,
			  status: 1,
			  roleId: 1,
			  ngoId: 1,
			  userId: 1,
			  "info.firstName": 1,
			  "info.lastName": 1,
			  "info.phoneNo": 1,
			  "info.phoneNo1": 1,
			  "info.logo": 1,
			  "info.client_logo": 1,
			},
		  },
		]);
  
		console.log("users", users);
		return res.json(users);
	  } catch (err) {
		return apiResponse.ErrorResponse(res, err);
	  }
	},
  ];
  
/**
 * Verify Confirm otp.
 *
 * @param {string}      email
 * @param {string}      otp
 *
 * @returns {Object}
 */
exports.verifyConfirm = [
  body("email")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Email must be specified.")
    .isEmail()
    .withMessage("Email must be a valid email address."),
  body("otp").isLength({ min: 1 }).trim().withMessage("OTP must be specified."),
  sanitizeBody("email").escape(),
  sanitizeBody("otp").escape(),
  (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          "Validation Error.",
          errors.array()
        );
      } else {
        var query = { email: req.body.email };
        UserModel.findOne(query).then((user) => {
          if (user) {
            //Check already confirm or not.
            if (!user.isConfirmed) {
              //Check account confirmation.
              if (user.confirmOTP == req.body.otp) {
                //Update user as confirmed
                UserModel.findOneAndUpdate(query, {
                  isConfirmed: 1,
                  confirmOTP: null,
                }).catch((err) => {
                  return apiResponse.ErrorResponse(res, err);
                });
                return apiResponse.successResponse(
                  res,
                  "Account confirmed success."
                );
              } else {
                return apiResponse.unauthorizedResponse(
                  res,
                  "Otp does not match"
                );
              }
            } else {
              return apiResponse.unauthorizedResponse(
                res,
                "Account already confirmed."
              );
            }
          } else {
            return apiResponse.unauthorizedResponse(
              res,
              "Specified email not found."
            );
          }
        });
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

/**
 * Resend Confirm otp.
 *
 * @param {string}      email
 *
 * @returns {Object}
 */
exports.resendConfirmOtp = [
  body("email")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Email must be specified.")
    .isEmail()
    .withMessage("Email must be a valid email address."),
  sanitizeBody("email").escape(),
  (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          "Validation Error.",
          errors.array()
        );
      } else {
        var query = { email: req.body.email };
        UserModel.findOne(query).then((user) => {
          if (user) {
            //Check already confirm or not.
            if (!user.isConfirmed) {
              // Generate otp
              let otp = utility.randomNumber(4);
              // Html email body
              let html =
                "<p>Please Confirm your Account.</p><p>OTP: " + otp + "</p>";
              // Send confirmation email
              mailer
                .send(
                  constants.confirmEmails.from,
                  req.body.email,
                  "Confirm Account",
                  html
                )
                .then(function () {
                  user.isConfirmed = 0;
                  user.confirmOTP = otp;
                  // Save user.
                  user.save(function (err) {
                    if (err) {
                      return apiResponse.ErrorResponse(res, err);
                    }
                    return apiResponse.successResponse(
                      res,
                      "Confirm otp sent."
                    );
                  });
                });
            } else {
              return apiResponse.unauthorizedResponse(
                res,
                "Account already confirmed."
              );
            }
          } else {
            return apiResponse.unauthorizedResponse(
              res,
              "Specified email not found."
            );
          }
        });
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.authListByStatus = [
  body("email")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Email must be specified.")
    .isEmail()
    .withMessage("Email must be a valid email address."),

  body("status")
    .isLength({ min: 1, max: 1 })
    .trim()
    .withMessage("Fill Status 0 to 9.")
    .isNumeric()
    .withMessage("status 0-9"),

  sanitizeBody("email").escape(),
  sanitizeBody("status").escape(),
  sanitizeBody("searchterm").escape(),
  sanitizeBody("roleId").escape(),
  (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          "Validation Error.",
          errors.array()
        );
      } else {
        var _istatus = parseInt(req.body.status);
        var term = "";
        var setfield = { roleId: { $ne: -1 } };
        if (
          req.body.roleId != null &&
          req.body.roleId != undefined &&
          req.body.roleId != ""
        ) {
          role = parseInt(req.body.roleId);
          setfield["roleId"] = { $eq: role };
        }
        if (req.body.searchterm != null) {
          term = "(?i)" + req.body.searchterm;
        }

        UserModel.aggregate([
          {
            $match: {
              $and: [{ status: _istatus }, setfield, { roleId: { $ne: 6 } }],
            },
          },
          { $limit: 1000 },
          {
            $lookup: {
              localField: "userId",
              from: "userdetails",
              foreignField: "userId",
              as: "info",
            },
          },
          { $unwind: "$info" },
          {
            $project: {
              email: 1,
              isConfirmed: 1,
              status: 1,
              roleId: 1,
              userId: 1,
              ngoId: 1,
              "info.firstName": 1,
              "info.lastName": 1,
              "info.isBlocked": 1,
              "info.isExpired": 1,
              "info.isUnActive": 1,
              "info.phoneNo": 1,
              "info.phoneNo1": 1,
            },
          },
          {
            $match: {
              $or: [
                { "info.lastName": { $regex: term } },
                { email: { $regex: term } },
                { "info.phoneNo": { $regex: term } },
                { "info.firstName": { $regex: term } },
              ],
            },
          },
        ]).then((users) => {
          if (users) {
            return apiResponse.successResponseWithData(res, "Found", users);
          } else return apiResponse.ErrorResponse(res, "Not Found");
        });
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, "EXp:" + err);
    }
  },
];

async function getId(uid, rid) {
  var options = {
    method: "POST",
    url: "http://localhost:3000/api/login/getjavixid",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    form: { roleId: rid, userid: uid },
  };

  await request(options, function (error, response, body) {
    if (error) return error;
    else {
      return "";
    }
  });
}

function fireSms(otp, numbers) {
  var request = require("request");

  var messageTemp = "Please Confirm your Account OTP " + otp + " . Javix Life";

  var options = {
    method: "GET",
    url: "https://api.textlocal.in/send/",
    qs: {
      apikey: "NGI2NTUzNmIzNzZiMzE1MzcwMzU2ODM0NTc3ODdhMzE=",
      message: messageTemp,
      numbers: numbers,
      sender: "JAVIXL",
    },
    headers: {
      "postman-token": "395f321f-849d-90c3-cb19-40e559be9f80",
      "cache-control": "no-cache",
      "content-type": "application/x-www-form-urlencoded",
    },
    form: {},
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
  });
}
