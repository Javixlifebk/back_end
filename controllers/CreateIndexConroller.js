const express = require("express");
const ScreeningCasenew = require("../models/ScreeningCase");
const ScreenerModel = require("../models/ScreenerModel");
const CitizenModel = require("../models/CitizenModel");
const DoctorModel = require("../models/DoctorModel");
const EyeTestModel = require("../models/EyeTestModel");
const HemoglobinModel = require("../models/HemoglobinModel");
const LabTestModel = require("../models/LabTestModel");
const LungFunctionTest = require("../models/LungFunctionTest");
const UserModel = require("../models/UserModel");
const PharmacyModel = require("../models/PharmacyModel");
const logoModel = require("../models/logoModel");
const SickleCellModel = require("../models/SickleCellModel");
const ThalassemiaModel = require("../models/ThalassemiaModel");
const VisualExamModel = require("../models/VisualExamModel");
const UserDetailsModel = require("../models/UserDetailsModel");
const ScreeningCase = require("../models/ScreeningCase");
const LabTestCaseModel = require("../models/LabTestModel");

const addindex = async (req, res) => {
  // // Auth Controller
  try {
    const UserDetailsIndex = UserDetailsModel.collection; // Get the MongoDB collection

    UserDetailsIndex.indexes({ userId: 1, createdAt: -1 }, (err, result) => {
      if (err) {
        console.error("Error creating index:", err);
      } else {
        console.log("Index created:", result);
      }
    });
  } catch (err) {
    console.error("Error:", err);
  }

  // CitizenController Controller
  try {
    const collection = ScreeningCasenew.ScreeningCase.collection; // Get the MongoDB collection

    collection.indexes({ citizenId: 1, createdAt: -1 }, (err, result) => {
      if (err) {
        console.error("Error creating index:", err);
      } else {
        console.log("Index created:", result);
      }
    });
  } catch (err) {
    console.error("Error:", err);
  }

  try {
    const ScreenerIndex = ScreenerModel.Screener.collection; // Get the MongoDB collection

    ScreenerIndex.indexes({ screenerId: 1, createdAt: -1 }, (err, result) => {
      if (err) {
        console.error("Error creating index:", err);
      } else {
        console.log("Index created:", result);
      }
    });
  } catch (err) {
    console.error("Error:", err);
  }

  // try {
  //   const ScreenerIndex = ScreenerModel.Screener.collection; // Get the MongoDB collection

  //   ScreenerIndex.indexes({ screenerId: 1, createdAt: -1 }, (err, result) => {
  //     if (err) {
  //       console.error("Error creating index:", err);
  //     } else {
  //       console.log("Index created:", result);
  //     }
  //   });
  // } catch (err) {
  //   console.error("Error:", err);
  // }

  try {
    const citizenDetailsIndex = CitizenModel.CitizenDetails.collection; // Get the MongoDB collection

    citizenDetailsIndex.indexes({ citizenId: 1, createdAt: -1 }, (err, result) => {
      if (err) {
        console.error("Error creating index:", err);
      } else {
        console.log("Index created:", result);
      }
    });
  } catch (err) {
    console.error("Error:", err);
  }

  try {
    const citizensIndex = CitizenModel.Citizen.collection; // Get the MongoDB collection

    citizensIndex.indexes({ citizenId: 1, createdAt: -1 }, (err, result) => {
      if (err) {
        console.error("Error creating index:", err);
      } else {
        console.log("Index created:", result);
      }
    });
  } catch (err) {
    console.error("Error:", err);
  }
  // DoctorController Controller
  try {
    const doctorsIndex = DoctorModel.Doctor.collection; // Get the MongoDB collection

    doctorsIndex.indexes({ doctorId: 1, createdAt: -1 }, (err, result) => {
      if (err) {
        console.error("Error creating index:", err);
      } else {
        console.log("Index created:", result);
      }
    });
  } catch (err) {
    console.error("Error:", err);
  }

  try {
    const doctorsDetailsIndex = DoctorModel.DoctorDetails.collection; // Get the MongoDB collection

    doctorsDetailsIndex.indexes({ doctorId: 1, createdAt: -1 }, (err, result) => {
      if (err) {
        console.error("Error creating index:", err);
      } else {
        console.log("Index created:", result);
      }
    });
  } catch (err) {
    console.error("Error:", err);
  }

  try {
    const doctorDocIndex = DoctorModel.doctorDoc.collection; // Get the MongoDB collection

    doctorDocIndex.indexes({ doctorLoginId: 1, createdAt: -1 }, (err, result) => {
      if (err) {
        console.error("Error creating index:", err);
      } else {
        console.log("Index created:", result);
      }
    });
  } catch (err) {
    console.error("Error:", err);
  }
  //GeneralSurveyController Controller
  try {
    const eyeTestIndex = EyeTestModel.EyeTest.collection; // Get the MongoDB collection

    eyeTestIndex.indexes({ citizenId: 1, createdAt: -1 }, (err, result) => {
      if (err) {
        console.error("Error creating index:", err);
      } else {
        console.log("Index created:", result);
      }
    });
  } catch (err) {
    console.error("Error:", err);
  }

  try {
    const hemoglobinIndex = HemoglobinModel.Hemoglobin.collection; // Get the MongoDB collection

    hemoglobinIndex.indexes({ citizenId: 1, createdAt: -1 }, (err, result) => {
      if (err) {
        console.error("Error creating index:", err);
      } else {
        console.log("Index created:", result);
      }
    });
  } catch (err) {
    console.error("Error:", err);
  }

  try {
    const bloodGlucoseTestIndex = LabTestModel.BloodGlucoseTest.collection; // Get the MongoDB collection

    bloodGlucoseTestIndex.indexes({ caseId: 1, createdAt: -1 }, (err, result) => {
      if (err) {
        console.error("Error creating index:", err);
      } else {
        console.log("Index created:", result);
      }
    });
  } catch (err) {
    console.error("Error:", err);
  }



  try {
    const urineTestIndex = LabTestModel.UrineTest.collection; // Get the MongoDB collection

    urineTestIndex.indexes({ caseId: 1, createdAt: -1 }, (err, result) => {
      if (err) {
        console.error("Error creating index:", err);
      } else {
        console.log("Index created:", result);
      }
    });
  } catch (err) {
    console.error("Error:", err);
  }

  try {
    const lungFunctionIndex = LungFunctionTest.LungFunction.collection; // Get the MongoDB collection

    lungFunctionIndex.indexes({ caseId: 1, createdAt: -1 }, (err, result) => {
      if (err) {
        console.error("Error creating index:", err);
      } else {
        console.log("Index created:", result);
      }
    });
  } catch (err) {
    console.error("Error:", err);
  }
  //GraphController Controller
  try {
    const UserIndex = UserModel.collection; // Get the MongoDB collection

    UserIndex.indexes({ userId: 1, createdAt: -1 }, (err, result) => {
      if (err) {
        console.error("Error creating index:", err);
      } else {
        console.log("Index created:", result);
      }
    });
  } catch (err) {
    console.error("Error:", err);
  }
  //PharmacyController Controller
  try {
    const pharmacyDetailsIndex = PharmacyModel.PharmacyDetails.collection; // Get the MongoDB collection

    pharmacyDetailsIndex.indexes({ pharmacyId: 1, createdAt: -1 }, (err, result) => {
      if (err) {
        console.error("Error creating index:", err);
      } else {
        console.log("Index created:", result);
      }
    });
  } catch (err) {
    console.error("Error:", err);
  }
  try {
    const pharmacyDetailsIndex = PharmacyModel.PharmacyDetails.collection; // Get the MongoDB collection

    pharmacyDetailsIndex.indexes({ pharmacyId: 1, createdAt: -1 }, (err, result) => {
      if (err) {
        console.error("Error creating index:", err);
      } else {
        console.log("Index created:", result);
      }
    });
  } catch (err) {
    console.error("Error:", err);
  }
  //ScreeningCaseController Controller
  try {
    const logoIndex = logoModel.Logo.collection; // Get the MongoDB collection

    logoIndex.indexes({ ngoId: 1, createdAt: -1 }, (err, result) => {
      if (err) {
        console.error("Error creating index:", err);
      } else {
        console.log("Index created:", result);
      }
    });
  } catch (err) {
    console.error("Error:", err);
  }

  try {
    const drugTestIndex = LabTestModel.DrugTest.collection; // Get the MongoDB collection

    drugTestIndex.indexes({ caseId: 1, createdAt: -1 }, (err, result) => {
      if (err) {
        console.error("Error creating index:", err);
      } else {
        console.log("Index created:", result);
      }
    });
  } catch (err) {
    console.error("Error:", err);
  }
  try {
    const sickleCellIndex = SickleCellModel.SickleCell.collection; // Get the MongoDB collection

    sickleCellIndex.indexes({ caseId: 1, createdAt: -1 }, (err, result) => {
      if (err) {
        console.error("Error creating index:", err);
      } else {
        console.log("Index created:", result);
      }
    });
  } catch (err) {
    console.error("Error:", err);
  }

  try {
    const thalassemiaIndex = ThalassemiaModel.Thalassemia.collection; // Get the MongoDB collection

    thalassemiaIndex.indexes({ caseId: 1, createdAt: -1 }, (err, result) => {
      if (err) {
        console.error("Error creating index:", err);
      } else {
        console.log("Index created:", result);
      }
    });
  } catch (err) {
    console.error("Error:", err);
  }
  try {
    const visualExamModelIndex = VisualExamModel.VisualExam.collection; // Get the MongoDB collection

    visualExamModelIndex.indexes({ caseId: 1, createdAt: -1 }, (err, result) => {
      if (err) {
        console.error("Error creating index:", err);
      } else {
        console.log("Index created:", result);
      }
    });
  } catch (err) {
    console.error("Error:", err);
  }
  try {
    const eyeTestCaseIndex = EyeTestModel.EyeTest.collection; // Get the MongoDB collection

    eyeTestCaseIndex.indexes({ caseId: 1, createdAt: -1 }, (err, result) => {
      if (err) {
        console.error("Error creating index:", err);
      } else {
        console.log("Index created:", result);
      }
    });
  } catch (err) {
    console.error("Error:", err);
  }

  try {
    const eyeTestCaseIndex = LabTestModel.LipidPanelTest.collection; // Get the MongoDB collection

    eyeTestCaseIndex.indexes({ caseId: 1, createdAt: -1 }, (err, result) => {
      if (err) {
        console.error("Error creating index:", err);
      } else {
        console.log("Index created:", result);
      }
    });
  } catch (err) {
    console.error("Error:", err);
  }

  try {
    const screeningCaseIndex = ScreeningCase.ScreeningCase.collection; // Get the MongoDB collection

    screeningCaseIndex.indexes({ caseId: 1, createdAt: -1 }, (err, result) => {
      if (err) {
        console.error("Error creating index:", err);
      } else {
        console.log("Index created:", result);
      }
    });
  } catch (err) {
    console.error("Error:", err);
  }

  try {
    const eyeTestCaseIndex = HemoglobinModel.Hemoglobin.collection; // Get the MongoDB collection

    eyeTestCaseIndex.indexes({ caseId: 1, createdAt: -1 }, (err, result) => {
      if (err) {
        console.error("Error creating index:", err);
        res.status(500).json({ error: "Error creating index" });
      } else {
        console.log("Index created:", result);
        res.status(200).json({ message: "Index created successfully" });
      }
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "An error occurred" });
  }
};

const correctLabTestUpdateBloodGlucose = async (req, res) => {

  try {

    LabTestModel.BloodGlucoseTest.find({}, {}, async (err, result) => {
      if (err) {
        res.status(500).send("Error fetching data from database");
        return;
      }
     
      severity = "";
      for (i = 0; i < result.length; i++) {
        console.log(result[i]);

          if (
            (((result[i].bloodglucose >= 121 && result[i].bloodglucose <=700) ||
          (result[i].bloodglucose >= 30 && result[i].bloodglucose <= 59)) &&
              result[i].type === "Pre Meal(Fasting)") ||
            (((result[i].bloodglucose >= 201 && result[i].bloodglucose <=700) ||
          (result[i].bloodglucose >= 30 && result[i].bloodglucose <= 69)) &&
              result[i].type === "Post Meal") ||
            (((result[i].bloodglucose >= 221 && result[i].bloodglucose <=700) ||
          (result[i].bloodglucose >= 30 && result[i].bloodglucose <= 69)) &&
              result[i].type === "Pre Exercise") ||
            (((result[i].bloodglucose >= 181 && result[i].bloodglucose <= 700) ||
          (result[i].bloodglucose >= 30 && result[i].bloodglucose <= 69)) &&
              result[i].type === "Post Exercise") ||
            (((result[i].bloodglucose >= 201 && result[i].bloodglucose <= 700) ||
          (result[i].bloodglucose >= 30 && result[i].bloodglucose <= 59)) &&
              result[i].type === "Non-Fasting(Random)")
       
          ) {
            severity = 2;
          } else if (
            (((result[i].bloodglucose >= 101 && result[i].bloodglucose <=120) || 
          (result[i].bloodglucose >= 60 && result[i].bloodglucose <=69)) &&
              result[i].type === "Pre Meal(Fasting)") ||
            (((result[i].bloodglucose >= 181 && result[i].bloodglucose <=200) ||
          (result[i].bloodglucose >= 70 && result[i].bloodglucose <=119)) &&
              result[i].type === "Post Meal") ||
            (((result[i].bloodglucose >=151 && result[i].bloodglucose <=220) ||
          (result[i].bloodglucose >=70 && result[i].bloodglucose <=129)) &&
              result[i].type === "Pre Exercise") ||
            (((result[i].bloodglucose >= 141 && result[i].bloodglucose <=180) ||
          (result[i].bloodglucose >= 70 && result[i].bloodglucose <=109)) &&
              result[i].type === "Post Exercise") ||
            (((result[i].bloodglucose >=141 && result[i].bloodglucose <= 200) ||
          (result[i].bloodglucose >=60 && result[i].bloodglucose <= 69)) &&
              result[i].type === "Non-Fasting(Random)") 
      
          ) {
            severity = 1;
          } else if (
            ((result[i].bloodglucose >= 70 && result[i].bloodglucose <=100) &&
              result[i].type === "Pre Meal(Fasting)") ||
            ((result[i].bloodglucose >= 120 && result[i].bloodglucose <=180) &&
              result[i].type === "Post Meal") ||
            ((result[i].bloodglucose >=130 && result[i].bloodglucose <=150) &&
              result[i].type === "Pre Exercise") ||
            ((result[i].bloodglucose >= 110 && result[i].bloodglucose <=140) &&
              result[i].type === "Post Exercise") ||
            ((result[i].bloodglucose >=70 && result[i].bloodglucose <= 140) &&
              result[i].type === "Non-Fasting(Random)")
      
          ) {
            severity = 0;
          }
        

      

        const queryConditions = {
          _id: result[i]._id,
          caseId: result[i].caseId,
          ngoId: result[i].ngoId,
        };


        const updateFields = {
              severity: severity,
        };

        const updatedProduct = await LabTestModel.BloodGlucoseTest.findOneAndUpdate(
          queryConditions,
          { $set: updateFields },
          { new: true }
        );
  
        if (updatedProduct) {
          console.log('Updated Product:', updatedProduct);
        } else {
          console.error('Error updating product');
        }
      }
      res.json(result); // Return fetched data as JSON
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error processing data');
  }
};

const correctLabEyeTest = async (req, res) => {

  try {

    
    EyeTestModel.EyeTest.find({}, {}, async (err, result) => {
      if (err) {
        res.status(500).send("Error fetching data from database");
        return;
      }
     
      
      for (i = 0; i < result.length; i++) {
        console.log(result[i]);

        var severity_reye=0;
        var severity_leye=0;
        if( result[i].reye==="6/6" || result[i].reye==="6/9"){
          severity_reye=0;
        }
        else if (result[i].reye==="6/12" || result[i].reye==="6/5"){
          severity_reye=1;
        }
        else {
          severity_reye=2;
        }


        if( result[i].leye==="6/6" || result[i].leye==="6/9"){
          severity_leye=0;
        }
        else if(result[i].leye==="6/12" || result[i].leye==="6/5") {
          severity_leye=1;
        }
        
        else {
            severity_leye=2;
        } 

      

        const queryConditions = {
          _id: result[i]._id,
          caseId: result[i].caseId,
          ngoId: result[i].ngoId,
        };


        const updateFields = {
              severity_reye: severity_reye,
              severity_leye: severity_leye,
        };

        const updatedProduct = await EyeTestModel.EyeTest.findOneAndUpdate(
          queryConditions,
          { $set: updateFields },
          { new: true }
        );
  
        if (updatedProduct) {
          console.log('Updated Product:', updatedProduct);
        } else {
          console.error('Error updating product');
        }
      }
      res.json(result); // Return fetched data as JSON
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error processing data');
  }
};

const correctHemoglobin = async (req, res) => {

  try {

    
    HemoglobinModel.Hemoglobin.find({}, {}, async (err, result) => {
      if (err) {
        res.status(500).send("Error fetching data from database");
        return;
      }
     
      
      for (i = 0; i < result.length; i++) {
        console.log(result[i]);
        severity = '';
        if((result[i].hemoglobin>=3 && result[i].hemoglobin<=6.9) || (result[i].hemoglobin>=18.1 &&  result[i].hemoglobin<=24))
        {severity=2; }//red
       else if((result[i].hemoglobin>=7 &&  result[i].hemoglobin<=11.5) || (result[i].hemoglobin>=16.7 &&  result[i].hemoglobin<=18)) 
         {severity=1; }//amber
       else if(result[i].hemoglobin>=11.6 &&  result[i].hemoglobin<=16.6)
         {severity=0; } //green
      

        const queryConditions = {
          _id: result[i]._id,
          caseId: result[i].caseId,
          ngoId: result[i].ngoId,
          citizenId:result[i].citizenId, 
          screenerId:result[i].screenerId, 
        };


        const updateFields = {
              severity: severity,
        };

        const updatedProduct = await HemoglobinModel.Hemoglobin.findOneAndUpdate(
          queryConditions,
          { $set: updateFields },
          { new: true }
        );
  
        if (updatedProduct) {
          console.log('Updated Product:', updatedProduct);
        } else {
          console.error('Error updating product');
        }
      }
      res.json(result); // Return fetched data as JSON
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error processing data');
  }
};

const correctLdlHdlCholestrolTriglicerine = async (req, res) => {

  try {

    
    LabTestCaseModel.LipidPanelTest.find({}, {}, async (err, result) => {
      if (err) {
        res.status(500).send("Error fetching data from database");
        return;
      }
     
      
      for (i = 0; i < result.length; i++) {
        console.log(result[i]);
        severity_ldl = '';
        severity_triglycerides='';
        severity_hdlcholesterol='';
        severity_cholesterol='';
        if (result[i].ldl >= 160 && result[i].ldl <= 189) {
          severity_ldl = 2;
        } else if (result[i].ldl >= 131 && result[i].ldl <= 159) {
          severity_ldl = 1;
        } else if (result[i].ldl >= 60 && result[i].ldl <= 130) {
          severity_ldl = 0;
        }

        if (result[i].triglycerides >= 200 && result[i].triglycerides <= 499) {
          severity_triglycerides = 2;
        } else if (result[i].triglycerides >= 150 && result[i].triglycerides <= 199) {
          severity_triglycerides = 1;
        } else if (result[i].triglycerides < 150) {
          severity_triglycerides = 0;
        }

        if (result[i].hdlcholesterol < 45) {
          severity_hdlcholesterol = 2;
        } else if (result[i].hdlcholesterol >= 45 && result[i].hdlcholesterol <= 60) {
          severity_hdlcholesterol = 1;
        } else if (result[i].hdlcholesterol > 60) {
          severity_hdlcholesterol = 0;
        }

        if (result[i].cholesterol < 159 || result[i].cholesterol >= 240) {
          severity_cholesterol = 2;
        } else if (
          (result[i].cholesterol >= 159 && result[i].cholesterol <= 184) ||
          (result[i].cholesterol >= 201 && result[i].cholesterol <= 239)
        ) {
          severity_cholesterol = 1;
        } else if (result[i].cholesterol >= 185 && result[i].cholesterol <= 200) {
          severity_cholesterol = 0;
        }
      

        const queryConditions = {
          _id: result[i]._id,
          caseId: result[i].caseId,
          ngoId: result[i].ngoId,
        
        };


        const updateFields = {
              severity_ldl: severity_ldl,
              severity_triglycerides:severity_triglycerides,
              severity_hdlcholesterol:severity_hdlcholesterol,
              severity_cholesterol:severity_cholesterol
        };

        const updatedProduct = await LabTestCaseModel.LipidPanelTest.findOneAndUpdate(
          queryConditions,
          { $set: updateFields },
          { new: true }
        );
  
        if (updatedProduct) {
          console.log('Updated Product:', updatedProduct);
        } else {
          console.error('Error updating product');
        }
      }
      res.json(result); // Return fetched data as JSON
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error processing data');
  }
};

const correctPiechartValues = async (req, res) => {

  try {

    ScreeningCase.ScreeningCase.find({}, {}, async (err, result) => {
      if (err) {
        res.status(500).send("Error fetching data from database");
        return;
      }
      severity_temperature = "";
      severity_spo2 = "";
      severity_pulse = "";
      severity_respiratory_rate = "";
      severity_bp = "";
      severity_bmi = "";
      severity = "";
      for (i = 0; i < result.length; i++) {
        console.log(result[i]);

        if (
          (result[i].temperature >= 94 && result[i].temperature <= 94.9) ||
          (result[i].temperature >= 102.1 && result[i].temperature <= 105)
        ) {
          severity_temperature = 2;
        } else if (
          (result[i].temperature >= 95 && result[i].temperature <= 96.4) ||
          (result[i].temperature >= 99.1 && result[i].temperature <= 102)
        ) {
          severity_temperature = 1;
        } else if (result[i].temperature >= 96.5 && result[i].temperature <= 99) {
          severity_temperature = 0;
        }

        if (result[i].spo2 >= 30 && result[i].spo2 <= 91) {
          severity_spo2 = 2;
        } else if (result[i].spo2 >= 92 && result[i].spo2 <= 94) {
          severity_spo2 = 1;
        } else if (result[i].spo2 >= 95 && result[i].spo2 <= 100) {
          severity_spo2 = 0;
        }

        if (
          (result[i].pulse >= 40 && result[i].pulse <= 59) ||
          (result[i].pulse >= 121 && result[i].pulse <= 200)
        ) {
          severity_pulse = 2;
        } else if (
          (result[i].pulse >= 60 && result[i].pulse <= 69) ||
          (result[i].pulse >= 81 && result[i].pulse <= 120)
        ) {
          severity_pulse = 1;
        } else if (result[i].pulse >= 70 && result[i].pulse <= 80) {
          severity_pulse = 0;
        }
        
        if (result[i].respiratory_rate > 24 || result[i].respiratory_rate < 12) {
          severity_respiratory_rate = 2;
        } else if (
          result[i].respiratory_rate >= 22 ||
          result[i].respiratory_rate <= 14
        ) {
          severity_respiratory_rate = 1;
        } else if (
          result[i].respiratory_rate >= 12 ||
          result[i].respiratory_rate <= 20
        ) {
          severity_respiratory_rate = 0;
        }

        if (
          (result[i].bpsys >= 60 && result[i].bpsys <= 69) ||
          (result[i].bpsys >= 160 && result[i].bpsys <= 300) ||
          (result[i].bpdia >= 30 && result[i].bpdia <= 59) ||
          (result[i].bpdia >= 90 && result[i].bpdia <= 200)
        ) {
          severity_bp = 2;
        } else if (
          (result[i].bpsys >= 70 && result[i].bpsys <= 114) ||
          (result[i].bpsys >= 129 && result[i].bpsys <= 159) ||
          (result[i].bpdia >= 60 && result[i].bpdia <= 69) ||
          (result[i].bpdia >= 81 && result[i].bpdia <= 89)
        ) {
          severity_bp = 1;
        } else if (
          (result[i].bpsys >= 115 && result[i].bpsys <= 128) ||
          (result[i].bpdia >= 70 && result[i].bpdia <= 80)
        ) {
          severity_bp = 0;
        }

        if (result[i].bmi >= 18.5 && result[i].bmi <= 24.9) {
          severity_bmi = 0;
        } else if (
          (result[i].bmi >= 18 && result[i].bmi <= 18.4) ||
          (result[i].bmi >= 25 && result[i].bmi <= 28)
        ) {
          severity_bmi = 1;
        } else if (
          (result[i].bmi >= 12 && result[i].bmi <= 17.9) ||
          (result[i].bmi >= 28.1 && result[i].bmi <= 60)
        ) {
          severity_bmi = 2;
        }

        var temp =
          result[i].severity_bmi * 4.76 * 0.5 +
          result[i].severity_respiratory_rate * 9.52 * 0.5 +
          result[i].severity_pulse * 14.28 * 0.5 +
          result[i].severity_temperature * 19.04 * 0.5 +
          result[i].severity_spo2 * 23.8 * 0.5 +
          result[i].severity_bp * 28.6 * 0.5;

        if (temp < 20) {
          severity = 0;
        } else if (temp < 40) {
          severity = 1;
        } else {
          severity = 2;
        }


        const queryConditions = {
          _id: result[i]._id,
          caseId: result[i].caseId,
          citizenId: result[i].citizenId,
          screenerId: result[i].screenerId,
          ngoId: result[i].ngoId,
        };


        const updateFields = {
              severity_bp: severity_bp,
              severity_spo2: severity_spo2,
              severity_temperature: severity_temperature,
              severity_pulse: severity_pulse,
              severity_bmi: severity_bmi,
              severity_respiratory_rate: severity_respiratory_rate,
              severity: severity,
        };

        const updatedProduct = await ScreeningCase.ScreeningCase.findOneAndUpdate(
          queryConditions,
          { $set: updateFields },
          { new: true }
        );
  
        if (updatedProduct) {
          console.log('Updated Product:', updatedProduct);
        } else {
          console.error('Error updating product');
        }
      }
      res.json(result); // Return fetched data as JSON
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error processing data');
  }
};



module.exports = {
  addindex,
  correctPiechartValues,
  correctLabTestUpdateBloodGlucose,
  correctLabEyeTest,
  correctHemoglobin,
  correctLdlHdlCholestrolTriglicerine
};
