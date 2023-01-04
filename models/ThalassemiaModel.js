 var mongoose = require("mongoose");


/*  Collection Name : Thalassemia */
var ThalassemiaSchema = new mongoose.Schema({
	status: {type: Number, required: true , default: 1},
	Thalassemia: {type: Number, required: false},
	caseId:{type:String,required:true},
	ngoId :{type:String,required:false},
	notes: {type:String,required:false},
}, {timestamps: true});

module.exports.Thalassemia = mongoose.model("Thalassemia", ThalassemiaSchema);

