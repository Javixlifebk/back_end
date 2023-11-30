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

const correctPiechartValues = async (req, res) => {
			ScreeningCase.ScreeningCase.find({}).toArray((err, result) => {
        if (err) {
          res.status(500).send('Error fetching data from database');
          return;
        }
        for(i=0; i<result.length; i++) {
          console.log(result[i])
        }
        res.json(result); // Return fetched data as JSON
      });
};

module.exports = {
  addindex,
  correctPiechartValues
};
