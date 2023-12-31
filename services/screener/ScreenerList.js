/* ./services/screener */
const ScreenerModel = require("../../models/ScreenerModel");
const tmp_out0Model = require("../../models/tmp_out0Model");

const { body, query, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
//helper file to prepare responses.
const apiResponse = require("../../helpers/apiResponse");
const utility = require("../../helpers/utility");
const jwt = require("jsonwebtoken");
const { constants } = require("../../helpers/constants");

// exports.screenerList=[
//     body("userId").isLength({ min: 3 }).trim().withMessage("Invalid Credential!"),
// 	//body("ngoId").isLength({ min: 1 }).trim().withMessage("Invalid NGO ID !"),
// 	body("token").isLength({ min: 3 }).trim().withMessage("Invalid Token!"),
// 	sanitizeBody("userId").escape(),
// 	sanitizeBody("ngoId").escape(),
// 	sanitizeBody("parentId").escape(),
// 	sanitizeBody("issubscreener").escape(),
// 	sanitizeBody("ismapped").escape(),

//     (req, res) => { 

// 		const { pageNo, size} = req.body
// 		console.log(req.body);
// 		if (pageNo < 0 || pageNo === 0) {
// 		  response = {
// 			error: true,
// 			message: 'invalid page number, should start with 1',
// 		  }
// 		  return res.json(response)
// 		}
// 		const query = {}
// 		query.skip = size * (pageNo - 1)
// 		query.limit = size
// 		console.log(query);
// 		var condition={};
// 				if(req.body.ngoId!='' && req.body.ngoId!=undefined && req.body.ngoId!=null){
// 					condition['ngoId']=req.body.ngoId;
// 				}
// 				 if(req.body.ismapped!='' && req.body.ismapped!=undefined && req.body.ismapped!=null){
// 				 	if(req.body.ismapped===0 || req.body.ismapped==='0'){
// 				 		condition['ngoId']="0";
// 				 	}
// 				 	else{
// 				 		condition['ngoId']={ '$exists': true };
// 				 	}
// 				 }

// 				if(req.body.parentId!='' && req.body.parentId!=undefined && req.body.parentId!=null){
// 					condition['parentId']=req.body.parentId;
// 				}
// 				if(req.body.issubscreener!='' && req.body.issubscreener!=undefined && req.body.issubscreener!=null){
// 					condition['issubscreener']=Number(req.body.issubscreener);
// 				}

// 				console.dir(condition);

// 		// Find some documents
// 		ScreenerModel.Screener.count({}, async (err, totalCount) => {
// 		  if (err) {
// 			response = { error: true, message: 'Error fetching data' }
// 		  }
// 		  ScreenerModel.Screener.find({}, {}, query, async (err, data) => {
// 			// Mongo command to fetch all data from collection.
// 			// const post_id = data.post_id
// 			if (err) {
// 			  response = { error: true, message: 'Error fetching data' }
// 			} else {

// 			ScreenerModel.Screener.aggregate([
// 							// {'$match':condition},

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
// 								'fullname': {$concat: ["$firstName", " ", "$lastName"]},
// 								 'screenerId':1,
// 								 'firstName':1,
// 								 'lastName':1,
// 								 'sex':1,
// 								 'mobile':1,
// 								 'mobile1':1,
// 								 'email':1,
// 								 'ngoId':1,
// 								 'parentId':1,
// 								 'issubscreener':{
// 									"$switch": {
// 									  "branches": [
// 										{ "case": { "$eq": ["$issubscreener", 0] }, "then": "Sanyojika" },
// 										{ "case": { "$eq": ["$issubscreener", 1] }, "then": "Sevika" },

// 									  ],
// 									  "default": "none"
// 									},
// 								  },
// 								// "issubscreener": {
// 								// 	"$cond": [
// 								// 	   { "$eq": [ "$issubscreener", "0" ] }, 
// 								// 	sanyojika,
// 								// 	   { "$cond": [
// 								// 		 { "$eq": ["$issubscreener","1"] },
// 								// 		 sevika, 

// 								// 	   ]}
// 								// 	]
// 								//   },
// 								 'screenerLoginId':1,
// 								 'createdAt':1,
// 								 'info.dateOfBirth':1,
// 								 'info.dateOfOnBoarding':1,
// 								 'info.qualification':1,
// 								 'info.specialisation':1,
// 								 'info.country':1,
// 								 'info.state':1,
// 								 'info.district':1,
// 								 'info.address':1,
// 								 'info.pincode':1,
// 								 'info.rating':1,
// 								 'info.photo':1,
// 								 'numOfCases':{'$size':"$cases"},
// 								 'numOfGeneralSurveys':{'$size':"$generalsurveys"},
// 								 'numOfHealthSurveys':{'$size':"$healthsurveys"},
// 								 'numOfCitizens':{'$size':"$citizens"},
// 								 'numOfSocioEconomicSurveys':{'$size':"$socioeconomicsurveys"},
// 								 'age': { $round: [{$divide: [{$subtract: [ new Date(), "$info.dateOfBirth" ] }, 
// 											(365 * 24*60*60*1000)]},
// 								  ]

// 								},
// 								},

// 							},
// 						{'$match': {condition } },
// 					   {$sort:{'createdAt':-1}},
// 					   { $skip: query.skip },
// 					   { $limit: query.limit },
// 						])
// 							.exec((err, likeData) => {


// 								if (err) {
// 								  throw err
// 								} else {
// 								  var totalPages = Math.ceil(totalCount / size)
// 								  response = {
// 									message: 'data fatch successfully',
// 									status: 1,
// 									pages: totalPages,
// 									total: totalCount,
// 									size: size,
// 									data: likeData.reverse(),
// 								  }

// 								  res.json(response)
// 								}
// 							  })
// 						  }
// 						  })
// 						  })
// 						  }	

// ];

exports.screenerList = [
	body("userId").isLength({ min: 3 }).trim().withMessage("Invalid Credential!"),
	//body("ngoId").isLength({ min: 1 }).trim().withMessage("Invalid NGO ID !"),
	body("token").isLength({ min: 3 }).trim().withMessage("Invalid Token!"),
	sanitizeBody("userId").escape(),
	sanitizeBody("ngoId").escape(),
	// sanitizeBody("parentId").escape(),
	// sanitizeBody("issubscreener").escape(),
	// sanitizeBody("ismapped").escape(),
	(req, res) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {
				const { pageNo, size } = req.body
				console.log(req.body);
				if (pageNo < 0 || pageNo === 0) {
					response = {
						error: true,
						message: 'invalid page number, should start with 1',
					}
					return res.json(response)
				}
				const query = {}
				query.skip = size * (pageNo - 1)
				query.limit = size
				console.log(query);
				var condition = {};
				if (req.body.ngoId != '' && req.body.ngoId != undefined && req.body.ngoId != null) {
					condition['ngoId'] = req.body.ngoId;
				}
				if (req.body.ismapped != '' && req.body.ismapped != undefined && req.body.ismapped != null) {
					if (req.body.ismapped === 0 || req.body.ismapped === '0') {
						condition['ngoId'] = "0";
					}
					else {
						condition['ngoId'] = { '$exists': true };
					}
				}

				if (req.body.parentId != '' && req.body.parentId != undefined && req.body.parentId != null) {
					condition['parentId'] = req.body.parentId;
				}
				if (req.body.issubscreener != '' && req.body.issubscreener != undefined && req.body.issubscreener != null) {
					condition['issubscreener'] = Number(req.body.issubscreener);
				}

				console.dir(condition);

				ScreenerModel.Screener.count({isdeleted:false,ngoId:req.body.ngoId}, async (err, totalCount) => {
					if (err) {
						response = { error: true, message: 'Error fetching data' }
					}
					ScreenerModel.Screener.find({}, {}, query, async (err, data) => {
						// Mongo command to fetch all data from collection.
						// const post_id = data.post_id
						if (err) {
							response = { error: true, message: 'Error fetching data' }
						} else {

							ScreenerModel.Screener.aggregate([
								{ '$match': condition },
								{'$match':{'isdeleted':false,ngoId:req.body.ngoId}},
								
								{
									'$lookup': {
										'localField': 'screenerId',
										'from': 'screenerdetails',
										'foreignField': 'screenerId',
										'as': 'info'
									}
								},
								{
									'$lookup': {
										'localField': 'screenerId',
										'from': 'screeningcases',
										'foreignField': 'screenerId',
										'as': 'cases'
									}
								},
								{
									'$lookup': {
										'localField': 'screenerId',
										'from': 'generalsurveys',
										'foreignField': 'screenerId',
										'as': 'generalsurveys'
									}
								},
								{
									'$lookup': {
										'localField': 'screenerId',
										'from': 'healthsurveys',
										'foreignField': 'screenerId',
										'as': 'healthsurveys'
									}
								},
								{
									'$lookup': {
										'localField': 'screenerId',
										'from': 'socioeconomicsurveys',
										'foreignField': 'screenerId',
										'as': 'socioeconomicsurveys'
									}
								},
								{
									'$lookup': {
										'localField': 'screenerId',
										'from': 'citizens',
										'foreignField': 'screenerId',
										'as': 'citizens'
									}
								},
								{ '$unwind': '$info' },
								{
									'$project': {
										'fullname': { $concat: ["$firstName", " ", "$lastName"] },
										'screenerId': 1,
										'firstName': 1,
										'lastName': 1,
										'sex': 1,
										'mobile': 1,
										'mobile1': 1,
										'email': 1,
										'ngoId': 1,
										'parentId': 1,
										'issubscreener': {
											"$switch": {
												"branches": [
													{ "case": { "$eq": ["$issubscreener", 0] }, "then": "Sanyojika" },
													{ "case": { "$eq": ["$issubscreener", 1] }, "then": "Sevika" },

												],
												"default": "none"
											},
										},
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
										'screenerLoginId': 1,
										'createdAt': 1,
										'info.dateOfBirth': 1,
										'info.dateOfOnBoarding': 1,
										'info.qualification': 1,
										'info.specialisation': 1,
										'info.country': 1,
										'info.state': 1,
										'info.district': 1,
										'info.address': 1,
										'info.pincode': 1,
										'info.rating': 1,
										'info.photo': 1,
										'numOfCases': { '$size': "$cases" },
										'numOfGeneralSurveys': { '$size': "$generalsurveys" },
										'numOfHealthSurveys': { '$size': "$healthsurveys" },
										'numOfCitizens': { '$size': "$citizens" },
										'numOfSocioEconomicSurveys': { '$size': "$socioeconomicsurveys" },
										'age': {
											$round: [{
												$divide: [{ $subtract: [new Date(), "$info.dateOfBirth"] },
												(365 * 24 * 60 * 60 * 1000)]
											},
											]

										},
									},

								},
								{ $sort: { createdAt: -1 } }
							]
							).then(users => {

								let user = users[0];
								var temp = [];
								if (user) {
									if (req.body.ismapped != '' && req.body.ismapped != undefined && req.body.ismapped != null) {
										for (var i = 0; i < users.length; i++) {


											if (req.body.ismapped === 0 || req.body.ismapped === '0') {
												if (users[i].parentId === "") {
													temp.push(users[i]);
												}
											}
											else {
												if (users[i].parentId != "") {
													temp.push(users[i]);
												}
											}
										}
										users = temp;
									}


									for (var j = 0; j < users.length; j++) {
										users[j].createdAt = utility.toDDmmyy(users[j].createdAt);
										users[j].info.dateOfOnBoarding = utility.toDDmmyy(users[j].info.dateOfOnBoarding);
										users[j].info.dateOfBirth = utility.toDDmmyy(users[j].info.dateOfBirth);
									}
									// return apiResponse.successResponseWithData(res, "Found", users);
									var totalPages = Math.ceil(totalCount / size)
		response = {
		  message: 'data fatch successfully',
		  status: 1,
		  pages: totalPages,
		  total: totalCount,
		  size: size,
		  data: users.reverse(),
		}
		
		res.json(response)
								}
								else return apiResponse.ErrorResponse(res, "Not Found");

							});
						}
					})
				})
			}
			} catch (err) {

				return apiResponse.ErrorResponse(res, "EXp:" + err);
			}
		}

];

exports.sevikalist = [
	// body("token").isLength({ min: 3 }).trim().withMessage("Invalid Token!"),
	// body("isUnrefer").isLength({ min: 1,max:1 }).trim().withMessage("nActive Status 0|1!").isNumeric().withMessage("isUnActive should be 0|1"),
	// sanitizeBody("isUnrefer").escape(),
	(req, res) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {
				ScreenerModel.Screener.aggregate([
					{ '$match': { 'issubscreener': 1} },
					{ '$match': { 'isdeleted': false,ngoId:req.body.ngoId} },
					{ '$sort': { 'createdAt': -1 } },
					
					{
						'$project': {
							'fullname': { $concat: ["$firstName", " ", "$lastName"] },
							'screenerId': 1,
							'firstName': 1,
							'lastName': 1,
							'sex': 1,
							'mobile': 1,
							'mobile1': 1,
							'email': 1,
							'ngoId': 1,
							'parentId': 1,
							'issubscreener': 1,
							'createdAt': 1,

						}
					}
				]
				).then(users => {

					let user = users[0];
					if (user) {

						return apiResponse.successResponseWithData(res, "Found", users);
					}
					else return apiResponse.ErrorResponse(res, "Not Found");

				});
			}
		} catch (err) {

			return apiResponse.ErrorResponse(res, "EXp:" + err);
		}
	}


];

exports.screenerlists = [
	// body("userId").isLength({ min: 3 }).trim().withMessage("Invalid Credential!"),/
	//body("ngoId").isLength({ min: 1 }).trim().withMessage("Invalid NGO ID !"),
	body("token").isLength({ min: 3 }).trim().withMessage("Invalid Token!"),
	// sanitizeBody("userId").escape(),
	sanitizeBody("ngoId").escape(),
	// sanitizeBody("parentId").escape(),
	// sanitizeBody("issubscreener").escape(),
	// sanitizeBody("ismapped").escape(),
	(req, res) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {
				const { pageNo, size } = req.body
				console.log(req.body);
				if (pageNo < 0 || pageNo === 0) {
					response = {
						error: true,
						message: 'invalid page number, should start with 1',
					}
					return res.json(response)
				}
				const query = {}
				query.skip = size * (pageNo - 1)
				query.limit = size
				console.log(query);
				var condition = {};
				if (req.body.ngoId != '' && req.body.ngoId != undefined && req.body.ngoId != null) {
					condition['ngoId'] = req.body.ngoId;
				}
				if (req.body.ismapped != '' && req.body.ismapped != undefined && req.body.ismapped != null) {
					if (req.body.ismapped === 0 || req.body.ismapped === '0') {
						condition['ngoId'] = "0";
					}
					else {
						condition['ngoId'] = { '$exists': true };
					}
				}

				if (req.body.parentId != '' && req.body.parentId != undefined && req.body.parentId != null) {
					condition['parentId'] = req.body.parentId;
				}
				if (req.body.issubscreener != '' && req.body.issubscreener != undefined && req.body.issubscreener != null) {
					condition['issubscreener'] = Number(req.body.issubscreener);
				}

				console.dir(condition);

				ScreenerModel.Screener.count({isdeleted:false,ngoId:req.body.ngoId}, async (err, totalCount) => {
					if (err) {
						response = { error: true, message: 'Error fetching data' }
					}
					ScreenerModel.Screener.find({}, {}, query, async (err, data) => {
						// Mongo command to fetch all data from collection.
						// const post_id = data.post_id
						if (err) {
							response = { error: true, message: 'Error fetching data' }
						} else {

							ScreenerModel.Screener.aggregate([
								{ '$match': condition },
								{'$match':{'isdeleted':false,ngoId:req.body.ngoId,issubscreener:0}},
								
								{
									'$lookup': {
										'localField': 'screenerId',
										'from': 'screenerdetails',
										'foreignField': 'screenerId',
										'as': 'info'
									}
								},
								{
									'$lookup': {
										'localField': 'screenerId',
										'from': 'screeningcases',
										'foreignField': 'screenerId',
										'as': 'cases'
									}
								},
								{
									'$lookup': {
										'localField': 'screenerId',
										'from': 'generalsurveys',
										'foreignField': 'screenerId',
										'as': 'generalsurveys'
									}
								},
								{
									'$lookup': {
										'localField': 'screenerId',
										'from': 'healthsurveys',
										'foreignField': 'screenerId',
										'as': 'healthsurveys'
									}
								},
								{
									'$lookup': {
										'localField': 'screenerId',
										'from': 'socioeconomicsurveys',
										'foreignField': 'screenerId',
										'as': 'socioeconomicsurveys'
									}
								},
								{
									'$lookup': {
										'localField': 'screenerId',
										'from': 'citizens',
										'foreignField': 'screenerId',
										'as': 'citizens'
									}
								},
								{ '$unwind': '$info' },
								{
									'$project': {
										'fullname': { $concat: ["$firstName", " ", "$lastName"] },
										'screenerId': 1,
										'firstName': 1,
										'lastName': 1,
										'sex': 1,
										'mobile': 1,
										'mobile1': 1,
										'email': 1,
										'ngoId': 1,
										'parentId': 1,
										'issubscreener': {
											"$switch": {
												"branches": [
													{ "case": { "$eq": ["$issubscreener", 0] }, "then": "Sanyojika" },
													{ "case": { "$eq": ["$issubscreener", 1] }, "then": "Sevika" },

												],
												"default": "none"
											},
										},
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
										'screenerLoginId': 1,
										'createdAt': 1,
										'info.dateOfBirth': 1,
										'info.dateOfOnBoarding': 1,
										'info.qualification': 1,
										'info.specialisation': 1,
										'info.country': 1,
										'info.state': 1,
										'info.district': 1,
										'info.address': 1,
										'info.pincode': 1,
										'info.rating': 1,
										'info.photo': 1,
										'numOfCases': { '$size': "$cases" },
										'numOfGeneralSurveys': { '$size': "$generalsurveys" },
										'numOfHealthSurveys': { '$size': "$healthsurveys" },
										'numOfCitizens': { '$size': "$citizens" },
										'numOfSocioEconomicSurveys': { '$size': "$socioeconomicsurveys" },
										'age': {
											$round: [{
												$divide: [{ $subtract: [new Date(), "$info.dateOfBirth"] },
												(365 * 24 * 60 * 60 * 1000)]
											},
											]

										},
									},

								},
								{ $sort: { createdAt: -1 } }
							]
							).then(users => {

								let user = users[0];
								var temp = [];
								if (user) {
									if (req.body.ismapped != '' && req.body.ismapped != undefined && req.body.ismapped != null) {
										for (var i = 0; i < users.length; i++) {


											if (req.body.ismapped === 0 || req.body.ismapped === '0') {
												if (users[i].parentId === "") {
													temp.push(users[i]);
												}
											}
											else {
												if (users[i].parentId != "") {
													temp.push(users[i]);
												}
											}
										}
										users = temp;
									}


									for (var j = 0; j < users.length; j++) {
										users[j].createdAt = utility.toDDmmyy(users[j].createdAt);
										users[j].info.dateOfOnBoarding = utility.toDDmmyy(users[j].info.dateOfOnBoarding);
										users[j].info.dateOfBirth = utility.toDDmmyy(users[j].info.dateOfBirth);
									}
									// return apiResponse.successResponseWithData(res, "Found", users);
									var totalPages = Math.ceil(totalCount / size)
		response = {
		  message: 'data fatch successfully',
		  status: 1,
		  pages: totalPages,
		  total: totalCount,
		  size: size,
		  data: users.reverse(),
		}
		
		res.json(response)
								}
								else return apiResponse.ErrorResponse(res, "Not Found");

							});
						}
					})
				})
			}
			} catch (err) {

				return apiResponse.ErrorResponse(res, "EXp:" + err);
			}
		}

];

exports.updatescreenerList = [


	body("ngoId").isLength({ min: 3 }).trim().withMessage("user must atleast 3 chars!").custom((value) => {
		return UserModel.findOne({ ngoId: value }).then((user) => {
			if (user) { }
			else return Promise.reject("Invalid User Selection");
		});
	}),
	body("status").isLength({ min: 1, max: 1 }).trim().withMessage("Invalid Status!").isNumeric().withMessage("status 0-9"),
	// body("isBlocked").isLength({ min: 1,max:1 }).trim().withMessage("Blocked Status 0|1!").isNumeric().withMessage("isBlocked should be 0|1"),
	// body("isExpired").isLength({ min: 1,max:1 }).trim().withMessage("Expired Status 0|1!").isNumeric().withMessage("isExpired should be 0|1"),
	body("ismapped").isLength({ min: 1, max: 1 }).trim().withMessage("nActive Status 0|1!").isNumeric().withMessage("isUnActive should be 0|1"),

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
			} else {


				ScreenerModel.Screener.findOneAndUpdate({ 'ngoId': req.body.ngoId }, { '$set': { 'status': req.body.status } }, function (err, resDoc) {
					if (err) {
						return apiResponse.ErrorResponse(res, err);
					}
					else {
						if (resDoc) {

							ScreenerModel.Screener.findOneAndUpdate({ 'userId': req.body.forUserId }, { '$set': { 'ismapped': req.body.ismapped } }, function (ierr, iresDoc) {
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
	}];

exports.screenerProfile = [
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
			} else {
				ScreenerModel.Screener.aggregate([
					{ '$match': { '$or': [{ 'screenerId': req.body.screenerId }, { 'screenerLoginId': req.body.userId }] } },
					{ '$limit': 100000 },
					{
						'$lookup': {
							'localField': 'screenerId',
							'from': 'screenerdetails',
							'foreignField': 'screenerId',
							'as': 'info'
						}
					},
					{ '$unwind': '$info' },
					{
						'$project': {

							'screenerId': 1,
							'ngoId':1,
							'firstName': 1,
							'lastName': 1,
							'sex': 1,
							'mobile': 1,
							'mobile1': 1,
							'email': 1,
							'screenerLoginId': 1,
							'createdAt': 1,
							'info.dateOfBirth': 1,
							'info.dateOfOnBoarding': 1,
							'info.qualification': 1,
							'info.specialisation': 1,
							'info.country': 1,
							'info.state': 1,
							'info.district': 1,
							'info.address': 1,
							'info.pincode': 1,
							'info.rating': 1,
							'info.photo': 1

						}
					}
				]
				).then(users => {

					let user = users[0];


					if (user) {
						for (var i = 0; i < users.length; i++) {
							users[i].createdAt = utility.toDDmmyy(users[i].createdAt);
							users[i].info.dateOfOnBoarding = utility.toDDmmyy(users[i].info.dateOfOnBoarding);
							users[i].info.dateOfBirth = utility.toDDmmyy(users[i].info.dateOfBirth);
						}
						return apiResponse.successResponseWithData(res, "Found", users);
					}
					else return apiResponse.ErrorResponse(res, "Not Found");

				});
			}
		} catch (err) {

			return apiResponse.ErrorResponse(res, "EXp:" + err);
		}
	}

];
exports.sevikaListById = [
	//body("screenerId").isLength({ min: 3 }).trim().withMessage("Invalid screenerId Credential!"),


	(req, res) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {
				ScreenerModel.Screener.aggregate([
					{ '$match': {  'screenerLoginId': req.body.screenerLoginId } },
					{ '$limit': 100000 },
					{
						'$lookup': {
							'localField': 'screenerId',
							'from': 'screenerdetails',
							'foreignField': 'screenerId',
							'as': 'info'
						}
					},
					{ '$unwind': '$info' },
					{
						'$project': {
                            'issubscreener':1,
							'screenerId': 1,
							'ngoId':1,
							'firstName': 1,
							'lastName': 1,
							'sex': 1,
							'mobile': 1,
							'mobile1': 1,
							'email': 1,
							'screenerLoginId': 1,
							'createdAt': 1,
							'info.dateOfBirth': 1,
							'info.dateOfOnBoarding': 1,
							'info.qualification': 1,
							'info.specialisation': 1,
							'info.country': 1,
							'info.state': 1,
							'info.district': 1,
							'info.address': 1,
							'info.pincode': 1,
							'info.rating': 1,
							'info.photo': 1

						}
					}
				]
				).then(users => {

					let user = users[0];


					if (user) {
						
						return apiResponse.successResponseWithData(res, "Found", users);
					}
					else return apiResponse.ErrorResponse(res, "Not Found");

				});
			}
		} catch (err) {

			return apiResponse.ErrorResponse(res, "EXp:" + err);
		}
	}

];
exports.screenerListById = [
	//body("screenerId").isLength({ min: 3 }).trim().withMessage("Invalid screenerId Credential!"),


	(req, res) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {
				ScreenerModel.Screener.aggregate([
					{ '$match': { 'screenerLoginId': req.body.screenerLoginId  } },
					{ '$limit': 100000 },
					{
						'$lookup': {
							'localField': 'screenerId',
							'from': 'screenerdetails',
							'foreignField': 'screenerId',
							'as': 'info'
						}
					},
					{ '$unwind': '$info' },
					{
						'$project': {
                            'issubscreener':1,
							'screenerId': 1,
							'ngoId':1,
							'firstName': 1,
							'lastName': 1,
							'sex': 1,
							'mobile': 1,
							'mobile1': 1,
							'email': 1,
							'screenerLoginId': 1,
							'createdAt': 1,
							'info.dateOfBirth': 1,
							'info.dateOfOnBoarding': 1,
							'info.qualification': 1,
							'info.specialisation': 1,
							'info.country': 1,
							'info.state': 1,
							'info.district': 1,
							'info.address': 1,
							'info.pincode': 1,
							'info.rating': 1,
							'info.photo': 1

						}
					}
				]
				).then(users => {

					let user = users[0];


					if (user) {
						
						return apiResponse.successResponseWithData(res, "Found", users);
					}
					else return apiResponse.ErrorResponse(res, "Not Found");

				});
			}
		} catch (err) {

			return apiResponse.ErrorResponse(res, "EXp:" + err);
		}
	}

];
exports.updateScreenerMapAuth = [
	body("screenerId").isLength({ min: 3 }).trim().withMessage("Invalid doctors ID!").custom((value) => {
		return ScreenerModel.Screener.findOne({ screenerId: value }).then((user) => {
			if (user) { }
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
			} else {


				ScreenerModel.Screener.findOneAndUpdate({ 'screenerId': req.body.screenerId }, { '$set': { 'status': req.body.status } }, function (err, resDoc) {
					if (err) {
						return apiResponse.ErrorResponse(res, err);
					}
					else {
						if (resDoc) {

							ScreenerModel.Screener.findOneAndUpdate({ 'screenerId': req.body.screenerId }, { '$set': { 'ngoId':req.body.ngoId } }, function (ierr, iresDoc) {
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
	}];

exports.updateAddmappedscreener = [
	(req, res) => {

		// let id = req.params.id;


		// const annoucement = await Announcements.updateOne(req.body, { where: { id: id }})

		ScreenerModel.Screener.update({}, { $set: { "ismapped": false} }, { upsert: false, multi: true })


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

exports.screenermappedList = [
	body("token").isLength({ min: 3 }).trim().withMessage("Invalid Token!"),
	// body("isUnrefer").isLength({ min: 1,max:1 }).trim().withMessage("nActive Status 0|1!").isNumeric().withMessage("isUnActive should be 0|1"),
	// sanitizeBody("isUnrefer").escape(),
	(req, res) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {
				ScreenerModel.Screener.aggregate([
					{ '$match': { 'issubscreener': 0,'ngoId':req.body.ngoId,} },
					{ '$sort': { 'createdAt': -1 } },
					
					{
						'$project': {
							'fullname': { $concat: ["$firstName", " ", "$lastName"] },
							'screenerId': 1,
							'firstName': 1,
							'lastName': 1,
							'sex': 1,
							'mobile': 1,
							'mobile1': 1,
							'email': 1,
							'ngoId': 1,
							'parentId': 1,
							'issubscreener': 1,
							'createdAt': 1,

						}
					}
				]
				).then(users => {

					let user = users[0];
					if (user) {

						return apiResponse.successResponseWithData(res, "Found", users);
					}
					else return apiResponse.ErrorResponse(res, "Not Found");

				});
			}
		} catch (err) {

			return apiResponse.ErrorResponse(res, "EXp:" + err);
		}
	}


];
exports.screenerunmappedList = [
	body("token").isLength({ min: 3 }).trim().withMessage("Invalid Token!"),
	// body("isUnrefer").isLength({ min: 1,max:1 }).trim().withMessage("nActive Status 0|1!").isNumeric().withMessage("isUnActive should be 0|1"),
	// sanitizeBody("isUnrefer").escape(),
	(req, res) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {
				ScreenerModel.Screener.aggregate([
					{ '$match': {  'issubscreener': 0 ,ngoId:"0"} },
					{ '$sort': { 'createdAt': -1 } },
					{ '$limit': 100 },

					{
						'$project': {
							'fullname': { $concat: ["$firstName", " ", "$lastName"] },
							'screenerId': 1,
							'firstName': 1,
							'lastName': 1,
							'sex': 1,
							'mobile': 1,
							'mobile1': 1,
							'email': 1,
							'ngoId': 1,
							'parentId': 1,
							'issubscreener': 1,
							'createdAt': 1,
							'ismapped': 1

						}
					}
				]
				).then(users => {

					let user = users[0];
					if (user) {

						return apiResponse.successResponseWithData(res, "Found", users);
					}
					else return apiResponse.ErrorResponse(res, "Not Found");

				});
			}
		} catch (err) {

			return apiResponse.ErrorResponse(res, "EXp:" + err);
		}
	}


];

exports.sevikamappedList = [
	body("token").isLength({ min: 3 }).trim().withMessage("Invalid Token!"),
	// body("isUnrefer").isLength({ min: 1,max:1 }).trim().withMessage("nActive Status 0|1!").isNumeric().withMessage("isUnActive should be 0|1"),
	// sanitizeBody("isUnrefer").escape(),
	(req, res) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {
				ScreenerModel.Screener.aggregate([
					{ '$match': { 'issubscreener': 1,'ngoId':req.body.ngoId} },
					{ '$sort': { 'createdAt': -1 } },
					// { '$limit': 100 },

					{
						'$project': {
							'fullname': { $concat: ["$firstName", " ", "$lastName"] },
							'screenerId': 1,
							'firstName': 1,
							'lastName': 1,
							'sex': 1,
							'mobile': 1,
							'mobile1': 1,
							'email': 1,
							'ngoId': 1,
							'parentId': 1,
							'issubscreener': 1,
							'createdAt': 1,
							'ismapped': 1

						}
					}
				]
				).then(users => {

					let user = users[0];
					if (user) {

						return apiResponse.successResponseWithData(res, "Found", users);
					}
					else return apiResponse.ErrorResponse(res, "Not Found");

				});
			}
		} catch (err) {

			return apiResponse.ErrorResponse(res, "EXp:" + err);
		}
	}


];
exports.sevikaunmappedList = [
	body("token").isLength({ min: 3 }).trim().withMessage("Invalid Token!"),
	// body("isUnrefer").isLength({ min: 1,max:1 }).trim().withMessage("nActive Status 0|1!").isNumeric().withMessage("isUnActive should be 0|1"),
	// sanitizeBody("isUnrefer").escape(),
	(req, res) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {
				ScreenerModel.Screener.aggregate([
					{ '$match': { 'issubscreener': 1, ngoId:"0"} },
					{ '$sort': { 'createdAt': -1 } },
				

					{
						'$project': {
							'fullname': { $concat: ["$firstName", " ", "$lastName"] },
							'screenerId': 1,
							'firstName': 1,
							'lastName': 1,
							'sex': 1,
							'mobile': 1,
							'mobile1': 1,
							'email': 1,
							'ngoId': 1,
							'parentId': 1,
							'issubscreener': 1,
							'createdAt': 1,
							'ismapped': 1

						}
					}
				]
				).then(users => {

					let user = users[0];
					if (user) {

						return apiResponse.successResponseWithData(res, "Found", users);
					}
					else return apiResponse.ErrorResponse(res, "Not Found");

				});
			}
		} catch (err) {

			return apiResponse.ErrorResponse(res, "EXp:" + err);
		}
	}


];
exports.screenerCount = [



	(req, res) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {


				tmp_out0Model
					.aggregate([
						{ $match: { issubscreener: 0 } },

						{
							'$group': {
								'_id': "$severity",
								'count': { '$sum': 1 }
							}
						}
					]).then(users => {

						let user = users[0];
						if (user) {
							return apiResponse.successResponseWithData(res, "Found", users);
						}
						else return apiResponse.ErrorResponse(res, "Not Found");

					});
			}
		} catch (err) {

			return apiResponse.ErrorResponse(res, "EXp:" + err);
		}
	}

];
exports.updateAddscreener = [
	(req, res) => {

		// let id = req.params.id;


		// const annoucement = await Announcements.updateOne(req.body, { where: { id: id }})

		ScreenerModel.Screener.update({ $rename: { "userId": "ngoId" } })


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
]
