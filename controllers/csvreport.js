const CitizenModel = require("../models/CitizenModel");
const LipidcriticalcitizenModel = require("../models/lipidcriticalcitizenModel");
const GeneralSurvey = require("../models/GeneralSurveyModel");
const SocioEconomicSurveyModel = require("../models/SocioEconomicSurveyModel");
const HealthSurveyModel = require("../models/HealthSurveyModel");
const ScreenerModel = require("../models/ScreenerModel");
const UserModel = require("../models/UserModel");
const VisualExamModel = require("../models/VisualExamModel");
const UserDetailsModel = require("../models/UserDetailsModel");
const ScreeningCaseModel = require("../models/ScreeningCase");
const { body, query, validationResult } = require("express-validator");
// const {sanitizeBody } = require("express-validator");
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

const json2csv = require("json2csv").parse;
const csvWriter = require("csv-writer");
const bodyParser = require("body-parser");
const fs = require("fs");
const mime = require("mime");

const fields = [
  "citizenId",
  "firstName",
  "lastName",
  "sex",
  "mobile",
  "email",
  "aadhaar",
  "raadhaar",
  "javixId",
  "citizenLoginId",
  "pstatus",
  "isInstant",
  "updatedAt",
  "createdAt",
  "screenerId",
];

const socioEconomicSurveyFields =  [
  "socioeconomicsurveyId",
  "citizenId",
  "familyId",
  "noOfEarners",
  "nameOfEarners",
  "ageOfEarners",
  "occupationOfEarners",
  "isBankAccount",
  "statusOfHouse",
  "totalIncome",
  "foodExpense",
  "healthExpense",
  "educationExpense",
  "intoxicationExpense",
  "conveyanceExpense",
  "cultivableLand",
  "createdAt",
  "updatedAt",
  "screenerId",
  "citizenFirstName",
  "firstName",
  "lastName",
  "issubscreener",
];

const healthSurveyCSVDataFields = [
  "familyId",
  "citizenId",
  "noOfFamilyMembers",
  "nameHead",
  "ageHead",
  "NoOfAdultMales",
  "NoOfAdultFemales",
  "NoOfChildrenMales",
  "NoOfChildrenFemales",
  "createdAt",
  "updatedAt",
  "screenerId",
  "citizenFirstName",
  "firstName",
  "lastName",
  "issubscreener",

];
const unscreenedCitizenDetailFields = [
  "id",
  "firstName",
  "lastName",
  "sex",
  "mobile",
  "email",
  "pstatus",
  "ngoId",
  "isInstant",
  "citizenId",
  "javixId",
    "aadhaar",
    "raadhaar",
  "citizenLoginId",
  "createdAt",
  "screenerId",
  "ScreenerfirstName",
  "ScreenerlastName",
  "citizenAddress",
  "citizenDOB",
  "issubscreener",
];
const generalSurveyFields = [
    "familyId",
    "citizenId",
    "noOfFamilyMembers",
    "nameHead",
    "ageHead",
    "NoOfAdultMales",
    "NoOfAdultFemales",
    "NoOfChildrenMales",
    "NoOfChildrenFemales",
    "createdAt",
    "updatedAt",
    "screenerId",
    "citizenFirstName",
    "firstName",
    "lastName",
    "issubscreener",
];
const fieldsCitizendetails = [
  "citizenId",
  "citizenDetailId",
  "dateOfBirth",
  "dateOfOnBoarding",
  "bloodGroup",
  "country",
  "state",
  "district",
  "address",
  "pincode",
  "photo",
  "updatedAt",
  "createdAt",
];
const fieldsscreeningcase = [
  "severity_bp",,
  'severity_spo2',
  'severity_temperature',
  'ngoId',
  'severity_pulse',
  'severity_bmi',
  'severity_respiratory_rate',
  'severity',
  'citizenId',
  'notes',
  'doctorId',
  'screenerId',
  'height',
  'weight',
  'bmi',
  'bpsys',
  'bpdia',
  'arm',
  'spo2',
  'caseId',
  'pulse',
  'respiratory_rate',
  'temperature',
  'referDocId',
  'fullname',
  'screenerfullname',
  'Email',
  'aadhaar',
  'address',
  'Gender',
  'issubscreener',
  'ScreenerId'
];

const lipidCriticalFields =[
  "citizenId",
  "FirstName",
  "ngoId ",
  "LastName",
  "Email",
  "Gender",
  "Address",
  "ScreenerId",
  "ScreenerFirstName",
  "ScreenerLastName",
  "Mobile",
  "Age",
];

const path = require("path");

const generalSurveyCSV = async (req, res) => {

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          "Validation Error.",
          errors.array()
        );
      } else {
        // citizen all data csv
  
        let genralSurveyCsv =  await 		GeneralSurvey.aggregate([
          {
            '$match':{
              'ngoId': req.body.ngoId
              }
          },
          {$sort:{'createdAt':-1}},
          {
            $lookup:{
            from:"screeners",
            localField: "screenerId",
            foreignField:"screenerId",
            as:"result"
          }	
          },
          {
                                          $lookup:{
                                          from:"citizens",
                                          localField: "citizenId",
                                          foreignField:"citizenId",
                                          as:"citi"
                                  }
                                  },
          {"$unwind":"$result"},
        
          { "$project": {
            "familyId":1,
            "citizenId":1,
            "noOfFamilyMembers":1,
            "nameHead":1,
            "ageHead":1,
            "NoOfAdultMales":1,
            "NoOfAdultFemales":1,
            "NoOfChildrenMales":1,
            "NoOfChildrenFemales":1,
            "createdAt":1,
            "updatedAt":1,
            "screenerId":1,
            "citizenFirstName":"$citi.firstName",
            "firstName":"$result.firstName" ,
            "lastName": "$result.lastName",
            "issubscreener":"$result.issubscreener"
          }}
      
      ]);
        let csv;
        csv = json2csv(genralSurveyCsv, { generalSurveyFields });
        console.log("csv", csv);
        
        const filePath = path.join(__dirname,".." ,"public", "exports", "csv-"+"generalSurveyCSV"+".csv")
  
        fs.writeFile(filePath, csv, function (err) {
          if (err) {
            return res.json(err).status(500);
          }
          return res.json( req.protocol + '://' + req.get('host')+"/exports/csv-" +"generalSurveyCSV"+ ".csv"
          );
        });
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
}
const unscreenedCitizenDetailcsv = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return apiResponse.validationErrorWithData(
        res,
        "Validation Error.",
        errors.array()
      );
    } else {
      // citizen all data csv

      let unscreenedCitizenDetailcsv =  await CitizenModel.Citizen.aggregate([
        {
          '$match':{
						'pstatus':0,
            'ngoId': req.body.ngoId
						}
				},
				{"$sort":{'createdAt':-1}},
				{
            "$lookup":{
            "from":"screeners",
            "localField": "screenerId",
            "foreignField":"screenerId",
            "as":"result"
          }	
				},
				{"$unwind":"$result"},
        {
                "$lookup":{
                  "from":"citizendetails",
                  "localField": "citizenId",
                  "foreignField":"citizenId",
                  "as":"citizendetails"
                }
        },
			
				{ "$project": {
					"firstName":1,
					"lastName":1,
					"sex":1,
					"ngoId":1,
					"mobile":1,
					"email":1,
					"pstatus":1,
					"ngoId":1,
					"isInstant":1,
					"citizenId":1,
					"javixId":1,
          "aadhaar":1,
          "raadhaar":1,
					"citizenLoginId":1,
					"createdAt":1,
					"screenerId":1,
					"ScreenerfirstName":"$result.firstName" ,
					"ScreenerlastName": "$result.lastName",
					"citizenAddress":"$citizendetails.address",
					"citizenDOB":"$citizendetails.dateOfBirth",
					"issubscreener":"$result.issubscreener",
				}}
			
		]);
      let csv;
      csv = json2csv(unscreenedCitizenDetailcsv, { unscreenedCitizenDetailFields });
      console.log("csv", csv);
      
      const filePath = path.join(__dirname,".." ,"public", "exports", "csv-"+"unscreenedCitizenDetailcsv"+".csv")

      fs.writeFile(filePath, csv, function (err) {
        if (err) {
          return res.json(err).status(500);
        }
        return res.json( req.protocol + '://' + req.get('host')+"/exports/csv-" +"unscreenedCitizenDetailcsv"+ ".csv"
        );
      });
    }
  } catch (err) {
    return apiResponse.ErrorResponse(res, err);
  }
}


const createCitizencsv = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          "Validation Error.",
          errors.array()
        );
      } else {
        // citizen all data csv

        let citizen = await CitizenModel.Citizen.find({
          ngoId: req.body.ngoId,
        });

        let csv;
        csv = json2csv(citizen, { fields });

        // const filePath = path.join(
        //   __dirname,
        //   "..",
        //   "public",
        //   "exports",
        //   +"dailyCitizens" + ".csv"
        // );
        const filePath = path.join(__dirname,".." ,"public", "exports", "csv-"+"dailyCitizens"+".csv")

        console.log("+++++", citizen);
        fs.writeFile(filePath, csv, function (err) {
          if (err) {
            return res.json(err).status(500);
          }
          return res.json( req.protocol + '://' + req.get('host')+"/exports/csv-" +"dailyCitizens"+ ".csv"

          // return res.json(
          //   req.protocol +
          //     "://" +
          //     req.get("host") +
          //     "/exports/" +
          //     "dailyCitizens" +
          //     ".csv"
          );
        });
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  }

const socioEconomicSurveyCSV = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          "Validation Error.",
          errors.array()
        );
      } else {
        let socioEconomicSurveyCSV = await SocioEconomicSurveyModel.aggregate([
              {
                '$match':{
                  'ngoId': req.body.ngoId
                  }
              },
              {$sort:{'createdAt':-1}},
              {
                $lookup:{
                from:"screeners",
                localField: "screenerId",
                foreignField:"screenerId",
                as:"result"
              }	
              },
              {
                    $lookup:{
                    from:"citizens",
                    localField: "citizenId",
                    foreignField:"citizenId",
                    as:"citi"
                }
              },
              {"$unwind":"$result"},
              { "$project": {
                "socioeconomicsurveyId":1,
                "citizenId":1,
                "familyId":1,
                "noOfEarners":1,
                "nameOfEarners":1,
                "ageOfEarners":1,
                "occupationOfEarners":1,
                "isBankAccount":1,
                "statusOfHouse":1,
                "totalIncome":1,
                "foodExpense":1,
                "healthExpense":1,
                "educationExpense":1,
                "intoxicationExpense":1,
                "conveyanceExpense":1,
                "cultivableLand":1,
                "createdAt":1,
                "updatedAt":1,
                "screenerId":1,
                "citizenFirstName":"$citi.firstName" ,
                "firstName":"$result.firstName" ,
                "lastName": "$result.lastName",
                "issubscreener":"$result.issubscreener"
              }}
          ]);

        let csv;
        csv = json2csv(socioEconomicSurveyCSV, { socioEconomicSurveyFields });

        const filePath = path.join(__dirname,".." ,"public", "exports", "csv-"+"socioEconomicSurveyCSV"+".csv")
        fs.writeFile(filePath, csv, function (err) {
          if (err) {
            return res.json(err).status(500);
          }
          return res.json( req.protocol + '://' + req.get('host')+"/exports/csv-" +"socioEconomicSurveyCSV"+ ".csv"
          );
        });
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  }

  const healthSurveyCSV = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          "Validation Error.",
          errors.array()
        );
      } else {
        // citizen all data csv

        let healthSurveyCSVData = await HealthSurveyModel.aggregate([
            {
              '$match':{
                'ngoId': req.body.ngoId
                }
            },
            {$sort:{'createdAt':-1}},
            {
              $lookup:{
              from:"screeners",
              localField: "screenerId",
              foreignField:"screenerId",
              as:"result"
            }	
            },
            {
                        $lookup:{
                        from:"citizens",
                        localField: "citizenId",
                        foreignField:"citizenId",
                        as:"citi"
                  }
            },
            {"$unwind":"$result"},
          
            { "$project": {
              "healthsurveyId":1,
              "citizenId":1,
              "familyId":1,
              "drinkingWaterSource":1,
              "drinkingWaterDistance":1,
              "isdrinkingWaterTreatmentRequired":1,
              "NoOfPersonUsingToilets":1,
              "NonUsageOfToilets":1,
              "DistanceOfSubcenters":1,
              "DistanceOfPrimaryHealthcenters":1,
              "DistanceOfCommunityHealthcenters":1,
              "DistanceOfDistrictHospitals":1,
              "DistanceOfPathologyLab":1,
              "DistanceOfMedicalStore":1,
              "StatusOfDeliveryOfChildren":1,
              "StatusOfVaccinationOfChildren":1,
              "StatusOfFemaleRelatedProblem":1,
              "CentrallyIssuedHealthInsurance":1,
              "StateIssuedHealthInsurance":1,
              "PersonalHealthInsurance":1,
              "bpStatus":1,
              "hbTestStatusFemale":1,
              "sugarTestStatus":1,
              "smokingStatus":1,
              "alcoholStatus":1,
              "tobaccoStatus":1,
              "createdAt":1,
              "updatedAt":1,
              "screenerId":1,
              "citizenFirstName":"$citi.firstName",
              "firstName":"$result.firstName" ,
              "lastName": "$result.lastName",
              "issubscreener":"$result.issubscreener"
            }}
        ]);

        let csv;
        csv = json2csv(healthSurveyCSVData, { healthSurveyCSVDataFields });

        const filePath = path.join(__dirname,".." ,"public", "exports", "csv-"+"healthSurveyCSV"+".csv")
        fs.writeFile(filePath, csv, function (err) {
          if (err) {
            return res.json(err).status(500);
          }
          return res.json( req.protocol + '://' + req.get('host')+"/exports/csv-" +"healthSurveyCSV"+ ".csv"
          );
        });
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  }
const createWeeklyCitizencsv = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          "Validation Error.",
          errors.array()
        );
      } else {
        // citizen all data csv
        var today = new Date();
        // var futuredate = new Date();
        var prevdate = new Date();
        // futuredate.setDate(futuredate.getDate() + 7);
        prevdate.setDate(today.getDate() - 7);
      
        let citizen = await CitizenModel.Citizen.find({
          ngoId: req.body.ngoId,createdAt:{'$lt':today,'$gt':prevdate}
        });

        let csv;
        csv = json2csv(citizen, { fields });
        const filePath = path.join(__dirname,".." ,"public", "exports", "csv-"+"weeklyCitizens"+".csv")


        // const filePath = path.join(
        //   __dirname,
        //   "..",
        //   "public",
        //   "exports",
        //   +"weeklyCitizens" + ".csv"
        // );
        console.log("+++++", citizen);
        fs.writeFile(filePath, csv, function (err) {
          if (err) {
            return res.json(err).status(500);
          }
          return res.json( req.protocol + '://' + req.get('host')+"/exports/csv-" +"weeklyCitizens"+ ".csv"

          // return res.json(
          //   req.protocol +
          //     "://" +
          //     req.get("host") +
          //     "/exports/" +
          //     "weeklyCitizens" +
          //     ".csv"
          );
        });
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  }

const createCitizenDetailcsv = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          "Validation Error.",
          errors.array()
        );
      } else {
        // citizendetails all data csv
        let citizendetails = await CitizenModel.CitizenDetails.find({
          ngoId: req.body.ngoId,
        },
        {
          "citizenId":1,
          "citizenDetailId":1,
          "dateOfBirth":1,
          "dateOfOnBoarding":1,
          "bloodGroup":1,
          "country":1,
          "state":1,
          "district":1,
          "address":1,
          "pincode":1,
          "photo":1,
          "updatedAt":1,
          "createdAt":1,
        }).lean();

        let csv;
        csv = json2csv(citizendetails, { fieldsCitizendetails });

        // const filePath = path.join(
        //   __dirname,
        //   "..",
        //   "public",
        //   "exports",
        //   +"dailyCitizenDetails" + ".csv"
        // );
        const filePath = path.join(__dirname,".." ,"public", "exports", "csv-"+"dailyCitizenDetails"+".csv")

        
        fs.writeFile(filePath, csv, function (err) {
          if (err) {
            return res.json(err).status(500);
          }
          return res.json( req.protocol + '://' + req.get('host')+"/exports/csv-" +"dailyCitizenDetails"+ ".csv"

          // return res.json(
          //   req.protocol +
          //     "://" +
          //     req.get("host") +
          //     "/exports/" +
          //     "dailyCitizenDetails" +
          //     ".csv"
          );
        });
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  }


  const weeklyCitizenDetailcsv = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          "Validation Error.",
          errors.array()
        );
      } else {
        // citizendetails all data csv
        let citizendetails = await CitizenModel.CitizenDetails.find({
          ngoId: req.body.ngoId,
        },
        {
          "citizenId":1,
          "citizenDetailId":1,
          "dateOfBirth":1,
          "dateOfOnBoarding":1,
          "bloodGroup":1,
          "country":1,
          "state":1,
          "district":1,
          "address":1,
          "pincode":1,
          "photo":1,
          "updatedAt":1,
          "createdAt":1,
        }).lean();

        let csv;
        csv = json2csv(citizendetails, { fieldsCitizendetails });
        const filePath = path.join(__dirname,".." ,"public", "exports", "csv-"+"weeklyCitizenDetails"+".csv")

        // const filePath = path.join(
        //   __dirname,
        //   "..",
        //   "public",
        //   "exports",
        //   +"weeklyCitizenDetails" + ".csv"
        // );
        console.log("+++++", citizendetails);
        fs.writeFile(filePath, csv, function (err) {
          if (err) {
            return res.json(err).status(500);
          }
          return res.json( req.protocol + '://' + req.get('host')+"/exports/csv-" +"weeklyCitizenDetails"+ ".csv"

          // return res.json(
          //   req.protocol +
          //     "://" +
          //     req.get("host") +
          //     "/exports/" +
          //     "weeklyCitizenDetails" +
          //     ".csv"
          );
        });
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  }
const createScreeningScreenerCasecsv = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          "Validation Error.",
          errors.array()
        );
      } else {
        // citizendetails all data csv
        let screeningcases = await ScreeningCaseModel.ScreeningCase.aggregate([
       
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
              localField: "screenerId",
              from: "screeners",
              foreignField: "screenerId",
              as: "screeners",
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
          
          { $match: { ngoId: req.body.ngoId} },
        
        ]);

        let screenerArr = [];
        if(screeningcases.length>0){
          for(let i=0;i<screeningcases.length;i++){
            let row = screeningcases[i];
            let elemetObj = {};
            elemetObj.screenerfullname = "";
            elemetObj.issubscreener=""
            if(row.screeners && row.screeners.length>0){   
              elemetObj.screenerfullname = row.screeners[0].firstName+" "+row.screeners[0].lastName; 
              elemetObj.issubscreener = row.issubscreener;  
            }  
            
            elemetObj.screenerId = "'"+row.screenerId+"'";
            elemetObj.citizenId = "'"+row.citizenId[row.citizenId.length-1]+" '";
            elemetObj._id = row._id;
            elemetObj.severity_bp = "'"+row.severity_bp+"'";
            elemetObj.severity_spo2 = row.severity_spo2;
            elemetObj.severity_temperature = row.severity_temperature;
            elemetObj.severity_pulse=row.severity_pulse,
           elemetObj.severity_bmi=row.severity_bmi,
           elemetObj.severity_respiratory_rate=row.severity_respiratory_rate,
           elemetObj.severity=row.severity,
           elemetObj.notes=row.notes,
           elemetObj.createdAt=row.createdAt,
          updatedAt=row.updatedAt,
    
           elemetObj.familymembername = "";
            elemetObj.gender = "";
            elemetObj.mobile = "";
            elemetObj.aadhaar = "";
            if(row.citizens && row.citizens.length>0){ 
              let fullname = "";
              for(let k=0;k<row.citizens.length;k++){
                fullname = fullname+" "+row.citizens[k].firstName+" "+row.citizens[k].lastName+",";  
                fullname.replace(/^\,s+/, '');  
              }
              elemetObj.fullname = fullname ;
              //elemetObj.fullname = row.citizens[0].firstName+" "+row.citizens[0].lastName;    
              // elemetObj.gender = row.citizens[0].sex;    
              elemetObj.mobile =row.citizens[0].mobile; 
              elemetObj.aadhaar =row.citizens[0].aadhaar;  
            }  
          
            elemetObj.dateOfBirth = "";    
            elemetObj.address = "";
            if(row.citizendetails && row.citizendetails.length>0){    
              elemetObj.dateOfBirth = row.citizendetails[0].dateOfBirth;    
              elemetObj.address = row.citizendetails[0].address;    
            }
            if(elemetObj.issubscreener==1){
            screenerArr.push(elemetObj);
            }
          }
        }
    
        console.log("+++++", screeningcases);
        let csv;
        csv = json2csv(screeningcases, { fieldsscreeningcase });
        
        const filePath = path.join(__dirname,".." ,"public", "exports", "csv-"+"screeningScreener"+".csv")

        // const filePath = path.join(__dirname,".." ,"public", "exports", "csv-"+"screeningScreener"+".csv")
        console.log("+++++", screeningcases);
        fs.writeFile(filePath, csv, function (err) {
          if (err) {
            return res.json(err).status(500);
          }
          // return res.json(req.protocol + '://' + req.get('host')+"/exports/csv-"+"screeningScreener"+".csv"
           
          // );
           return res.json( req.protocol + '://' + req.get('host')+"/exports/csv-" +"screeningScreener"+ ".csv"
          );
         
        });
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  }

const createScreeningSevikaCasecsv = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          "Validation Error.",
          errors.array()
        );
      } else {
        // citizendetails all data csv
        let screeningcases = await ScreeningCaseModel.ScreeningCase.aggregate([
       
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
              localField: "screenerId",
              from: "screeners",
              foreignField: "screenerId",
              as: "screeners",
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
          
          { $match: { ngoId: req.body.ngoId} },
        
        ]);

        let screenerArr = [];
        if(screeningcases.length>0){
          for(let i=0;i<screeningcases.length;i++){
            let row = screeningcases[i];
            let elemetObj = {};
            elemetObj.screenerfullname = "";
            elemetObj.issubscreener=""
            if(row.screeners && row.screeners.length>0){   
              elemetObj.screenerfullname = row.screeners[0].firstName+" "+row.screeners[0].lastName; 
              elemetObj.issubscreener = row.issubscreener;  
            }  
            
            elemetObj.screenerId = "'"+row.screenerId+"'";
            elemetObj.citizenId = "'"+row.citizenId[row.citizenId.length-1]+" '";
            elemetObj._id = row._id;
            elemetObj.severity_bp = "'"+row.severity_bp+"'";
            elemetObj.severity_spo2 = row.severity_spo2;
            elemetObj.severity_temperature = row.severity_temperature;
            elemetObj.severity_pulse=row.severity_pulse,
           elemetObj.severity_bmi=row.severity_bmi,
           elemetObj.severity_respiratory_rate=row.severity_respiratory_rate,
           elemetObj.severity=row.severity,
           elemetObj.notes=row.notes,
           elemetObj.createdAt=row.createdAt,
          updatedAt=row.updatedAt,
    
           elemetObj.familymembername = "";
            elemetObj.gender = "";
            elemetObj.mobile = "";
            elemetObj.aadhaar = "";
            if(row.citizens && row.citizens.length>0){ 
              let fullname = "";
              for(let k=0;k<row.citizens.length;k++){
                fullname = fullname+" "+row.citizens[k].firstName+" "+row.citizens[k].lastName+",";  
                fullname.replace(/^\,s+/, '');  
              }
              elemetObj.fullname = fullname ;
              //elemetObj.fullname = row.citizens[0].firstName+" "+row.citizens[0].lastName;    
              // elemetObj.gender = row.citizens[0].sex;    
              elemetObj.mobile =row.citizens[0].mobile; 
              elemetObj.aadhaar =row.citizens[0].aadhaar;  
            }  
          
            elemetObj.dateOfBirth = "";    
            elemetObj.address = "";
            if(row.citizendetails && row.citizendetails.length>0){    
              elemetObj.dateOfBirth = row.citizendetails[0].dateOfBirth;    
              elemetObj.address = row.citizendetails[0].address;    
            }
            if(elemetObj.issubscreener==0){
            screenerArr.push(elemetObj);
            }
          }
        }
    
        console.log("+++++", screeningcases);
        let csv;
        csv = json2csv(screeningcases, { fieldsscreeningcase });

        const filePath = path.join(__dirname,".." ,"public", "exports", "csv-"+"screeningSevika"+".csv")
        console.log("+++++", screeningcases);
        fs.writeFile(filePath, csv, function (err) {
          if (err) {
            return res.json(err).status(500);
          }
          return res.json(req.protocol + '://' + req.get('host')+"/exports/csv-" +"screeningSevika"+ ".csv"
           
          );
        });
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  }


const createBPRedcsv = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          "Validation Error.",
          errors.array()
        );
      } else {
        // citizendetails all data csv
        let screeningcases = await ScreeningCaseModel.ScreeningCase.aggregate([
       
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
              localField: "screenerId",
              from: "screeners",
              foreignField: "screenerId",
              as: "screeners",
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
          
          { $match:{$and:[ { ngoId: req.body.ngoId} ,{severity_bp:2}]}},
        
        ]);

        let screenerArr = [];
        if(screeningcases.length>0){
          for(let i=0;i<screeningcases.length;i++){
            let row = screeningcases[i];
            let elemetObj = {};
            elemetObj.screenerfullname = "";
            elemetObj.issubscreener=""
            if(row.screeners && row.screeners.length>0){   
              elemetObj.screenerfullname = row.screeners[0].firstName+" "+row.screeners[0].lastName; 
              elemetObj.issubscreener = row.issubscreener;  
            }  
            
            elemetObj.screenerId = "'"+row.screenerId+"'";
            elemetObj.citizenId = "'"+row.citizenId[row.citizenId.length-1]+" '";
            elemetObj._id = row._id;
            elemetObj.severity_bp = "'"+row.severity_bp+"'";
            elemetObj.severity_spo2 = row.severity_spo2;
            elemetObj.severity_temperature = row.severity_temperature;
            elemetObj.severity_pulse=row.severity_pulse,
           elemetObj.severity_bmi=row.severity_bmi,
           elemetObj.severity_respiratory_rate=row.severity_respiratory_rate,
           elemetObj.severity=row.severity,
           elemetObj.notes=row.notes,
           elemetObj.createdAt=row.createdAt,
          updatedAt=row.updatedAt,
    
           elemetObj.familymembername = "";
            elemetObj.gender = "";
            elemetObj.mobile = "";
            elemetObj.aadhaar = "";
            if(row.citizens && row.citizens.length>0){ 
              let fullname = "";
              for(let k=0;k<row.citizens.length;k++){
                fullname = fullname+" "+row.citizens[k].firstName+" "+row.citizens[k].lastName+",";  
                fullname.replace(/^\,s+/, '');  
              }
              elemetObj.fullname = fullname ;
              //elemetObj.fullname = row.citizens[0].firstName+" "+row.citizens[0].lastName;    
              // elemetObj.gender = row.citizens[0].sex;    
              elemetObj.mobile =row.citizens[0].mobile; 
              elemetObj.aadhaar =row.citizens[0].aadhaar;  
            }  
          
            elemetObj.dateOfBirth = "";    
            elemetObj.address = "";
            if(row.citizendetails && row.citizendetails.length>0){    
              elemetObj.dateOfBirth = row.citizendetails[0].dateOfBirth;    
              elemetObj.address = row.citizendetails[0].address;    
            }
            // if(elemetObj.issubscreener==0){
            screenerArr.push(elemetObj);
            // }
          }
        }
    
        console.log("+++++", screeningcases);
        let csv;
        csv = json2csv(screeningcases, { fieldsscreeningcase });

        const filePath = path.join(__dirname,".." ,"public", "exports", "csv-"+"bpRedReport"+".csv")
        console.log("+++++", screeningcases);
        fs.writeFile(filePath, csv, function (err) {
          if (err) {
            return res.json(err).status(500);
          }
          return res.json(req.protocol + '://' + req.get('host')+"/exports/csv-" +"bpRedReport"+ ".csv"
           
          );
        });
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  }


const createBPAmbercsv = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          "Validation Error.",
          errors.array()
        );
      } else {
        // citizendetails all data csv
        let screeningcases = await ScreeningCaseModel.ScreeningCase.aggregate([
       
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
              localField: "screenerId",
              from: "screeners",
              foreignField: "screenerId",
              as: "screeners",
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
          
          { $match:{$and:[ { ngoId: req.body.ngoId} ,{severity_bp:1}]}},
        
        ]);

        let screenerArr = [];
        if(screeningcases.length>0){
          for(let i=0;i<screeningcases.length;i++){
            let row = screeningcases[i];
            let elemetObj = {};
            elemetObj.screenerfullname = "";
            elemetObj.issubscreener=""
            if(row.screeners && row.screeners.length>0){   
              elemetObj.screenerfullname = row.screeners[0].firstName+" "+row.screeners[0].lastName; 
              elemetObj.issubscreener = row.issubscreener;  
            }  
            
            elemetObj.screenerId = "'"+row.screenerId+"'";
            elemetObj.citizenId = "'"+row.citizenId[row.citizenId.length-1]+" '";
            elemetObj._id = row._id;
            elemetObj.severity_bp = "'"+row.severity_bp+"'";
            elemetObj.severity_spo2 = row.severity_spo2;
            elemetObj.severity_temperature = row.severity_temperature;
            elemetObj.severity_pulse=row.severity_pulse,
           elemetObj.severity_bmi=row.severity_bmi,
           elemetObj.severity_respiratory_rate=row.severity_respiratory_rate,
           elemetObj.severity=row.severity,
           elemetObj.notes=row.notes,
           elemetObj.createdAt=row.createdAt,
          updatedAt=row.updatedAt,
    
           elemetObj.familymembername = "";
            elemetObj.gender = "";
            elemetObj.mobile = "";
            elemetObj.aadhaar = "";
            if(row.citizens && row.citizens.length>0){ 
              let fullname = "";
              for(let k=0;k<row.citizens.length;k++){
                fullname = fullname+" "+row.citizens[k].firstName+" "+row.citizens[k].lastName+",";  
                fullname.replace(/^\,s+/, '');  
              }
              elemetObj.fullname = fullname ;
              //elemetObj.fullname = row.citizens[0].firstName+" "+row.citizens[0].lastName;    
              // elemetObj.gender = row.citizens[0].sex;    
              elemetObj.mobile =row.citizens[0].mobile; 
              elemetObj.aadhaar =row.citizens[0].aadhaar;  
            }  
          
            elemetObj.dateOfBirth = "";    
            elemetObj.address = "";
            if(row.citizendetails && row.citizendetails.length>0){    
              elemetObj.dateOfBirth = row.citizendetails[0].dateOfBirth;    
              elemetObj.address = row.citizendetails[0].address;    
            }
            // if(elemetObj.issubscreener==0){
            screenerArr.push(elemetObj);
            // }
          }
        }
    
        console.log("+++++", screeningcases);
        let csv;
        csv = json2csv(screeningcases, { fieldsscreeningcase });

        const filePath = path.join(__dirname,".." ,"public", "exports", "csv-"+"bpAmberReport"+".csv")
        console.log("+++++", screeningcases);
        fs.writeFile(filePath, csv, function (err) {
          if (err) {
            return res.json(err).status(500);
          }
          return res.json(req.protocol + '://' + req.get('host')+"/exports/csv-" +"bpAmberReport"+ ".csv"
           
          );
        });
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  }


const createBPGreencsv = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          "Validation Error.",
          errors.array()
        );
      } else {
        // citizendetails all data csv
        let screeningcases = await ScreeningCaseModel.ScreeningCase.aggregate([
       
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
              localField: "screenerId",
              from: "screeners",
              foreignField: "screenerId",
              as: "screeners",
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
          
          { $match:{$and:[ { ngoId: req.body.ngoId} ,{severity_bp:0}]}},
        
        ]);

        let screenerArr = [];
        if(screeningcases.length>0){
          for(let i=0;i<screeningcases.length;i++){
            let row = screeningcases[i];
            let elemetObj = {};
            elemetObj.screenerfullname = "";
            elemetObj.issubscreener=""
            if(row.screeners && row.screeners.length>0){   
              elemetObj.screenerfullname = row.screeners[0].firstName+" "+row.screeners[0].lastName; 
              elemetObj.issubscreener = row.issubscreener;  
            }  
            
            elemetObj.screenerId = "'"+row.screenerId+"'";
            elemetObj.citizenId = "'"+row.citizenId[row.citizenId.length-1]+" '";
            elemetObj._id = row._id;
            elemetObj.severity_bp = "'"+row.severity_bp+"'";
            elemetObj.severity_spo2 = row.severity_spo2;
            elemetObj.severity_temperature = row.severity_temperature;
            elemetObj.severity_pulse=row.severity_pulse,
           elemetObj.severity_bmi=row.severity_bmi,
           elemetObj.severity_respiratory_rate=row.severity_respiratory_rate,
           elemetObj.severity=row.severity,
           elemetObj.notes=row.notes,
           elemetObj.createdAt=row.createdAt,
          updatedAt=row.updatedAt,
    
           elemetObj.familymembername = "";
            elemetObj.gender = "";
            elemetObj.mobile = "";
            elemetObj.aadhaar = "";
            if(row.citizens && row.citizens.length>0){ 
              let fullname = "";
              for(let k=0;k<row.citizens.length;k++){
                fullname = fullname+" "+row.citizens[k].firstName+" "+row.citizens[k].lastName+",";  
                fullname.replace(/^\,s+/, '');  
              }
              elemetObj.fullname = fullname ;
              //elemetObj.fullname = row.citizens[0].firstName+" "+row.citizens[0].lastName;    
              // elemetObj.gender = row.citizens[0].sex;    
              elemetObj.mobile =row.citizens[0].mobile; 
              elemetObj.aadhaar =row.citizens[0].aadhaar;  
            }  
          
            elemetObj.dateOfBirth = "";    
            elemetObj.address = "";
            if(row.citizendetails && row.citizendetails.length>0){    
              elemetObj.dateOfBirth = row.citizendetails[0].dateOfBirth;    
              elemetObj.address = row.citizendetails[0].address;    
            }
            // if(elemetObj.issubscreener==0){
            screenerArr.push(elemetObj);
            // }
          }
        }
    
        console.log("+++++", screeningcases);
        let csv;
        csv = json2csv(screeningcases, { fieldsscreeningcase });

        const filePath = path.join(__dirname,".." ,"public", "exports", "csv-"+"bpGreenReport"+".csv")
        console.log("+++++", screeningcases);
        fs.writeFile(filePath, csv, function (err) {
          if (err) {
            return res.json(err).status(500);
          }
          return res.json(req.protocol + '://' + req.get('host')+"/exports/csv-" +"bpGreenReport"+ ".csv"
           
          );
        });
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  }


const createTempGreencsv=async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          "Validation Error.",
          errors.array()
        );
      } else {
        // citizendetails all data csv
        let screeningcases = await ScreeningCaseModel.ScreeningCase.aggregate([
       
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
              localField: "screenerId",
              from: "screeners",
              foreignField: "screenerId",
              as: "screeners",
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
          
          { $match:{$and:[ { ngoId: req.body.ngoId} ,{severity_temperature:0}]}},
        
        ]);

        let screenerArr = [];
        if(screeningcases.length>0){
          for(let i=0;i<screeningcases.length;i++){
            let row = screeningcases[i];
            let elemetObj = {};
            elemetObj.screenerfullname = "";
            elemetObj.issubscreener=""
            if(row.screeners && row.screeners.length>0){   
              elemetObj.screenerfullname = row.screeners[0].firstName+" "+row.screeners[0].lastName; 
              elemetObj.issubscreener = row.issubscreener;  
            }  
            
            elemetObj.screenerId = "'"+row.screenerId+"'";
            elemetObj.citizenId = "'"+row.citizenId[row.citizenId.length-1]+" '";
            elemetObj._id = row._id;
            elemetObj.severity_bp = "'"+row.severity_bp+"'";
            elemetObj.severity_spo2 = row.severity_spo2;
            elemetObj.severity_temperature = row.severity_temperature;
            elemetObj.severity_pulse=row.severity_pulse,
           elemetObj.severity_bmi=row.severity_bmi,
           elemetObj.severity_respiratory_rate=row.severity_respiratory_rate,
           elemetObj.severity=row.severity,
           elemetObj.notes=row.notes,
           elemetObj.createdAt=row.createdAt,
          updatedAt=row.updatedAt,
    
           elemetObj.familymembername = "";
            elemetObj.gender = "";
            elemetObj.mobile = "";
            elemetObj.aadhaar = "";
            if(row.citizens && row.citizens.length>0){ 
              let fullname = "";
              for(let k=0;k<row.citizens.length;k++){
                fullname = fullname+" "+row.citizens[k].firstName+" "+row.citizens[k].lastName+",";  
                fullname.replace(/^\,s+/, '');  
              }
              elemetObj.fullname = fullname ;
              //elemetObj.fullname = row.citizens[0].firstName+" "+row.citizens[0].lastName;    
              // elemetObj.gender = row.citizens[0].sex;    
              elemetObj.mobile =row.citizens[0].mobile; 
              elemetObj.aadhaar =row.citizens[0].aadhaar;  
            }  
          
            elemetObj.dateOfBirth = "";    
            elemetObj.address = "";
            if(row.citizendetails && row.citizendetails.length>0){    
              elemetObj.dateOfBirth = row.citizendetails[0].dateOfBirth;    
              elemetObj.address = row.citizendetails[0].address;    
            }
            // if(elemetObj.issubscreener==0){
            screenerArr.push(elemetObj);
            // }
          }
        }
    
        console.log("+++++", screeningcases);
        let csv;
        csv = json2csv(screeningcases, { fieldsscreeningcase });

        const filePath = path.join(__dirname,".." ,"public", "exports", "csv-"+"temperatureGreenReport"+".csv")
        console.log("+++++", screeningcases);
        fs.writeFile(filePath, csv, function (err) {
          if (err) {
            return res.json(err).status(500);
          }
          return res.json(req.protocol + '://' + req.get('host')+"/exports/csv-" +"temperatureGreenReport"+ ".csv"
           
          );
        });
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  }

const createTempAmbercsv=async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          "Validation Error.",
          errors.array()
        );
      } else {
        // citizendetails all data csv
        let screeningcases = await ScreeningCaseModel.ScreeningCase.aggregate([
       
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
              localField: "screenerId",
              from: "screeners",
              foreignField: "screenerId",
              as: "screeners",
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
          
          { $match:{$and:[ { ngoId: req.body.ngoId} ]}},
        
        ]);

        let screenerArr = [];
        if(screeningcases.length>0){
          for(let i=0;i<screeningcases.length;i++){
            let row = screeningcases[i];
            let elemetObj = {};
            elemetObj.screenerfullname = "";
            elemetObj.issubscreener=""
            if(row.screeners && row.screeners.length>0){   
              elemetObj.screenerfullname = row.screeners[0].firstName+" "+row.screeners[0].lastName; 
              elemetObj.issubscreener = row.issubscreener;  
            }  
            
            elemetObj.screenerId = "'"+row.screenerId+"'";
            elemetObj.citizenId = "'"+row.citizenId[row.citizenId.length-1]+" '";
            elemetObj._id = row._id;
            elemetObj.severity_bp = "'"+row.severity_bp+"'";
            elemetObj.severity_spo2 = row.severity_spo2;
            elemetObj.severity_temperature = row.severity_temperature;
            elemetObj.severity_pulse=row.severity_pulse,
           elemetObj.severity_bmi=row.severity_bmi,
           elemetObj.severity_respiratory_rate=row.severity_respiratory_rate,
           elemetObj.severity=row.severity,
           elemetObj.notes=row.notes,
           elemetObj.createdAt=row.createdAt,
          updatedAt=row.updatedAt,
    
           elemetObj.familymembername = "";
            elemetObj.gender = "";
            elemetObj.mobile = "";
            elemetObj.aadhaar = "";
            if(row.citizens && row.citizens.length>0){ 
              let fullname = "";
              for(let k=0;k<row.citizens.length;k++){
                fullname = fullname+" "+row.citizens[k].firstName+" "+row.citizens[k].lastName+",";  
                fullname.replace(/^\,s+/, '');  
              }
              elemetObj.fullname = fullname ;
              //elemetObj.fullname = row.citizens[0].firstName+" "+row.citizens[0].lastName;    
              // elemetObj.gender = row.citizens[0].sex;    
              elemetObj.mobile =row.citizens[0].mobile; 
              elemetObj.aadhaar =row.citizens[0].aadhaar;  
            }  
          
            elemetObj.dateOfBirth = "";    
            elemetObj.address = "";
            if(row.citizendetails && row.citizendetails.length>0){    
              elemetObj.dateOfBirth = row.citizendetails[0].dateOfBirth;    
              elemetObj.address = row.citizendetails[0].address;    
            }
            // if(elemetObj.issubscreener==0){
            screenerArr.push(elemetObj);
            // }
          }
        }
    
        console.log("+++++", screeningcases);
        let csv;
        csv = json2csv(screeningcases, { fieldsscreeningcase });

        const filePath = path.join(__dirname,".." ,"public", "exports", "csv-"+"temperatureAmberReport"+".csv")
        console.log("+++++", screeningcases);
        fs.writeFile(filePath, csv, function (err) {
          if (err) {
            return res.json(err).status(500);
          }
          return res.json(req.protocol + '://' + req.get('host')+"/exports/csv-" +"temperatureAmberReport"+ ".csv"
           
          );
        });
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  }


const createTempRedcsv=async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          "Validation Error.",
          errors.array()
        );
      } else {
        // citizendetails all data csv
        let screeningcases = await ScreeningCaseModel.ScreeningCase.aggregate([
       
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
              localField: "screenerId",
              from: "screeners",
              foreignField: "screenerId",
              as: "screeners",
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
          
          { $match:{$and:[ { ngoId: req.body.ngoId} ]}},
        
        ]);

        let screenerArr = [];
        if(screeningcases.length>0){
          for(let i=0;i<screeningcases.length;i++){
            let row = screeningcases[i];
            let elemetObj = {};
            elemetObj.screenerfullname = "";
            elemetObj.issubscreener=""
            if(row.screeners && row.screeners.length>0){   
              elemetObj.screenerfullname = row.screeners[0].firstName+" "+row.screeners[0].lastName; 
              elemetObj.issubscreener = row.issubscreener;  
            }  
            
            elemetObj.screenerId = "'"+row.screenerId+"'";
            elemetObj.citizenId = "'"+row.citizenId[row.citizenId.length-1]+" '";
            elemetObj._id = row._id;
            elemetObj.severity_bp = "'"+row.severity_bp+"'";
            elemetObj.severity_spo2 = row.severity_spo2;
            elemetObj.severity_temperature = row.severity_temperature;
            elemetObj.severity_pulse=row.severity_pulse,
           elemetObj.severity_bmi=row.severity_bmi,
           elemetObj.severity_respiratory_rate=row.severity_respiratory_rate,
           elemetObj.severity=row.severity,
           elemetObj.notes=row.notes,
           elemetObj.createdAt=row.createdAt,
          updatedAt=row.updatedAt,
    
           elemetObj.familymembername = "";
            elemetObj.gender = "";
            elemetObj.mobile = "";
            elemetObj.aadhaar = "";
            if(row.citizens && row.citizens.length>0){ 
              let fullname = "";
              for(let k=0;k<row.citizens.length;k++){
                fullname = fullname+" "+row.citizens[k].firstName+" "+row.citizens[k].lastName+",";  
                fullname.replace(/^\,s+/, '');  
              }
              elemetObj.fullname = fullname ;
              //elemetObj.fullname = row.citizens[0].firstName+" "+row.citizens[0].lastName;    
              // elemetObj.gender = row.citizens[0].sex;    
              elemetObj.mobile =row.citizens[0].mobile; 
              elemetObj.aadhaar =row.citizens[0].aadhaar;  
            }  
          
            elemetObj.dateOfBirth = "";    
            elemetObj.address = "";
            if(row.citizendetails && row.citizendetails.length>0){    
              elemetObj.dateOfBirth = row.citizendetails[0].dateOfBirth;    
              elemetObj.address = row.citizendetails[0].address;    
            }
            // if(elemetObj.issubscreener==0){
            screenerArr.push(elemetObj);
            // }
          }
        }
    
        console.log("+++++", screeningcases);
        let csv;
        csv = json2csv(screeningcases, { fieldsscreeningcase });

        const filePath = path.join(__dirname,".." ,"public", "exports", "csv-"+"temperatureRedReport"+".csv")
        console.log("+++++", screeningcases);
        fs.writeFile(filePath, csv, function (err) {
          if (err) {
            return res.json(err).status(500);
          }
          return res.json(req.protocol + '://' + req.get('host')+"/exports/csv-" +"temperatureRedReport"+ ".csv"
           
          );
        });
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  }


const createSpoRedcsv =async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          "Validation Error.",
          errors.array()
        );
      } else {
        // citizendetails all data csv
        let screeningcases = await ScreeningCaseModel.ScreeningCase.aggregate([
       
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
              localField: "screenerId",
              from: "screeners",
              foreignField: "screenerId",
              as: "screeners",
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
          
          { $match:{$and:[ { ngoId: req.body.ngoId} ,{severity_spo2:2}]}},
        
        ]);

        let screenerArr = [];
        if(screeningcases.length>0){
          for(let i=0;i<screeningcases.length;i++){
            let row = screeningcases[i];
            let elemetObj = {};
            elemetObj.screenerfullname = "";
            elemetObj.issubscreener=""
            if(row.screeners && row.screeners.length>0){   
              elemetObj.screenerfullname = row.screeners[0].firstName+" "+row.screeners[0].lastName; 
              elemetObj.issubscreener = row.issubscreener;  
            }  
            
            elemetObj.screenerId = "'"+row.screenerId+"'";
            elemetObj.citizenId = "'"+row.citizenId[row.citizenId.length-1]+" '";
            elemetObj._id = row._id;
            elemetObj.severity_bp = "'"+row.severity_bp+"'";
            elemetObj.severity_spo2 = row.severity_spo2;
            elemetObj.severity_temperature = row.severity_temperature;
            elemetObj.severity_pulse=row.severity_pulse,
           elemetObj.severity_bmi=row.severity_bmi,
           elemetObj.severity_respiratory_rate=row.severity_respiratory_rate,
           elemetObj.severity=row.severity,
           elemetObj.notes=row.notes,
           elemetObj.createdAt=row.createdAt,
          updatedAt=row.updatedAt,
    
           elemetObj.familymembername = "";
            elemetObj.gender = "";
            elemetObj.mobile = "";
            elemetObj.aadhaar = "";
            if(row.citizens && row.citizens.length>0){ 
              let fullname = "";
              for(let k=0;k<row.citizens.length;k++){
                fullname = fullname+" "+row.citizens[k].firstName+" "+row.citizens[k].lastName+",";  
                fullname.replace(/^\,s+/, '');  
              }
              elemetObj.fullname = fullname ;
              //elemetObj.fullname = row.citizens[0].firstName+" "+row.citizens[0].lastName;    
              // elemetObj.gender = row.citizens[0].sex;    
              elemetObj.mobile =row.citizens[0].mobile; 
              elemetObj.aadhaar =row.citizens[0].aadhaar;  
            }  
          
            elemetObj.dateOfBirth = "";    
            elemetObj.address = "";
            if(row.citizendetails && row.citizendetails.length>0){    
              elemetObj.dateOfBirth = row.citizendetails[0].dateOfBirth;    
              elemetObj.address = row.citizendetails[0].address;    
            }
            // if(elemetObj.issubscreener==0){
            screenerArr.push(elemetObj);
            // }
          }
        }
    
        console.log("+++++", screeningcases);
        let csv;
        csv = json2csv(screeningcases, { fieldsscreeningcase });

        const filePath = path.join(__dirname,".." ,"public", "exports", "csv-"+"spo2RedReport"+".csv")
        console.log("+++++", screeningcases);
        fs.writeFile(filePath, csv, function (err) {
          if (err) {
            return res.json(err).status(500);
          }
          return res.json(req.protocol + '://' + req.get('host')+"/exports/csv-" +"spo2RedReport"+ ".csv"
           
          );
        });
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  }

const createSpoAmbercsv=async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          "Validation Error.",
          errors.array()
        );
      } else {
        // citizendetails all data csv
        let screeningcases = await ScreeningCaseModel.ScreeningCase.aggregate([
       
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
              localField: "screenerId",
              from: "screeners",
              foreignField: "screenerId",
              as: "screeners",
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
          
          { $match:{$and:[ { ngoId: req.body.ngoId}]}},
        
        ]);

        let screenerArr = [];
        if(screeningcases.length>0){
          for(let i=0;i<screeningcases.length;i++){
            let row = screeningcases[i];
            let elemetObj = {};
            elemetObj.screenerfullname = "";
            elemetObj.issubscreener=""
            if(row.screeners && row.screeners.length>0){   
              elemetObj.screenerfullname = row.screeners[0].firstName+" "+row.screeners[0].lastName; 
              elemetObj.issubscreener = row.issubscreener;  
            }  
            
            elemetObj.screenerId = "'"+row.screenerId+"'";
            elemetObj.citizenId = "'"+row.citizenId[row.citizenId.length-1]+" '";
            elemetObj._id = row._id;
            elemetObj.severity_bp = "'"+row.severity_bp+"'";
            elemetObj.severity_spo2 = row.severity_spo2;
            elemetObj.severity_temperature = row.severity_temperature;
            elemetObj.severity_pulse=row.severity_pulse,
           elemetObj.severity_bmi=row.severity_bmi,
           elemetObj.severity_respiratory_rate=row.severity_respiratory_rate,
           elemetObj.severity=row.severity,
           elemetObj.notes=row.notes,
           elemetObj.createdAt=row.createdAt,
          updatedAt=row.updatedAt,
    
           elemetObj.familymembername = "";
            elemetObj.gender = "";
            elemetObj.mobile = "";
            elemetObj.aadhaar = "";
            if(row.citizens && row.citizens.length>0){ 
              let fullname = "";
              for(let k=0;k<row.citizens.length;k++){
                fullname = fullname+" "+row.citizens[k].firstName+" "+row.citizens[k].lastName+",";  
                fullname.replace(/^\,s+/, '');  
              }
              elemetObj.fullname = fullname ;
              //elemetObj.fullname = row.citizens[0].firstName+" "+row.citizens[0].lastName;    
              // elemetObj.gender = row.citizens[0].sex;    
              elemetObj.mobile =row.citizens[0].mobile; 
              elemetObj.aadhaar =row.citizens[0].aadhaar;  
            }  
          
            elemetObj.dateOfBirth = "";    
            elemetObj.address = "";
            if(row.citizendetails && row.citizendetails.length>0){    
              elemetObj.dateOfBirth = row.citizendetails[0].dateOfBirth;    
              elemetObj.address = row.citizendetails[0].address;    
            }
            // if(elemetObj.issubscreener==0){
            screenerArr.push(elemetObj);
            // }
          }
        }
    
        console.log("+++++", screeningcases);
        let csv;
        csv = json2csv(screeningcases, { fieldsscreeningcase });

        const filePath = path.join(__dirname,".." ,"public", "exports", "csv-"+"spo2AmberReport"+".csv")
        console.log("+++++", screeningcases);
        fs.writeFile(filePath, csv, function (err) {
          if (err) {
            return res.json(err).status(500);
          }
          return res.json(req.protocol + '://' + req.get('host')+"/exports/csv-" +"spo2AmberReport"+ ".csv"
           
          );
        });
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  }


const createSpoGreencsv =  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          "Validation Error.",
          errors.array()
        );
      } else {
        // citizendetails all data csv
        let screeningcases = await ScreeningCaseModel.ScreeningCase.aggregate([
       
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
              localField: "screenerId",
              from: "screeners",
              foreignField: "screenerId",
              as: "screeners",
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
          
          { $match:{$and:[ { ngoId: req.body.ngoId} ]}},
        
        ]);

        let screenerArr = [];
        if(screeningcases.length>0){
          for(let i=0;i<screeningcases.length;i++){
            let row = screeningcases[i];
            let elemetObj = {};
            elemetObj.screenerfullname = "";
            elemetObj.issubscreener=""
            if(row.screeners && row.screeners.length>0){   
              elemetObj.screenerfullname = row.screeners[0].firstName+" "+row.screeners[0].lastName; 
              elemetObj.issubscreener = row.issubscreener;  
            }  
            
            elemetObj.screenerId = "'"+row.screenerId+"'";
            elemetObj.citizenId = "'"+row.citizenId[row.citizenId.length-1]+" '";
            elemetObj._id = row._id;
            elemetObj.severity_bp = "'"+row.severity_bp+"'";
            elemetObj.severity_spo2 = row.severity_spo2;
            elemetObj.severity_temperature = row.severity_temperature;
            elemetObj.severity_pulse=row.severity_pulse,
           elemetObj.severity_bmi=row.severity_bmi,
           elemetObj.severity_respiratory_rate=row.severity_respiratory_rate,
           elemetObj.severity=row.severity,
           elemetObj.notes=row.notes,
           elemetObj.createdAt=row.createdAt,
          updatedAt=row.updatedAt,
    
           elemetObj.familymembername = "";
            elemetObj.gender = "";
            elemetObj.mobile = "";
            elemetObj.aadhaar = "";
            if(row.citizens && row.citizens.length>0){ 
              let fullname = "";
              for(let k=0;k<row.citizens.length;k++){
                fullname = fullname+" "+row.citizens[k].firstName+" "+row.citizens[k].lastName+",";  
                fullname.replace(/^\,s+/, '');  
              }
              elemetObj.fullname = fullname ;
              //elemetObj.fullname = row.citizens[0].firstName+" "+row.citizens[0].lastName;    
              // elemetObj.gender = row.citizens[0].sex;    
              elemetObj.mobile =row.citizens[0].mobile; 
              elemetObj.aadhaar =row.citizens[0].aadhaar;  
            }  
          
            elemetObj.dateOfBirth = "";    
            elemetObj.address = "";
            if(row.citizendetails && row.citizendetails.length>0){    
              elemetObj.dateOfBirth = row.citizendetails[0].dateOfBirth;    
              elemetObj.address = row.citizendetails[0].address;    
            }
            // if(elemetObj.issubscreener==0){
            screenerArr.push(elemetObj);
            // }
          }
        }
    
        console.log("+++++", screeningcases);
        let csv;
        csv = json2csv(screeningcases, { fieldsscreeningcase });

        const filePath = path.join(__dirname,".." ,"public", "exports", "csv-"+"spo2GreenReport"+".csv")
        console.log("+++++", screeningcases);
        fs.writeFile(filePath, csv, function (err) {
          if (err) {
            return res.json(err).status(500);
          }
          return res.json(req.protocol + '://' + req.get('host')+"/exports/csv-" +"spo2GreenReport"+ ".csv"
           
          );
        });
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  }


const createPulseRedcsv = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          "Validation Error.",
          errors.array()
        );
      } else {
        // citizendetails all data csv
        let screeningcases = await ScreeningCaseModel.ScreeningCase.aggregate([
       
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
              localField: "screenerId",
              from: "screeners",
              foreignField: "screenerId",
              as: "screeners",
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
          
          { $match:{$and:[ { ngoId: req.body.ngoId} ]}},
        
        ]);

        let screenerArr = [];
        if(screeningcases.length>0){
          for(let i=0;i<screeningcases.length;i++){
            let row = screeningcases[i];
            let elemetObj = {};
            elemetObj.screenerfullname = "";
            elemetObj.issubscreener=""
            if(row.screeners && row.screeners.length>0){   
              elemetObj.screenerfullname = row.screeners[0].firstName+" "+row.screeners[0].lastName; 
              elemetObj.issubscreener = row.issubscreener;  
            }  
            
            elemetObj.screenerId = "'"+row.screenerId+"'";
            elemetObj.citizenId = "'"+row.citizenId[row.citizenId.length-1]+" '";
            elemetObj._id = row._id;
            elemetObj.severity_bp = "'"+row.severity_bp+"'";
            elemetObj.severity_spo2 = row.severity_spo2;
            elemetObj.severity_temperature = row.severity_temperature;
            elemetObj.severity_pulse=row.severity_pulse,
           elemetObj.severity_bmi=row.severity_bmi,
           elemetObj.severity_respiratory_rate=row.severity_respiratory_rate,
           elemetObj.severity=row.severity,
           elemetObj.notes=row.notes,
           elemetObj.createdAt=row.createdAt,
          updatedAt=row.updatedAt,
    
          
           elemetObj.familymembername = "";
            elemetObj.gender = "";
            elemetObj.mobile = "";
            elemetObj.aadhaar = "";
            if(row.citizens && row.citizens.length>0){ 
              let fullname = "";
              for(let k=0;k<row.citizens.length;k++){
                fullname = fullname+" "+row.citizens[k].firstName+" "+row.citizens[k].lastName+",";  
                fullname.replace(/^\,s+/, '');  
              }
              elemetObj.fullname = fullname ;
              //elemetObj.fullname = row.citizens[0].firstName+" "+row.citizens[0].lastName;    
              // elemetObj.gender = row.citizens[0].sex;    
              elemetObj.mobile =row.citizens[0].mobile; 
              elemetObj.aadhaar =row.citizens[0].aadhaar;  
            }  
          
            elemetObj.dateOfBirth = "";    
            elemetObj.address = "";
            if(row.citizendetails && row.citizendetails.length>0){    
              elemetObj.dateOfBirth = row.citizendetails[0].dateOfBirth;    
              elemetObj.address = row.citizendetails[0].address;    
            }
            // if(elemetObj.issubscreener==0){
            screenerArr.push(elemetObj);
            // }
          }
        }
    
        console.log("+++++", screeningcases);
        let csv;
        csv = json2csv(screeningcases, { fieldsscreeningcase });

        const filePath = path.join(__dirname,".." ,"public", "exports", "csv-"+"PulseRedReport"+".csv")
        console.log("+++++", screeningcases);
        fs.writeFile(filePath, csv, function (err) {
          if (err) {
            return res.json(err).status(500);
          }
          return res.json(req.protocol + '://' + req.get('host')+"/exports/csv-" +"PulseRedReport"+ ".csv"
           
          );
        });
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  }

const createPulseAmbercsv = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          "Validation Error.",
          errors.array()
        );
      } else {
        // citizendetails all data csv
        let screeningcases = await ScreeningCaseModel.ScreeningCase.aggregate([
       
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
              localField: "screenerId",
              from: "screeners",
              foreignField: "screenerId",
              as: "screeners",
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
          
          { $match:{$and:[ { ngoId: req.body.ngoId} ]}},
        
        ]);

        let screenerArr = [];
        if(screeningcases.length>0){
          for(let i=0;i<screeningcases.length;i++){
            let row = screeningcases[i];
            let elemetObj = {};
            elemetObj.screenerfullname = "";
            elemetObj.issubscreener=""
            if(row.screeners && row.screeners.length>0){   
              elemetObj.screenerfullname = row.screeners[0].firstName+" "+row.screeners[0].lastName; 
              elemetObj.issubscreener = row.issubscreener;  
            }  
            
            elemetObj.screenerId = "'"+row.screenerId+"'";
            elemetObj.citizenId = "'"+row.citizenId[row.citizenId.length-1]+" '";
            elemetObj._id = row._id;
            elemetObj.severity_bp = "'"+row.severity_bp+"'";
            elemetObj.severity_spo2 = row.severity_spo2;
            elemetObj.severity_temperature = row.severity_temperature;
            elemetObj.severity_pulse=row.severity_pulse,
           elemetObj.severity_bmi=row.severity_bmi,
           elemetObj.severity_respiratory_rate=row.severity_respiratory_rate,
           elemetObj.severity=row.severity,
           elemetObj.notes=row.notes,
           elemetObj.createdAt=row.createdAt,
          updatedAt=row.updatedAt,
    
           elemetObj.familymembername = "";
            elemetObj.gender = "";
            elemetObj.mobile = "";
            elemetObj.aadhaar = "";
            if(row.citizens && row.citizens.length>0){ 
              let fullname = "";
              for(let k=0;k<row.citizens.length;k++){
                fullname = fullname+" "+row.citizens[k].firstName+" "+row.citizens[k].lastName+",";  
                fullname.replace(/^\,s+/, '');  
              }
              elemetObj.fullname = fullname ;
              //elemetObj.fullname = row.citizens[0].firstName+" "+row.citizens[0].lastName;    
              // elemetObj.gender = row.citizens[0].sex;    
              elemetObj.mobile =row.citizens[0].mobile; 
              elemetObj.aadhaar =row.citizens[0].aadhaar;  
            }  
          
            elemetObj.dateOfBirth = "";    
            elemetObj.address = "";
            if(row.citizendetails && row.citizendetails.length>0){    
              elemetObj.dateOfBirth = row.citizendetails[0].dateOfBirth;    
              elemetObj.address = row.citizendetails[0].address;    
            }
            // if(elemetObj.issubscreener==0){
            screenerArr.push(elemetObj);
            // }
          }
        }
    
        console.log("+++++", screeningcases);
        let csv;
        csv = json2csv(screeningcases, { fieldsscreeningcase });

        const filePath = path.join(__dirname,".." ,"public", "exports", "csv-"+"PulseAmberReport"+".csv")
        console.log("+++++", screeningcases);
        fs.writeFile(filePath, csv, function (err) {
          if (err) {
            return res.json(err).status(500);
          }
          return res.json(req.protocol + '://' + req.get('host')+"/exports/csv-" +"PulseAmberReport"+ ".csv"
           
          );
        });
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  }


const createPulseGreencsv = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          "Validation Error.",
          errors.array()
        );
      } else {
        // citizendetails all data csv
        let screeningcases = await ScreeningCaseModel.ScreeningCase.aggregate([
       
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
              localField: "screenerId",
              from: "screeners",
              foreignField: "screenerId",
              as: "screeners",
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
          
          { $match:{$and:[ { ngoId: req.body.ngoId} ]}},
        
        ]);

        let screenerArr = [];
        if(screeningcases.length>0){
          for(let i=0;i<screeningcases.length;i++){
            let row = screeningcases[i];
            let elemetObj = {};
            elemetObj.screenerfullname = "";
            elemetObj.issubscreener=""
            if(row.screeners && row.screeners.length>0){   
              elemetObj.screenerfullname = row.screeners[0].firstName+" "+row.screeners[0].lastName; 
              elemetObj.issubscreener = row.issubscreener;  
            }  
            
            elemetObj.screenerId = "'"+row.screenerId+"'";
            elemetObj.citizenId = "'"+row.citizenId[row.citizenId.length-1]+" '";
            elemetObj._id = row._id;
            elemetObj.severity_bp = "'"+row.severity_bp+"'";
            elemetObj.severity_spo2 = row.severity_spo2;
            elemetObj.severity_temperature = row.severity_temperature;
            elemetObj.severity_pulse=row.severity_pulse,
           elemetObj.severity_bmi=row.severity_bmi,
           elemetObj.severity_respiratory_rate=row.severity_respiratory_rate,
           elemetObj.severity=row.severity,
           elemetObj.notes=row.notes,
           elemetObj.createdAt=row.createdAt,
          updatedAt=row.updatedAt,
    
           elemetObj.familymembername = "";
            elemetObj.gender = "";
            elemetObj.mobile = "";
            elemetObj.aadhaar = "";
            if(row.citizens && row.citizens.length>0){ 
              let fullname = "";
              for(let k=0;k<row.citizens.length;k++){
                fullname = fullname+" "+row.citizens[k].firstName+" "+row.citizens[k].lastName+",";  
                fullname.replace(/^\,s+/, '');  
              }
              elemetObj.fullname = fullname ;
              //elemetObj.fullname = row.citizens[0].firstName+" "+row.citizens[0].lastName;    
              // elemetObj.gender = row.citizens[0].sex;    
              elemetObj.mobile =row.citizens[0].mobile; 
              elemetObj.aadhaar =row.citizens[0].aadhaar;  
            }  
          
            elemetObj.dateOfBirth = "";    
            elemetObj.address = "";
            if(row.citizendetails && row.citizendetails.length>0){    
              elemetObj.dateOfBirth = row.citizendetails[0].dateOfBirth;    
              elemetObj.address = row.citizendetails[0].address;    
            }
            // if(elemetObj.issubscreener==0){
            screenerArr.push(elemetObj);
            // }
          }
        }
    
        console.log("+++++", screeningcases);
        let csv;
        csv = json2csv(screeningcases, { fieldsscreeningcase });

        const filePath = path.join(__dirname,".." ,"public", "exports", "csv-"+"pulseGreenReport"+".csv")
        console.log("+++++", screeningcases);
        fs.writeFile(filePath, csv, function (err) {
          if (err) {
            return res.json(err).status(500);
          }
          return res.json(req.protocol + '://' + req.get('host')+"/exports/csv-" +"pulseGreenReport"+ ".csv"
           
          );
        });
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  }


const createbmiRedcsv = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          "Validation Error.",
          errors.array()
        );
      } else {
        // citizendetails all data csv
        let screeningcases = await ScreeningCaseModel.ScreeningCase.aggregate([
       
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
              localField: "screenerId",
              from: "screeners",
              foreignField: "screenerId",
              as: "screeners",
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
          
          { $match:{$and:[ { ngoId: req.body.ngoId}]}},
        
        ]);

        let screenerArr = [];
        if(screeningcases.length>0){
          for(let i=0;i<screeningcases.length;i++){
            let row = screeningcases[i];
            let elemetObj = {};
            elemetObj.screenerfullname = "";
            elemetObj.issubscreener=""
            if(row.screeners && row.screeners.length>0){   
              elemetObj.screenerfullname = row.screeners[0].firstName+" "+row.screeners[0].lastName; 
              elemetObj.issubscreener = row.issubscreener;  
            }  
            
            elemetObj.screenerId = "'"+row.screenerId+"'";
            elemetObj.citizenId = "'"+row.citizenId[row.citizenId.length-1]+" '";
            elemetObj._id = row._id;
            elemetObj.severity_bp = "'"+row.severity_bp+"'";
            elemetObj.severity_spo2 = row.severity_spo2;
            elemetObj.severity_temperature = row.severity_temperature;
            elemetObj.severity_pulse=row.severity_pulse,
           elemetObj.severity_bmi=row.severity_bmi,
           elemetObj.severity_respiratory_rate=row.severity_respiratory_rate,
           elemetObj.severity=row.severity,
           elemetObj.notes=row.notes,
           elemetObj.createdAt=row.createdAt,
          updatedAt=row.updatedAt,
    
           elemetObj.familymembername = "";
            elemetObj.gender = "";
            elemetObj.mobile = "";
            elemetObj.aadhaar = "";
            if(row.citizens && row.citizens.length>0){ 
              let fullname = "";
              for(let k=0;k<row.citizens.length;k++){
                fullname = fullname+" "+row.citizens[k].firstName+" "+row.citizens[k].lastName+",";  
                fullname.replace(/^\,s+/, '');  
              }
              elemetObj.fullname = fullname ;
              //elemetObj.fullname = row.citizens[0].firstName+" "+row.citizens[0].lastName;    
              // elemetObj.gender = row.citizens[0].sex;    
              elemetObj.mobile =row.citizens[0].mobile; 
              elemetObj.aadhaar =row.citizens[0].aadhaar;  
            }  
          
            elemetObj.dateOfBirth = "";    
            elemetObj.address = "";
            if(row.citizendetails && row.citizendetails.length>0){    
              elemetObj.dateOfBirth = row.citizendetails[0].dateOfBirth;    
              elemetObj.address = row.citizendetails[0].address;    
            }
            // if(elemetObj.issubscreener==0){
            screenerArr.push(elemetObj);
            // }
          }
        }
    
        console.log("+++++", screeningcases);
        let csv;
        csv = json2csv(screeningcases, { fieldsscreeningcase });

        const filePath = path.join(__dirname,".." ,"public", "exports", "csv-"+"bmiRedReport"+".csv")
        console.log("+++++", screeningcases);
        fs.writeFile(filePath, csv, function (err) {
          if (err) {
            return res.json(err).status(500);
          }
          return res.json(req.protocol + '://' + req.get('host')+"/exports/csv-" +"bmiRedReport"+ ".csv"
           
          );
        });
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  }

const createbmiAmbercsv = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          "Validation Error.",
          errors.array()
        );
      } else {
        // citizendetails all data csv
        let screeningcases = await ScreeningCaseModel.ScreeningCase.aggregate([
       
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
              localField: "screenerId",
              from: "screeners",
              foreignField: "screenerId",
              as: "screeners",
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
          
          { $match:{$and:[ { ngoId: req.body.ngoId} ,{severity_bmi:1}]}},
        
        ]);

        let screenerArr = [];
        if(screeningcases.length>0){
          for(let i=0;i<screeningcases.length;i++){
            let row = screeningcases[i];
            let elemetObj = {};
            elemetObj.screenerfullname = "";
            elemetObj.issubscreener=""
            if(row.screeners && row.screeners.length>0){   
              elemetObj.screenerfullname = row.screeners[0].firstName+" "+row.screeners[0].lastName; 
              elemetObj.issubscreener = row.issubscreener;  
            }  
            
            elemetObj.screenerId = "'"+row.screenerId+"'";
            elemetObj.citizenId = "'"+row.citizenId[row.citizenId.length-1]+" '";
            elemetObj._id = row._id;
            elemetObj.severity_bp = "'"+row.severity_bp+"'";
            elemetObj.severity_spo2 = row.severity_spo2;
            elemetObj.severity_temperature = row.severity_temperature;
            elemetObj.severity_pulse=row.severity_pulse,
           elemetObj.severity_bmi=row.severity_bmi,
           elemetObj.severity_respiratory_rate=row.severity_respiratory_rate,
           elemetObj.severity=row.severity,
           elemetObj.notes=row.notes,
           elemetObj.createdAt=row.createdAt,
          updatedAt=row.updatedAt,
    
           elemetObj.familymembername = "";
            elemetObj.gender = "";
            elemetObj.mobile = "";
            elemetObj.aadhaar = "";
            if(row.citizens && row.citizens.length>0){ 
              let fullname = "";
              for(let k=0;k<row.citizens.length;k++){
                fullname = fullname+" "+row.citizens[k].firstName+" "+row.citizens[k].lastName+",";  
                fullname.replace(/^\,s+/, '');  
              }
              elemetObj.fullname = fullname ;
              //elemetObj.fullname = row.citizens[0].firstName+" "+row.citizens[0].lastName;    
              // elemetObj.gender = row.citizens[0].sex;    
              elemetObj.mobile =row.citizens[0].mobile; 
              elemetObj.aadhaar =row.citizens[0].aadhaar;  
            }  
          
            elemetObj.dateOfBirth = "";    
            elemetObj.address = "";
            if(row.citizendetails && row.citizendetails.length>0){    
              elemetObj.dateOfBirth = row.citizendetails[0].dateOfBirth;    
              elemetObj.address = row.citizendetails[0].address;    
            }
            // if(elemetObj.issubscreener==0){
            screenerArr.push(elemetObj);
            // }
          }
        }
    
        console.log("+++++", screeningcases);
        let csv;
        csv = json2csv(screeningcases, { fieldsscreeningcase });

        const filePath = path.join(__dirname,".." ,"public", "exports", "csv-"+"bmiAmberReport"+".csv")
        console.log("+++++", screeningcases);
        fs.writeFile(filePath, csv, function (err) {
          if (err) {
            return res.json(err).status(500);
          }
          return res.json(req.protocol + '://' + req.get('host')+"/exports/csv-" +"bmiAmberReport"+ ".csv"
           
          );
        });
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  }


const createBmiGreencsv = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          "Validation Error.",
          errors.array()
        );
      } else {
        // citizendetails all data csv
        let screeningcases = await ScreeningCaseModel.ScreeningCase.aggregate([
       
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
              localField: "screenerId",
              from: "screeners",
              foreignField: "screenerId",
              as: "screeners",
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
          
          { $match:{$and:[ { ngoId: req.body.ngoId}]}},
        
        ]);

        let screenerArr = [];
        if(screeningcases.length>0){
          for(let i=0;i<screeningcases.length;i++){
            let row = screeningcases[i];
            let elemetObj = {};
            elemetObj.screenerfullname = "";
            elemetObj.issubscreener=""
            if(row.screeners && row.screeners.length>0){   
              elemetObj.screenerfullname = row.screeners[0].firstName+" "+row.screeners[0].lastName; 
              elemetObj.issubscreener = row.issubscreener;  
            }  
            
            elemetObj.screenerId = "'"+row.screenerId+"'";
            elemetObj.citizenId = "'"+row.citizenId[row.citizenId.length-1]+" '";
            elemetObj._id = row._id;
            elemetObj.severity_bp = "'"+row.severity_bp+"'";
            elemetObj.severity_spo2 = row.severity_spo2;
            elemetObj.severity_temperature = row.severity_temperature;
            elemetObj.severity_pulse=row.severity_pulse,
           elemetObj.severity_bmi=row.severity_bmi,
           elemetObj.severity_respiratory_rate=row.severity_respiratory_rate,
           elemetObj.severity=row.severity,
           elemetObj.notes=row.notes,
           elemetObj.createdAt=row.createdAt,
          updatedAt=row.updatedAt,
    
           elemetObj.familymembername = "";
            elemetObj.gender = "";
            elemetObj.mobile = "";
            elemetObj.aadhaar = "";
            if(row.citizens && row.citizens.length>0){ 
              let fullname = "";
              for(let k=0;k<row.citizens.length;k++){
                fullname = fullname+" "+row.citizens[k].firstName+" "+row.citizens[k].lastName+",";  
                fullname.replace(/^\,s+/, '');  
              }
              elemetObj.fullname = fullname ;
              //elemetObj.fullname = row.citizens[0].firstName+" "+row.citizens[0].lastName;    
              // elemetObj.gender = row.citizens[0].sex;    
              elemetObj.mobile =row.citizens[0].mobile; 
              elemetObj.aadhaar =row.citizens[0].aadhaar;  
            }  
          
            elemetObj.dateOfBirth = "";    
            elemetObj.address = "";
            if(row.citizendetails && row.citizendetails.length>0){    
              elemetObj.dateOfBirth = row.citizendetails[0].dateOfBirth;    
              elemetObj.address = row.citizendetails[0].address;    
            }
            // if(elemetObj.issubscreener==0){
            screenerArr.push(elemetObj);
            // }
          }
        }
    
        console.log("+++++", screeningcases);
        let csv;
        csv = json2csv(screeningcases, { fieldsscreeningcase });

        const filePath = path.join(__dirname,".." ,"public", "exports", "csv-"+"bmiGreenReport"+".csv")
        console.log("+++++", screeningcases);
        fs.writeFile(filePath, csv, function (err) {
          if (err) {
            return res.json(err).status(500);
          }
          return res.json(req.protocol + '://' + req.get('host')+"/exports/csv-" +"bmiGreenReport"+ ".csv"
           
          );
        });
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  }

  const lipidCriticalCitizensDetailcsv = async (req, res) => {

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          "Validation Error.",
          errors.array()
        );
      } else {
        // citizen all data csv
        console.log(req.body.ngoId);
        let lipidCriticalCitizensDetail = await LipidcriticalcitizenModel.find({
          ngoId: req.body.ngoId,
        },
        {
          "citizenId":1,
          "FirstName":1,
          "ngoId ":1,
          "LastName":1,
          "Email":1,
          "Gender":1,
          "Address":1,
          "ScreenerId":1,
          "ScreenerFirstName":1,
          "ScreenerLastName":1,
          "Mobile":1,
          "Age":1,
        }
        );

        let csvLipidCriticalCitizensDetail;
        csvLipidCriticalCitizensDetail = json2csv(lipidCriticalCitizensDetail, { lipidCriticalFields });
        const filePath = path.join(__dirname,".." ,"public", "exports", "csv-"+"lipidCriticalCitizensDetail"+".csv")
        fs.writeFile(filePath, csvLipidCriticalCitizensDetail, function (err) {
          if (err) {
            return res.json(err).status(500);
          }
          return res.json( req.protocol + '://' + req.get('host')+"/exports/csv-" +"lipidCriticalCitizensDetail"+ ".csv"
          );
        });
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  }

exports.module={
  createBmiGreencsv,
  createbmiAmbercsv,
  createbmiRedcsv,
  createSpoAmbercsv,
  createWeeklyCitizencsv,
  weeklyCitizenDetailcsv,
createSpoGreencsv,
createPulseRedcsv,
createPulseAmbercsv,
createPulseGreencsv,
createBPRedcsv,
createBPAmbercsv,
createBPGreencsv,
createTempGreencsv,
createTempAmbercsv,
createTempRedcsv,
createSpoRedcsv,
createCitizencsv,
createCitizenDetailcsv,
createScreeningScreenerCasecsv,
createScreeningSevikaCasecsv,
lipidCriticalCitizensDetailcsv,
unscreenedCitizenDetailcsv,
generalSurveyCSV,
healthSurveyCSV,
socioEconomicSurveyCSV,
}