var mongoose = require("mongoose");

var LoggedInDoctorSchema = new mongoose.Schema({
	doctorId: {type: String, required: true},
	isLoggedIn: {type: Number, required: true, default: 0},
	inDate: {type: Date, required: true, default: Date.now()},
	outDate: {type: Date, required: true, default: Date.now()}
}, {timestamps: true});


module.exports.LoggedInDoctors = mongoose.model("LoggedInDoctors", LoggedInDoctorSchema);
