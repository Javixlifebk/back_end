var mongoose = require("mongoose");
var HeartTestSchema = new mongoose.Schema({
	caseId: {type: String, required: true},
	url: {type: String, required: true},
	notes: {type: String, required: false},
	citizenId: {type: String, required: true},
	screenerId: {type: String, required: true}
}, {timestamps: true});


module.exports.HeartTest = mongoose.model("HeartTest", HeartTestSchema);