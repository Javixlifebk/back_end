const LabTestCaseModel = require("../models/LabTestModel");
const SickleCellModel = require("../models/SickleCellModel");
const ThalassemiaModel = require("../models/ThalassemiaModel");
const LungFunctionTest = require("../models/LungFunctionTest");
const EyeTest = require("../models/EyeTestModel");
const HemoglobinModel = require("../models/HemoglobinModel");
const { body, query, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");
const utility = require("../helpers/utility");
const jwt = require("jsonwebtoken");
const { constants } = require("../helpers/constants");

exports.addLabTest = [

	body("caseId").isLength({ min: 1 }).trim().withMessage("Invalid caseId!"),
	body("status").isLength({ min: 1, max: 1 }).trim().withMessage("Enter Status code !"),

	sanitizeBody("caseId").escape(),
	sanitizeBody("status").escape(),
	sanitizeBody("ChagasAb").escape(),
	sanitizeBody("Chikungunya").escape(),
	sanitizeBody("Chlamydia").escape(),
	sanitizeBody("Cholera").escape(),
	sanitizeBody("Dengue").escape(),
	sanitizeBody("FecalOccultBloodTest").escape(),
	sanitizeBody("HPylori").escape(),
	sanitizeBody("HantaanVirus").escape(),
	sanitizeBody("HepatitisA").escape(),
	sanitizeBody("HepatitisB").escape(),
	sanitizeBody("HepatitisC").escape(),
	sanitizeBody("HIV").escape(),
	sanitizeBody("HumanAfricanTrypanosomiasis").escape(),
	sanitizeBody("HumanChorionicGonadotropin").escape(),
	sanitizeBody("Influenza").escape(),
	sanitizeBody("LegionellaAg").escape(),
	sanitizeBody("Leptospira").escape(),
	sanitizeBody("Malaria").escape(),
	sanitizeBody("Myoglobin").escape(),
	sanitizeBody("Norovirus").escape(),
	sanitizeBody("OnchoLFlgG4Biplex").escape(),
	sanitizeBody("RespiratorySynctialVirus").escape(),
	sanitizeBody("RotaAdeno").escape(),
	sanitizeBody("Rotavirus").escape(),
	sanitizeBody("Covid").escape(),
	sanitizeBody("StrepA").escape(),
	sanitizeBody("Syphilis").escape(),
	sanitizeBody("Salmonella").escape(),
	sanitizeBody("Tetanus").escape(),
	sanitizeBody("Troponin").escape(),
	sanitizeBody("Tsutsugamushi").escape(),
	sanitizeBody("Tuberculosis").escape(),
	sanitizeBody("TyphoidFever").escape(),
	sanitizeBody("YellowFever").escape(),
	sanitizeBody("Others").escape(),

	(req, res) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {

				var ID = utility.uID();

				var userId = req.body.userId;

				var recLabTest = {
					ngoId:req.body.ngoId,
					ChagasAb: req.body.ChagasAb,
					Chikungunya: req.body.Chikungunya,
					Chlamydia: req.body.Chlamydia,
					Cholera: req.body.Cholera,
					Dengue: req.body.Dengue,
					FecalOccultBloodTest: req.body.FecalOccultBloodTest,
					HPylori: req.body.HPylori,
					HantaanVirus: req.body.HantaanVirus,
					HepatitisA: req.body.HepatitisA,
					HepatitisB: req.body.HepatitisB,
					HepatitisC: req.body.HepatitisC,
					HIV: req.body.HIV,
					HumanAfricanTrypanosomiasis: req.body.HumanAfricanTrypanosomiasis,
					HumanChorionicGonadotropin: req.body.HumanChorionicGonadotropin,
					Influenza: req.body.Influenza,
					LegionellaAg: req.body.LegionellaAg,
					Leptospira: req.body.Leptospira,
					Malaria: req.body.Malaria,
					Myoglobin: req.body.Myoglobin,
					Norovirus: req.body.Norovirus,
					OnchoLFlgG4Biplex: req.body.OnchoLFlgG4Biplex,
					RespiratorySynctialVirus: req.body.RespiratorySynctialVirus,
					RotaAdeno: req.body.RotaAdeno,
					Rotavirus: req.body.Rotavirus,
					Covid: req.body.Covid,
					StrepA: req.body.StrepA,
					Syphilis: req.body.Syphilis,
					Salmonella: req.body.Salmonella,
					Tetanus: req.body.Tetanus,
					Troponin: req.body.Troponin,
					Tsutsugamushi: req.body.Tsutsugamushi,
					Tuberculosis: req.body.Tuberculosis,
					TyphoidFever: req.body.TyphoidFever,
					YellowFever: req.body.YellowFever,
					Others: req.body.Others,
					caseId: req.body.caseId,
					status: req.body.status
				};
				var actionLabTestCase = new LabTestCaseModel.LabTest(recLabTest);
				actionLabTestCase.save(function (_error) {
					if (_error) { apiResponse.ErrorResponse(res, "Sorry:" + _error); }
					else {

						return apiResponse.successResponseWithData(res, "labtest added Successfully Submitted", recLabTest);
					}
				}
				);

			}
		} catch (err) {

			return apiResponse.ErrorResponse(res, err);
		}
	}];

exports.LabTestList = [

	body("caseId").isLength({ min: 1 }).trim().withMessage("Invalid caseId!"),
	sanitizeBody("caseId").escape(),

	(req, res) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {

				LabTestCaseModel.LabTest.aggregate([
					{ $match: { "caseId": req.body.caseId,ngoId:req.body.ngoId } },

					{
						'$project': {
							'status': 1,
							'ngoId':1,
							'ChagasAb': 1,
							'Chikungunya': 1,
							'Chlamydia': 1,
							'Cholera': 1,
							'Dengue': 1,
							'FecalOccultBloodTest': 1,
							'HPylori': 1,
							'HantaanVirus': 1,
							'HepatitisA': 1,
							'HepatitisB': 1,
							'HepatitisC': 1,
							'HIV': 1,
							'HumanAfricanTrypanosomiasis': 1,
							'HumanChorionicGonadotropin': 1,
							'Influenza': 1,
							'LegionellaAg': 1,
							'Leptospira': 1,
							'Malaria': 1,
							'Myoglobin': 1,
							'Norovirus': 1,
							'OnchoLFlgG4Biplex': 1,
							'RespiratorySynctialVirus': 1,
							'RotaAdeno': 1,
							'Rotavirus': 1,
							'Covid': 1,
							'StrepA': 1,
							'Syphilis': 1,
							'Salmonella': 1,
							'Tetanus': 1,
							'Troponin': 1,
							'Tsutsugamushi': 1,
							'Tuberculosis': 1,
							'TyphoidFever': 1,
							'YellowFever': 1,
							'Others': 1,
							'caseId': 1,
							'createdAt': 1
						}
					}
				]).then(users => {

					let user = users[0];
					if (user) {
						for (var i = 0; i < users.length; i++) {
							users[i].createdAt = utility.toDDmmyy(users[i].createdAt);

						}
						return apiResponse.successResponseWithData(res, "lab test list fetch successfully", users);

					}
					else return apiResponse.ErrorResponse(res, "lab test list Not Found");

				});
			}
		} catch (err) {

			return apiResponse.ErrorResponse(res, "EXp:" + err);
		}
	}

];


//Drug Test

exports.addDrugTest = [

	body("caseId").isLength({ min: 1 }).trim().withMessage("Invalid caseId!"),
	body("status").isLength({ min: 1, max: 1 }).trim().withMessage("Enter Status code !"),

	sanitizeBody("caseId").escape(),
	sanitizeBody("status").escape(),
	sanitizeBody("Amphetamine").escape(),
	sanitizeBody("Barbiturates").escape(),
	sanitizeBody("Buprenorphine").escape(),
	sanitizeBody("Benzodiazepines").escape(),
	sanitizeBody("Cocaine").escape(),
	sanitizeBody("Marijuana").escape(),
	sanitizeBody("Methamphetamine").escape(),
	sanitizeBody("Methylenedioxymethamphetamine").escape(),
	sanitizeBody("Methadone").escape(),
	sanitizeBody("Opiate").escape(),
	sanitizeBody("Oxycodone").escape(),
	sanitizeBody("Phencyclidine").escape(),
	sanitizeBody("Propoxyphene").escape(),
	sanitizeBody("TricyclicAntidepressant").escape(),

	(req, res) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {

				var recDrugTest = {
					caseId: req.body.caseId,
					ngoId:req.body.ngoId,
					status: req.body.status,
					Amphetamine: req.body.Amphetamine,
					Barbiturates: req.body.Barbiturates,
					Buprenorphine: req.body.Buprenorphine,
					Benzodiazepines: req.body.Benzodiazepines,
					Cocaine: req.body.Cocaine,
					Marijuana: req.body.Marijuana,
					Methamphetamine: req.body.Methamphetamine,
					Methylenedioxymethamphetamine: req.body.Methylenedioxymethamphetamine,
					Methadone: req.body.Methadone,
					Opiate: req.body.Opiate,
					Oxycodone: req.body.Oxycodone,
					Phencyclidine: req.body.Phencyclidine,
					Propoxyphene: req.body.Propoxyphene,
					TricyclicAntidepressant: req.body.TricyclicAntidepressant
				};
				var actionDrugTestCase = new LabTestCaseModel.DrugTest(recDrugTest);
				actionDrugTestCase.save(function (_error) {
					if (_error) { apiResponse.ErrorResponse(res, "Sorry:" + _error); }
					else {

						return apiResponse.successResponseWithData(res, "drug test added Successfully Submitted", recDrugTest);
					}
				}
				);

			}
		} catch (err) {

			return apiResponse.ErrorResponse(res, err);
		}
	}];

exports.DrugTestList = [

	body("caseId").isLength({ min: 1 }).trim().withMessage("Invalid caseId!"),
	sanitizeBody("caseId").escape(),

	(req, res) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {

				LabTestCaseModel.DrugTest.aggregate([
					{ $match: { "caseId": req.body.caseId,ngoId:req.body.ngoId } },

					{
						'$project': {
							'caseId': 1,
							'ngoId':1,
							'status': 1,
							'Amphetamine': 1,
							'Barbiturates': 1,
							'Buprenorphine': 1,
							'Benzodiazepines': 1,
							'Cocaine': 1,
							'Marijuana': 1,
							'Methamphetamine': 1,
							'Methylenedioxymethamphetamine': 1,
							'Methadone': 1,
							'Opiate': 1,
							'Oxycodone': 1,
							'Phencyclidine': 1,
						
							'Propoxyphene': 1,
							'TricyclicAntidepressant': 1,
							'createdAt': 1
						}
					}
				]).then(users => {

					let user = users[0];
					if (user) {
						for (var i = 0; i < users.length; i++) {
							users[i].createdAt = utility.toDDmmyy(users[i].createdAt);

						}

						return apiResponse.successResponseWithData(res, "drug test list fetch successfully", users);
					}
					else return apiResponse.ErrorResponse(res, "drug test list Not Found");

				});
			}
		} catch (err) {

			return apiResponse.ErrorResponse(res, "EXp:" + err);
		}
	}

];

//LipidPanel

exports.addLipidPanelTest = [

	body("caseId").isLength({ min: 1 }).trim().withMessage("Invalid caseId!"),
	body("status").isLength({ min: 1 }).trim().withMessage("Enter Status code !"),
	body("cholesterol").isLength({ min: 1 }).trim().withMessage("Enter cholesterol!"),
	body("hdlcholesterol").isLength({ min: 1 }).trim().withMessage("Enter hdlcholesterol !"),
	body("triglycerides").isLength({ min: 1 }).trim().withMessage("Enter triglycerides !"),
	body("glucose").isLength({ min: 1 }).trim().withMessage("Enter glucose !"),
	body("type").isLength({ min: 1 }).trim().withMessage("Enter Type !"),

	sanitizeBody("caseId").escape(),
	sanitizeBody("status").escape(),
	sanitizeBody("cholesterol").escape(),
	sanitizeBody("hdlcholesterol").escape(),
	sanitizeBody("triglycerides").escape(),
	sanitizeBody("glucose").escape(),
	sanitizeBody("type").escape(),
	sanitizeBody("ldl").escape(),
	sanitizeBody("tcl_hdl").escape(),
	sanitizeBody("ldl_hdl").escape(),
	sanitizeBody("non_hdl").escape(),

	(req, res) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {

				var recLipidPanelTest = {
					caseId: req.body.caseId,
					ngoId:req.body.ngoId,
					status: req.body.status,
					cholesterol: req.body.cholesterol,
					hdlcholesterol: req.body.hdlcholesterol,
					triglycerides: req.body.triglycerides,
					ldl: req.body.ldl,
					tcl_hdl: req.body.tcl_hdl,
					ldl_hdl: req.body.ldl_hdl,
					non_hdl: req.body.non_hdl,
					glucose: req.body.glucose,
					type: req.body.type
				};
				var actionLipidPanelTestCase = new LabTestCaseModel.LipidPanelTest(recLipidPanelTest);
				actionLipidPanelTestCase.save(function (_error) {
					if (_error) { apiResponse.ErrorResponse(res, "Sorry:" + _error); }
					else {

						return apiResponse.successResponseWithData(res, "lipid panel Successfully Submitted", recLipidPanelTest);
					}
				}
				);

			}
		} catch (err) {

			return apiResponse.ErrorResponse(res, err);
		}
	}];

exports.LipidPanelTestList = [

	body("caseId").isLength({ min: 1 }).trim().withMessage("Invalid caseId!"),
	sanitizeBody("caseId").escape(),

	(req, res) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {

				LabTestCaseModel.LipidPanelTest.aggregate([
					{ $match: { "caseId": req.body.caseId ,ngoId:req.body.ngoId} },

					{
						'$project': {
							'caseId': 1,
							'ngoId':1,
							'status': 1,
							'cholesterol': 1,
							'hdlcholesterol': 1,
							'triglycerides': 1,
							'glucose': 1,
							'ldl': 1,
							'tcl_hdl': 1,
							'ldl_hdl': 1,
							'non_hdl': 1,
							'type': 1,
							'createdAt': 1
						}
					}
				]).then(users => {

					let user = users[0];
					if (user) {
						for (var i = 0; i < users.length; i++) {
							users[i].createdAt = utility.toDDmmyy(users[i].createdAt);

						}
						return apiResponse.successResponseWithData(res, "Lipid Panel Test List fetch successfully", users);
					}
					else return apiResponse.ErrorResponse(res, " Lipid Panel Test List Not Found");

				});
			}
		} catch (err) {

			return apiResponse.ErrorResponse(res, "EXp:" + err);
		}
	}

];
// ===========================HDL start================================
// exports.LipidPanelHDLGreenList = [

// 	// body("caseId").isLength({ min: 1 }).trim().withMessage("Invalid caseId!"),
// 	sanitizeBody("severity_hdlcholesterol").escape(),

// 	(req, res) => {

// 		const { pageNo, size } = req.body
// 		console.log(req.body);
// 		if (pageNo < 0 || pageNo === 0) {
// 			response = {
// 				error: true,
// 				message: 'invalid page number, should start with 1',
// 			}
// 			return res.json(response)
// 		}
// 		const query = {}
// 		query.skip = size * (pageNo - 1)
// 		query.limit = size
// 		console.log(query);

// 		// Find some documents
// 		LabTestCaseModel.LipidPanelTest.count({ severity_hdlcholesterol: 0 ,ngoId:req.body.ngoId}, async (err, totalCount) => {
// 			if (err) {
// 				response = { error: true, message: 'Error fetching data' }
// 			}
// 			LabTestCaseModel.LipidPanelTest.find({}, {}, query, async (err, data) => {
// 				// Mongo command to fetch all data from collection.
// 				// const post_id = data.post_id
// 				if (err) {
// 					response = { error: true, message: 'Error fetching data' }
// 				} else {
// 					LabTestCaseModel.LipidPanelTest.aggregate([
// 						// {$match:{'$or':[{'severity_hdlcholesterol':req.body.severity_hdlcholesterol}]}},
// 						// gt greater than and lt less than eq equal too
// 						// { $match: { severity_hdlcholesterol: 0 } },
// 						// {$match:{$and:[{severity_hdlcholesterol:0},{ hdlcholesterol : { $gt :  80, $lt : 100}}]}},
// 						// { $sort: { createdAt: -1 } },
// 						{
// 							$lookup: {
// 								from: "screeningcases",
// 								localField: "caseId",
// 								foreignField: "caseId",
// 								as: "screeningcases"
// 							}
// 						},
// 						{
// 							$lookup: {
// 								from: "citizens",
// 								localField: "screeningcases.citizenId",
// 								foreignField: "citizenId",
// 								as: "citizens"
// 							}
// 						},
// 						{
// 							$lookup: {
// 								from: "citizendetails",
// 								localField: "screeningcases.citizenId",
// 								foreignField: "citizenId",
// 								as: "citizendetails"
// 							}
// 						},
// 						{
// 							$lookup: {
// 								from: "screeners",
// 								localField: "screeningcases.screenerId",
// 								foreignField: "screenerId",
// 								as: "screeners"
// 							}
// 						},

// 						{ '$unwind': "$citizendetails" },
// 						{ '$unwind': "$screeners" },
// 						{ "$unwind": "$screeningcases" },
// 						{ "$unwind": "$citizens" },
// 						{
// 							'$project': {
// 								'caseId': 1,
// 								'ngoId':1,
// 								'status': 1,
// 								'severity_hdlcholesterol': 1,
// 								'cholesterol': 1,
// 								'hdlcholesterol': 1,
// 								'triglycerides': 1,
// 								'glucose': 1,
// 								'ldl': 1,
// 								'tcl_hdl': 1,
// 								'ldl_hdl': 1,
// 								'non_hdl': 1,
// 								'type': 1,
// 								'createdAt':{ $dateToString: { format: "%d/%m/%Y", date: "$createdAt" } },
// 								'dateOfOnBoarding':{ $dateToString: { format: "%d/%m/%Y", date: "$citizendetails.dateOfOnBoarding" } },
// 								'address': '$citizendetails.address',
// 								'citizenId': '$citizendetails.citizenId',
// 								'mobile': '$citizens.mobile',
// 								'screenerfullname': { $concat: ["$screeners.firstName", " ", "$screeners.lastName"] },
// 								'fullname': { $concat: ["$citizens.firstName", " ", "$citizens.lastName"] },

// 							}
// 						},
// 						{ $match: { severity_hdlcholesterol: 0 ,ngoId:req.body.ngoId} },
// 						{ $sort: { 'createdAt': -1 } },
// 						{ $skip: query.skip },
// 						{ $limit: query.limit },
// 					])
// 						.exec((err, likeData) => {
// 							if (err) {
// 								throw err
// 							} else {
// 								var totalPages = Math.ceil(totalCount / size)
// 								response = {
// 									message: 'Lipid Panel HDL Green List fatch successfully',
// 									status: 1,
// 									pages: totalPages,
// 									total: totalCount,
// 									size: size,
// 									data: likeData.reverse(),
// 								}

// 								res.json(response)
// 							}
// 						})
// 				}
// 			})
// 		})
// 	}
// ];
exports.LipidPanelHDLDefaultList = [

	// body("caseId").isLength({ min: 1 }).trim().withMessage("Invalid caseId!"),
	sanitizeBody("severity_hdlcholesterol").escape(),

	(req, res) => {
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
		LabTestCaseModel.LipidPanelTest.count({ severity_hdlcholesterol: 3 ,ngoId:req.body.ngoId}, async (err, totalCount) => {
			if (err) {
				response = { error: true, message: 'Error fetching data' }
			}
			LabTestCaseModel.LipidPanelTest.find({}, {}, query, async (err, data) => {
				// Mongo command to fetch all data from collection.
				// const post_id = data.post_id
				if (err) {
					response = { error: true, message: 'Error fetching data' }
				} else {
					LabTestCaseModel.LipidPanelTest.aggregate([
						// {$match:{'$or':[{'severity_hdlcholesterol':req.body.severity_hdlcholesterol}]}},
						// { $match: { severity_hdlcholesterol: 3 } },
						// { $sort: { createdAt: -1 } },
						{
							$lookup: {
								from: "screeningcases",
								localField: "caseId",
								foreignField: "caseId",
								as: "screeningcases"
							}
						},
						{
							$lookup: {
								from: "citizens",
								localField: "screeningcases.citizenId",
								foreignField: "citizenId",
								as: "citizens"
							}
						},
						{
							$lookup: {
								from: "citizendetails",
								localField: "screeningcases.citizenId",
								foreignField: "citizenId",
								as: "citizendetails"
							}
						},
						{
							$lookup: {
								from: "screeners",
								localField: "screeningcases.screenerId",
								foreignField: "screenerId",
								as: "screeners"
							}
						},

						{ '$unwind': "$citizendetails" },
						{ '$unwind': "$screeners" },
						{ "$unwind": "$screeningcases" },
						{ "$unwind": "$citizens" },
						{
							'$project': {
								'caseId': 1,
								'ngoId':1,
								'status': 1,
								'severity_hdlcholesterol': 1,
								'cholesterol': 1,
								'hdlcholesterol': 1,
								'triglycerides': 1,
								'glucose': 1,
								'ldl': 1,
								'tcl_hdl': 1,
								'ldl_hdl': 1,
								'non_hdl': 1,
								'type': 1,
								'createdAt': 1,
								'citizenId': '$citizendetails.citizenId',
								'mobile': '$citizens.mobile',
								'dateOfOnBoarding': '$citizendetails.dateOfOnBoarding',
								'address': '$citizendetails.address',
								'screenerfullname': { $concat: ["$screeners.firstName", " ", "$screeners.lastName"] },
								'fullname': { $concat: ["$citizens.firstName", " ", "$citizens.lastName"] },

							}
						},
						{ $match: { severity_hdlcholesterol: 3,ngoId:req.body.ngoId } },
						{ $sort: { 'createdAt': -1 } },
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

exports.LipidPanelHDLGreenList = [

	// body("caseId").isLength({ min: 1 }).trim().withMessage("Invalid caseId!"),
	sanitizeBody("severity_hdlcholesterol").escape(),

	(req, res) => {

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
		LabTestCaseModel.LipidPanelTest.count({ severity_hdlcholesterol: 0 ,ngoId:req.body.ngoId}, async (err, totalCount) => {
			if (err) {
				response = { error: true, message: 'Error fetching data' }
			}
			LabTestCaseModel.LipidPanelTest.find({}, {}, query, async (err, data) => {
				// Mongo command to fetch all data from collection.
				// const post_id = data.post_id
				if (err) {
					response = { error: true, message: 'Error fetching data' }
				} else {
					LabTestCaseModel.LipidPanelTest.aggregate([
						// {$match:{'$or':[{'severity_hdlcholesterol':req.body.severity_hdlcholesterol}]}},
						// { $match: { severity_hdlcholesterol: 1 } },
						// { $sort: { createdAt: -1 } },
						{
							$lookup: {
								from: "screeningcases",
								localField: "caseId",
								foreignField: "caseId",
								as: "screeningcases"
							}
						},
						{
							$lookup: {
								from: "citizens",
								localField: "screeningcases.citizenId",
								foreignField: "citizenId",
								as: "citizens"
							}
						},
						{
							$lookup: {
								from: "citizendetails",
								localField: "screeningcases.citizenId",
								foreignField: "citizenId",
								as: "citizendetails"
							}
						},
						{
							$lookup: {
								from: "screeners",
								localField: "screeningcases.screenerId",
								foreignField: "screenerId",
								as: "screeners"
							}
						},

						{ '$unwind': "$citizendetails" },
						{ '$unwind': "$screeners" },
						{ "$unwind": "$screeningcases" },
						{ "$unwind": "$citizens" },
						{
							'$project': {
								'caseId': 1,
								'ngoId':1,
								'status': 1,
								'severity_hdlcholesterol': 1,
								'cholesterol': 1,
								'hdlcholesterol': 1,
								'triglycerides': 1,
								'glucose': 1,
								'ldl': 1,
								'tcl_hdl': 1,
								'ldl_hdl': 1,
								'non_hdl': 1,
								'type': 1,
								'createdAt':{ $dateToString: { format: "%d/%m/%Y", date: "$createdAt" } },
								'dateOfOnBoarding':{ $dateToString: { format: "%d/%m/%Y", date: "$citizendetails.dateOfOnBoarding" } },
								'address': '$citizendetails.address',
								'citizenId': '$citizendetails.citizenId',
								'mobile': '$citizens.mobile',
								'screenerfullname': { $concat: ["$screeners.firstName", " ", "$screeners.lastName"] },
								'fullname': { $concat: ["$citizens.firstName", " ", "$citizens.lastName"] },

							}
						},
						{ $match: { severity_hdlcholesterol: 0,ngoId:req.body.ngoId } },
						{ $sort: { 'createdAt': -1 } },
						{ $skip: query.skip },
						{ $limit: query.limit },
					])
						.exec((err, likeData) => {
							if (err) {
								throw err
							} else {
								var totalPages = Math.ceil(totalCount / size)
								response = {
									message: 'Lipid Panel HDL Amber List fatch successfully',
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

exports.LipidPanelHDLAmberList = [

	// body("caseId").isLength({ min: 1 }).trim().withMessage("Invalid caseId!"),
	sanitizeBody("severity_hdlcholesterol").escape(),

	(req, res) => {

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
		LabTestCaseModel.LipidPanelTest.count({ severity_hdlcholesterol: 1 ,ngoId:req.body.ngoId}, async (err, totalCount) => {
			if (err) {
				response = { error: true, message: 'Error fetching data' }
			}
			LabTestCaseModel.LipidPanelTest.find({}, {}, query, async (err, data) => {
				// Mongo command to fetch all data from collection.
				// const post_id = data.post_id
				if (err) {
					response = { error: true, message: 'Error fetching data' }
				} else {
					LabTestCaseModel.LipidPanelTest.aggregate([
						// {$match:{'$or':[{'severity_hdlcholesterol':req.body.severity_hdlcholesterol}]}},
						// { $match: { severity_hdlcholesterol: 1 } },
						// { $sort: { createdAt: -1 } },
						{
							$lookup: {
								from: "screeningcases",
								localField: "caseId",
								foreignField: "caseId",
								as: "screeningcases"
							}
						},
						{
							$lookup: {
								from: "citizens",
								localField: "screeningcases.citizenId",
								foreignField: "citizenId",
								as: "citizens"
							}
						},
						{
							$lookup: {
								from: "citizendetails",
								localField: "screeningcases.citizenId",
								foreignField: "citizenId",
								as: "citizendetails"
							}
						},
						{
							$lookup: {
								from: "screeners",
								localField: "screeningcases.screenerId",
								foreignField: "screenerId",
								as: "screeners"
							}
						},

						{ '$unwind': "$citizendetails" },
						{ '$unwind': "$screeners" },
						{ "$unwind": "$screeningcases" },
						{ "$unwind": "$citizens" },
						{
							'$project': {
								'caseId': 1,
								'ngoId':1,
								'status': 1,
								'severity_hdlcholesterol': 1,
								'cholesterol': 1,
								'hdlcholesterol': 1,
								'triglycerides': 1,
								'glucose': 1,
								'ldl': 1,
								'tcl_hdl': 1,
								'ldl_hdl': 1,
								'non_hdl': 1,
								'type': 1,
								'createdAt':{ $dateToString: { format: "%d/%m/%Y", date: "$createdAt" } },
								'dateOfOnBoarding':{ $dateToString: { format: "%d/%m/%Y", date: "$citizendetails.dateOfOnBoarding" } },
								'address': '$citizendetails.address',
								'citizenId': '$citizendetails.citizenId',
								'mobile': '$citizens.mobile',
								'screenerfullname': { $concat: ["$screeners.firstName", " ", "$screeners.lastName"] },
								'fullname': { $concat: ["$citizens.firstName", " ", "$citizens.lastName"] },

							}
						},
						{ $match: { severity_hdlcholesterol: 1,ngoId:req.body.ngoId } },
						{ $sort: { 'createdAt': -1 } },
						{ $skip: query.skip },
						{ $limit: query.limit },
					])
						.exec((err, likeData) => {
							if (err) {
								throw err
							} else {
								var totalPages = Math.ceil(totalCount / size)
								response = {
									message: 'Lipid Panel HDL Amber List fatch successfully',
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
exports.LipidPanelHDLRedList = [

	// body("caseId").isLength({ min: 1 }).trim().withMessage("Invalid caseId!"),
	sanitizeBody("severity_hdlcholesterol").escape(),

	(req, res) => {

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
		LabTestCaseModel.LipidPanelTest.count({ severity_hdlcholesterol: 2,ngoId:req.body.ngoId }, async (err, totalCount) => {
			if (err) {
				response = { error: true, message: 'Error fetching data' }
			}
			LabTestCaseModel.LipidPanelTest.find({}, {}, query, async (err, data) => {
				// Mongo command to fetch all data from collection.
				// const post_id = data.post_id
				if (err) {
					response = { error: true, message: 'Error fetching data' }
				} else {
					LabTestCaseModel.LipidPanelTest.aggregate([
						// {$match:{'$or':[{'severity_hdlcholesterol':req.body.severity_hdlcholesterol}]}},
						// { $sort: { createdAt: -1 } },
						{
							$lookup: {
								from: "screeningcases",
								localField: "caseId",
								foreignField: "caseId",
								as: "screeningcases"
							}
						},
						{
							$lookup: {
								from: "citizens",
								localField: "screeningcases.citizenId",
								foreignField: "citizenId",
								as: "citizens"
							}
						},
						{
							$lookup: {
								from: "citizendetails",
								localField: "screeningcases.citizenId",
								foreignField: "citizenId",
								as: "citizendetails"
							}
						},
						{
							$lookup: {
								from: "screeners",
								localField: "screeningcases.screenerId",
								foreignField: "screenerId",
								as: "screeners"
							}
						},

						{ '$unwind': "$citizendetails" },
						{ '$unwind': "$screeners" },
						{ "$unwind": "$screeningcases" },
						{ "$unwind": "$citizens" },
						// { $match: { severity_hdlcholesterol: 2 } },
						{
							'$project': {
								'caseId': 1,
								'ngoId':1,
								'status': 1,
								'severity_hdlcholesterol': 1,
								'cholesterol': 1,
								'hdlcholesterol': 1,
								'triglycerides': 1,
								'glucose': 1,
								'ldl': 1,
								'tcl_hdl': 1,
								'ldl_hdl': 1,
								'non_hdl': 1,
								'type': 1,
								'createdAt':{ $dateToString: { format: "%d/%m/%Y", date: "$createdAt" } },
								'dateOfOnBoarding':{ $dateToString: { format: "%d/%m/%Y", date: "$citizendetails.dateOfOnBoarding" } },
								'address': '$citizendetails.address',
								'citizenId': '$citizendetails.citizenId',
								'mobile': '$citizens.mobile',
								'screenerfullname': { $concat: ["$screeners.firstName", " ", "$screeners.lastName"] },
								'fullname': { $concat: ["$citizens.firstName", " ", "$citizens.lastName"] },

							}
						},
						{ $match: { severity_hdlcholesterol: 2 ,ngoId:req.body.ngoId} },
						{ $sort: { 'createdAt': -1 } },
						{ $skip: query.skip },
						{ $limit: query.limit },
					])
						.exec((err, likeData) => {
							if (err) {
								throw err
							} else {
								var totalPages = Math.ceil(totalCount / size)
								response = {
									message: 'Lipid Panel HDL Red List fatch successfully',
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

// ===========================triglycerides==========================
exports.LipidPaneltriglyGreenList = [

	// body("caseId").isLength({ min: 1 }).trim().withMessage("Invalid caseId!"),
	sanitizeBody("severity_triglycerides").escape(),


	(req, res) => {

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
		LabTestCaseModel.LipidPanelTest.count({ severity_triglycerides: 0,ngoId:req.body.ngoId }, async (err, totalCount) => {
			if (err) {
				response = { error: true, message: 'Error fetching data' }
			}
			LabTestCaseModel.LipidPanelTest.find({}, {}, query, async (err, data) => {
				// Mongo command to fetch all data from collection.
				// const post_id = data.post_id
				if (err) {
					response = { error: true, message: 'Error fetching data' }
				} else {


					LabTestCaseModel.LipidPanelTest.aggregate([
						// {$match:{'$or':[{'severity_hdlcholesterol':req.body.severity_hdlcholesterol}]}},
						// { $match: { severity_triglycerides: 3 } },
						{$sort:{'createdAt':-1} },
						{
							$lookup: {
								from: "screeningcases",
								localField: "caseId",
								foreignField: "caseId",
								as: "screeningcases"
							}
						},
						{
							$lookup: {
								from: "citizens",
								localField: "screeningcases.citizenId",
								foreignField: "citizenId",
								as: "citizens"
							}
						},
						{
							$lookup: {
								from: "citizendetails",
								localField: "screeningcases.citizenId",
								foreignField: "citizenId",
								as: "citizendetails"
							}
						},
						{
							$lookup: {
								from: "screeners",
								localField: "screeningcases.screenerId",
								foreignField: "screenerId",
								as: "screeners"
							}
						},

						{ '$unwind': { path: "$citizendetails", preserveNullAndEmptyArrays: true } },
						{ '$unwind': { path: "$screeners", preserveNullAndEmptyArrays: true } },
						{ "$unwind": { path: "$screeningcases", preserveNullAndEmptyArrays: true } },
						{ "$unwind": { path: "$citizens", preserveNullAndEmptyArrays: true } },
						{
							'$project': {
								'caseId': 1,
								'ngoId':1,
								'status': 1,
								'severity_triglycerides': 1,
								// 'severity_hdlcholesterol':1,
								'cholesterol': 1,
								'hdlcholesterol': 1,
								'triglycerides': 1,
								'glucose': 1,
								'ldl': 1,
								'tcl_hdl': 1,
								'ldl_hdl': 1,
								'non_hdl': 1,
								'type': 1,
								'createdAt':{ $dateToString: { format: "%d/%m/%Y", date: "$createdAt" } },
								'dateOfOnBoarding':{ $dateToString: { format: "%d/%m/%Y", date: "$citizendetails.dateOfOnBoarding" } },
								'address': '$citizendetails.address',
								'citizenId': '$citizendetails.citizenId',
								'mobile': '$citizens.mobile',
								'screenerfullname': { $concat: ["$screeners.firstName", " ", "$screeners.lastName"] },
								'fullname': { $concat: ["$citizens.firstName", " ", "$citizens.lastName"] },

							}
						},
						{ '$match': { severity_triglycerides: 0,ngoId:req.body.ngoId } },
						// { '$sort': { 'createdAt': -1 } },
						{ $skip: query.skip },
						{ $limit: query.limit },
					])
						.exec((err, likeData) => {
							if (err) {
								throw err
							} else {
								var totalPages = Math.ceil(totalCount / size)
								response = {
									message: 'Lipid Panel trigly Green List fatch successfully',
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
			}).sort({'createdAt':-1})
		})
	}
];
exports.LipidPaneltriglyLDefaultList = [

	// body("caseId").isLength({ min: 1 }).trim().withMessage("Invalid caseId!"),
	sanitizeBody("severity_triglycerides").escape(),

	(req, res) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {


				LabTestCaseModel.LipidPanelTest.aggregate([
					// {'$match':{'$or':[{'severity_hdlcholesterol':req.body.severity_hdlcholesterol}]}},
					{ '$match': { severity_triglycerides: 3 ,ngoId:req.body.ngoId} },
					{ $sort: { createdAt: -1 } },
					{
						$lookup: {
							from: "screeningcases",
							localField: "caseId",
							foreignField: "caseId",
							as: "screeningcases"
						}
					},
					{
						$lookup: {
							from: "citizens",
							localField: "screeningcases.citizenId",
							foreignField: "citizenId",
							as: "citizens"
						}
					},
					{
						$lookup: {
							from: "citizendetails",
							localField: "screeningcases.citizenId",
							foreignField: "citizenId",
							as: "citizendetails"
						}
					},
					{
						$lookup: {
							from: "screeners",
							localField: "screeningcases.screenerId",
							foreignField: "screenerId",
							as: "screeners"
						}
					},

					{ '$unwind': { path: "$citizendetails", preserveNullAndEmptyArrays: true } },
					{ '$unwind': { path: "$screeners", preserveNullAndEmptyArrays: true } },
					{ "$unwind": { path: "$screeningcases", preserveNullAndEmptyArrays: true } },
					{ "$unwind": { path: "$citizens", preserveNullAndEmptyArrays: true } },
					{
						'$project': {
							'caseId': 1,
							'ngoId':1,
							'status': 1,
							'severity_triglycerides': 1,
							'cholesterol': 1,
							'hdlcholesterol': 1,
							'triglycerides': 1,
							'glucose': 1,
							'ldl': 1,
							'tcl_hdl': 1,
							'ldl_hdl': 1,
							'non_hdl': 1,
							'type': 1,
							'createdAt': 1,
							'dateOfOnBoarding': '$citizendetails.dateOfOnBoarding',
							'address': '$citizendetails.address',
							'citizenId': '$citizendetails.citizenId',
							'mobile': '$citizens.mobile',
							'screenerfullname': { $concat: ["$screeners.firstName", " ", "$screeners.lastName"] },
							'fullname': { $concat: ["$citizens.firstName", " ", "$citizens.lastName"] },

						}
					}
				]).then(users => {

					let user = users[0];
					if (user) {
						for (var i = 0; i < users.length; i++) {
							users[i].createdAt = utility.toDDmmyy(users[i].createdAt);

						}
						return apiResponse.successResponseWithData(res, "Lipid Panel triglyL Default List fetch successfully", users);
					}
					else return apiResponse.ErrorResponse(res, "Not Found");

				});
			}
		} catch (err) {

			return apiResponse.ErrorResponse(res, "EXp:" + err);
		}
	}

];
exports.LipidPaneltriglyAmberList = [

	// body("caseId").isLength({ min: 1 }).trim().withMessage("Invalid caseId!"),
	sanitizeBody("severity_triglycerides").escape(),

	(req, res) => {
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
		console.log("17-11-2022");

		// Find some documents
		LabTestCaseModel.LipidPanelTest.count({ severity_triglycerides: 1,ngoId:req.body.ngoId }, async (err, totalCount) => {
			if (err) {
				response = { error: true, message: 'Error fetching data' }
			}
			// LabTestCaseModel.LipidPanelTest.find({}, {}, query, async (err, data) => {
				// Mongo command to fetch all data from collection.
				// const post_id = data.post_id
				// if (err) {
				// 	response = { error: true, message: 'Error fetching data' }
				// } else {

					LabTestCaseModel.LipidPanelTest.aggregate([
						// {'$match':{'$or':[{'severity_hdlcholesterol':req.body.severity_hdlcholesterol}]}},
						{ '$match': { severity_triglycerides: 1 ,ngoId:req.body.ngoId} },
					
						{
							$lookup: {
								from: "screeningcases",
								localField: "caseId",
								foreignField: "caseId",
								as: "screeningcases"
							}
						},
						{
							$lookup: {
								from: "citizens",
								localField: "screeningcases.citizenId",
								foreignField: "citizenId",
								as: "citizens"
							}
						},
						{
							$lookup: {
								from: "citizendetails",
								localField: "screeningcases.citizenId",
								foreignField: "citizenId",
								as: "citizendetails"
							}
						},
						{
							$lookup: {
								from: "screeners",
								localField: "screeningcases.screenerId",
								foreignField: "screenerId",
								as: "screeners"
							}
						},
						{ '$unwind': { path: "$citizendetails", preserveNullAndEmptyArrays: true } },
						{ '$unwind': { path: "$screeners", preserveNullAndEmptyArrays: true } },
						{ "$unwind": { path: "$screeningcases", preserveNullAndEmptyArrays: true } },
						{ "$unwind": { path: "$citizens", preserveNullAndEmptyArrays: true } },
						{
							'$project': {
								'caseId': 1,
								'ngoId':1,
								'status': 1,
								'severity_triglycerides': 1,
								'cholesterol': 1,
								'hdlcholesterol': 1,
								'triglycerides': 1,
								'glucose': 1,
								'ldl': 1,
								'tcl_hdl': 1,
								'ldl_hdl': 1,
								'non_hdl': 1,
								'type': 1,
								'createdAt':{ $dateToString: { format: "%d/%m/%Y", date: "$createdAt" } },
								'dateOfOnBoarding':{ $dateToString: { format: "%d/%m/%Y", date: "$citizendetails.dateOfOnBoarding" } },
								'address': '$citizendetails.address',
								'citizenId': '$citizendetails.citizenId',
								'mobile': '$citizens.mobile',
								'screenerfullname': { $concat: ["$screeners.firstName", " ", "$screeners.lastName"] },
								'fullname': { $concat: ["$citizens.firstName", " ", "$citizens.lastName"] },
								
							},
							
						},
						// { '$match': { severity_triglycerides: 1 } },
						// {$sort : {
						// 	"sortKey" : {
						// 	   "createdAt" : -1
						// 	},
							
						//  }},
						{ $sort: { 'createdAt': -1 } },
						// { $sort: { '_id': 1 } },
						{ $skip: query.skip },
						{ $limit: query.limit},
					])
					// .sort({ '_id': -1 }).limit(query.limit).skip( query.skip )
						.exec((err, likeData) => {
							if (err) {
								throw err
							} else {
								var totalPages = Math.ceil(totalCount / size)
								response = {
									message: 'Lipid Panel trigly Amber List fatch successfully',
									status: 1,
									pages: totalPages,
									total: totalCount,
									size: size,
									data: likeData.reverse(),
								}

								res.json(response)
							}
						})
				// }
			})
		// })
	}
];
exports.LipidPaneltriglyRedList = [

	// body("caseId").isLength({ min: 1 }).trim().withMessage("Invalid caseId!"),
	sanitizeBody("severity_triglycerides").escape(),

	(req, res) => {

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
		LabTestCaseModel.LipidPanelTest.count({ severity_triglycerides: 2,ngoId:req.body.ngoId }, async (err, totalCount) => {
			if (err) {
				response = { error: true, message: 'Error fetching data' }
			}
			LabTestCaseModel.LipidPanelTest.find({}, {}, query, async (err, data) => {
				// Mongo command to fetch all data from collection.
				// const post_id = data.post_id
				if (err) {
					response = { error: true, message: 'Error fetching data' }
				} else {



					LabTestCaseModel.LipidPanelTest.aggregate([
						// {'$match':{'$or':[{'severity_hdlcholesterol':req.body.severity_hdlcholesterol}]}},
						{ $sort: { createdAt: -1 } },
						{
							$lookup: {
								from: "screeningcases",
								localField: "caseId",
								foreignField: "caseId",
								as: "screeningcases"
							}
						},
						{
							$lookup: {
								from: "citizens",
								localField: "screeningcases.citizenId",
								foreignField: "citizenId",
								as: "citizens"
							}
						},
						{
							$lookup: {
								from: "citizendetails",
								localField: "screeningcases.citizenId",
								foreignField: "citizenId",
								as: "citizendetails"
							}
						},
						{
							$lookup: {
								from: "screeners",
								localField: "screeningcases.screenerId",
								foreignField: "screenerId",
								as: "screeners"
							}
						},

						{ '$unwind': { path: "$citizendetails", preserveNullAndEmptyArrays: true } },
						{ '$unwind': { path: "$screeners", preserveNullAndEmptyArrays: true } },
						{ "$unwind": { path: "$screeningcases", preserveNullAndEmptyArrays: true } },
						{ "$unwind": { path: "$citizens", preserveNullAndEmptyArrays: true } },
						// { '$match': { severity_triglycerides: 2 } },
						{
							'$project': {
								'caseId': 1,
								'ngoId':1,
								'status': 1,
								'severity_triglycerides': 1,
								'cholesterol': 1,
								'hdlcholesterol': 1,
								'triglycerides': 1,
								'glucose': 1,
								'ldl': 1,
								'tcl_hdl': 1,
								'ldl_hdl': 1,
								'non_hdl': 1,
								'type': 1,
								'createdAt':{ $dateToString: { format: "%d/%m/%Y", date: "$createdAt" } },
								'dateOfOnBoarding':{ $dateToString: { format: "%d/%m/%Y", date: "$citizendetails.dateOfOnBoarding" } },
								'address': '$citizendetails.address',
								'citizenId': '$citizendetails.citizenId',
								'mobile': '$citizens.mobile',
								'screenerfullname': { $concat: ["$screeners.firstName", " ", "$screeners.lastName"] },
								'fullname': { $concat: ["$citizens.firstName", " ", "$citizens.lastName"] },

							}
						},
						{ '$match': { severity_triglycerides: 2 ,ngoId:req.body.ngoId} },
						// { $sort: { 'createdAt': -1 } },
						{ $skip: query.skip },
						{ $limit: query.limit },
					])
						.exec((err, likeData) => {
							if (err) {
								throw err
							} else {
								var totalPages = Math.ceil(totalCount / size)
								response = {
									message: 'Lipid Panel trigly Red List fatch successfully',
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

// =================================Cholesterol==========================
exports.LipidPanelCholesterolGreenList = [

	// body("caseId").isLength({ min: 1 }).trim().withMessage("Invalid caseId!"),
	sanitizeBody("severity_cholesterol").escape(),


	(req, res) => {

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
		LabTestCaseModel.LipidPanelTest.count({ severity_cholesterol: 0 ,ngoId:req.body.ngoId}, async (err, totalCount) => {
			if (err) {
				response = { error: true, message: 'Error fetching data' }
			}
			LabTestCaseModel.LipidPanelTest.find({}, {}, query, async (err, data) => {
				// Mongo command to fetch all data from collection.
				// const post_id = data.post_id
				if (err) {
					response = { error: true, message: 'Error fetching data' }
				} else {



					LabTestCaseModel.LipidPanelTest.aggregate([
						// {'$match':{'$or':[{'severity_hdlcholesterol':req.body.severity_hdlcholesterol}]}},
						// { '$match': { severity_cholesterol: 0 } },
						// { $sort: { createdAt: -1 } },
						{
							$lookup: {
								from: "screeningcases",
								localField: "caseId",
								foreignField: "caseId",
								as: "screeningcases"
							}
						},
						{
							$lookup: {
								from: "citizens",
								localField: "screeningcases.citizenId",
								foreignField: "citizenId",
								as: "citizens"
							}
						},
						{
							$lookup: {
								from: "citizendetails",
								localField: "screeningcases.citizenId",
								foreignField: "citizenId",
								as: "citizendetails"
							}
						},
						{
							$lookup: {
								from: "screeners",
								localField: "screeningcases.screenerId",
								foreignField: "screenerId",
								as: "screeners"
							}
						},

						{ '$unwind': "$citizendetails" },
						{ '$unwind': "$screeners" },
						{ "$unwind": "$screeningcases" },
						{ "$unwind": "$citizens" },
						{
							'$project': {
								'caseId': 1,
								'ngoId':1,
								'status': 1,
								'severity_cholesterol': 1,
								// 'severity_hdlcholesterol':1,
								'cholesterol': 1,
								'hdlcholesterol': 1,
								'triglycerides': 1,
								'glucose': 1,
								'ldl': 1,
								'tcl_hdl': 1,
								'ldl_hdl': 1,
								'non_hdl': 1,
								'type': 1,
								'createdAt':{ $dateToString: { format: "%d/%m/%Y", date: "$createdAt" } },
								'dateOfOnBoarding':{ $dateToString: { format: "%d/%m/%Y", date: "$citizendetails.dateOfOnBoarding" } },
								'address': '$citizendetails.address',
								'citizenId': '$citizendetails.citizenId',
								'mobile': '$citizens.mobile',
								'screenerfullname': { $concat: ["$screeners.firstName", " ", "$screeners.lastName"] },
								'fullname': { $concat: ["$citizens.firstName", " ", "$citizens.lastName"] },

							}
						},
						{ '$match': { severity_cholesterol: 0,ngoId:req.body.ngoId } },
						{ $sort: { 'createdAt': -1 } },
						{ $skip: query.skip },
						{ $limit: query.limit },
					])
						.exec((err, likeData) => {
							if (err) {
								throw err
							} else {
								var totalPages = Math.ceil(totalCount / size)
								response = {
									message: 'Lipid Panel Cholesterol Green List fatch successfully',
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
exports.LipidPanelCholesterolLDefaultList = [

	// body("caseId").isLength({ min: 1 }).trim().withMessage("Invalid caseId!"),
	sanitizeBody("severity_cholesterol").escape(),

	(req, res) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {


				LabTestCaseModel.LipidPanelTest.aggregate([
					// {'$match':{'$or':[{'severity_hdlcholesterol':req.body.severity_hdlcholesterol}]}},
					{ '$match': { severity_cholesterol: 3 } },
					{ $sort: { createdAt: -1 } },
					{
						$lookup: {
							from: "screeningcases",
							localField: "caseId",
							foreignField: "caseId",
							as: "screeningcases"
						}
					},
					{
						$lookup: {
							from: "citizens",
							localField: "screeningcases.citizenId",
							foreignField: "citizenId",
							as: "citizens"
						}
					},
					{
						$lookup: {
							from: "citizendetails",
							localField: "screeningcases.citizenId",
							foreignField: "citizenId",
							as: "citizendetails"
						}
					},
					{
						$lookup: {
							from: "screeners",
							localField: "screeningcases.screenerId",
							foreignField: "screenerId",
							as: "screeners"
						}
					},

					{ '$unwind': "$citizendetails" },
					{ '$unwind': "$screeners" },
					{ "$unwind": "$screeningcases" },
					{ "$unwind": "$citizens" },
					{
						'$project': {
							'caseId': 1,
							'ngoId':1,
							'status': 1,
							'severity_cholesterol': 1,
							'cholesterol': 1,
							'hdlcholesterol': 1,
							'triglycerides': 1,
							'glucose': 1,
							'ldl': 1,
							'tcl_hdl': 1,
							'ldl_hdl': 1,
							'non_hdl': 1,
							'type': 1,
							'createdAt': 1,
							'mobile': '$citizens.mobile',
							'citizenId': '$citizens.citizenId',
							'dateOfOnBoarding': '$citizendetails.dateOfOnBoarding',
							'address': '$citizendetails.address',
							'citizenId': '$citizendetails.citizenId',
							'mobile': '$citizens.mobile',
							'screenerfullname': { $concat: ["$screeners.firstName", " ", "$screeners.lastName"] },
							'fullname': { $concat: ["$citizens.firstName", " ", "$citizens.lastName"] },
							// 'fullname': {$concat: ["$citizens.firstName", " ", "$citizens.lastName"]},

						}
					}
				]).then(users => {

					let user = users[0];
					if (user) {
						for (var i = 0; i < users.length; i++) {
							users[i].createdAt = utility.toDDmmyy(users[i].createdAt);

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
exports.LipidPanelCholesterolAmberList = [

	// body("caseId").isLength({ min: 1 }).trim().withMessage("Invalid caseId!"),
	sanitizeBody("severity_cholesterol").escape(),

	(req, res) => {

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
		LabTestCaseModel.LipidPanelTest.count({ severity_cholesterol: 1,ngoId:req.body.ngoId }, async (err, totalCount) => {
			if (err) {
				response = { error: true, message: 'Error fetching data' }
			}
			LabTestCaseModel.LipidPanelTest.find({}, {}, query, async (err, data) => {
				// Mongo command to fetch all data from collection.
				// const post_id = data.post_id
				if (err) {
					response = { error: true, message: 'Error fetching data' }
				} else {

					LabTestCaseModel.LipidPanelTest.aggregate([
						// {'$match':{'$or':[{'severity_hdlcholesterol':req.body.severity_hdlcholesterol}]}},
						// { '$match': { severity_cholesterol: 1 } },
						// { $sort: { createdAt: -1 } },
						{
							$lookup: {
								from: "screeningcases",
								localField: "caseId",
								foreignField: "caseId",
								as: "screeningcases"
							}
						},
						{
							$lookup: {
								from: "citizens",
								localField: "screeningcases.citizenId",
								foreignField: "citizenId",
								as: "citizens"
							}
						},
						{
							$lookup: {
								from: "citizendetails",
								localField: "screeningcases.citizenId",
								foreignField: "citizenId",
								as: "citizendetails"
							}
						},
						{
							$lookup: {
								from: "screeners",
								localField: "screeningcases.screenerId",
								foreignField: "screenerId",
								as: "screeners"
							}
						},

						{ '$unwind': "$citizendetails" },
						{ '$unwind': "$screeners" },
						{ "$unwind": "$screeningcases" },
						{ "$unwind": "$citizens" },
						{
							'$project': {
								'caseId': 1,
								'ngoId':1,
								'status': 1,
								'severity_cholesterol': 1,
								'cholesterol': 1,
								'hdlcholesterol': 1,
								'triglycerides': 1,
								'glucose': 1,
								'ldl': 1,
								'tcl_hdl': 1,
								'ldl_hdl': 1,
								'non_hdl': 1,
								'type': 1,
							
								'createdAt':{ $dateToString: { format: "%d/%m/%Y", date: "$createdAt" } },
								'dateOfOnBoarding':{ $dateToString: { format: "%d/%m/%Y", date: "$citizendetails.dateOfOnBoarding" } },
								'mobile': '$citizens.mobile',
								'citizenId': '$citizens.citizenId',
								
								'address': '$citizendetails.address',
								'citizenId': '$citizendetails.citizenId',
								'mobile': '$citizens.mobile',
								'screenerfullname': { $concat: ["$screeners.firstName", " ", "$screeners.lastName"] },
								'fullname': { $concat: ["$citizens.firstName", " ", "$citizens.lastName"] },

							}
						},
						{ '$match': { severity_cholesterol: 1,ngoId:req.body.ngoId } },
						{ '$sort': { 'createdAt': -1 } },
						{ $skip: query.skip },
						{ $limit: query.limit },
					])
						.exec((err, likeData) => {
							if (err) {
								throw err
							} else {
								var totalPages = Math.ceil(totalCount / size)
								response = {
									message: 'Lipid Panel Cholesterol Amber List fatch successfully',
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
exports.LipidPanelCholesterolRedList = [

	// body("caseId").isLength({ min: 1 }).trim().withMessage("Invalid caseId!"),
	sanitizeBody("severity_cholesterol").escape(),

	(req, res) => {

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
		LabTestCaseModel.LipidPanelTest.count({ severity_cholesterol: 2 ,ngoId:req.body.ngoId}, async (err, totalCount) => {
			if (err) {
				response = { error: true, message: 'Error fetching data' }
			}
			LabTestCaseModel.LipidPanelTest.find({}, {}, query, async (err, data) => {
				// Mongo command to fetch all data from collection.
				// const post_id = data.post_id
				if (err) {
					response = { error: true, message: 'Error fetching data' }
				} else {
					LabTestCaseModel.LipidPanelTest.aggregate([
						// {'$match':{'$or':[{'severity_hdlcholesterol':req.body.severity_hdlcholesterol}]}},
						// { '$match': { severity_cholesterol: 2 } },
					 { $sort: { createdAt: -1 } },
						{
							$lookup: {
								from: "screeningcases",
								localField: "caseId",
								foreignField: "caseId",
								as: "screeningcases"
							}
						},
						{
							$lookup: {
								from: "citizens",
								localField: "screeningcases.citizenId",
								foreignField: "citizenId",
								as: "citizens"
							}
						},
						{
							$lookup: {
								from: "citizendetails",
								localField: "screeningcases.citizenId",
								foreignField: "citizenId",
								as: "citizendetails"
							}
						},
						{
							$lookup: {
								from: "screeners",
								localField: "screeningcases.screenerId",
								foreignField: "screenerId",
								as: "screeners"
							}
						},
						{ '$unwind': "$citizendetails" },
						{ '$unwind': "$screeners" },
						{ "$unwind": "$screeningcases" },
						{ "$unwind": "$citizens" },
						// { '$match': { severity_cholesterol: 2 } },
						{
							'$project': {
								'caseId': 1,
								'ngoId':1,
								'status': 1,
								'severity_cholesterol': 1,
								'cholesterol': 1,
								'hdlcholesterol': 1,
								'triglycerides': 1,
								'glucose': 1,
								'ldl': 1,
								'tcl_hdl': 1,
								'ldl_hdl': 1,
								'non_hdl': 1,
								'type': 1,
								
								'mobile': '$citizens.mobile',
								'citizenId': '$citizens.citizenId',
								'createdAt':{ $dateToString: { format: "%d/%m/%Y", date: "$createdAt" } },
								'dateOfOnBoarding':{ $dateToString: { format: "%d/%m/%Y", date: "$citizendetails.dateOfOnBoarding" } },
								'address': '$citizendetails.address',
								'citizenId': '$citizendetails.citizenId',
								'mobile': '$citizens.mobile',
								'screenerfullname': { $concat: ["$screeners.firstName", " ", "$screeners.lastName"] },
								'fullname': { $concat: ["$citizens.firstName", " ", "$citizens.lastName"] },
							}
						},
						{ '$match': { severity_cholesterol: 2,ngoId:req.body.ngoId } },
						{ '$sort': { 'createdAt': -1 } },
						{ $skip: query.skip },
						{ $limit: query.limit },
					])
						.exec((err, likeData) => {
							if (err) {
								throw err
							} else {
								var totalPages = Math.ceil(totalCount / size)
								response = {
									message: 'Lipid Panel Cholesterol Red List fatch successfully',
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


exports.LipidPanelTestldlGreenList = [

	//body("caseId").isLength({ min: 1 }).trim().withMessage("Invalid caseId!"),
	// sanitizeBody("caseId").escape(),
	sanitizeBody("severity_ldl").escape(),

	(req, res) => {

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
		LabTestCaseModel.LipidPanelTest.count({ severity_ldl: 0,ngoId:req.body.ngoId }, async (err, totalCount) => {
			if (err) {
				response = { error: true, message: 'Error fetching data' }
			}
			LabTestCaseModel.LipidPanelTest.find({}, {}, query, async (err, data) => {
				// Mongo command to fetch all data from collection.
				// const post_id = data.post_id
				if (err) {
					response = { error: true, message: 'Error fetching data' }
				} else {
					LabTestCaseModel.LipidPanelTest.aggregate([
						// { '$match': { severity_ldl: 0 } },
						// { $sort: { createdAt: -1 } },
						{
							$lookup: {
								from: "screeningcases",
								localField: "caseId",
								foreignField: "caseId",
								as: "screeningcases"
							}
						},
						{
							$lookup: {
								from: "citizens",
								localField: "screeningcases.citizenId",
								foreignField: "citizenId",
								as: "citizens"
							}
						},
						{
							$lookup: {
								from: "citizendetails",
								localField: "screeningcases.citizenId",
								foreignField: "citizenId",
								as: "citizendetails"
							}
						},
						{
							$lookup: {
								from: "screeners",
								localField: "screeningcases.screenerId",
								foreignField: "screenerId",
								as: "screeners"
							}
						},

						{ '$unwind': "$citizendetails" },
						{ '$unwind': "$screeners" },
						{ "$unwind": "$screeningcases" },
						{ "$unwind": "$citizens" },

						{
							'$project': {
								'caseId': 1,
								'ngoId':1,
								'status': 1,
								'severity_triglycerides': 1,
								'cholesterol': 1,
								'hdlcholesterol': 1,
								'triglycerides': 1,
								'glucose': 1,
								'ldl': 1,
								'tcl_hdl': 1,
								'ldl_hdl': 1,
								'non_hdl': 1,
								'type': 1,
								'severity_ldl': 1,
								'createdAt':{ $dateToString: { format: "%d/%m/%Y", date: "$createdAt" } },
								'dateOfOnBoarding':{ $dateToString: { format: "%d/%m/%Y", date: "$citizendetails.dateOfOnBoarding" } },
								'address': '$citizendetails.address',
								'citizenId': '$citizendetails.citizenId',
								'mobile': '$citizens.mobile',
								'screenerfullname': { $concat: ["$screeners.firstName", " ", "$screeners.lastName"] },
								'fullname': { $concat: ["$citizens.firstName", " ", "$citizens.lastName"] },

							}
						},
						{ '$match': { severity_ldl: 0,ngoId:req.body.ngoId } },
						{ $sort: { 'createdAt': -1 } },
						{ $skip: query.skip },
						{ $limit: query.limit },
					])
						.exec((err, likeData) => {
							if (err) {
								throw err
							} else {
								var totalPages = Math.ceil(totalCount / size)
								response = {
									message: 'Lipid Panel Test ldl Green List fetch successfully',
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
exports.LipidPanelTestldlDefaultList = [

	//body("caseId").isLength({ min: 1 }).trim().withMessage("Invalid caseId!"),
	// sanitizeBody("caseId").escape(),
	sanitizeBody("severity_ldl").escape(),

	(req, res) => {

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
		LabTestCaseModel.LipidPanelTest.count({ severity_ldl: 3 }, async (err, totalCount) => {
			if (err) {
				response = { error: true, message: 'Error fetching data' }
			}
			LabTestCaseModel.LipidPanelTest.find({}, {}, query, async (err, data) => {
				// Mongo command to fetch all data from collection.
				// const post_id = data.post_id
				if (err) {
					response = { error: true, message: 'Error fetching data' }
				} else {
					LabTestCaseModel.LipidPanelTest.aggregate([
						// {'$match':{'$or':[{'severity_hdlcholesterol':req.body.severity_hdlcholesterol}]}},
						// { $sort: { createdAt: -1 } },
						{
							$lookup: {
								from: "screeningcases",
								localField: "caseId",
								foreignField: "caseId",
								as: "screeningcases"
							}
						},
						{
							$lookup: {
								from: "citizens",
								localField: "screeningcases.citizenId",
								foreignField: "citizenId",
								as: "citizens"
							}
						},
						{
							$lookup: {
								from: "citizendetails",
								localField: "screeningcases.citizenId",
								foreignField: "citizenId",
								as: "citizendetails"
							}
						},
						{
							$lookup: {
								from: "screeners",
								localField: "screeningcases.screenerId",
								foreignField: "screenerId",
								as: "screeners"
							}
						},

						{ '$unwind': "$citizendetails" },
						{ '$unwind': "$screeners" },
						{ "$unwind": "$screeningcases" },
						{ "$unwind": "$citizens" },
						// { '$match': { severity_ldl: 3 } },
						{
							'$project': {
								'caseId': 1,
								'ngoId':1,
								'status': 1,
								'severity_triglycerides': 1,
								'cholesterol': 1,
								'hdlcholesterol': 1,
								'triglycerides': 1,
								'glucose': 1,
								'ldl': 1,
								'tcl_hdl': 1,
								'ldl_hdl': 1,
								'non_hdl': 1,
								'type': 1,
								'createdAt': { $dateToString: { format: "%d/%m/%Y", date: "$createdAt" } },
								'dateOfOnBoarding': { $dateToString: { format: "%d/%m/%Y", date: "$citizendetails.dateOfOnBoarding" } },
								'address': '$citizendetails.address',
								'citizenId': '$citizendetails.citizenId',
								'mobile': '$citizens.mobile',
								'screenerfullname': { $concat: ["$screeners.firstName", " ", "$screeners.lastName"] },
								'fullname': { $concat: ["$citizens.firstName", " ", "$citizens.lastName"] },

							}
						},
						{ '$match': { severity_ldl: 3 ,ngoId:req.body.ngoId} },
						{ $sort: { 'createdAt': -1 } },
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
exports.LipidPanelTestldlAmberList = [

	//body("caseId").isLength({ min: 1 }).trim().withMessage("Invalid caseId!"),
	// sanitizeBody("caseId").escape(),
	sanitizeBody("severity_ldl").escape(),

	(req, res) => {

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
		LabTestCaseModel.LipidPanelTest.count({ severity_ldl: 1 ,ngoId:req.body.ngoId}, async (err, totalCount) => {
			if (err) {
				response = { error: true, message: 'Error fetching data' }
			}
			LabTestCaseModel.LipidPanelTest.find({}, {}, query, async (err, data) => {
				// Mongo command to fetch all data from collection.
				// const post_id = data.post_id
				if (err) {
					response = { error: true, message: 'Error fetching data' }
				} else {


					LabTestCaseModel.LipidPanelTest.aggregate([
						// {'$match':{'$or':[{'severity_hdlcholesterol':req.body.severity_hdlcholesterol}]}},
						// { '$match': { severity_ldl: 1 } },
						{ $sort: { createdAt: -1 } },
						{
							$lookup: {
								from: "screeningcases",
								localField: "caseId",
								foreignField: "caseId",
								as: "screeningcases"
							}
						},
						{
							$lookup: {
								from: "citizens",
								localField: "screeningcases.citizenId",
								foreignField: "citizenId",
								as: "citizens"
							}
						},
						{
							$lookup: {
								from: "citizendetails",
								localField: "screeningcases.citizenId",
								foreignField: "citizenId",
								as: "citizendetails"
							}
						},
						{
							$lookup: {
								from: "screeners",
								localField: "screeningcases.screenerId",
								foreignField: "screenerId",
								as: "screeners"
							}
						},

						{ '$unwind': "$citizendetails" },
						{ '$unwind': "$screeners" },
						{ "$unwind": "$screeningcases" },
						{ "$unwind": "$citizens" },
						// { '$match': { severity_ldl: 1 } },
						{
							'$project': {
								'caseId': 1,
								'ngoId':1,
								'status': 1,
								'severity_ldl': 1,
								'severity_triglycerides': 1,
								'cholesterol': 1,
								'hdlcholesterol': 1,
								'triglycerides': 1,
								'glucose': 1,
								'ldl': 1,
								'tcl_hdl': 1,
								'ldl_hdl': 1,
								'non_hdl': 1,
								'type': 1,
								'createdAt': { $dateToString: { format: "%d/%m/%Y", date: "$createdAt" } },
								'dateOfOnBoarding': { $dateToString: { format: "%d/%m/%Y", date: "$citizendetails.dateOfOnBoarding" } },
								'address': '$citizendetails.address',
								'citizenId': '$citizendetails.citizenId',
								'mobile': '$citizens.mobile',
								'screenerfullname': { $concat: ["$screeners.firstName", " ", "$screeners.lastName"] },
								'fullname': { $concat: ["$citizens.firstName", " ", "$citizens.lastName"] },

							}
						},
						{ '$match': { severity_ldl: 1,ngoId:req.body.ngoId } },
						// { $sort: { 'createdAt': -1 } },
						{ $skip: query.skip },
						{ $limit: query.limit },
					])
						.exec((err, likeData) => {
							if (err) {
								throw err
							} else {
								var totalPages = Math.ceil(totalCount / size)
								response = {
									message: 'Lipid Panel Test ldl Amber List fatch successfully',
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
exports.LipidPanelTestldlRedList = [

	//body("caseId").isLength({ min: 1 }).trim().withMessage("Invalid caseId!"),
	// sanitizeBody("caseId").escape(),
	sanitizeBody("severity_ldl").escape(),

	(req, res) => {

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
		LabTestCaseModel.LipidPanelTest.count({ severity_ldl: 2 ,ngoId:req.body.ngoId}, async (err, totalCount) => {
			if (err) {
				response = { error: true, message: 'Error fetching data' }
			}
			LabTestCaseModel.LipidPanelTest.find({}, {}, query, async (err, data) => {
				// Mongo command to fetch all data from collection.
				// const post_id = data.post_id
				if (err) {
					response = { error: true, message: 'Error fetching data' }
				} else {

					LabTestCaseModel.LipidPanelTest.aggregate([
						// {'$match':{'$or':[{'severity_hdlcholesterol':req.body.severity_hdlcholesterol}]}},
						// { '$match': { severity_ldl: 0 } },

						{
							$lookup: {
								from: "screeningcases",
								localField: "caseId",
								foreignField: "caseId",
								as: "screeningcases"
							}
						},
						{
							$lookup: {
								from: "citizens",
								localField: "screeningcases.citizenId",
								foreignField: "citizenId",
								as: "citizens"
							}
						},
						{
							$lookup: {
								from: "citizendetails",
								localField: "screeningcases.citizenId",
								foreignField: "citizenId",
								as: "citizendetails"
							}
						},
						{
							$lookup: {
								from: "screeners",
								localField: "screeningcases.screenerId",
								foreignField: "screenerId",
								as: "screeners"
							}
						},

						{ '$unwind': "$citizendetails" },
						{ '$unwind': "$screeners" },
						{ "$unwind": "$screeningcases" },
						{ "$unwind": "$citizens" },

						{
							'$project': {
								'caseId': 1,
								'ngoId':1,
								'status': 1,
								'severity_triglycerides': 1,
								'cholesterol': 1,
								'hdlcholesterol': 1,
								'triglycerides': 1,
								'glucose': 1,
								'severity_ldl': 1,
								'ldl': 1,
								'tcl_hdl': 1,
								'ldl_hdl': 1,
								'non_hdl': 1,
								'type': 1,
								'createdAt': { $dateToString: { format: "%d/%m/%Y", date: "$createdAt" } },
								'dateOfOnBoarding': { $dateToString: { format: "%d/%m/%Y", date: "$citizendetails.dateOfOnBoarding" } },
								'address': '$citizendetails.address',
								'citizenId': '$citizendetails.citizenId',
								'mobile': '$citizens.mobile',

								'screenerfullname': { $concat: ["$screeners.firstName", " ", "$screeners.lastName"] },
								'fullname': { $concat: ["$citizens.firstName", " ", "$citizens.lastName"] },

							}
						},
						{ '$match': { severity_ldl: 2 ,ngoId:req.body.ngoId} },
						{ $sort: { 'createdAt': -1 } },
						{ $skip: query.skip },
						{ $limit: query.limit },
					])
						.exec((err, likeData) => {
							if (err) {
								throw err
							} else {
								var totalPages = Math.ceil(totalCount / size)
								response = {
									message: 'Lipid Panel Test ldl Red List fetch successfully',
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


exports.LipidPanelTestldlRedcount = [

	(req, res) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {


				LabTestCaseModel.LipidPanelTest.aggregate([
					{ '$match': { severity_triglycerides: 2,ngoId:req.body.ngoId } },
					{

						'$group': {
							'_id': "$severity",
							'count': { '$sum': 1 }
						},

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

]

//Glucose Test

exports.addBloodGlucoseTest = [

	body("caseId").isLength({ min: 1 }).trim().withMessage("Invalid caseId!"),
	body("status").isLength({ min: 1 }).trim().withMessage("Enter Status code !"),
	body("bloodglucose").isLength({ min: 1 }).trim().withMessage("Enter bloodglucose!"),
	body("type").isLength({ min: 1 }).trim().withMessage("Enter Type!"),

	sanitizeBody("caseId").escape(),
	sanitizeBody("status").escape(),
	sanitizeBody("bloodglucose").escape(),
	sanitizeBody("type").escape(),


	(req, res) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {

				var recBloodGlucoseTest = {
					caseId: req.body.caseId,
					status: req.body.status,
					bloodglucose: req.body.bloodglucose,
					type: req.body.type,
					ngoId:req.body.ngoId,
					notes:req.body.notes,
				};

				var actionBloodGlucoseTestCase = new LabTestCaseModel.BloodGlucoseTest(recBloodGlucoseTest);
				actionBloodGlucoseTestCase.save(function (_error) {
					if (_error) { apiResponse.ErrorResponse(res, "Sorry:" + _error); }
					else {

						return apiResponse.successResponseWithData(res, "BloodGlucose Added Successfully ", recBloodGlucoseTest);
					}
				}
				);

			}
		} catch (err) {

			return apiResponse.ErrorResponse(res, err);
		}
	}];

exports.BloodGlucoseTestList = [

	//body("caseId").isLength({ min: 1 }).trim().withMessage("Invalid caseId!"),
	sanitizeBody("caseId").escape(),
	sanitizeBody("severity").escape(),

	(req, res) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {

				var matchfield = {};
				var arraymatch = [];
				if (req.body.caseId != null && req.body.caseId != undefined && req.body.caseId != "") {
					matchfield['caseId'] = req.body.caseId;
					arraymatch.push(matchfield);
					matchfield = {};
				}
				if (req.body.severity != null && req.body.severity != undefined && req.body.severity != "") {
					matchfield['severity'] = parseInt(req.body.severity);
					arraymatch.push(matchfield);
					matchfield = {};

				}
				var andcond = { '$match': { '$and': arraymatch } };

				if (arraymatch.length === 0) {
					andcond = { '$match': {} };

				}
				console.dir(andcond);


				LabTestCaseModel.BloodGlucoseTest.aggregate([
					andcond,
					// {$and:
					{'$match':{ngoId:req.body.ngoId}},
					{
						$lookup: {
							from: "screeningcases",
							localField: "caseId",
							foreignField: "caseId",
							as: "screeningcases"
						}
					},
					{
						$lookup: {
							from: "citizens",
							localField: "screeningcases.citizenId",
							foreignField: "citizenId",
							as: "citizens"
						}
					},
					{ "$unwind": "$screeningcases" },
					{ "$unwind": "$citizens" },
					// {
					// 	// output result into other collection
					// 	$merge: {
					// 	  into: '$citizens',
					// 	},
					//   },
					{
						'$project': {
							'caseId': 1,
							'ngoId':1,
							'status': 1,
							'bloodglucose': 1,
							'type': 1,
							'severity': 1,
							'createdAt': 1,
							'citizenId': '$screeningcases.citizenId',
							//  'firstname':'$citizens.firstName'
							'fullname': { $concat: ["$citizens.firstName", " ", "$citizens.lastName"] },
						}
					}
				]).then(users => {

					let user = users[0];
					if (user) {
						for (var i = 0; i < users.length; i++) {
							users[i].createdAt = utility.toDDmmyy(users[i].createdAt);

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

exports.BloodGlucoseTestAmberList = [
 
	async (req, res) => {
		var blooddata;
		var bloodcount=0;
		var bloodcountFinal = 0 ;
		const { pageNo, size} = req.body
		   console.log(req.body);
		// if(!pageNo){
		//   pageNo=1;
		// }
		// if(!size){
		//   size=10;
		// }
		   const query = {}
		   query.skip = size * (pageNo - 1)
		   query.limit = parseInt(size)
		   console.log(query);
		 
	// for count 
	bloodcount = await LabTestCaseModel.BloodGlucoseTest.aggregate([
	
		{
			'$project': {
				ngoId:1,
				severity:1,
				'bloodglucose': { $toInt: "$bloodglucose" },
				
			}
		},
	 
		{ $match: {severity:1,ngoId:req.body.ngoId} },
	  { $group: { _id: null, count: { $sum: 1 } } }
	  
		])

		bloodcountFinal = bloodcount[0].count;
		  console.log(bloodcountFinal);
	
		
	var	blooddata = await LabTestCaseModel.BloodGlucoseTest.aggregate([
	
		  { $sort: { 'createdAt': -1 } },
		  {
			  $lookup: {
				  from: "screeningcases",
				  localField: "caseId",
				  foreignField: "caseId",
				  as: "screeningcases"
			  }
		  },
		  {
			  $lookup: {
				  from: "citizendetails",
				  localField: "screeningcases.citizenId",
				  foreignField: "citizenId",
				  as: "citizendetails"
			  }
		  },
		  {
			  $lookup: {
				  from: "screeners",
				  localField: "screeningcases.screenerId",
				  foreignField: "screenerId",
				  as: "screeners"
			  }
		  },
		  {
			  $lookup: {
				  from: "citizens",
				  localField: "screeningcases.citizenId",
				  foreignField: "citizenId",
				  as: "citizens"
			  }
		  },
  
		   { "$unwind": { path: "$citizens", preserveNullAndEmptyArrays: true } },
		//   { '$unwind': { path: "$citizendetails", preserveNullAndEmptyArrays: true } },
		//   { "$unwind": { path: "$screeningcases", preserveNullAndEmptyArrays: true } },
		//  { '$unwind': { path: "$screeners", preserveNullAndEmptyArrays: true } },
  
		  {
			  '$project': {
				  'caseId': 1,
				  'ngoId':1,
				  'status': 1,
				  'bloodglucose': { $toInt: "$bloodglucose" },
				  'severity': 1,
				  'createdAt':{ $dateToString: { format: "%d/%m/%Y", date: "$createdAt" } },
				  citizenId:'$screeningcases.citizenId',
				  mobile:'$citizens.mobile',
				  address: '$citizendetails.address',
				  dateOfOnBoarding:'$citizendetails.dateOfOnBoarding',
		       "fullname": { $concat: ["$citizens.firstName", " ", "$citizens.lastName"] },
				screenerFirstName:"$screeners.firstName",
				screenerLastName:"$screeners.lastName"
			  }
		  },
		//   { $match: { bloodglucose: { $gte: 100, $lte: 125 } } },
		{ $match: { severity:1,ngoId:req.body.ngoId } },
		  
			  { $skip: query.skip },
			  { $limit: query.limit },
			])
	  response = {
		message: 'BloodGlucose Test Amber List fatch successfully',
		status: 1,
	   pages: pageNo,
		// total: count,
		size: size,
		total:bloodcountFinal,
		data: blooddata,
		
		}
		res.json(response)
	}
  ]
//   { $match: { bloodglucose: { $gt: 80, $lt: 100 } } },

exports.BloodGlucoseTestGreenList = [

	async (req, res) => {
		var blooddata;
		var bloodcount=0;
		var bloodcountFinal = 0 ;
		const { pageNo, size} = req.body
		   console.log(req.body);
		// if(!pageNo){
		//   pageNo=1;
		// }
		// if(!size){
		//   size=10;
		// }
		   const query = {}
		   query.skip = size * (pageNo - 1)
		   query.limit = parseInt(size)
		   console.log(query);
		 
	// for count 
	bloodcount = await LabTestCaseModel.BloodGlucoseTest.aggregate([
	
		{
			'$project': {
				ngoId:1,
				severity:1,
				'bloodglucose': { $toInt: "$bloodglucose" },
				
			}
		},
	 
		{ $match: { severity:0,ngoId:req.body.ngoId } },
	  { $group: { _id: null, count: { $sum: 1 } } }
	  
		])

		bloodcountFinal = bloodcount[0].count;
		  console.log(bloodcountFinal);
	
		
	var	blooddata = await LabTestCaseModel.BloodGlucoseTest.aggregate([
	
		  { $sort: { 'createdAt': -1 } },
		  {
			  $lookup: {
				  from: "screeningcases",
				  localField: "caseId",
				  foreignField: "caseId",
				  as: "screeningcases"
			  }
		  },
		  {
			  $lookup: {
				  from: "citizendetails",
				  localField: "screeningcases.citizenId",
				  foreignField: "citizenId",
				  as: "citizendetails"
			  }
		  },
		  {
			  $lookup: {
				  from: "screeners",
				  localField: "screeningcases.screenerId",
				  foreignField: "screenerId",
				  as: "screeners"
			  }
		  },
		  {
			  $lookup: {
				  from: "citizens",
				  localField: "screeningcases.citizenId",
				  foreignField: "citizenId",
				  as: "citizens"
			  }
		  },
  
		   { "$unwind": { path: "$citizens", preserveNullAndEmptyArrays: true } },
		//   { '$unwind': { path: "$citizendetails", preserveNullAndEmptyArrays: true } },
		//   { "$unwind": { path: "$screeningcases", preserveNullAndEmptyArrays: true } },
		//  { '$unwind': { path: "$screeners", preserveNullAndEmptyArrays: true } },
  
		  {
			  '$project': {
				  'caseId': 1,
				  'ngoId':1,
				  'status': 1,
				  'bloodglucose': { $toInt: "$bloodglucose" },
				  'severity': 1,
				  'createdAt':{ $dateToString: { format: "%d/%m/%Y", date: "$createdAt" } },
				  citizenId:'$screeningcases.citizenId',
				  mobile:'$citizens.mobile',
				  address: '$citizendetails.address',
				  dateOfOnBoarding:'$citizendetails.dateOfOnBoarding',
		       "fullname": { $concat: ["$citizens.firstName", " ", "$citizens.lastName"] },
				screenerFirstName:"$screeners.firstName",
				screenerLastName:"$screeners.lastName"
			  }
		  },
		//   { $match: { bloodglucose: { $gte: 100, $lte: 125 } } },
		{ $match: { severity:0,ngoId:req.body.ngoId } },
		  
			  { $skip: query.skip },
			  { $limit: query.limit },
			])
	  response = {
		message: 'BloodGlucose Test Green List fetch successfully',
		status: 1,
	   pages: pageNo,
		// total: count,
		size: size,
		total:bloodcountFinal,
		data: blooddata,
		
		}
		res.json(response)
	}
]
exports.BloodGlucoseGreenCount=[
	async (req, res) => {
	await LabTestCaseModel.BloodGlucoseTest.aggregate([
		{$limit:1000},
		{ $sort: { 'createdAt': -1 } },
		{
			$lookup: {
				from: "screeningcases",
				localField: "caseId",
				foreignField: "caseId",
				as: "screeningcases"
			}
		},
		{
			$lookup: {
				from: "citizendetails",
				localField: "screeningcases.citizenId",
				foreignField: "citizenId",
				as: "citizendetails"
			}
		},
		{
			$lookup: {
				from: "screeners",
				localField: "screeningcases.screenerId",
				foreignField: "screenerId",
				as: "screeners"
			}
		},
		{
			$lookup: {
				from: "citizens",
				localField: "screeningcases.citizenId",
				foreignField: "citizenId",
				as: "citizens"
			}
		},
	
		{ "$unwind": { path: "$citizens", preserveNullAndEmptyArrays: true } },
		{ '$unwind': { path: "$citizendetails", preserveNullAndEmptyArrays: true } },
		{ "$unwind": { path: "$screeningcases", preserveNullAndEmptyArrays: true } },
		{ '$unwind': { path: "$screeners", preserveNullAndEmptyArrays: true } },
	
		{
			'$project': {
				'caseId': 1,
				'ngoId':1,
				'status': 1,
				'bloodglucose': { $toInt: "$bloodglucose" },
				'type': 1,
				'severity': 1,
				'createdAt': 1,
				'citizenId': '$screeningcases.citizenId',
				'mobile': '$citizens.mobile',
				//  'dateOfOnBoarding':'$citizendetails.dateOfOnBoarding',
				'dateOfOnBoarding': { $dateToString: { format: "%d/%m/%Y", date: "$citizendetails.dateOfOnBoarding" } },
				'screenerfullname': { $concat: ["$screeners.firstName", " ", "$screeners.lastName"] },
				'fullname': { $concat: ["$citizens.firstName", " ", "$citizens.lastName"] },
			}
		},
		{ $match: { severity:0 ,ngoId:req.body.ngoId} },
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
				data: likeData.reverse(),
			  }
			  
			  res.json(response)
			}
		  })
		}
			
		  
		  
]
exports.BloodGlucoseAmberCount=[
	async (req, res) => {
	await LabTestCaseModel.BloodGlucoseTest.aggregate([
		{$limit:1000},
		{ $sort: { 'createdAt': -1 } },
		{
			$lookup: {
				from: "screeningcases",
				localField: "caseId",
				foreignField: "caseId",
				as: "screeningcases"
			}
		},
		{
			$lookup: {
				from: "citizendetails",
				localField: "screeningcases.citizenId",
				foreignField: "citizenId",
				as: "citizendetails"
			}
		},
		{
			$lookup: {
				from: "screeners",
				localField: "screeningcases.screenerId",
				foreignField: "screenerId",
				as: "screeners"
			}
		},
		{
			$lookup: {
				from: "citizens",
				localField: "screeningcases.citizenId",
				foreignField: "citizenId",
				as: "citizens"
			}
		},
	
		{ "$unwind": { path: "$citizens", preserveNullAndEmptyArrays: true } },
		{ '$unwind': { path: "$citizendetails", preserveNullAndEmptyArrays: true } },
		{ "$unwind": { path: "$screeningcases", preserveNullAndEmptyArrays: true } },
		{ '$unwind': { path: "$screeners", preserveNullAndEmptyArrays: true } },
	
		{
			'$project': {
				'caseId': 1,
				'ngoId':1,
				'status': 1,
				'bloodglucose': { $toInt: "$bloodglucose" },
				'type': 1,
				'severity': 1,
				'createdAt': 1,
				'citizenId': '$screeningcases.citizenId',
				'mobile': '$citizens.mobile',
				//  'dateOfOnBoarding':'$citizendetails.dateOfOnBoarding',
				'dateOfOnBoarding': { $dateToString: { format: "%d/%m/%Y", date: "$citizendetails.dateOfOnBoarding" } },
				'screenerfullname': { $concat: ["$screeners.firstName", " ", "$screeners.lastName"] },
				'fullname': { $concat: ["$citizens.firstName", " ", "$citizens.lastName"] },
			}
		},
		{ $match: { severity:1,ngoId:req.body.ngoId} },

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
				data: likeData.reverse(),
			  }
			  
			  res.json(response)
			}
		  })
		}
			
		  
		  
]

exports.BloodGlucoseRedCount=[
	async (req, res) => {
	await LabTestCaseModel.BloodGlucoseTest.aggregate([
		{$limit:1000},
		{ $sort: { 'createdAt': -1 } },
		{
			$lookup: {
				from: "screeningcases",
				localField: "caseId",
				foreignField: "caseId",
				as: "screeningcases"
			}
		},
		{
			$lookup: {
				from: "citizendetails",
				localField: "screeningcases.citizenId",
				foreignField: "citizenId",
				as: "citizendetails"
			}
		},
		{
			$lookup: {
				from: "screeners",
				localField: "screeningcases.screenerId",
				foreignField: "screenerId",
				as: "screeners"
			}
		},
		{
			$lookup: {
				from: "citizens",
				localField: "screeningcases.citizenId",
				foreignField: "citizenId",
				as: "citizens"
			}
		},
	
		{ "$unwind": { path: "$citizens", preserveNullAndEmptyArrays: true } },
		{ '$unwind': { path: "$citizendetails", preserveNullAndEmptyArrays: true } },
		{ "$unwind": { path: "$screeningcases", preserveNullAndEmptyArrays: true } },
		{ '$unwind': { path: "$screeners", preserveNullAndEmptyArrays: true } },
	
		{
			'$project': {
				'caseId': 1,
				'ngoId':1,
				'status': 1,
				'bloodglucose': { $toInt: "$bloodglucose" },
				'type': 1,
				'severity': 1,
				'createdAt': 1,
				'citizenId': '$screeningcases.citizenId',
				'mobile': '$citizens.mobile',
				//  'dateOfOnBoarding':'$citizendetails.dateOfOnBoarding',
				'dateOfOnBoarding': { $dateToString: { format: "%d/%m/%Y", date: "$citizendetails.dateOfOnBoarding" } },
				'screenerfullname': { $concat: ["$screeners.firstName", " ", "$screeners.lastName"] },
				'fullname': { $concat: ["$citizens.firstName", " ", "$citizens.lastName"] },
			}
		},
		{ '$match': {severity:2,ngoId:req.body.ngoId}, },
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
				data: likeData.reverse(),
			  }
			  
			  res.json(response)
			}
		  })
		}
			
		  
		  
]


exports.BloodGlucoseTestRedList = [

	async (req, res) => {
		var blooddata;
		var bloodcount=0;
		var bloodcountFinal = 0 ;
		const { pageNo, size} = req.body
		   console.log(req.body);
		// if(!pageNo){
		//   pageNo=1;
		// }
		// if(!size){
		//   size=10;
		// }
		   const query = {}
		   query.skip = size * (pageNo - 1)
		   query.limit = parseInt(size)
		   console.log(query);
		 
	// for count 
	bloodcount = await LabTestCaseModel.BloodGlucoseTest.aggregate([
	
		{
			'$project': {
				ngoId:1,
				severity:1,
				'bloodglucose': { $toInt: "$bloodglucose" },
				
			}
		},
	 
	  { '$match': {severity:2,ngoId:req.body.ngoId }},
	  { $group: { _id: null, count: { $sum: 1 } } }
	  
		])

		bloodcountFinal = bloodcount[0].count;
		  console.log(bloodcountFinal);
	
		
	var	blooddata = await LabTestCaseModel.BloodGlucoseTest.aggregate([
	
		  { $sort: { 'createdAt': -1 } },
		  {
			  $lookup: {
				  from: "screeningcases",
				  localField: "caseId",
				  foreignField: "caseId",
				  as: "screeningcases"
			  }
		  },
		  {
			  $lookup: {
				  from: "citizendetails",
				  localField: "screeningcases.citizenId",
				  foreignField: "citizenId",
				  as: "citizendetails"
			  }
		  },
		  {
			  $lookup: {
				  from: "screeners",
				  localField: "screeningcases.screenerId",
				  foreignField: "screenerId",
				  as: "screeners"
			  }
		  },
		  {
			  $lookup: {
				  from: "citizens",
				  localField: "screeningcases.citizenId",
				  foreignField: "citizenId",
				  as: "citizens"
			  }
		  },
  
		   { "$unwind": { path: "$citizens", preserveNullAndEmptyArrays: true } },
		//   { '$unwind': { path: "$citizendetails", preserveNullAndEmptyArrays: true } },
		//   { "$unwind": { path: "$screeningcases", preserveNullAndEmptyArrays: true } },
		//  { '$unwind': { path: "$screeners", preserveNullAndEmptyArrays: true } },
  
		  {
			  '$project': {
				  'caseId': 1,
				  'ngoId':1,
				  'status': 1,
				  'bloodglucose': { $toInt: "$bloodglucose" },
				  'severity': 1,
				  'createdAt':{ $dateToString: { format: "%d/%m/%Y", date: "$createdAt" } },
				  citizenId:'$screeningcases.citizenId',
				  mobile:'$citizens.mobile',
				  address: '$citizendetails.address',
				  dateOfOnBoarding:'$citizendetails.dateOfOnBoarding',
		       "fullname": { $concat: ["$citizens.firstName", " ", "$citizens.lastName"] },
			   screenerFirstName:"$screeners.firstName",
			   screenerLastName:"$screeners.lastName"
			  }
		  },
		//   { $match: { bloodglucose: { $gte: 100, $lte: 125 } } },
		{ '$match': { severity:2,ngoId:req.body.ngoId }},
		  
			  { $skip: query.skip },
			  { $limit: query.limit },
			])
	  response = {
		message: 'BloodGlucose Test Red List fetch successfully',
		status: 1,
	   pages: pageNo,
		// total: count,
		size: size,
		total:bloodcountFinal,
		data: blooddata,
		
		}
		res.json(response)
	}
];

//Thal and Sickle

exports.addSickleCell = [

	body("caseId").isLength({ min: 1 }).trim().withMessage("Invalid caseId!"),
	body("status").isLength({ min: 1, max: 1 }).trim().withMessage("Enter Status code !"),
	body("SickleCell").isLength({ min: 1, max: 1 }).trim().withMessage("Enter Sickle Cell Test Result!"),

	sanitizeBody("caseId").escape(),
	sanitizeBody("status").escape(),
	sanitizeBody("SickleCell").escape(),

	(req, res) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {

				var ID = utility.uID();

				var userId = req.body.userId;

				var recSickleCell = {
					SickleCell: req.body.SickleCell,
					caseId: req.body.caseId,
					notes: req.body.notes,
					status: req.body.status,
					ngoId:req.body.ngoId,
				};

				var actionSickleCell = new SickleCellModel.SickleCell(recSickleCell);
				actionSickleCell.save(function (_error) {
					if (_error) { apiResponse.ErrorResponse(res, "Sorry:" + _error); }
					else {

						return apiResponse.successResponseWithData(res, "SickleCell added Successfully", recSickleCell);
					}
				}
				);

			}
		} catch (err) {

			return apiResponse.ErrorResponse(res, err);
		}
	}];

exports.SickleCellList = [

	body("caseId").isLength({ min: 1 }).trim().withMessage("Invalid caseId!"),
	sanitizeBody("caseId").escape(),

	(req, res) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {

				SickleCellModel.SickleCell.aggregate([
					{ '$match': { "caseId": req.body.caseId ,ngoId:req.body.ngoId} },

					{
						'$project': {
							'status': 1,
							'SickleCell': 1,
							'caseId': 1,
							'ngoId':1,
							'notes': 1,
							'createdAt': 1
						}
					}
				]).then(users => {

					let user = users[0];
					if (user) {
						for (var i = 0; i < users.length; i++) {
							users[i].createdAt = utility.toDDmmyy(users[i].createdAt);

						}
						return apiResponse.successResponseWithData(res, "sickle list fetch successfully ", users);
					}
					else return apiResponse.ErrorResponse(res, "Sickle list Not Found");

				});
			}
		} catch (err) {

			return apiResponse.ErrorResponse(res, "EXp:" + err);
		}
	}

];


exports.addThalassemia = [

	body("caseId").isLength({ min: 1 }).trim().withMessage("Invalid caseId!"),
	body("status").isLength({ min: 1, max: 1 }).trim().withMessage("Enter Status code !"),
	body("Thalassemia").isLength({ min: 1, max: 1 }).trim().withMessage("Enter Thalassemia Test Result!"),

	sanitizeBody("caseId").escape(),
	sanitizeBody("status").escape(),
	sanitizeBody("Thalassemia").escape(),

	(req, res) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {


				var recThalassemia = {
					Thalassemia: req.body.Thalassemia,
					caseId: req.body.caseId,
					notes: req.body.notes,
					status: req.body.status,
					ngoId:req.body.ngoId,
				};

				var actionThalassemia = new ThalassemiaModel.Thalassemia(recThalassemia);
				actionThalassemia.save(function (_error) {
					if (_error) { apiResponse.ErrorResponse(res, "Sorry:" + _error); }
					else {

						return apiResponse.successResponseWithData(res, "Thalassemia Successfully Submitted", recThalassemia);
					}
				}
				);

			}
		} catch (err) {

			return apiResponse.ErrorResponse(res, err);
		}
	}];

exports.ThalassemiaList = [

	body("caseId").isLength({ min: 1 }).trim().withMessage("Invalid caseId!"),
	sanitizeBody("caseId").escape(),

	(req, res) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {

				ThalassemiaModel.Thalassemia.aggregate([
					{ '$match': { "caseId": req.body.caseId,ngoId:req.body.ngoId } },

					{
						'$project': {
							'status': 1,
							'Thalassemia': 1,
							'caseId': 1,
							'ngoId':1,
							'notes': 1,
							'createdAt': 1
						}
					}
				]).then(users => {

					let user = users[0];
					if (user) {
						for (var i = 0; i < users.length; i++) {
							users[i].createdAt = utility.toDDmmyy(users[i].createdAt);

						}
						return apiResponse.successResponseWithData(res, "Thalassemia List fetch successfully", users);
					}
					else return apiResponse.ErrorResponse(res, "Thalassemia List Not Found");

				});
			}
		} catch (err) {

			return apiResponse.ErrorResponse(res, "EXp:" + err);
		}
	}

];

// Lung Function


exports.addLungFunctionTest = [

	body("caseId").isLength({ min: 1 }).trim().withMessage("Invalid caseId!"),
	body("status").isLength({ min: 1, max: 1 }).trim().withMessage("Enter Status code !"),

	sanitizeBody("caseId").escape(),
	sanitizeBody("status").escape(),
	sanitizeBody("fvc_predicted").escape(),
	sanitizeBody("fvc_actual").escape(),
	sanitizeBody("fev1_predicted").escape(),
	sanitizeBody("fev1_actual").escape(),
	sanitizeBody("fvc1_predicted").escape(),
	sanitizeBody("fvc1_actual").escape(),
	sanitizeBody("pef_predicted").escape(),
	sanitizeBody("pef_actual").escape(),
	sanitizeBody("fvc_predicted_percent").escape(),
	sanitizeBody("fev1_predicted_percent").escape(),
	sanitizeBody("fvc1_predicted_percent").escape(),
	sanitizeBody("pef_predicted_percent").escape(),

	(req, res) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {

				var ID = utility.uID();

				var userId = req.body.userId;

				var recLung = {
					fvc_predicted: req.body.fvc_predicted,
					fvc_actual: req.body.fvc_actual,
					fev1_predicted: req.body.fev1_predicted,
					fev1_actual: req.body.fev1_actual,
					fvc1_predicted: req.body.fvc1_predicted,
					fvc1_actual: req.body.fvc1_actual,
					pef_predicted: req.body.pef_predicted,
					pef_actual: req.body.pef_actual,
					notes: req.body.notes,
					fvc_predicted_percent: req.body.fvc_predicted_percent,
					fev1_predicted_percent: req.body.fev1_predicted_percent,
					fvc1_predicted_percent: req.body.fvc1_predicted_percent,
					pef_predicted_percent: req.body.pef_predicted_percent,
					caseId: req.body.caseId,
					status: req.body.status,
					ngoId:req.body.ngoId,
				};

				var actionLung = new LungFunctionTest.LungFunction(recLung);
				actionLung.save(function (_error) {
					if (_error) { apiResponse.ErrorResponse(res, "Sorry:" + _error); }
					else {

						return apiResponse.successResponseWithData(res, "LungFunction Test Successfully Submitted", recLung);
					}
				}
				);

			}
		} catch (err) {

			return apiResponse.ErrorResponse(res, err);
		}
	}];

exports.LungTestList = [

	body("caseId").isLength({ min: 1 }).trim().withMessage("Invalid caseId!"),
	sanitizeBody("caseId").escape(),

	(req, res) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {

				LungFunctionTest.LungFunction.aggregate([
					{ '$match': { "caseId": req.body.caseId ,ngoId:req.body.ngoId} },

					{
						'$project': {
							'status': 1,
							'ngoId':1,
							'fvc_predicted': 1,
							'fvc_actual': 1,
							'fev1_predicted': 1,
							'fev1_actual': 1,
							'fvc1_predicted': 1,
							'fvc1_actual': 1,
							'pef_predicted': 1,
							'pef_actual': 1,
							'notes': 1,
							'fvc_predicted_percent': 1,
							'fev1_predicted_percent': 1,
							'fvc1_predicted_percent': 1,
							'pef_predicted_percent': 1,
							'caseId': 1,
							'createdAt': 1
						}
					}
				]).then(users => {

					let user = users[0];
					if (user) {
						for (var i = 0; i < users.length; i++) {
							users[i].createdAt = utility.toDDmmyy(users[i].createdAt);

						}
						return apiResponse.successResponseWithData(res, "LungTest List fetch successfully", users);
					}
					else return apiResponse.ErrorResponse(res, "Not Found");

				});
			}
		} catch (err) {

			return apiResponse.ErrorResponse(res, "EXp:" + err);
		}
	}

];



//Graphs
// exports.bloodGlucoseCount = [



// 	async (req, res) => {

// 		// try {
// 		// 	const errors = validationResult(req);
// 		// 	if (!errors.isEmpty()) {
// 		// 		return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
// 		// 	} else {
// 				var redCount=0;
// 				var greenCount =0;
// 				var amberCount =0;

// 				// LabTestCaseModel.BloodGlucoseTest.aggregate([
// 				// 	{

// 				// 		'$group': {
// 				// 			'_id': "$severity",
// 				// 			'count': { '$sum': 1 }
// 				// 		},

// 				// 	}
// 				// ])
// 				greenCount= await LabTestCaseModel.BloodGlucoseTest.aggregate([
	
// 					{
// 						'$project': {
// 							'ngoId':1,
// 							'bloodglucose': { $toInt: "$bloodglucose" },
							
// 						}
// 					},
				 
// 					{ $match: { bloodglucose: { $gt: 80, $lt: 100 } ,ngoId:req.body.ngoId} },
// 				  { $group: { _id: null, count: { $sum: 1 } } }
				  
// 					])
// 					  bloodcountGreen = greenCount[0].count;
// 						console.log(bloodcountGreen);

// 			redCount=await LabTestCaseModel.BloodGlucoseTest.aggregate([
	
// 				{
// 					'$project': {
// 						'ngoId':1,
// 						'bloodglucose': { $toInt: "$bloodglucose" },
						
// 					}
// 				},
			 
// 			  { '$match': { bloodglucose: { $gt: 125 } ,ngoId:req.body.ngoId}},
// 			  { $group: { _id: null, count: { $sum: 1 } } }
			  
// 				])
// 					  bloodcountRed = redCount[0].count;
// 					  console.log(bloodcountRed);

// 				 amberCount= await LabTestCaseModel.BloodGlucoseTest.aggregate([
	
// 					{
// 						'$project': {
// 							'ngoId':1,
// 							'bloodglucose': { $toInt: "$bloodglucose" },
							
// 						}
// 					},
				 
// 					{ $match: { bloodglucose: { $gte: 100, $lte: 125 },ngoId:req.body.ngoId } },
// 				  { $group: { _id: null, count: { $sum: 1 } } }
				  
// 					])
// 					  bloodcountAmber = amberCount[0].count;
// 					  console.log(bloodcountAmber);

// 					  response = {
// 						message: 'data fatch successfully',
// 						status: 1,
// 						 totalRed: bloodcountRed,
// 						 totalGreen:bloodcountGreen,
// 						 totalAmber:bloodcountAmber,
						
						
// 					  }
					  
// 					  res.json(response)

// 					// }
				
// 		// } catch (err) {

// 		// 	return apiResponse.ErrorResponse(res, "EXp:" + err);
// 		// }
// 	}

// ];

// exports.bloodGlucoseCount = [

// 	async (req, res) => {

// 				var redCount=0;
// 				var greenCount =0;
// 				var amberCount =0;

// 				greenCount =await LabTestCaseModel.BloodGlucoseTest.aggregate([
				
// 					{
// 						'$project': {
// 							'caseId': 1,
// 							'status': 1,
// 							'bloodglucose': { $toInt: "$bloodglucose" },
// 							'type': 1,
							
							
// 						}
// 					},
// 					{ $match: { bloodglucose: { $gt: 80, $lt: 100 } } },
// 					{ $group: { _id: null, count: { $sum: 1 } } },
					
						
// 					  ])
						
// 			 bloodcountGreen = greenCount[0].count;
// 						console.log(bloodcountGreen);

// 			redCount= await LabTestCaseModel.BloodGlucoseTest.aggregate([
					
		
				
// 					{
// 						'$project': {
// 							'caseId': 1,
// 							'status': 1,
// 							'bloodglucose': { $toInt: "$bloodglucose" },
// 							'type': 1,
						
// 						}
// 					},
// 					{ '$match': { bloodglucose: { $gt: 125 } }, },
// 					{ $group: { _id: null, count: { $sum: 1 } } },
					
						
// 					  ])
// 					  bloodcountRed = redCount[0].count;
// 					  console.log(bloodcountRed);

// 				 amberCount= await LabTestCaseModel.BloodGlucoseTest.aggregate([
					
				
				
// 					{
// 						'$project': {
// 							'caseId': 1,
// 							'status': 1,
// 							'bloodglucose': { $toInt: "$bloodglucose" },
// 							'type': 1,
							
// 						}
// 					},
// 					{ $match: { bloodglucose: { $gte: 100, $lte: 125 } } },
			
// 					{ $group: { _id: null, count: { $sum: 1 } } },
					
						
// 					  ])
// 					  bloodcountAmber = amberCount[0].count;
// 					  console.log(bloodcountAmber);

// 					  response = {
// 						message: 'data fatch successfully',
// 						status: 1,
// 						 totalRed: bloodcountRed,
// 						 totalGreen:bloodcountGreen,
// 						 totalAmber:bloodcountAmber,
						
						
// 					  }
					  
// 					  res.json(response)

			
// 	}

// ];
exports.bloodGlucoseCount = [



	(req, res) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {


				LabTestCaseModel.BloodGlucoseTest.aggregate([
					{
						'$project': {
							'severity':1,
							'ngoId':1
						}
					},
					{$match:{'ngoId':req.body.ngoId}},
					{
						
						'$group': {
							'_id': "$severity",
							'count': { '$sum': 1 }
						},
						
					},
					
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

//Urine Test

exports.addUrineTest = [

	body("caseId").isLength({ min: 1 }).trim().withMessage("Invalid caseId!"),
	body("status").isLength({ min: 1 }).trim().withMessage("Enter Status code !"),

	sanitizeBody("caseId").escape(),
	sanitizeBody("status").escape(),
	sanitizeBody("leukocytes").escape(),
	sanitizeBody("nitrite").escape(),
	sanitizeBody("urobilinogen").escape(),
	sanitizeBody("protein").escape(),
	sanitizeBody("ph").escape(),
	sanitizeBody("blood").escape(),
	sanitizeBody("specificGravity").escape(),
	sanitizeBody("ketone").escape(),
	sanitizeBody("bilirubin").escape(),
	sanitizeBody("glucose").escape(),
	sanitizeBody("notes").escape(),

	(req, res) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {

				var recUrineTest = {
					caseId: req.body.caseId,
					status: req.body.status,
					leukocytes: req.body.leukocytes,
					nitrite: req.body.nitrite,
					urobilinogen: req.body.urobilinogen,
					protein: req.body.protein,
					ph: req.body.ph,
					blood: req.body.blood,
					specificGravity: req.body.specificGravity,
					ketone: req.body.ketone,
					bilirubin: req.body.bilirubin,
					glucose: req.body.glucose,
					notes: req.body.notes,
					ngoId:req.body.ngoId,
				};

				var actionUrineTestCase = new LabTestCaseModel.UrineTest(recUrineTest);
				actionUrineTestCase.save(function (_error) {
					if (_error) { apiResponse.ErrorResponse(res, "Sorry:" + _error); }
					else {

						return apiResponse.successResponseWithData(res, "urine test Successfully Submitted", recUrineTest);
					}
				}
				);

			}
		} catch (err) {

			return apiResponse.ErrorResponse(res, err);
		}
	}];

exports.UrineTestList = [

	body("caseId").isLength({ min: 1 }).trim().withMessage("Invalid caseId!"),
	sanitizeBody("caseId").escape(),

	(req, res) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {

				LabTestCaseModel.UrineTest.aggregate([
					{ '$match': { "caseId": req.body.caseId ,ngoId:req.body.ngoId} },

					{
						'$project': {
							'caseId': 1,
							'ngoId':1,
							'status': 1,
							'leukocytes': 1,
							'nitrite': 1,
							'urobilinogen': 1,
							'protein': 1,
							'ph': 1,
							'blood': 1,
							'specificGravity': 1,
							'ketone': 1,
							'bilirubin': 1,
							'glucose': 1,
							'notes': 1,
							'createdAt': 1
						}
					}
				]).then(users => {

					let user = users[0];
					if (user) {
						for (var i = 0; i < users.length; i++) {
							users[i].createdAt = utility.toDDmmyy(users[i].createdAt);

						}
						return apiResponse.successResponseWithData(res, "Urine Test List fetch successfully", users);
					}
					else return apiResponse.ErrorResponse(res, "Urine Test List Not Found");

				});
			}
		} catch (err) {

			return apiResponse.ErrorResponse(res, "EXp:" + err);
		}
	}

];





exports.reyeTestCount = [



	(req, res) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {


				EyeTest.EyeTest.aggregate([
					{
						'$project': {
							'severity_reye':1,
							'ngoId':1
						}
					},
					{$match:{ngoId:req.body.ngoId}},
					{
						'$group': {
							'_id': "$severity_reye",
							'count': { '$sum': 1 }
						}
					},
					
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


exports.leyeTestCount = [



	(req, res) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {


				EyeTest.EyeTest.aggregate([
					{
						'$project': {
							'severity_leye':1,
							'ngoId':1
						}
					},
					{$match:{'ngoId':req.body.ngoId}},
					{

						'$group': {
							'_id': "$severity_leye",
							'count': { '$sum': 1 }
						}
					},
					
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


exports.hemoTestCount = [



	(req, res) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {


				HemoglobinModel.Hemoglobin.aggregate([
					{
						'$project': {
							'severity':1,
							'ngoId':1
						}
					},
					{ '$match': { ngoId:req.body.ngoId }},
					{
						
						'$group': {
							'_id': "$severity",
							'count': { '$sum': 1 }
						},
						
					},
					
				 
				
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


exports.cholesterolTestCount = [



	(req, res) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {


				LabTestCaseModel.LipidPanelTest.aggregate([
					{
						'$project': {
							'severity_cholesterol':1,
							'ngoId':1
						}
					},
					{ $match: { ngoId:req.body.ngoId }},
					{
						'$group': {
							'_id': "$severity_cholesterol",
							'count': { '$sum': 1 }
						}
					},
					
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

exports.hdlcholesterolTestCount = [



	(req, res) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {


				LabTestCaseModel.LipidPanelTest.aggregate([
					{
						'$project': {
							'severity_hdlcholesterol':1,
							'ngoId':1
						}
					},
					{$match: { ngoId:req.body.ngoId }},
					{
						'$group': {
							'_id': "$severity_hdlcholesterol",
							'count': { '$sum': 1 }
						}
					},
					
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


exports.triglyceridesTestCount = [



	(req, res) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {


				LabTestCaseModel.LipidPanelTest.aggregate([
					{
						'$project': {
							'severity_triglycerides':1,
							'ngoId':1
						}
					},
					{ $match: { ngoId:req.body.ngoId }},
					{
						'$group': {
							'_id': "$severity_triglycerides",
							'count': { '$sum': 1 }
						}
					},
					
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


exports.ldlTestCount = [



	(req, res) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {

				console.log("req.body.ngoId===========>",req.body.ngoId);
				LabTestCaseModel.LipidPanelTest.aggregate([
				
					{
						'$project': {
							'severity_ldl':1,
							'ngoId':1
						}
					},
					{ $match: { 'ngoId':req.body.ngoId }},
					{
						'$group': {
							'_id': "$severity_ldl",
							'count': { '$sum': 1 }
						}
					},
				
			
				
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

// count apis

