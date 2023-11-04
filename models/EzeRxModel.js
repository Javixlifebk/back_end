const mongoose = require("mongoose");

const EzeRxSchema = new mongoose.Schema(
  {
    caseId: { type: String, required: true, index: true },
    citizen_id:{ type: String, required: true, index: true },
    screener_id:{ type: String, required: true, index: true },
    ngo_id:{ type: String, required: true, index: true },

    deviceIdentifier: { type: String, required: true, index: true },

    non_invasive_hemoglobin_value: { type: String, required: true },
    non_invasive_hemoglobin_range: { type: String, required: true },

    non_invasive_bilirubin_value: { type: String, required: true },
    non_invasive_bilirubin_range: { type: String, required: true },

    oxygen_saturation_value: { type: String, required: true },
    oxygen_saturation_range: { type: String, required: true },

    non_invasive_creatinine_value: { type: String, required: true },
    non_invasive_creatinine_range: { type: String, required: true },

    non_invasive_estimated_blood_sugar_value: { type: String, required: true },
    non_invasive_estimated_blood_sugar_range: { type: String, required: true },
    raw_content: { type: String, required: true },

    isdeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ezerx", EzeRxSchema);
