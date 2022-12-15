const CitizenModel = require("../models/CitizenModel");
const ScreenerModel = require("../models/ScreenerModel");
const UserModel = require("../models/UserModel");
const HealthSurveyModel = require("../models/HealthSurveyModel");
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
const json2csv = require('json2csv').parse;
const path = require("path")

const fs = require('fs');

const fields = [

'healthsurveyId',
'familyId',
'screenerId',
'citizenId',
'screenerfullname',
'address',
'mobile',
'familymembername',
'aadhaar',
'drinkingWaterSource',
'drinkingWaterDistance',
'isdrinkingWaterTreatmentRequired',
'NoOfPersonUsingToilets',
'NonUsageOfToilets',
'DistanceOfSubcenters',
'DistanceOfPrimaryHealthcenters',
'DistanceOfCommunityHealthcenters',
'DistanceOfDistrictHospitals',
'DistanceOfPathologyLab',
'DistanceOfMedicalStore',
'StatusOfDeliveryOfChildren',
'StatusOfVaccinationOfChildren',
'StatusOfFemaleRelatedProblem',
'CentrallyIssuedHealthInsurance',
'StateIssuedHealthInsurance',
'PersonalHealthInsurance',
'bpStatus',
'hbTestStatusFemale',
'sugarTestStatus',
'smokingStatus',
'alcoholStatus',
'tobaccoStatus',
'createdAt',
]
exports.addHealthSurvey = [
    
	body("screenerId").isLength({ min: 3 }).trim().withMessage("Invalid Screener Login Id!").custom((value) => {
			return ScreenerModel.Screener.findOne({screenerId : value}).then((user) => {
				if (user) {}
				else{
					return Promise.reject("Screener Not Found !");
				}
			});
		}),
	// body("citizenId").isLength({ min: 3 }).trim().withMessage("Invalid Citizen Id!").custom((value) => {
	// 		return CitizenModel.Citizen.findOne({citizenId : value}).then((user) => {
	// 			if (user) {}
	// 			else{
	// 				return Promise.reject("CitizenId Not Found !");
	// 			}
	// 		});
	// 	}),
	//body("notes").isLength({ min: 3 }).trim().withMessage("Enter notes!"),
	// body("drinkingWaterSource").isLength({ min: 1 }).trim().withMessage("Enter Drinking water source!"),
	// body("drinkingWaterDistance").isLength({ min: 1}).trim().withMessage("Enter Drinking Water distance!"),
	// body("isdrinkingWaterTreatmentRequired").isLength({ min: 1 }).trim().withMessage("Enter Drinking water requiring treatment!"),
	// body("NoOfPersonUsingToilets").isLength({ min: 1}).trim().withMessage("Enter Number of persons using toilets!"),
	// body("NonUsageOfToilets").isLength({ min: 1 }).trim().withMessage("Enter Non usage of toilets!"),
	// body("DistanceOfSubcenters").isLength({ min: 1}).trim().withMessage("Enter Distance of subcentres (IN WALKING TIME)!"),
	// body("DistanceOfCommunityHealthcenters").isLength({ min: 1}).trim().withMessage("Enter Distance of community health centers!"),
 	
 // 	body("DistanceOfPrimaryHealthcenters").isLength({ min: 1 }).trim().withMessage("Enter Distance of Primary health centers (IN KMS)!"),
	// body("DistanceOfDistrictHospitals").isLength({ min: 1}).trim().withMessage("Enter Distance of district hospital!"),
	// body("DistanceOfPathologyLab").isLength({ min: 1 }).trim().withMessage("Enter Distance of nearest pathological lab!"),
	// body("DistanceOfMedicalStore").isLength({ min: 1}).trim().withMessage("Enter Distance of medical store!"),
	// body("StatusOfDeliveryOfChildren").isLength({ min: 1 }).trim().withMessage("Enter Status of delivery of children!"),
	// body("StatusOfVaccinationOfChildren").isLength({ min: 1}).trim().withMessage("Enter Status of vaccination of children"),
	// body("StatusOfFemaleRelatedProblem").isLength({ min: 1}).trim().withMessage("Enter Status of female related problems!"),
 
 // 	body("CentrallyIssuedHealthInsurance").isLength({ min: 1 }).trim().withMessage("Enter Centrally issued health insurance!"),
	// body("StateIssuedHealthInsurance").isLength({ min: 1}).trim().withMessage("Enter State issued health insurance!"),
	// body("PersonalHealthInsurance").isLength({ min: 1 }).trim().withMessage("Enter Personal health insurance!"),
	// body("bpStatus").isLength({ min: 1}).trim().withMessage("Enter BP screening status of adults!"),
	// body("hbTestStatusFemale").isLength({ min: 1 }).trim().withMessage("Enter HB test status of female adults!"),
	// body("sugarTestStatus").isLength({ min: 1}).trim().withMessage("Enter SUGAR test status of adults"),
	// body("smokingStatus").isLength({ min: 1}).trim().withMessage("Enter Smoking status!"),
 // 	body("alcoholStatus").isLength({ min: 1 }).trim().withMessage("Enter Alcohol status!"),
	// body("tobaccoStatus").isLength({ min: 1}).trim().withMessage("Enter Tobacco status!"),
 
	sanitizeBody("screenerId").escape(),
	//sanitizeBody("citizenId").escape(),
	//sanitizeBody("notes").escape(),
	//sanitizeBody("image").escape(),
	//sanitizeBody("caseId").escape(),
	
	(req, res) => { 
			
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
			
									var ID=utility.uID();
									//var ID1=utility.uID();
									var recHealthSurvey={
											healthsurveyId:ID,
											familyId:req.body.familyId,
											screenerId:req.body.screenerId,
											citizenId:req.body.citizenId,
											drinkingWaterSource: req.body.drinkingWaterSource,
											drinkingWaterDistance: req.body.drinkingWaterDistance,
											isdrinkingWaterTreatmentRequired:req.body.isdrinkingWaterTreatmentRequired,
											NoOfPersonUsingToilets:req.body.NoOfPersonUsingToilets,
											NonUsageOfToilets: req.body.NonUsageOfToilets,
											DistanceOfSubcenters: req.body.DistanceOfSubcenters,
											DistanceOfPrimaryHealthcenters:req.body.DistanceOfPrimaryHealthcenters,
											DistanceOfCommunityHealthcenters:req.body.DistanceOfCommunityHealthcenters,
											DistanceOfDistrictHospitals:req.body.DistanceOfDistrictHospitals,
											DistanceOfPathologyLab:req.body.DistanceOfPathologyLab,
											DistanceOfMedicalStore:req.body.DistanceOfMedicalStore,
											StatusOfDeliveryOfChildren: req.body.StatusOfDeliveryOfChildren,
											StatusOfVaccinationOfChildren: req.body.StatusOfVaccinationOfChildren,
											StatusOfFemaleRelatedProblem:req.body.StatusOfFemaleRelatedProblem,
											CentrallyIssuedHealthInsurance:req.body.CentrallyIssuedHealthInsurance,
											StateIssuedHealthInsurance: req.body.StateIssuedHealthInsurance,
											PersonalHealthInsurance: req.body.PersonalHealthInsurance,
											bpStatus:req.body.bpStatus,
											hbTestStatusFemale: req.body.hbTestStatusFemale,
											sugarTestStatus:req.body.sugarTestStatus,
											smokingStatus:req.body.smokingStatus,
											alcoholStatus: req.body.alcoholStatus,
											tobaccoStatus: req.body.tobaccoStatus
									};

									var actionHealthSurvey=new HealthSurveyModel(recHealthSurvey);
									actionHealthSurvey.save(function(_error)
									{
										if(_error){ return apiResponse.ErrorResponse(res, "Sorry:"+_error);}
										else
										{		
												
												return apiResponse.successResponseWithData(res,"Successfully Submitted");
												//return apiResponse.successResponseWithData(res,"Successfully Submitted", recVisualExam);
										}
									}
									);
					}
					
					
					
			
			
		} catch (err) {
			
			return apiResponse.ErrorResponse(res,err);
		}
	}];

// exports.HealthSurveyList=[
//  //    body("familyId").isLength({ min: 3 }).trim().withMessage("Invalid familyId!"),
// 	// sanitizeBody("familyId").escape(),
	
//     (req, res) => { 
			
// 		try {
// 			const errors = validationResult(req);
// 			if (!errors.isEmpty()) {
// 				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
// 			}else {
// 				var condition={};
// 				if(req.body.familyId!='' && req.body.familyId!=undefined && req.body.familyId!=null){
// 					condition['familyId']=req.body.familyId;
// 				}
				
// 			GeneralSurveyModel.GeneralSurvey.aggregate([
// 							{'$match':condition},
// 							{'$limit':100000},
// 							{'$project':{
								 
// 								 'screenerId':1,
// 								 'familyId':1,
// 								 'citizenId':1,
// 								 'noOfFamilyMembers':1,
// 								 'nameHead':1,
// 								 'ageHead':1,
// 								 'NoOfAdultMales':1,
// 								 'NoOfAdultFemales':1,
// 								 'NoOfChildrenMales':1,
// 								 'NoOfChildrenFemales':1,
// 								 'createdAt':1,
// 								 'updatedAt':1
// 								}
// 							}
// 						]
// 				).then(users => {
					
// 					let user=users[0];
// 					if (user) {
// 							return apiResponse.successResponseWithData(res,"Found", users);
// 					}
// 					else return apiResponse.ErrorResponse(res,"Not Found");
					
// 				});
// 			}
// 		} catch (err) {
			
// 			return apiResponse.ErrorResponse(res,"EXp:"+err);
// 		}
// 	}

// ];

exports.healthsurveydownload = [ 
	// async (req, res,err) => {
	//   // await GeneralSurveyModel.find({re},function (res,err ){
		
	
	   
	//  const students= await HealthSurveyModel.aggregate([
	// 	// {'$match':condition},
	// 	{'$limit':100000},
	// 	{'$lookup': {
	// 		'localField':'citizenId',
	// 		'from':'citizendetails',
	// 		'foreignField':'citizenId',
	// 		'as':'info'	
	// 	 }
	// 	},
	// 	{'$lookup': {
	// 		'localField':'citizenId',
	// 		'from':'citizens',
	// 		'foreignField':'citizenId',
	// 		'as':'citizens'
	// 	 }
	// 	},
	// 	{
	// 		$lookup: {
	// 		  localField: "screenerId",
	// 		  from: "screeners",
	// 		  foreignField: "screenerId",
	// 		  as: "screeners",
	// 		},
	// 	  },
			 
	// 	  // {'$unwind':{path:"$citizens", preserveNullAndEmptyArrays: true }},
	// 	  {'$unwind':{path:"$screeners", preserveNullAndEmptyArrays: true }},
	// 	{'$project':{
	// 		createdAt:1,
			
	// 		screenerfullname: {
	// 			$concat: ["$screeners.firstName", " ", "$screeners.lastName"],
	// 		  },
	// 		  address: "$info.address",
	// 		  mobile: "$citizens.mobile",
	// 		  // 'citizens.firstName':1,
	// 		  "citizens.firstName": 1,
	// 		  "citizens.lastName": 1,

	// 		  aadhaar: "$citizens.aadhaar",
	// 		'healthsurveyId':1,
	// 		'familyId':1,
	// 		'screenerId':1,
	// 		'citizenId':1,
	// 		'drinkingWaterSource':1,
	// 		'drinkingWaterDistance':1,
	// 		'isdrinkingWaterTreatmentRequired':1,
	// 		'NoOfPersonUsingToilets':1,
	// 		'NonUsageOfToilets':1,
	// 		'DistanceOfSubcenters':1,
	// 		'DistanceOfPrimaryHealthcenters':1,
	// 		'DistanceOfCommunityHealthcenters':1,
	// 		'DistanceOfDistrictHospitals':1,
	// 		'DistanceOfPathologyLab':1,
	// 		'DistanceOfMedicalStore':1,
	// 		'StatusOfDeliveryOfChildren': 1,
	// 		'StatusOfVaccinationOfChildren': 1,
	// 		'StatusOfFemaleRelatedProblem':1,
	// 		'CentrallyIssuedHealthInsurance':1,
	// 		'StateIssuedHealthInsurance': 1,
	// 		'PersonalHealthInsurance': 1,
	// 		'bpStatus':1,
	// 		'hbTestStatusFemale': 1,
	// 		'sugarTestStatus':1,
	// 		'smokingStatus':1,
	// 		'alcoholStatus': 1,
	// 		'tobaccoStatus': 1

	// 		}
	// 	}
	//   ])
	 
	 
  
	// 	  let csv
	// 	  csv = json2csv(students,{fields});
	   
	// 	  const filePath = path.join(__dirname,".." ,"public", "exports", "csv-"+"healthsurvey"+".csv")
	// 	  console.log("+++++",filePath);
	// 	  fs.writeFile(filePath, csv, function (err) {
	// 		if (err) {
	// 		  return res.json(err).status(500);
	// 		}
	// 		  return res.json(req.protocol + '://' + req.get('host')+"/exports/csv-" +"healthsurvey"+ ".csv");
	// 	})
	 
	
	// 	}
		async (req, res,err) => {
			// await GeneralSurveyModel.find({re},function (res,err ){
			  
		  
			 
		   const hsurvey= await HealthSurveyModel.aggregate([
			
			{ $sort: { createdAt: -1 } },
			{
			  $lookup: {
				localField: "citizenId",
				from: "citizens",
				foreignField: "citizenId",
				as: "citizens",
			  },
			},
		
			{
			  $lookup: {
				localField: "citizenId",
				from: "citizendetails",
				foreignField: "citizenId",
				as: "citizendetails",
			  },
			},
			{
			  $lookup: {
				localField: "screenerId",
				from: "screeners",
				foreignField: "screenerId",
				as: "screeners",
			  },
			},
		
			])
			// console.log(hsurvey);
		   
			let gserveyArr = [];
			if(hsurvey.length>0){
			  for(let i=0;i<hsurvey.length;i++){
				let row = hsurvey[i];
				let elemetObj = {};
				elemetObj.screenerfullname = "";
				if(row.screeners && row.screeners.length>0){   
				  elemetObj.screenerfullname = row.screeners[0].firstName+" "+row.screeners[0].lastName;  
				}  

				
				elemetObj.healthsurveyId = "'"+row.healthsurveyId+"'";
				elemetObj.familyId = "'"+row.familyId+"'";
				elemetObj.screenerId = "'"+row.screenerId+"'";
				elemetObj.citizenId = "'"+row.citizenId[row.citizenId.length-1]+"'";
				elemetObj.drinkingWaterSource = row.drinkingWaterSource;
				elemetObj.drinkingWaterDistance = row.drinkingWaterDistance;
			  elemetObj.isdrinkingWaterTreatmentRequired=row.isdrinkingWaterTreatmentRequired,
			   elemetObj.NoOfPersonUsingToilets=row.NoOfPersonUsingToilets,
			   elemetObj.NonUsageOfToilets=row.NonUsageOfToilets,
			   elemetObj.DistanceOfSubcenters=row.DistanceOfSubcenters,
			   elemetObj.DistanceOfPrimaryHealthcenters=row.DistanceOfPrimaryHealthcenters,
			   elemetObj.DistanceOfCommunityHealthcenters=row.DistanceOfCommunityHealthcenters,
			   elemetObj.DistanceOfDistrictHospitals=row.DistanceOfDistrictHospitals,
			   elemetObj.DistanceOfPathologyLab=row.DistanceOfPathologyLab,
			   elemetObj.DistanceOfMedicalStore=row.DistanceOfMedicalStore,
			   elemetObj.StatusOfDeliveryOfChildren=row.StatusOfDeliveryOfChildren,
               elemetObj.StatusOfVaccinationOfChildren=row.StatusOfVaccinationOfChildren,
               elemetObj.StatusOfFemaleRelatedProblem=row.StatusOfFemaleRelatedProblem,
               elemetObj.CentrallyIssuedHealthInsurance=row.CentrallyIssuedHealthInsurance,
			   elemetObj.StateIssuedHealthInsurance=row.StateIssuedHealthInsurance,
			   elemetObj.PersonalHealthInsurance=row.PersonalHealthInsurance,
			   elemetObj.bpStatus=row.bpStatus,
			   elemetObj.hbTestStatusFemale=row.hbTestStatusFemale,
			   elemetObj.sugarTestStatus=row.sugarTestStatus,
			   elemetObj.smokingStatus=row.smokingStatus,
			   elemetObj.alcoholStatus=row.alcoholStatus,
			   elemetObj.tobaccoStatus=row.tobaccoStatus,
			   elemetObj.createdAt=row.createdAt,






			   elemetObj.familymembername = "";
				elemetObj.gender = "";
				elemetObj.mobile = "";
				elemetObj.aadhaar = "";
				if(row.citizens && row.citizens.length>0){ 
				  let familymembername = "";
				  for(let k=0;k<row.citizens.length;k++){
					familymembername = familymembername+" "+row.citizens[k].firstName+" "+row.citizens[k].lastName+",";  
					familymembername.replace(/^\,s+/, '');  
				  }
				  elemetObj.familymembername = familymembername ;
				  //elemetObj.fullname = row.citizens[0].firstName+" "+row.citizens[0].lastName;    
				  // elemetObj.gender = row.citizens[0].sex;    
				  elemetObj.mobile = row.citizens[0].mobile;    
				  elemetObj.aadhaar = row.citizens[0].aadhaar;  
				}  
			  
				elemetObj.dateOfBirth = "";    
				elemetObj.address = "";
				if(row.citizendetails && row.citizendetails.length>0){    
				  elemetObj.dateOfBirth = row.citizendetails[0].dateOfBirth;    
				  elemetObj.address = row.citizendetails[0].address;    
				}
		
				gserveyArr.push(elemetObj);
			  }
			}
		
		
		
				let csv
				csv = json2csv(gserveyArr,{fields});
			 
				const filePath = path.join(__dirname,".." ,"public", "exports", "csv-"+"healthsurvey"+".csv")
				console.log("+++++",gserveyArr);
				fs.writeFile(filePath, csv, function (err) {
				  if (err) {
					return res.json(err).status(500);
				  }
					return res.json(req.protocol + '://' + req.get('host')+"/exports/csv-" +"healthsurvey"+ ".csv");
			  })
		   
		  
			  }
		   
	 
	
  ]
 exports.HealthSurveyList=[
//  //    body("familyId").isLength({ min: 3 }).trim().withMessage("Invalid familyId!"),
// 	// sanitizeBody("familyId").escape(),
	
    (req, res) => { 
			
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
				var condition={};
				if(req.body.familyId!='' && req.body.familyId!=undefined && req.body.familyId!=null){
					condition['familyId']=req.body.familyId;
				}
				
				HealthSurveyModel.aggregate([
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
								'as':'citizens'
							 }
							},
							{
								$lookup: {
								  localField: "screenerId",
								  from: "screeners",
								  foreignField: "screenerId",
								  as: "screeners",
								},
							  },
								 
							  // {'$unwind':{path:"$citizens", preserveNullAndEmptyArrays: true }},
							  {'$unwind':{path:"$screeners", preserveNullAndEmptyArrays: true }},
							{'$project':{
								createdAt:1,
								
								screenerfullname: {
									$concat: ["$screeners.firstName", " ", "$screeners.lastName"],
								  },
								  address: "$info.address",
								  mobile: "$citizens.mobile",
								  // 'citizens.firstName':1,
								  firstname:"$citizens.firstName",
								  lastName:"$citizens.lastName",
					
								aadhaar: "$citizens.aadhaar",
								'healthsurveyId':1,
								'familyId':1,
								'screenerId':1,
								'citizenId':1,
								'drinkingWaterSource':1,
								'drinkingWaterDistance':1,
								'isdrinkingWaterTreatmentRequired':1,
								'NoOfPersonUsingToilets':1,
								'NonUsageOfToilets':1,
								'DistanceOfSubcenters':1,
								'DistanceOfPrimaryHealthcenters':1,
								'DistanceOfCommunityHealthcenters':1,
								'DistanceOfDistrictHospitals':1,
								'DistanceOfPathologyLab':1,
								'DistanceOfMedicalStore':1,
								'StatusOfDeliveryOfChildren': 1,
								'StatusOfVaccinationOfChildren': 1,
								'StatusOfFemaleRelatedProblem':1,
								'CentrallyIssuedHealthInsurance':1,
								'StateIssuedHealthInsurance': 1,
								'PersonalHealthInsurance': 1,
								'bpStatus':1,
								'hbTestStatusFemale': 1,
								'sugarTestStatus':1,
								'smokingStatus':1,
								'alcoholStatus': 1,
								'tobaccoStatus': 1

								}
							},
							{$sort:{'createdAt':-1}},
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