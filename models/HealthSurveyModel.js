var mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
var HealthSurveySchema = new mongoose.Schema({
	healthsurveyId:{type: String, required: true},
	citizenId:{type: Array, required: true},
	familyId:{type: String, required: true},
	ngoId :{type:String,required:false},
	drinkingWaterSource:{type: String, required: false},
	drinkingWaterDistance:{type: String,required:false},
	isdrinkingWaterTreatmentRequired:{type: String,required:false},
	NoOfPersonUsingToilets:{type: String,required:false},
	NonUsageOfToilets:{type: String,required:false},
	DistanceOfSubcenters:{type: String,required:false},
	DistanceOfPrimaryHealthcenters:{type: String,required:false},
	DistanceOfCommunityHealthcenters:{type: String,required:false},
	DistanceOfDistrictHospitals:{type: String,required:false},
	DistanceOfPathologyLab:{type: String,required:false},
	DistanceOfMedicalStore:{type: String,required:false},
	StatusOfDeliveryOfChildren:{type: String,required:false},
	StatusOfVaccinationOfChildren:{type: String,required:false},
	StatusOfFemaleRelatedProblem:{type: String,required:false},
	CentrallyIssuedHealthInsurance:{type: String,required:false},
	StateIssuedHealthInsurance:{type: String,required:false},
	PersonalHealthInsurance:{type: String,required:false},
	bpStatus:{type: Array,required:false},
	hbTestStatusFemale:{type: Array,required:false},
	sugarTestStatus:{type: Array,required:false},
	smokingStatus:{type: Array,required:false},
	alcoholStatus:{type: Array,required:false},
	tobaccoStatus:{type: Array,required:false},
	screenerId:{type: String, required: true},
	isdeleted:{type: Boolean,default:false, required: true}
}, {timestamps: true});
var HealthSurvey= mongoose.model("HealthSurvey", HealthSurveySchema);
module.exports =HealthSurvey;
