const express = require("express");
const ScreeningCasenew = require("../models/ScreeningCase");
const addindex = async (req, res) => {
  try {
    console.log("Creating an index...");
    const collection = ScreeningCasenew.ScreeningCase.collection; // Get the MongoDB collection

    // Create the index
    collection.indexes({ citizenId: 1 }, (err, result) => {
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

module.exports = {
  addindex,
};
