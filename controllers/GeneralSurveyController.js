const CitizenModel = require("../models/CitizenModel");
const ScreenerModel = require("../models/ScreenerModel");
const UserModel = require("../models/UserModel");
const GeneralSurveyModel = require("../models/GeneralSurveyModel");
const tmp_out0Model = require("../models/tmp_out0Model");
const tmp_out1Model = require("../models/tmp_out1Model");
// const lipidcritical = require("../models/lipidcriticalcitizenModel")
const UserDetailsModel = require("../models/UserDetailsModel");
const { body, query, validationResult } = require("express-validator");
const moment = require('moment');
const { sanitizeBody } = require("express-validator");
//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");
const utility = require("../helpers/utility");
const mailer = require("../helpers/mailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { constants } = require("../helpers/constants");
const lipidcritical = require("../models/lipidcriticalcitizenModel");
const url = require('url');
exports.addGeneralSurvey = [
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
  // body("citizenId").isLength({ min: 3 }).trim().withMessage("Invalid Citizen Id!").custom((value) => {
  // 		return CitizenModel.Citizen.findOne({citizenId : value}).then((user) => {
  // 			if (user) {}
  // 			else{
  // 				return Promise.reject("CitizenId Not Found !");
  // 			}
  // 		});
  // 	}),
  //body("notes").isLength({ min: 3 }).trim().withMessage("Enter notes!"),
  // body("noOfFamilyMembers").isLength({ min: 1 }).trim().withMessage("Enter Number of Family Members!"),
  // body("nameHead").isLength({ min: 1}).trim().withMessage("Enter Name of Head of the Family!"),
  // body("ageHead").isLength({ min: 1 }).trim().withMessage("Enter Age of Head of the Family!"),
  // body("NoOfAdultMales").isLength({ min: 1}).trim().withMessage("Enter Number of Adult Males in Family Members!"),
  // body("NoOfAdultFemales").isLength({ min: 1 }).trim().withMessage("Enter Number of Adult Females in Family Members!"),
  // body("NoOfChildrenMales").isLength({ min: 1}).trim().withMessage("Enter Number of Children Males in Family Members!"),
  // body("NoOfChildrenFemales").isLength({ min: 1}).trim().withMessage("Enter Number of Children Females in Family Members!"),

  sanitizeBody("screenerId").escape(),
  //sanitizeBody("citizenId").escape(),
  //sanitizeBody("notes").escape(),
  //sanitizeBody("image").escape(),
  //sanitizeBody("caseId").escape(),

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
        var ID1 = utility.uID();
        var tcid = req.body.citizenId;
        var arr = [];
        var tempcid = tcid.split(",");
        for (var x = 0; x < tempcid.length; x++) {
          arr.push(tempcid[x]);
        }
        if (
          req.body.familyId != undefined &&
          req.body.familyId != "" &&
          req.body.familyId != null
        ) {
          ID1 = req.body.familyId;
        }
        var recGeneralSurvey = {
          generalsurveyId: ID,
          familyId: ID1,
          screenerId: req.body.screenerId,
          citizenId: arr,
          noOfFamilyMembers: req.body.noOfFamilyMembers,
          nameHead: req.body.nameHead,
          ageHead: req.body.ageHead,
          NoOfAdultMales: req.body.NoOfAdultMales,
          NoOfAdultFemales: req.body.NoOfAdultFemales,
          NoOfChildrenMales: req.body.NoOfChildrenMales,
          NoOfChildrenFemales: req.body.NoOfChildrenFemales,
        };

        var actionGeneralSurvey = new GeneralSurveyModel(recGeneralSurvey);
        actionGeneralSurvey.save(function (_error) {
          if (_error) {
            return apiResponse.ErrorResponse(res, "Sorry:" + _error);
          } else {
            return apiResponse.successResponseWithData(
              res,
              "Successfully Submitted"
            );
            //return apiResponse.successResponseWithData(res,"Successfully Submitted", recVisualExam);
          }
        });
      }
    } catch (err) {
     
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.GeneralSurveyList = [
  //    body("familyId").isLength({ min: 3 }).trim().withMessage("Invalid familyId!"),
  // sanitizeBody("familyId").escape(),

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

        GeneralSurveyModel.aggregate([
          { $match: condition },
          { $sort: { createdAt: -1 } },
          {
            $lookup: {
              localField: "citizenId",
              from: "citizens",
              foreignField: "citizenId",
              as: "citizens",
            },
          },
          // { $limit: 100 },
          {
            $project: {
              screenerId: 1,
              familyId: 1,
              citizenId: 1,
              noOfFamilyMembers: 1,
              nameHead: 1,
              ageHead: 1,
              NoOfAdultMales: 1,
              NoOfAdultFemales: 1,
              NoOfChildrenMales: 1,
              NoOfChildrenFemales: 1,
              createdAt: 1,
              updatedAt: 1,
              "citizens.citizenId": 1,
              "citizens.firstName": 1,
              "citizens.lastName": 1,
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
exports.tmp_out0List = [
  //    body("familyId").isLength({ min: 3 }).trim().withMessage("Invalid familyId!"),
  // sanitizeBody("familyId").escape(),
  
  (req, res)=> {
    let aggregate_options = [];
    // const params    = url.parse(req.url, true).query;
    // console.log(params);
    const { pageNo, size,start_date,end_date} = req.body
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
   let match = {};

console.log(start_date);
console.log(end_date);
// let getPeriod;
   //filter by date  { $match: { createdAt: { $gt: 80, $lt: 100 } } },
   if (start_date && end_date) {
       let s_date = moment(start_date);
       let e_date = moment(end_date);

     
      
       match= {createdAt: {$gte: s_date, $lt: e_date}};

   }
    console.log(match);
   aggregate_options.push({$match: match});
   
   // Find some documents
   tmp_out0Model.count({}, async (err, totalCount) => {
     if (err) {
     response = { error: true, message: 'Error fetching data' }
     }
     tmp_out0Model.find({}, {}, query, async (err, data) => {
     // Mongo command to fetch all data from collection.
     // const post_id = data.post_id
     if (err) {
       response = { error: true, message: 'Error fetching data' }
     } else {
       tmp_out0Model.aggregate([
       
        {'$match':{issubscreener:0}},
       
        { $sort: { createdAt: -1 } },
               // {'$limit':1000},
               {
                $lookup: {
                  localField: "citizenId",
                  from: "citizens",
                  foreignField: "citizenId",
                  as: "citizens",
                },
              },
              { $unwind: {path:"$citizens",preserveNullAndEmptyArrays: true} },
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
              { $unwind: {path:"$citizendetails",preserveNullAndEmptyArrays: true} },
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
              {$unwind:{path:"$screeners",preserveNullAndEmptyArrays: true}},
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
               { $unwind:{path:"$lipidpaneltests",preserveNullAndEmptyArrays: true} },
             
              { $unwind:{path:"$lungfunctions",preserveNullAndEmptyArrays: true} },
              { $unwind:{path:"$hemoglobins",preserveNullAndEmptyArrays: true} },
              
              { $unwind:{path:"$eyetests",preserveNullAndEmptyArrays: true} },
            
              { $unwind:{path:"$bloodglucosetests",preserveNullAndEmptyArrays: true} },
              { $unwind:{path:"$urinetests",preserveNullAndEmptyArrays: true} },
              {
                $project: {
                  status: 1,
                  severity_bp: 1,
                  severity_spo2: 1,
                  severity_temperature: 1,
                  severity_pulse: 1,
                  severity_bmi: 1,
                  severity_respiratory_rate: 1,
                  severity: 1,
                  citizenId: 1,
                  notes: 1,
                  doctorId: 1,
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
                  'fullname': {$concat: ["$citizens.firstName", " ", "$citizens.lastName"]},
                  'screenerfullname': {$concat: ["$screeners.firstName", " ", "$screeners.lastName"]},
                  Email: "$citizens.email",
                  aadhaar:'$citizens.aadhaar',
                  address: '$citizendetails.address',
                  Gender: "$citizens.sex",
                  // Address: "$citizen.address",
                  ScreenerId: "$citizens.screenerId",
  
                  leyeleft:{$concat: [" " ,"$eyetests.leyetest" ," "]},
                  reyeright:{$concat: [" " ,"$eyetests.reyetest" ," "]},
  
                  hemoglobins:"$hemoglobins.hemoglobin",
                  unit:"$bloodglucosetests.bloodglucose",
                  btype:"$bloodglucosetests.type",
                  leukocytes:"$urinetests.leukocytes", 
                  nitrite:"$urinetests.nitrite",
                  urobilinogen:"$urinetests.urobilinogen", 
                  protein:"$urinetests.protein",
                  blood:"$urinetests.blood",
                  specificGravity:"$urinetests.specificGravity",
                  ketone:"$urinetests.ketone",
                  bilirubin:"$urinetests.bilirubin",
                  PH:"$urinetests.ph",
                  urineglucose:"$urinetests.glucose",
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
                   lipidglucose:"$lipidpaneltests.glucose",
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
                    'issubscreener':"$screeners.issubscreener",
                    // 'fullname': {$concat: ["$citizens.firstName", " ", "$citizens.lastName"]},
                  // 'Screenerfullname': {$concat: ["$screeners.firstName", " ", "$screeners.lastName"]},
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
              //  {$sort:{'createdAt':-1}},
                     { $skip: query.skip },
                     { $limit: query.limit },
             ])
       .exec((err, likeData) => {
         if (err) {
         throw err
         } else {
         var totalPages = Math.ceil(totalCount / size)
         const myAggregate = tmp_out0Model.aggregate(aggregate_options);
         response = {
          myAggregate,
           message: 'data fatch successfully',
           status: 1,
           total_pages: totalPages,
           total: totalCount,
           per_page: size,
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
// exports.tmp_out0List = [
//   //    body("familyId").isLength({ min: 3 }).trim().withMessage("Invalid familyId!"),
//   // sanitizeBody("familyId").escape(),

//   (req, res)=> {
//     //  const params    = url.parse(req.url, true).query;
//     // console.log(params);
//     const pageNo=req.params.pageNo
//     const size=req.params.size
//    console.log(req.body);
//    if (pageNo < 0 || pageNo === 0) {
//      response = {
//      error: true,
//      message: 'invalid page number, should start with 1',
//      }
//      return res.json(response)
//    }
//    const query = {}
//    query.skip = size * (pageNo - 1)
//    query.limit = size
//    console.log(query);
   
//    // Find some documents
//    tmp_out0Model.count({}, async (err, totalCount) => {
//      if (err) {
//      response = { error: true, message: 'Error fetching data' }
//      }
//      tmp_out0Model.find({}, {}, query, async (err, data) => {
//      // Mongo command to fetch all data from collection.
//      // const post_id = data.post_id
//      if (err) {
//        response = { error: true, message: 'Error fetching data' }
//      } else {
//        tmp_out0Model.aggregate([
       
//         {'$match':{issubscreener:0}},
//         { $sort: { createdAt: -1 } },
//                // {'$limit':1000},
//                {
//                 $lookup: {
//                   localField: "citizenId",
//                   from: "citizens",
//                   foreignField: "citizenId",
//                   as: "citizens",
//                 },
//               },
//               { $unwind: {path:"$citizens",preserveNullAndEmptyArrays: true} },
//               {
//                 $lookup: {
//                   localField: "citizenId",
//                   from: "eyetests",
//                   foreignField: "citizenId",
//                   as: "eyetests",
//                 },
//               },
//               {
//                 $lookup: {
//                   localField: "citizenId",
//                   from: "citizendetails",
//                   foreignField: "citizenId",
//                   as: "citizendetails",
//                 },
//               },
//               { $unwind: {path:"$citizendetails",preserveNullAndEmptyArrays: true} },
//               {
//                 $lookup: {
//                   localField: "citizenId",
//                   from: "hemoglobins",
//                   foreignField: "citizenId",
//                   as: "hemoglobins",
//                 },
//               },
//               {
//                 $lookup: {
//                   localField: "screenerId",
//                   from: "screeners",
//                   foreignField: "screenerId",
//                   as: "screeners",
//                 },
//               },
//               {$unwind:{path:"$screeners",preserveNullAndEmptyArrays: true}},
//               {
//                 $lookup: {
//                   localField: "caseId",
//                   from: "bloodglucosetests",
//                   foreignField: "caseId",
//                   as: "bloodglucosetests",
//                 },
//               },
//               {
//                 $lookup: {
//                   localField: "caseId",
//                   from: "urinetests",
//                   foreignField: "caseId",
//                   as: "urinetests",
//                 },
//               },
//               {
//                 $lookup: {
//                   localField: "caseId",
//                   from: "lungfunctions",
//                   foreignField: "caseId",
//                   as: "lungfunctions",
//                 },
//               },
//                {
//                 $lookup: {
//                   localField: "caseId",
//                   from: "lipidpaneltests",
//                   foreignField: "caseId",
//                   as: "lipidpaneltests",
//                 },
//               },
//                { $unwind:{path:"$lipidpaneltests",preserveNullAndEmptyArrays: true} },
             
//               { $unwind:{path:"$lungfunctions",preserveNullAndEmptyArrays: true} },
//               { $unwind:{path:"$hemoglobins",preserveNullAndEmptyArrays: true} },
              
//               { $unwind:{path:"$eyetests",preserveNullAndEmptyArrays: true} },
            
//               { $unwind:{path:"$bloodglucosetests",preserveNullAndEmptyArrays: true} },
//               { $unwind:{path:"$urinetests",preserveNullAndEmptyArrays: true} },
//               {
//                 $project: {
//                   status: 1,
//                   severity_bp: 1,
//                   severity_spo2: 1,
//                   severity_temperature: 1,
//                   severity_pulse: 1,
//                   severity_bmi: 1,
//                   severity_respiratory_rate: 1,
//                   severity: 1,
//                   citizenId: 1,
//                   notes: 1,
//                   doctorId: 1,
//                   screenerId: 1,
//                   height: 1,
//                   weight: 1,
//                   bmi: 1,
//                   bpsys: 1,
//                   bpdia: 1,
//                   arm: 1,
//                   spo2: 1,
//                   caseId: 1,
//                   pulse: 1,
//                   respiratory_rate: 1,
//                   temperature: 1,
//                   referDocId: 1,
//                   'fullname': {$concat: ["$citizens.firstName", " ", "$citizens.lastName"]},
//                   'screenerfullname': {$concat: ["$screeners.firstName", " ", "$screeners.lastName"]},
//                   Email: "$citizens.email",
//                   aadhaar:'$citizens.aadhaar',
//                   address: '$citizendetails.address',
//                   Gender: "$citizens.sex",
//                   // Address: "$citizen.address",
//                   ScreenerId: "$citizens.screenerId",
  
//                   leyeleft:{$concat: [" " ,"$eyetests.leyetest" ," "]},
//                   reyeright:{$concat: [" " ,"$eyetests.reyetest" ," "]},
  
//                   hemoglobins:"$hemoglobins.hemoglobin",
//                   unit:"$bloodglucosetests.bloodglucose",
//                   btype:"$bloodglucosetests.type",
//                   leukocytes:"$urinetests.leukocytes", 
//                   nitrite:"$urinetests.nitrite",
//                   urobilinogen:"$urinetests.urobilinogen", 
//                   protein:"$urinetests.protein",
//                   blood:"$urinetests.blood",
//                   specificGravity:"$urinetests.specificGravity",
//                   ketone:"$urinetests.ketone",
//                   bilirubin:"$urinetests.bilirubin",
//                   PH:"$urinetests.ph",
//                   urineglucose:"$urinetests.glucose",
//                   fvc_predicted:"$lungfunctions.fvc_predicted",
//                   fvc_actual:"$lungfunctions.fvc_actual",
//                   fev1_predicted:"$lungfunctions.fev1_predicted",
//                   fev1_actual:"$lungfunctions.fev1_actual",
//                   fvc1_predicted:"$lungfunctions.fvc1_predicted",
//                   fvc1_actual:"$lungfunctions.fvc1_actual",
//                   pef_predicted:"$lungfunctions.pef_predicted",
//                   pef_actual:"$lungfunctions.pef_actual",
//                   fvc_predicted_percent:"$lungfunctions.fvc_predicted_percent",
//                   fev1_predicted_percent:"$lungfunctions.fev1_predicted_percent",
//                   fvc1_predicted_percent:"$lungfunctions.fvc1_predicted_percent",
//                   pef_predicted_percent:"$lungfunctions.pef_predicted_percent",
//                   cholesterol:"$lipidpaneltests.cholesterol",
//                   hdlcholesterol:"$lipidpaneltests.hdlcholesterol",
//                   triglycerides:"$lipidpaneltests.triglycerides",
//                   ldl:"$lipidpaneltests.ldl",
//                    tcl_hdl:"$lipidpaneltests.tcl_hdl",
//                    ldl_hdl:"$lipidpaneltests.ldl_hdl",
//                    non_hdl:"$lipidpaneltests.non_hdl",
//                    lipidglucose:"$lipidpaneltests.glucose",
//                    type:"$lipidpaneltests.type",
    
    
//                   caseId:1,
//                   createdAt: {
//                       $dateToString: {
//                         format: "%d-%m-%Y",
//                         date: "$createdAt",
//                       },
//                     },
//                     DOB: {
//                       $dateToString: {
//                         format: "%d-%m-%Y",
//                         date: "$citizendetails.dateOfBirth",
//                       },
//                     },
//                     "issubscreenertype": {
//                       "$switch": {
//                         "branches": [
//                           { "case": { "$eq": ["$screeners.issubscreener", 0] }, "then": "Sanyojika" },
//                           { "case": { "$eq": ["$screeners.issubscreener", 1] }, "then": "Sevika" },
                         
//                         ],
//                         "default": "none"
//                       },
//                     },
//                     'issubscreener':"$screeners.issubscreener",
//                     // 'fullname': {$concat: ["$citizens.firstName", " ", "$citizens.lastName"]},
//                   // 'Screenerfullname': {$concat: ["$screeners.firstName", " ", "$screeners.lastName"]},
//                   height:1,
//                   weight: 1,
//                   bmi:1,
//                   bpsys:1,
//                   bpdia:1,
//                   spo2:1,
//                   pulse:1,
//                   temperature:1,
//                   arm:1,
//                   Mobile: "$citizens.mobile",
//                   // createdAt: 1,
//                   severity_bp: 1,
//                   severity_bmi: 1,
//                   severity_spo2: 1,
//                   severity_pulse: 1,
//                   severity_temperature: 1,
//                   severity_respiratory_rate: 1,
//                   severity: 1,
//                   Age: { $round:{
//                     $divide: [
//                       { $subtract: [new Date(), "$citizendetails.dateOfBirth"] },
//                       365 * 24 * 60 * 60 * 1000,
//                     ],
//                   },
//           },
//                 },
//               },
//               //  {$sort:{'createdAt':-1}},
//                      { $skip: query.skip },
//                      { $limit: query.limit },
//              ])
//        .exec((err, likeData) => {
//          if (err) {
//          throw err
//          } else {
//          var totalPages = Math.ceil(totalCount / size)
//          response = {
//            message: 'data fatch successfully',
//            status: 1,
//            total_pages: totalPages,
//            total: totalCount,
//            per_page: size,
//            data: likeData.reverse(),
//          }
         
//          res.json(response)
//          }
//        })
//      }
//      })
//     })
//    }	
// ]

exports.tmp_out1List = [
  //    body("familyId").isLength({ min: 3 }).trim().withMessage("Invalid familyId!"),
  // sanitizeBody("familyId").escape(),

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
        //    var condition={};
        //    if(req.body.familyId!='' && req.body.familyId!=undefined && req.body.familyId!=null){
        // 	   condition['familyId']=req.body.familyId;
        //    }
        //    if(req.body.citizenId!='' && req.body.citizenId!=undefined && req.body.citizenId!=null){
        // 	   condition['citizenId']=req.body.citizenId;
        //    }
        //    if(req.body.screenerId!='' && req.body.screenerId!=undefined && req.body.screenerId!=null){
        // 	   condition['screenerId']=req.body.screenerId;
        //    }

        tmp_out1Model
          .aggregate([
                {'$match':{issubscreener:1}},
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
                localField: "screenerId",
                from: "screeners",
                foreignField: "screenerId",
                as: "screeners",
              },
            },
            { $unwind: "$citizens" },
            { $unwind: "$screeners" },
            { $unwind: "$citizendetails" },
            //    {'$limit':100},
            {
              $project: {
                status: 1,
                'fullname': {$concat: ["$citizens.firstName", " ", "$citizens.lastName"]},
                'screenerfullname': {$concat: ["$screeners.firstName", " ", "$screeners.lastName"]},
                severity_bp: 1,
                Email: "$citizens.email",
                aadhaar:'$citizens.aadhaar',
                Mobile:'$citizens.mobile',
                address: '$citizendetails.address',
                Gender: "$citizens.sex",
                severity_spo2: 1,
                severity_temperature: 1,
                severity_pulse: 1,
                severity_bmi: 1,
                severity_respiratory_rate: 1,
                severity: 1,
                citizenId:1,
                notes: 1,
                doctorId: 1,
                screenerId: 1,
                height: 1,
                weight: 1,
                bmi:1,
                bpsys:1,
                bpdia: 1,
                arm: 1,
                spo2: 1,
                caseId:1,
                pulse: 1,
                respiratory_rate:1,
                Age: { $round:{
                  $divide: [
                    { $subtract: [new Date(), "$citizendetails.dateOfBirth"] },
                    365 * 24 * 60 * 60 * 1000,
                  ],
                },},
                temperature:1,
                referDocId: 1,
                FirstName: "$citizens.firstName",
                LastName: "$citizens.lastName",
				issubscreener:1,
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
              },
            },
          ])
          .then((users) => {
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
exports.tmp_outList = [
  (req, res)=> {
    const { pageNo, size} = req.body
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
   tmp_out1Model.count({}, async (err, totalCount) => {
     if (err) {
     response = { error: true, message: 'Error fetching data' }
     }
     tmp_out1Model.find({}, {}, query, async (err, data) => {
     // Mongo command to fetch all data from collection.
     // const post_id = data.post_id
     if (err) {
       response = { error: true, message: 'Error fetching data' }
     } else {
       tmp_out1Model.aggregate([
       
               {'$match':{severity:2}},
               // {'$match':condition},
               // {'$limit':1000},
               {'$lookup': {
                 'localField':'citizenId',
                 'from':'citizendetails',
                 'foreignField':'citizenId',
                 'as':'info'	
                }
               },
               {'$lookup': {
                 'localField':'citizenId',
                 'from':'citizens',
                 'foreignField':'citizenId',
                 'as':'basic'
                }
               },
               {'$lookup': {
                 'localField':'screenerId',
                 'from':'screeners',
                 'foreignField':'screenerId',
                 'as':'screeners'
                }
               },
               {"$unwind":"$screeners"},
               {'$unwind':'$basic'},
               
               {'$unwind':'$info'},
               {'$project':{
                 'fullname': {$concat: ["$basic.firstName", " ", "$basic.lastName"]},
                  'screenerId':1,
                  'caseId':1,
                  'citizenId':1,
                  'hemoglobin':1,
                  'notes':1,
                  'createdAt':{ $dateToString: { format: "%d/%m/%Y", date: "$createdAt" } },
                  'basic.firstName':1,
                  'basic.lastName':1,
                  'basic.email':1,
                  'basic.mobile':1,
                  'basic.sex':1,
                  'basic.javixId':1,
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
                  'address':'$info.address',
                  'email':'$basic.email',
                  'mobile':'$basic.mobile',
                  'dateOfOnBoarding':{ $dateToString: { format: "%d/%m/%Y", date: "$info.dateOfOnBoarding" } },
                  'screenerfullname':{$concat:["$screeners.firstName"," ","$screeners.lastName"]},
                  severity:1
                  
                 }
               },
               {$sort:{'createdAt':-1}},
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
