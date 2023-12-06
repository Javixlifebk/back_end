const CitizenModel = require("../models/CitizenModel");
const ScreenerModel = require("../models/ScreenerModel");
const UserModel = require("../models/UserModel");
const VisualExamModel = require("../models/VisualExamModel");
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
const multer = require("multer");
const express = require("express");
const app = express();
// const port = 3000;
const bodyParser = require("body-parser");
const fs = require("fs");
const mime = require("mime");
app.use(bodyParser.json({ limit: "100mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
const filename = `video.mp4`;
// global.__basedir = __dirname;
// const multer = require('multer')
const path = require("path");

exports.addVisualExam = [
  body("screenerId")
    .isLength({ min: 3 })
    .trim()
    .withMessage("Invalid Screener Login Id!")
    .custom((value) => {
      return ScreenerModel.Screener.findOne({ screenerId: value }).then(
        (user) => {
          if (user) {
          } else {
            return Promise.reject("Screener Not Found !");
          }
        }
      );
    }),
  body("citizenId")
    .isLength({ min: 3 })
    .trim()
    .withMessage("Invalid Citizen Id!")
    .custom((value) => {
      return CitizenModel.Citizen.findOne({ citizenId: value }).then((user) => {
        if (user) {
        } else {
          return Promise.reject("CitizenId Not Found !");
        }
      });
    }),
  //body("notes").isLength({ min: 3 }).trim().withMessage("Enter notes!"),
  body("image").isLength({ min: 1 }).trim().withMessage("Enter Image url!"),
  body("caseId").isLength({ min: 1 }).trim().withMessage("Enter caseId!"),

  sanitizeBody("screenerId").escape(),
  sanitizeBody("citizenId").escape(),
  //sanitizeBody("notes").escape(),
  //sanitizeBody("image").escape(),
  sanitizeBody("caseId").escape(),

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
        // let test = req.body.base64;
        // const myArray = test.split(";");
        // let myExtensionData  = myArray[0].replace(/data:video/,"");
        // let myExtensionDataFinal  = myExtensionData.replace("/","");
        let visual_exam_file1 = "";
        let visual_exam_file2 = "";

        console.log(req.body.visual_exam_file1);

        if (req.body.visual_exam_file1 && req.body.visual_exam_file2) {
          // let test = req.body.visual_exam_file1;
          // let test2 = req.body.visual_exam_file2;
          // const myArray = test.split(";");
          // let myExtensionData  = myArray[0].replace(/data:video/,"");
          // let myExtensionDataFinal  = myExtensionData.replace("/","");
          // req.body.visual_exam_file1 = req.body.visual_exam_file1.replace(/^data:(.*?);base64,/, ""); // <--- make it any type
          // extension = req.body.visual_exam_file1.replace(/^data:(.*?);base64,/, ""); // <--- make it any type
          // req.body.visual_exam_file1 = req.body.visual_exam_file1.replace(/ /g, '+'); // <--- this is important
          // visual_exam_file_name_1 =  req.body.caseId+'_1'+'.'+myExtensionDataFinal;
          //  fs.writeFile('./uploads/videos17012023/'+visual_exam_file_name_1, req.body.visual_exam_file1, 'base64', function(err) {
          // 	console.log(err);
          // });
          // req.body.visual_exam_file2= req.body.visual_exam_file2.replace(/^data:(.*?);base64,/, ""); // <--- make it any type
          // extension = req.body.visual_exam_file2.replace(/^data:(.*?);base64,/, ""); // <--- make it any type
          // req.body.visual_exam_file2 = req.body.visual_exam_file2.replace(/ /g, '+'); // <--- this is important
          // visual_exam_file_name_2 =  req.body.caseId+'_2'+'.'+myExtensionDataFinal;
          //  fs.writeFile('./uploads/videos17012023/'+visual_exam_file_name_2, req.body.visual_exam_file2, 'base64', function(err) {
          // 	console.log(err);
          // });
          visual_exam_file_name_1 = req.body.caseId + "_1.mp4";
          fs.writeFile(
            "./uploads/videos17012023/" + visual_exam_file_name_1,
            req.body.visual_exam_file1,
            "base64",
            function (err) {
              console.log(err);
            }
          );

          visual_exam_file_name_2 = req.body.caseId + "_2.mp4";
          fs.writeFile(
            "./uploads/videos17012023/" + visual_exam_file_name_2,
            req.body.visual_exam_file2,
            "base64",
            function (err) {
              console.log(err);
            }
          );
        }

        var images = req.body.image.split(",");
        if (images === null) {
          return apiResponse.ErrorResponse(res, "No Image");
        }
        var image;

        let totalCount = images.length;
        images.forEach((element) => {
          image = element;
          if (image != null && image != undefined && image != "") {
            console.log("vsfile", visual_exam_file_name_1);
            console.log("vsfile2", visual_exam_file_name_2);

            var recVisualExam = {
              visual_exam_file1: visual_exam_file_name_1,
              visual_exam_file2: visual_exam_file_name_2,

              screenerId: req.body.screenerId,
              citizenId: req.body.citizenId,
              notes: req.body.notes,
              // video: req.file.filename,
              image: image,
              caseId: req.body.caseId,
              ngoId: req.body.ngoId,
            };

            var actionVisualExam = new VisualExamModel.VisualExam(
              recVisualExam
            );
            console.log(actionVisualExam);
            actionVisualExam.save(function (_error) {
              if (_error) {
                return apiResponse.ErrorResponse(res, "Sorry:" + _error);
              } else {
                // totalCount--;
                // if(totalCount===0)
                // {
                return apiResponse.successResponseWithData(
                  res,
                  "added Visual Exam Successfully"
                );
                // }
                // return apiResponse.successResponseWithData(res,"Successfully Submitted", recVisualExam);
              }
            });
            console.log(actionVisualExam, "======");
          }
          // else{
          // 	totalCount--;
          // 	if(totalCount===0)
          // 				{
          // 					return apiResponse.successResponseWithData(res,"Successfully Submitted");
          // 				}
          // }
        });
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.VisualExamList = [
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
        VisualExamModel.VisualExam.aggregate([
          { $match: condition },
          { $limit: 100000 },
          {
            $lookup: {
              localField: "citizenId",
              from: "citizendetails",
              foreignField: "citizenId",
              as: "info",
            },
          },
          {
            $lookup: {
              localField: "citizenId",
              from: "citizens",
              foreignField: "citizenId",
              as: "basic",
            },
          },
          { $unwind: "$info" },
          {
            $project: {
              screenerId: 1,
              caseId: 1,
              citizenId: 1,
              notes: 1,
              image: 1,
              ngoId: 1,
              createdAt: 1,
              "basic.firstName": 1,
              "basic.lastName": 1,
              "basic.email": 1,
              "basic.mobile": 1,
              "basic.sex": 1,
              "basic.javixId": 1,
              "info.dateOfBirth": 1,
              "info.dateOfOnBoarding": 1,
              "info.bloodGroup": 1,
              "info.country": 1,
              "info.state": 1,
              visual_exam_file1: {
                $concat: [
                  "http://18.60.238.252:3010/",
                  // req.headers.host,
                  "/videos/",
                  "$visual_exam_file1",
                ],
              },
              visual_exam_file2: {
                $concat: [
                  "http://18.60.238.252:3010/",
                  // req.headers.host,
                  "/videos/",
                  "$visual_exam_file2",
                ],
              },
              "info.district": 1,
              "info.address": 1,
              "info.pincode": 1,
              "info.rating": 1,
              "info.geolocations": 1,
              "info.photo": 1,
            },
          },
        ]).then((users) => {
          let user = users[0];
          if (user) {
            return apiResponse.successResponseWithData(
              res,
              "Visual Exam List Found",
              users
            );
          } else return apiResponse.ErrorResponse(res, "Not Found");
        });
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, "EXp:" + err);
    }
  },
];

// 8. Upload Image Controller

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/videos17012023");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

exports.upload = multer({
  storage: storage,
  limits: { fileSize: "1000000" },
  fileFilter: (req, file, cb) => {
    console.log("------------",file);
    const fileTypes = /mp4/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper files formate to upload");
  },
}).single("video");
