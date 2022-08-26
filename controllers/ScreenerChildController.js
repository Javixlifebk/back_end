const ScreenerModel = require("../models/ScreenerModel");
const ScreenerChildModel = require("../models/ScreenerChildModel");
const RequestChangeModel = require("../models/RequestChangeModel");
const { body,query,validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");
const utility = require("../helpers/utility");
const jwt = require("jsonwebtoken");
const { constants } = require("../helpers/constants");

exports.addMapping = [
    
	body("screenerId").isLength({ min: 3 }).trim().withMessage("Invalid Screener Id!"),
	body("parentScreenerId").isLength({ min: 3 }).trim().withMessage("Invalid parentScreenerId!"),
	
	sanitizeBody("screenerId").escape(),
	sanitizeBody("parentScreenerId").escape(),
	
	(req, res) => { 
			
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
				    
					var recS={
							screenerId:req.body.screenerId,
							parentScreenerId:req.body.parentScreenerId
					};

					console.log(recS);
					var actionS=new ScreenerChildModel.ScreenerChild(recS);
					console.log(actionS);
					actionS.save(function(_error)
					{
						console.log("Inside");
						if(_error){ apiResponse.ErrorResponse(res, "Sorry:"+_error);}
						else
						{
							return apiResponse.successResponseWithData(res,"Successfully Submitted");
						}
					}
					);
					
			}
		} catch (err) {
			
			return apiResponse.ErrorResponse(res,err);
		}
	}];



exports.mappingList=[
    
			
	sanitizeBody("screenerId").escape(),
	sanitizeBody("parentScreenerId").escape(),
	(req, res) => { 
		try {

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {



					
					var screenerId,parentScreenerId;
					var matchfield={};
					var arraymatch=[];
					//console.log(req.body.recordId);

					
					if(req.body.screenerId!=null && req.body.screenerId!=undefined && req.body.screenerId!=""){
						screenerId=req.body.screenerId;
						matchfield["screenerId"]=screenerId;
						arraymatch.push(matchfield);
						matchfield={};
					}
					if(req.body.parentScreenerId!=null && req.body.parentScreenerId!=undefined && req.body.parentScreenerId!=""){
						parentScreenerId=req.body.parentScreenerId;
						matchfield["parentScreenerId"]=parentScreenerId;
						arraymatch.push(matchfield);
						matchfield={};
					}

					
					var andcond={'$match':{'$and':arraymatch}};
					console.log(arraymatch);
					if (arraymatch.length===0){
						andcond={'$match':{}};

					}
					console.dir(andcond);
			ScreenerChildModel.ScreenerChild.aggregate([
							andcond,
							{'$lookup': {
								'localField':'screenerId',
								'from':'screeners',
								'foreignField':'screenerId',
								'as':'child'	
							 }
							},
							{'$lookup': {
								'localField':'parentScreenerId',
								'from':'screeners',
								'foreignField':'screenerId',
								'as':'parent'	
							 }
							},
							{'$unwind':'$child'},
							{'$unwind':'$parent'},
							{'$project':{
								 
								 'screenerId':1,
								 'parentScreenerId':1,
								 'createdAt':1,
								 'child.firstName':1,
								 'child.lastName':1,
								 'child.screenerLoginId':1,
								 'parent.firstName':1,
								 'parent.lastName':1,
								 'parent.screenerLoginId':1
								 
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
	

}];