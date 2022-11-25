var mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
/*  Collection Name : Screener */
var ScreenerSchema = new mongoose.Schema({
	screenerId: {type: String, required: true},
	firstName: {type: String, required: true},
	lastName: {type: String, required: true},
	sex: {type: String, required: true},
	mobile: {type: String, required: true},
	mobile1: {type: String, required: false},
	age: {type: String, required: false},
    email: {type: String, required: true},
    screenerLoginId:{type:String,required:true},
    ngoId :{type:String,required:false},
    parentId :{type:String,required:false},
	ismapped:{type:Boolean,required:false,default:0},
    issubscreener: {type:Number,required:false, default:0} //0 is false(screener) and 1 is true(sevika)
}, {timestamps: true});

// ngoId=>{NGOSchema=>ngoId}
//screener model
// screenerLoginId=>{User=>userId}
module.exports.Screener = mongoose.model("Screeners", ScreenerSchema);

/*  Collection Name : ScreenerDetails */
var ScreenerDetailsSchema = new mongoose.Schema({
	screenerDetailId: {type: String, required: true},
	dateOfBirth: {type: Date, required: true,default:Date.now()},
    dateOfOnBoarding: {type: Date, required: true,default:Date.now()},
    qualification: {type: String, required:true},
    specialisation: {type: String, required:true},
	country: {type: String, required: true},
    state: {type: String, required:true},
    district: {type: String, required:true},
    address: {type: String, required:true},
	pincode: {type: String},
	photo: {type: String},
    rating : {type: Number, required: true, default: 0},
    geolocations : {lat:{type:Number,default:-1},lng:{type:Number,default:-1}},
    screenerId: {type: String, required: true}
}, {timestamps: true});
// screenerId=>{ScreenerSchema=>screenerId}
module.exports.ScreenerDetails = mongoose.model("ScreenerDetails", ScreenerDetailsSchema);

/*  Collection Name : ScreenerAvailability */
var ScreenerAvailabilitySchema = new mongoose.Schema({
	availabilityId: {type: String, required: true},
	day: {type: Number, required: true},
	timeSlots: {type: String, required: true},
	screenerId: {type: String, required: true}
	
}, {timestamps: true});
// screenerId=>{ScreenerSchema=>screenerId}
module.exports.ScreenerAvailability = mongoose.model("ScreenerAvailability", ScreenerAvailabilitySchema);


/*  Collection Name : ScreenerTransactionTypes */
var ScreenerTransactionTypeSchema = new mongoose.Schema({
	typeId: {type: String, required: true},
	type: {type: String, required: true},
	text: {type: String, required: true,default:''},
	InteractionPartyName: {type: String, required: true}
	}, {timestamps: true});
module.exports.ScreenerTransactionType = mongoose.model("ScreenerTransactionTypes", ScreenerTransactionTypeSchema);


/*  Collection Name : ScreenerTransactions */
var ScreenerTransactionSchema = new mongoose.Schema({
	transactionId: {type: String, required: true},
	ScreenerId: {type: String, required: true},
	typeId: {type: String, required: true},
	InteractionParty: {type: String, required: true},
	}, {timestamps: true});
//ScreenerId=>{ScreenerSchema=>ngoId}
//typeId=>{ScreenerTransactionTypeSchema=>typeId}
module.exports.ScreenerTransaction = mongoose.model("ScreenerTransactions", ScreenerTransactionSchema);


/*  Collection Name : ScreenerTransactionStatus */
var ScreenerTransactionStatusSchema = new mongoose.Schema({
	statusId: {type: String, required: true},
	status: {type: String, required: true},
	text: {type: String, required: true,}
    
	}, {timestamps: true});
module.exports.ScreenerTransactionStatus = mongoose.model("ScreenerTransactionStatus", ScreenerTransactionStatusSchema);



/*  Collection Name : ScreenerRecords */
var ScreenerRecordsSchema = new mongoose.Schema({
	recordId: {type: String, required: true},
	url: {type: String, required: true},
	status: {type: Number, required: true}
    
	}, {timestamps: true});
module.exports.ScreenerRecords = mongoose.model("ScreenerRecords", ScreenerRecordsSchema);
//status=>{ScreenerTransactionStatusSchema=>status}


/*  Collection Name : ScreenerTransactionDetails */
var ScreenerTransactionDetailsSchema = new mongoose.Schema({
	dId: {type: String, required: true},
	transactionId: {type: String, required: true},
	recordId: {type: String, required: true},
    comments: {type: String, required: true},
    isError: {type: String, required: true}
	}, {timestamps: true});
module.exports.ScreenerTransactionDetails = mongoose.model("ScreenerTransactionDetails", ScreenerTransactionDetailsSchema);
//recordId=>{ScreenerRecordsSchema=>recordId}
//transactionId=>{ScreenerTransactionSchema=>transactionId}







