const CitizenModel = require("../models/CitizenModel");
const ScreenerModel = require("../models/ScreenerModel");
const UserModel = require("../models/UserModel");
const EyeTest = require("../models/EyeTestModel");
const UserDetailsModel = require("../models/UserDetailsModel");
const { body,query,validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");
const utility = require("../helpers/utility");
const mailer = require("../helpers/mailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { constants } = require("../helpers/constants");

exports.addEyeTest = [
    
	body("screenerId").isLength({ min: 3 }).trim().withMessage("Invalid Screener Login Id!").custom((value) => {
			return ScreenerModel.Screener.findOne({screenerId : value}).then((user) => {
				if (user) {}
				else{
					return Promise.reject("Screener Not Found !");
				}
			});
		}),
	body("citizenId").isLength({ min: 3 }).trim().withMessage("Invalid Citizen Id!").custom((value) => {
			return CitizenModel.Citizen.findOne({citizenId : value}).then((user) => {
				if (user) {}
				else{
					return Promise.reject("CitizenId Not Found !");
				}
			});
		}),
	//body("notes").isLength({ min: 3 }).trim().withMessage("Enter Notes!"),
	body("leyetest").isLength({ min: 1 }).trim().withMessage("Enter Left eyetest Value!"),
	body("reyetest").isLength({ min: 1 }).trim().withMessage("Enter Right eyetest Value!"),
	body("caseId").isLength({ min: 1}).trim().withMessage("Enter caseId!"),
 
	sanitizeBody("screenerId").escape(),
	sanitizeBody("citizenId").escape(),
	//sanitizeBody("notes").escape(),
	//sanitizeBody("eyetest").escape(),
	sanitizeBody("caseId").escape(),
	
	(req, res) => { 
			
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
				  
					
					
					var recEyeTest={
							screenerId:req.body.screenerId,
							citizenId:req.body.citizenId,
							notes: req.body.notes,
							leyetest: req.body.leyetest,
							reyetest: req.body.reyetest,
							caseId:req.body.caseId,
							ngoId:req.body.ngoId,
					};
					var actionEyeTest=new EyeTest.EyeTest(recEyeTest);
					actionEyeTest.save(function(_error)
					{
						if(_error){ apiResponse.ErrorResponse(res, "Sorry:"+_error);}
						else
						{
								return apiResponse.successResponseWithData(res,"Successfully Submitted", recEyeTest);
						}
					}
					);
					
			}
		} catch (err) {
			
			return apiResponse.ErrorResponse(res,err);
		}
	}];

exports.EyeTestList=[
    body("caseId").isLength({ min: 3 }).trim().withMessage("Invalid caseId!"),
	body("token").isLength({ min: 3 }).trim().withMessage("Invalid Token!"),
	sanitizeBody("caseId").escape(),
	sanitizeBody("token").escape(),
	
    (req, res) => { 
			
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
				var condition={};
				if(req.body.caseId==='' || req.body.caseId===undefined || req.body.caseId===null){
					condition={};
				}
				else{
					condition={'caseId':req.body.caseId};
				}
			EyeTest.EyeTest.aggregate([
							{'$match':condition},
							{'$limit':100000},
							{'$lookup': {
								'localField':'citizenId',
								'from':'citizendetails',
								'foreignField':'citizenId',
								'as':'info'	
							 }
							},
							{'$lookup': {
								'localField':'citizenId',
								'from':'citizens',
								'foreignField':'citizenId',
								'as':'basic'
							 }
							},
							{'$unwind':'$info'},
							{'$project':{
								 
								 'screenerId':1,
								 'caseId':1,
								 'citizenId':1,
								 'ngoId':1,
								 'notes':1,
								 'leyetest':1,
								 'reyetest':1,
								 'createdAt':1,
								 'basic.firstName':1,
								 'basic.lastName':1,
								 'basic.email':1,
								 'basic.mobile':1,
								 'basic.sex':1,
								 'basic.javixId':1,
								 'info.dateOfBirth':1,
								 'info.dateOfOnBoarding':1,
								 'info.bloodGroup':1,
								 'info.country':1,
								 'info.state':1,
								 'info.district':1,
								 'info.address':1,
								 'info.pincode':1,
								 'info.rating':1,
								 'info.geolocations':1,
								 'info.photo':1,
								 
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
			}
		} catch (err) {
			
			return apiResponse.ErrorResponse(res,"EXp:"+err);
		}
	}

];
