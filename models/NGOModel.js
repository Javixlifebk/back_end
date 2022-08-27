var mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
/* Collection Name: Ngos */
var NGOSchema = new mongoose.Schema({
	ngoId: {type: String, required: true},
	name: {type: String, required: true},
	owner: {type: String, required: true},
	mobile: {type: String, required: true},
	email: {type: String, required: true},
	ngoLoginId: {type: String, required: true}
}, {timestamps: true});

// ngoLoginId=>{User=>userId}
module.exports.NGO = mongoose.model("Ngos", NGOSchema);

/* Collection Name: NgoDetails */
var NGODetailsSchema = new mongoose.Schema({
	ngoDetailId: {type: String, required: true},
	ngoRegistrationNo: {type: String, required: true},
	dateOfRegistration: {type: Date, required: true, default:Date.now()},
	dateOfOnBoarding: {type: Date, required: true,default:Date.now()},
	availabilityId: {type: Number, required: true,default:0},
	country: {type: String, required: true},
    state: {type: String, required:true},
    district: {type: String, required:true},
    address: {type: String, required:true},
    photo: {type: String},
    isDefault: {type: Boolean, required: true, default: false},
    rating : {type: Number, required: true, default: 0},
    ngoId: {type: String, required: true},
}, {timestamps: true});
// ngoId=>{NGOSchema=>ngoId}
module.exports.NGODetails = mongoose.model("NgoDetails", NGODetailsSchema);


/* Collection Name: NgoAvailability */
var NGOAvailabilitySchema = new mongoose.Schema({
	availabilityId: {type: Number, required: true},
	day: {type: Number, required: true},
	timeSlots: {type: String, required: true},
	ngoId: {type: String, required: true},
	
}, {timestamps: true});
//ngoId=>{NGOSchema=>ngoId}
module.exports.ngo = mongoose.model("NgoAvailability", NGOAvailabilitySchema);


/* Collection Name: NgoTransactionTypes */
var NGOTransactionTypeSchema = new mongoose.Schema({
	typeId: {type: String, required: true},
	type: {type: String, required: true},
	text: {type: String, required: true},
	InteractionPartyName: {type: String, required: true}
	}, {timestamps: true});
module.exports.NGOTransactionTypes = mongoose.model("NgoTransactionTypes", NGOTransactionTypeSchema);



/* Collection Name: NgoTransactions */
var NGOTransactionSchema = new mongoose.Schema({
	transactionId: {type: Number, required: true},
	ngoId: {type: Number, required: true},
	statusId: {type: Number, required: true},
	typeId: {type: String, required: true},
	InteractionParty: {type: String, required: true},
	}, {timestamps: true});
//ngoId=>{NGOSchema=>ngoId}
//typeId=>{NGOTransactionTypeSchema=>typeId}
module.exports.NGOTransactions = mongoose.model("NgoTransactions", NGOTransactionSchema);


/* Collection Name: NgoTransactionStatus */
var NGOTransactionStatusSchema = new mongoose.Schema({
	statusId: {type: String, required: true},
	status: {type: String, required: true},
	text: {type: String, required: true}
	
	}, {timestamps: true});
//ngoId=>{NGOSchema=>ngoId}
//typeId=>{NGOTransactionTypeSchema=>typeId}
module.exports.NGOTransactionStatus = mongoose.model("NgoTransactionStatus", NGOTransactionStatusSchema);