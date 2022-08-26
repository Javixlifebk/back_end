var mongoose = require("mongoose");
var MedicalAllergySchema = new mongoose.Schema({
	allergydate: {type: Date, required: true, default: Date.now()},
	allergies: {type: String, required: false},
	citizenId: {type: String, required: true},
	allergyType: {type: String, required: true},
	doctorId: {type: String, required: false},
	screenerId: {type: String, required: false}
}, {timestamps: true});


module.exports.MedicalAllergy = mongoose.model("MedicalAllergy", MedicalAllergySchema);