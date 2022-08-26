var mongoose = require("mongoose");
//var autoIncrement = require('mongoose-auto-increment');


var LungFunctionSchema = new mongoose.Schema({
	status: {type: Number, required: true , default: 1},
	fvc_predicted: {type: Number, required: false},
	fvc_actual: {type: Number, required: false},
	fev1_predicted: {type: Number, required: false},
	fev1_actual: {type: Number, required: false},
	fvc1_predicted: {type: Number, required: false},
	fvc1_actual: {type: Number, required: false},
	pef_predicted: {type: Number, required: false},
	pef_actual: {type: Number, required: false},
	notes: {type: String, required: false},
	fvc_predicted_percent: {type: Number, required: false},
	fev1_predicted_percent: {type: Number, required: false},
	fvc1_predicted_percent: {type: Number, required: false},
	pef_predicted_percent: {type: Number, required: false},
	caseId:{type:String,required:true},
}, {timestamps: true});

module.exports.LungFunction = mongoose.model("LungFunction", LungFunctionSchema);

