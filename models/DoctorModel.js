var mongoose = require("mongoose");

/*  Collection Name : Doctor */
var DoctorSchema = new mongoose.Schema({
	doctorId: {type: String, required: true},
	ngoId :{type:String,required:false},
	firstName: {type: String, required: true},
	lastName: {type: String, required: true},
	sex: {type: String, required: true},
	mobile: {type: String, required: true},
    email: {type: String, required: true},
    doctorLoginId:{type:String,required:true},
    signature: {type:String,required:false},
    medicalRegNo: {type:String,required:true},
    yearOfReg: {type:String,required:false},
    statteMedicalCouncil: {type:String,required:false},
    experience: {type:String,required:true},
    referenceName: {type:String,required:false},
    type: {type:String,required:false}
}, {timestamps: true});

// doctorLoginId=>{User=>userId}
module.exports.Doctor = mongoose.model("Doctors", DoctorSchema);

var DoctorDocSchema = new mongoose.Schema({
	doctorId: {type: String, required: true},
	ngoId:{type:String,required:true},
	doctorLoginId:{type:String,required:true},
	photo: {type: String, required: true},
	signature: {type: String, required: true},
}, {timestamps: true});

// doctorLoginId=>{User=>userId}
module.exports.doctorDoc = mongoose.model("DoctorDocs", DoctorDocSchema);

/*  Collection Name : DoctorDetails */
var DoctorDetailsSchema = new mongoose.Schema({
	doctorDetailId: {type: String, required: true},
	dateOfBirth: {type: Date, required: true,default:Date.now()},
    dateOfOnBoarding: {type: Date, required: true,default:Date.now()},
    qualification: {type: String, required:true},
	ngoId :{type:String,required:false},
    specialisation: {type: String, required:true},
	country: {type: String, required: true},
    state: {type: String, required:true},
    district: {type: String, required:true},
    address: {type: String, required:true},
	pincode: {type: String},
	photo: {type: String,required: false},
    rating : {type: Number, required: true, default: 0},
    geolocations : {lat:{type:Number,default:-1},lng:{type:Number,default:-1}},
    doctorId: {type: String, required: true}
}, {timestamps: true});
// doctorId=>{DoctorSchema=>doctorId}
module.exports.DoctorDetails = mongoose.model("DoctorDetails", DoctorDetailsSchema);

/*  Collection Name : DoctorAvailability */
var DoctorAvailabilitySchema = new mongoose.Schema({
	day: {type: String, required: true},
	timeslots: {type: String, required: true},
	doctorId: {type: String, required: true}
	
}, {timestamps: true});
// doctorId=>{DoctorSchema=>doctorId}
//1-sunday 7-saturday
//1-00:00-00:30, 2-00:30-01:00
module.exports.DoctorAvailability = mongoose.model("DoctorAvailability", DoctorAvailabilitySchema);


/*  Collection Name : DoctorTransactionTypes */
var DoctorTransactionTypeSchema = new mongoose.Schema({
	typeId: {type: String, required: true},
	type: {type: String, required: true},
	text: {type: String, required: true,default:''},
	InteractionPartyName: {type: String, required: true}
	}, {timestamps: true});
module.exports.DoctorTransactionType = mongoose.model("DoctorTransactionTypes", DoctorTransactionTypeSchema);


/*  Collection Name : DoctorTransactions */
var DoctorTransactionSchema = new mongoose.Schema({
	transactionId: {type: String, required: true},
	DoctorId: {type: String, required: true},
	typeId: {type: String, required: true},
	InteractionParty: {type: String, required: true},
	}, {timestamps: true});
//DoctorId=>{DoctorSchema=>doctorId}
//typeId=>{DoctorTransactionTypeSchema=>typeId}
module.exports.DoctorTransaction = mongoose.model("DoctorTransactions", DoctorTransactionSchema);


/*  Collection Name : DoctorTransactionStatus */
var DoctorTransactionStatusSchema = new mongoose.Schema({
	statusId: {type: String, required: true},
	status: {type: String, required: true},
	text: {type: String, required: true,}
    
	}, {timestamps: true});
module.exports.DoctorTransactionStatus = mongoose.model("DoctorTransactionStatus", DoctorTransactionStatusSchema);



/*  Collection Name : DoctorRecords */
var DoctorRecordsSchema = new mongoose.Schema({
	recordId: {type: String, required: true},
	url: {type: String, required: true},
	status: {type: Number, required: true}
    
	}, {timestamps: true});
module.exports.DoctorRecords = mongoose.model("DoctorRecords", DoctorRecordsSchema);
//status=>{ScreenerTransactionStatusSchema=>status}


/*  Collection Name : DoctorTransactionDetails */
var DoctorTransactionDetailsSchema = new mongoose.Schema({
	dId: {type: String, required: true},
	transactionId: {type: String, required: true},
	recordId: {type: String, required: true},
    comments: {type: String, required: true},
    isError: {type: String, required: true},
	ngoId :{type:String,required:false},
	}, {timestamps: true});
module.exports.DoctorTransactionDetails = mongoose.model("DoctorTransactionDetails", DoctorTransactionDetailsSchema);
//recordId=>{DoctorRecordsSchema=>recordId}
//transactionId=>{DoctorTransactionSchema=>transactionId}







