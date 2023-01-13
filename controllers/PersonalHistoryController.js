const CitizenModel = require("../models/CitizenModel");
const DoctorModel = require("../models/DoctorModel");
const UserModel = require("../models/UserModel");
const ScreenerModel = require("../models/ScreenerModel");
const PersonalHistoryModel = require("../models/PersonalHistoryModel");
//const MedicalAllergyModel = require("../models/MedicalAllergyModel");
//const MedicalHistoryModel = require("../models/MedicalHistoryModel");
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

exports.addPersonalHistory = [
    
	body("citizenId").isLength({ min: 3 }).trim().withMessage("Invalid CitizenId!").custom((value) => {
			return CitizenModel.Citizen.findOne({citizenId : value}).then((user) => {
				if (user) {}
				else{
					return Promise.reject("Citizen Not Found !");
				}
			});
		}),
	body("doctorId")
				  .custom((value) => {
				  	if(value!=null && value!="" && value!=undefined){
				  	if(value.length<4 ){
						return Promise.reject("Invalid Doctor Id!");
					}
				}
			return DoctorModel.Doctor.findOne({doctorId : value}).then((user) => {
				if(value!=null && value!="" && value!=undefined){
				if (!user) {
					return Promise.reject("Doctor Id not Found");
				}
			}
			});
		}),

		body("screenerId")
				  .custom((value) => {
				  	if(value!=null && value!="" && value!=undefined){
				  	if(value.length<4 ){
						return Promise.reject("Invalid Screener Id!");
					}
				}
			return ScreenerModel.Screener.findOne({screenerId : value}).then((user) => {
				if(value!=null && value!="" && value!=undefined){
				if (!user) {
					return Promise.reject("Screener Id not Found");
				}
			}
			});
		}),
	
	//body("allergies").isLength({ min: 1 }).trim().withMessage("Enter Allergies!"),
	// body("allergydate").isLength({ min: 8, max:10 }).trim().withMessage("Enter Allergy Date format 'dd-mm-yyyy' !").custom((value) => {
	// 		return utility.isDate(value);
	// 	}),
 
	sanitizeBody("bornraised").escape(),
	sanitizeBody("birthproblem").escape(),
	sanitizeBody("highesteducation").escape(),
	sanitizeBody("maritalstatus").escape(),
	sanitizeBody("ocupation").escape(),
	sanitizeBody("iscurrentlyworking").escape(),
	sanitizeBody("hoursweek").escape(),
	sanitizeBody("notworking").escape(),
	sanitizeBody("isdisability").escape(),
	sanitizeBody("disabilitydetails").escape(),
	sanitizeBody("legalproblems").escape(),
	sanitizeBody("religion").escape(),
	sanitizeBody("citizenId").escape(),
	sanitizeBody("doctorId").escape(),
	sanitizeBody("screenerId").escape(),
		
	
	(req, res) => { 
			
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
				  
					
					
					var recPersonal={
								bornraised:req.body.bornraised,
								birthproblem:req.body.birthproblem,
								highesteducation:req.body.highesteducation,
								maritalstatus:req.body.maritalstatus,
								ocupation:req.body.ocupation,
								iscurrentlyworking:req.body.iscurrentlyworking,
								hoursweek:req.body.hoursweek,
								notworking:req.body.notworking,
								isdisability:req.body.isdisability,
								disabilitydetails:req.body.disabilitydetails,
								legalproblems:req.body.legalproblems,
								religion:req.body.religion,
								citizenId:req.body.citizenId,
								doctorId:req.body.doctorId,
								screenerId:req.body.screenerId,
								ngoId:req.body.ngoId,
					};
					var actionPersonal=new PersonalHistoryModel.PersonalHistory(recPersonal);
					actionPersonal.save(function(_error)
					{
						if(_error){ apiResponse.ErrorResponse(res, "Sorry:"+_error);}
						else
						{
								return apiResponse.successResponseWithData(res," added PersonalHistory Successfully ", recPersonal);
						}
					}
					);
					
			}
		} catch (err) {
			
			return apiResponse.ErrorResponse(res,err);
		}
	}];


	exports.updatePersonalHistory = [
    
	body("citizenId").isLength({ min: 3 }).trim().withMessage("Invalid CitizenId!").custom((value) => {
			return CitizenModel.Citizen.findOne({citizenId : value}).then((user) => {
				if (user) {}
				else{
					return Promise.reject("Citizen Not Found !");
				}
			});
		}),
	body("doctorId").isLength({ min: 3 }).trim().withMessage("Invalid Doctor Id!").custom((value) => {
			return DoctorModel.Doctor.findOne({doctorId : value}).then((user) => {
				if (user) {}
				else{
					return Promise.reject("Doctor Id Not Found !");
				}
			});
		}),

	sanitizeBody("bornraised").escape(),
	sanitizeBody("birthproblem").escape(),
	sanitizeBody("highesteducation").escape(),
	sanitizeBody("maritalstatus").escape(),
	sanitizeBody("ocupation").escape(),
	sanitizeBody("iscurrentlyworking").escape(),
	sanitizeBody("hoursweek").escape(),
	sanitizeBody("notworking").escape(),
	sanitizeBody("isdisability").escape(),
	sanitizeBody("disabilitydetails").escape(),
	sanitizeBody("legalproblems").escape(),
	sanitizeBody("religion").escape(),
	sanitizeBody("citizenId").escape(),
	sanitizeBody("doctorId").escape(),
	
	(req, res) => { 
			
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
				  
					var setfield={};
					
					if(req.body.doctorId!=null && req.body.doctorId!=undefined && req.body.doctorId!=""){
						setfield["doctorId"]=req.body.doctorId;
					}
					if(req.body.bornraised!=null && req.body.bornraised!=undefined && req.body.bornraised!=""){
						setfield["bornraised"]=req.body.bornraised;
					}
					if(req.body.birthproblem!=null && req.body.birthproblem!=undefined && req.body.birthproblem!=""){
						setfield["birthproblem"]=req.body.birthproblem;
					}

					if(req.body.isdisability!=null && req.body.isdisability!=undefined && req.body.isdisability!=""){
						setfield["isdisability"]=req.body.isdisability;
					}
					if(req.body.disabilitydetails!=null && req.body.disabilitydetails!=undefined && req.body.disabilitydetails!=""){
						setfield["disabilitydetails"]=req.body.disabilitydetails;
					}
					if(req.body.legalproblems!=null && req.body.legalproblems!=undefined && req.body.legalproblems!=""){
						setfield["legalproblems"]=req.body.legalproblems;
					}
					if(req.body.religion!=null && req.body.religion!=undefined && req.body.religion!=""){
						setfield["religion"]=req.body.religion;
					}

					if(req.body.iscurrentlyworking!=null && req.body.iscurrentlyworking!=undefined && req.body.iscurrentlyworking!=""){
						setfield["iscurrentlyworking"]=req.body.iscurrentlyworking;
					}
					if(req.body.hoursweek!=null && req.body.hoursweek!=undefined && req.body.hoursweek!=""){
						setfield["hoursweek"]=req.body.hoursweek;
					}
					if(req.body.notworking!=null && req.body.notworking!=undefined && req.body.notworking!=""){
						setfield["notworking"]=req.body.notworking;
					}
					if(req.body.highesteducation!=null && req.body.highesteducation!=undefined && req.body.highesteducation!=""){
						setfield["highesteducation"]=req.body.highesteducation;
					}
					if(req.body.maritalstatus!=null && req.body.maritalstatus!=undefined && req.body.maritalstatus!=""){
						setfield["maritalstatus"]=req.body.maritalstatus;
					}
					if(req.body.ocupation!=null && req.body.ocupation!=undefined && req.body.ocupation!=""){
						setfield["ocupation"]=req.body.ocupation;
					}

					PersonalHistoryModel.PersonalHistory.findOneAndUpdate(
											{ citizenId :req.body.citizenId},
											{$set: setfield
										    },
											
											{new: true},
												function(_error,newrecs)
												{
												if(_error) {return  apiResponse.ErrorResponse(res, "Sorry:"+_error);}
												else if(newrecs!=null) { return apiResponse.successResponseWithData(res,"Success",newrecs);}
												else {

													return apiResponse.successResponseWithData(res,"Successfully Submitted");


												}
												}
					);
					
			}
		} catch (err) {
			
			return apiResponse.ErrorResponse(res,err);
		}
	}];


exports.PersonalHistoryList=[
    body("citizenId").isLength({ min: 3 }).trim().withMessage("Invalid CitizenId!").custom((value) => {
			return CitizenModel.Citizen.findOne({citizenId : value}).then((user) => {
				if (user) {}
				else{
					return Promise.reject("Citizen Not Found !");
				}
			});
		}),
	sanitizeBody("citizenId").escape(),
	
    (req, res) => { 
			
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
				var condition={};
				if(req.body.citizenId==='' || req.body.citizenId===undefined || req.body.citizenId===null){
					condition={};
				}
				else{
					condition={'citizenId':req.body.citizenId};
				}


			PersonalHistoryModel.PersonalHistory.aggregate([
							{'$match':condition},
							{'$limit':100000},
							{'$lookup': {
								'localField':'citizenId',
								'from':'citizens',
								'foreignField':'citizenId',
								'as':'citizen'
							 }
							},
							{'$lookup': {
								'localField':'doctorId',
								'from':'doctors',
								'foreignField':'doctorId',
								'as':'doctor'
							 }
							},
							{'$lookup': {
								'localField':'screenerId',
								'from':'screeners',
								'foreignField':'screenerId',
								'as':'screener'
							 }
							},
						
							{'$project':{
								 
								 'bornraised':1,
								'birthproblem':1,
								'highesteducation':1,
								'maritalstatus':1,
								'ocupation':1,
								'ngoId':1,
								'iscurrentlyworking':1,
								'hoursweek':1,
								'notworking':1,
								'isdisability':1,
								'disabilitydetails':1,
								'legalproblems':1,
								'religion':1,
								'citizenId':1,
								'doctorId':1,
								'screenerId':1,
								'createdAt':1,
								 'citizen.firstName':1,
								 'citizen.lastName':1,
								 'citizen.email':1,
								 'citizen.mobile':1,
								 'citizen.sex':1,
								 'citizen.javixId':1,
								 'doctor.firstName':1,
								 'doctor.lastName':1,
								 'doctor.email':1,
								 'doctor.mobile':1,
								 'doctors.medicalRegNo':1,
								 'doctors.yearOfReg':1,
								 'doctors.statteMedicalCouncil':1,
								 'doctors.experience':1,
								 'doctors.referenceName':1,
								 'screener.firstName':1,
								 'screener.lastName':1,
								 'screener.email':1,
								 'screener.mobile':1,
								 'screener.mobile1':1
								 
								}
							}
						]
				).then(users => {
					
					let user=users[0];
					if (user) {

						for(var i=0;i<users.length;i++){
							users[i].createdAt=utility.toDDmmyy(users[i].createdAt);

						}

							return apiResponse.successResponseWithData(res,"PersonalHistory List fetch successfully", users);
						
					}
					else return apiResponse.ErrorResponse(res,"PersonalHistory List Not Found");
					
				});
			}
		} catch (err) {
			
			return apiResponse.ErrorResponse(res,"EXp:"+err);
		}
	}

];
