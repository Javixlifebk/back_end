var mongoose = require("mongoose");
var MedicalHistorySchema = new mongoose.Schema({
	diabetes: {type: String, required: false},
	high_bp: {type: String, required: false},
	high_cholestrol: {type: String, required: false},
	goiter: {type: String, required: false},
	cancer: {type: String, required: false},
	leukemia: {type: String, required: false},
	psoriasis: {type: String, required: false},
	agina: {type: String, required: false},
	type_of_cancer: {type: String, required: false},
	heart_problems: {type: String, required: false},
	heart_murmur: {type: String, required: false},
	pneumonia: {type: String, required: false},
	pulmonary_embolism: {type: String, required: false},
	asthma: {type: String, required: false},
	emphysema: {type: String, required: false},
	stroke: {type: String, required: false},
	epilepsy: {type: String, required: false},
	cataracts: {type: String, required: false},
	kidney_disease: {type: String, required: false},
	kidney_stones: {type: String, required: false},
	chrohns_disease: {type: String, required: false},
	colitis: {type: String, required: false},
	anemia: {type: String, required: false},
	jaundice: {type: String, required: false},
	hepatitis: {type: String, required: false},
	stomach: {type: String, required: false},
	rheumatic_fever: {type: String, required: false},
	tuberculosis: {type: String, required: false},
	hiv_aids: {type: String, required: false},
	other: {type: String, required: false},
	citizenId: {type: String, required: true},
	doctorId: {type: String, required: false},
	screenerId: {type: String, required: false}
}, {timestamps: true});


module.exports.MedicalHistory = mongoose.model("MedicalHistory", MedicalHistorySchema);