var mongoose = require("mongoose");
// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
var MedicalAllergySchema = new mongoose.Schema({
	allergydate: {type: Date, required: true, default: Date.now()},
	allergies: {type: String, required: false},
	ngoId :{type:String,required:false},
	citizenId: {type: String, required: true},
	allergyType: {type: String, required: true},
	doctorId: {type: String, required: false},
	screenerId: {type: String, required: false}
}, {timestamps: true});


module.exports.MedicalAllergy = mongoose.model("MedicalAllergy", MedicalAllergySchema);