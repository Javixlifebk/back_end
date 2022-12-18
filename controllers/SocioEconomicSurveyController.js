const CitizenModel = require("../models/CitizenModel");
const ScreenerModel = require("../models/ScreenerModel");
const UserModel = require("../models/UserModel");
const SocioEconomicSurveyModel = require("../models/SocioEconomicSurveyModel");
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
'createdAt',
'screenerfullname',
'address',
'mobile',
'firstName',
'lastName',
'aadhaar',
'socioeconomicsurveyId',
'familyId',
'screenerId',
'citizenId',
'noOfEarners',
'nameOfEarners',
'ageOfEarners',
'occupationOfEarners',
'isBankAccount',
'statusOfHouse',
'totalIncome',
'foodExpense',
'healthExpense',
'educationExpense',
'intoxicationExpense',
'conveyanceExpense',
'cultivableLand',
];

exports.addSocioEconomicSurvey = [
    
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
	// body("noOfEarners").isLength({ min: 1 }).trim().withMessage("Enter Number of earners"),
	// body("nameOfEarners").isLength({ min: 1}).trim().withMessage("Enter Name of earners"),
	// body("ageOfEarners").isLength({ min: 1 }).trim().withMessage("Enter Age of earners"),
	// body("occupationOfEarners").isLength({ min: 1}).trim().withMessage("Enter Occupation of top earner"),
	// body("isBankAccount").isLength({ min: 1 }).trim().withMessage("Enter Family member have bank account?"),
	// body("statusOfHouse").isLength({ min: 1}).trim().withMessage("Enter Status of house"),
	// body("totalIncome").isLength({ min: 1}).trim().withMessage("Enter Total income of family annually (IN RUPEES)"),
 	
 // 	body("foodExpense").isLength({ min: 1 }).trim().withMessage("Enter Expense on food monthly (IN RUPEES)"),
	// body("healthExpense").isLength({ min: 1}).trim().withMessage("Enter Expense on health annually (IN RUPEES)"),
	// body("educationExpense").isLength({ min: 1 }).trim().withMessage("Enter Expense on education annually ( IN RUPEES)"),
	// body("intoxicationExpense").isLength({ min: 1}).trim().withMessage("Enter Expense on intoxication like tobacco and alcohol monthly (IN RUPEES)"),
	// body("conveyanceExpense").isLength({ min: 1 }).trim().withMessage("Enter Other expenses like conveyance/consumable goods/clothing/footwear annually (IN RUPEES)"),
	// body("cultivableLand").isLength({ min: 1}).trim().withMessage("Amount of cultivable land owned by family (IN HECTARES)"),
 	body("familyId").isLength({ min: 1}).trim().withMessage("Enter Family Id"),
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
									var recSocioEconomicSurvey={
											socioeconomicsurveyId:ID,
											familyId:req.body.familyId,
											screenerId:req.body.screenerId,
											citizenId:req.body.citizenId,
											noOfEarners: req.body.noOfEarners,
											nameOfEarners: req.body.nameOfEarners,
											ageOfEarners:req.body.ageOfEarners,
											occupationOfEarners:req.body.occupationOfEarners,
											isBankAccount: req.body.isBankAccount,
											statusOfHouse: req.body.statusOfHouse,
											totalIncome:req.body.totalIncome,
											foodExpense:req.body.foodExpense,
											healthExpense:req.body.healthExpense,
											educationExpense:req.body.educationExpense,
											intoxicationExpense:req.body.intoxicationExpense,
											conveyanceExpense: req.body.conveyanceExpense,
											cultivableLand: req.body.cultivableLand
									};

									var actionSocioEconomicSurvey=new SocioEconomicSurveyModel(recSocioEconomicSurvey);
									actionSocioEconomicSurvey.save(function(_error)
									{
										if(_error){ return apiResponse.ErrorResponse(res, "Sorry:"+_error);}
										else
										{		
												
												return apiResponse.successResponseWithData(res,"Successfully Submitted",recSocioEconomicSurvey);
												//return apiResponse.successResponseWithData(res,"Successfully Submitted", recVisualExam);
										}
									}
									);
					}
					
					
					
			
			
		} catch (err) {
			return apiResponse.ErrorResponse(res,err);
		}
	}];




exports.sociosurveydownload = [ 
	async (req, res,err) => {
	  // await GeneralSurveyModel.find({re},function (res,err ){
		
	
	   
	 const students= await SocioEconomicSurveyModel.aggregate([
		// {'$match':condition},
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
			 
		  {'$unwind':{path:"$citizens", preserveNullAndEmptyArrays: true }},
		  {'$unwind':{path:"$screeners", preserveNullAndEmptyArrays: true }},
		{'$project':{
			createdAt:1,
			screenerfullname: {
				$concat: ["$screeners.firstName", " ", "$screeners.lastName"],
			  },
			  address: "$info.address",
			  mobile: "$citizens.mobile",
			  // 'citizens.firstName':1,
			  firstName:"$citizens.firstName",
			  lastName:"$citizens.lastName",

			  aadhaar: "$citizens.aadhaar",
			
			 
			'socioeconomicsurveyId':1,
						'familyId':1,
						'screenerId':1,
						'citizenId':1,
						'noOfEarners':1,
						'nameOfEarners':1,
						'ageOfEarners':1,
						'occupationOfEarners':1,
						'isBankAccount': 1,
						'statusOfHouse': 1,
						'totalIncome':1,
						'foodExpense':1,
						'healthExpense':1,
						'educationExpense':1,
						'intoxicationExpense':1,
						'conveyanceExpense':1,
						'cultivableLand': 1,
						"isdeleted":1
			}
		},
		{'$match':{"isdeleted":false}}
	  ])
	 
	 
		  let csv
		  csv = json2csv(students,{fields});
	   
		  const filePath = path.join(__dirname,".." ,"public", "exports", "csv-"+"socioeconomicsurvey"+".csv")
		  console.log("+++++",filePath);
		  fs.writeFile(filePath, csv, function (err) {
			if (err) {
			  return res.json(err).status(500);
			}
			  return res.json(req.protocol + '://' + req.get('host')+"/exports/csv-" +"socioeconomicsurvey"+ ".csv");
		})
	 
	
		}
	 
	
  ]
exports.SocieSurveyList=[
 //    body("familyId").isLength({ min: 3 }).trim().withMessage("Invalid familyId!"),
	// sanitizeBody("familyId").escape(),
	
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
				
				 SocioEconomicSurveyModel.aggregate([
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
							{	$lookup: {
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
								  "citizens.firstName": 1,
								  "citizens.lastName": 1,
					
								  aadhaar: "$citizens.aadhaar",
								
								 
								'socioeconomicsurveyId':1,
											'familyId':1,
											'screenerId':1,
											citizenId:'$citizenId',
											'noOfEarners':1,
											'nameOfEarners':1,
											'ageOfEarners':1,
											'occupationOfEarners':1,
											'isBankAccount': 1,
											'statusOfHouse': 1,
											'totalIncome':1,
											'foodExpense':1,
											'healthExpense':1,
											'educationExpense':1,
											'intoxicationExpense':1,
											'conveyanceExpense':1,
											'cultivableLand': 1,
											"isdeleted":1
								}
							},
							// {'$match':{"isdeleted":false}}
							{'$match':{"isdeleted":false}},
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


// -----------------add in sociosurvey collection isdeleted field--------------------
exports.updateAddSocioSurvey= [
	(req, res) => { 
		SocioEconomicSurveyModel.update({},{$set : {"isdeleted": false}}, {upsert:false, multi:true})
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
  
  // -----------------update in sociosurvey collection isdeleted true or false field--------------------
  
  exports.updateSocioSurveyDeleted = [
  
  (req, res) => {
  
	try {
	  const errors = validationResult(req);
	  if (!errors.isEmpty()) {
		return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
	  } else {
  
  
		SocioEconomicSurveyModel.updateMany({ 'screenerId': req.body.screenerId }, { '$set': { 'isdeleted':req.body.isdeleted } }, function (err, resDoc) {
		  if (err) {
			return apiResponse.ErrorResponse(res, err);
		  }
		  else {
			if (resDoc) {
  
				SocioEconomicSurveyModel.updateMany({ 'screenerId': req.body.screenerId }, { '$set': { 'isdeleted':req.body.isdeleted } },function (ierr, iresDoc) {
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
  }
  ];
