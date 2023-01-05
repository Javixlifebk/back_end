const ScreeningCaseModel = require("../models/ScreeningCase");
const CitizenModel = require("../models/CitizenModel");
const DoctorModel = require("../models/DoctorModel");
const ScreenerModel = require("../models/ScreenerModel");
const UserModel = require("../models/UserModel");
const UserDetailsModel = require("../models/UserDetailsModel");
const NGOModel = require("../models/NGOModel");
const EyeTest = require("../models/EyeTestModel");
const PharmacyModel = require("../models/PharmacyModel");
const lipidcritical = require("../models/lipidcriticalcitizenModel");
const HeartTest = require("../models/HeartTestModel");
const SickleCellModel = require("../models/SickleCellModel");
const ThalassemiaModel = require("../models/ThalassemiaModel");
const LungFunctionTest = require("../models/LungFunctionTest");
const PrescriptionModel = require("../models/PrescriptionModel");
const GeneralSurveyModel=require("../models/GeneralSurveyModel");
const HealthSurveyModel=require("../models/HealthSurveyModel")
const HemoglobinModel = require("../models/HemoglobinModel");
const LabTestCaseModel = require("../models/LabTestModel");
const VisualExamModel = require("../models/VisualExamModel");
const MedicalAllergyModel = require("../models/MedicalAllergyModel");
const MedicalHistoryModel = require("../models/MedicalHistoryModel");
const SocioEconomicSurveyModel=require("../models/SocioEconomicSurveyModel")
const PersonalHistoryModel = require("../models/PersonalHistoryModel");
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
        return apiResponse.validationErrorWithData(
          res,
          "Validation Error.",
          errors.array()
        );
      } else {
        var graph = [];

        ScreenerModel.Screener.find({ngoId: req.body.ngoId,issubscreener: 0})
        .countDocuments()
          .then((screeners) => {
            graph.push({ Screeners: screeners });
            DoctorModel.Doctor.find({ngoId: req.body.ngoId})
              .countDocuments()
              .then((doctors) => {
                graph.push({ Doctors: doctors });

                NGOModel.NGO.find({ngoLoginId: req.body.ngoLoginId,})
                  .countDocuments()
                  .then((ngos) => {
                    graph.push({ NGO: ngos });

                    CitizenModel.Citizen.find({ngoId: req.body.ngoId,'isUnrefer':2})
                      .countDocuments()
                      .then((prescription) => {
                        graph.push({ Prescription: prescription });

                        tmp_out0
                          .find({ issubscreener: 0,ngoId: req.body.ngoId})
                          .countDocuments()
                          .then((sanyojika) => {
                            graph.push({ Sanyojika: sanyojika });
                            tmp_out1
                              .find({ issubscreener: 1 ,ngoId: req.body.ngoId})
                              .countDocuments()
                              .then((sevika) => {
                                graph.push({ Sevika: sevika });

                                CitizenModel.Citizen.find({ngoId: req.body.ngoId,})
                                  .countDocuments()
                                  .then((citizens) => {
                                    graph.push({ Citizen: citizens });
                                    PharmacyModel.Pharmacy.find({ngoId: req.body.ngoId})
                                      .countDocuments()
                                      .then((pharmacies) => {
                                        graph.push({ Pharmacy: pharmacies });

                                        ScreeningCaseModel.ScreeningCase.find(
                                          {isdeleted:false,ngoId: req.body.ngoId,}
                                        )
                                          .countDocuments()
                                          .then((cases) => {
                                            graph.push({ Screening: cases });

                                            ScreeningCaseModel.ScreeningCase.find(
                                              { status: "2",ngoId: req.body.ngoId }
                                            )
                                              .countDocuments()
                                              .then((nonprescription) => {
                                                graph.push({
                                                  NonPrescription:
                                                    nonprescription,
                                                });

                                                ScreenerModel.Screener.find({
                                                  issubscreener: 1,
                                                  ngoId: req.body.ngoId,
                                                })
                                                  .countDocuments()
                                                  .then((mapsevika) => {
                                                    graph.push({
                                                      mapsevika: mapsevika,
                                                    });

                                                    ScreenerModel.Screener.find(
                                                      {
                                                        issubscreener: 0,
                                                        ngoId: req.body.ngoId,
                                                      }
                                                    )
                                                      .countDocuments()
                                                      .then((mapscreener) => {
                                                        graph.push({
                                                          mapscreener:
                                                            mapscreener,
                                                        });

                                                        DoctorModel.Doctor.find(
                                                          {
                                                            ngoId: req.body.ngoId,}
                                                        )
                                                          .countDocuments()
                                                          .then((mapdoctor) => {
                                                            graph.push({
                                                              mapdoctor:
                                                                mapdoctor,
                                                            });
															CitizenModel.Citizen.find(
																{ isUnrefer: 2, ngoId: req.body.ngoId,}
															  )
																.countDocuments().limit(1000)
																.then((citizenprescibeCount) => {
																  graph.push({
																	citizenprescibeCount:
																	  citizenprescibeCount,
																  });
																  CitizenModel.Citizen.find(
																	{ isUnrefer: 1, ngoId: req.body.ngoId }
																  )
																	.countDocuments().limit(1000)
																	.then((citizenrefer) => {
																	  graph.push({
																		citizenrefer:
																		  citizenrefer,
																	  });
                                         ScreenerModel.Screener.aggregate(
                                           [
                                               {
                                                  $lookup: {
                                                    localField:
                                                       "screenerLoginId",
                                                             from: "users",
                                                               foreignField:
                                                                 "userId",
                                                                    as: "users",
                                                                  },
                                                                },
                                                                {
                                                                  $unwind:
                                                                    "$users",
                                                                },
                                                                {
                                                                  $match: {
                                                                    "users.roleId": 21,
                                                                  },
                                                                },
                                                                {
                                                                  $match: {
                                                                    "isdeleted": false,
                                                                    ngoId: req.body.ngoId,
                                                                  },
                                                                },
                                                                {
                                                                  $count:
                                                                    "subscreeners",
                                                                },
                                                              ]
                                                            )
                                                          
                                                            .then(
                                                              (
                                                                subscreeners
                                                              ) => {
                                                                //console.dir(subscreeners);

                                                                if (
                                                                  subscreeners[0]
                                                                )
                                                                  graph.push({
                                                                    Sevikas:
                                                                      subscreeners[0]
                                                                        .subscreeners,
                                                                  });
                                                                else
                                                                  graph.push({
                                                                    Sevikas: 0,
                                                                  });
                                                                if (graph) {
                                                                  return apiResponse.successResponseWithData(
                                                                    res,
                                                                    "Found",
                                                                    graph
                                                                  );
                                                                } else
                                                                  return apiResponse.ErrorResponse(
                                                                    res,
                                                                    "Not Found"
                                                                  );
                                                              }
                                                            );
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
          });
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, "EXp:" + err);
    }
  },
];


exports.updateNgoIdAllcase = [
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
        var graph = [];
                
// cases                                   
UserDetailsModel.update({},{$set : {"ngoId":"rakesh"}}, {upsert:false, multi:true})
                                          .then((userDetails) => {
                                            graph.push({ userDetails: userDetails });

                                            UserModel.update({},{$set : {"ngoId":"rakesh"}}, {upsert:false, multi:true})
                                          .then((user) => {
                                            graph.push({ user: user });
                                                   
                                                                if (graph) {
                                                                  return apiResponse.successResponseWithData(
                                                                    res,
                                                                    "Found",
                                                                    graph
                                                                  );
                                                                } else
                                                                  return apiResponse.ErrorResponse(
                                                                    res,
                                                                    "Not Found"
                                                                  );
                                                              }
                                                            );
                                                    
                         });
                  }                      
       
    } catch (err) {
      return apiResponse.ErrorResponse(res, "EXp:" + err);
    }
  },
];



