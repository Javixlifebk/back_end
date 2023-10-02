var mongoose = require("mongoose");

/* Collection Name: Pharmacy */
var PharmacySchema = new mongoose.Schema({
	pharmacyId: {type: String, required: true},
	ngoId :{type:String,required:false},
	name: {type: String, required: true},
	owner: {type: String, required: true},
	mobile: {type: String, required: true},
	email: {type: String, required: true},
	pharmacyRegistrationNumber: {type: String, required: true},
	pharmacyLoginId: {type: String, required: true}
}, {timestamps: true});


module.exports.Pharmacy = mongoose.model("Pharmacy", PharmacySchema);

/* Collection Name: PharmacyDetails */
var PharmacyDetailsSchema = new mongoose.Schema({
	pharmacyDetailId: {type: String, required: true},
	pharmacyRegistrationNo: {type: String, required: true},
	dateOfRegistration: {type: Date, required: true, default:Date.now()},
	dateOfOnBoarding: {type: Date, required: true,default:Date.now()},
	availabilityId: {type: Number, required: true,default:0},
	country: {type: String, required: true},
    state: {type: String, required:true},
    district: {type: String, required:true},
    address: {type: String, required:true},
	ngoId :{type:String,required:false},
    photo: {type: String},
    isDefault: {type: Boolean, required: true, default: false},
    rating : {type: Number, required: true, default: 0},
    pharmacyId: {type: String, required: true},
}, {timestamps: true});

module.exports.PharmacyDetails = mongoose.model("PharmacyDetails", PharmacyDetailsSchema);
