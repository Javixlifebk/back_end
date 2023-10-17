const mongoose = require("mongoose");

const ecgTestschema = new mongoose.Schema(
  {
    caseId: { type: String, required: true, index: true },
    screenerId: { type: String, required: true, index: true },
    citizenId: { type: String, required: true, index: true },
    isdeleted: { type: Boolean, default: false },
    ngoId: { type: String, required: true, index: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ecgTest", ecgTestschema);
