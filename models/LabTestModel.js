var mongoose = require("mongoose");
//var autoIncrement = require('mongoose-auto-increment');
mongoose.set("useNewUrlParser", true);
// mongoose.set('useFindAndModify', false);
mongoose.set("useCreateIndex", true);

/*  Collection Name : ScreeningCase */
var LabTestCaseSchema = new mongoose.Schema(
  {
    status: { type: Number, required: true, default: 1 },
    ChagasAb: { type: Number, required: false },
    Chikungunya: { type: Number, required: false },
    ngoId: { type: String, required: false },
    Chlamydia: { type: Number, required: false },
    Cholera: { type: Number, required: false },
    Dengue: { type: Number, required: false },
    FecalOccultBloodTest: { type: Number, required: false },
    HPylori: { type: Number, required: false },
    HantaanVirus: { type: Number, required: false },
    HepatitisA: { type: Number, required: false },
    HepatitisB: { type: Number, required: false },
    HepatitisC: { type: Number, required: false },
    HIV: { type: Number, required: false },
    HumanAfricanTrypanosomiasis: { type: Number, required: false },
    HumanChorionicGonadotropin: { type: Number, required: false },
    Influenza: { type: Number, required: false },
    LegionellaAg: { type: Number, required: false },
    Leptospira: { type: Number, required: false },
    Malaria: { type: Number, required: false },
    Myoglobin: { type: Number, required: false },
    Norovirus: { type: Number, required: false },
    OnchoLFlgG4Biplex: { type: Number, required: false },
    RespiratorySynctialVirus: { type: Number, required: false },
    RotaAdeno: { type: Number, required: false },
    Rotavirus: { type: Number, required: false },
    Covid: { type: Number, required: false },
    StrepA: { type: Number, required: false },
    Syphilis: { type: Number, required: false },
    Salmonella: { type: Number, required: false },
    Tetanus: { type: Number, required: false },
    Troponin: { type: Number, required: false },
    Tsutsugamushi: { type: Number, required: false },
    Tuberculosis: { type: Number, required: false },
    TyphoidFever: { type: Number, required: false },
    YellowFever: { type: Number, required: false },
    Others: { type: Number, required: false },
    caseId: { type: String, required: true },
    severity_hdlcholesterol: { type: Number, default: 0,required: false },
  },
  { timestamps: true }
);

module.exports.LabTest = mongoose.model("LabTest", LabTestCaseSchema);

var BloodGlucoseTestSchema = new mongoose.Schema(
  {
    bloodglucose: { type: String, required: true },
    caseId: { type: String, required: true },
    ngoId: { type: String, required: false },
    type: { type: String, required: true },
    severity: { type: Number, default: 0,required: false }, //0-green, 1-amber, 2-red , 3-Default
  },
  { timestamps: true }
);

//Severity CALCULATOR
BloodGlucoseTestSchema.pre("save", function () {
  if (this.bloodglucose.length != 0 && isNaN(this.bloodglucose) == false) {
    this.bloodglucose = parseFloat(this.bloodglucose);

    if (
      (((this.bloodglucose >= 121 && this.bloodglucose <=700) ||
	  (this.bloodglucose >= 30 && this.bloodglucose <= 59)) &&
        this.type === "Pre Meal(Fasting)") ||
      (((this.bloodglucose >= 201 && this.bloodglucose <=700) ||
	  (this.bloodglucose >= 30 && this.bloodglucose <= 69)) &&
        this.type === "Post Meal") ||
      (((this.bloodglucose >= 221 && this.bloodglucose <=700) ||
	  (this.bloodglucose >= 30 && this.bloodglucose <= 69)) &&
        this.type === "Pre Exercise") ||
      (((this.bloodglucose >= 181 && this.bloodglucose <= 700) ||
	  (this.bloodglucose >= 30 && this.bloodglucose <= 69)) &&
        this.type === "Post Exercise") ||
      (((this.bloodglucose >= 201 && this.bloodglucose <= 700) ||
	  (this.bloodglucose >= 30 && this.bloodglucose <= 59)) &&
        this.type === "Non-Fasting(Random)")
	// 	 ||
    //   this.bloodglucose > 200 ||
    //   this.bloodglucose < 60
    ) {
      this.severity = 2;
    } else if (
      (((this.bloodglucose >= 101 && this.bloodglucose <=120) || 
	  (this.bloodglucose >= 60 && this.bloodglucose <=69)) &&
        this.type === "Pre Meal(Fasting)") ||
      (((this.bloodglucose >= 181 && this.bloodglucose <=200) ||
	  (this.bloodglucose >= 70 && this.bloodglucose <=119)) &&
        this.type === "Post Meal") ||
      (((this.bloodglucose >=151 && this.bloodglucose <=220) ||
	  (this.bloodglucose >=70 && this.bloodglucose <=129)) &&
        this.type === "Pre Exercise") ||
      (((this.bloodglucose >= 141 && this.bloodglucose <=180) ||
	  (this.bloodglucose >= 70 && this.bloodglucose <=109)) &&
        this.type === "Post Exercise") ||
      (((this.bloodglucose >=141 && this.bloodglucose <= 200) ||
	  (this.bloodglucose >=60 && this.bloodglucose <= 69)) &&
        this.type === "Non-Fasting(Random)") 
	// 	||
    //   this.bloodglucose > 200 ||
    //   this.bloodglucose < 140
    ) {
      this.severity = 1;
    } else if (
      ((this.bloodglucose >= 70 && this.bloodglucose <=100) &&
        this.type === "Pre Meal(Fasting)") ||
      ((this.bloodglucose >= 120 && this.bloodglucose <=180) &&
        this.type === "Post Meal") ||
      ((this.bloodglucose >=130 && this.bloodglucose <=150) &&
        this.type === "Pre Exercise") ||
      ((this.bloodglucose >= 110 && this.bloodglucose <=140) &&
        this.type === "Post Exercise") ||
      ((this.bloodglucose >=70 && this.bloodglucose <= 140) &&
        this.type === "Non-Fasting(Random)")
	// 	 ||
    //   this.bloodglucose > 70 || this.bloodglucose < 140
    ) {
      this.severity = 0;
    }
  }
});

//End of Severity Calculator

module.exports.BloodGlucoseTest = mongoose.model(
  "BloodGlucoseTest",
  BloodGlucoseTestSchema
);

var LipidPanelTestSchema = new mongoose.Schema(
  {
    cholesterol: { type: String, required: true },
    ngoId: { type: String, required: false },
    hdlcholesterol: { type: String, required: true },
    triglycerides: { type: String, required: true },
    glucose: { type: String, required: true },
    ldl: { type: String, required: true },
    tcl_hdl: { type: String, required: true },
    ldl_hdl: { type: String, required: true },
    caseId: { type: String, required: true , index: true},
    non_hdl: { type: String, required: true },
    type: { type: String, required: true },
    status: { type: Number, required: true, default: 1 },
    severity_ldl: { type: Number, default: 0,required: false }, //0-green, 1-amber, 2-red , 3-Default
    severity_triglycerides: { type: Number, default: 0,required: false }, //0-green, 1-amber, 2-red , 3-Default
    severity_hdlcholesterol: { type: Number, default: 0,required: false }, //0-green, 1-amber, 2-red , 3-Default
    severity_cholesterol: { type: Number, default: 0,required: false }, //0-green, 1-amber, 2-red , 3-Default
  },
  { timestamps: true }
);

LipidPanelTestSchema.pre("save", function () {
  if (this.cholesterol.length != 0 && isNaN(this.cholesterol) == false) {
    this.cholesterol = parseFloat(this.cholesterol);

    //    if( cholesterol>=240)
    //     {this.severity_cholesterol=2; }
    //    else if( cholesterol>200)
    //    {this.severity_cholesterol=1; }
    //    else
    //    	{this.severity_cholesterol=0; }

    if (cholesterol < 159 || cholesterol >= 240) {
      this.severity_cholesterol = 2;
    } else if (
      (cholesterol >= 159 && cholesterol <= 184) ||
      (cholesterol >= 201 && cholesterol <= 239)
    ) {
      this.severity_cholesterol = 1;
    } else if (cholesterol >= 185 && cholesterol <= 200) {
      this.severity_cholesterol = 0;
    }
  }

  if (this.hdlcholesterol.length != 0 && isNaN(this.hdlcholesterol) == false) {
    this.hdlcholesterol = parseFloat(this.hdlcholesterol);

    //    if( hdlcholesterol<40)
    //     {this.severity_hdlcholesterol=2; }
    //    else if( hdlcholesterol>50)
    //    {this.severity_hdlcholesterol=1; }
    //    else
    //    	{this.severity_hdlcholesterol=0; }

    if (hdlcholesterol < 45) {
      this.severity_hdlcholesterol = 2;
    } else if (hdlcholesterol >= 45 && hdlcholesterol <= 60) {
      this.severity_hdlcholesterol = 1;
    } else if (hdlcholesterol > 60) {
      this.severity_hdlcholesterol = 0;
    }
  }

  if (this.triglycerides.length != 0 && isNaN(this.triglycerides) == false) {
    this.triglycerides = parseFloat(this.triglycerides);

    //    if( triglycerides>=200)
    //     {this.severity_triglycerides=2; }
    //    else if( triglycerides>=150)
    //    {this.severity_triglycerides=1; }
    //    else
    //    	{this.severity_triglycerides=0; }

    if (triglycerides >= 200 && triglycerides <= 499) {
      this.severity_triglycerides = 2;
    } else if (triglycerides >= 150 && triglycerides <= 199) {
      this.severity_triglycerides = 1;
    } else if (triglycerides < 150) {
      this.severity_triglycerides = 0;
    }
  }
  if (this.ldl.length != 0 && isNaN(this.ldl) == false) {
    this.ldl = parseFloat(this.ldl);

    //    if( ldl>=130)
    //     {this.severity_ldl=2; }
    //    else if( ldl>=100)
    //    {this.severity_ldl=1; }
    //    else
    //    	{this.severity_ldl=0; }

    if (ldl >= 160 && ldl <= 189) {
      this.severity_ldl = 2;
    } else if (ldl >= 131 && ldl <= 159) {
      this.severity_ldl = 1;
    } else if (ldl >= 60 && ldl <= 130) {
      this.severity_ldl = 0;
    }
  }
});

module.exports.LipidPanelTest = mongoose.model(
  "LipidPanelTest",
LipidPanelTestSchema
);

var DrugTestSchema = new mongoose.Schema(
  {
    status: { type: Number, required: true, default: 1 },
    ngoId: { type: String, required: false },
    Amphetamine: { type: Number, required: false },
    Barbiturates: { type: Number, required: false },
    Buprenorphine: { type: Number, required: false },
    Benzodiazepines: { type: Number, required: false },
    Cocaine: { type: Number, required: false },
    Marijuana: { type: Number, required: false },
    Methamphetamine: { type: Number, required: false },
    Methylenedioxymethamphetamine: { type: Number, required: false },
    Methadone: { type: Number, required: false },
    Opiate: { type: Number, required: false },
    Oxycodone: { type: Number, required: false },
    Phencyclidine: { type: Number, required: false },
    Propoxyphene: { type: Number, required: false },
    TricyclicAntidepressant: { type: Number, required: false },
    caseId: { type: String, required: true , index: true},
  },
  { timestamps: true }
);

module.exports.DrugTest = mongoose.model("DrugTest", DrugTestSchema);

var UrineTestSchema = new mongoose.Schema(
  {
    status: { type: Number, required: true, default: 1 },
    ngoId: { type: String, required: false },
    leukocytes: { type: String, required: false },
    nitrite: { type: String, required: false },
    urobilinogen: { type: String, required: false },
    protein: { type: String, required: false },
    ph: { type: String, required: false },
    blood: { type: String, required: false },
    specificGravity: { type: String, required: false },
    ketone: { type: String, required: false },
    bilirubin: { type: String, required: false },
    glucose: { type: String, required: false },
    caseId: { type: String, required: true, index: true },
    notes: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports.UrineTest = mongoose.model("UrineTest", UrineTestSchema);
