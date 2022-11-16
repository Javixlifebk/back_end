var mongoose = require("mongoose");

mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
var CitizenSchema = new mongoose.Schema({
	citizenId: {type: String, required: true},
	firstName: {type: String, required: true},
	lastName: {type: String, required: true},
	sex: {type: String, required: true},
	mobile: {type: String},
    email: {type: String},
    aadhaar: {type: String, required:false},
    raadhaar: {type: String, required:false},
	javixId:{type:String,required:true},
    citizenLoginId:{type:String,required:true},
	Age : {type: String, required: false},
    pstatus : {type: Number, required: true , default: 0},
    isInstant: {type: Number, required: true , default: 0},
    screenerId :{type:String,required:true},
	isUnrefer: {type: Boolean, required: true, default: 0},
}, {timestamps: true});


module.exports.Citizen = mongoose.model("Citizens", CitizenSchema);


var CitizenDetailsSchema = new mongoose.Schema({
	citizenDetailId: {type: String, required: true},
	dateOfBirth: {type: Date, required: true,default:Date.now()},
    dateOfOnBoarding: {type: Date, required: true,default:Date.now()},
    bloodGroup: {type: String},
	country: {type: String, required:false},
    state: {type: String, required:false},
    district: {type: String, required:false},
    address: {type: String, required:false},
	pincode: {type: String, required:false},
	photo: {type: String},
    rating : {type: Number, required: false, default: 0},
	Age : {type: String, required: false},
    geolocations : {lat:{type:Number,default:-1},lng:{type:Number,default:-1}},
    citizenId: {type: String, required: true},
	isUnrefer: {type: Boolean, required: true, default: 0},
	caseStatus:{type: Number, required: false, default: 0}
}, {timestamps: true});

module.exports.CitizenDetails = mongoose.model("CitizenDetails", CitizenDetailsSchema);



/*  Collection Name : CitizenTransactionTypes */
var CitizenTransactionTypeSchema = new mongoose.Schema({
	typeId: {type: String, required: true},
	type: {type: String, required: true},
	text: {type: String, required: true,default:''},
	InteractionPartyName: {type: String, required: true},
	isUnrefer: {type: Boolean, required: true, default: 0},
	Age : {type: String, required: false},

	}, {timestamps: true});
module.exports.CitizenTransactionType = mongoose.model("CitizenTransactionTypes", CitizenTransactionTypeSchema);


/*  Collection Name : CitizenTransactions */
var CitizenTransactionSchema = new mongoose.Schema({
	transactionId: {type: String, required: true},
	citizenId: {type: String, required: true},
	typeId: {type: String, required: true},
	InteractionParty: {type: String, required: true},
	isUnrefer: {type: Boolean, required: true, default: 0},
	Age : {type: String, required: false},

	}, {timestamps: true});

module.exports.CitizenTransaction = mongoose.model("CitizenTransactions", CitizenTransactionSchema);


/*  Collection Name :CitizenTransactionStatus */
var CitizenTransactionStatusSchema = new mongoose.Schema({
	statusId: {type: String, required: true},
	status: {type: String, required: true},
	text: {type: String, required: true,},
	isUnrefer: {type: Boolean, required: true, default: 0},
	Age : {type: String, required: false},

    
	}, {timestamps: true});
module.exports.CitizenTransactionStatus = mongoose.model("CitizenTransactionStatus", CitizenTransactionStatusSchema);



/*  Collection Name : ScreenerRecords */
var CitizenRecordsSchema = new mongoose.Schema({
	recordUrl: {type: String, required: true},
	doctorId: {type: String, required: false},
	isUnrefer: {type: Boolean, required: true, default: 0},
	Age : {type: String, required: false},
	screenerId: {type: String, required: false},
	status: {type: Number, required: true},
	type: {type: String, required: true},
	citizenId : {type: String, required: true},
	description: {type: String, required: false}
    
	}, {timestamps: true});
module.exports.CitizenRecords = mongoose.model("CitizenRecords", CitizenRecordsSchema);



/*  Collection Name : CitizenTransactionDetails */
var CitizenTransactionDetailsSchema = new mongoose.Schema({
	dId: {type: String, required: true},
	transactionId: {type: String, required: true},
	recordId: {type: String, required: true},
    comments: {type: String, required: true},
    isError: {type: String, required: true},
	isUnrefer: {type: Boolean, required: true, default: 0},
	Age : {type: String, required: false},

	}, {timestamps: true});
module.exports.CitizenTransactionDetails = mongoose.model("CitizenTransactionDetails", CitizenTransactionDetailsSchema);






