const { body,query,validationResult } = require("express-validator");
// const {sanitizeBody } = require("express-validator");
//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");
const utility = require("../helpers/utility");
const jwt = require("jsonwebtoken");
const fs = require('fs');
let jsonParentChild = require('../stub/parentchild.json');
let jsonStatedistrict = require('../stub/statedistrict.json');
const { constants } = require("../helpers/constants");




exports.getstub = [
    
	// sanitizeBody("json").escape(),
	// // sanitizeBody("doctorId").escape(),
	// // sanitizeBody("adminId").escape(),
	// // sanitizeBody("pharmacyId").escape(),
	// // sanitizeBody("ngoId").escape(),
	// // sanitizeBody("citizenId").escape(),

	(req, res) => { 
			
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
				if(req.body.json==='parentchild'){

					return apiResponse.successResponseWithData(res,"Stub Data", jsonParentChild);

				}
				else if(req.body.json==='statedistrict'){

					return apiResponse.successResponseWithData(res,"State District Data", jsonStatedistrict);

				}
				
				

			}
		} catch (err) {
			
			return apiResponse.ErrorResponse(res,"EXp:"+err);
		}
	}

	];

