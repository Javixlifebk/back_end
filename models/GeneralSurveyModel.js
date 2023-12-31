var mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
var GeneralSurveySchema = new mongoose.Schema({
	generalsurveyId:{type: String, required: true},
	citizenId:{type: Array, required: true},
	ngoId :{type:String,required:false},
	familyId:{type: String, required: true},
	noOfFamilyMembers:{type: String, required: false},
	nameHead:{type: String,required:false},
	ageHead:{type: String,required:false},
	NoOfAdultMales:{type: String,required:false},
	NoOfAdultFemales:{type: String,required:false},
	NoOfChildrenMales:{type: String,required:false},
	NoOfChildrenFemales:{type: String,required:false},
	screenerId:{type: String, required: true},
	isdeleted:{type: Boolean,default:false}
}, {timestamps: true});
var GeneralSurvey= mongoose.model("GeneralSurvey", GeneralSurveySchema);
module.exports =GeneralSurvey;
