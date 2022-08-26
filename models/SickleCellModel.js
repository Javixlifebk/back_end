var mongoose = require("mongoose");
//var autoIncrement = require('mongoose-auto-increment');


var SickleCellSchema = new mongoose.Schema({
	status: {type: Number, required: true , default: 1},
	SickleCell: {type: Number, required: false},
	caseId:{type:String,required:true},
	notes: {type:String,required:false},
}, {timestamps: true});

module.exports.SickleCell = mongoose.model("SickleCell", SickleCellSchema);

