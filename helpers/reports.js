var pdf = require("pdf-creator-node");
var fs = require('fs');

const { body,query,validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const he = require('he');
//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");
const utility = require("../helpers/utility");
const mailer = require("../helpers/mailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { constants } = require("../helpers/constants");

var request = require("request");
var users;
var html = fs.readFileSync('../helpers/template.html', 'utf8');


exports.createProfileReport = [
    	
	body("roleId").isLength({ min: 1 }).trim().withMessage("Enter RoleID !"),	
	body("token").isLength({ min: 3 }).trim().withMessage("Enter Token !"),
	body("userId").isLength({ min: 3 }).trim().withMessage("Enter Actor Id !"),

	sanitizeBody("roleId").escape(),
	sanitizeBody("userId").escape(),
	sanitizeBody("token").escape(),

	(req, res) => { 
			
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
					
					if(req.body.roleId==='2'){

						var screenerId=req.body.userId;
						
						var token=req.body.token;


					var options = { method: 'POST',
					  url: 'http://139.59.59.31:3001/api/ngo/screenerById',
					  headers: 
					   { 'content-type': 'application/x-www-form-urlencoded' },
					  form: 
					   { userId: screenerId,
					   token: token } };

					request(options, function (error, response, body) {
					  if (error) throw new Error(error);

					  //console.log(JSON.parse(body).status);
					  status=JSON.parse(body).status;
					  if(status==1){
					  	users=JSON.parse(body).data.data;
					  	//console.log(users);
					  	var document = {
					    html: html,
					    data: {
					        users: users
					    },
					    path: "../uploads/"+Date.now()+".pdf"
					};

					var options = {
					        format: "A3",
					        orientation: "portrait",
					        border: "10mm",
					        header: {
					            height: "45mm",
					            contents: '<div style="text-align: center;">Author: Javix Life</div>'
					        },
					        "footer": {
					            "height": "28mm",
					            "contents": {
					            first: '',
					            2: '', // Any page number is working. 1-based index
					            default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
					            last: 'Last Page'
					        }
					    }
					};

					  	pdf.create(document, options)
					    .then(res => {
					    	console.dir(document)
					        console.log(res)
					        return apiResponse.successResponseWithData(res,"Success");

					    })
					    .catch(error => {
					        console.error(error)
					    });
					  }
					});


					}

				
					
			}
		} catch (err) {
			
			return apiResponse.ErrorResponse(res,"EXp:"+err);
		}
	}];







