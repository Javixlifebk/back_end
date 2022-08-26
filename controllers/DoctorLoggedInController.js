const LoggedInDoctors = require("../models/LoggedInDoctors");
const LoggedInScreener = require("../models/LoggedInScreener");
const DoctorModel = require("../models/DoctorModel");
const { body,validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");
const utility = require("../helpers/utility");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailer = require("../helpers/mailer");
const { constants } = require("../helpers/constants");

/**
 * Update online status.
 *
 * @param {string}      doctorId
 * @param {boolean}      loggedIn
 *
 * @returns {Object}
 */
exports.updateLoggedInDoctors = [
   
    // Validate fields.
	body("doctorId").isLength({ min: 1 }).trim().withMessage("Doctor Id must be specified.")
		.isAlphanumeric().withMessage("Doctor Id has non-alphanumeric characters."),
	body("loggedIn").isLength({ min: 1, max:1 }).trim().withMessage("LoggedIn must be specified.")
		.isNumeric().withMessage("LoggedIn has non-numeric characters."),


	// Sanitize fields.
	sanitizeBody("doctorId").escape(),
	sanitizeBody("loggedIn").escape(),

	(req, res) => { 
			
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
					
					
					var doctorId=req.body.doctorId;
					var loggedIn=req.body.loggedIn;
				
					if(loggedIn=='1'){
					LoggedInDoctors.LoggedInDoctors.findOneAndUpdate(
											{ doctorId:doctorId},
											{$set: {
														inDate: Date.now(),
														isLoggedIn:loggedIn
														
													  } 
										    },
											
											{new: true},
												function(_error,newrecs)
												{
												if(_error) {return  apiResponse.ErrorResponse(res, "Sorry:"+_error);}
												else if(newrecs!=null) { return apiResponse.successResponseWithData(res,"Success",newrecs);}
												else {

													var recLoggedInDetail={
													doctorId: req.body.doctorId,
													isLoggedIn: req.body.isLoggedIn,
													inDate:Date.now(),
													outDate: Date.now()

												};
					var actionLoggedInDetail=new LoggedInScreener.LoggedInScreener(recLoggedInDetail);
					actionLoggedInDetail.save(function(_error)
					{
						if(_error)
						{ 
							apiResponse.ErrorResponse(res, "Sorry:"+_error);
						}
						else
						{
								return apiResponse.successResponseWithData(res,"Successfully Submitted");
								
						}
					}
					);


												}
												}
					);
				}
				else{
					LoggedInDoctors.LoggedInDoctors.findOneAndUpdate(
											{ doctorId:doctorId },
											{$set: {
														outDate: Date.now(),
														isLoggedIn:loggedIn
														
													  } 
										    },
											
											{new: true},
												function(_error,newrecs)
												{
												if(_error) {return  apiResponse.ErrorResponse(res, "Sorry:"+_error);}
												else if(newrecs!=null) { return apiResponse.successResponseWithData(res,"Success",newrecs);}
												else {

													var recLoggedInDetail={
							doctorId: req.body.doctorId,
							isLoggedIn: req.body.isLoggedIn,
							inDate:Date.now(),
							outDate: Date.now()

					};
					var actionLoggedInDetail=new LoggedInDoctors.LoggedInDoctors(recLoggedInDetail);
					actionLoggedInDetail.save(function(_error)
					{
						if(_error)
						{ 
							apiResponse.ErrorResponse(res, "Sorry:"+_error);
						}
						else
						{
								return apiResponse.successResponseWithData(res,"Successfully Submitted");
								
						}
					}
					);


												}
												}
					);
				}
					
			}
		} catch (err) {
			
			return apiResponse.ErrorResponse(res,"EXp:"+err);
		}
	}];	