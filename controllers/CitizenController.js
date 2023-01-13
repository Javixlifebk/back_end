const CitizenModel = require("../models/CitizenModel");
const ScreenerModel = require("../models/ScreenerModel");
const ScreeningCaseModel = require("../models/ScreeningCase");
const UserModel = require("../models/UserModel");
const DoctorModel = require("../models/DoctorModel");
const UserDetailsModel = require("../models/UserDetailsModel");
const { body, query, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");
const utility = require("../helpers/utility");
const mailer = require("../helpers/mailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { constants } = require("../helpers/constants");

exports.addProfile = [

	body("screenerId").isLength({ min: 3 }).trim().withMessage("Invalid Screener Login Id!").custom((value) => {
		return ScreenerModel.Screener.findOne({ screenerId: value }).then((user) => {
			if (user) { }
			else {
				return Promise.reject("Screener Not Found !");
			}
		});
	}),
	body("token").isLength({ min: 3 }).trim().withMessage("Invalid Token!"),
	body("firstName").isLength({ min: 1 }).trim().withMessage("Enter First Name!"),
	body("lastName").isLength({ min: 1 }).trim().withMessage("Enter Last Name!"),
	body("sex").isLength({ min: 3 }).trim().withMessage("Enter Sex!"),

	body("aadhaar").custom((value) => {
		if (value != null && value != "" && value != undefined) {
			if (value.length != 12) {
				return Promise.reject("Aadhar no. should have 12 digits!");
			}
		}

		return CitizenModel.Citizen.findOne({ aadhaar: value }).then((user) => {
			if (value != null && value != "" && value != undefined) {

				if (user) {
					return Promise.reject("Aadhaar No already in use");
				}
			}
		});
	}),

	body("raadhaar").custom((value) => {


		if (value != null && value != "" && value != undefined) {
			if (value.length != 12) {
				return Promise.reject("Reference Aadhar no. should have 12 digits!");
			}
		}

		return CitizenModel.Citizen.findOne({ aadhaar: value }).then((user) => {
			if (value != null && value != "" && value != undefined) {

				if (user) {

				}
			}
		});
	}),

	body("mobileNo")
		.custom((value) => {

			if (value != null && value != "" && value != undefined) {
				if (value.length != 10 || value[0] === '0' || isNaN(value)) {
					return Promise.reject("Mobile no. should have 10 digits with no preceeding zero!");
				}
			}

			return CitizenModel.Citizen.findOne({ mobile: value }).then((user) => {
				if (value != null && value != "" && value != undefined) {

					if (user) {
						//return Promise.reject("Mobile No already in use");
					}
				}
			});
		}),

	body("email")
		.custom((value) => {

			if (value != null && value != "" && value != undefined) {
				if (value.length < 10 || value[0] === '@' || !(value.includes("@")) || !(value.includes("."))) {
					return Promise.reject("Invalid Email Address!");
				}
			}
			return CitizenModel.Citizen.findOne({ email: value }).then((user) => {
				if (value != null && value != "" && value != undefined) {
					if (user) {
						return Promise.reject("E-mail already in use");
					}
				}
			});
		}),

	//body("dateOfBirth").isLength({ min: 10, max:10 }),
	// body("dateOfOnBoarding").isLength({ min: 10, max: 10 }).trim().withMessage("Enter Onboarding Date format 'yyyy-mm-dd' !").custom((value) => {
	// 	return utility.isDate(value);
	// }).withMessage("Enter Onboarding Date format 'yyyy-mm-dd' !"),

	// body("country").isLength({ min: 2 }).trim().withMessage("Enter Country !").isAlpha().withMessage("Country name must not contain number !"),	
	//body("state").isLength({ min: 2 }).trim().withMessage("Enter State !"),	
	//body("district").isLength({ min: 2 }).trim().withMessage("Enter District !"),	
	// body("address").isLength({ min: 3 }).trim().withMessage("Enter Address !"),
	//body("pincode").isLength({ min: 6 , max:6 }).trim().withMessage("Enter Valid Pincode !").isNumeric().withMessage("Pincode non-numeric characters."),

	sanitizeBody("screenerId").escape(),
	sanitizeBody("firstName").escape(),
	sanitizeBody("lastName").escape(),
	sanitizeBody("sex").escape(),
	sanitizeBody("mobileNo").escape(),
	//sanitizeBody("email").escape(),


	//sanitizeBody("dateOfBirth").escape(),
	//sanitizeBody("dateOfOnBoarding").escape(),
	sanitizeBody("bloodGroup").escape(),
	sanitizeBody("country").escape(),
	sanitizeBody("state").escape(),
	sanitizeBody("district").escape(),
	sanitizeBody("address").escape(),
	sanitizeBody("pincode").escape(),
	//sanitizeBody("photo").escape(),
	sanitizeBody("aadhaar").escape(),

	(req, res) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {

				console.log("123455",req.body)
				var passwordGenrated = req.body.mobileNo;
				var javixId = null;

				bcrypt.hash(passwordGenrated, 10, function (err, hashPassword) {

					var dobEscape = req.body.dateOfBirth.replace(/-/g, '');
					var ngoRowNo = "00";
					var randThree = utility.randomNumber(3);
					javixId = req.body.state + "/" + req.body.district.substring(0, 2) + "/" + ngoRowNo + "/" + req.body.firstName.substring(0, 1) + "" + req.body.lastName.substring(0, 1) + "" + dobEscape + "/" + randThree;
					var ID = utility.uID();
					var screenerId = req.body.screenerId;
					var citizenLoginId;
					if (req.body.email != null && req.body.email != undefined && req.body.email != "") {
						citizenLoginId = req.body.email;
					} else {
						var citizenLoginId = ID;
					}
					var temppstatus = 0;
					var isInstant = 0;
					if (req.body.token === 'instant') {
						isInstant = 1;
					}
					if (req.body.citizenId != undefined && req.body.citizenId != "" && req.body.citizenId != null) {
						ID = req.body.citizenId;
					}
					var recCitizen = {
						ngoId:req.body.ngoId,
						citizenId: ID,
						firstName: req.body.firstName,
						lastName: req.body.lastName,
						sex: req.body.sex,
						mobile: req.body.mobileNo,
						email: req.body.email,
						pstatus: temppstatus,
						isInstant: isInstant,
						javixId: javixId,
						citizenLoginId: citizenLoginId,
						aadhaar: req.body.aadhaar,
						raadhaar: req.body.raadhaar,
						screenerId: screenerId,
						// isUnrefer:
					};
					var actionCitizen = new CitizenModel.Citizen(recCitizen);
					actionCitizen.save(function (_error) {
						if (_error) { apiResponse.ErrorResponse(res, "Sorry:" + _error); }
						else {
							var iID = utility.uID();
							var recDetails = {
								citizenDetailId: iID,
								dateOfBirth: utility.toYYmmdd(req.body.dateOfBirth),
								dateOfOnBoarding: req.body.dateOfOnBoarding,
								bloodGroup: req.body.bloodGroup,
								country: req.body.country,
								state: req.body.state,
								district: req.body.district,
								address: req.body.address,
								pincode: req.body.pincode,
								rating: 0,
								ngoId:req.body.ngoId,
								citizenId: ID,
								// isUnrefer:0,
								photo: req.body.photo
							};
							var actionCitizenDetails = new CitizenModel.CitizenDetails(recDetails);
							actionCitizenDetails.save(function (_ierror) {
								if (_ierror) {
									apiResponse.ErrorResponse(res, "Sorry:" + _ierror);

								}
								else {

									var user = new UserModel(
										{
											userId: citizenLoginId,
											roleId: 6,
											ngoId:req.body.ngoId,
											userName: citizenLoginId,
											email: req.body.email,
											password: hashPassword,
											confirmOTP: 0000,
											status: 1,
											
										}
									);

									var userDetails = new UserDetailsModel(
										{
											userId: citizenLoginId,
											firstName: req.body.firstName,
											lastName: req.body.lastName,
											email: citizenLoginId,
											phoneNo: req.body.mobileNo,
											ngoId:req.body.ngoId,
											photo: req.body.photo
										}
									);
									user.save(function (err) {
										if (err) { return apiResponse.ErrorResponse(res, err); }


									});		// end user.save
									userDetails.save(function (err) {
										if (err) { return apiResponse.ErrorResponse(res, err); }
										var userResponse = {
											roleId: 6,
											userId: citizenLoginId,
											ngoId:req.body.ngoId,
											citizenId: ID,
											// isUnrefer:true,
											status: 1

										};
										let html = "<p>Your Password.</p><p>Password: " + passwordGenrated + "</p>";
										/*mailer.send(
												constants.confirmEmails.from, 
												req.body.email,
												"Confirm Account",
												html
											).then(function(){
											});*/
										return apiResponse.successResponseWithData(res, "Registration Success.", userResponse);

									});		// end userDetails.save


								}
							});
						}
					}
					);
				});// password
			}// else 
		} catch (err) {

			return apiResponse.ErrorResponse(res, err);
		}
	}];
// ---------------------new created api for refer and prscribe button-----------
exports.updateReferAuth = [


	body("citizenId").custom((value) => {
		return CitizenModel.Citizen.findOne({ citizenId: value }).then((user) => {
			if (user) { }
			else return Promise.reject("Invalid User Selection");
		});
	}),
	// body("status").isLength({ min: 1,max:1 }).trim().withMessage("Invalid Status!").isNumeric().withMessage("status 0-9"),
	// body("pstatus").isLength({ min: 1,max:1 }).trim().withMessage("Blocked Status 0|1!").isNumeric().withMessage("isBlocked should be 0|1"),
	// body("isInstant").isLength({ min: 1,max:1 }).trim().withMessage("Expired Status 0|1!").isNumeric().withMessage("isExpired should be 0|1"),
	body("isUnrefer").isLength({ min: 1, max: 1 }).trim().withMessage("nActive Status 0|1!").isNumeric().withMessage("isUnActive should be 0|1"),

	sanitizeBody("citizenId").escape(),
	// sanitizeBody("status").escape(),
	sanitizeBody("pstatus").escape(),
	sanitizeBody("isInstant").escape(),
	sanitizeBody("isUnrefer").escape(),

	(req, res) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {


				CitizenModel.Citizen.findOneAndUpdate({ 'citizenId': req.body.citizenId }, { '$set': { 'status': req.body.status } }, function (err, resDoc) {
					if (err) {
						return apiResponse.ErrorResponse(res, err);
					}
					else {
						if (resDoc) {

							CitizenModel.Citizen.findOneAndUpdate({ 'citizenId': req.body.citizenId }, { '$set': { 'isUnrefer': req.body.isUnrefer } }, function (ierr, iresDoc) {
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




exports.citizenList = [
	//body("screenerId").isLength({ min: 3 }).trim().withMessage("Invalid Credential!"),
	body("token").isLength({ min: 3 }).trim().withMessage("Invalid Token!"),
	sanitizeBody("screenerId").escape(),
	sanitizeBody("citizenId").escape(),
	sanitizeBody("status").escape(),

	(req, res) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {
				var matchfield = {};
				var arraymatch = [];


				if (req.body.screenerId != null && req.body.screenerId != undefined && req.body.screenerId != "") {
					screenerId = req.body.screenerId;
					matchfield["screenerId"] = screenerId;
					arraymatch.push(matchfield);
					matchfield = {};
				}
				if (req.body.citizenId != null && req.body.citizenId != undefined && req.body.citizenId != "") {
					citizenId = req.body.citizenId;
					matchfield["citizenId"] = citizenId;
					arraymatch.push(matchfield);
					matchfield = {};
				}
				if (req.body.status != null && req.body.status != undefined && req.body.status != "") {
					status = req.body.status;
					matchfield["pstatus"] = status;
					arraymatch.push(matchfield);
					matchfield = {};
				}
				if (req.body.firstName != null && req.body.firstName != undefined && req.body.firstName != "") {
					firstName = req.body.firstName;
					matchfield["firstName"] = firstName;
					arraymatch.push(matchfield);
					matchfield = {};
				}
				if (req.body.lastName != null && req.body.lastName != undefined && req.body.lastName != "") {
					lastName = req.body.lastName;
					matchfield["lastName"] = lastName;
					arraymatch.push(matchfield);
					matchfield = {};
				}
				if (req.body.email != null && req.body.email != undefined && req.body.email != "") {
					email = req.body.email;
					matchfield["email"] = email;
					arraymatch.push(matchfield);
					matchfield = {};
				}
				if (req.body.mobile != null && req.body.mobile != undefined && req.body.mobile != "") {
					mobile = req.body.mobile;
					matchfield["mobile"] = mobile;
					arraymatch.push(matchfield);
					matchfield = {};
				}

				var andcond = { '$match': { '$or': arraymatch } };
				if (arraymatch.length === 0) {
					andcond = { '$match': {} };

				}
				console.dir(andcond);


				CitizenModel.Citizen.aggregate([
					andcond,
					{ '$sort': { 'createdAt': -1 } },
					{
						'$lookup': {
							'localField': 'citizenId',
							'from': 'citizendetails',
							'foreignField': 'citizenId',
							'as': 'info'
						}
					},
					{
						'$lookup': {
							'localField': 'citizenId',
							'from': 'screeningcases',
							'foreignField': 'citizenId',
							'as': 'cases'
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
							'email': 1,
							'isUnrefer': 1,
							'pstatus': 1,
							'isInstant': 1,
							'citizenId': 1,
							'javixId': 1,
							'aadhaar': 1,
							'raadhaar': 1,
							'citizenLoginId': 1,
							'createdAt': 1,
							'info.dateOfBirth': 1,
							'info.dateOfOnBoarding': 1,
							'info.bloodGroup': 1,
							'info.country': 1,
							'info.state': 1,
							'info.district': 1,
							'info.address': 1,
							'info.pincode': 1,
							'info.rating': 1,
							'info.geolocations': 1,
							'info.photo': 1,
							'cases': {
								'$filter': {
									'input': '$cases',
									'as': 'cases_field',
									'cond': {
										'$and': [
											{ '$eq': ['$$cases_field.status', 1] }
										]
									}
								}
							}

						}
					}
				]
				).then(users => {

					let user = users[0];

					for (var i = 0; i < users.length; i++) {
						if (users[i].cases.length > 0)
							users[i].cases = users[i].cases[users[i].cases.length - 1];
						//console.dir(users[i]);
					}

					if (user) {
						for (i = 0; i < users.length; i++) {
							let temp = users[i];
							var ddate = "";
							users[i].info.dateOfOnBoarding = utility.toDDmmyy(users[i].info.dateOfOnBoarding);
							users[i].createdAt = utility.toDDmmyy(users[i].createdAt);
							//users[i].dateOfRegistration=utility.toDDmmyy(users[i].dateOfRegistration);

							if (temp.info.dateOfBirth != null && temp.info.dateOfBirth != undefined && temp.info.dateOfBirth != "") {

								ddate = temp.info.dateOfBirth.toISOString().split('T')[0];
								var qdate = new Date(ddate);
								temp.info.dateOfBirth = qdate.getDate() + "-" + (qdate.getMonth() + 1) + "-" + (qdate.getYear() + 1900);
								users[i] = temp;
							}
							else {
								temp.info.dateOfBirth = ddate;
								users[i] = temp;
							}
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


exports.updateAddcitizen = [
	(req, res) => {

	
		CitizenModel.CitizenDetails.updateMany(
			{},
			[
				{
					"$set": {
						"Age": {
							$round: {
								$divide: [
									{ $subtract: [new Date(), ' $dateOfBirth'] },
									365 * 24 * 60 * 60 * 1000,
								],
							},
						}
					}
				}
			]
		)

			/*CitizenModel.CitizenDetails.updateMany({},{$set : 
							   {Age: { 
										$round: {
											$divide: [
											  { $subtract: [new Date(), '$dateOfBirth'] },
											  365 * 24 * 60 * 60 * 1000,
											],
										  },
									},}}
									, {upsert:false, multi:true})*/
			.then((note) => {
				if (!note) {
					return res.status(404).send({
						message: "data not found with id ",
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
					message: err,
				});
			});

	}
]

// ==============================display refer list citizens===============
exports.citizenRefers = [
	body("token").isLength({ min: 3 }).trim().withMessage("Invalid Token!"),
	// body("isUnrefer").isLength({ min: 1,max:1 }).trim().withMessage("nActive Status 0|1!").isNumeric().withMessage("isUnActive should be 0|1"),
	// sanitizeBody("isUnrefer").escape(),
	(req, res) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {






				CitizenModel.Citizen.aggregate([
					{ '$match': { 'isUnrefer': 1,ngoId:req.body.ngoId} },//isunrefer 1 showing data refer list

					{ '$sort': { 'createdAt': -1 } },
					{ '$limit': 100 },
					{
						'$lookup': {
							'localField': 'citizenId',
							'from': 'citizendetails',
							'foreignField': 'citizenId',
							'as': 'info'
						}
					},
					{
						'$lookup': {
							'localField': 'citizenId',
							'from': 'screeningcases',
							'foreignField': 'citizenId',
							'as': 'cases'
						}
					},
					{
						'$lookup': {
							'localField': 'screenerId',
							'from': 'screeners',
							'foreignField': 'screenerId',
							'as': 'screeners'
						}
					},
					{ '$unwind': '$info' },
					{ '$unwind': '$screeners' },
					{
						'$project': {
							'fullname': { $concat: ["$firstName", " ", "$lastName"] },
							'screenerId': 1,
							//  'caseId':'$cases.caseId',
							//  'caseStatus':'$cases.status',
							'javixId': 1,
							'isUnrefer': 1,
							'sex': 1,
							'screenerfullname': { $concat: ["$screeners.firstName", " ", "$screeners.lastName"] },
							'mobile': { $ifNull: ["$mobile", "Unspecified"] },
							'email': 1,
							'pstatus': 1,
							'isInstant': 1,
							'citizenId': 1,
							'javixId': 1,
							'aadhaar': 1,
							'ngoId':1,
							'raadhaar': 1,
							'citizenLoginId': 1,
							'createdAt': 1,
							'cases': 
												 {
							    					'$filter' : {
							        'input': '$cases',
							        'as' : 'cases_field',
							         'cond': { '$and': [
							            {'$eq': ['$$cases_field.status',1]}
							        ]}
							    }
							},
							'info.dateOfBirth': 1,
							'info.dateOfOnBoarding': 1,
							'info.bloodGroup': 1,
							'info.country': 1,
							'info.state': 1,
							'info.district': 1,
							'info.address': 1,
							'info.pincode': 1,
							'info.rating': 1,
							'info.geolocations': 1,
							'info.photo': 1,
							'screener.firstName': 1,
							'screener.lastName': 1,


						}
					}
				]
				).then(users => {

					let user = users[0];

					// for (var i = 0; i < users.length; i++) {
					// 	if (users[i].cases.length > 0)
					// 		users[i].cases = users[i].cases[users[i].cases.length - 1];
					// 	//console.dir(users[i]);
					// }

					if (user) {
						for (i = 0; i < users.length; i++) {
							let temp = users[i];
							var ddate = "";
							users[i].info.dateOfOnBoarding = utility.toDDmmyy(users[i].info.dateOfOnBoarding);
							users[i].createdAt = utility.toDDmmyy(users[i].createdAt);
							//users[i].dateOfRegistration=utility.toDDmmyy(users[i].dateOfRegistration);

							if (temp.info.dateOfBirth != null && temp.info.dateOfBirth != undefined && temp.info.dateOfBirth != "") {

								ddate = temp.info.dateOfBirth.toISOString().split('T')[0];
								console.log(ddate);
								var qdate = new Date(ddate);
								//console.log(qdate);
								temp.info.dateOfBirth = qdate.getDate() + "-" + (qdate.getMonth() + 1) + "-" + (qdate.getYear() + 1900);
								console.log(temp.info.dateOfBirth);
								users[i] = temp;
							}
							else {
								temp.info.dateOfBirth = ddate;
								users[i] = temp;
							}
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

exports.citizenRefersCount = [
	// body("token").isLength({ min: 3 }).trim().withMessage("Invalid Token!"),
	// // body("isUnrefer").isLength({ min: 1,max:1 }).trim().withMessage("nActive Status 0|1!").isNumeric().withMessage("isUnActive should be 0|1"),
	

	async (req, res) => {
	await CitizenModel.Citizen.aggregate([
						{ '$match': { 'isUnrefer': true ,ngoId:req.body.ngoId} },

					// { '$sort': { 'createdAt': -1 } },
					{ '$limit': 1000 },
					{
						'$lookup': {
							'localField': 'citizenId',
							'from': 'citizendetails',
							'foreignField': 'citizenId',
							'as': 'info'
						}
					},
					{
						'$lookup': {
							'localField': 'citizenId',
							'from': 'screeningcases',
							'foreignField': 'citizenId',
							'as': 'cases'
						}
					},
					{
						'$lookup': {
							'localField': 'screenerId',
							'from': 'screeners',
							'foreignField': 'screenerId',
							'as': 'screeners'
						}
					},
					{ '$unwind':{path: '$info' , preserveNullAndEmptyArrays: true }},
					{ '$unwind':{path: '$screeners' , preserveNullAndEmptyArrays: true }},
					{
						'$project': {
							'fullname': { $concat: ["$firstName", " ", "$lastName"] },
							'screenerId': 1,
							//  'caseId':'$cases.caseId',
							//  'caseStatus':'$cases.status',
							'javixId': 1,
							'isUnrefer': 1,
							'sex': 1,
							'screenerfullname': { $concat: ["$screeners.firstName", " ", "$screeners.lastName"] },
							'mobile': { $ifNull: ["$mobile", "Unspecified"] },
							'email': 1,
							'pstatus': 1,
							'isInstant': 1,
							'citizenId': 1,
							'javixId': 1,
							'aadhaar': 1,
							'ngoId':1,
							'raadhaar': 1,
							'citizenLoginId': 1,
							'createdAt': 1,
							'cases': 1,
							// 					 {
							//     					'$filter' : {
							//         'input': '$cases',
							//         'as' : 'cases_field',
							//          'cond': { '$and': [
							//             {'$eq': ['$$cases_field.status',1]}
							//         ]}
							//     }
							// },
							'info.dateOfBirth': 1,
							'info.dateOfOnBoarding': 1,
							'info.bloodGroup': 1,
							'info.country': 1,
							'info.state': 1,
							'info.district': 1,
							'info.address': 1,
							'info.pincode': 1,
							'info.rating': 1,
							'info.geolocations': 1,
							'info.photo': 1,
							'screener.firstName': 1,
							'screener.lastName': 1,


						},
						
					},
					{ $group: { _id: null, count: { $sum: 1 } } }
		
			
		  ]).exec((err, likeData) => {
			if (err) {
			  throw err
			} else {
			 
			  response = {
				message: 'Citizen reffered count fatch successfully',
				status: 1,
				// pages: totalPages,
				// total: totalCount,
				// size: size,
				data: likeData[0].count,
				 
			  }
			  
			  res.json(response)
			}
		  })
		}
			

];

exports.CitizenPrescribe = [
	body("token").isLength({ min: 3 }).trim().withMessage("Invalid Token!"),
	// body("isUnrefer").isLength({ min: 1,max:1 }).trim().withMessage("nActive Status 0|1!").isNumeric().withMessage("isUnActive should be 0|1"),
	// sanitizeBody("isUnrefer").escape(),
	(req, res) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {

				CitizenModel.Citizen.aggregate([
					{ '$match': { 'isUnrefer': 2 ,'ngoId':req.body.ngoId} },//isunrefer status 2 showing in prscribe

					{ '$sort': { 'createdAt': -1 } },
					{ '$limit': 1000 },
					{
						'$lookup': {
							'localField': 'citizenId',
							'from': 'citizendetails',
							'foreignField': 'citizenId',
							'as': 'info'
						}
					},
					{
						'$lookup': {
							'localField': 'citizenId',
							'from': 'screeningcases',
							'foreignField': 'citizenId',
							'as': 'cases'
						}
					},
					
					{
						'$lookup': {
							'localField': 'screenerId',
							'from': 'screeners',
							'foreignField': 'screenerId',
							'as': 'screeners'
						}
					},
					{ '$unwind': '$info' },
					{ '$unwind': '$screeners' },
					{
						'$project': {
							'fullname': { $concat: ["$firstName", " ", "$lastName"] },
							'screenerId': 1,
							//  'caseId':'$cases.caseId',
							//  'caseStatus':'$cases.status',
							'javixId': 1,
							'isUnrefer': 1,
							'sex': 1,
							'screenerfullname': { $concat: ["$screeners.firstName", " ", "$screeners.lastName"] },
							'mobile': { $ifNull: ["$mobile", "Unspecified"] },
							'email': 1,
							'pstatus': 1,
							'isInstant': 1,
							'citizenId': 1,
							'javixId': 1,
							
							'ngoId':1,
							'aadhaar': 1,
							'raadhaar': 1,
							'citizenLoginId': 1,
							'createdAt': 1,
							'cases': 1,
							// 					 {
							//     					'$filter' : {
							//         'input': '$cases',
							//         'as' : 'cases_field',
							//          'cond': { '$and': [
							//             {'$eq': ['$$cases_field.status',1]}
							//         ]}
							//     }
							// },
							'info.dateOfBirth': 1,
							'info.dateOfOnBoarding': 1,
							'info.bloodGroup': 1,
							'info.country': 1,
							'info.state': 1,
							'info.district': 1,
							'info.address': 1,
							'info.pincode': 1,
							'info.rating': 1,
							'info.geolocations': 1,
							'info.photo': 1,
							'screener.firstName': 1,
							'screener.lastName': 1,


						}
					}
				]
				).then(users => {

					let user = users[0];

					for (var i = 0; i < users.length; i++) {
						if (users[i].cases.length > 0)
							users[i].cases = users[i].cases[users[i].cases.length - 1];
						//console.dir(users[i]);
					}

					if (user) {
						for (i = 0; i < users.length; i++) {
							let temp = users[i];
							var ddate = "";
							users[i].info.dateOfOnBoarding = utility.toDDmmyy(users[i].info.dateOfOnBoarding);
							users[i].createdAt = utility.toDDmmyy(users[i].createdAt);
							//users[i].dateOfRegistration=utility.toDDmmyy(users[i].dateOfRegistration);

							if (temp.info.dateOfBirth != null && temp.info.dateOfBirth != undefined && temp.info.dateOfBirth != "") {

								ddate = temp.info.dateOfBirth.toISOString().split('T')[0];
								console.log(ddate);
								var qdate = new Date(ddate);
								//console.log(qdate);
								temp.info.dateOfBirth = qdate.getDate() + "-" + (qdate.getMonth() + 1) + "-" + (qdate.getYear() + 1900);
								console.log(temp.info.dateOfBirth);
								users[i] = temp;
							}
							else {
								temp.info.dateOfBirth = ddate;
								users[i] = temp;
							}
						}
						return apiResponse.successResponseWithData(res, "Prescribed Citizen List Fetch Successfully", users);
					}
					else return apiResponse.ErrorResponse(res, "Prescribed Citizen List Not Found");

				});
			}
		} catch (err) {

			return apiResponse.ErrorResponse(res, "EXp:" + err);
		}
	}

];


exports.CitizenPrescribeCount = [
	async (req, res) => {
		await 	CitizenModel.Citizen.aggregate([
			{ '$match': { 'isUnrefer': 2 } },
            {$limit:1000},
			{
				'$lookup': {
					'localField': 'citizenId',
					'from': 'citizendetails',
					'foreignField': 'citizenId',
					'as': 'info'
				}
			},
			{
				'$lookup': {
					'localField': 'citizenId',
					'from': 'screeningcases',
					'foreignField': 'citizenId',
					'as': 'cases'
				}
			},
			{
				'$lookup': {
					'localField': 'screenerId',
					'from': 'screeners',
					'foreignField': 'screenerId',
					'as': 'screeners'
				}
			},
			{ '$unwind': '$info' },
			{ '$unwind': '$screeners' },
			{
				'$project': {
					'fullname': { $concat: ["$firstName", " ", "$lastName"] },
					'screenerId': 1,
					//  'caseId':'$cases.caseId',
					//  'caseStatus':'$cases.status',
					'javixId': 1,
					'isUnrefer': 1,
					'sex': 1,
					'screenerfullname': { $concat: ["$screeners.firstName", " ", "$screeners.lastName"] },
					'mobile': { $ifNull: ["$mobile", "Unspecified"] },
					'email': 1,
					'pstatus': 1,
					'isInstant': 1,
					'citizenId': 1,
					'ngoId':1,
					'javixId': 1,
					'aadhaar': 1,
					'raadhaar': 1,
					'citizenLoginId': 1,
					'createdAt': 1,
					'cases': 1,
					// 					 {
					//     					'$filter' : {
					//         'input': '$cases',
					//         'as' : 'cases_field',
					//          'cond': { '$and': [
					//             {'$eq': ['$$cases_field.status',1]}
					//         ]}
					//     }
					// },
					'info.dateOfBirth': 1,
					'info.dateOfOnBoarding': 1,
					'info.bloodGroup': 1,
					'info.country': 1,
					'info.state': 1,
					'info.district': 1,
					'info.address': 1,
					'info.pincode': 1,
					'info.rating': 1,
					'info.geolocations': 1,
					'info.photo': 1,
					'screener.firstName': 1,
					'screener.lastName': 1,


				}
			},
			
			{ $group: { _id: null, count: { $sum: 1 } } },
			
				
			  ]).exec((err, likeData) => {
				if (err) {
				  throw err
				} else {
				 
				  response = {
					message: 'data fatch successfully',
					status: 1,
					// pages: totalPages,
					// total: totalCount,
					// size: size,
					data: likeData[0].count,
				     
				  }
				  
				  res.json(response)
				}
			  })
			}
				
];

exports.citizenCasesList = [


	(req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(
					res,
					"Validation Error.",
					errors.array()
				);
			} else {
				CitizenModel.Citizen.aggregate([
					{ $match: { citizenId: req.body.citizenId } },
					// {$match:{issubscreener:1}},162480116265360010
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
						'$lookup': {
							'localField': 'citizenId',
							'from': 'screeningcases',
							'foreignField': 'citizenId',
							'as': 'cases'
						}
					},
					{ $unwind: "$cases" },
					{ $unwind: "$citizens" },
					{
						$project: {
							citizenId: 1,
							notes: 1,
							doctorId: 1,
							status: 1,
							screenerId: 1,
							height: 1,
							weight: 1,
							bmi: 1,
							bpsys: 1,
							bpdia: 1,
							arm: 1,
							spo2: 1,
							caseId: 1,
							pulse: 1,
							respiratory_rate: 1,
							temperature: 1,
							referDocId: 1,
							'ngoId':1,
							createdAt: 1,
							'fullname': { $concat: ["$citizens.firstName", " ", "$citizens.lastName"] },
							"citizens.firstName": 1,
							"citizens.lastName": 1,
							"citizens.email": 1,
							'mobile': "$citizens.mobile",
							"citizens.sex": 1,
							"citizendetails.dateOfBirth": 1,
							caseId: "$cases.caseId"
						},
					},
				]).then((users) => {
					let user = users[0];
					if (user) {
						return apiResponse.successResponseWithData(res, "Citizen Cases List Fetch Fuccessfully", users);
					} else
						return apiResponse.successResponseWithData(res, "Citizen Cases not Found", [

						]);
				});
			}
		} catch (err) {
			return apiResponse.ErrorResponse(res, "EXp:" + err);
		}
	},
];
exports.searchcitizendata=[
	async (req, res) => {
	  try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
		  return apiResponse.validationErrorWithData(
			res,
			"Validation Error.",
			errors.array()
		  );
		} else {
  
		  const allTasks = await CitizenModel.Citizen.find({citizenId : req.body.citizenId})
		  var condition = {};
		  if (
			req.body.familyId != "" &&
			req.body.familyId != undefined &&
			req.body.familyId != null
		  ) {
			condition["familyId"] = req.body.familyId;
		  }
		  if (
			req.body.citizenId != "" &&
			req.body.citizenId != undefined &&
			req.body.citizenId != null
		  ) {
			condition["citizenId"] = req.body.citizenId;
		  }
		  if (
			req.body.screenerId != "" &&
			req.body.screenerId != undefined &&
			req.body.screenerId != null
		  ) {
			condition["screenerId"] = req.body.screenerId;
		  }
  
		 await CitizenModel.Citizen.aggregate([
			{ $match: condition },
			
			{ $sort: { createdAt: -1 } },
			
			
		  ]).then((users) => {
			let user = users[0];
			if (user) {
			  return apiResponse.successResponseWithData(res, "Found", users ,allTasks );
			}
		  });
		}
	  } catch (err) {
		return apiResponse.ErrorResponse(res, "EXp:" + err);
	  }
	},
  ]

// -------------------display refer list data end--------------
exports.citizenListSearcherPagination = [
	//body("screenerId").isLength({ min: 3 }).trim().withMessage("Invalid Credential!"),
	body("token").isLength({ min: 3 }).trim().withMessage("Invalid Token!"),


	async (req, res) => {

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

		// Find some documents
		await CitizenModel.Citizen.count({ 'isdeleted':false,'ngoId':req.body.ngoId}, async (err, totalCount) => {
			if (err) {
				response = { error: true, message: 'Error fetching data' }
			}
			await CitizenModel.Citizen.find({}, {}, query, async (err, data) => {
				// Mongo command to fetch all data from collection.
				// const post_id = data.post_id
				if (err) {
					response = { error: true, message: 'Error fetching data' }
				} else {

					var queryP = { '$match': {} };
					/*if(req.body.v!=null && req.body.v!=undefined && req.body.v!="" ){
						
						queryP={'$match':{'$or':[{'firstName':{$regex: ".*" + req.body.v + ".*",$options: "i"}},{'lastName':{$regex: ".*" + req.body.v + ".*",$options: "i"}},{'citizenId':req.body.v}]}};
					}*/
					if (req.body.v != null && req.body.v != undefined && req.body.v != "") {
						let vtemp = req.body.v.trim().split(" ");
						if (vtemp.length === 2) {
							queryP = { '$match': { '$and': [{ 'firstName': { $regex: ".*" + vtemp[0] + ".*", $options: "i" } }, { 'lastName': { $regex: ".*" + vtemp[1] + ".*", $options: "i" } }] } };
						}
						else {
							queryP = { '$match': { '$or': [{ 'firstName': { $regex: ".*" + req.body.v + ".*", $options: "i" } }, { 'lastName': { $regex: ".*" + req.body.v + ".*", $options: "i" } }, { 'citizenId': req.body.v }] } };
						}
					}




					await CitizenModel.Citizen.aggregate([
						queryP,
						{$match:{'isdeleted':false}},
						{$match:{'ngoId':req.body.ngoId}},
						{ '$sort': { 'createdAt': -1 } },
						{
							'$lookup': {
								'localField': 'citizenId',
								'from': 'citizendetails',
								'foreignField': 'citizenId',
								'as': 'info'
							}
						},
						{
							'$lookup': {
								'localField': 'citizenId',
								'from': 'screeningcases',
								'foreignField': 'citizenId',
								'as': 'cases'
							}
						},
						{
							'$lookup': {
								'localField': 'screenerId',
								'from': 'screeners',
								'foreignField': 'screenerId',
								'as': 'screener'
							}
						},
						{ '$unwind': '$info' },
						{ '$unwind': '$screener' },
						{
							'$project': {
								'screenerId': 1,
								'fullname': { $concat: ["$firstName", " ", "$lastName"] },
								'firstName': 1,
								'lastName': 1,
								'ngoId':1,
								'sex': 1,
								'mobile': 1,
								'email': 1,
								'pstatus': 1,
								'isInstant': 1,
								'citizenId': 1,
								'javixId': 1,
								'aadhaar': 1,
								'raadhaar': 1,
								'citizenLoginId': 1,
								'createdAt': 1,
								'info.dateOfBirth': 1,
								'info.dateOfOnBoarding': 1,
								'info.bloodGroup': 1,
								'info.country': 1,
								'info.state': 1,
								'info.district': 1,
								'info.address': 1,
								'info.pincode': 1,
								'info.rating': 1,
								'info.geolocations': 1,
								photo:'$info.photo',
								'screener.firstName': 1,
								'screener.lastName': 1,
								'screenerfullname': { $concat: ["$screener.firstName", " ", "$screener.lastName"] },
								'cases': 1,
								

							}
							
						},
						{ $skip: query.skip },
							   { $limit: query.limit },
					]
					).then(users => {
						

						let user = users[0];

						for (var i = 0; i < users.length; i++) {
							if (users[i].cases.length > 0)
								users[i].cases = users[i].cases[users[i].cases.length - 1];
							//console.dir(users[i]);
						}

						if (user) {
							for (i = 0; i < users.length; i++) {
								let temp = users[i];
								var ddate = "";
								users[i].info.dateOfOnBoarding = utility.toDDmmyy(users[i].info.dateOfOnBoarding);
								users[i].createdAt = utility.toDDmmyy(users[i].createdAt);
								//users[i].dateOfRegistration=utility.toDDmmyy(users[i].dateOfRegistration);

								if (temp.info.dateOfBirth != null && temp.info.dateOfBirth != undefined && temp.info.dateOfBirth != "") {

									ddate = temp.info.dateOfBirth.toISOString().split('T')[0];
									var qdate = new Date(ddate);
									temp.info.dateOfBirth = qdate.getDate() + "-" + (qdate.getMonth() + 1) + "-" + (qdate.getYear() + 1900);
									users[i] = temp;
								}
								else {
									temp.info.dateOfBirth = ddate;
									users[i] = temp;
								}
							}
							var totalPages = Math.ceil(totalCount / size)
							response = {
								message: 'data fatch successfully',
								status: 1,
								pages: totalPages,
								total: totalCount,
								size: size,
								data: users
							}

							res.json(response)
						}


					});

				}
			})
		})

			}

];
exports.citizenListSearcher=[
    //body("screenerId").isLength({ min: 3 }).trim().withMessage("Invalid Credential!"),
	body("token").isLength({ min: 3 }).trim().withMessage("Invalid Token!"),
	
	
    (req, res) => { 
			
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
				
					var queryP={'$match':{}};
					/*if(req.body.v!=null && req.body.v!=undefined && req.body.v!="" ){
						
						queryP={'$match':{'$or':[{'firstName':{$regex: ".*" + req.body.v + ".*",$options: "i"}},{'lastName':{$regex: ".*" + req.body.v + ".*",$options: "i"}},{'citizenId':req.body.v}]}};
					}*/
if(req.body.v!=null && req.body.v!=undefined && req.body.v!="" ){
let vtemp=req.body.v.trim().split(" ");
if(vtemp.length===2){
queryP={'$match':{'$and':[{'firstName':{$regex: ".*" + vtemp[0] + ".*",$options: "i"}},{'lastName':{$regex: ".*" + vtemp[1] + ".*",$options: "i"}}]}};
}
else{
queryP={'$match':{'$or':[{'firstName':{$regex: ".*" + req.body.v + ".*",$options: "i"}},{'lastName':{$regex: ".*" + req.body.v + ".*",$options: "i"}},{'citizenId':req.body.v}]}};
}
}
					
					


			CitizenModel.Citizen.aggregate([
							queryP,
							{'$sort':{'createdAt':-1}},
							
							{'$limit':1000},
							{'$lookup': {
								'localField':'citizenId',
								'from':'citizendetails',
								'foreignField':'citizenId',
								'as':'info'	
							 }
							},
							{'$lookup': {
								'localField':'citizenId',
								'from':'screeningcases',
								'foreignField':'citizenId',
								'as':'cases'
							 }
							},
							{'$lookup': {
                                                                'localField':'screenerId',
                                                                'from':'screeners',
                                                                'foreignField':'screenerId',
                                                                'as':'screener'
                                                         }
                                                        },
							{'$unwind':'$info'},
							{'$project':{
								 
								 'screenerId':1,
								 'firstName':1,
								 'lastName':1,
								 'sex':1,
								 'mobile':1,
								 'email':1,
								 'pstatus':1,
								 'isInstant':1,
								 'citizenId':1,
								 'ngoId':1,
								 'javixId':1,
                                 'aadhaar':1,
                                 'raadhaar':1,
								 'citizenLoginId':1,
								 'createdAt':1,
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
								'screener.firstName':1,
								'screener.lastName':1,
								 'cases': 1,
								 'isdeleted':1
								//  {
            //     					'$filter' : {
            //         'input': '$cases',
            //         'as' : 'cases_field',
            //          'cond': { '$and': [
            //             {'$eq': ['$$cases_field.status',1]}
            //         ]}
            //     }
            // }
								 
								}
							},
							{$match:{'isdeleted':false,ngoId:req.body.ngoId}},
						]
				).then(users => {
					
					let user=users[0];
					
					for(var i=0;i<users.length;i++){
						if(users[i].cases.length>0) 
						users[i].cases=users[i].cases[users[i].cases.length-1];
						//console.dir(users[i]);
					}

					if (user) {
						for(i=0;i<users.length;i++){
						let temp=users[i];
						var ddate="";
						users[i].info.dateOfOnBoarding=utility.toDDmmyy(users[i].info.dateOfOnBoarding);
						users[i].createdAt=utility.toDDmmyy(users[i].createdAt);
						//users[i].dateOfRegistration=utility.toDDmmyy(users[i].dateOfRegistration);
					  	
					  	if(temp.info.dateOfBirth!=null && temp.info.dateOfBirth!=undefined && temp.info.dateOfBirth!=""){
					  		
					  		ddate=temp.info.dateOfBirth.toISOString().split('T')[0];
					  		var qdate=new Date(ddate);
					  		temp.info.dateOfBirth=qdate.getDate()+"-"+(qdate.getMonth()+1)+"-"+(qdate.getYear()+1900);
					  		users[i]=temp;
					  	}
					  	else{
					  		temp.info.dateOfBirth=ddate;
					  		users[i]=temp;
					  	}
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



exports.citizenById = [
	//body("citizenId").isLength({ min: 3 }).trim().withMessage("Invalid citizenId Credential!"),

	body("token").isLength({ min: 3 }).trim().withMessage("Invalid Token!"),
	sanitizeBody("citizenId").escape(),
	sanitizeBody("userId").escape(),
	sanitizeBody("token").escape(),

	(req, res) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {
				CitizenModel.Citizen.aggregate([
					{ '$match': { '$or': [{ 'citizenId': req.body.citizenId }, { 'citizenLoginId': req.body.userId }] } },
					{ '$limit': 100000 },
					{
						'$lookup': {
							'localField': 'citizenId',
							'from': 'citizendetails',
							'foreignField': 'citizenId',
							'as': 'info'
						}
					},
					{
						'$lookup': {
							'localField': 'citizenId',
							'from': 'screeningcases',
							'foreignField': 'citizenId',
							'as': 'cases'
						}
					},
					{ '$unwind': '$info' },
					{
						'$project': {

							'screenerId': 1,
							'firstName': 1,
							'lastName': 1,
							'sex': 1,
							'mobile': 1,
							'email': 1,
							'pstatus': 1,
							'isInstant': 1,
							'citizenId': 1,
							'javixId': 1,
							'aadhaar': 1,
							'ngoId':1,
							'raadhaar': 1,
							'citizenLoginId': 1,
							'createdAt': 1,
							'info.dateOfBirth': 1,
							'info.dateOfOnBoarding': 1,
							'info.bloodGroup': 1,
							'info.country': 1,
							'info.state': 1,
							'info.district': 1,
							'info.address': 1,
							'info.pincode': 1,
							'info.rating': 1,
							'info.geolocations': 1,
							'info.photo': 1,
							'cases.caseId': 1,
							'cases.status': 1

						}
					}
				]
				).then(users => {

					let user = users[0];
					if (user) {
						var cdate = "";
						user.info.dateOfOnBoarding = utility.toDDmmyy(user.info.dateOfOnBoarding);
						user.createdAt = utility.toDDmmyy(user.createdAt);

						if (user.info.dateOfBirth != null && user.info.dateOfBirth != undefined && user.info.dateOfBirth != "") {
							cdate = user.info.dateOfBirth.toISOString().split('T')[0];
							var adate = new Date(cdate);
							user.info.dateOfBirth = adate.getDate() + "-" + (adate.getMonth() + 1) + "-" + (adate.getYear() + 1900);
						}
						else {
							user.info.dateOfBirth = cdate;
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



exports.addDocuments = [

	body("citizenId").isLength({ min: 3 }).trim().withMessage("Invalid CitizenId!").custom((value) => {
		return CitizenModel.Citizen.findOne({ citizenId: value }).then((user) => {
			if (user) { }
			else {
				return Promise.reject("Citizen Not Found !");
			}
		});
	}),
	body("token").isLength({ min: 3 }).trim().withMessage("Invalid Token!"),

	body("doctorId")
		.custom((value) => {
			if (value != null && value != "" && value != undefined) {
				if (value.length < 4) {
					return Promise.reject("Invalid Doctor Id!");
				}
			}
			return DoctorModel.Doctor.findOne({ doctorId: value }).then((user) => {
				if (value != null && value != "" && value != undefined) {
					if (!user) {
						return Promise.reject("Doctor Id not Found");
					}
				}
			});
		}),

	body("screenerId")
		.custom((value) => {
			if (value != null && value != "" && value != undefined) {
				if (value.length < 4) {
					return Promise.reject("Invalid Screener Id!");
				}
			}
			return ScreenerModel.Screener.findOne({ screenerId: value }).then((user) => {
				if (value != null && value != "" && value != undefined) {
					if (!user) {
						return Promise.reject("Screener Id not Found");
					}
				}
			});
		}),


	body("status").isLength({ min: 1 }).trim().withMessage("Enter Status!"),
	body("recordUrl").isLength({ min: 3 }).trim().withMessage("Enter record Url!"),
	body("type").isLength({ min: 1 }).trim().withMessage("Enter type of record!"),


	sanitizeBody("citizenId").escape(),
	sanitizeBody("token").escape(),
	sanitizeBody("screenerId").escape(),
	sanitizeBody("doctorId").escape(),
	sanitizeBody("status").escape(),
	sanitizeBody("type").escape(),
	sanitizeBody("decription").escape(),

	(req, res) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {

				var recCitizenRecord = {
					citizenId: req.body.citizenId,
					screenerId: req.body.screenerId,
					doctorId: req.body.doctorId,
					status: req.body.status,
					recordUrl: req.body.recordUrl,
					type: req.body.type,
					description: req.body.description,
					ngoId:req.body.ngoId,
				};
				var actionCitizen = new CitizenModel.CitizenRecords(recCitizenRecord);
				actionCitizen.save(function (_error) {
					if (_error) { apiResponse.ErrorResponse(res, "Sorry:" + _error); }
					else {
						return apiResponse.successResponseWithData(res, "Successfully Submitted", recCitizenRecord);
					}
				}
				);

			}// else 
		} catch (err) {

			return apiResponse.ErrorResponse(res, err);
		}
	}];

exports.recordList = [
	body("citizenId").isLength({ min: 3 }).trim().withMessage("Invalid CitizenId!").custom((value) => {
		return CitizenModel.Citizen.findOne({ citizenId: value }).then((user) => {
			if (user) { }
			else {
				return Promise.reject("Citizen Not Found !");
			}
		});
	}),
	body("token").isLength({ min: 3 }).trim().withMessage("Invalid Token!"),
	sanitizeBody("citizenId").escape(),
	sanitizeBody("token").escape(),

	(req, res) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {



				CitizenModel.CitizenRecords.aggregate([
					{ '$match': { citizenId: req.body.citizenId } },
					{ '$limit': 100000 },
					{
						'$lookup': {
							'localField': 'citizenId',
							'from': 'citizens',
							'foreignField': 'citizenId',
							'as': 'info'
						}
					},
					{
						'$lookup': {
							'localField': 'doctorId',
							'from': 'doctors',
							'foreignField': 'doctorId',
							'as': 'doctor'
						}
					},
					{
						'$lookup': {
							'localField': 'screenerId',
							'from': 'screeners',
							'foreignField': 'screenerId',
							'as': 'screener'
						}
					},
					{ '$unwind': '$info' },
					{
						'$project': {

							'citizenId': 1,
							'recordUrl': 1,
							'screenerId': 1,
							'doctorId': 1,
							'status': 1,
							'type': 1,
							'ngoId':1,
							'createdAt': 1,
							'info.firstName': 1,
							'info.lastName': 1,
							'doctor.firstName': 1,
							'doctor.lastName': 1,
							'screener.firstName': 1,
							'screener.lastName': 1,
							'doctor.doctorId': 1

						}
					}
				]
				).then(users => {

					let user = users[0];

					if (user) {
						for (i = 0; i < users.length; i++) {
							let temp = users[i];
							var ddate = "";

							if (temp.createdAt != null && temp.createdAt != undefined && temp.createdAt != "") {

								ddate = temp.createdAt.toISOString().split('T')[0];
								var qdate = new Date(ddate);
								temp.createdAt = qdate.getDate() + "-" + (qdate.getMonth() + 1) + "-" + (qdate.getYear() + 1900);
								users[i] = temp;
							}
							else {
								temp.createdAt = ddate;
								users[i] = temp;
							}
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
// Update Citizen and citizen address
exports.updateCitizen = [

	body("citizenLoginId").isLength({ min: 3 }).trim().withMessage("Invalid CitizenLoginId!").custom((value) => {
		return CitizenModel.Citizen.findOne({ citizenLoginId: value }).then((user) => {
			if (user) { }
			else return Promise.reject("Invalid citizenLoginId");
		});
	}),
	//body("firstName").isLength({ min: 3 }).trim().withMessage("Enter First Name!"),
	//body("lastName").isLength({ min: 3 }).trim().withMessage("Enter Last Name!"),
	// body("aadhaar").custom((value) => {


	// 				if(value!=null && value!="" && value!=undefined){
	// 				if(value.length!=12 ){
	// 				return Promise.reject("Aadhar no. should have 12 digits!");
	// 			}
	// 		}

	// 	return CitizenModel.Citizen.findOne({aadhaar : value}).then((user) => {
	// 		if(value!=null && value!="" && value!=undefined){

	// 		if (user) {
	// 			return Promise.reject("Aadhaar No already in use");
	// 		}
	// 	}
	// 	});
	// }),

	body("mobileNo")
		.custom((value) => {

			if (value != null && value != "" && value != undefined) {
				if (value.length != 10 || value[0] === '0' || isNaN(value)) {
					return Promise.reject("Mobile no. should have 10 digits with no preceeding zero!");
				}
			}

			return CitizenModel.Citizen.findOne({ mobile: value }).then((user) => {
				if (value != null && value != "" && value != undefined) {

					if (user) {
						//return Promise.reject("Mobile No already in use");
					}
				}
			});
		}),

	body("email")
		.custom((value) => {

			if (value != null && value != "" && value != undefined) {
				if (value.length < 10 || value[0] === '@' || !(value.includes("@")) || !(value.includes("."))) {
					return Promise.reject("Invalid Email Address!");
				}
			}
			return CitizenModel.Citizen.findOne({ email: value }).then((user) => {
				if (value != null && value != "" && value != undefined) {
					if (user) {
						return Promise.reject("E-mail already in use");
					}
				}
			});
		}),

	sanitizeBody("citizenLoginId").escape(),
	sanitizeBody("firstName").escape(),
	sanitizeBody("lastName").escape(),
	sanitizeBody("mobileNo").escape(),
	sanitizeBody("email").escape(),
	sanitizeBody("aadhaar").escape(),

	(req, res) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {
				var recCitizen = {

					firstName: req.body.firstName,
					lastName: req.body.lastName,
					//aadhaar:req.body.aadhaar,
					mobile: req.body.mobileNo,
					email: req.body.email,
					isInstant: 2,
					


				};

				CitizenModel.Citizen.findOneAndUpdate(
					{ citizenLoginId: req.body.citizenLoginId },
					{ $set: recCitizen },

					{ new: true },
					function (_error, newrecs) {
						if (_error) { return apiResponse.ErrorResponse(res, "Sorry:" + _error); }
						else if (newrecs != null) {

							var userRec = {
								firstName: req.body.firstName,
								lastName: req.body.lastName,
								phoneNo: req.body.mobileNo,
								email: req.body.email,
							

							};
							UserDetailsModel.findOneAndUpdate({ userId: req.body.citizenLoginId }, { $set: userRec }, function (_derr, _dnewrecs) {
								if (req.body.dateOfBirth != undefined && req.body.dateOfBirth != null && req.body.dateOfBirth != "") {
									var recDetails = {
										dateOfBirth: utility.toYYmmdd(req.body.dateOfBirth)
									};

									CitizenModel.CitizenDetails.findOneAndUpdate(
										{ citizenId: req.body.citizenLoginId },
										{
											$set: recDetails
										},

										{ new: true },
										function (_error, newrecs) {
											if (_error) { return apiResponse.ErrorResponse(res, "Sorry:" + _error); }
											else {

											}
										});
								}

							});


							return apiResponse.successResponseWithData(res, "Success", newrecs);
						}
						else {
							var userRec = {
								firstName: req.body.firstName,
								lastName: req.body.lastName,
								phoneNo: req.body.mobileNo,
								email: req.body.email,
								

							};
							UserDetailsModel.findOneAndUpdate({ userId: req.body.citizenLoginId }, { $set: userRec }, function (_derr, _dnewrecs) {
								var recDetails = {
									dateOfBirth: utility.toYYmmdd(req.body.dateOfBirth)
								};
								CitizenModel.CitizenDetails.findOneAndUpdate(
									{ citizenId: req.body.citizenLoginId },
									{
										$set: recDetails
									},

									{ new: true },
									function (_error, newrecs) {
										if (_error) { return apiResponse.ErrorResponse(res, "Sorry:" + _error); }
										else {

										}
									});

							});
							return apiResponse.successResponseWithData(res, "Successfully Updated");


						}
					}
				);







			}
		} catch (err) {

			return apiResponse.ErrorResponse(res, "EXp:" + err);
		}
	}
];


// ---==-----add ismapped update all
exports.updateCitizenR = [

	(req, res) => {


		ScreeningCaseModel.ScreeningCase.update({}, { $set: { "isUnrefer": false } }, { upsert: false, multi: true })


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
// ===----
exports.updateCitizenAddress = [

	body("citizenId").isLength({ min: 3 }).trim().withMessage("Invalid CitizenId!").custom((value) => {
		return CitizenModel.Citizen.findOne({ citizenId: value }).then((user) => {
			if (user) { }
			else return Promise.reject("Invalid CitizenId");
		});
	}),

	body("country").isLength({ min: 2 }).trim().withMessage("Enter Country !").isAlpha().withMessage("Country name must not contain number !"),
	body("state").isLength({ min: 2 }).trim().withMessage("Enter State !"),
	body("district").isLength({ min: 2 }).trim().withMessage("Enter District !"),
	body("address").isLength({ min: 3 }).trim().withMessage("Enter Address !"),

	sanitizeBody("citizenId").escape(),

	sanitizeBody("country").escape(),
	sanitizeBody("state").escape(),
	sanitizeBody("district").escape(),
	sanitizeBody("address").escape(),
	sanitizeBody("pincode").escape(),

	(req, res) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {
				var recDetails = {


					country: req.body.country,
					state: req.body.state,
					district: req.body.district,
					address: req.body.address,
					pincode: req.body.pincode



				};
				CitizenModel.CitizenDetails.findOneAndUpdate(
					{ citizenId: req.body.citizenId },
					{
						$set: recDetails
					},

					{ new: true },
					function (_error, newrecs) {
						if (_error) { return apiResponse.ErrorResponse(res, "Sorry:" + _error); }
						else if (newrecs != null) {

							var userRec = {
								isInstant: 2

							};
							CitizenModel.Citizen.findOneAndUpdate({ citizenId: req.body.citizenId }, { $set: userRec }, function (_derr, _dnewrecs) { });


							return apiResponse.successResponseWithData(res, "Success", newrecs);
						}
						else {

							var userRec = {
								isInstant: 2

							};
							CitizenModel.Citizen.findOneAndUpdate({ citizenId: req.body.citizenId }, { $set: userRec }, function (_derr, _dnewrecs) { });


							return apiResponse.successResponseWithData(res, "Successfully Updated");


						}
					}
				);







			}
		} catch (err) {

			return apiResponse.ErrorResponse(res, "EXp:" + err);
		}
	}];



exports.citizenNewList = [
	//body("screenerId").isLength({ min: 3 }).trim().withMessage("Invalid Credential!"),
	body("token").isLength({ min: 3 }).trim().withMessage("Invalid Token!"),
	sanitizeBody("screenerId").escape(),
	sanitizeBody("citizenId").escape(),
	sanitizeBody("status").escape(),

	(req, res) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {
				var matchfield = {};
				var arraymatch = [];


				if (req.body.screenerId != null && req.body.screenerId != undefined && req.body.screenerId != "") {
					screenerId = req.body.screenerId;
					matchfield["screenerId"] = screenerId;
					arraymatch.push(matchfield);
					matchfield = {};
				}
				if (req.body.citizenId != null && req.body.citizenId != undefined && req.body.citizenId != "") {
					citizenId = req.body.citizenId;
					matchfield["citizenId"] = citizenId;
					arraymatch.push(matchfield);
					matchfield = {};
				}
				if (req.body.status != null && req.body.status != undefined && req.body.status != "") {
					status = req.body.status;
					matchfield["pstatus"] = status;
					arraymatch.push(matchfield);
					matchfield = {};
				}
				if (req.body.firstName != null && req.body.firstName != undefined && req.body.firstName != "") {
					firstName = req.body.firstName;
					matchfield["firstName"] = firstName;
					arraymatch.push(matchfield);
					matchfield = {};
				}
				if (req.body.lastName != null && req.body.lastName != undefined && req.body.lastName != "") {
					lastName = req.body.lastName;
					matchfield["lastName"] = lastName;
					arraymatch.push(matchfield);
					matchfield = {};
				}
				if (req.body.email != null && req.body.email != undefined && req.body.email != "") {
					email = req.body.email;
					matchfield["email"] = email;
					arraymatch.push(matchfield);
					matchfield = {};
				}
				if (req.body.mobile != null && req.body.mobile != undefined && req.body.mobile != "") {
					mobile = req.body.mobile;
					matchfield["mobile"] = mobile;
					arraymatch.push(matchfield);
					matchfield = {};
				}

				var andcond = { '$match': { '$or': arraymatch } };
				if (arraymatch.length === 0) {
					andcond = { '$match': {} };

				}
				console.dir(andcond);


				CitizenModel.Citizen.aggregate([
					andcond,
					{ '$limit': 100000 },
					{ '$sort': { 'createdAt': -1 } },
					{
						'$lookup': {
							'localField': 'citizenId',
							'from': 'citizendetails',
							'foreignField': 'citizenId',
							'as': 'info'
						}
					},
					{
						'$lookup': {
							'localField': 'citizenId',
							'from': 'screeningcases',
							'foreignField': 'citizenId',
							'as': 'cases'
						}
					},
					{ '$unwind': '$info' },
					{
						'$project': {

							'screenerId': 1,
							'firstName': 1,
							'lastName': 1,
							'sex': 1,
							'mobile': 1,
							'email': 1,
							'pstatus': 1,
							'isInstant': 1,
							'citizenId': 1,
							'javixId': 1,
							'aadhaar': 1,
							'ngoId':1,
							'raadhaar': 1,
							'citizenLoginId': 1,
							'createdAt': 1,
							'info.dateOfBirth': 1,
							'info.dateOfOnBoarding': 1,
							'info.bloodGroup': 1,
							'info.country': 1,
							'info.state': 1,
							'info.district': 1,
							'info.address': 1,
							'info.pincode': 1,
							'info.rating': 1,
							'info.geolocations': 1,
							'info.photo': 1,
							'cases': {
								'$filter': {
									'input': '$cases',
									'as': 'cases_field',
									'cond': {
										'$and': [
											{ '$eq': ['$$cases_field.status', 1] }
										]
									}
								}
							}

						}
					}
				]
				).then(users => {

					let user = users[0];

					for (var i = 0; i < users.length; i++) {
						if (users[i].cases.length > 0)
							users[i].cases = users[i].cases[users[i].cases.length - 1];
						//console.dir(users[i]);
					}

					if (user) {
						for (i = 0; i < users.length; i++) {
							let temp = users[i];
							var ddate = "";
							users[i].info.dateOfOnBoarding = utility.toDDmmyy(users[i].info.dateOfOnBoarding);
							users[i].createdAt = utility.toDDmmyy(users[i].createdAt);
							//users[i].dateOfRegistration=utility.toDDmmyy(users[i].dateOfRegistration);

							if (temp.info.dateOfBirth != null && temp.info.dateOfBirth != undefined && temp.info.dateOfBirth != "") {

								ddate = temp.info.dateOfBirth.toISOString().split('T')[0];
								var qdate = new Date(ddate);
								temp.info.dateOfBirth = qdate.getDate() + "-" + (qdate.getMonth() + 1) + "-" + (qdate.getYear() + 1900);
								users[i] = temp;
							}
							else {
								temp.info.dateOfBirth = ddate;
								users[i] = temp;
							}
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

exports.listcity = [
	//body("doctorId").isLength({ min: 3 }).trim().withMessage("Invalid Credential!"),
	// body("userId").isLength({ min: 3 }).trim().withMessage("Enter userId"),
	body("token").isLength({ min: 3 }).trim().withMessage("Invalid Token!"),
	// sanitizeBody("doctorId").escape(),
	// sanitizeBody("userId").escape(),
	sanitizeBody("token").escape(),

	(req, res) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {
				CitizenModel.Citizen.aggregate([
					{ '$match': { '$or': [{ 'isUnrefer': req.body.isUnrefer }] } },
					{
						'$lookup': {
							'localField': 'citizenId',
							'from': 'citizendetails',
							'foreignField': 'citizenId',
							'as': 'info'
						}
					},
					{ '$unwind': '$info' },
					{
						'$project': {

							'screenerId': 1,
							'firstName': 1,
							'lastName': 1,
							'sex': 1,
							'mobile': 1,
							'email': 1,
							'pstatus': 1,
							'isInstant': 1,
							'isUnrefer': 1,
							'citizenId': 1,
							'javixId': 1,
							'aadhaar': 1,
							'raadhaar': 1,
							'ngoId':1,
							'citizenLoginId': 1,
							'createdAt': 1,
							'info.dateOfBirth': 1,
							'info.dateOfOnBoarding': 1,
							'info.bloodGroup': 1,
							'info.country': 1,
							'info.state': 1,
							'info.district': 1,
							'info.address': 1,
							'info.pincode': 1,
							'info.rating': 1,
							'info.geolocations': 1,
							'info.photo': 1,
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

	//update and add isdeleted variable in screener table
exports.updateandCitizenScreener= [
		(req, res) => { 
			
			// let id = req.params.id;
	

			// const annoucement = await Announcements.updateOne(req.body, { where: { id: id }})
		  
			CitizenModel.Citizen.update({},{$set : {"isdeleted": false}}, {upsert:false, multi:true})

		  
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

exports.updateNgoIdData= [
		(req, res) => { 
			
			// let id = req.params.id;
	

			// const annoucement = await Announcements.updateOne(req.body, { where: { id: id }})
		  
			CitizenModel.Citizen.update({},{$set : {"ngoId":"rakesh"}}, {upsert:false, multi:true})

		  
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

	// exports.updateIsrefer= [
	// 	(req, res) => { 
			
	// 		// let id = req.params.id;
	

	// 		// const annoucement = await Announcements.updateOne(req.body, { where: { id: id }})
		  
	// 		// CitizenModel.Citizen.updateOne({'isUnrefer':true},{$set : {"isUnrefer":1}}, {upsert:false, multi:true})
	// 		CitizenModel.Citizen.update({'isUnrefer':true}, { $set: {"isUnrefer":1}})
	// 		// CitizenModel.Citizen.find({'isUnrefer':true})
	// 		  .then((note) => {
	// 			if (!note) {
	// 			  return res.status(404).send({
	// 				message: "data not found with id " + req.params.id,
	// 			  });
	// 			}
	// 			res.send(note);
	// 		  })
	// 		  .catch((err) => {
			  
	// 			if (err.kind === "ObjectId") {
	// 			  return res.status(404).send({
	// 				message: "data not found with id ",
	// 			  });
	// 			}
	// 			return res.status(500).send({
	// 			  message: "Error updating note with id ",
	// 			});
	// 		  });
			   
	// 	}

						
	
	// ];


	exports.updateIsrefer = [


		// body("citizenId").custom((value) => {
		// 	return CitizenModel.Citizen.findOne({ citizenId: value }).then((user) => {
		// 		if (user) { }
		// 		else return Promise.reject("Invalid User Selection");
		// 	});
		// }),
		// body("status").isLength({ min: 1,max:1 }).trim().withMessage("Invalid Status!").isNumeric().withMessage("status 0-9"),
		// body("pstatus").isLength({ min: 1,max:1 }).trim().withMessage("Blocked Status 0|1!").isNumeric().withMessage("isBlocked should be 0|1"),
		// // body("isInstant").isLength({ min: 1,max:1 }).trim().withMessage("Expired Status 0|1!").isNumeric().withMessage("isExpired should be 0|1"),
		// body("isUnrefer").isLength({ min: 1, max: 1 }).trim().withMessage("nActive Status 0|1!").isNumeric().withMessage("isUnActive should be 0|1"),
	
		// sanitizeBody("citizenId").escape(),
		// // sanitizeBody("status").escape(),
		// sanitizeBody("pstatus").escape(),
		// sanitizeBody("isInstant").escape(),
		// sanitizeBody("isUnrefer").escape(),
	
		(req, res) => {
	
			try {
				const errors = validationResult(req);
				if (!errors.isEmpty()) {
					return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
				} else {
	

				
	
								CitizenModel.Citizen.findOneAndUpdate( {citizenId:req.body.citizenId},{ '$set': { 'isUnrefer': req.body.isUnrefer} }, function (ierr, iresDoc) {
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
			} catch (err) {
	
				return apiResponse.ErrorResponse(res, "EXp:" + err);
			}
		}];
	

		exports.updateIsrefer = [


			// body("citizenId").custom((value) => {
			// 	return CitizenModel.Citizen.findOne({ citizenId: value }).then((user) => {
			// 		if (user) { }
			// 		else return Promise.reject("Invalid User Selection");
			// 	});
			// }),
			// body("status").isLength({ min: 1,max:1 }).trim().withMessage("Invalid Status!").isNumeric().withMessage("status 0-9"),
			// body("pstatus").isLength({ min: 1,max:1 }).trim().withMessage("Blocked Status 0|1!").isNumeric().withMessage("isBlocked should be 0|1"),
			// // body("isInstant").isLength({ min: 1,max:1 }).trim().withMessage("Expired Status 0|1!").isNumeric().withMessage("isExpired should be 0|1"),
			// body("isUnrefer").isLength({ min: 1, max: 1 }).trim().withMessage("nActive Status 0|1!").isNumeric().withMessage("isUnActive should be 0|1"),
		
			// sanitizeBody("citizenId").escape(),
			// // sanitizeBody("status").escape(),
			// sanitizeBody("pstatus").escape(),
			// sanitizeBody("isInstant").escape(),
			// sanitizeBody("isUnrefer").escape(),
		
			(req, res) => {
		
				try {
					const errors = validationResult(req);
					if (!errors.isEmpty()) {
						return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
					} else {
		
	
					
		
									CitizenModel.Citizen.findOneAndUpdate( {citizenId:req.body.citizenId},{ '$set': { 'isUnrefer': req.body.isUnrefer} }, function (ierr, iresDoc) {
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
				} catch (err) {
		
					return apiResponse.ErrorResponse(res, "EXp:" + err);
				}
			}];
		
			exports.updateallIsrefer = [

				(req, res) => { 
						
					// let id = req.params.id;
			
			
					// const annoucement = await Announcements.updateOne(req.body, { where: { id: id }})
				  
					CitizenModel.Citizen.update({},{$set : {"isUnrefer":0}}, {upsert:false, multi:true})
			
				  
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
					

exports.CitizenScreenerDeletedAuth = [
	

	(req, res) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {


				CitizenModel.Citizen.updateMany({ 'screenerId': req.body.screenerId }, { '$set': { 'isdeleted': req.body.isdeleted } }, function (err, resDoc) {
					if (err) {
						return apiResponse.ErrorResponse(res, err);
					}
					else {
						if (resDoc) {

							CitizenModel.Citizen.updateMany({ 'screenerId': req.body.screenerId }, { '$set': { 'isdeleted':req.body.isdeleted } }, function (ierr, iresDoc) {
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
