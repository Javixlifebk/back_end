const UserModel = require("../models/UserModel");
const UserDetailsModel = require("../models/UserDetailsModel");
const { body,validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
//helper file to prepar responses.
const apiResponse = require("../helpers/apiResponse");
const utility = require("../helpers/utility");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailer = require("../helpers/mailer");
const { constants } = require("../helpers/constants");

exports.updateAuthentication = [
   
    
	body("forUserId").isLength({ min: 3 }).trim().withMessage("user must atleast 3 chars!").custom((value) => {
			return UserModel.findOne({userId : value}).then((user) => {
				if (user) {}
				else return Promise.reject("Invalid User Selection");
			});
		}),
	body("status").isLength({ min: 1,max:1 }).trim().withMessage("Invalid Status!").isNumeric().withMessage("status 0-9"),
	body("isBlocked").isLength({ min: 1,max:1 }).trim().withMessage("Blocked Status 0|1!").isNumeric().withMessage("isBlocked should be 0|1"),
	body("isExpired").isLength({ min: 1,max:1 }).trim().withMessage("Expired Status 0|1!").isNumeric().withMessage("isExpired should be 0|1"),
	body("isUnActive").isLength({ min: 1,max:1 }).trim().withMessage("nActive Status 0|1!").isNumeric().withMessage("isUnActive should be 0|1"),
	
	sanitizeBody("forUserId").escape(),
	sanitizeBody("status").escape(),
	sanitizeBody("isBlocked").escape(),
	sanitizeBody("isExpired").escape(),
	sanitizeBody("isUnActive").escape(),
	
	(req, res) => { 
			
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
					
					
					UserModel.findOneAndUpdate({'userId':req.body.forUserId},{'$set':{'status':req.body.status}},function(err,resDoc)
								{
									 if (err) {
										return apiResponse.ErrorResponse(res, err); 
									 }
									 else
									 {  
										if(resDoc)
										{
											
											UserDetailsModel.findOneAndUpdate({'userId':req.body.forUserId},{'$set':{'isBlocked':req.body.isBlocked,'isExpired':req.body.isExpired,'isUnActive':req.body.isUnActive}},function(ierr,iresDoc)
												{
													 if (ierr) {
														return apiResponse.ErrorResponse(res, ierr); 
													 }
													 else
													 {  
														if(iresDoc)
														{
															
															return apiResponse.successResponse(res,"Updated Successfullly.");
														}
														else apiResponse.ErrorResponse(res, "Invalid User"); 
													 }
												});
										}
										else apiResponse.ErrorResponse(res, "Invalid User"); 
									 }
								});
								
							
					
			}
		} catch (err) {
			
			return apiResponse.ErrorResponse(res,"EXp:"+err);
		}
	}];