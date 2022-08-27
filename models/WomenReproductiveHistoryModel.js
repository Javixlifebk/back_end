var mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
var WomenReproductiveHistorySchema = new mongoose.Schema({
	ageoffirstperiod: {type: Number, required: false},
	pregnancies: {type: Number, required: false},
	miscarriages: {type: Number, required: false},
	children: {type: Number, required: false},
	menopauseage: {type: Number, required: false},
	citizenId: {type: String, required: true},
	doctorId: {type: String, required: false},
	screenerId: {type: String, required: false},
	lastmenstrualperiod: {type: String, required: false},
	numberofdaysbleeding: {type: Number, required: false},
	intervalbetweenperiods: {type: String, required: false},
	isregular: {type: String, required: false},
	flow: {type: String, required: false},
	painwithmenstruation: {type: String, required: false},
	useofmedicationforpain: {type: String, required: false},
	misseddays: {type: String, required: false},
}, {timestamps: true});


module.exports.WomenReproductiveHistory = mongoose.model("WomenReproductiveHistory", WomenReproductiveHistorySchema);