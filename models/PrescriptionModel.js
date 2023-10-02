var mongoose = require("mongoose");
// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
/*  Collection Name : Prescription */
var PrescriptionSchema = new mongoose.Schema({
	prescriptionId: {type: String, required: true},
	doctorId: {type: String, required: false},
	caseId: {type: String, required: true},
    ngoId :{type:String,required:false},
    isUnrefer :{type:Number,required:true,default:2},
	citizenId: {type: String, required: true},
	screenerId: {type: String, required: true},
	recordId: {type: String, required: false},
    cause: {type: String, required: false},
	status: {type: Number, required: true , default: 1},
    medicine: {type: String, required: false}, //drug name
    strength: {type: String, required: false}, //strength
    tests: {type: String, required: false}, 
    quantity:{type: String, required: false}, //Quantity
    duaration :{type: String, required: false}, //Duaration
    direction :{type: String, required: false}, //Direction
    frequency :{type: String, required: false}, //Frequency
    dose:{type: String, required: false},  //Dose
    preparation:{type: String, required: false},  //preparation
    route:{type: String, required: false},  //Route
    comments: {type: String, required: false}//Other Instructions
}, {timestamps: true});


module.exports.Prescription = mongoose.model("Prescription", PrescriptionSchema);


//1.Prescribed
//2.Pending
//3.Error