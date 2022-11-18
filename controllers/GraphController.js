const ScreeningCaseModel = require("../models/ScreeningCase");
const CitizenModel = require("../models/CitizenModel");
const DoctorModel = require("../models/DoctorModel");
const ScreenerModel = require("../models/ScreenerModel");
const NGOModel = require("../models/NGOModel");
const PharmacyModel = require("../models/PharmacyModel")
const PrescriptionModel = require("../models/PrescriptionModel")

const { body, query, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");
const utility = require("../helpers/utility");
const jwt = require("jsonwebtoken");
const { constants } = require("../helpers/constants");
const tmp_out0 = require("../models/tmp_out0Model");
const tmp_out1 = require("../models/tmp_out1Model");

exports.listGraph = [

	// sanitizeBody("screenerId").escape(),
	// sanitizeBody("doctorId").escape(),
	// sanitizeBody("adminId").escape(),
	// sanitizeBody("pharmacyId").escape(),
	// sanitizeBody("ngoId").escape(),
	// sanitizeBody("citizenId").escape(),

	(req, res) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			} else {

				var graph = [];


				ScreenerModel.Screener.find({}).countDocuments()
					.then(screeners => {
						graph.push({ 'Screeners': screeners });
						DoctorModel.Doctor.find({}).countDocuments()
							.then(doctors => {

								graph.push({ 'Doctors': doctors });

								NGOModel.NGO.find({}).countDocuments()
									.then(ngos => {
										graph.push({ 'NGO': ngos });

										PrescriptionModel.Prescription.find({}).countDocuments()
											.then(prescription => {
												graph.push({ 'Prescription': prescription });

												tmp_out0.find({ issubscreener: 0 }).countDocuments()
													.then(sanyojika => {
														graph.push({ 'Sanyojika': sanyojika });
														tmp_out1.find({ issubscreener: 1 }).countDocuments()
															.then(sevika => {
																graph.push({ 'Sevika': sevika });

																CitizenModel.Citizen.find({}).countDocuments()
																	.then(citizens => {
																		graph.push({ 'Citizen': citizens });
																		PharmacyModel.Pharmacy.find({}).countDocuments()
																			.then(pharmacies => {
																				graph.push({ 'Pharmacy': pharmacies });

																				ScreeningCaseModel.ScreeningCase.find({}).countDocuments()
																					.then(cases => {
																						graph.push({ 'Screening': cases });


																						ScreeningCaseModel.ScreeningCase.find({ status: '2' }).countDocuments()
																							.then(nonprescription => {
																								graph.push({ 'NonPrescription': nonprescription })


																								ScreenerModel.Screener.find({ 'issubscreener': 1, 'ngoId': "rakesh", 'ismapped': true }).countDocuments()
																									.then(mapsevika => {
																										graph.push({ 'mapsevika': mapsevika });

																										ScreenerModel.Screener.find({ 'issubscreener': 0, 'ngoId': "rakesh", 'ismapped': true }).countDocuments()
																											.then(mapscreener => {
																												graph.push({ 'mapscreener': mapscreener });

																												DoctorModel.Doctor.find({ 'ngoId': 'rakesh', 'ismapped': true }).countDocuments()
																													.then(mapdoctor => {
																														graph.push({ 'mapdoctor': mapdoctor });


																														ScreenerModel.Screener.aggregate([

																															{
																																'$lookup': {
																																	'localField': 'screenerLoginId',
																																	'from': 'users',
																																	'foreignField': 'userId',
																																	'as': 'users'
																																}
																															},
																															{ '$unwind': '$users' },
																															{ '$match': { 'users.roleId': 21 } },
																															{
																																'$count': "subscreeners"
																															}
																														 ])

																															.then(subscreeners => {
																																//console.dir(subscreeners);

																																if (subscreeners[0])
																																	graph.push({ 'Sevikas': subscreeners[0].subscreeners });
																																else
																																	graph.push({ 'Sevikas': 0 });
																																if (graph) {
																																	return apiResponse.successResponseWithData(res, "Found", graph);
																																}
																																else return apiResponse.ErrorResponse(res, "Not Found");



																														});
																													});

																											});

																									});
																							});
																					});
																			});
																	});

															});
													});

											});

									});
							});
					});



			}
		} catch (err) {

			return apiResponse.ErrorResponse(res, "EXp:" + err);
		}
	}

];

