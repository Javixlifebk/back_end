const ScreenerModel = require("../models/ScreenerModel");
const UserModel = require("../models/UserModel");
const RequestChangeModel = require("../models/RequestChangeModel");
const { body,query,validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");
const utility = require("../helpers/utility");
const jwt = require("jsonwebtoken");
const { constants } = require("../helpers/constants");


exports.addProfile = [
    
	body("userId").isLength({ min: 3 }).trim().withMessage("Invalid Screener Login Id!"),
	body("token").isLength({ min: 3 }).trim().withMessage("Invalid Token!"),
	body("firstName").isLength({ min: 3 }).trim().withMessage("Enter First Name!"),
	body("lastName").isLength({ min: 3 }).trim().withMessage("Enter Last Name!"),
	body("sex").isLength({ min: 3 }).trim().withMessage("Enter Sex!"),
	body("mobileNo")
					.custom((value) => {
						
						if(value!=null && value!="" && value!=undefined){
						if(value.length!=10 || value[0]==='0' || isNaN(value)){
						return Promise.reject("Mobile no. should have 10 digits with no preceeding zero!");
					}
				}
			
			return ScreenerModel.Screener.findOne({'$or':[{mobile : value},{mobile1 : value}]}).then((user) => {
				if(value!=null && value!="" && value!=undefined){
					
				if (user) {
					return Promise.reject("Mobile No already in use");
				}
			}
			});
		}),

	body("mobileNo1")
					.custom((value) => {
						
						if(value!=null && value!="" && value!=undefined){
						if(value.length!=10 || value[0]==='0' || isNaN(value)){
						return Promise.reject("Mobile no 1. should have 10 digits with no preceeding zero!");
					}
				}
			
			return ScreenerModel.Screener.findOne({'$or':[{mobile : value},{mobile1 : value}]}).then((user) => {
				if(value!=null && value!="" && value!=undefined){
					
				if (user) {
					return Promise.reject("Mobile No 1 already in use");
				}
			}
			});
		}),
	body("email").isLength({ min: 3 }).trim().withMessage("Enter email")
				  .isEmail().withMessage("Email must be a valid email address.").custom((value) => {
			return ScreenerModel.Screener.findOne({email : value}).then((user) => {
				if (user) {
					return Promise.reject("E-mail already in use");
				}
			});
		}),
	
	// body("dateOfBirth").isLength({ min: 10, max:10 }).trim().withMessage("Enter Date of birth format 'yyyy-mm-dd' !").custom((value) => {
	// 		return utility.isDate(value);
	// 	}),
	// body("dateOfOnBoarding").isLength({ min: 10, max:10 }).trim().withMessage("Enter Onboarding Date format 'yyyy-mm-dd' !").custom((value) => {
	// 		return utility.isDate(value);
	// 	}).withMessage("Enter Onboarding Date format 'yyyy-mm-dd' !"),
	body("qualification").isLength({ min: 2 }).trim().withMessage("Enter Qualification !"),	
	body("specialisation").isLength({ min: 2 }).trim().withMessage("Enter Specialization !"),
	
	body("country").isLength({ min: 2 }).trim().withMessage("Enter Country !").isAlpha().withMessage("Country name must not contain number !"),	
	body("state").isLength({ min: 2 }).trim().withMessage("Enter State !"),	
	body("district").isLength({ min: 2 }).trim().withMessage("Enter District !"),	
	body("address").isLength({ min: 3 }).trim().withMessage("Enter Address !"),	
	
	sanitizeBody("userId").escape(),
	sanitizeBody("ngoName").escape(),
	sanitizeBody("firstName").escape(),
	sanitizeBody("lastName").escape(),
	sanitizeBody("sex").escape(),
	sanitizeBody("mobileNo").escape(),
	sanitizeBody("mobileNo1").escape(),
	sanitizeBody("email").escape(),
	sanitizeBody("parentId").escape(),
	
	sanitizeBody("dateOfBirth").escape(),
	sanitizeBody("dateOfOnBoarding").escape(),
	sanitizeBody("qualification").escape(),
	sanitizeBody("specialisation").escape(),
	sanitizeBody("country").escape(),
	sanitizeBody("state").escape(),
	sanitizeBody("district").escape(),
	sanitizeBody("address").escape(),
	sanitizeBody("pincode").escape(),
	sanitizeBody("photo").escape(),
	
	(req, res) => { 
			
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {

				var issubscreener=0; 
					UserModel.findOne({email : req.body.email}).then((user) => {
				
					if(user && parseInt(user.roleId)===21 )
					issubscreener=1;
				
				
				    var dobEscape=req.body.dateOfBirth.replace(/-/g, ''); 
					var ngoRowNo="00";
					var randThree=utility.randomNumber(3);
					var javixId=req.body.state+"/"+req.body.district.substring(0, 2)+"/"+ngoRowNo+"/"+req.body.firstName.substring(0, 1)+""+req.body.lastName.substring(0, 1)+""+dobEscape+"/"+randThree;
					var ID=utility.uID();
					
					var userId=req.body.userId;
					var recScreener={
							screenerId:ID,
							firstName:req.body.firstName,
							lastName: req.body.lastName,
							sex: req.body.sex,
							mobile:req.body.mobileNo,
							mobile1:req.body.mobileNo1,
							email:req.body.email,
							javixId:javixId,
							screenerLoginId:userId,
							ngoId:req.body.ngoId,
							parentId:req.body.parentId,
							isdeleted:false,
							issubscreener:issubscreener
					};
					var actionScreener=new ScreenerModel.Screener(recScreener);
					actionScreener.save(function(_error)
					{
						if(_error){ apiResponse.ErrorResponse(res, "Sorry:"+_error);}
						else
						{
								var iID=utility.uID();
								var recDetails = {
									screenerDetailId: iID,
									dateOfBirth: req.body.dateOfBirth,
									dateOfOnBoarding:req.body.dateOfOnBoarding ,
									qualification:req.body.qualification ,
									specialisation:req.body.specialisation ,
									country:req.body.country  ,
									state:req.body.state  ,
									district:req.body.district  ,
									address: req.body.address ,
									pincode:req.body.pincode,
									photo:req.body.photo,
									rating : 0,
									ngoId:req.body.ngoId,
									isdeleted:false,
									screenerId: ID
								};
								var actionScreeerDetails=new ScreenerModel.ScreenerDetails(recDetails);
								actionScreeerDetails.save(function(_ierror)
								{
									if(_ierror){ apiResponse.ErrorResponse(res, "Sorry:"+_ierror);}
									else
									{
										return apiResponse.successResponseWithData(res,"added screener Successfully ");
									}
								});
						}
					}
					);
					});
					
			}
		} catch (err) {
			
			return apiResponse.ErrorResponse(res,err);
		}
	}];

// exports.addProfile = [
    
// 	body("userId").isLength({ min: 3 }).trim().withMessage("Invalid Screener Login Id!"),
// 	body("token").isLength({ min: 3 }).trim().withMessage("Invalid Token!"),
// 	body("firstName").isLength({ min: 3 }).trim().withMessage("Enter First Name!"),
// 	body("lastName").isLength({ min: 3 }).trim().withMessage("Enter Last Name!"),
// 	body("sex").isLength({ min: 3 }).trim().withMessage("Enter Sex!"),
// 	body("mobileNo")
// 					.custom((value) => {
						
// 						if(value!=null && value!="" && value!=undefined){
// 						if(value.length!=10 || value[0]==='0' || isNaN(value)){
// 						return Promise.reject("Mobile no. should have 10 digits with no preceeding zero!");
// 					}
// 				}
			
// 			return ScreenerModel.Screener.findOne({'$or':[{mobile : value},{mobile1 : value}]}).then((user) => {
// 				if(value!=null && value!="" && value!=undefined){
					
// 				if (user) {
// 					return Promise.reject("Mobile No already in use");
// 				}
// 			}
// 			});
// 		}),

// 	body("mobileNo1")
// 					.custom((value) => {
						
// 						if(value!=null && value!="" && value!=undefined){
// 						if(value.length!=10 || value[0]==='0' || isNaN(value)){
// 						return Promise.reject("Mobile no 1. should have 10 digits with no preceeding zero!");
// 					}
// 				}
			
// 			return ScreenerModel.Screener.findOne({'$or':[{mobile : value},{mobile1 : value}]}).then((user) => {
// 				if(value!=null && value!="" && value!=undefined){
					
// 				if (user) {
// 					return Promise.reject("Mobile No 1 already in use");
// 				}
// 			}
// 			});
// 		}),
// 	body("email").isLength({ min: 3 }).trim().withMessage("Enter email")
// 				  .isEmail().withMessage("Email must be a valid email address.").custom((value) => {
// 			return ScreenerModel.Screener.findOne({email : value}).then((user) => {
// 				if (user) {
// 					return Promise.reject("E-mail already in use");
// 				}
// 			});
// 		}),
	
// 	// body("dateOfBirth").isLength({ min: 10, max:10 }).trim().withMessage("Enter Date of birth format 'yyyy-mm-dd' !").custom((value) => {
// 	// 		return utility.isDate(value);
// 	// 	}),
// 	// body("dateOfOnBoarding").isLength({ min: 10, max:10 }).trim().withMessage("Enter Onboarding Date format 'yyyy-mm-dd' !").custom((value) => {
// 	// 		return utility.isDate(value);
// 		// }).withMessage("Enter Onboarding Date format 'yyyy-mm-dd' !"),
// 	body("qualification").isLength({ min: 2 }).trim().withMessage("Enter Qualification !"),	
// 	body("specialisation").isLength({ min: 2 }).trim().withMessage("Enter Specialization !"),
	
// 	body("country").isLength({ min: 2 }).trim().withMessage("Enter Country !").isAlpha().withMessage("Country name must not contain number !"),	
// 	body("state").isLength({ min: 2 }).trim().withMessage("Enter State !"),	
// 	body("district").isLength({ min: 2 }).trim().withMessage("Enter District !"),	
// 	body("address").isLength({ min: 3 }).trim().withMessage("Enter Address !"),	
	
// 	sanitizeBody("userId").escape(),
// 	sanitizeBody("ngoName").escape(),
// 	sanitizeBody("firstName").escape(),
// 	sanitizeBody("lastName").escape(),
// 	sanitizeBody("sex").escape(),
// 	sanitizeBody("mobileNo").escape(),
// 	sanitizeBody("mobileNo1").escape(),
// 	sanitizeBody("email").escape(),
// 	sanitizeBody("parentId").escape(),
	
// 	sanitizeBody("dateOfBirth").escape(),
// 	sanitizeBody("dateOfOnBoarding").escape(),
// 	sanitizeBody("qualification").escape(),
// 	sanitizeBody("specialisation").escape(),
// 	sanitizeBody("country").escape(),
// 	sanitizeBody("state").escape(),
// 	sanitizeBody("district").escape(),
// 	sanitizeBody("address").escape(),
// 	sanitizeBody("pincode").escape(),
// 	sanitizeBody("photo").escape(),
	
// 	(req, res) => { 
			
// 		try {
// 			const errors = validationResult(req);
// 			if (!errors.isEmpty()) {
// 				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
// 			}else {

// 				    var issubscreener=0; 
// 					UserModel.findOne({email : req.body.email}).then((user) => {
				
// 					if(user && parseInt(user.roleId)===21 )
// 					issubscreener=1;
				
				
// 				    var dobEscape=req.body.dateOfBirth.replace(/-/g, ''); 
// 					var ngoRowNo="00";
// 					var randThree=utility.randomNumber(3);
// 					var javixId=req.body.state+"/"+req.body.district.substring(0, 2)+"/"+ngoRowNo+"/"+req.body.firstName.substring(0, 1)+""+req.body.lastName.substring(0, 1)+""+dobEscape+"/"+randThree;
// 					var ID=utility.uID();
					
// 					var userId=req.body.userId;
// 					var recScreener={
// 							screenerId:ID,
// 							firstName:req.body.firstName,
// 							lastName: req.body.lastName,
// 							sex: req.body.sex,
// 							mobile:req.body.mobileNo,
// 							mobile1:req.body.mobileNo1,
// 							email:req.body.email,
// 							javixId:javixId,
// 							screenerLoginId:userId,
// 							ngoId :req.body.ngoId,
// 							parentId:req.body.parentId,
// 							isdeleted:false,
// 							issubscreener:issubscreener
// 					};
// 					var actionScreener=new ScreenerModel.Screener(recScreener);
// 					actionScreener.save(function(_error)
// 					{
// 						if(_error){ apiResponse.ErrorResponse(res, "Sorry:"+_error);}
// 						else
// 						{
// 								var iID=utility.uID();
// 								var recDetails = {
// 									screenerDetailId: iID,
// 									dateOfBirth: req.body.dateOfBirth,
// 									dateOfOnBoarding:req.body.dateOfOnBoarding ,
// 									qualification:req.body.qualification ,
// 									specialisation:req.body.specialisation ,
// 									country:req.body.country  ,
// 									state:req.body.state  ,
// 									district:req.body.district  ,
// 									address: req.body.address ,
// 									pincode:req.body.pincode,
// 									photo:req.body.photo,
// 									rating : 0,
// 									screenerId: ID,
// 									isdeleted:false,
// 									ngoId :req.body.ngoId,
// 								};
// 								var actionScreeerDetails=new ScreenerModel.ScreenerDetails(recDetails);
// 								actionScreeerDetails.save(function(_ierror)
// 								{
// 									if(_ierror){ apiResponse.ErrorResponse(res, "Sorry:"+_ierror);}
// 									else
// 									{
// 										return apiResponse.successResponseWithData(res,"Successfully Submitted");
// 									}
// 								});
// 						}
// 					}
// 					);
// 					});
					
// 			}
// 		} catch (err) {
			
// 			return apiResponse.ErrorResponse(res,err);
// 		}
// 	}];

	
exports.updateScreener = [
   
    body("screenerId").isLength({ min: 3 }).trim().withMessage("Invalid screenerId!").custom((value) => {
			return ScreenerModel.Screener.findOne({screenerId : value}).then((user) => {
				if (user) {}
				else return Promise.reject("Invalid screener id");
			});
		}),
		
	body("email").isLength({ min: 3 }).trim().withMessage("Enter email")
				  .isEmail().withMessage("Email must be a valid email address.").custom((value) => {
			return ScreenerModel.Screener.findOne({email : value}).then((user) => {
				if (user) {}
				else return Promise.reject("Invalid Email Address");
			});
		}),
	body("token").isLength({ min: 3 }).trim().withMessage("Invalid Token!"),
	body("firstName").isLength({ min: 3 }).trim().withMessage("Enter First Name!"),
	body("lastName").isLength({ min: 3 }).trim().withMessage("Enter Last Name!"),
	body("sex").isLength({ min: 3 }).trim().withMessage("Enter Sex!"),
	body("mobileNo")
					.custom((value) => {
						
						if(value!=null && value!="" && value!=undefined){
						if(value.length!=10 || value[0]==='0' || isNaN(value)){
						return Promise.reject("Mobile no. should have 10 digits with no preceeding zero!");
					}
				}
			
			return ScreenerModel.Screener.findOne({'$or':[{mobile : value},{mobile1 : value}]}).then((user) => {
				if(value!=null && value!="" && value!=undefined){
					
				if (user) {
					return Promise.reject("Mobile No already in use");
				}
			}
			});
		}),

	body("mobileNo1")
					.custom((value) => {
						
						if(value!=null && value!="" && value!=undefined){
						if(value.length!=10 || value[0]==='0' || isNaN(value)){
						return Promise.reject("Mobile no 1. should have 10 digits with no preceeding zero!");
					}
				}
			
			return ScreenerModel.Screener.findOne({'$or':[{mobile : value},{mobile1 : value}]}).then((user) => {
				if(value!=null && value!="" && value!=undefined){
					
				if (user) {
					return Promise.reject("Mobile No 1 already in use");
				}
			}
			});
		}),
	
	
	sanitizeBody("screenerId").escape(),
	sanitizeBody("firstName").escape(),
	sanitizeBody("lastName").escape(),
	sanitizeBody("sex").escape(),
	sanitizeBody("mobileNo").escape(),
	sanitizeBody("mobileNo1").escape(),
	sanitizeBody("email").escape(),
	
	(req, res) => { 
			
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
					
					var updateRecBy={ screenerId:req.body.screenerId};
						var rec= {
														firstName:req.body.firstName,
														lastName: req.body.lastName,
														sex: req.body.sex,
														mobile:req.body.mobileNo,
														mobile1:req.body.mobileNo1
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

exports.updateScreenerDetails = [
    body("screenerId").isLength({ min: 3 }).trim().withMessage("Invalid screener Id!"),
    body("dateOfBirth").isLength({ min: 10, max:10 }).trim().withMessage("Enter Date of birth format 'yyyy-mm-dd' !").custom((value) => {
			return utility.isDate(value);
		}),
	body("dateOfOnBoarding").isLength({ min: 10, max:10 }).trim().withMessage("Enter Onboarding Date format 'yyyy-mm-dd' !").custom((value) => {
			return utility.isDate(value);
		}).withMessage("Enter Onboarding Date format 'yyyy-mm-dd' !"),
	body("qualification").isLength({ min: 2 }).trim().withMessage("Enter Qualification !"),	
	body("specialisation").isLength({ min: 2 }).trim().withMessage("Enter Specialization !"),
	
	body("country").isLength({ min: 2 }).trim().withMessage("Enter Country !").isAlpha().withMessage("Country name must not contain number !"),	
	body("state").isLength({ min: 2 }).trim().withMessage("Enter State !"),	
	body("district").isLength({ min: 2 }).trim().withMessage("Enter District !"),	
	body("address").isLength({ min: 3 }).trim().withMessage("Enter Address !"),

	sanitizeBody("screenerId").escape(),
	sanitizeBody("dateOfBirth").escape(),
	sanitizeBody("dateOfOnBoarding").escape(),
	sanitizeBody("qualification").escape(),
	sanitizeBody("specialisation").escape(),
	sanitizeBody("country").escape(),
	sanitizeBody("state").escape(),
	sanitizeBody("district").escape(),
	sanitizeBody("address").escape(),
	sanitizeBody("pincode").escape(),
	sanitizeBody("photo").escape(),
	
	(req, res) => { 
			
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
					var updateRecBy={ screenerId:req.body.screenerId};
						var rec= {
													
														
														dateOfBirth: req.body.dateOfBirth,
														dateOfOnBoarding:req.body.dateOfOnBoarding ,
														qualification:req.body.qualification ,
														specialisation:req.body.specialisation ,
														country:req.body.country  ,
														state:req.body.state  ,
														district:req.body.district  ,
														address: req.body.address ,
														pincode:req.body.pincode,
														photo:req.body.photo
														
																	
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
	
exports.updateScreenerNgoId = [
   
    body("screenerId").isLength({ min: 3 }).trim().withMessage("Invalid screenerId!").custom((value) => {
			return ScreenerModel.Screener.findOne({screenerId : value}).then((user) => {
				if (user) {}
				else return Promise.reject("Invalid screener id");
			});
		}),	
	body("token").isLength({ min: 3 }).trim().withMessage("Invalid Token!"),
	body("ngoId").isLength({ min: 1 }).trim().withMessage("Enter Ngo Id!"),
	// body("issubscreener").isLength({ min: 1 }).trim().withMessage("Enter issubscreener!"),
	
	sanitizeBody("screenerId").escape(),
	// sanitizeBody("issubscreener").escape(),

	sanitizeBody("ngoId").escape(),
	
	(req, res) => { 
			
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
					
					
					var screenerId=req.body.screenerId;
					ScreenerModel.Screener.findOneAndUpdate(
											{ screenerId:screenerId },
											{$set: {
														ngoId:req.body.ngoId,
														// ismapped:req.body.ismapped
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

	exports.updateScreenerSevika = [
   
    body("screenerId").isLength({ min: 3 }).trim().withMessage("Invalid screenerId!").custom((value) => {
			return ScreenerModel.Screener.findOne({screenerId : value}).then((user) => {
				if (user) {}
				else return Promise.reject("Invalid screener id");
			});
		}),	
	body("token").isLength({ min: 3 }).trim().withMessage("Invalid Token!"),
	body("sevikaId").isLength({ min: 3 }).trim().withMessage("Invalid Sevika Id!").custom((value) => {
			return ScreenerModel.Screener.findOne({screenerId : value}).then((user) => {
				if (user) {}
				else return Promise.reject("Invalid screener/Sevika id");
			});
		}),	
	
	sanitizeBody("screenerId").escape(),
	sanitizeBody("sevikaId").escape(),
	
	(req, res) => { 
			
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
					
					
					var screenerId=req.body.screenerId;
					ScreenerModel.Screener.findOneAndUpdate(
											{ screenerId:screenerId },
											{$set: {
														parentId:req.body.sevikaId
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
	
exports.updateScreenerFinal = [
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
								
								
								ScreenerModel.Screener.findOneAndUpdate(
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
	}
   
   ];
	


   
exports.updateScreenerDetailsFinal = [
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
								
								
								ScreenerModel.ScreenerDetails.findOneAndUpdate(
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
	

	//update and add isdeleted variable in screener table
exports.updateandScreener= [
		(req, res) => { 
			
			// let id = req.params.id;
	

			// const annoucement = await Announcements.updateOne(req.body, { where: { id: id }})
		  
			ScreenerModel.Screener.update({},{$set : {"isdeleted": false}}, {upsert:false, multi:true})

		  
			  .then((note) => {
				if (!note) {
				  return res.status(404).send({
					message: "data not found with id " + req.params.id,
				  });
				}
				res.send(note);
			  })
			  .catch((err) => {
			  
				if (err.kind === "ObjectId") {
				  return res.status(404).send({
					message: "data not found with id ",
				  });
				}
				return res.status(500).send({
				  message: "Error updating note with id ",
				});
			  });
			   
		}

						
	
	];


	
exports.updateScreenerDeletedAuth = [
	

	(req, res) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {


				ScreenerModel.Screener.updateMany({ 'screenerId': req.body.screenerId }, { '$set': { 'isdeleted': req.body.isdeleted } }, function (err, resDoc) {
					if (err) {
						return apiResponse.ErrorResponse(res, err);
					}
					else {
						if (resDoc) {

							ScreenerModel.Screener.updateMany({ 'screenerId': req.body.screenerId }, { '$set': { 'isdeleted':req.body.isdeleted } }, function (ierr, iresDoc) {
								if (ierr) {
									return apiResponse.ErrorResponse(res, ierr);
								}
								else {
									if (iresDoc) {

										return apiResponse.successResponse(res, "Updated Successfullly.");
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

			return apiResponse.ErrorResponse(res, "EXp:" + err);
		}
	}];

