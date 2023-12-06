const CitizenModel = require("../models/CitizenModel");
var express = require("express");
const ScreenerModel = require("../models/ScreenerModel");
const UserModel = require("../models/UserModel");
const ScreeningCase = require("../models/ScreeningCase");
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
const bodyParser= require('body-parser')
var app = express();
app.use(bodyParser.json())


exports.HeartRateGreenList=[
    // body("severity").isLength({ min: 3 }).trim().withMessage("Invalid caseId!"),
	// body("severity").isLength().trim().withMessage("Invalid Token!"),
	//sanitizeBody("caseId").escape(),
	 sanitizeBody("severity").escape(),
	 (req, res)=> {
		const { pageNo, size} = req.body
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
	   
	   // Find some documents
	   ScreeningCase.ScreeningCase.count({severity_pulse:0,"ngoId":req.body.ngoId}, async (err, totalCount) => {
		 if (err) {
		   response = { error: true, message: 'Error fetching data' }
		 }
		 ScreeningCase.ScreeningCase.find({}, {}, query, async (err, data) => {
		   // Mongo command to fetch all data from collection.
		   // const post_id = data.post_id
		   if (err) {
			 response = { error: true, message: 'Error fetching data' }
		   } else {
			ScreeningCase.ScreeningCase.aggregate([
			   
							{'$match':{severity_pulse:0,"ngoId":req.body.ngoId}},
							   // {'$match':condition},
							   // {'$limit':1000},
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
							   {'$lookup': {
								   'localField':'screenerId',
								   'from':'screeners',
								   'foreignField':'screenerId',
								   'as':'screeners'
								}
							   },
							   {"$unwind":"$screeners"},
							   {'$unwind':'$basic'},
							   
							   {'$unwind':'$info'},
							   {'$project':{
								   'fullname': {$concat: ["$basic.firstName", " ", "$basic.lastName"]},
									'screenerId':1,
									'caseId':1,
									'citizenId':1,
									'ngoId':1,
									'notes':1,
									'createdAt':{ $dateToString: { format: "%d/%m/%Y", date: "$createdAt" } },
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
									'address':'$info.address',
									'email':'$basic.email',
									'mobile':'$basic.mobile',
									'dateOfOnBoarding':{ $dateToString: { format: "%d/%m/%Y", date: "$info.dateOfOnBoarding" } },
									'screenerfullname':{$concat:["$screeners.firstName"," ","$screeners.lastName"]},
									severity_pulse:1,
									'pulse':1,
									
								   }
							   },
							   {$sort:{'createdAt':-1}},
							   { $skip: query.skip },
							   { $limit: query.limit },
						   ])
			   .exec((err, likeData) => {
				 if (err) {
				   throw err
				 } else {
				   var totalPages = Math.ceil(totalCount / size)
				   response = {
					 message: 'data fatch successfully',
					 status: 1,
					 pages: totalPages,
					 total: totalCount,
					 size: size,
					 data: likeData.reverse(),
				   }
				   
				   res.json(response)
				 }
			   })
		   }
		 })
		})
	   }	
	
  
];
exports.HeartRateAmberList=[
    // body("severity").isLength({ min: 3 }).trim().withMessage("Invalid caseId!"),
	// body("severity").isLength().trim().withMessage("Invalid Token!"),
	//sanitizeBody("caseId").escape(),
	 sanitizeBody("severity").escape(),
	 (req, res)=> {
		const { pageNo, size} = req.body
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
	   
	   // Find some documents
	   ScreeningCase.ScreeningCase.count({severity_pulse:1,ngoId:req.body.ngoId}, async (err, totalCount) => {
		 if (err) {
		   response = { error: true, message: 'Error fetching data' }
		 }
		 ScreeningCase.ScreeningCase.find({}, {}, query, async (err, data) => {
		   // Mongo command to fetch all data from collection.
		   // const post_id = data.post_id
		   if (err) {
			 response = { error: true, message: 'Error fetching data' }
		   } else {
			   ScreeningCase.ScreeningCase.aggregate([
				// {$sort:{'createdAt':-1}},
										 {'$match':{severity_pulse:1,ngoId:req.body.ngoId}},
							   // {'$limit':1000},
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
							   {'$lookup': {
								   'localField':'screenerId',
								   'from':'screeners',
								   'foreignField':'screenerId',
								   'as':'screeners'
								}
							   },
							   {"$unwind":"$screeners"},
							   {'$unwind':'$basic'},
							   
							   {'$unwind':'$info'},
							   {'$project':{
								   'fullname': {$concat: ["$basic.firstName", " ", "$basic.lastName"]},
									'screenerId':1,
									'caseId':1,
									'citizenId':1,
									'ngoId':1,
									'notes':1,
									'createdAt':{ $dateToString: { format: "%d/%m/%Y", date: "$createdAt" } },
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
									'address':'$info.address',
									'email':'$basic.email',
									'mobile':'$basic.mobile',
									'dateOfOnBoarding':{ $dateToString: { format: "%d/%m/%Y", date: "$info.dateOfOnBoarding" } },
									'screenerfullname':{$concat:["$screeners.firstName"," ","$screeners.lastName"]},
									severity_pulse:1,
									'pulse':1,
									
								   }
							   },
							   {$sort:{'createdAt':-1}},
							   { $skip: query.skip },
							   { $limit: query.limit },
						   ])
			   .exec((err, likeData) => {
				 if (err) {
				   throw err
				 } else {
				   var totalPages = Math.ceil(totalCount / size)
				   response = {
					 message: 'Hemoglobin Amber test list fetch successfully',
					 status: 1,
					 pages: totalPages,
					 total: totalCount,
					 size: size,
					 data: likeData.reverse(),
				   }
				   
				   res.json(response)
				 }
			   })
		   }
		 })
		})
	   }	

	
	

];
exports.HeartRateRedList=[
  
	 sanitizeBody("severity").escape(),
	
	 (req, res)=> {
		const { pageNo, size} = req.body
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
	   
	   // Find some documents
	   ScreeningCase.ScreeningCase.count({severity_pulse:2,ngoId:req.body.ngoId}, async (err, totalCount) => {
		 if (err) {
		   response = { error: true, message: 'Error fetching data' }
		 }
		 ScreeningCase.ScreeningCase.find({}, {}, query, async (err, data) => {
		   // Mongo command to fetch all data from collection.
		   // const post_id = data.post_id
		   if (err) {
			 response = { error: true, message: 'Error fetching data' }
		   } else {
			   ScreeningCase.ScreeningCase.aggregate([
			   
							   {'$match':{severity_pulse:2,ngoId:req.body.ngoId}},
							   // {'$match':condition},
							   // {'$limit':1000},
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
							   {'$lookup': {
								   'localField':'screenerId',
								   'from':'screeners',
								   'foreignField':'screenerId',
								   'as':'screeners'
								}
							   },
							   {"$unwind":"$screeners"},
							   {'$unwind':'$basic'},
							   
							   {'$unwind':'$info'},
							   {'$project':{
								   'fullname': {$concat: ["$basic.firstName", " ", "$basic.lastName"]},
									'screenerId':1,
									'caseId':1,
									'citizenId':1,
									'ngoId':1,
									'notes':1,
									'createdAt':{ $dateToString: { format: "%d/%m/%Y", date: "$createdAt" } },
									'dateOfOnBoarding':{ $dateToString: { format: "%d/%m/%Y", date: "$info.dateOfOnBoarding" } },
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
									'address':'$info.address',
									'email':'$basic.email',
									'mobile':'$basic.mobile',
									
									'screenerfullname':{$concat:["$screeners.firstName"," ","$screeners.lastName"]},
									severity_pulse:1,
									'pulse':1,
									
								   }
							   },
							   {$sort:{'createdAt':-1}},
							   { $skip: query.skip },
							   { $limit: query.limit },
						   ])
			   .exec((err, likeData) => {
				 if (err) {
				   throw err
				 } else {
				   var totalPages = Math.ceil(totalCount / size)
				   response = {
					 message: 'Hemoglobin Amber test list fetch successfully ',
					 status: 1,
					 pages: totalPages,
					 total: totalCount,
					 size: size,
					 data: likeData.reverse(),
				   }
				   
				   res.json(response)
				 }
			   })
		   }
		 })
		})
	   }	

];



// exports.hemoglobinCount=[


	
//     (req, res) => { 
			
// 		try {
// 			const errors = validationResult(req);
// 			if (!errors.isEmpty()) {
// 				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
// 			}else {


// 			ScreeningCase.ScreeningCase.aggregate( [
// 							{'$group':{
// 								'_id' : "$severity",
// 								'count': { '$sum': 1 }
// 							}
//   }
// 					] ).then(users => {
					
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


// exports.getUserPost =[ 
// 	(req, res)=> {
// 	 const { pageNo, size} = req.body
// 	console.log(req.body);
// 	if (pageNo < 0 || pageNo === 0) {
// 	  response = {
// 		error: true,
// 		message: 'invalid page number, should start with 1',
// 	  }
// 	  return res.json(response)
// 	}
// 	const query = {}
// 	query.skip = size * (pageNo - 1)
// 	query.limit = size
// 	console.log(query);
	
// 	// Find some documents
// 	ScreeningCase.ScreeningCase.count({}, async (err, totalCount) => {
// 	  if (err) {
// 		response = { error: true, message: 'Error fetching data' }
// 	  }
// 	  ScreeningCase.ScreeningCase.find({}, {}, query, async (err, data) => {
// 		// Mongo command to fetch all data from collection.
// 		// const post_id = data.post_id
// 		if (err) {
// 		  response = { error: true, message: 'Error fetching data' }
// 		} else {
// 			ScreeningCase.ScreeningCase.aggregate([
			
// 							{'$match':{severity_pulse:2}},
// 							// {'$match':condition},
// 							// {'$limit':1000},
// 							{'$lookup': {
// 								'localField':'citizenId',
// 								'from':'citizendetails',
// 								'foreignField':'citizenId',
// 								'as':'info'	
// 							 }
// 							},
// 							{'$lookup': {
// 								'localField':'citizenId',
// 								'from':'citizens',
// 								'foreignField':'citizenId',
// 								'as':'basic'
// 							 }
// 							},
// 							{'$lookup': {
// 								'localField':'screenerId',
// 								'from':'screeners',
// 								'foreignField':'screenerId',
// 								'as':'screeners'
// 							 }
// 							},
// 							{"$unwind":"$screeners"},
// 							{'$unwind':'$basic'},
							
// 							{'$unwind':'$info'},
// 							{'$project':{
// 								'fullname': {$concat: ["$basic.firstName", " ", "$basic.lastName"]},
// 								 'screenerId':1,
// 								 'caseId':1,
// 								 'citizenId':1,
// 								 'hemoglobin':1,
// 								 'notes':1,
// 								 'createdAt':{ $dateToString: { format: "%d/%m/%Y", date: "$createdAt" } },
// 								 'basic.firstName':1,
// 								 'basic.lastName':1,
// 								 'basic.email':1,
// 								 'basic.mobile':1,
// 								 'basic.sex':1,
// 								 'basic.javixId':1,
// 								 'info.dateOfBirth':1,
// 								 'info.dateOfOnBoarding':1,
// 								 'info.bloodGroup':1,
// 								 'info.country':1,
// 								 'info.state':1,
// 								 'info.district':1,
// 								 'info.address':1,
// 								 'info.pincode':1,
// 								 'info.rating':1,
// 								 'info.geolocations':1,
// 								 'info.photo':1,
// 								 'address':'$info.address',
// 								 'email':'$basic.email',
// 								 'mobile':'$basic.mobile',
// 								 'dateOfOnBoarding':{ $dateToString: { format: "%d/%m/%Y", date: "$info.dateOfOnBoarding" } },
// 								 'screenerfullname':{$concat:["$screeners.firstName"," ","$screeners.lastName"]},
// 								 severity_pulse:1
								 
// 								}
// 							},
// 							{$sort:{'createdAt':-1}},
// 				            { $skip: query.skip },
//             				{ $limit: query.limit },
// 						])
// 			.exec((err, likeData) => {
// 			  if (err) {
// 				throw err
// 			  } else {
// 				var totalPages = Math.ceil(totalCount / size)
// 				response = {
// 				  message: 'data fatch successfully',
// 				  status: 1,
// 				  pages: totalPages,
// 				  total: totalCount,
// 				  size: size,
// 				  data: likeData.reverse(),
// 				}
				
// 				res.json(response)
// 			  }
// 			})
// 		}
// 	  })
// 	 })
// 	}	
// ]