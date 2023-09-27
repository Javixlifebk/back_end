const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const port = 3000;

// MongoDB connection URL
const mongoURI = "mongodb://localhost:27017/javix_final";

// Create a MongoDB client
const client = new MongoClient(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Connect to the MongoDB server
client.connect((err) => {
  if (err) {
    console.error("Error connecting to MongoDB:", err);
    return;
  }
  console.log("Connected to MongoDB");
});

// ...your Express routes and logic here...

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const addindex = async (req, res) => {
  try {
    const collection = client.db("javix_final").collection("screeningcases");
    collection.createIndex({ citizenId: 1 }, (err, result) => {
      if (err) {
        console.error("Error creating index:", err);
        return;
      }
      console.log("Index created:", result);
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = {
  addindex,
};
