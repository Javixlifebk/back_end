const UserModel = require("../models/UserModel");
const UserDetailsModel = require("../models/UserDetailsModel");
const { body,validationResult } = require("express-validator");
// const {sanitizeBody } = require("express-validator");
//helper file to prepar responses.
const apiResponse = require("../helpers/apiResponse");
const utility = require("../helpers/utility");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailer = require("../helpers/mailer");
const { constants } = require("../helpers/constants");
/**
 * Request for new password if you forgot password.
 *
 * @param {string}      email
 * 
 * @returns {Object}
 */
exports.forgotpassword = [
	// Validate fields.
	
	body("email").isLength({ min: 1 }).trim().withMessage("Email must be specified.")
		.isEmail().withMessage("Email must be a valid email address.").custom((value) => {
			return UserModel.findOne({email : value}).then((user) => {
				if (!user) {
					return Promise.reject("E-mail does not exist.");
				}
				 
			});
		}),
	
	// Sanitize fields.
	// sanitizeBody("email").escape(),
	
	
	// Process request after validation and sanitization.
	(req, res) => {
		try {

			if(req.body.email==='akashsaboti@gmail.com' || req.body.email==='manishkumar.singhps1408@gmail.com'){ 

               
				return apiResponse.successResponse(res,"otp has been sent to email account.");

			}
			
			// Extract the validation errors from a request.
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				// Display sanitized values/errors messages.
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
				//generate new  password
				var newpassword=""+utility.randomNumber(8);
				bcrypt.hash(newpassword,10,function(err, hash) {
					// Create User object with escaped and trimmed data
					UserModel.findOneAndUpdate({'email':req.body.email},{'$set':{'password':hash}},function(err,resDoc)
					{
						 if (err) {
							return apiResponse.ErrorResponse(res, err); 
						 }
						 else
						 {
							let html = "<p>This is your new password</p><p>Password: "+newpassword+"</p>"; 
							mailer.send(
										constants.confirmEmails.from, 
										req.body.email,

										"New Password",
										html
									).then(function(){ 
									}).catch(erri => {
										return apiResponse.ErrorResponse(res,erri);
									}) ; // End Mail
							return apiResponse.successResponse(res,"Password has been sent to email account.");
						 }
					});
					
				});
			}
		} catch (err) {
			//throw error in json response with status 500.
			return apiResponse.ErrorResponse(res, err);
		}
	}];

/**
 * Update Password.
 *
 * @param {string}      email
 * @param {string}      existpassword
 * @param {string}      newpassword
 * @returns {Object}
 */
exports.updatepassword = [
	// Validate fields.
	
	body("email").isLength({ min: 1 }).trim().withMessage("Email must be specified.")
		.isEmail().withMessage("Email must be a valid email address.").custom((value) => {
			return UserModel.findOne({email : value}).then((user) => {
				if (!user) {
					return Promise.reject("E-mail does not exist.");
				}
				 
			});
		}),
	body("existpassword").isLength({ min: 6 }).trim().withMessage("Password must be 6 characters or greater."),
	body("newpassword").isLength({ min: 6 }).trim().withMessage("Password must be 6 characters or greater."),
	// Sanitize fields.
	// sanitizeBody("email").escape(),
	// sanitizeBody("existpassword").escape(),
	// sanitizeBody("newpassword").escape(),
	
	// Process request after validation and sanitization.
	(req, res) => {
		try {
			// Extract the validation errors from a request.
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				// Display sanitized values/errors messages.
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
				//generate new  password
				var newpassword=req.body.newpassword;
				
				
				UserModel.findOne({email:req.body.email}).then(user => {
					if(user)
					{
						let existHash=user.password;
						
						bcrypt.compare(req.body.existpassword, existHash, function(err, same){
						if(same)
						{
							bcrypt.hash(newpassword,10,function(err, hash) {
								// Create User object with escaped and trimmed data
							UserModel.findOneAndUpdate({'email':req.body.email,'password':existHash},{'$set':{'password':hash}},function(err,resDoc)
								{
									 if (err) {
										return apiResponse.ErrorResponse(res, err); 
									 }
									 else
									 {  
										
										if(resDoc)
										return apiResponse.successResponse(res,"Password has been updated.");
										else apiResponse.ErrorResponse(res, "Invalid Credential"); 
									 }
								});
								
							});// new password block
						}
						else
						{ 	return apiResponse.unauthorizedResponse(res, "Email or Password wrong.");
						}
						});  // exist password
					}
					else  	return apiResponse.unauthorizedResponse(res, "Email or Password wrong");
				}); // find user
			} // else
		} catch (err) {
			//throw error in json response with status 500.
			return apiResponse.ErrorResponse(res, err);
		}
	}];
