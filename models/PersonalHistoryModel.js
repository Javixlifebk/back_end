var mongoose = require("mongoose");
// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
var PersonalHistorySchema = new mongoose.Schema({
	bornraised: {type: String, required: false},
	ngoId :{type:String,required:false},
	birthproblem: {type: String, required: false},
	highesteducation: {type: String, required: false},
	maritalstatus: {type: String, required: false},
	ocupation: {type: String, required: false},
	iscurrentlyworking: {type: Number, required: false},
	hoursweek: {type: Number, required: false},
	notworking: {type: Number, required: false},
	isdisability: {type: Number, required: false},
	disabilitydetails: {type: String, required: false},
	legalproblems: {type: String, required: false},
	religion: {type: String, required: false},
	citizenId: {type: String, required: true},
	doctorId: {type: String, required: false},
	screenerId: {type: String, required: false}
}, {timestamps: true});


module.exports.PersonalHistory = mongoose.model("PersonalHistory", PersonalHistorySchema);