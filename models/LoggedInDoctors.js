var mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
var LoggedInDoctorSchema = new mongoose.Schema({
	doctorId: {type: String, required: true},
	ngoId :{type:String,required:false},
	isLoggedIn: {type: Number, required: true, default: 0},
	inDate: {type: Date, required: true, default: Date.now()},
	outDate: {type: Date, required: true, default: Date.now()}
}, {timestamps: true});


module.exports.LoggedInDoctors = mongoose.model("LoggedInDoctors", LoggedInDoctorSchema);
