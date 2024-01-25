const CitizenModel = require("../models/CitizenModel");
const DoctorModel = require("../models/DoctorModel");
const UserModel = require("../models/UserModel");
const ScreenerModel = require("../models/ScreenerModel");
const WomenReproductiveHistoryModel = require("../models/WomenReproductiveHistoryModel");
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

exports.addWomenReproductiveHistory = [
    
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
 
	sanitizeBody("ageoffirstperiod").escape(),
	sanitizeBody("pregnancies").escape(),
	sanitizeBody("miscarriages").escape(),
	sanitizeBody("children").escape(),
	sanitizeBody("menopauseage").escape(),
	sanitizeBody("citizenId").escape(),
	sanitizeBody("doctorId").escape(),
	sanitizeBody("screenerId").escape(),
	sanitizeBody("lastmenstrualperiod").escape(),
	sanitizeBody("numberofdaysbleeding").escape(),
	sanitizeBody("intervalbetweenperiods").escape(),
	sanitizeBody("isregular").escape(),
	sanitizeBody("flow").escape(),
	sanitizeBody("painwithmenstruation").escape(),
	sanitizeBody("useofmedicationforpain").escape(),
	sanitizeBody("misseddays").escape(),
		
	
	(req, res) => { 
			
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
				  
					
					
					var recWomen={
								ageoffirstperiod:req.body.ageoffirstperiod,
								pregnancies:req.body.pregnancies,
								miscarriages:req.body.miscarriages,
								children:req.body.children,
								menopauseage:req.body.menopauseage,
								lastmenstrualperiod:req.body.lastmenstrualperiod,
								numberofdaysbleeding:req.body.numberofdaysbleeding,
								intervalbetweenperiods:req.body.intervalbetweenperiods,
								isregular:req.body.isregular,
								flow:req.body.flow,
								painwithmenstruation:req.body.painwithmenstruation,
								useofmedicationforpain:req.body.useofmedicationforpain,
								misseddays:req.body.misseddays,
								citizenId:req.body.citizenId,
								doctorId:req.body.doctorId,
								screenerId:req.body.doctorId,
								ngoId:req.body.ngoId,
					};
					var actionWomen=new WomenReproductiveHistoryModel.WomenReproductiveHistory(recWomen);
					actionWomen.save(function(_error)
					{
						if(_error){ apiResponse.ErrorResponse(res, "Sorry:"+_error);}
						else
						{
								return apiResponse.successResponseWithData(res,"Women Reproductive History Successfully Submitted", recWomen);
						}
					}
					);
					
			}
		} catch (err) {
			return apiResponse.ErrorResponse(res,err);
		}
	}];


	exports.updateWomenHistory = [
    
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

	sanitizeBody("ageoffirstperiod").escape(),
	sanitizeBody("pregnancies").escape(),
	sanitizeBody("miscarriages").escape(),
	sanitizeBody("children").escape(),
	sanitizeBody("menopauseage").escape(),
	sanitizeBody("citizenId").escape(),
	sanitizeBody("doctorId").escape(),
	sanitizeBody("lastmenstrualperiod").escape(),
	sanitizeBody("numberofdaysbleeding").escape(),
	sanitizeBody("intervalbetweenperiods").escape(),
	sanitizeBody("isregular").escape(),
	sanitizeBody("flow").escape(),
	sanitizeBody("painwithmenstruation").escape(),
	sanitizeBody("useofmedicationforpain").escape(),
	sanitizeBody("misseddays").escape(),
	
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
					if(req.body.ageoffirstperiod!=null && req.body.ageoffirstperiod!=undefined && req.body.ageoffirstperiod!=""){
						setfield["ageoffirstperiod"]=req.body.ageoffirstperiod;
					}
					if(req.body.pregnancies!=null && req.body.pregnancies!=undefined && req.body.pregnancies!=""){
						setfield["pregnancies"]=req.body.pregnancies;
					}
					if(req.body.miscarriages!=null && req.body.miscarriages!=undefined && req.body.miscarriages!=""){
						setfield["miscarriages"]=req.body.miscarriages;
					}
					if(req.body.children!=null && req.body.children!=undefined && req.body.children!=""){
						setfield["children"]=req.body.children;
					}
					if(req.body.menopauseage!=null && req.body.menopauseage!=undefined && req.body.menopauseage!=""){
						setfield["menopauseage"]=req.body.menopauseage;
					}


					if(req.body.lastmenstrualperiod!=null && req.body.lastmenstrualperiod!=undefined && req.body.lastmenstrualperiod!=""){
						setfield["lastmenstrualperiod"]=req.body.lastmenstrualperiod;
					}
					if(req.body.numberofdaysbleeding!=null && req.body.numberofdaysbleeding!=undefined && req.body.numberofdaysbleeding!=""){
						setfield["numberofdaysbleeding"]=req.body.numberofdaysbleeding;
					}
					if(req.body.intervalbetweenperiods!=null && req.body.intervalbetweenperiods!=undefined && req.body.intervalbetweenperiods!=""){
						setfield["intervalbetweenperiods"]=req.body.intervalbetweenperiods;
					}
					if(req.body.isregular!=null && req.body.isregular!=undefined && req.body.isregular!=""){
						setfield["isregular"]=req.body.isregular;
					}
					if(req.body.flow!=null && req.body.flow!=undefined && req.body.flow!=""){
						setfield["flow"]=req.body.flow;
					}
					if(req.body.painwithmenstruation!=null && req.body.painwithmenstruation!=undefined && req.body.painwithmenstruation!=""){
						setfield["painwithmenstruation"]=req.body.painwithmenstruation;
					}
					if(req.body.useofmedicationforpain!=null && req.body.useofmedicationforpain!=undefined && req.body.useofmedicationforpain!=""){
						setfield["useofmedicationforpain"]=req.body.useofmedicationforpain;
					}
					if(req.body.misseddays!=null && req.body.misseddays!=undefined && req.body.misseddays!=""){
						setfield["misseddays"]=req.body.misseddays;
					}
					

					WomenReproductiveHistoryModel.WomenReproductiveHistory.findOneAndUpdate(
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


exports.WomenHistoryList=[
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


			WomenReproductiveHistoryModel.WomenReproductiveHistory.aggregate([
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
							{'$project':{
								 
								'citizenId':1,
								'screenerId':1,
								'doctorId':1,
								'ageoffirstperiod':1,
								'pregnancies':1,
								'ngoId':1,
								'miscarriages':1,
								'children':1,
								'menopauseage':1,
								'createdAt':1,
								'lastmenstrualperiod':1,
								'numberofdaysbleeding':1,
								'intervalbetweenperiods':1,
								'isregular':1,
								'flow':1,
								'painwithmenstruation':1,
								'useofmedicationforpain':1,
								'misseddays':1,
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
								 'doctors.referenceName':1
								}
							},
							{ '$sort': { 'createdAt': -1 } }
						]
				).then(users => {
					
					let user=users[0];
					if (user) {

						for(var i=0;i<users.length;i++){
							users[i].createdAt=utility.toDDmmyy(users[i].createdAt);

						}

							return apiResponse.successResponseWithData(res,"WomenHistory List fetch successfully", users);
						
					}
					else return apiResponse.ErrorResponse(res,"WomenHistory List Not Found");
					
				});
			}
		} catch (err) {
			
			return apiResponse.ErrorResponse(res,"EXp:"+err);
		}
	}

];
