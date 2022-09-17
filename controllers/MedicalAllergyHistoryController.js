const CitizenModel = require("../models/CitizenModel");
const DoctorModel = require("../models/DoctorModel");
const UserModel = require("../models/UserModel");
const ScreenerModel = require("../models/ScreenerModel");
const MedicalAllergyModel = require("../models/MedicalAllergyModel");
const MedicalHistoryModel = require("../models/MedicalHistoryModel");
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

exports.addAllergy = [
    
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
	
	body("allergies").isLength({ min: 1 }).trim().withMessage("Enter Allergies!"),
	body("allergyType").isLength({ min: 1 }).trim().withMessage("Enter Allergies Type!"),
	// body("allergydate").isLength({ min: 8, max:10 }).trim().withMessage("Enter Allergy Date format 'dd-mm-yyyy' !").custom((value) => {
	// 		return utility.isDate(value);
	// 	}),
 
	sanitizeBody("doctorId").escape(),
	sanitizeBody("screenerId").escape(),
	sanitizeBody("citizenId").escape(),
	sanitizeBody("allergies").escape(),
	sanitizeBody("allergydate").escape(),
	sanitizeBody("allergyType").escape(),
	
	(req, res) => { 
			
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
				  
					
					
					var recAllergy={
							doctorId:req.body.doctorId,
							screenerId:req.body.screenerId,
							citizenId:req.body.citizenId,
							//allergydate: utility.toYYmmdd(req.body.allergydate),
							allergies: req.body.allergies,
							allergyType: req.body.allergyType
					};
					var actionAllergy=new MedicalAllergyModel.MedicalAllergy(recAllergy);
					actionAllergy.save(function(_error)
					{
						if(_error){ apiResponse.ErrorResponse(res, "Sorry:"+_error);}
						else
						{
								return apiResponse.successResponseWithData(res,"Successfully Submitted", recAllergy);
						}
					}
					);
					
			}
		} catch (err) {
			
			return apiResponse.ErrorResponse(res,err);
		}
	}];



exports.addHistory = [
    
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

	sanitizeBody("doctorId").escape(),
	sanitizeBody("screenerId").escape(),
	sanitizeBody("citizenId").escape(),
	sanitizeBody("diabetes").escape(),
	sanitizeBody("high_bp").escape(),
	sanitizeBody("high_cholestrol").escape(),
	sanitizeBody("goiter").escape(),
	sanitizeBody("cancer").escape(),
	sanitizeBody("leukemia").escape(),
	sanitizeBody("psoriasis").escape(),
	sanitizeBody("agina").escape(),
	sanitizeBody("type_of_cancer").escape(),
	sanitizeBody("heart_problems").escape(),
	sanitizeBody("heart_murmur").escape(),
	sanitizeBody("pneumonia").escape(),
	sanitizeBody("pulmonary_embolism").escape(),
	sanitizeBody("asthma").escape(),
	sanitizeBody("emphysema").escape(),
	sanitizeBody("stroke").escape(),
	sanitizeBody("epilepsy").escape(),
	sanitizeBody("cataracts").escape(),
	sanitizeBody("kidney_disease").escape(),
	sanitizeBody("kidney_stones").escape(),
	sanitizeBody("chrohns_disease").escape(),
	sanitizeBody("colitis").escape(),
	sanitizeBody("anemia").escape(),
	sanitizeBody("jaundice").escape(),
	sanitizeBody("hepatitis").escape(),
	sanitizeBody("stomach").escape(),
	sanitizeBody("rheumatic_fever").escape(),
	sanitizeBody("tuberculosis").escape(),
	sanitizeBody("hiv_aids").escape(),
	sanitizeBody("other").escape(),
	
	(req, res) => { 
			
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
				  
					
					
					var recHistory={
							diabetes:req.body.diabetes,
							high_bp:req.body.high_bp,
							high_cholestrol:req.body.high_cholestrol,
							goiter:req.body.goiter,
							cancer:req.body.cancer,
							leukemia:req.body.leukemia,
							psoriasis:req.body.psoriasis,
							agina:req.body.agina,
							type_of_cancer:req.body.type_of_cancer,
							heart_problems:req.body.heart_problems,
							heart_murmur:req.body.heart_murmur,
							pneumonia:req.body.pneumonia,
							pulmonary_embolism:req.body.pulmonary_embolism,
							asthma:req.body.asthma,
							emphysema:req.body.emphysema,
							stroke:req.body.stroke,
							epilepsy:req.body.epilepsy,
							cataracts:req.body.cataracts,
							kidney_disease:req.body.kidney_disease,
							kidney_stones:req.body.kidney_stones,
							chrohns_disease:req.body.chrohns_disease,
							colitis:req.body.colitis,
							anemia:req.body.anemia,
							jaundice:req.body.jaundice,
							hepatitis:req.body.hepatitis,
							stomach:req.body.stomach,
							rheumatic_fever:req.body.rheumatic_fever,
							tuberculosis:req.body.tuberculosis,
							hiv_aids:req.body.hiv_aids,
							other:req.body.other,
							citizenId:req.body.citizenId,
							doctorId:req.body.doctorId,
							screenerId:req.body.screenerId
					};
					var actionHistory=new MedicalHistoryModel.MedicalHistory(recHistory);
					actionHistory.save(function(_error)
					{
						if(_error){ apiResponse.ErrorResponse(res, "Sorry:"+_error);}
						else
						{
								return apiResponse.successResponseWithData(res,"Successfully Submitted", recHistory);
						}
					}
					);
					
			}
		} catch (err) {
			
			return apiResponse.ErrorResponse(res,err);
		}
	}];



exports.historyAllergyList=[
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


			MedicalAllergyModel.MedicalAllergy.aggregate([
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
								 
								 'citizenId':1,
								 'doctorId':1,
								 'screenerId':1,
								 'allergies':1,
								 'allergyType':1,
								 'createdAt':1,
								 'allergydate':1,
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


exports.historyMedicalList=[
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


			MedicalHistoryModel.MedicalHistory.aggregate([
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
								 'citizenId':1,
								 'screenerId':1,
								 'doctorId':1,
								 'diabetes':1,
								'high_bp':1,
								'high_cholestrol':1,
								'goiter':1,
								'cancer':1,
								'leukemia':1,
								'psoriasis':1,
								'agina':1,
								'type_of_cancer':1,
								'heart_problems':1,
								'heart_murmur':1,
								'pneumonia':1,
								'pulmonary_embolism':1,
								'asthma':1,
								'emphysema':1,
								'stroke':1,
								'epilepsy':1,
								'cataracts':1,
								'kidney_disease':1,
								'kidney_stones':1,
								'chrohns_disease':1,
								'colitis':1,
								'anemia':1,
								'jaundice':1,
								'hepatitis':1,
								'stomach':1,
								'rheumatic_fever':1,
								'tuberculosis':1,
								'hiv_aids':1,
								'other':1,
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


exports.updateHistory = [
    
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

	sanitizeBody("doctorId").escape(),
	sanitizeBody("citizenId").escape(),
	sanitizeBody("diabetes").escape(),
	sanitizeBody("high_bp").escape(),
	sanitizeBody("high_cholestrol").escape(),
	sanitizeBody("goiter").escape(),
	sanitizeBody("cancer").escape(),
	sanitizeBody("leukemia").escape(),
	sanitizeBody("psoriasis").escape(),
	sanitizeBody("agina").escape(),
	sanitizeBody("type_of_cancer").escape(),
	sanitizeBody("heart_problems").escape(),
	sanitizeBody("heart_murmur").escape(),
	sanitizeBody("pneumonia").escape(),
	sanitizeBody("pulmonary_embolism").escape(),
	sanitizeBody("asthma").escape(),
	sanitizeBody("emphysema").escape(),
	sanitizeBody("stroke").escape(),
	sanitizeBody("epilepsy").escape(),
	sanitizeBody("cataracts").escape(),
	sanitizeBody("kidney_disease").escape(),
	sanitizeBody("kidney_stones").escape(),
	sanitizeBody("chrohns_disease").escape(),
	sanitizeBody("colitis").escape(),
	sanitizeBody("anemia").escape(),
	sanitizeBody("jaundice").escape(),
	sanitizeBody("hepatitis").escape(),
	sanitizeBody("stomach").escape(),
	sanitizeBody("rheumatic_fever").escape(),
	sanitizeBody("tuberculosis").escape(),
	sanitizeBody("hiv_aids").escape(),
	sanitizeBody("other").escape(),
	
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
					if(req.body.diabetes!=null && req.body.diabetes!=undefined && req.body.diabetes!=""){
						setfield["diabetes"]=req.body.diabetes;
					}
					if(req.body.high_bp!=null && req.body.high_bp!=undefined && req.body.high_bp!=""){
						setfield["high_bp"]=req.body.high_bp;
					}
					if(req.body.high_cholestrol!=null && req.body.high_cholestrol!=undefined && req.body.high_cholestrol!=""){
						setfield["high_cholestrol"]=req.body.high_cholestrol;
					}
					if(req.body.goiter!=null && req.body.goiter!=undefined && req.body.goiter!=""){
						setfield["goiter"]=req.body.goiter;
					}
					if(req.body.cancer!=null && req.body.cancer!=undefined && req.body.cancer!=""){
						setfield["cancer"]=req.body.cancer;
					}
					if(req.body.leukemia!=null && req.body.leukemia!=undefined && req.body.leukemia!=""){
						setfield["leukemia"]=req.body.leukemia;
					}
					if(req.body.psoriasis!=null && req.body.psoriasis!=undefined && req.body.psoriasis!=""){
						setfield["psoriasis"]=req.body.psoriasis;
					}
					if(req.body.agina!=null && req.body.agina!=undefined && req.body.agina!=""){
						setfield["agina"]=req.body.agina;
					}
					if(req.body.type_of_cancer!=null && req.body.type_of_cancer!=undefined && req.body.type_of_cancer!=""){
						setfield["type_of_cancer"]=req.body.type_of_cancer;
					}
					if(req.body.heart_problems!=null && req.body.heart_problems!=undefined && req.body.heart_problems!=""){
						setfield["heart_problems"]=req.body.heart_problems;
					}
					if(req.body.heart_murmur!=null && req.body.heart_murmur!=undefined && req.body.heart_murmur!=""){
						setfield["heart_murmur"]=req.body.heart_murmur;
					}
					if(req.body.pneumonia!=null && req.body.pneumonia!=undefined && req.body.pneumonia!=""){
						setfield["pneumonia"]=req.body.pneumonia;
					}
					if(req.body.pulmonary_embolism!=null && req.body.pulmonary_embolism!=undefined && req.body.pulmonary_embolism!=""){
						setfield["pulmonary_embolism"]=req.body.pulmonary_embolism;
					}
					if(req.body.asthma!=null && req.body.asthma!=undefined && req.body.asthma!=""){
						setfield["asthma"]=req.body.asthma;
					}
					if(req.body.emphysema!=null && req.body.emphysema!=undefined && req.body.emphysema!=""){
						setfield["emphysema"]=req.body.emphysema;
					}
					if(req.body.stroke!=null && req.body.stroke!=undefined && req.body.stroke!=""){
						setfield["stroke"]=req.body.stroke;
					}
					if(req.body.epilepsy!=null && req.body.epilepsy!=undefined && req.body.epilepsy!=""){
						setfield["epilepsy"]=req.body.epilepsy;
					}
					if(req.body.cataracts!=null && req.body.cataracts!=undefined && req.body.cataracts!=""){
						setfield["cataracts"]=req.body.cataracts;
					}
					if(req.body.kidney_disease!=null && req.body.kidney_disease!=undefined && req.body.kidney_disease!=""){
						setfield["kidney_disease"]=req.body.kidney_disease;
					}
					if(req.body.kidney_stones!=null && req.body.kidney_stones!=undefined && req.body.kidney_stones!=""){
						setfield["kidney_stones"]=req.body.kidney_stones;
					}
					if(req.body.chrohns_disease!=null && req.body.chrohns_disease!=undefined && req.body.chrohns_disease!=""){
						setfield["chrohns_disease"]=req.body.chrohns_disease;
					}
					if(req.body.colitis!=null && req.body.colitis!=undefined && req.body.colitis!=""){
						setfield["colitis"]=req.body.colitis;
					}
					if(req.body.anemia!=null && req.body.anemia!=undefined && req.body.anemia!=""){
						setfield["anemia"]=req.body.anemia;
					}
					if(req.body.jaundice!=null && req.body.jaundice!=undefined && req.body.jaundice!=""){
						setfield["jaundice"]=req.body.jaundice;
					}
					if(req.body.hepatitis!=null && req.body.hepatitis!=undefined && req.body.hepatitis!=""){
						setfield["hepatitis"]=req.body.hepatitis;
					}
					if(req.body.stomach!=null && req.body.stomach!=undefined && req.body.stomach!=""){
						setfield["stomach"]=req.body.stomach;
					}
					if(req.body.rheumatic_fever!=null && req.body.rheumatic_fever!=undefined && req.body.rheumatic_fever!=""){
						setfield["rheumatic_fever"]=req.body.rheumatic_fever;
					}
					if(req.body.tuberculosis!=null && req.body.tuberculosis!=undefined && req.body.tuberculosis!=""){
						setfield["tuberculosis"]=req.body.tuberculosis;
					}
					if(req.body.hiv_aids!=null && req.body.hiv_aids!=undefined && req.body.hiv_aids!=""){
						setfield["hiv_aids"]=req.body.hiv_aids;
					}
					if(req.body.other!=null && req.body.other!=undefined && req.body.other!=""){
						setfield["other"]=req.body.other;
					}

					MedicalHistoryModel.MedicalHistory.findOneAndUpdate(
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

exports.updateAllergy = [
    
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

	sanitizeBody("doctorId").escape(),
	sanitizeBody("citizenId").escape(),
	sanitizeBody("allergies").escape(),
	sanitizeBody("allergyType").escape(),
	sanitizeBody("allergydate").escape(),
	
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
					if(req.body.allergies!=null && req.body.allergies!=undefined && req.body.allergies!=""){
						setfield["allergies"]=req.body.allergies;
					}
					if(req.body.allergyType!=null && req.body.allergyType!=undefined && req.body.allergyType!=""){
						setfield["allergyType"]=req.body.allergyType;
					}
					if(req.body.allergydate!=null && req.body.allergydate!=undefined && req.body.allergydate!=""){
						setfield["allergydate"]=utility.toYYmmdd(req.body.allergydate);
					}

					MedicalAllergyModel.MedicalAllergy.findOneAndUpdate(
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

