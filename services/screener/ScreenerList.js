/* ./services/screener */
const ScreenerModel = require("../../models/ScreenerModel");

const { body,query,validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
//helper file to prepare responses.
const apiResponse = require("../../helpers/apiResponse");
const utility = require("../../helpers/utility");
const jwt = require("jsonwebtoken");
const { constants } = require("../../helpers/constants");

exports.screenerList=[
    body("userId").isLength({ min: 3 }).trim().withMessage("Invalid Credential!"),
	//body("ngoId").isLength({ min: 1 }).trim().withMessage("Invalid NGO ID !"),
	body("token").isLength({ min: 3 }).trim().withMessage("Invalid Token!"),
	sanitizeBody("userId").escape(),
	sanitizeBody("ngoId").escape(),
	sanitizeBody("parentId").escape(),
	sanitizeBody("issubscreener").escape(),
	sanitizeBody("ismapped").escape(),
    (req, res) => { 
			
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
			var condition={};
				if(req.body.ngoId!='' && req.body.ngoId!=undefined && req.body.ngoId!=null){
					condition['ngoId']=req.body.ngoId;
				}
				 if(req.body.ismapped!='' && req.body.ismapped!=undefined && req.body.ismapped!=null){
				 	if(req.body.ismapped===0 || req.body.ismapped==='0'){
				 		condition['ngoId']="0";
				 	}
				 	else{
				 		condition['ngoId']={ '$exists': true };
				 	}
				 }

				if(req.body.parentId!='' && req.body.parentId!=undefined && req.body.parentId!=null){
					condition['parentId']=req.body.parentId;
				}
				if(req.body.issubscreener!='' && req.body.issubscreener!=undefined && req.body.issubscreener!=null){
					condition['issubscreener']=Number(req.body.issubscreener);
				}
				
				console.dir(condition);

			ScreenerModel.Screener.aggregate([
							{'$match':condition},
							{'$limit':100000},
							{'$lookup': {
								'localField':'screenerId',
								'from':'screenerdetails',
								'foreignField':'screenerId',
								'as':'info'	
							 }
							},
							{'$lookup': {
								'localField':'screenerId',
								'from':'screeningcases',
								'foreignField':'screenerId',
								'as':'cases'	
							 }
							},
							{'$lookup': {
								'localField':'screenerId',
								'from':'generalsurveys',
								'foreignField':'screenerId',
								'as':'generalsurveys'	
							 }
							},
							{'$lookup': {
								'localField':'screenerId',
								'from':'healthsurveys',
								'foreignField':'screenerId',
								'as':'healthsurveys'	
							 }
							},
							{'$lookup': {
								'localField':'screenerId',
								'from':'socioeconomicsurveys',
								'foreignField':'screenerId',
								'as':'socioeconomicsurveys'	
							 }
							},
							{'$lookup': {
								'localField':'screenerId',
								'from':'citizens',
								'foreignField':'screenerId',
								'as':'citizens'	
							 }
							},
							{'$unwind':'$info'},
							{'$project':{
								'fullname': {$concat: ["$firstName", " ", "$lastName"]},
								 'screenerId':1,
								 'firstName':1,
								 'lastName':1,
								 'sex':1,
								 'mobile':1,
								 'mobile1':1,
								 'email':1,
								 'ngoId':1,
								 'parentId':1,
								 'issubscreener':1,
								// "issubscreener": {
								// 	"$cond": [
								// 	   { "$eq": [ "$issubscreener", "0" ] }, 
								// 	sanyojika,
								// 	   { "$cond": [
								// 		 { "$eq": ["$issubscreener","1"] },
								// 		 sevika, 
										 
								// 	   ]}
								// 	]
								//   },
								 'screenerLoginId':1,
								 'createdAt':1,
								 'info.dateOfBirth':1,
								 'info.dateOfOnBoarding':1,
								 'info.qualification':1,
								 'info.specialisation':1,
								 'info.country':1,
								 'info.state':1,
								 'info.district':1,
								 'info.address':1,
								 'info.pincode':1,
								 'info.rating':1,
								 'info.photo':1,
								 'numOfCases':{'$size':"$cases"},
								 'numOfGeneralSurveys':{'$size':"$generalsurveys"},
								 'numOfHealthSurveys':{'$size':"$healthsurveys"},
								 'numOfCitizens':{'$size':"$citizens"},
								 'numOfSocioEconomicSurveys':{'$size':"$socioeconomicsurveys"},
								 'age': { $round: [{$divide: [{$subtract: [ new Date(), "$info.dateOfBirth" ] }, 
											(365 * 24*60*60*1000)]},
								  ]
									
								},
								},
						
							}
						]
				).then(users => {
					
					let user=users[0];
					var temp=[];
					if (user) {
						console.log(users.length);
						if(req.body.ismapped!='' && req.body.ismapped!=undefined && req.body.ismapped!=null){
						for(var i=0;i<users.length;i++){

							console.log(users);
							
								if(req.body.ismapped===0 || req.body.ismapped==='0'){
									if(users[i].parentId===""){
										temp.push(users[i]);
									}
								}
								else{
									if(users[i].parentId!=""){
										temp.push(users[i]);
									}
								}
							}
							users=temp;
						}
						
						for(var j=0;j<users.length;j++){
							users[j].createdAt=utility.toDDmmyy(users[j].createdAt);
							users[j].info.dateOfOnBoarding=utility.toDDmmyy(users[j].info.dateOfOnBoarding);
							users[j].info.dateOfBirth=utility.toDDmmyy(users[j].info.dateOfBirth);
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
// exports.screenerListByStatus=[
// 	body("email").isLength({ min: 1 }).trim().withMessage("Email must be specified.")
// 		.isEmail().withMessage("Email must be a valid email address."),
	
// 	body("status").isLength({ min: 1,max:1 }).trim().withMessage("Fill Status 0 to 9.").isNumeric().withMessage("status 0-9"),
		
// 	sanitizeBody("email").escape(),
// 	sanitizeBody("status").escape(),
// 	sanitizeBody("searchterm").escape(),
// 	sanitizeBody("ngoId").escape(),
//     (req, res) => { 
			
// 		try {
// 			const errors = validationResult(req);
// 			if (!errors.isEmpty()) {
// 				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
// 			}else {
// 					var _istatus=parseInt(req.body.status);
// 					var term="";
// 					var setfield={"ngoId":{'$ne':-1}};
// 					if(req.body.roleId!=null && req.body.ngoId!=undefined && req.body.ngoId!=""){
// 						role=parseInt(req.body.ngoId);
// 						setfield["ngoId"]={"$eq":role};
// 					}
// 					if(req.body.searchterm!=null){
// 						term="(?i)"+req.body.searchterm;
// 					}
// 					console.log(setfield);
					
// 					ScreenerModel.Screener.aggregate([
// 							{'$match':{'$and':[{'status':_istatus},setfield,{'ngoId':{'$ne':6}}]}},
// 							{'$limit':1000},
// 							{'$lookup': {
// 								'localField':'screenerId',
// 								'from':'screenerdetails',
// 								'foreignField':'screenerId',
// 								'as':'info'	
// 							 }
// 							},
// 							{'$lookup': {
// 								'localField':'screenerId',
// 								'from':'screeningcases',
// 								'foreignField':'screenerId',
// 								'as':'cases'	
// 							 }
// 							},
// 							{'$lookup': {
// 								'localField':'screenerId',
// 								'from':'generalsurveys',
// 								'foreignField':'screenerId',
// 								'as':'generalsurveys'	
// 							 }
// 							},
// 							{'$lookup': {
// 								'localField':'screenerId',
// 								'from':'healthsurveys',
// 								'foreignField':'screenerId',
// 								'as':'healthsurveys'	
// 							 }
// 							},
// 							{'$lookup': {
// 								'localField':'screenerId',
// 								'from':'socioeconomicsurveys',
// 								'foreignField':'screenerId',
// 								'as':'socioeconomicsurveys'	
// 							 }
// 							},
// 							{'$lookup': {
// 								'localField':'screenerId',
// 								'from':'citizens',
// 								'foreignField':'screenerId',
// 								'as':'citizens'	
// 							 }
// 							},
// 							{'$unwind':'$info'},
// 							{'$project':{
								 
// 								 'email':1,
// 								 'isConfirmed':1,
// 								 'status':1,
// 								 'ngoId':1,
// 								 'userId':1,
// 								 'info.firstName':1,
// 								 'info.lastName':1,
// 								 'info.isBlocked':1,
// 								 'info.isExpired':1,
// 								 'info.ismapped':1,
// 								 'info.phoneNo':1,
// 								 'info.phoneNo1':1
// 								}
// 							},
// 							{'$match':{'$or':[{'info.lastName':{'$regex':term}},{'email':{'$regex':term}},{'info.phoneNo':{'$regex':term}},{'info.firstName':{'$regex':term}}]}},
// 						]
// 				).then(users => {
					
					
// 					if (users) {
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

exports.updatescreenerList = [
   
    
	body("ngoId").isLength({ min: 3 }).trim().withMessage("user must atleast 3 chars!").custom((value) => {
			return UserModel.findOne({ngoId : value}).then((user) => {
				if (user) {}
				else return Promise.reject("Invalid User Selection");
			});
		}),
	body("status").isLength({ min: 1,max:1 }).trim().withMessage("Invalid Status!").isNumeric().withMessage("status 0-9"),
	// body("isBlocked").isLength({ min: 1,max:1 }).trim().withMessage("Blocked Status 0|1!").isNumeric().withMessage("isBlocked should be 0|1"),
	// body("isExpired").isLength({ min: 1,max:1 }).trim().withMessage("Expired Status 0|1!").isNumeric().withMessage("isExpired should be 0|1"),
	body("ismapped").isLength({ min: 1,max:1 }).trim().withMessage("nActive Status 0|1!").isNumeric().withMessage("isUnActive should be 0|1"),
	
	sanitizeBody("ngoId").escape(),
	sanitizeBody("status").escape(),
	// sanitizeBody("isBlocked").escape(),
	// sanitizeBody("isExpired").escape(),
	sanitizeBody("ismapped").escape(),
	
	(req, res) => { 
			
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
					
					
				ScreenerModel.Screener.findOneAndUpdate({'ngoId':req.body.ngoId},{'$set':{'status':req.body.status}},function(err,resDoc)
								{
									 if (err) {
										return apiResponse.ErrorResponse(res, err); 
									 }
									 else
									 {  
										if(resDoc)
										{
											
											ScreenerModel.Screener.findOneAndUpdate({'userId':req.body.forUserId},{'$set':{'ismapped':req.body.ismapped}},function(ierr,iresDoc)
												{
													 if (ierr) {
														return apiResponse.ErrorResponse(res, ierr); 
													 }
													 else
													 {  
														if(iresDoc)
														{
															
															return apiResponse.successResponse(res,"Updated Successfullly.");
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
			
			return apiResponse.ErrorResponse(res,"EXp:"+err);
		}
	}];

exports.screenerProfile=[
    //body("screenerId").isLength({ min: 3 }).trim().withMessage("Invalid screenerId Credential!"),
	
	body("token").isLength({ min: 3 }).trim().withMessage("Invalid Token!"),
	sanitizeBody("screenerId").escape(),
	sanitizeBody("userId").escape(),
	sanitizeBody("token").escape(),
	
    (req, res) => { 
			
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
			ScreenerModel.Screener.aggregate([
							{'$match':{'$or':[{'screenerId':req.body.screenerId},{'screenerLoginId':req.body.userId}]}},
							{'$limit':100000},
							{'$lookup': {
								'localField':'screenerId',
								'from':'screenerdetails',
								'foreignField':'screenerId',
								'as':'info'	
							 }
							},
							{'$unwind':'$info'},
							{'$project':{
								 
								 'screenerId':1,
								 'firstName':1,
								 'lastName':1,
								 'sex':1,
								 'mobile':1,
								 'mobile1':1,
								 'email':1,
								 'screenerLoginId':1,
								 'createdAt':1,
								 'info.dateOfBirth':1,
								 'info.dateOfOnBoarding':1,
								 'info.qualification':1,
								 'info.specialisation':1,
								 'info.country':1,
								 'info.state':1,
								 'info.district':1,
								 'info.address':1,
								 'info.pincode':1,
								 'info.rating':1,
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
							users[i].info.dateOfBirth=utility.toDDmmyy(users[i].info.dateOfBirth);
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
exports.updateScreenerMapAuth = [
	body("screenerId").isLength({ min: 3 }).trim().withMessage("Invalid doctors ID!").custom((value) => {
		return ScreenerModel.Screener.findOne({screenerId : value}).then((user) => {
			if (user) {}
			else return Promise.reject("Invalid Doctor id");
		});
	}),
		// body("status").isLength({ min: 1,max:1 }).trim().withMessage("Invalid Status!").isNumeric().withMessage("status 0-9"),
		// body("pstatus").isLength({ min: 1,max:1 }).trim().withMessage("Blocked Status 0|1!").isNumeric().withMessage("isBlocked should be 0|1"),
		// body("isInstant").isLength({ min: 1,max:1 }).trim().withMessage("Expired Status 0|1!").isNumeric().withMessage("isExpired should be 0|1"),
		// body("isUnrefer").isLength({ min: 1,max:1 }).trim().withMessage("nActive Status 0|1!").isNumeric().withMessage("isUnActive should be 0|1"),
		
		sanitizeBody("screenerId").escape(),
		// sanitizeBody("issubscreener").escape(),
		// sanitizeBody("pstatus").escape(),
		// sanitizeBody("isInstant").escape(),
		// sanitizeBody("ismapped").escape(),
		
		(req, res) => { 
				
			try {
				const errors = validationResult(req);
				if (!errors.isEmpty()) {
					return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
				}else {
						
						
					ScreenerModel.Screener.findOneAndUpdate({'screenerId':req.body.screenerId},{'$set':{'status':req.body.status}},function(err,resDoc)
									{
										 if (err) {
											return apiResponse.ErrorResponse(res, err); 
										 }
										 else
										 {  
											if(resDoc)
											{
												
												ScreenerModel.Screener.findOneAndUpdate({'screenerId':req.body.screenerId},{'$set':{'ismapped':req.body.ismapped}},function(ierr,iresDoc)
													{
														 if (ierr) {
															return apiResponse.ErrorResponse(res, ierr); 
														 }
														 else
														 {  
															if(iresDoc)
															{
																
																return apiResponse.successResponse(res,"Updated Successfullly.");
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
				
				return apiResponse.ErrorResponse(res,"EXp:"+err);
			}
		}];
		
		exports.updateAddmappedscreener= [
			(req, res) => { 
				
				// let id = req.params.id;
		
	
				// const annoucement = await Announcements.updateOne(req.body, { where: { id: id }})
			  
				ScreenerModel.Screener.update({},{$set : {"ismapped": false}}, {upsert:false, multi:true})
	
			  
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
	
			// (req, res) => { 
					
			// 	try {
			// 		const errors = validationResult(req);
			// 		if (!errors.isEmpty()) {
			// 			return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			// 		}else {
							
							
			// 			CitizenModel.Citizen.update({},{$set : {"isUnrefer": false}}, {upsert:false, multi:true})
						
	
			// 			return apiResponse.successResponseWithData(res,"Successfully Updated");
							
							
			// 		}
			// 	} catch (err) {
					
			// 		return apiResponse.ErrorResponse(res,"EXp:"+err);
			// 	}
			// }
		];
		
		exports.screenermappedList=[
			body("token").isLength({ min: 3 }).trim().withMessage("Invalid Token!"),
			// body("isUnrefer").isLength({ min: 1,max:1 }).trim().withMessage("nActive Status 0|1!").isNumeric().withMessage("isUnActive should be 0|1"),
			// sanitizeBody("isUnrefer").escape(),
			(req, res) => { 
					
				try {
					const errors = validationResult(req);
					if (!errors.isEmpty()) {
						return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
					}else {
						ScreenerModel.Screener.aggregate([
						 {'$match':{'ismapped':true,'issubscreener':0}},
									{'$sort':{'createdAt':-1}},
									{'$limit':100},

									{'$project':{
										'fullname': {$concat: ["$firstName", " ", "$lastName"]},
										 'screenerId':1,
										 'firstName':1,
										 'lastName':1,
										 'sex':1,
										 'mobile':1,
										 'mobile1':1,
										 'email':1,
										 'ngoId':1,
										 'parentId':1,
										 'issubscreener':1,
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
					}
				} catch (err) {
					
					return apiResponse.ErrorResponse(res,"EXp:"+err);
				}
			}
		
		
		];
		exports.screenerunmappedList=[
			body("token").isLength({ min: 3 }).trim().withMessage("Invalid Token!"),
			// body("isUnrefer").isLength({ min: 1,max:1 }).trim().withMessage("nActive Status 0|1!").isNumeric().withMessage("isUnActive should be 0|1"),
			// sanitizeBody("isUnrefer").escape(),
			(req, res) => { 
					
				try {
					const errors = validationResult(req);
					if (!errors.isEmpty()) {
						return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
					}else {
						ScreenerModel.Screener.aggregate([
						 {'$match':{'ismapped':false,'issubscreener':0}},
									{'$sort':{'createdAt':-1}},
									{'$limit':100},

									{'$project':{
										'fullname': {$concat: ["$firstName", " ", "$lastName"]},
										 'screenerId':1,
										 'firstName':1,
										 'lastName':1,
										 'sex':1,
										 'mobile':1,
										 'mobile1':1,
										 'email':1,
										 'ngoId':1,
										 'parentId':1,
										 'issubscreener':1,
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
					}
				} catch (err) {
					
					return apiResponse.ErrorResponse(res,"EXp:"+err);
				}
			}
		
		
		];
			
		exports.sevikamappedList=[
			body("token").isLength({ min: 3 }).trim().withMessage("Invalid Token!"),
			// body("isUnrefer").isLength({ min: 1,max:1 }).trim().withMessage("nActive Status 0|1!").isNumeric().withMessage("isUnActive should be 0|1"),
			// sanitizeBody("isUnrefer").escape(),
			(req, res) => { 
					
				try {
					const errors = validationResult(req);
					if (!errors.isEmpty()) {
						return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
					}else {
						ScreenerModel.Screener.aggregate([
						 {'$match':{'ismapped':true,'issubscreener':1}},
									{'$sort':{'createdAt':-1}},
									{'$limit':100},

									{'$project':{
										'fullname': {$concat: ["$firstName", " ", "$lastName"]},
										 'screenerId':1,
										 'firstName':1,
										 'lastName':1,
										 'sex':1,
										 'mobile':1,
										 'mobile1':1,
										 'email':1,
										 'ngoId':1,
										 'parentId':1,
										 'issubscreener':1,
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
					}
				} catch (err) {
					
					return apiResponse.ErrorResponse(res,"EXp:"+err);
				}
			}
		
		
		];
		exports.sevikaunmappedList=[
			body("token").isLength({ min: 3 }).trim().withMessage("Invalid Token!"),
			// body("isUnrefer").isLength({ min: 1,max:1 }).trim().withMessage("nActive Status 0|1!").isNumeric().withMessage("isUnActive should be 0|1"),
			// sanitizeBody("isUnrefer").escape(),
			(req, res) => { 
					
				try {
					const errors = validationResult(req);
					if (!errors.isEmpty()) {
						return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
					}else {
						ScreenerModel.Screener.aggregate([
						 {'$match':{'ismapped':false,'issubscreener':1}},
									{'$sort':{'createdAt':-1}},
									{'$limit':100},

									{'$project':{
										'fullname': {$concat: ["$firstName", " ", "$lastName"]},
										 'screenerId':1,
										 'firstName':1,
										 'lastName':1,
										 'sex':1,
										 'mobile':1,
										 'mobile1':1,
										 'email':1,
										 'ngoId':1,
										 'parentId':1,
										 'issubscreener':1,
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
					}
				} catch (err) {
					
					return apiResponse.ErrorResponse(res,"EXp:"+err);
				}
			}
		
		
		];