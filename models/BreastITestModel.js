const mongoose = require("mongoose");

const breastItestschema = new mongoose.Schema(
  {
    caseId: { type: String, required: true },
    screenerId: { type: String, required: true },
    citizenId: { type: String, required: true },
    isdeleted: { type: Boolean, default: false },
    lumps_checked: { type: Boolean, required: true, default: false },
    lumps_right_breast: { type: Number, required: true, default: 0 },
    lumps_right_cyclic: { type: Number, required: true, default: 0 },
    lumps_left_breast: { type: Number, required: true, default: 0 },
    lumps_left_cyclic: { type: Number, required: true, default: 0 },

    niple_discharge_checked: { type: Boolean, required: true, default: false },
    niple_discharge_right_breast: { type: Number, required: true, default: 0 },
    niple_discharge_right_cyclic: { type: Number, required: true, default: 0 },
    niple_discharge_left_breast: { type: Number, required: true, default: 0 },
    niple_discharge_left_cyclic: { type: Number, required: true, default: 0 },

    niple_skin_checked: { type: Boolean, required: true, default: false },
    niple_skin_right_breast: { type: Number, required: true, default: 0 },
    niple_skin_right_cyclic: { type: Number, required: true, default: 0 },
    niple_skin_left_breast: { type: Number, required: true, default: 0 },
    niple_skin_left_cyclic: { type: Number, required: true, default: 0 },

    swelling_checked: { type: Boolean, required: true, default: false },
    swelling_right_breast: { type: Number, required: true, default: 0 },
    swelling_right_cyclic: { type: Number, required: true, default: 0 },
    swelling_left_breast: { type: Number, required: true, default: 0 },
    swelling_left_cyclic: { type: Number, required: true, default: 0 },

    rush_scaling_checked: { type: Boolean, required: true, default: false },
    rush_scaling_right_breast: { type: Number, required: true, default: 0 },
    rush_scaling_right_cyclic: { type: Number, required: true, default: 0 },
    rush_scaling_left_breast: { type: Number, required: true, default: 0 },
    rush_scaling_left_cyclic: { type: Number, required: true, default: 0 },

    breastPain_checked: { type: Boolean, required: true, default: false },
    breastPain_right_breast: { type: Number, required: true, default: 0 },
    breastPain_right_cyclic: { type: Number, required: true, default: 0 },
    breastPain_left_breast: { type: Number, required: true, default: 0 },
    breastPain_left_cyclic: { type: Number, required: true, default: 0 },
    note_breast_right: { type: String, required: true },
    note_breast_left: { type: String, required: true },
    ngoId: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("breastItest", breastItestschema);
