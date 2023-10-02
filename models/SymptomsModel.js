var mongoose = require("mongoose");
var SymptomsSchema = new mongoose.Schema({
	caseId: {type: String, required: true},
	data: {type: String, required: true},
	ngoId :{type:String,required:false},
	citizenId: {type: String, required: true},
	screenerId: {type: String, required: true}
}, {timestamps: true});


module.exports.Symptoms = mongoose.model("Symptoms", SymptomsSchema);