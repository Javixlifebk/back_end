var mongoose = require("mongoose");
var VisualExamsSchema = new mongoose.Schema({
	caseId: {type: String, required: true},
	image: {type: String, required: true},
	notes: {type: String, required: false},
	citizenId: {type: String, required: true},
	screenerId: {type: String, required: true},
}, {timestamps: true});


module.exports.VisualExam = mongoose.model("VisualExam", VisualExamsSchema);