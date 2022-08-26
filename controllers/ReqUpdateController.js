const RequestChangeModel = require("../models/RequestChangeModel");
const { body,query,validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");
const utility = require("../helpers/utility");
const jwt = require("jsonwebtoken");
const { constants } = require("../helpers/constants");

exports.ngoRequestUpdateList=[
	body("status").isLength({ min: 1 }).trim().withMessage("enter status"),
	body("token").isLength({ min: 3 }).trim().withMessage("Invalid Token!"),
	
	sanitizeBody("status").escape(),
    (req, res) => { 
			
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}
			
			RequestChangeModel.RequestUpdates.find({_status:req.body.status}
				).then(users => {
					
					
					if (users) {
								var rLen=users.length;
								var newRecs=[];
								for(var i=0;i<rLen;i++)
								{
									var rec={};
									rec.roleId=users[i].roleId;
									rec.recId=users[i].recId;
									rec.userId=users[i].userId;
									rec.dateTime=users[i].createdAt;
									rec.newRecord=JSON.parse(users[i].updateQuery);
									newRecs.push(rec);
								}
							return apiResponse.successResponseWithData(res,"Found", newRecs);
					}
					else return apiResponse.ErrorResponse(res,"Not Found");
					
				});
		} catch (err) {
			
			return apiResponse.ErrorResponse(res,"EXp:"+err);
		}
	}

];

exports.ngoRequestUpdateByRoleId=[
	body("roleId").isLength({ min: 1 }).trim().withMessage("enter role id"),
	body("status").isLength({ min: 1 }).trim().withMessage("enter status"),
	body("token").isLength({ min: 3 }).trim().withMessage("Invalid Token!"),
	sanitizeBody("roleId").escape(),
	sanitizeBody("status").escape(),
    (req, res) => { 
	
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}
			
			RequestChangeModel.RequestUpdates.find({_status:req.body.status,roleId:req.body.roleId}
				).then(users => {
					
					
					if (users) {
								var rLen=users.length;
								var newRecs=[];
								for(var i=0;i<rLen;i++)
								{
									var rec={};
									rec.roleId=users[i].roleId;
									rec.recId=users[i].recId;
									rec.userId=users[i].userId;
									rec.dateTime=users[i].createdAt;
									rec.newRecord=JSON.parse(users[i].updateQuery);
									newRecs.push(rec);
								}
							return apiResponse.successResponseWithData(res,"Found", newRecs);
					}
					else return apiResponse.ErrorResponse(res,"Not Found");
					
				});
		} catch (err) {
			
			return apiResponse.ErrorResponse(res,"EXp:"+err);
		}
	}

];



