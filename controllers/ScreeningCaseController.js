const ScreeningCaseModel = require("../models/ScreeningCase");
const CitizenModel = require("../models/CitizenModel");
const DoctorModel = require("../models/DoctorModel");
const ScreenerModel = require("../models/ScreenerModel");
const SymptomsModel = require("../models/SymptomsModel");
const { body, query, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");
const utility = require("../helpers/utility");
const jwt = require("jsonwebtoken");
const { constants } = require("../helpers/constants");

exports.addScreening = [
  body("citizenId")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Invalid citizenId!"),
  //body("recordId").isLength({ min: 1 }).trim().withMessage("Invalid Record Id!"),
  //body("doctorId").isLength({ min: 1 }).trim().withMessage("Enter Doctor Id !"),
  body("status")
    .isLength({ min: 1, max: 1 })
    .trim()
    .withMessage("Enter Status code !"),
  //body("screenerId").isLength({ min: 1 }).trim().withMessage("Enter ScreenerId!"),

  // 	body("height").isLength({ min: 1,max:3 }).trim().withMessage("Height can't be empty!")
  // 					.isNumeric().withMessage("Should be in numbers"),
  // body("weight").isLength({ min: 1,max:3 }).trim().withMessage("Weight can't be empty!")
  // 					.isNumeric().withMessage("Should be in numeric"),
  // body("bmi").isLength({ min: 1,max:3 }).trim().withMessage("BMI can't be empty!")
  // 					.isNumeric().withMessage("Should be greater than 0"),
  // body("bpsys").isLength({ min: 1,max:3 }).trim().withMessage("bpsys can't be empty!")
  // 					.isNumeric().withMessage("Should be Number"),
  // body("bpdia").isLength({ min: 1,max:3 }).trim().withMessage("BpDia can't be empty!")
  // 					.isNumeric().withMessage("Should be Number"),
  // body("spo2").isLength({ min: 1,max:3 }).trim().withMessage("spo2 can't be empty!")
  // 					.isNumeric().withMessage("Should be Number"),
  // body("pulse").isLength({ min: 1,max:3 }).trim().withMessage("pulse can't be empty!")
  // 					.isNumeric().withMessage("Should be Number"),
  // body("respiratory_rate").isLength({ min: 1,max:3 }).trim().withMessage("respiratory_rate can't be empty!")
  // 					.isNumeric().withMessage("Should be Number"),
  // body("temperature").isLength({ min: 1,max:3 }).trim().withMessage("headache state can't be empty!")
  // 					.isNumeric().withMessage("Should be 0 or 1"),
  //body("referDocId").isLength({ min: 1 }).trim().withMessage("Invalid referDocId!"),

  // body("referDocId").isLength({ min: 1 }).trim().withMessage("Enter refDoctor Id !"),

  sanitizeBody("citizenId").escape(),
  sanitizeBody("notes").escape(),
  sanitizeBody("doctorId").escape(),
  sanitizeBody("status").escape(),
  sanitizeBody("screenerId").escape(),
  sanitizeBody("height").escape(),
  sanitizeBody("weight").escape(),
  sanitizeBody("bmi").escape(),
  sanitizeBody("bpsys").escape(),
  sanitizeBody("bpdia").escape(),
  sanitizeBody("spo2").escape(),
  sanitizeBody("arm").escape(),
  sanitizeBody("pulse").escape(),
  sanitizeBody("respiratory_rate").escape(),
  sanitizeBody("temperature").escape(),
  sanitizeBody("referDocId").escape(),

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
        var ID = utility.uID();

        if (
          req.body.caseId != undefined &&
          req.body.caseId != "" &&
          req.body.caseId != null
        ) {
          ID = req.body.caseId;
        }

        var userId = req.body.userId;

        var recScreener = {
          citizenId: req.body.citizenId,
          notes: req.body.notes,
          doctorId: req.body.doctorId,
          status: req.body.status,
          screenerId: req.body.screenerId,
          height: req.body.height,
          weight: req.body.weight,
          bmi: req.body.bmi,
          bpsys: req.body.bpsys,
          bpdia: req.body.bpdia,
          arm: req.body.arm,
          spo2: req.body.spo2,
          caseId: ID,
          pulse: req.body.pulse,
          respiratory_rate: req.body.respiratory_rate,
          temperature: req.body.temperature,
          referDocId: req.body.referDocId,
        };
        var actionScreeningCase = new ScreeningCaseModel.ScreeningCase(
          recScreener
        );
        actionScreeningCase.save(function (_error) {
          if (_error) {
            apiResponse.ErrorResponse(res, "Sorry:" + _error);
          } else {
            CitizenModel.Citizen.findOneAndUpdate(
              { citizenId: req.body.citizenId },
              { $set: { pstatus: 1 } },
              function (_error, newrecs) {
                if (_error) {
                  return apiResponse.ErrorResponse(res, "Sorry:" + _error);
                }
              }
            );

            return apiResponse.successResponseWithData(
              res,
              "Successfully Submitted",
              recScreener
            );
          }
        });
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.updateCaseDetails = [
  // Validate fields.
  body("status")
    .isLength({ min: 1, max: 1 })
    .trim()
    .withMessage("Enter valid Status code !"),
  body("caseId")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Enter Non Empty Case Id  !"),

  // Sanitize fields.
  sanitizeBody("notes").escape(),
  sanitizeBody("doctorId").escape(),
  sanitizeBody("status").escape(),
  sanitizeBody("referDocId").escape(),
  sanitizeBody("caseId").escape(),
  sanitizeBody("height").escape(),
  sanitizeBody("weight").escape(),
  sanitizeBody("bmi").escape(),
  sanitizeBody("bpsys").escape(),
  sanitizeBody("arm").escape(),
  sanitizeBody("bpdia").escape(),
  sanitizeBody("spo2").escape(),
  sanitizeBody("pulse").escape(),
  sanitizeBody("respiratory_rate").escape(),
  sanitizeBody("temperature").escape(),

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
        var temppstatus = 1;
        var caseId = req.body.caseId;
        var status = req.body.status;
        var notes,
          doctorId,
          referDocId,
          temperature,
          respiratory_rate,
          pulse,
          spo2,
          bpdia,
          bpsys,
          bmi,
          arm,
          weight,
          height;
        var setfield = {};
        setfield["status"] = status;
        setfield["caseId"] = caseId;
        if (
          req.body.temperature != null &&
          req.body.temperature != undefined &&
          req.body.temperature != ""
        ) {
          temperature = req.body.temperature;
          setfield["temperature"] = temperature;
        }
        if (
          req.body.respiratory_rate != null &&
          req.body.respiratory_rate != undefined &&
          req.body.respiratory_rate != ""
        ) {
          respiratory_rate = req.body.respiratory_rate;
          setfield["respiratory_rate"] = respiratory_rate;
        }
        if (
          req.body.pulse != null &&
          req.body.pulse != undefined &&
          req.body.pulse != ""
        ) {
          pulse = req.body.pulse;
          setfield["pulse"] = pulse;
        }
        if (
          req.body.spo2 != null &&
          req.body.spo2 != undefined &&
          req.body.spo2 != ""
        ) {
          spo2 = req.body.spo2;
          setfield["spo2"] = spo2;
        }
        if (
          req.body.bpdia != null &&
          req.body.bpdia != undefined &&
          req.body.bpdia != ""
        ) {
          bpdia = req.body.bpdia;
          setfield["bpdia"] = bpdia;
        }
        if (
          req.body.bpsys != null &&
          req.body.bpsys != undefined &&
          req.body.bpsys != ""
        ) {
          bpsys = req.body.bpsys;
          setfield["bpsys"] = bpsys;
        }
        if (
          req.body.bmi != null &&
          req.body.bmi != undefined &&
          req.body.bmi != ""
        ) {
          bmi = req.body.bmi;
          setfield["bmi"] = bmi;
        }
        if (
          req.body.arm != null &&
          req.body.arm != undefined &&
          req.body.arm != ""
        ) {
          arm = req.body.arm;
          setfield["arm"] = arm;
        }
        if (
          req.body.weight != null &&
          req.body.weight != undefined &&
          req.body.weight != ""
        ) {
          weight = req.body.weight;
          setfield["weight"] = weight;
        }
        if (
          req.body.height != null &&
          req.body.height != undefined &&
          req.body.height != ""
        ) {
          height = req.body.height;
          setfield["height"] = height;
        }
        if (
          req.body.notes != null &&
          req.body.notes != undefined &&
          req.body.notes != ""
        ) {
          notes = req.body.notes;
          setfield["notes"] = notes;
        }
        if (
          req.body.doctorId != null &&
          req.body.doctorId != undefined &&
          req.body.doctorId != ""
        ) {
          doctorId = req.body.doctorId;
          temppstatus = 2;
          setfield["doctorId"] = doctorId;
        }
        if (
          req.body.referDocId != null &&
          req.body.referDocId != undefined &&
          req.body.referDocId != ""
        ) {
          referDocId = req.body.referDocId;
          temppstatus = 2;
          setfield["referDocId"] = referDocId;
        }

        console.log(temppstatus);

        ScreeningCaseModel.ScreeningCase.findOneAndUpdate(
          { caseId: caseId },
          { $set: setfield },

          { new: true },
          function (_error, newrecs) {
            if (_error) {
              return apiResponse.ErrorResponse(res, "Sorry:" + _error);
            } else if (newrecs != null) {
              CitizenModel.Citizen.findOneAndUpdate(
                { citizenId: newrecs.citizenId },
                { $set: { pstatus: temppstatus } },
                function (_error, newrecs) {
                  if (_error) {
                    return apiResponse.ErrorResponse(res, "Sorry:" + _error);
                  }
                }
              );

              return apiResponse.successResponseWithData(
                res,
                "Success",
                newrecs
              );
            } else {
              return apiResponse.successResponseWithData(
                res,
                "Successfully Submitted"
              );
            }
          }
        );
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, "EXp:" + err);
    }
  },
];
exports.updateAddUnrefer= [
	(req, res) => { 
		
		ScreeningCaseModel.ScreeningCase.update({},{$set : {"isUnrefer": false}}, {upsert:false, multi:true})
	  
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

	// (req, res) => { 
			
	// 	try {
	// 		const errors = validationResult(req);
	// 		if (!errors.isEmpty()) {
	// 			return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
	// 		}else {
					
					
	// 			CitizenModel.Citizen.update({},{$set : {"isUnrefer": false}}, {upsert:false, multi:true})
				

	// 			return apiResponse.successResponseWithData(res,"Successfully Updated");
					
					
	// 		}
	// 	} catch (err) {
			
	// 		return apiResponse.ErrorResponse(res,"EXp:"+err);
	// 	}
	// }
];

exports.screeningList = [
  sanitizeBody("citizenId").escape(),
  sanitizeBody("notes").escape(),
  sanitizeBody("doctorId").escape(),
  sanitizeBody("status").escape(),
  sanitizeBody("screenerId").escape(),
  sanitizeBody("referDocId").escape(),
  sanitizeBody("citizenId").escape(),
  sanitizeBody("caseId").escape(),
  sanitizeBody("sdate").escape(),
  sanitizeBody("edate").escape(),
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
        var notes,
          doctorId,
          referDocId,
          screenerId,
          status,
          caseId,
          citizenId,
          date,
          severity_bp,
          severity_spo2,
          severity_temperature,
          severity_pulse,
          severity_bmi,
          severity_respiratory_rate,
          severity;
        var matchfield = {};
        var arraymatch = [];
        //console.log(req.body.recordId);

        if (
          req.body.notes != null &&
          req.body.notes != undefined &&
          req.body.notes != ""
        ) {
          notes = req.body.notes;
          matchfield["notes"] = notes;
          arraymatch.push(matchfield);
          matchfield = {};
        }
        //s

        if (
          req.body.severity_bp != null &&
          req.body.severity_bp != undefined &&
          req.body.severity_bp != ""
        ) {
          severity_bp = req.body.severity_bp;
          matchfield["severity_bp"] = parseInt(severity_bp);
          arraymatch.push(matchfield);
          matchfield = {};
        }
        if (
          req.body.severity_spo2 != null &&
          req.body.severity_spo2 != undefined &&
          req.body.severity_spo2 != ""
        ) {
          severity_spo2 = parseInt(req.body.severity_spo2);
          matchfield["severity_spo2"] = severity_spo2;
          arraymatch.push(matchfield);
          matchfield = {};
        }
        if (
          req.body.severity_temperature != null &&
          req.body.severity_temperature != undefined &&
          req.body.severity_temperature != ""
        ) {
          severity_temperature = parseInt(req.body.severity_temperature);
          matchfield["severity_temperature"] = severity_temperature;
          arraymatch.push(matchfield);
          matchfield = {};
        }
        if (
          req.body.severity_pulse != null &&
          req.body.severity_pulse != undefined &&
          req.body.severity_pulse != ""
        ) {
          severity_pulse = parseInt(req.body.severity_pulse);
          matchfield["severity_pulse"] = severity_pulse;
          arraymatch.push(matchfield);
          matchfield = {};
        }
        if (
          req.body.severity_bmi != null &&
          req.body.severity_bmi != undefined &&
          req.body.severity_bmi != ""
        ) {
          severity_bmi = parseInt(req.body.severity_bmi);
          matchfield["severity_bmi"] = severity_bmi;
          arraymatch.push(matchfield);
          matchfield = {};
        }
        if (
          req.body.severity_respiratory_rate != null &&
          req.body.severity_respiratory_rate != undefined &&
          req.body.severity_respiratory_rate != ""
        ) {
          severity_respiratory_rate = parseInt(
            req.body.severity_respiratory_rate
          );
          matchfield["severity_respiratory_rate"] = severity_respiratory_rate;
          arraymatch.push(matchfield);
          matchfield = {};
        }

        if (
          req.body.severity != null &&
          req.body.severity != undefined &&
          req.body.severity != ""
        ) {
          severity = parseInt(req.body.severity);
          matchfield["severity"] = severity;
          arraymatch.push(matchfield);
          matchfield = {};
        }

        if (
          req.body.doctorId != null &&
          req.body.doctorId != undefined &&
          req.body.doctorId != ""
        ) {
          doctorId = req.body.doctorId;
          matchfield["doctorId"] = doctorId;
          arraymatch.push(matchfield);
          matchfield = {};
        }
        if (
          req.body.referDocId != null &&
          req.body.referDocId != undefined &&
          req.body.referDocId != ""
        ) {
          referDocId = req.body.referDocId;
          matchfield["referDocId"] = referDocId;
          arraymatch.push(matchfield);
          matchfield = {};
        }
        if (
          req.body.screenerId != null &&
          req.body.screenerId != undefined &&
          req.body.screenerId != ""
        ) {
          screenerId = req.body.screenerId;
          matchfield["screenerId"] = screenerId;
          arraymatch.push(matchfield);
          matchfield = {};
        }
        if (
          req.body.citizenId != null &&
          req.body.citizenId != undefined &&
          req.body.citizenId != ""
        ) {
          citizenId = req.body.citizenId;
          matchfield["citizenId"] = citizenId;
          arraymatch.push(matchfield);
          matchfield = {};
        }
        if (
          req.body.status != null &&
          req.body.status != undefined &&
          req.body.status != ""
        ) {
          status = req.body.status;
          matchfield["status"] = parseInt(status);
          arraymatch.push(matchfield);
          matchfield = {};
        }
        if (
          req.body.caseId != null &&
          req.body.caseId != undefined &&
          req.body.caseId != ""
        ) {
          caseId = req.body.caseId;
          matchfield["caseId"] = caseId;
          arraymatch.push(matchfield);
          matchfield = {};
        }
        if (
          req.body.sdate != null &&
          req.body.sdate != undefined &&
          req.body.sdate != "" &&
          req.body.edate != null &&
          req.body.edate != undefined &&
          req.body.edate != ""
        ) {
          date = new Date(req.body.edate);
          date.setDate(date.getDate() + 1);
          matchfield["createdAt"] = { $gte: new Date(req.body.sdate) };
          arraymatch.push(matchfield);
          matchfield = {};
          matchfield["createdAt"] = { $lte: new Date(date) };
          arraymatch.push(matchfield);
          matchfield = {};
        }

        // matchfield={};
        // matchfield["severity"]={'$gt': 0};
        // arraymatch.push(matchfield);

        var andcond = { $match: { $and: arraymatch } };
        console.log(arraymatch);
        if (arraymatch.length === 0) {
          andcond = { $match: {} };
        }
        console.dir(andcond);
        var pageCalc = 0;

        if (
          req.body.page != null &&
          req.body.page != undefined &&
          req.body.page != ""
        ) {
          page = req.body.page;
          if (page > 1) {
            pageCalc = page * 100;
          }
        }

        ScreeningCaseModel.ScreeningCase.aggregate([
          andcond,
          { $sort: { createdAt: -1 } },
          { $skip: pageCalc },
          { $limit: 100 },
          {
            $lookup: {
              localField: "doctorId",
              from: "doctors",
              foreignField: "doctorId",
              as: "doctors",
            },
          },
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
            $lookup: {
              localField: "screenerId",
              from: "screeners",
              foreignField: "screenerId",
              as: "screeners",
            },
          },

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
              createdAt: 1,
              severity_bp: 1,
              severity_spo2: 1,
              severity_temperature: 1,
              severity_pulse: 1,
              severity_bmi: 1,
              severity_respiratory_rate: 1,
              severity: 1,
              "doctors.firstName": 1,
              "doctors.lastName": 1,
              "doctors.email": 1,
              "doctors.mobile": 1,
              "doctors.sex": 1,
              "doctors.medicalRegNo": 1,
              "doctors.yearOfReg": 1,
              "doctors.statteMedicalCouncil": 1,
              "doctors.experience": 1,
              "doctors.referenceName": 1,
              "doctors.type": 1,
              "citizens.firstName": 1,
              "citizens.lastName": 1,
              "citizens.email": 1,
              "citizens.mobile": 1,
              "citizens.sex": 1,
              "citizendetails.dateOfBirth": 1,
              "screeners.firstName": 1,
              "screeners.lastName": 1,
              "screeners.email": 1,
              "screeners.mobile": 1,
              "screeners.mobile1": 1,
              "screeners.sex": 1,
              "screeners.ngoId": 1,
            },
          },
        ]).then((users) => {
          let user = users[0];
          if (user) {
            for (i = 0; i < users.length; i++) {
              let temp = users[i];
              console.log(temp.createdAt);
              var cdate = "";
              if (
                temp.height != null &&
                temp.height != undefined &&
                temp.height != ""
              ) {
                temp.height = parseFloat(temp.height).toFixed(2);
              }
              if (
                temp.createdAt != null &&
                temp.createdAt != undefined &&
                temp.createdAt != ""
              ) {
                cdate = temp.createdAt.toISOString().split("T")[0];
                console.log(cdate);
                var adate = new Date(cdate);
                temp.createdAt =
                  adate.getDate() +
                  "-" +
                  (adate.getMonth() + 1) +
                  "-" +
                  (adate.getYear() + 1900);
                users[i] = temp;
                console.log(temp.createdAt);
              } else {
                temp.createdAt = cdate;
                users[i] = temp;
              }
            }

            return apiResponse.successResponseWithData(res, "Found", users);
          } else return apiResponse.ErrorResponse(res, "Not Found");
        });
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, "EXp:" + err);
    }
  },
];

exports.screeningListCount = [
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
        var notes,
          doctorId,
          referDocId,
          screenerId,
          status,
          caseId,
          citizenId,
          date,
          severity_bp,
          severity_spo2,
          severity_temperature,
          severity_pulse,
          severity_bmi,
          severity_respiratory_rate,
          severity;
        var matchfield = {};
        var arraymatch = [];
        //console.log(req.body.recordId);

        if (
          req.body.notes != null &&
          req.body.notes != undefined &&
          req.body.notes != ""
        ) {
          notes = req.body.notes;
          matchfield["notes"] = notes;
          arraymatch.push(matchfield);
          matchfield = {};
        }
        //s

        if (
          req.body.severity_bp != null &&
          req.body.severity_bp != undefined &&
          req.body.severity_bp != ""
        ) {
          severity_bp = parseInt(req.body.severity_bp);
          matchfield["severity_bp"] = severity_bp;
          arraymatch.push(matchfield);
          matchfield = {};
        }
        if (
          req.body.severity_spo2 != null &&
          req.body.severity_spo2 != undefined &&
          req.body.severity_spo2 != ""
        ) {
          severity_spo2 = parseInt(req.body.severity_spo2);
          matchfield["severity_spo2"] = severity_spo2;
          arraymatch.push(matchfield);
          matchfield = {};
        }
        if (
          req.body.severity_temperature != null &&
          req.body.severity_temperature != undefined &&
          req.body.severity_temperature != ""
        ) {
          severity_temperature = parseInt(req.body.severity_temperature);
          matchfield["severity_temperature"] = severity_temperature;
          arraymatch.push(matchfield);
          matchfield = {};
        }
        if (
          req.body.severity_pulse != null &&
          req.body.severity_pulse != undefined &&
          req.body.severity_pulse != ""
        ) {
          severity_pulse = parseInt(req.body.severity_pulse);
          matchfield["severity_pulse"] = severity_pulse;
          arraymatch.push(matchfield);
          matchfield = {};
        }
        if (
          req.body.severity_bmi != null &&
          req.body.severity_bmi != undefined &&
          req.body.severity_bmi != ""
        ) {
          severity_bmi = parseInt(req.body.severity_bmi);
          matchfield["severity_bmi"] = severity_bmi;
          arraymatch.push(matchfield);
          matchfield = {};
        }
        if (
          req.body.severity_respiratory_rate != null &&
          req.body.severity_respiratory_rate != undefined &&
          req.body.severity_respiratory_rate != ""
        ) {
          severity_respiratory_rate = parseInt(
            req.body.severity_respiratory_rate
          );
          matchfield["severity_respiratory_rate"] = severity_respiratory_rate;
          arraymatch.push(matchfield);
          matchfield = {};
        }

        if (
          req.body.severity != null &&
          req.body.severity != undefined &&
          req.body.severity != ""
        ) {
          severity = parseInt(req.body.severity);
          matchfield["severity"] = severity;
          arraymatch.push(matchfield);
          matchfield = {};
        }

        if (
          req.body.doctorId != null &&
          req.body.doctorId != undefined &&
          req.body.doctorId != ""
        ) {
          doctorId = req.body.doctorId;
          matchfield["doctorId"] = doctorId;
          arraymatch.push(matchfield);
          matchfield = {};
        }
        if (
          req.body.referDocId != null &&
          req.body.referDocId != undefined &&
          req.body.referDocId != ""
        ) {
          referDocId = req.body.referDocId;
          matchfield["referDocId"] = referDocId;
          arraymatch.push(matchfield);
          matchfield = {};
        }
        if (
          req.body.screenerId != null &&
          req.body.screenerId != undefined &&
          req.body.screenerId != ""
        ) {
          screenerId = req.body.screenerId;
          matchfield["screenerId"] = screenerId;
          arraymatch.push(matchfield);
          matchfield = {};
        }
        if (
          req.body.citizenId != null &&
          req.body.citizenId != undefined &&
          req.body.citizenId != ""
        ) {
          citizenId = req.body.citizenId;
          matchfield["citizenId"] = citizenId;
          arraymatch.push(matchfield);
          matchfield = {};
        }
        if (
          req.body.status != null &&
          req.body.status != undefined &&
          req.body.status != ""
        ) {
          status = req.body.status;
          matchfield["status"] = parseInt(status);
          arraymatch.push(matchfield);
          matchfield = {};
        }
        if (
          req.body.caseId != null &&
          req.body.caseId != undefined &&
          req.body.caseId != ""
        ) {
          caseId = req.body.caseId;
          matchfield["caseId"] = caseId;
          arraymatch.push(matchfield);
          matchfield = {};
        }
        if (
          req.body.sdate != null &&
          req.body.sdate != undefined &&
          req.body.sdate != "" &&
          req.body.edate != null &&
          req.body.edate != undefined &&
          req.body.edate != ""
        ) {
          date = new Date(req.body.edate);
          date.setDate(date.getDate() + 1);
          matchfield["createdAt"] = { $gte: new Date(req.body.sdate) };
          arraymatch.push(matchfield);
          matchfield = {};
          matchfield["createdAt"] = { $lte: new Date(date) };
          arraymatch.push(matchfield);
          matchfield = {};
        }

        // matchfield={};
        // matchfield["severity"]={'$gt': 0};
        // arraymatch.push(matchfield);

        var andcond = { $match: { $and: arraymatch } };
        console.log(arraymatch);
        if (arraymatch.length === 0) {
          andcond = { $match: {} };
        }
        console.dir(andcond);

        ScreeningCaseModel.ScreeningCase.aggregate([
          andcond,
          { $count: "count" },
        ]).then((users) => {
          let user = users[0];
          if (user) {
            return apiResponse.successResponseWithData(res, "Found", users);
          } else
            return apiResponse.successResponseWithData(res, "Found", [
              {
                count: 0,
              },
            ]);
        });
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, "EXp:" + err);
    }
  },
];

//Detail Screening

exports.addDetailScreening = [
  body("caseId").isLength({ min: 1 }).trim().withMessage("Enter caseId!"),

  // sanitizeBody("fever").escape(),
  // sanitizeBody("backneckpain").escape(),
  // sanitizeBody("abdomenpain").escape(),
  // sanitizeBody("diarrhea").escape(),
  // sanitizeBody("hypertension").escape(),
  sanitizeBody("caseId").escape(),

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
        var recScreening = {
          caseId: req.body.caseId,
          fever: req.body.fever,
          abdomenpain: req.body.abdomenpain,
          diarrhea: req.body.diarrhea,
          backneckpain: req.body.backneckpain,
          hypertension: req.body.hypertension,
        };
        var actionScreeningCase = new ScreeningCaseModel.ScreeningCaseDetails(
          recScreening
        );
        actionScreeningCase.save(function (_error) {
          if (_error) {
            apiResponse.ErrorResponse(res, "Sorry:" + _error);
          } else {
            return apiResponse.successResponseWithData(
              res,
              "Successfully Submitted"
            );
          }
        });
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.screeningDetailsList = [
  sanitizeBody("caseId").escape(),
  sanitizeBody("sdate").escape(),
  sanitizeBody("edate").escape(),

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
        var caseId, date;
        var matchfield = {};
        var arraymatch = [];
        //console.log(req.body.recordId);

        if (
          req.body.caseId != null &&
          req.body.caseId != undefined &&
          req.body.caseId != ""
        ) {
          caseId = req.body.caseId;
          matchfield["caseId"] = caseId;
          arraymatch.push(matchfield);
          matchfield = {};
        }
        if (
          req.body.sdate != null &&
          req.body.sdate != undefined &&
          req.body.sdate != "" &&
          req.body.edate != null &&
          req.body.edate != undefined &&
          req.body.edate != ""
        ) {
          date = new Date(req.body.edate);
          date.setDate(date.getDate() + 1);
          matchfield["createdAt"] = { $gte: new Date(req.body.sdate) };
          arraymatch.push(matchfield);
          matchfield = {};
          matchfield["createdAt"] = { $lte: new Date(date) };
          arraymatch.push(matchfield);
          matchfield = {};
        }

        var andcond = { $match: { $and: arraymatch } };
        console.log(arraymatch);
        if (arraymatch.length === 0) {
          andcond = { $match: {} };
        }
        console.dir(andcond);

        ScreeningCaseModel.ScreeningCaseDetails.aggregate([
          andcond,
          {
            $project: {
              fever: 1,
              abdomenpain: 1,
              diarrhea: 1,
              hypertension: 1,
              caseId: 1,
              backneckpain: 1,
            },
          },
        ]).then((users) => {
          let user = users[0];
          if (user) {
            return apiResponse.successResponseWithData(res, "Found", users);
          } else return apiResponse.ErrorResponse(res, "Not Found");
        });
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, "EXp:" + err);
    }
  },
];

///////

exports.screeningEncounters = [
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
        ScreeningCaseModel.ScreeningCase.aggregate([
          { $match: { citizenId: req.body.citizenId } },
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
            $lookup: {
              localField: "caseId",
              from: "bloodglucosetests",
              foreignField: "caseId",
              as: "bloodglucosetests",
            },
          },
          {
            $lookup: {
              localField: "caseId",
              from: "labtests",
              foreignField: "caseId",
              as: "labtests",
            },
          },
          {
            $lookup: {
              localField: "caseId",
              from: "drugtests",
              foreignField: "caseId",
              as: "drugtests",
            },
          },
          {
            $lookup: {
              localField: "caseId",
              from: "lipidpaneltests",
              foreignField: "caseId",
              as: "lipidpaneltests",
            },
          },
          {
            $lookup: {
              localField: "caseId",
              from: "sicklecells",
              foreignField: "caseId",
              as: "sicklecells",
            },
          },
          {
            $lookup: {
              localField: "caseId",
              from: "thalassemias",
              foreignField: "caseId",
              as: "thalassemias",
            },
          },
          {
            $lookup: {
              localField: "caseId",
              from: "lungfunctions",
              foreignField: "caseId",
              as: "lungfunctions",
            },
          },
          {
            $lookup: {
              localField: "caseId",
              from: "visualexams",
              foreignField: "caseId",
              as: "visualexams",
            },
          },
          {
            $lookup: {
              localField: "caseId",
              from: "eyetests",
              foreignField: "caseId",
              as: "eyetests",
            },
          },
          {
            $lookup: {
              localField: "caseId",
              from: "hemoglobins",
              foreignField: "caseId",
              as: "hemoglobins",
            },
          },
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
              createdAt: 1,
              "hemoglobins.createdAt": 1,
              "hemoglobins.hemoglobin": 1,
              "hemoglobins.notes": 1,
              "lungfunctions.createdAt": 1,
              "lungfunctions.fvc_predicted": 1,
              "lungfunctions.fvc_actual": 1,
              "lungfunctions.fev1_predicted": 1,
              "lungfunctions.fev1_actual": 1,
              "lungfunctions.fvc1_predicted": 1,
              "lungfunctions.fvc1_actual": 1,
              "lungfunctions.pef_predicted": 1,
              "lungfunctions.pef_actual": 1,
              "lungfunctions.notes": 1,
              "lungfunctions.fvc_predicted_percent": 1,
              "lungfunctions.fev1_predicted_percent": 1,
              "lungfunctions.fvc1_predicted_percent": 1,
              "lungfunctions.pef_predicted_percent": 1,
              "eyetests.createdAt": 1,
              "eyetests.notes": 1,
              "eyetests.reyetest": 1,
              "eyetests.leyetest": 1,
              "bloodglucosetests.createdAt": 1,
              "bloodglucosetests.bloodglucose": 1,
              "bloodglucosetests.type": 1,
              "lipidpaneltests.createdAt": 1,
              "lipidpaneltests.cholesterol": 1,
              "lipidpaneltests.hdlcholesterol": 1,
              "lipidpaneltests.triglycerides": 1,
              "lipidpaneltests.glucose": 1,
              "lipidpaneltests.ldl": 1,
              "lipidpaneltests.tcl_hdl": 1,
              "lipidpaneltests.ldl_hdl": 1,
              "lipidpaneltests.non_hdl": 1,
              "lipidpaneltests.type": 1,
              "sicklecells.createdAt": 1,
              "sicklecells.SickleCell": 1,
              "sicklecells.notes": 1,
              "thalassemias.createdAt": 1,
              "thalassemias.Thalassemia": 1,
              "thalassemias.notes": 1,
              "visualexams.createdAt": 1,
              "visualexams.image": 1,
              "visualexams.notes": 1,
              "drugtests.createdAt": 1,
              "drugtests.Amphetamine": 1,
              "drugtests.Barbiturates": 1,
              "drugtests.Buprenorphine": 1,
              "drugtests.Benzodiazepines": 1,
              "drugtests.Cocaine": 1,
              "drugtests.Marijuana": 1,
              "drugtests.Methamphetamine": 1,
              "drugtests.Methylenedioxymethamphetamine": 1,
              "drugtests.Methadone": 1,
              "drugtests.Opiate": 1,
              "drugtests.Oxycodone": 1,
              "drugtests.Phencyclidine": 1,
              "drugtests.Propoxyphene": 1,
              "drugtests.TricyclicAntidepressant": 1,
              "labtests.createdAt": 1,
              "labtests.ChagasAb": 1,
              "labtests.Chikungunya": 1,
              "labtests.Chlamydia": 1,
              "labtests.Cholera": 1,
              "labtests.Dengue": 1,
              "labtests.FecalOccultBloodTest": 1,
              "labtests.HPylori": 1,
              "labtests.HantaanVirus": 1,
              "labtests.HepatitisA": 1,
              "labtests.HepatitisB": 1,
              "labtests.HepatitisC": 1,
              "labtests.HIV": 1,
              "labtests.HumanAfricanTrypanosomiasis": 1,
              "labtests.HumanChorionicGonadotropin": 1,
              "labtests.Influenza": 1,
              "labtests.LegionellaAg": 1,
              "labtests.Leptospira": 1,
              "labtests.Malaria": 1,
              "labtests.Myoglobin": 1,
              "labtests.Norovirus": 1,
              "labtests.OnchoLFlgG4Biplex": 1,
              "labtests.RespiratorySynctialVirus": 1,
              "labtests.RotaAdeno": 1,
              "labtests.Rotavirus": 1,
              "labtests.SickleCell": 1,
              "labtests.StrepA": 1,
              "labtests.Syphilis": 1,
              "labtests.Tetanus": 1,
              "labtests.Troponin": 1,
              "labtests.Tsutsugamushi": 1,
              "labtests.Tuberculosis": 1,
              "labtests.TyphoidFever": 1,
              "labtests.YellowFever": 1,
              "labtests.Others": 1,
              "citizens.firstName": 1,
              "citizens.lastName": 1,
              "citizens.email": 1,
              "citizens.mobile": 1,
              "citizens.sex": 1,
              "citizendetails.dateOfBirth": 1,
            },
          },
        ]).then((users) => {
          let user = users[0];
          if (user) {
            for (i = 0; i < users.length; i++) {
              let temp = users[i];
              console.log(temp.createdAt);
              var cdate = "";
              if (
                temp.height != null &&
                temp.height != undefined &&
                temp.height != ""
              ) {
                temp.height = parseFloat(temp.height).toFixed(2);
              }
              if (
                temp.createdAt != null &&
                temp.createdAt != undefined &&
                temp.createdAt != ""
              ) {
                cdate = temp.createdAt.toISOString().split("T")[0];
                console.log(cdate);
                var adate = new Date(cdate);
                temp.createdAt =
                  adate.getDate() +
                  "-" +
                  (adate.getMonth() + 1) +
                  "-" +
                  (adate.getYear() + 1900);
                users[i] = temp;
                console.log(temp.createdAt);
              } else {
                temp.createdAt = cdate;
                users[i] = temp;
              }

              for (var x = 0; x < users[i].eyetests.length; x++)
                users[i].eyetests[x].createdAt = utility.toDDmmyy(
                  users[i].eyetests[x].createdAt
                );

              for (var x = 0; x < users[i].thalassemias.length; x++)
                users[i].thalassemias[x].createdAt = utility.toDDmmyy(
                  users[i].thalassemias[x].createdAt
                );

              for (var x = 0; x < users[i].labtests.length; x++)
                users[i].labtests[x].createdAt = utility.toDDmmyy(
                  users[i].labtests[x].createdAt
                );

              for (var x = 0; x < users[i].drugtests.length; x++)
                users[i].drugtests[x].createdAt = utility.toDDmmyy(
                  users[i].drugtests[x].createdAt
                );

              for (var x = 0; x < users[i].sicklecells.length; x++)
                users[i].sicklecells[x].createdAt = utility.toDDmmyy(
                  users[i].sicklecells[x].createdAt
                );

              for (var x = 0; x < users[i].hemoglobins.length; x++)
                users[i].hemoglobins[x].createdAt = utility.toDDmmyy(
                  users[i].hemoglobins[x].createdAt
                );

              for (var x = 0; x < users[i].lipidpaneltests.length; x++)
                users[i].lipidpaneltests[x].createdAt = utility.toDDmmyy(
                  users[i].lipidpaneltests[x].createdAt
                );

              for (var x = 0; x < users[i].bloodglucosetests.length; x++)
                users[i].bloodglucosetests[x].createdAt = utility.toDDmmyy(
                  users[i].bloodglucosetests[x].createdAt
                );

              for (var x = 0; x < users[i].visualexams.length; x++)
                users[i].visualexams[x].createdAt = utility.toDDmmyy(
                  users[i].visualexams[x].createdAt
                );

              for (var x = 0; x < users[i].lungfunctions.length; x++)
                users[i].lungfunctions[x].createdAt = utility.toDDmmyy(
                  users[i].lungfunctions[x].createdAt
                );
            }

            return apiResponse.successResponseWithData(res, "Found", users);
          } else return apiResponse.ErrorResponse(res, "Not Found");
        });
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, "EXp:" + err);
    }
  },
];

exports.addSymptoms = [
  body("citizenId")
    .isLength({ min: 3 })
    .trim()
    .withMessage("Invalid CitizenId!")
    .custom((value) => {
      return CitizenModel.Citizen.findOne({ citizenId: value }).then((user) => {
        if (user) {
        } else {
          return Promise.reject("Citizen Not Found !");
        }
      });
    }),
  body("doctorId").custom((value) => {
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

  body("screenerId").custom((value) => {
    if (value != null && value != "" && value != undefined) {
      if (value.length < 4) {
        return Promise.reject("Invalid Screener Id!");
      }
    }
    return ScreenerModel.Screener.findOne({ screenerId: value }).then(
      (user) => {
        if (value != null && value != "" && value != undefined) {
          if (!user) {
            return Promise.reject("Screener Id not Found");
          }
        }
      }
    );
  }),
  //body("notes").isLength({ min: 3 }).trim().withMessage("Enter Notes!"),
  body("data").isLength({ min: 1 }).trim().withMessage("Enter Data Value!"),
  body("caseId").isLength({ min: 1 }).trim().withMessage("Enter caseId!"),

  sanitizeBody("screenerId").escape(),
  sanitizeBody("citizenId").escape(),

  sanitizeBody("caseId").escape(),

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
        var recSymptoms = {
          screenerId: req.body.screenerId,
          citizenId: req.body.citizenId,
          data: req.body.data,
          caseId: req.body.caseId,
        };
        console.log(recSymptoms);
        var actionSymptoms = new SymptomsModel.Symptoms(recSymptoms);
        actionSymptoms.save(function (_error) {
          if (_error) {
            apiResponse.ErrorResponse(res, "Sorry:" + _error);
          } else {
            return apiResponse.successResponseWithData(
              res,
              "Successfully Submitted",
              recSymptoms
            );
          }
        });
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.SymptomsList = [
  body("caseId").isLength({ min: 3 }).trim().withMessage("Invalid caseId!"),
  body("token").isLength({ min: 3 }).trim().withMessage("Invalid Token!"),
  sanitizeBody("caseId").escape(),
  sanitizeBody("token").escape(),

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
        var condition = {};
        if (
          req.body.caseId === "" ||
          req.body.caseId === undefined ||
          req.body.caseId === null
        ) {
          condition = {};
        } else {
          condition = { caseId: req.body.caseId };
        }
        SymptomsModel.Symptoms.aggregate([
          { $match: condition },
          { $limit: 100000 },
          {
            $project: {
              screenerId: 1,
              caseId: 1,
              citizenId: 1,
              data: 1,
              createdAt: 1,
            },
          },
        ]).then((users) => {
          let user = users[0];
          if (user) {
            return apiResponse.successResponseWithData(res, "Found", users);
          } else return apiResponse.ErrorResponse(res, "Not Found");
        });
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, "EXp:" + err);
    }
  },
];

exports.screeningListSeverity = [
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
        var notes,
          doctorId,
          referDocId,
          screenerId,
          status,
          caseId,
          citizenId,
          date,
          severity_bp,
          severity_spo2,
          severity_temperature,
          severity_pulse,
          severity_bmi,
          severity_respiratory_rate,
          severity;
        var matchfield = {};
        var arraymatch = [];
        //console.log(req.body.recordId);

        if (
          req.body.notes != null &&
          req.body.notes != undefined &&
          req.body.notes != ""
        ) {
          notes = req.body.notes;
          matchfield["notes"] = notes;
          arraymatch.push(matchfield);
          matchfield = {};
        }
        //s

        if (
          req.body.severity_bp != null &&
          req.body.severity_bp != undefined &&
          req.body.severity_bp != ""
        ) {
          severity_bp = parseInt(req.body.severity_bp);
          matchfield["severity_bp"] = severity_bp;
          arraymatch.push(matchfield);
          matchfield = {};
        }
        if (
          req.body.severity_spo2 != null &&
          req.body.severity_spo2 != undefined &&
          req.body.severity_spo2 != ""
        ) {
          severity_spo2 = parseInt(req.body.severity_spo2);
          matchfield["severity_spo2"] = severity_spo2;
          arraymatch.push(matchfield);
          matchfield = {};
        }
        if (
          req.body.severity_temperature != null &&
          req.body.severity_temperature != undefined &&
          req.body.severity_temperature != ""
        ) {
          severity_temperature = parseInt(req.body.severity_temperature);
          matchfield["severity_temperature"] = severity_temperature;
          arraymatch.push(matchfield);
          matchfield = {};
        }
        if (
          req.body.severity_pulse != null &&
          req.body.severity_pulse != undefined &&
          req.body.severity_pulse != ""
        ) {
          severity_pulse = parseInt(req.body.severity_pulse);
          matchfield["severity_pulse"] = severity_pulse;
          arraymatch.push(matchfield);
          matchfield = {};
        }
        if (
          req.body.severity_bmi != null &&
          req.body.severity_bmi != undefined &&
          req.body.severity_bmi != ""
        ) {
          severity_bmi = parseInt(req.body.severity_bmi);
          matchfield["severity_bmi"] = severity_bmi;
          arraymatch.push(matchfield);
          matchfield = {};
        }
        if (
          req.body.severity_respiratory_rate != null &&
          req.body.severity_respiratory_rate != undefined &&
          req.body.severity_respiratory_rate != ""
        ) {
          severity_respiratory_rate = parseInt(
            req.body.severity_respiratory_rate
          );
          matchfield["severity_respiratory_rate"] = severity_respiratory_rate;
          arraymatch.push(matchfield);
          matchfield = {};
        }

        if (
          req.body.severity != null &&
          req.body.severity != undefined &&
          req.body.severity != ""
        ) {
          severity = parseInt(req.body.severity);
          matchfield["severity"] = severity;
          arraymatch.push(matchfield);
          matchfield = {};
        }

        if (
          req.body.doctorId != null &&
          req.body.doctorId != undefined &&
          req.body.doctorId != ""
        ) {
          doctorId = req.body.doctorId;
          matchfield["doctorId"] = doctorId;
          arraymatch.push(matchfield);
          matchfield = {};
        }
        if (
          req.body.referDocId != null &&
          req.body.referDocId != undefined &&
          req.body.referDocId != ""
        ) {
          referDocId = req.body.referDocId;
          matchfield["referDocId"] = referDocId;
          arraymatch.push(matchfield);
          matchfield = {};
        }
        if (
          req.body.screenerId != null &&
          req.body.screenerId != undefined &&
          req.body.screenerId != ""
        ) {
          screenerId = req.body.screenerId;
          matchfield["screenerId"] = screenerId;
          arraymatch.push(matchfield);
          matchfield = {};
        }
        if (
          req.body.citizenId != null &&
          req.body.citizenId != undefined &&
          req.body.citizenId != ""
        ) {
          citizenId = req.body.citizenId;
          matchfield["citizenId"] = citizenId;
          arraymatch.push(matchfield);
          matchfield = {};
        }
        if (
          req.body.status != null &&
          req.body.status != undefined &&
          req.body.status != ""
        ) {
          status = req.body.status;
          matchfield["status"] = parseInt(status);
          arraymatch.push(matchfield);
          matchfield = {};
        }
        if (
          req.body.caseId != null &&
          req.body.caseId != undefined &&
          req.body.caseId != ""
        ) {
          caseId = req.body.caseId;
          matchfield["caseId"] = caseId;
          arraymatch.push(matchfield);
          matchfield = {};
        }
        if (
          req.body.sdate != null &&
          req.body.sdate != undefined &&
          req.body.sdate != "" &&
          req.body.edate != null &&
          req.body.edate != undefined &&
          req.body.edate != ""
        ) {
          date = new Date(req.body.edate);
          date.setDate(date.getDate() + 1);
          matchfield["createdAt"] = { $gte: new Date(req.body.sdate) };
          arraymatch.push(matchfield);
          matchfield = {};
          matchfield["createdAt"] = { $lte: new Date(date) };
          arraymatch.push(matchfield);
          matchfield = {};
        }

        // matchfield={};
        // matchfield["severity"]={'$gt': 0};
        // arraymatch.push(matchfield);

        var andcond = { $match: { $and: arraymatch } };
        console.log(arraymatch);
        if (arraymatch.length === 0) {
          andcond = { $match: {} };
        }
        console.dir(andcond);

        ScreeningCaseModel.ScreeningCase.aggregate([
          andcond,
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
              createdAt: 1,
              severity_bp: 1,
              severity_bmi: 1,
              severity_spo2: 1,
              severity_pulse: 1,
              severity_temperature: 1,
              severity_respiratory_rate: 1,
              severity: 1,
            },
          },
        ]).then((users) => {
          let user = users[0];
          if (user) {
            return apiResponse.successResponseWithData(res, "Found", users);
          } else
            return apiResponse.successResponseWithData(res, "Found", [
              {
                count: 0,
              },
            ]);
        });
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, "EXp:" + err);
    }
  },
];

/////

exports.screeningCountperScreener = [
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
        ScreeningCaseModel.ScreeningCase.aggregate([
          { $unwind: "$screenerId" },
          { $sortByCount: "$screenerId" },
        ]).then((users) => {
          return apiResponse.successResponseWithData(res, "Success", users);
        });
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, "EXp:" + err);
    }
  },
];
// =================lipid
exports.lipid = [
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
        ScreeningCaseModel.ScreeningCase.aggregate([
          { $match: { severity_bp: 2, severity_bmi: 2 } },
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
              from: "eyetests",
              foreignField: "citizenId",
              as: "eyetests",
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
            $lookup: {
              localField: "citizenId",
              from: "hemoglobins",
              foreignField: "citizenId",
              as: "hemoglobins",
            },
          },
		      {
            $lookup: {
              localField: "screenerId",
              from: "screeners",
              foreignField: "screenerId",
              as: "screeners",
            },
          },
          {
            $lookup: {
              localField: "caseId",
              from: "bloodglucosetests",
              foreignField: "caseId",
              as: "bloodglucosetests",
            },
          },
          {
            $lookup: {
              localField: "caseId",
              from: "urinetests",
              foreignField: "caseId",
              as: "urinetests",
            },
          },
          {
            $lookup: {
              localField: "caseId",
              from: "lungfunctions",
              foreignField: "caseId",
              as: "lungfunctions",
            },
          },
          {
            $lookup: {
              localField: "caseId",
              from: "lipidpaneltests",
              foreignField: "caseId",
              as: "lipidpaneltests",
            },
          },
          { $unwind: "$citizendetails" },
          { $unwind: "$lungfunctions" },
          { $unwind: "$hemoglobins" },
          { $unwind: "$citizens" },
          { $unwind: "$eyetests" },
          { $unwind: "$lipidpaneltests" },
          { $unwind: "$bloodglucosetests" },
          { $unwind: "$urinetests" },
         {$unwind:"$screeners"},
          {
            $project: {
              citizenId: 1,
              'fullname': {$concat: ["$citizens.firstName", " ", "$citizens.lastName"]},
              // FirstName: "$citizens.firstName",
              // LastName: "$citizens.lastName",
              Email: "$citizens.email",
              aadhaar:'$citizens.aadhaar',
              address: '$citizendetails.address',
              Gender: "$citizens.sex",
              Address: "$citizen.address",
              ScreenerId: "$citizens.screenerId",
              leye:"$eyetests.leyetest",
              reye:"$eyetests.reyetest",
              hemoglobins:"$hemoglobins.hemoglobin",
              unit:"$bloodglucosetests.bloodglucose",
              type:"$bloodglucosetests.type",
              leukocytes:"$urinetests.leukocytes", 
              nitrite:"$urinetests.nitrite",
              urobilinogen:"$urinetests.urobilinogen", 
              protein:"$urinetests.protein",
              blood:"$urinetests.blood",
              specificGravity:"$urinetests.specificGravity",
              ketone:"$urinetests.ketone",
              bilirubin:"$urinetests.bilirubin",
              glucose:"$urinetests.glucose",
              fvc_predicted:"$lungfunctions.fvc_predicted",
              fvc_actual:"$lungfunctions.fvc_actual",
              fev1_predicted:"$lungfunctions.fev1_predicted",
              fev1_actual:"$lungfunctions.fev1_actual",
              fvc1_predicted:"$lungfunctions.fvc1_predicted",
              fvc1_actual:"$lungfunctions.fvc1_actual",
              pef_predicted:"$lungfunctions.pef_predicted",
              pef_actual:"$lungfunctions.pef_actual",
              fvc_predicted_percent:"$lungfunctions.fvc_predicted_percent",
              fev1_predicted_percent:"$lungfunctions.fev1_predicted_percent",
              fvc1_predicted_percent:"$lungfunctions.fvc1_predicted_percent",
              pef_predicted_percent:"$lungfunctions.pef_predicted_percent",
              cholesterol:"$lipidpaneltests.cholesterol",
              hdlcholesterol:"$lipidpaneltests.hdlcholesterol",
              triglycerides:"$lipidpaneltests.triglycerides",
              ldl:"$lipidpaneltests.ldl",
              tcl_hdl:"$lipidpaneltests.tcl_hdl",
              ldl_hdl:"$lipidpaneltests.ldl_hdl",
              non_hdl:"$lipidpaneltests.non_hdl",
              glucose:"$lipidpaneltests.glucose",
              type:"$lipidpaneltests.type",


              caseId:1,
              createdAt: {
                  $dateToString: {
                    format: "%d-%m-%Y",
                    date: "$createdAt",
                  },
                },
                DOB: {
                  $dateToString: {
                    format: "%d-%m-%Y",
                    date: "$citizendetails.dateOfBirth",
                  },
                },
                "issubscreenertype": {
                  "$switch": {
                    "branches": [
                      { "case": { "$eq": ["$screeners.issubscreener", 0] }, "then": "Sanyojika" },
                      { "case": { "$eq": ["$screeners.issubscreener", 1] }, "then": "Sevika" },
                     
                    ],
                    "default": "none"
                  },
                },
                'isubscreener':"$screeners.issubscreener",
              'Screenerfullname': {$concat: ["$screeners.firstName", " ", "$screeners.lastName"]},
              height:1,
              weight: 1,
              bmi:1,
              bpsys:1,
              bpdia:1,
              spo2:1,
              pulse:1,
              temperature:1,
              arm:1,
              Mobile: "$citizens.mobile",
              // createdAt: 1,
              severity_bp: 1,
              severity_bmi: 1,
              severity_spo2: 1,
              severity_pulse: 1,
              severity_temperature: 1,
              severity_respiratory_rate: 1,
              severity: 1,
              Age: { $round:{
                $divide: [
                  { $subtract: [new Date(), "$citizendetails.dateOfBirth"] },
                  365 * 24 * 60 * 60 * 1000,
                ],
              },
			},
            },
          },
          { $match: { Age: { $gte: 40 } } },
          // {$out:"lipidcritical"}
        ]).then((users) => {
          let user = users[0];
          if (user) {
            return apiResponse.successResponseWithData(res, "Found", users);
          } else
            return apiResponse.successResponseWithData(res, "Found", [
              {
                // "count": 0
              },
            ]);
        });
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, "EXp:" + err);
    }
  },

];
exports.screeningSevika=[

	// body("caseId").isLength({ min: 1 }).trim().withMessage("Invalid caseId!"),
	// sanitizeBody("caseId").escape(),
	
(req, res) => { 
					
			try {
					const errors = validationResult(req);
					if (!errors.isEmpty()) {
							return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
					}else {

							tmp_out0.aggregate([
									{$match:{severity_bp:2,severity_bmi:2}},
                  {$limit:1000},
									{$lookup: {  'localField':'citizenId',
									'from':'citizendetails', 
									'foreignField':'citizenId',
									'as':'citizen'  } },
									{$lookup:
											{  'localField':'screenerId', 
											'from':'screeners', 
											'foreignField':'screenerId', 
											'as':'screeners'  } },
											{$lookup: { 
													'localField':'citizenId', 
													'from':'citizens',
													 'foreignField':'citizenId',
													  'as':'citizens'  } },

													  {$unwind:"$citizen"},{$unwind:"$citizens"},{$unwind:"$screeners"},

													{'$project':{
															"citizenId":1,
															"FirstName":"$citizens.firstName",
															"LastName":"$citizens.lastName",
															"Email":"$citizens.email",
															"Gender":"$citizens.sex",
															"Address":"$citizen.address",
															"ScreenerId":"$citizens.screenerId",
															"ScreenerFirstName":"$screeners.firstName",
															"ScreenerLastName":"$screeners.lastName",
															"Mobile":"$citizens.mobile",
															Age:{$divide:[{$subtract: [ new Date(), "$citizen.dateOfBirth" ] },(365 * 24*60*60*1000)]  } ,
														   
											
													}},
													{$match:{Age: { $gte: 40 }}},
													{$out:"lipidcritical"}.then(recs => {
															if(recs){
																	console.log(recs);
																	process.exit(1);
															}
													})
											
							])
							.then(users => {
									
									let user=users[0];
									if (user) {
											for(var i=0;i<users.length;i++){
													users[i].createdAt=utility.toDDmmyy(users[i].createdAt);

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
