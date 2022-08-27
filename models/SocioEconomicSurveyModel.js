var mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
var SocioEconomicSurveySchema = new mongoose.Schema({
	socioeconomicsurveyId:{type: String, required: true},
	citizenId:{type: Array, required: true},
	familyId:{type: String, required: true},
	noOfEarners:{type: String, required: false},
	nameOfEarners:{type: String,required:false},
	ageOfEarners:{type: String,required:false},
	occupationOfEarners:{type: String,required:false},
	isBankAccount:{type: String,required:false},
	statusOfHouse:{type: String,required:false},
	totalIncome:{type: String,required:false},
	foodExpense:{type: String,required:false},
	healthExpense:{type: String,required:false},
	educationExpense:{type: String,required:false},
	intoxicationExpense:{type: String,required:false},
	conveyanceExpense:{type: String,required:false},
	cultivableLand:{type: String,required:false},
	screenerId:{type: String, required: true},
}, {timestamps: false});
var SocioEconomicSurvey= mongoose.model("SocioEconomicSurvey", SocioEconomicSurveySchema);
module.exports =SocioEconomicSurvey;
