const CitizenModel = require("../models/CitizenModel");
const DoctorModel = require("../models/DoctorModel");
const UserModel = require("../models/UserModel");
const FamilyHistoryModel = require("../models/FamilyHistoryModel");
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

exports.addFamilyHistory = [
    
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
 
	sanitizeBody("fatherlivingage").escape(),
	sanitizeBody("fatherlivinghealth").escape(),
	sanitizeBody("fatherdeceasedage").escape(),
	sanitizeBody("fatherdeceasedcause").escape(),
	sanitizeBody("motherlivingage").escape(),
	sanitizeBody("motherlivinghealth").escape(),
	sanitizeBody("motherdeceasedage").escape(),
	sanitizeBody("motherdeceasedcause").escape(),
	sanitizeBody("siblingslivingage").escape(),
	sanitizeBody("siblingslivinghealth").escape(),
	sanitizeBody("siblingsdeceasedage").escape(),
	sanitizeBody("siblingsdeceasedcause").escape(),
	sanitizeBody("childrenlivingage").escape(),
	sanitizeBody("childrenlivinghealth").escape(),
	sanitizeBody("childrendeceasedage").escape(),
	sanitizeBody("childrendeceasedcause").escape(),
	sanitizeBody("problemmaternal").escape(),
	sanitizeBody("problempaternal").escape(),
	sanitizeBody("citizenId").escape(),
	sanitizeBody("doctorId").escape(),
		
	
	(req, res) => { 
			
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
				  
					
					
					var recFamily={
								fatherlivingage:req.body.fatherlivingage,
								fatherlivinghealth:req.body.fatherlivinghealth,
								fatherdeceasedage:req.body.fatherdeceasedage,
								fatherdeceasedcause:req.body.fatherdeceasedcause,
								motherlivingage:req.body.motherlivingage,
								motherlivinghealth:req.body.motherlivinghealth,
								motherdeceasedage:req.body.motherdeceasedage,
								motherdeceasedcause:req.body.motherdeceasedcause,
								siblingslivingage:req.body.siblingslivingage,
								siblingslivinghealth:req.body.siblingslivinghealth,
								siblingsdeceasedage:req.body.siblingsdeceasedage,
								siblingsdeceasedcause:req.body.siblingsdeceasedcause,
								childrenlivingage:req.body.childrenlivingage,
								childrenlivinghealth:req.body.childrenlivinghealth,
								childrendeceasedage:req.body.childrendeceasedage,
								childrendeceasedcause:req.body.childrendeceasedcause,
								problemmaternal:req.body.problemmaternal,
								problempaternal:req.body.problempaternal,
								citizenId:req.body.citizenId,
								doctorId:req.body.doctorId,
								screenerId:req.body.screenerId,
								ngoId:req.body.ngoId,
					};
					var actionFamily=new FamilyHistoryModel.FamilyHistory(recFamily);
					actionFamily.save(function(_error)
					{
						if(_error){ apiResponse.ErrorResponse(res, "Sorry:"+_error);}
						else
						{
								return apiResponse.successResponseWithData(res,"Family Details Added Successfully Submitted", recFamily);
						}
					}
					);
					
			}
		} catch (err) {
			
			return apiResponse.ErrorResponse(res,err);
		}
	}];



	exports.updateFamilyHistory = [
    
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

	sanitizeBody("fatherlivingage").escape(),
	sanitizeBody("fatherlivinghealth").escape(),
	sanitizeBody("fatherdeceasedage").escape(),
	sanitizeBody("fatherdeceasedcause").escape(),
	sanitizeBody("motherlivingage").escape(),
	sanitizeBody("motherlivinghealth").escape(),
	sanitizeBody("motherdeceasedage").escape(),
	sanitizeBody("motherdeceasedcause").escape(),
	sanitizeBody("siblingslivingage").escape(),
	sanitizeBody("siblingslivinghealth").escape(),
	sanitizeBody("siblingsdeceasedage").escape(),
	sanitizeBody("siblingsdeceasedcause").escape(),
	sanitizeBody("childrenlivingage").escape(),
	sanitizeBody("childrenlivinghealth").escape(),
	sanitizeBody("childrendeceasedage").escape(),
	sanitizeBody("childrendeceasedcause").escape(),
	sanitizeBody("problemmaternal").escape(),
	sanitizeBody("problempaternal").escape(),
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
					if(req.body.fatherlivingage!=null && req.body.fatherlivingage!=undefined && req.body.fatherlivingage!=""){
						setfield["fatherlivingage"]=req.body.fatherlivingage;
					}
					if(req.body.fatherlivinghealth!=null && req.body.fatherlivinghealth!=undefined && req.body.fatherlivinghealth!=""){
						setfield["fatherlivinghealth"]=req.body.fatherlivinghealth;
					}
					if(req.body.fatherdeceasedage!=null && req.body.fatherdeceasedage!=undefined && req.body.fatherdeceasedage!=""){
						setfield["fatherdeceasedage"]=req.body.fatherdeceasedage;
					}
					if(req.body.fatherdeceasedcause!=null && req.body.fatherdeceasedcause!=undefined && req.body.fatherdeceasedcause!=""){
						setfield["fatherdeceasedcause"]=req.body.fatherdeceasedcause;
					}
					if(req.body.motherlivingage!=null && req.body.motherlivingage!=undefined && req.body.motherlivingage!=""){
						setfield["motherlivingage"]=req.body.motherlivingage;
					}
					if(req.body.motherlivinghealth!=null && req.body.motherlivinghealth!=undefined && req.body.motherlivinghealth!=""){
						setfield["motherlivinghealth"]=req.body.motherlivinghealth;
					}
					if(req.body.motherdeceasedage!=null && req.body.motherdeceasedage!=undefined && req.body.motherdeceasedage!=""){
						setfield["motherdeceasedage"]=req.body.motherdeceasedage;
					}
					if(req.body.motherdeceasedcause!=null && req.body.motherdeceasedcause!=undefined && req.body.motherdeceasedcause!=""){
						setfield["motherdeceasedcause"]=req.body.motherdeceasedcause;
					}
					if(req.body.siblingslivingage!=null && req.body.siblingslivingage!=undefined && req.body.siblingslivingage!=""){
						setfield["siblingslivingage"]=req.body.siblingslivingage;
					}
					if(req.body.siblingslivinghealth!=null && req.body.siblingslivinghealth!=undefined && req.body.siblingslivinghealth!=""){
						setfield["siblingslivinghealth"]=req.body.siblingslivinghealth;
					}
					if(req.body.siblingsdeceasedage!=null && req.body.siblingsdeceasedage!=undefined && req.body.siblingsdeceasedage!=""){
						setfield["siblingsdeceasedage"]=req.body.siblingsdeceasedage;
					}
					if(req.body.siblingsdeceasedcause!=null && req.body.siblingsdeceasedcause!=undefined && req.body.siblingsdeceasedcause!=""){
						setfield["siblingsdeceasedcause"]=req.body.siblingsdeceasedcause;
					}
					if(req.body.childrenlivingage!=null && req.body.childrenlivingage!=undefined && req.body.childrenlivingage!=""){
						setfield["childrenlivingage"]=req.body.childrenlivingage;
					}
					if(req.body.childrenlivinghealth!=null && req.body.childrenlivinghealth!=undefined && req.body.childrenlivinghealth!=""){
						setfield["childrenlivinghealth"]=req.body.childrenlivinghealth;
					}
					if(req.body.childrendeceasedage!=null && req.body.childrendeceasedage!=undefined && req.body.childrendeceasedage!=""){
						setfield["childrendeceasedage"]=req.body.childrendeceasedage;
					}
					if(req.body.childrendeceasedcause!=null && req.body.childrendeceasedcause!=undefined && req.body.childrendeceasedcause!=""){
						setfield["childrendeceasedcause"]=req.body.childrendeceasedcause;
					}
					if(req.body.problemmaternal!=null && req.body.problemmaternal!=undefined && req.body.problemmaternal!=""){
						setfield["problemmaternal"]=req.body.problemmaternal;
					}
					if(req.body.problempaternal!=null && req.body.problempaternal!=undefined && req.body.problempaternal!=""){
						setfield["problempaternal"]=req.body.problempAaternal;
					}
					FamilyHistoryModel.FamilyHistory.findOneAndUpdate(
											{ citizenId :req.body.citizenId},
											{$set: setfield
										    },
											
											{new: true},
												function(_error,newrecs)
												{
												if(_error) {return  apiResponse.ErrorResponse(res, "Sorry:"+_error);}
												else if(newrecs!=null) { return apiResponse.successResponseWithData(res,"Success",newrecs);}
												else {

													return apiResponse.successResponseWithData(res,"Update Family Data Successfully Submitted");


												}
												}
					);
					
			}
		} catch (err) {
			
			return apiResponse.ErrorResponse(res,err);
		}
	}];


exports.FamilyHistoryList=[
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


			FamilyHistoryModel.FamilyHistory.aggregate([
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
								 
								 'fatherlivingage':1,
								'fatherlivinghealth':1,
								'fatherdeceasedage':1,
								'fatherdeceasedcause':1,
								'motherlivingage':1,
								'motherlivinghealth':1,
								'motherdeceasedage':1,
								'motherdeceasedcause':1,
								'siblingslivingage':1,
								'siblingslivinghealth':1,
								'siblingsdeceasedage':1,
								'siblingsdeceasedcause':1,
								'childrenlivingage':1,
								'childrenlivinghealth':1,
								'childrendeceasedage':1,
								'childrendeceasedcause':1,
								'problemmaternal':1,
								'problempaternal':1,
								'citizenId':1,
								'doctorId':1,
								'screenerId':1,
								'ngoId':1,
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

							return apiResponse.successResponseWithData(res,"Family History Fetch Successfully", users);
						
					}
					else return apiResponse.ErrorResponse(res,"Not Found");
					
				});
			}
		} catch (err) {
			
			return apiResponse.ErrorResponse(res,"EXp:"+err);
		}
	}

];
