/* ./services/ngo */
const NGOModel = require("../../models/NGOModel");

const { body,query,validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
//helper file to prepare responses.
const apiResponse = require("../../helpers/apiResponse");
const utility = require("../../helpers/utility");
const jwt = require("jsonwebtoken");
const { constants } = require("../../helpers/constants");

exports.ngoList=[
    (req, res) => { 
			
		try {
			NGOModel.NGO.aggregate([
						//  {'$match':{'ngoId':{$ne:"-1"}}},
						 {'$match':{'ngoLoginId':req.body.ngoLoginId}},
							{'$limit':100000},
							{'$lookup': {
								'localField':'ngoId',
								'from':'ngodetails',
								'foreignField':'ngoId',
								'as':'info'	
							 }
							},
							{'$lookup': {
								'localField':'ngoLoginId',
								'from':'logos',
								'foreignField':'ngoId',
								'as':'logo'	
							 }
							},
							{'$unwind':'$info'},
							{'$unwind':'$logo'},
							{'$project':{
								 
								 'ngoId':1,
								 'name':1,
								 'owner':1,
								 'mobile':1,
								 'email':1,
								 'ngoLoginId':1,
								 'createdAt':1,
								 'info.dateOfRegistration':1,
								 'info.dateOfOnBoarding':1,
								 'info.availability':1,
								 'info.isDefault':1,
								 'info.rating':1,
								//  'info.ngoRegistrationNo':1,
								 'ngoRegistrationNo': {$concat: ["'",'info.ngoRegistrationNo',"'"]},
								 'info.country':1,
								 'info.state':1,
								 'info.district':1,
								 'info.address':1,
								 'info.photo':1,
								//  logo1:'$logo.image',
								 
								 logo: {$concat: ["http://",req.headers.host,"/profile/","$logo.image"]},
								 client_logo: {$concat: ["http://",req.headers.host,"/profile/","$logo.client_logo"]},
                                //  http://javixlife.org:3010/profile/
								 
								}
							}
						]
				).then(users => {
					
					let user=users[0];
					if (user) {
						for(var i=0;i<users.length;i++){
							users[i].createdAt=utility.toDDmmyy(users[i].createdAt);
							users[i].info.dateOfOnBoarding=utility.toDDmmyy(users[i].info.dateOfOnBoarding);
							users[i].info.dateOfRegistration=utility.toDDmmyy(users[i].info.dateOfRegistration);
						}
							return apiResponse.successResponseWithData(res,"Found", users);
						
					}
					else return apiResponse.ErrorResponse(res,"Not Found");
					
				});
		} catch (err) {
			
			return apiResponse.ErrorResponse(res,"EXp:"+err);
		}
	}

];

exports.findByNgoId=[
    (req, res) => { 
			
		try {
			NGOModel.NGO.aggregate([
							
							{'$limit':100000},
						
							{'$match':{'ngoLoginId':req.body.ngoLoginId}},
							{'$project':{
								 
								 'ngoId':1,
								 'name':1,
								 'owner':1,
								 'mobile':1,
								 'email':1,
								 'ngoLoginId':1,
								 'createdAt':1,
								
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





// ----------ngoId listing-----------------
exports.allNgoList=[
    (req, res) => { 
			
		try {
			NGOModel.NGO.aggregate([
							// {'$match':{'ngoId':{$ne:"-1"}}},
						
							
							{'$project':{
								 'ngoId':1,
								 'name':1,
								 'owner':1,
								 'mobile':1,
								 'email':1,
								 'ngoLoginId':1,
								 'createdAt':1,

								}
							}
						]
				).then(users => {
					
					// let user=users[0];
					if (users) {
						
							return apiResponse.successResponseWithData(res,"Found", users);
						
					}
					else return apiResponse.ErrorResponse(res,"Not Found");
					
				});
		} catch (err) {
			
			return apiResponse.ErrorResponse(res,"EXp:"+err);
		}
	}

];
exports.ngoProfile=[
	 //body("ngoId").isLength({ min: 1 }).trim().withMessage("Invalid Ngo Id Credential!"),
	
	body("token").isLength({ min: 1 }).trim().withMessage("Invalid Token!"),
	sanitizeBody("ngoId").escape(),
	// sanitizeBody("userId").escape(),
	sanitizeBody("token").escape(),
    (req, res) => { 
			
			try {
			NGOModel.NGO.aggregate([
							{'$match':{'ngoLoginId':req.body.ngoLoginId}},
							{'$limit':100000},
							{'$lookup': {
								'localField':'ngoId',
								'from':'ngodetails',
								'foreignField':'ngoId',
								'as':'info'	
							 }
							},
							{'$lookup': {
								'localField':'ngoLoginId',
								'from':'logos',
								'foreignField':'ngoId',
								'as':'logos'	
							 }
							},
							{'$unwind':'$info'},
							{'$unwind':'$logos'},
							{'$project':{
								 
								 'ngoId':1,
								 'name':1,
								 "client_logo": {$concat: ["http://",req.headers.host,"/profile/","$logos.client_logo"]},
								 'owner':1,
								 "ngoLoginId":1,
								 'mobile':1,
								 'email':1,
								 'createdAt':1,
								 'info.dateOfRegistration':1,
								 'info.dateOfOnBoarding':1,
								 'info.availability':1,
								 'info.isDefault':1,
								 'info.rating':1,
								 'info.ngoRegistrationNo':1,
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
						for(var i=0;i<users.length;i++){
							users[i].createdAt=utility.toDDmmyy(users[i].createdAt);
							users[i].info.dateOfOnBoarding=utility.toDDmmyy(users[i].info.dateOfOnBoarding);
							users[i].info.dateOfRegistration=utility.toDDmmyy(users[i].info.dateOfRegistration);
						}
							return apiResponse.successResponseWithData(res,"Found", users);
					}
					else return apiResponse.ErrorResponse(res,"Not Found!.");
					
				});
		} catch (err) {
			
			return apiResponse.ErrorResponse(res,"EXp:"+err);
		}
	}

];