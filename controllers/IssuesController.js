const UserModel = require("../models/UserModel");
const IssuesModel = require("../models/IssuesModel");
const { body,validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
var dateFormat = require('dateformat');
//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");
const utility = require("../helpers/utility");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { constants } = require("../helpers/constants");

exports.issueAdd = [
	// Validate fields.
	body("userId").isLength({ min: 1 }).trim().withMessage("User Id must be specified.").custom((value) => {
			return UserModel.findOne({userId : value}).then((user) => {
				if (user) {}
					else {return Promise.reject("Invalid user id");}
				
			});
		}),
	body("issue").isLength({ min: 1 }).trim().withMessage("enter issue subject"),
	body("issueDetails").isLength({ min: 1,max:2000 }).trim().withMessage("enter issue in detail (max 2000 char)"),
	
	sanitizeBody("userId").escape(),
	//sanitizeBody("issue").escape(),
	//sanitizeBody("issueDetails").escape(),
	(req, res) => {
		try {
			// Extract the validation errors from a request.
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				// Display sanitized values/errors messages.
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
				var issueNo="";
				console.log(" ISSUE: "+issueNo);
					  var dateIn=new Date();
					  var yyyy = dateIn.getFullYear();
					  var mm = dateIn.getMonth() + 1; // getMonth() is zero-based
					  var dd = dateIn.getDate();
					  var yymmdd=String(10000 * yyyy + 100 * mm + dd); 
					issueNo=yymmdd+"-"+utility.randomNumber(3)+"-"+utility.randomNumber(3);
					
					var issue = new IssuesModel(
						{
							issueNo:issueNo,
							userId:req.body.userId,
							issue: req.body.issue,
							issueDetails:req.body.issueDetails
							
						}
					);
					issue.save(function (err) {

							if (err) { return apiResponse.ErrorResponse(res, err); }
							let issueData = {
								issueNo:issueNo,
								userId:req.body.userId,
								issue: req.body.issue

							};
							return apiResponse.successResponseWithData(res,"Success.", issueData);
					});
				
			}
		} catch (err) {
			//throw error in json response with status 500.
			return apiResponse.ErrorResponse(res, err);
		}
	}];
exports.issuesByUser = [
	body("userId").isLength({ min: 1 }).trim().withMessage("User Id must be specified.").custom((value) => {
			return UserModel.findOne({userId : value}).then((user) => {
				if (user) {}
					else {return Promise.reject("Invalid user id");}
				
			});
		}),
	sanitizeBody("userId").escape(),
	
	(req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
				var query = {userId : req.body.userId};
				// find RoleId to get all Active Menu for this domain
				IssuesModel.find(query).sort({createdAt:-1}).then(issues => {
					var issue=issues[0];
					if (issue) {
					var output=[];
								for(var i=0;i<issues.length;i++){
						var temp={			
                "status": issues[i].status ,
                "_id": issues[i]._id,
                "issueNo": issues[i].issueNo,
                "userId": issues[i].userId,
                "issue": issues[i].issue,
                "issueDetails": issues[i].issueDetails,
                "createdAt": utility.toDDmmyy(issues[i].createdAt),
                "updatedAt": utility.toDDmmyy(issues[i].updatedAt)
            }
							output[i]=temp;
						}
								return apiResponse.successResponseWithData(res,"found",output);
								
					}else{
						return apiResponse.unauthorizedResponse(res, "Specified User Id not found.");
					}
				});
			}
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	}];	
	
exports.issuesAll = [
	body("userId").isLength({ min: 1 }).trim().withMessage("User Id must be specified.").custom((value) => {
			return UserModel.findOne({userId : value}).then((user) => {
				if (user) {}
					else {return Promise.reject("Invalid user id");}
				
			});
		}),
	sanitizeBody("userId").escape(),
	
	(req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {

				var condition = {};
				// find RoleId to get all Active Menu for this domain
				if(req.body.status!='' && req.body.status!=undefined && req.body.status!=null){
					condition['status']=Number(req.body.status);
				}
				IssuesModel.find(condition).sort({createdAt:-1}).then(issues => {
					var issue=issues[0];
					if (issue) {
						var output=[];
								for(var i=0;i<issues.length;i++){
						var temp={			
                "status": issues[i].status ,
                "_id": issues[i]._id,
                "issueNo": issues[i].issueNo,
                "userId": issues[i].userId,
                "issue": issues[i].issue,
                "issueDetails": issues[i].issueDetails,
                "Comments": issues[i].comments,
                "createdAt": utility.toDDmmyy(issues[i].createdAt),
                "updatedAt": utility.toDDmmyy(issues[i].updatedAt)
            }
							output[i]=temp;
						}
						
								return apiResponse.successResponseWithData(res,"found",output);
								
					}else{
						return apiResponse.unauthorizedResponse(res, "Specified User Id not found.");
					}
				});
			}
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	}];


	exports.issueUpdate = [
	// Validate fields.
	body("issueNo").isLength({ min: 1 }).trim().withMessage("enter issue Number"),
	body("status").isLength({ min: 1,max:2000 }).trim().withMessage("enter issue Status"),
	body("comments").isLength({ min: 1,max:2000 }).trim().withMessage("enter issue Comments"),
	
	//sanitizeBody("issueNo").escape(),
	sanitizeBody("status").escape(),
	//sanitizeBody("comments").escape(),
	(req, res) => {
		try {
			// Extract the validation errors from a request.
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				// Display sanitized values/errors messages.
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
					IssuesModel.findOneAndUpdate(
											{ issueNo :req.body.issueNo},
											{$set: {status:req.body.status,comments:req.body.comments}
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
			//throw error in json response with status 500.
			return apiResponse.ErrorResponse(res, err);
		}
	}];