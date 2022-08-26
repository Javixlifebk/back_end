const CitizenModel = require("../models/CitizenModel");
const ScreenerModel = require("../models/ScreenerModel");
const DoctorModel = require("../models/DoctorModel");
const NGOModel = require("../models/NGOModel");
const PharmacyModel = require("../models/PharmacyModel");
const UserModel = require("../models/UserModel");
const UserDetailsModel = require("../models/UserDetailsModel");
const { body,query,validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const he = require('he');
//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");
const utility = require("../helpers/utility");
const mailer = require("../helpers/mailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { constants } = require("../helpers/constants");

exports.addProfilePhoto = [
    	
	body("roleId").isLength({ min: 1 }).trim().withMessage("Enter RoleID !"),	
	body("id").isLength({ min: 3 }).trim().withMessage("Enter Actor Id !"),	
	body("photo").isLength({ min: 5}).trim().withMessage("Enter Photo Url !"),	
	
	sanitizeBody("roleId").escape(),
	sanitizeBody("id").escape(),
	sanitizeBody("photo").escape(),

	(req, res) => { 
			
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {

				var photo=req.body.photo;
				photo=he.decode(photo);
					
					if(req.body.roleId==='2'){

						var screenerId=req.body.id;
						ScreenerModel.ScreenerDetails.findOneAndUpdate(
											{ screenerId:screenerId },
											{$set: {
														photo:photo
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

					else if(req.body.roleId==='1'){

						var doctorId=req.body.id;
						DoctorModel.DoctorDetails.findOneAndUpdate(
											{ doctorId:doctorId },
											{$set: {
														photo:photo
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

					else if(req.body.roleId==='3'){

						var ngoId=req.body.id;
						NGOModel.NGODetails.findOneAndUpdate(
											{ ngoId:ngoId },
											{$set: {
														photo:photo
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

					else if(req.body.roleId==='4'){

						var pharmacyId=req.body.id;
						PharmacyModel.PharmacyDetails.findOneAndUpdate(
											{ pharmacyId:pharmacyId },
											{$set: {
														photo:photo
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

					else if(req.body.roleId==='6'){

						var citizenId=req.body.id;
						CitizenModel.CitizenDetails.findOneAndUpdate(
											{ citizenId:citizenId },
											{$set: {
														photo:photo
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
					
			}
		} catch (err) {
			
			return apiResponse.ErrorResponse(res,"EXp:"+err);
		}
	}];