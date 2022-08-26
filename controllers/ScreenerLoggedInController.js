const LoggedInDoctors = require("../models/LoggedInDoctors");
const LoggedInScreener = require("../models/LoggedInScreener");
const CitizenModel = require("../models/CitizenModel");
const NGOModel = require("../models/NGOModel");
const DoctorModel = require("../models/DoctorModel");
const ScreenerModel = require("../models/ScreenerModel");
const PharmacyModel = require("../models/PharmacyModel");
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
exports.updateLoggedInScreeners = [
   
    // Validate fields.
	body("screenerId").isLength({ min: 1 }).trim().withMessage("Screener Id must be specified.")
		.isAlphanumeric().withMessage("Screener Id has non-alphanumeric characters."),
	body("loggedIn").isLength({ min: 1, max:1 }).trim().withMessage("LoggedIn must be specified.")
		.isNumeric().withMessage("LoggedIn has non-numeric characters."),


	// Sanitize fields.
	sanitizeBody("screenerId").escape(),
	sanitizeBody("loggedIn").escape(),

	(req, res) => { 
			
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
					
					
					var screenerId=req.body.screenerId;
					var loggedIn=req.body.loggedIn;
				
					if(loggedIn=='1'){
					LoggedInScreener.LoggedInScreener.findOneAndUpdate(
											{ screenerId:screenerId},
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
													screenerId: req.body.screenerId,
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
					LoggedInScreener.LoggedInScreener.findOneAndUpdate(
											{ screenerId:screenerId },
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
							screenerId: req.body.screenerId,
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
					
			}
		} catch (err) {
			
			return apiResponse.ErrorResponse(res,"EXp:"+err);
		}
	}];	





exports.addDetails = [
    
	body("screenerId").isLength({ min: 1 }).trim().withMessage("Screener Id must be specified.")
		.isAlphanumeric().withMessage("Screener Id has non-alphanumeric characters.").custom((value) => {
			return LoggedInScreener.LoggedInScreener.findOne({screenerId : value}).then((user) => {
				if (user) {
					return Promise.reject("screenerId already in use");
				}
			});
		}),
	body("isLoggedIn").isLength({ min: 1, max:1 }).trim().withMessage("Enter 0 or 1 Logged In "),
	body("inDate").isLength({ min: 1 }).trim().withMessage("Enter In Date!"),
	body("outDate").isLength({ min: 1 }).trim().withMessage("Enter Out Date!"),	
	
	sanitizeBody("screenerId").escape(),
	sanitizeBody("isLoggedIn").escape(),
	sanitizeBody("inDate").escape(),
	sanitizeBody("outDate").escape(),
	
	
	(req, res) => { 
			
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {	
					var recLoggedInDetail={
							screenerId: req.body.screenerId,
							isLoggedIn: req.body.isLoggedIn,
							inDate:req.body.inDate,
							outDate: req.body.outDate

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
		} catch (err) {
			
			return apiResponse.ErrorResponse(res,err);
		}
	}];




// exports.onlineList=[

//     (req, res) => { 
			
// 		try {
// 			const errors = validationResult(req);
// 			if (!errors.isEmpty()) {
// 				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
// 			}else {

// 			LoggedInScreener.LoggedInScreener.aggregate(
// 							{'isLoggedIn':{'$eq': true}},
// 							{
// 								'screenerId':1
// 							}
// 				).then(users => {
					
// 					let user=users[0];
// 					if (user) {
// 							return apiResponse.successResponseWithData(res,"Found", users);
// 					}
// 					else return apiResponse.ErrorResponse(res,"Not Found");
					
// 				});
// 			}
// 		} catch (err) {
			
// 			return apiResponse.ErrorResponse(res,"EXp:"+err);
// 		}
// 	}

// ];

exports.getJavixId = [

	body("roleId").isLength({ min: 1 , max: 2 }).trim().withMessage("Enter Valid Role Id!"),
	body("userid").isLength({ min: 1 }).trim().withMessage("Enter user Id"),	
	

	sanitizeBody("roleId").escape(),
	sanitizeBody("userid").escape(),

    (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
				var roleId = req.body.roleId;
				var valresp;
			if(roleId==='1'){ 
				DoctorModel.Doctor.aggregate([
							{'$match':{'doctorLoginId':req.body.userid }},
							{$project:{'actorId':"$doctorId"}}
							]
				).then(users => {
					

					let user=users[0];
					valresp=users;
					if (user) {
							return apiResponse.successResponseWithData(res,"Found", users);
					}
					else return apiResponse.ErrorResponse(res,"Not Found");
					
				});
			}
			else if (roleId==='2') {
				ScreenerModel.Screener.aggregate([
							{'$match':{'screenerLoginId':req.body.userid }},
							{$project:{'actorId':"$screenerId"}}
							]
				).then(users => {
					
					let user=users[0];
					valresp=users;
					if (user) {
							return apiResponse.successResponseWithData(res,"Found", users);
					}
					else return apiResponse.ErrorResponse(res,"Not Found");
					
				});
			}

			else if (roleId==='21') {
				ScreenerModel.Screener.aggregate([
							{'$match':{'screenerLoginId':req.body.userid }},
							{$project:{'actorId':"$screenerId"}}
							]
				).then(users => {
					
					let user=users[0];
					valresp=users;
					if (user) {
							return apiResponse.successResponseWithData(res,"Found", users);
					}
					else return apiResponse.ErrorResponse(res,"Not Found");
					
				});
			}

			else if(roleId==='3'){
				NGOModel.NGO.find(
							{'ngoLoginId':req.body.userid },
							{
								'ngoId':1
							}
				).then(users => {
					
					let user=users[0];
					valresp=users;
					if (user) {
							return apiResponse.successResponseWithData(res,"Found", users);
					}
					else return apiResponse.ErrorResponse(res,"Not Found");
					
				});
			}
			else if (roleId==='4') {
				PharmacyModel.Pharmacy.aggregate([
							{'$match':{'pharmacyLoginId':req.body.userid }},
							{$project:{'actorId':"$pharmacyId"}}
							]
				).then(users => {
					
					let user=users[0];
					if (user) {
							return apiResponse.successResponseWithData(res,"Found", users);
					}
					else return apiResponse.ErrorResponse(res,"Not Found");
					
				});
			}
			else if (roleId==='91') {
			
				return apiResponse.ErrorResponse(res,"Not Found");
					
				
			}
			else if (roleId==='6') {

			CitizenModel.Citizen.aggregate([
							{'$match':{'citizenLoginId':req.body.userid }},
							{$project:{'actorId':"$citizenId"}}
							]
				).then(users => {
					
					let user=users[0];
					if (user) {
							return apiResponse.successResponseWithData(res,"Found", users);
					}
					else return apiResponse.ErrorResponse(res,"Not Found");
					
				});
			}
			}
		} catch (err) {
			
			return apiResponse.ErrorResponse(res,"EXp:"+err);
		}
	}

];