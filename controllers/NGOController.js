const NGOModel = require("../models/NGOModel");
const RequestChangeModel = require("../models/RequestChangeModel");
const { body,query,validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");
const Imgupload = require('../middlewares/navbarLogo');
const utility = require("../helpers/utility");
const jwt = require("jsonwebtoken");
const { constants } = require("../helpers/constants");

exports.addProfile = [
    
	body("userId").isLength({ min: 3 }).trim().withMessage("Invalid Credential!"),
	body("token").isLength({ min: 3 }).trim().withMessage("Invalid Token!"),
	body("ngoName").isLength({ min: 3 }).trim().withMessage("Enter NGO Name!"),
	body("ownerName").isLength({ min: 3 }).trim().withMessage("Enter NGO Owner Name!"),
	body("mobileNo").isLength({ min: 10,max:10 }).trim().withMessage("Mobile no can't be empty!")
					.isNumeric().withMessage("Mobile no must be 10 digits!"),
	body("email").isLength({ min: 3 }).trim().withMessage("Enter email")
				  .isEmail().withMessage("Email must be a valid email address.").custom((value) => {
			return NGOModel.NGO.findOne({email : value}).then((user) => {
				if (user) {
					return Promise.reject("E-mail already in use");
				}
			});
		}),
	
	body("ngoRegistrationNo").isLength({ min: 3 }).trim().withMessage("Enter NGO Registration No!"),	
	body("dateOfRegistration").isLength({ min: 10, max:10 }).trim().withMessage("Enter NGO Registration Date format 'yyyy-mm-dd' !").custom((value) => {
			return utility.isDate(value);
		}).withMessage("Enter NGO Registration Date format 'yyyy-mm-dd' !"),								
	// body("dateOfOnBoarding").isLength({ min: 10, max:10 }).trim().withMessage("Enter Onboarding Date format 'yyyy-mm-dd' !").custom((value) => {
	// 		return utility.isDate(value);
	// 	}).withMessage("Enter Onboarding Date format 'yyyy-mm-dd' !"),	
	body("country").isLength({ min: 3 }).trim().withMessage("Enter Country !").isAlpha().withMessage("Country name must not contain number !"),	
	body("state").isLength({ min: 3 }).trim().withMessage("Enter State !"),	
	body("district").isLength({ min: 3 }).trim().withMessage("Enter District !"),	
	body("address").isLength({ min: 3 }).trim().withMessage("Enter Address !"),	
	
	sanitizeBody("userId").escape(),
	sanitizeBody("ngoName").escape(),
	sanitizeBody("ownerName").escape(),
	sanitizeBody("mobileNo").escape(),
	sanitizeBody("email").escape(),
	// sanitizeBody("image").escape(),
	// sanitizeBody("client_logo").escape(),

	sanitizeBody("ngoRegistrationNo").escape(),
	sanitizeBody("dateOfRegistration").escape(),
	sanitizeBody("dateOfOnBoarding").escape(),
	sanitizeBody("country").escape(),
	sanitizeBody("state").escape(),
	sanitizeBody("district").escape(),
	sanitizeBody("address").escape(),
	sanitizeBody("photo").escape(),
	
	(req, res) => { 

		console.log("===============================================>",req.body);
			
		try {
			// Imgupload(req,res);
			// let dataObj = {}

			// if(req.files['image']){ 
			// const profileImage =req.files['image'][0].path; 
			// dataObj.image = profileImage; 
			// }
		
			// if(req.files['client_logo']){
			// const bannerImage = req.files['client_logo'][0].path;  
			// dataObj.client_logo = bannerImage; 
			// }

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
					
					var ID=utility.uID();
					
					var ngoLoginId=req.body.userId;
					
					var recNGO={
							ngoId: ID,
							name: req.body.ngoName,
							owner:req.body.ownerName,
							mobile: req.body.mobileNo,
							email: req.body.email,
							ngoLoginId: ngoLoginId,
							javixid:ngoLoginId,
								

					};
					var actionNGO=new NGOModel.NGO(recNGO);
					console.log(actionNGO);
					actionNGO.save(function(_error)
					{
						if(_error){ apiResponse.ErrorResponse(res, "Sorry:"+_error);}
						else
						{
								var iID=utility.uID();
								var recDetails = {
									ngoDetailId: iID,
									ngoRegistrationNo: req.body.ngoRegistrationNo,
									dateOfRegistration:req.body.dateOfRegistration,
									dateOfOnBoarding: req.body.dateOfOnBoarding,
									availabilityId: 0,
									country: req.body.country,
									state: req.body.state,
									district: req.body.district,
									address: req.body.address,
									isDefault: false,
									rating : 0,
									ngoId: ID,
									photo: req.body.photo,
							// 		image:dataObj.image,
							// client_logo:dataObj.client_logo,

								};
								var actionNGODetails=new NGOModel.NGODetails(recDetails);
								
								actionNGODetails.save(function(_ierror)
								{
									if(_ierror){ apiResponse.ErrorResponse(res, "Sorry:"+_ierror);}
									else
									{
										return apiResponse.successResponseWithData(res,"NGO added Successfully");
									}
								});
						}
					}
					);
					
			}
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(res,err);
		}
	}];

exports.updateNGO = [
   
    body("userId").isLength({ min: 3 }).trim().withMessage("Invalid Credential!"),
	body("roleId").isLength({ min: 1 }).trim().withMessage("Enter Role Id!"),
	body("token").isLength({ min: 3 }).trim().withMessage("Invalid Token!"),
	body("ngoName").isLength({ min: 3 }).trim().withMessage("Enter NGO Name!"),
	body("ownerName").isLength({ min: 3 }).trim().withMessage("Enter NGO Owner Name!"),
	body("mobileNo").isLength({ min: 10,max:10 }).trim().withMessage("Mobile no can't be empty!")
					.isNumeric().withMessage("Mobile no must be 10 digits!"),
	body("email").isLength({ min: 3 }).trim().withMessage("Enter email")
				  .isEmail().withMessage("Email must be a valid email address."),
	
	
	sanitizeBody("userId").escape(),
	sanitizeBody("roleId").escape(),
	sanitizeBody("ngoName").escape(),
	sanitizeBody("ownerName").escape(),
	sanitizeBody("mobileNo").escape(),
	sanitizeBody("email").escape(),
	
	
	(req, res) => { 
			
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
											var updateRecBy={ ngoLoginId:req.body.userId };
											
											var rec= {
														name: req.body.ngoName,
														owner:req.body.ownerName,
														mobile: req.body.mobileNo,
														email: req.body.email
														
													  } ;
										    
											var RequestUpdatesSchema = {
													recId:utility.uID(),
													userId:req.body.userId,
													updateQuery:JSON.stringify(rec),
													by:JSON.stringify(updateRecBy),
													roleId:parseInt(req.body.roleId)
												
												};
					var actionInsert=new RequestChangeModel.RequestUpdates(RequestUpdatesSchema);
								actionInsert.save(function(_ierror)
								{
									if(_ierror){ apiResponse.ErrorResponse(res, "Sorry:"+_ierror);}
									else
									{
										return apiResponse.successResponseWithData(res,"Successfully Submitted");
									}
								});
								
					
			
					
			}
		} catch (err) {
			
			return apiResponse.ErrorResponse(res,"EXp:"+err);
		}
	}];

exports.updateNGODetails = [
   
    body("userId").isLength({ min: 3 }).trim().withMessage("Invalid Credential!"),
	body("ngoId").isLength({ min: 3 }).trim().withMessage("Invalid NGO ID !"),
	body("token").isLength({ min: 3 }).trim().withMessage("Invalid Token!"),
	
	body("ngoRegistrationNo").isLength({ min: 3 }).trim().withMessage("Enter NGO Registration No!"),	
	body("dateOfRegistration").isLength({ min: 10, max:10 }).trim().withMessage("Enter NGO Registration Date format 'yyyy-mm-dd' !").custom((value) => {
			return utility.isDate(value);
		}).withMessage("Enter NGO Registration Date format 'yyyy-mm-dd' !"),								
	body("dateOfOnBoarding").isLength({ min: 10, max:10 }).trim().withMessage("Enter Onboarding Date format 'yyyy-mm-dd' !").custom((value) => {
			return utility.isDate(value);
		}).withMessage("Enter Onboarding Date format 'yyyy-mm-dd' !"),	
	body("country").isLength({ min: 3 }).trim().withMessage("Enter Country !").isAlpha().withMessage("Country name must not contain number !"),	
	body("state").isLength({ min: 3 }).trim().withMessage("Enter State !"),	
	body("district").isLength({ min: 3 }).trim().withMessage("Enter District !"),	
	body("address").isLength({ min: 3 }).trim().withMessage("Enter Address !"),	
	
	sanitizeBody("userId").escape(),
	sanitizeBody("ngoId").escape(),
	sanitizeBody("ngoRegistrationNo").escape(),
	sanitizeBody("dateOfRegistration").escape(),
	sanitizeBody("dateOfOnBoarding").escape(),
	sanitizeBody("country").escape(),
	sanitizeBody("state").escape(),
	sanitizeBody("district").escape(),
	sanitizeBody("address").escape(),
	sanitizeBody("photo").escape(),

	
	(req, res) => { 
			
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
					
					var updateRecBy={ ngoId:req.body.ngoId };
					var rec= {
								ngoRegistrationNo: req.body.ngoRegistrationNo,
								dateOfRegistration:req.body.dateOfRegistration,
								dateOfOnBoarding: req.body.dateOfOnBoarding,
								country: req.body.country,
								state: req.body.state,
								district: req.body.district,
								address: req.body.address,
								photo: req.body.photo
							} ;
					var RequestUpdatesSchema = {
													recId:utility.uID(),
													userId:req.body.userId,
													updateQuery:JSON.stringify(rec),
													by:JSON.stringify(updateRecBy),
													roleId:parseInt(req.body.roleId)
												
												};
					var actionInsert=new RequestChangeModel.RequestUpdates(RequestUpdatesSchema);
								actionInsert.save(function(_ierror)
								{
									if(_ierror){ apiResponse.ErrorResponse(res, "Sorry:"+_ierror);}
									else
									{
															
										return apiResponse.successResponseWithData(res,"Successfully Submitted");
									}
								});		
							
							
				}
		} catch (err) {
			
			return apiResponse.ErrorResponse(res,"EXp:"+err);
		}
	}];
exports.updateNGOFinal = [
   
    body("userId").isLength({ min: 3 }).trim().withMessage("Invalid Credential!"),
	body("token").isLength({ min: 3 }).trim().withMessage("Invalid Token!"),
	body("recId").isLength({ min: 3 }).trim().withMessage("Enter Rec Id!"),
	
	sanitizeBody("userId").escape(),
	sanitizeBody("recId").escape(),
	
	
	
	(req, res) => { 
			
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
					
					
					RequestChangeModel.RequestUpdates.findOne({recId:req.body.recId}).then(rec => {
					if(rec)
					{
								var updateBy=JSON.parse(rec.by); 
								var updateQuery=JSON.parse(rec.updateQuery);
								console.dir(updateBy);
								console.dir(updateQuery);
								
								
								NGOModel.NGO.findOneAndUpdate(
														updateBy,
														{$set: updateQuery
														},
														
														{new: true},
															function(_error,newrecs)
															{
															if(_error) {return  apiResponse.ErrorResponse(res, "Sorry:"+_error);}
															else if(newrecs!=null) { 
																// update status of request update model
																RequestChangeModel.RequestUpdates.findOneAndUpdate(
																				{recId:req.body.recId},
																				{$set: {_status:"1"}
																				},
																				
																				{new: true},
																					function(_error,newrecs)
																					{
																					}
																);
																// end 
															
															return apiResponse.successResponseWithData(res,"Success",newrecs);}
															else {return  apiResponse.ErrorResponse(res, "Record Not Found");}
															
															
															}
								);
					}
					else  	return apiResponse.unauthorizedResponse(res, "Request Not Found");
					});
			}
		} catch (err) {
			
			return apiResponse.ErrorResponse(res,"EXp:"+err);
		}
	}];
	
exports.updateNGODetailsFinal = [
   
   body("userId").isLength({ min: 3 }).trim().withMessage("Invalid Credential!"),
   body("token").isLength({ min: 3 }).trim().withMessage("Invalid Token!"),
   body("recId").isLength({ min: 3 }).trim().withMessage("Enter Rec Id!"),
	
	sanitizeBody("userId").escape(),
	sanitizeBody("recId").escape(),
	
	
	
	(req, res) => { 
			
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
					
					
					RequestChangeModel.RequestUpdates.findOne({recId:req.body.recId}).then(rec => {
					if(rec)
					{
								var updateBy=JSON.parse(rec.by); 
								var updateQuery=JSON.parse(rec.updateQuery);
								console.dir(updateBy);
								console.dir(updateQuery);
								
								
								NGOModel.NGODetails.findOneAndUpdate(
														updateBy,
														{$set: updateQuery
														},
														
														{new: true},
															function(_error,newrecs)
															{
															if(_error) {return  apiResponse.ErrorResponse(res, "Sorry:"+_error);}
															else if(newrecs!=null) { 
																// update status of request update model
																RequestChangeModel.RequestUpdates.findOneAndUpdate(
																				{recId:req.body.recId},
																				{$set: {_status:"1"}
																				},
																				
																				{new: true},
																					function(_error,newrecs)
																					{
																					}
																);
																// end
															
															return apiResponse.successResponseWithData(res,"Success",newrecs);}
															else {return  apiResponse.ErrorResponse(res, "Record Not Found");}
															}
								);
					}
					else  	return apiResponse.unauthorizedResponse(res, "Request Not Found");
					});
			}
		} catch (err) {
			
			return apiResponse.ErrorResponse(res,"EXp:"+err);
		}
	}];


exports.ngoRequestUpdateList=[
    (req, res) => { 
			
		try {
			RequestChangeModel.RequestUpdates.find({}
				).then(users => {
					
					
					if (user) {
							return apiResponse.successResponseWithData(res,"Found", users);
					}
					else return apiResponse.ErrorResponse(res,"Not Found");
					
				});
		} catch (err) {
			
			return apiResponse.ErrorResponse(res,"EXp:"+err);
		}
	}

];



