var mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
var sevikaReport = new mongoose.Schema(
  {
    issubscreener:{type:String},
    screenerfullname:{type:String},
    status:{type:String},
    severity_bp:{type:String},
    severity_spo2:{type:String},
    severity_temperature:{type:String},
    severity_pulse:{type:String},
    severity_bmi:{type:String},
    severity_respiratory_rate:{type:String},
    severity:{type:String},
    citizenId:{type:String},
    notes:{type:String},
    doctorId:{type:String},
    screenerId:{type:String},
    height:{type:String},
    weight:{type:String},
    bmi:{type:String},
    bpsys:{type:String},
    bpdia:{type:String},
    arm:{type:String},
    spo2:{type:String},
    caseId:{type:String},
    pulse:{type:String},
    respiratory_rate:{type:String},
    temperature:{type:String},
    referDocId:{type:String},
    createdAt:{type:String},
    updatedAt:{type:String},
    isUnrefer:{type:String},
    isdeleted:{type:String},
    fullname:{type:String},
    gender:{type:String},
    mobile:{type:String},
    aadhaar:{type:String},
    email:{type:String},
    // leyetest:{type:String},
    // reyetest:{type:String},
    dateOfBirth:{type:String},
    address:{type:String},
    // hemoglobin:{type:String},
    // bloodglucose:{type:String},
    // bloodglucose_type:{type:String},
    // lipid_type:{type:String},
    // leukocytes:{type:String},
    // nitrite:{type:String},
    // urobilinogen:{type:String},
    // protein:{type:String},
    // blood:{type:String},
    // specificGravity:{type:String},
    // ketone:{type:String},
    // bilirubin:{type:String},
    // urine_glucose:{type:String},
    // fvc_predicted:{type:String},
    // fvc_actual:{type:String},
    // fev1_predicted:{type:String},
    // fev1_actual:{type:String},
    // fvc1_predicted:{type:String},
    // fvc1_actual:{type:String},
    // pef_predicted:{type:String},
    // pef_actual:{type:String},
    // fvc_predicted_percent:{type:String},
    // fev1_predicted_percent:{type:String},
    // fvc1_predicted_percent:{type:String},
    // pef_predicted_percent:{type:String},
    // cholesterol:{type:String},
    // hdlcholesterol:{type:String},
    // triglycerides:{type:String},
    // ldl:{type:String},
    // tcl_hdl:{type:String},
    // ldl_hdl:{type:String},
    // non_hdl:{type:String},
    // lipid_glucose:{type:String},
    // severity_ldl:{type:String},
    // severity_triglycerides:{type:String},
    // severity_hdlcholesterol:{type:String},
    // severity_cholesterol:{type:String},
    screenerUniqueId:{type:String},
    // PH:{type:String},
    age:{type:String},
  },
  { timestamps: true }
);
var sevikaReport = mongoose.model("sevikareportcase",sevikaReport );
module.exports = sevikaReport;
// sevikaReport