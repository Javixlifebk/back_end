const PharmacyModel = require("../models/PharmacyModel");

const { body,query,validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");
const utility = require("../helpers/utility");
const jwt = require("jsonwebtoken");
const { constants } = require("../helpers/constants");

exports.addPharmacy = [
    
	body("userId").isLength({ min: 3 }).trim().withMessage("Invalid Credential!"),
	body("token").isLength({ min: 3 }).trim().withMessage("Invalid Token!"),
	body("pharmacyName").isLength({ min: 3 }).trim().withMessage("Enter pharmacy Name!"),
	body("ownerName").isLength({ min: 3 }).trim().withMessage("Enter pharmacy Owner Name!"),
	body("mobileNo").isLength({ min: 10,max:10 }).trim().withMessage("Mobile no can't be empty!")
					.isNumeric().withMessage("Mobile no must be 10 digits!"),
	body("email").isLength({ min: 3 }).trim().withMessage("Enter email")
				  .isEmail().withMessage("Email must be a valid email address.").custom((value) => {
			return PharmacyModel.Pharmacy.findOne({email : value}).then((user) => {
				if (user) {
					return Promise.reject("E-mail already in use");
				}
			});
		}),
	
	body("pharmacyRegistrationNo").isLength({ min: 3 }).trim().withMessage("Enter Pharmacy Registration No!"),	
	body("dateOfRegistration").isLength({ min: 10, max:10 }).trim().withMessage("Enter Pharmacy Registration Date format 'yyyy-mm-dd' !").custom((value) => {
			return utility.isDate(value);
		}).withMessage("Enter Pharmacy Registration Date format 'yyyy-mm-dd' !"),								
	body("dateOfOnBoarding").isLength({ min: 10, max:10 }).trim().withMessage("Enter Onboarding Date format 'yyyy-mm-dd' !").custom((value) => {
			return utility.isDate(value);
		}).withMessage("Enter Onboarding Date format 'yyyy-mm-dd' !"),	
	body("country").isLength({ min: 3 }).trim().withMessage("Enter Country !").isAlpha().withMessage("Country name must not contain number !"),	
	body("state").isLength({ min: 3 }).trim().withMessage("Enter State !"),	
	body("district").isLength({ min: 3 }).trim().withMessage("Enter District !"),	
	body("address").isLength({ min: 3 }).trim().withMessage("Enter Address !"),	
	
	sanitizeBody("userId").escape(),
	sanitizeBody("pharmacyName").escape(),
	sanitizeBody("pharmacyName").escape(),
	sanitizeBody("mobileNo").escape(),
	sanitizeBody("email").escape(),
	
	sanitizeBody("pharmacyRegistrationNo").escape(),
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
					
					var ID=utility.uID();
					
					var pharmacyLoginId=req.body.userId;
					
					var recPharmacy={
							pharmacyId: ID,
							name: req.body.pharmacyName,
							owner:req.body.ownerName,
							mobile: req.body.mobileNo,
							email: req.body.email,
							pharmacyRegistrationNumber: req.body.pharmacyRegistrationNo,
							pharmacyLoginId: pharmacyLoginId
					};
					var actionPharmacy=new PharmacyModel.Pharmacy(recPharmacy);
					actionPharmacy.save(function(_error)
					{
						if(_error){ apiResponse.ErrorResponse(res, "Sorry:"+_error);}
						else
						{
								var iID=utility.uID();
								var recDetails = {
									pharmacyDetailId: iID,
									pharmacyRegistrationNo: req.body.pharmacyRegistrationNo,
									dateOfRegistration:req.body.dateOfRegistration,
									dateOfOnBoarding: req.body.dateOfOnBoarding,
									availabilityId: 0,
									country: req.body.country,
									state: req.body.state,
									district: req.body.district,
									address: req.body.address,
									isDefault: false,
									rating : 0,
									pharmacyId: ID,
									photo:req.body.photo
								};
								var actionPharmacyDetails=new PharmacyModel.PharmacyDetails(recDetails);
								actionPharmacyDetails.save(function(_ierror)
								{
									if(_ierror){ apiResponse.ErrorResponse(res, "Sorry:"+_ierror);}
									else
									{
										return apiResponse.successResponseWithData(res,"Successfully Submitted");
									}
								});
						}
					}
					);
					
			}
		} catch (err) {
			
			return apiResponse.ErrorResponse(res,err);
		}
	}];

exports.updatePharmacy = [
   
    body("userId").isLength({ min: 3 }).trim().withMessage("Invalid Credential!"),
	body("token").isLength({ min: 3 }).trim().withMessage("Invalid Token!"),
	body("pharmacyName").isLength({ min: 3 }).trim().withMessage("Enter Pharmacy Name!"),
	body("ownerName").isLength({ min: 3 }).trim().withMessage("Enter Pharmacy Owner Name!"),
	body("mobileNo").isLength({ min: 10,max:10 }).trim().withMessage("Mobile no can't be empty!")
					.isNumeric().withMessage("Mobile no must be 10 digits!"),
	body("pharmacyRegistrationNo").isLength({ min: 3 }).trim().withMessage("Enter Pharmacy Registration No!"),
	body("email").isLength({ min: 3 }).trim().withMessage("Enter email")
				  .isEmail().withMessage("Email must be a valid email address."),
	
	
	sanitizeBody("userId").escape(),
	sanitizeBody("pharmacyName").escape(),
	sanitizeBody("ownerName").escape(),
	sanitizeBody("mobileNo").escape(),
	sanitizeBody("email").escape(),
	sanitizeBody("pharmacyRegistrationNo").escape(),

	
	
	(req, res) => { 
			
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
					
					
					var pharmacyLoginId=req.body.userId;
					
					PharmacyModel.Pharmacy.findOneAndUpdate(
											{ pharmacyLoginId:pharmacyLoginId },
											{$set: {
														name: req.body.pharmacyName,
														owner:req.body.ownerName,
														mobile: req.body.mobileNo,
														email: req.body.email,
														pharmacyRegistrationNumber: req.body.pharmacyRegistrationNo
													  } 
										    },
											
											{new: true},
												function(_error,newrecs)
												{
												if(_error) {return  apiResponse.ErrorResponse(res, "Sorry:"+_error);}
												else if(newrecs!=null) { return apiResponse.successResponseWithData(res,"Success",newrecs);}
												else {return  apiResponse.ErrorResponse(res, "Not Found");}
												}
					);
					
			}
		} catch (err) {
			
			return apiResponse.ErrorResponse(res,"EXp:"+err);
		}
	}];

exports.updatePharmacyDetails = [
   
    body("userId").isLength({ min: 3 }).trim().withMessage("Invalid Credential!"),
	body("pharmacyId").isLength({ min: 3 }).trim().withMessage("Invalid Pharmacy ID !"),
	body("token").isLength({ min: 3 }).trim().withMessage("Invalid Token!"),
	
	body("pharmacyRegistrationNo").isLength({ min: 3 }).trim().withMessage("Enter Pharmacy Registration No!"),	
	body("dateOfRegistration").isLength({ min: 10, max:10 }).trim().withMessage("Enter Pharmacy Registration Date format 'yyyy-mm-dd' !").custom((value) => {
			return utility.isDate(value);
		}).withMessage("Enter Pharmacy Registration Date format 'yyyy-mm-dd' !"),								
	body("dateOfOnBoarding").isLength({ min: 10, max:10 }).trim().withMessage("Enter Onboarding Date format 'yyyy-mm-dd' !").custom((value) => {
			return utility.isDate(value);
		}).withMessage("Enter Onboarding Date format 'yyyy-mm-dd' !"),	
	body("country").isLength({ min: 3 }).trim().withMessage("Enter Country !").isAlpha().withMessage("Country name must not contain number !"),	
	body("state").isLength({ min: 3 }).trim().withMessage("Enter State !"),	
	body("district").isLength({ min: 3 }).trim().withMessage("Enter District !"),	
	body("address").isLength({ min: 3 }).trim().withMessage("Enter Address !"),	
	
	sanitizeBody("userId").escape(),
	sanitizeBody("pharmacyId").escape(),
	sanitizeBody("pharmacyRegistrationNo").escape(),
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
					
					
					var pharmacyId=req.body.pharmacyId;
					
					PharmacyModel.PharmacyDetails.findOneAndUpdate(
											{ pharmacyId:pharmacyId },
											{$set: {
													
														pharmacyRegistrationNo: req.body.pharmacyRegistrationNo,
														dateOfRegistration:req.body.dateOfRegistration,
														dateOfOnBoarding: req.body.dateOfOnBoarding,
														country: req.body.country,
														state: req.body.state,
														district: req.body.district,
														address: req.body.address,
														photo: req.body.photo
																	
													  } 
										    },
											
											{new: true},
												function(_error,newrecs)
												{
												if(_error) {return  apiResponse.ErrorResponse(res, "Sorry:"+_error);}
												else if(newrecs!=null) { return apiResponse.successResponseWithData(res,"Success",newrecs);}
												else {return  apiResponse.ErrorResponse(res, "Not Found");}
												}
					);
					
			}
		} catch (err) {
			
			return apiResponse.ErrorResponse(res,"EXp:"+err);
		}
	}];


exports.pharmacyList=[
    (req, res) => { 
			
		try {
			PharmacyModel.Pharmacy.aggregate([
							{'$match':{'pharmacyId':{$ne:"-1"}}},
							{'$limit':100000},
							{'$lookup': {
								'localField':'pharmacyId',
								'from':'pharmacydetails',
								'foreignField':'pharmacyId',
								'as':'info'	
							 }
							},
							
							{'$unwind':'$info'},
							{'$project':{
								 
								 'pharmacyId':1,
								 'name':1,
								 'owner':1,
								 'mobile':1,
								 'email':1,
								 'createdAt':1,
								 'pharmacyLoginId':1,
								 'pharmacyRegistrationNumber':1,
								 'info.dateOfRegistration':1,
								 'info.dateOfOnBoarding':1,
								 'info.availability':1,
								 'info.isDefault':1,
								 'info.rating':1,
								 'info.pharmacyRegistrationNo':1,
								 'info.country':1,
								 'info.state':1,
								 'info.district':1,
								 'info.address':1,
								 'info.photo':1
								 
								}
							}
						]
				).then(users => {
					
					let user=users[0];
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

exports.pharmacyProfile=[
	 //body("pharmacyId").isLength({ min: 1 }).trim().withMessage("Invalid Pharamcy Id Credential!"),
	
	body("token").isLength({ min: 1 }).trim().withMessage("Invalid Token!"),
	sanitizeBody("pharmacyId").escape(),
	sanitizeBody("userId").escape(),
	sanitizeBody("token").escape(),
    (req, res) => { 
			
			try {
			PharmacyModel.Pharmacy.aggregate([
							{'$match':{'$or':[{'pharmacyId':req.body.pharmacyId},{'pharmacyLoginId':req.body.userId}]}},
							{'$limit':100000},
							{'$lookup': {
								'localField':'pharmacyId',
								'from':'pharmacydetails',
								'foreignField':'pharmacyId',
								'as':'info'	
							 }
							},
							{'$unwind':'$info'},
							{'$project':{
								 
								 'pharmacyId':1,
								 'name':1,
								 'owner':1,
								 'mobile':1,
								 'email':1,
								 'createdAt':1,
								 'pharmacyRegistrationNumber':1,
								 'info.dateOfRegistration':1,
								 'info.dateOfOnBoarding':1,
								 'info.availability':1,
								 'info.isDefault':1,
								 'info.rating':1,
								 'info.pharmacyRegistrationNo':1,
								 'info.country':1,
								 'info.state':1,
								 'info.district':1,
								 'info.address':1,
								 'info.photo':1
								 
								}
							}
						]
				).then(users => {
					
					let user=users[0];
					if (user) {
							return apiResponse.successResponseWithData(res,"Found", users);
					}
					else return apiResponse.ErrorResponse(res,"Not Found!.");
					
				});
		} catch (err) {
			
			return apiResponse.ErrorResponse(res,"EXp:"+err);
		}
	}

];