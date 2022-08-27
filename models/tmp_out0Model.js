var mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
var tmp_out0Schema = new mongoose.Schema(
  {
    status: { type: String, required: true },
    severity_bp: { type: String, required: true },
    severity_spo2: { type: String, required: true },
    severity_temperature: { type: String, required: true },
    severity_pulse: { type: String, required: true },
    severity_bmi: { type: String, required: true },
    severity_respiratory_rate: { type: String, required: true },
    severity: { type: String, required: true },
    citizenId: { type: String, required: true },
    notes: { type: String, required: true },
    doctorId: { type: String, required: true },
    screenerId: { type: String, required: true },
    height: { type: String, required: true },
    weight: { type: String, required: true },
    bmi: { type: String, required: true },
    bpsys: { type: String, required: true },
    bpdia: { type: String, required: true },
    arm: { type: String, required: true },
    spo2: { type: String, required: true },
    caseId: { type: String, required: true },
    pulse: { type: String, required: true },
    respiratory_rate: { type: String, required: true },
    temperature: { type: String, required: true },
    referDocId: { type: String, required: true },
    createdAt: { type: String, required: true },
  },
  { timestamps: true }
);
var tmp_out0 = mongoose.model("tmp_out0", tmp_out0Schema);
module.exports = tmp_out0;
