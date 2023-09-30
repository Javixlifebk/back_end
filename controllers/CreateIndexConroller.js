const express = require("express");
const ScreeningCase = require("../models/ScreeningCase");


const addindex = async (req, res) => {
  console.log("jhashdjklasjhfklasj");
  try {
    // const collection = client.db("JavixDB").collection("screeningcases");
    ScreeningCase.ScreeningCase.index({ citizenId: 1 }, (err, result) => {
      if (err) {
        console.error("Error creating index:", err);
      }
      console.log("Index created:", result);
    });
  } catch (err) {
    res.status(400).send(err);
  }

  // // Auth Controller
  // try {
  //   const collection = client.db("JavixDB").collection("userdetails");
  //   collection.createIndex({ userId: 1 }, (err, result) => {
  //     if (err) {
  //       console.error("Error creating index:", err);
  //     }
  //     console.log("Index created:", result);
  //   });
  // } catch (err) {
  //   res.status(400).send(err);
  // }
  // // CitizenController Controller
  // try {
  //   const collection = client.db("JavixDB").collection("screeners");
  //   collection.createIndex({ screenerId: 1 }, (err, result) => {
  //     if (err) {
  //       console.error("Error creating index:", err);
  //     }
  //     console.log("Index created:", result);
  //   });
  // } catch (err) {
  //   res.status(400).send(err);
  // }

  // try {
  //   const collection = client.db("JavixDB").collection("citizendetails");
  //   collection.createIndex({ citizenId: 1 }, (err, result) => {
  //     if (err) {
  //       console.error("Error creating index:", err);
  //     }
  //     console.log("Index created:", result);
  //   });
  // } catch (err) {
  //   res.status(400).send(err);
  // }

  // try {
  //   const collection = client.db("JavixDB").collection("citizens");
  //   collection.createIndex({ citizenId: 1 }, (err, result) => {
  //     if (err) {
  //       console.error("Error creating index:", err);
  //     }
  //     console.log("Index created:", result);
  //   });
  // } catch (err) {
  //   res.status(400).send(err);
  // }
  // // DoctorController Controller
  // try {
  //   const collection = client.db("JavixDB").collection("doctors");
  //   collection.createIndex({ doctorId: 1 }, (err, result) => {
  //     if (err) {
  //       console.error("Error creating index:", err);
  //     }
  //     console.log("Index created:", result);
  //   });
  // } catch (err) {
  //   res.status(400).send(err);
  // }

  // try {
  //   const collection = client.db("JavixDB").collection("doctordetails");
  //   collection.createIndex({ doctorId: 1 }, (err, result) => {
  //     if (err) {
  //       console.error("Error creating index:", err);
  //     }
  //     console.log("Index created:", result);
  //   });
  // } catch (err) {
  //   res.status(400).send(err);
  // }
  // try {
  //   const collection = client.db("JavixDB").collection("loggedindoctors");
  //   collection.createIndex({ doctorId: 1 }, (err, result) => {
  //     if (err) {
  //       console.error("Error creating index:", err);
  //     }
  //     console.log("Index created:", result);
  //   });
  // } catch (err) {
  //   res.status(400).send(err);
  // }
  // try {
  //   const collection = client.db("JavixDB").collection("doctordocs");
  //   collection.createIndex({ doctorLoginId: 1 }, (err, result) => {
  //     if (err) {
  //       console.error("Error creating index:", err);
  //     }
  //     console.log("Index created:", result);
  //   });
  // } catch (err) {
  //   res.status(400).send(err);
  // }
  // //GeneralSurveyController Controller
  // try {
  //   const collection = client.db("JavixDB").collection("eyetests");
  //   collection.createIndex({ citizenId: 1 }, (err, result) => {
  //     if (err) {
  //       console.error("Error creating index:", err);
  //     }
  //     console.log("Index created:", result);
  //   });
  // } catch (err) {
  //   res.status(400).send(err);
  // }
  // try {
  //   const collection = client.db("JavixDB").collection("hemoglobins");
  //   collection.createIndex({ citizenId: 1 }, (err, result) => {
  //     if (err) {
  //       console.error("Error creating index:", err);
  //     }
  //     console.log("Index created:", result);
  //   });
  // } catch (err) {
  //   res.status(400).send(err);
  // }

  // try {
  //   const collection = client.db("JavixDB").collection("bloodglucosetests");
  //   collection.createIndex({ caseId: 1 }, (err, result) => {
  //     if (err) {
  //       console.error("Error creating index:", err);
  //     }
  //     console.log("Index created:", result);
  //   });
  // } catch (err) {
  //   res.status(400).send(err);
  // }
  // try {
  //   const collection = client.db("JavixDB").collection("urinetests");
  //   collection.createIndex({ caseId: 1 }, (err, result) => {
  //     if (err) {
  //       console.error("Error creating index:", err);
  //     }
  //     console.log("Index created:", result);
  //   });
  // } catch (err) {
  //   res.status(400).send(err);
  // }
  // try {
  //   const collection = client.db("JavixDB").collection("lungfunctions");
  //   collection.createIndex({ caseId: 1 }, (err, result) => {
  //     if (err) {
  //       console.error("Error creating index:", err);
  //     }
  //     console.log("Index created:", result);
  //   });
  // } catch (err) {
  //   res.status(400).send(err);
  // }

  // try {
  //   const collection = client.db("JavixDB").collection("lipidpaneltests");
  //   collection.createIndex({ caseId: 1 }, (err, result) => {
  //     if (err) {
  //       console.error("Error creating index:", err);
  //     }
  //     console.log("Index created:", result);
  //   });
  // } catch (err) {
  //   res.status(400).send(err);
  // }
  // //GraphController Controller
  // try {
  //   const collection = client.db("JavixDB").collection("users");
  //   collection.createIndex({ userId: 1 }, (err, result) => {
  //     if (err) {
  //       console.error("Error creating index:", err);
  //     }
  //     console.log("Index created:", result);
  //   });
  // } catch (err) {
  //   res.status(400).send(err);
  // }
  // //LabTestController Controller
  // try {
  //   const collection = client.db("JavixDB").collection("screeningcases");
  //   collection.createIndex({ caseId: 1 }, (err, result) => {
  //     if (err) {
  //       console.error("Error creating index:", err);
  //     }
  //     console.log("Index created:", result);
  //   });
  // } catch (err) {
  //   res.status(400).send(err);
  // }
  // //PharmacyController Controller
  // try {
  //   const collection = client.db("JavixDB").collection("pharmacydetails");
  //   collection.createIndex({ pharmacyId: 1 }, (err, result) => {
  //     if (err) {
  //       console.error("Error creating index:", err);
  //     }
  //     console.log("Index created:", result);
  //   });
  // } catch (err) {
  //   res.status(400).send(err);
  // }

  // //ScreeningCaseController Controller
  // try {
  //   const collection = client.db("JavixDB").collection("logos");
  //   collection.createIndex({ ngoId: 1 }, (err, result) => {
  //     if (err) {
  //       console.error("Error creating index:", err);
  //     }
  //     console.log("Index created:", result);
  //   });
  // } catch (err) {
  //   res.status(400).send(err);
  // }

  // try {
  //   const collection = client.db("JavixDB").collection("labtests");
  //   collection.createIndex({ caseId: 1 }, (err, result) => {
  //     if (err) {
  //       console.error("Error creating index:", err);
  //     }
  //     console.log("Index created:", result);
  //   });
  // } catch (err) {
  //   res.status(400).send(err);
  // }
  // try {
  //   const collection = client.db("JavixDB").collection("labtests");
  //   collection.createIndex({ caseId: 1 }, (err, result) => {
  //     if (err) {
  //       console.error("Error creating index:", err);
  //     }
  //     console.log("Index created:", result);
  //   });
  // } catch (err) {
  //   res.status(400).send(err);
  // }

  // try {
  //   const collection = client.db("JavixDB").collection("drugtests");
  //   collection.createIndex({ caseId: 1 }, (err, result) => {
  //     if (err) {
  //       console.error("Error creating index:", err);
  //     }
  //     console.log("Index created:", result);
  //   });
  // } catch (err) {
  //   res.status(400).send(err);
  // }
  // try {
  //   const collection = client.db("JavixDB").collection("sicklecells");
  //   collection.createIndex({ caseId: 1 }, (err, result) => {
  //     if (err) {
  //       console.error("Error creating index:", err);
  //     }
  //     console.log("Index created:", result);
  //   });
  // } catch (err) {
  //   res.status(400).send(err);
  // }
  // try {
  //   const collection = client.db("JavixDB").collection("thalassemias");
  //   collection.createIndex({ caseId: 1 }, (err, result) => {
  //     if (err) {
  //       console.error("Error creating index:", err);
  //     }
  //     console.log("Index created:", result);
  //   });
  // } catch (err) {
  //   res.status(400).send(err);
  // }
  // try {
  //   const collection = client.db("JavixDB").collection("visualexams");
  //   collection.createIndex({ caseId: 1 }, (err, result) => {
  //     if (err) {
  //       console.error("Error creating index:", err);
  //     }
  //     console.log("Index created:", result);
  //   });
  // } catch (err) {
  //   res.status(400).send(err);
  // }
  // try {
  //   const collection = client.db("JavixDB").collection("eyetests");
  //   collection.createIndex({ caseId: 1 }, (err, result) => {
  //     if (err) {
  //       console.error("Error creating index:", err);
  //     }
  //     console.log("Index created:", result);
  //   });
  // } catch (err) {
  //   res.status(400).send(err);
  // }
  // try {
  //   const collection = client.db("JavixDB").collection("hemoglobins");
  //   collection.createIndex({ caseId: 1 }, (err, result) => {
  //     if (err) {
  //       console.error("Error creating index:", err);
  //       res.status(500).send("Internal Server Error: Unable to create index");
  //     } else {
  //       console.log("Index created:", result);
  //       res.status(200).send("Index created successfully");
  //     }
  //   });
  // } catch (err) {
  //   res.status(400).send("Bad Request: " + err.message);
  // }
};

module.exports = {
  addindex,
};
