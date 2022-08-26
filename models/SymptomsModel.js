var mongoose = require("mongoose");
var SymptomsSchema = new mongoose.Schema({
	caseId: {type: String, required: true},
	data: {type: String, required: true},
	citizenId: {type: String, required: true},
	screenerId: {type: String, required: true}
}, {timestamps: true});


module.exports.Symptoms = mongoose.model("Symptoms", SymptomsSchema);