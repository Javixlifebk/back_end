var mongoose = require("mongoose");

var LoggedInScreenerSchema = new mongoose.Schema({
	screenerId: {type: String, required: true},
	isLoggedIn: {type: Boolean, required: true, default: false},
	inDate: {type: Date, required: true, default: Date.now()},
	outDate: {type: Date, required: true, default: Date.now()}
}, {timestamps: true});


module.exports.LoggedInScreener = mongoose.model("LoggedInScreener", LoggedInScreenerSchema);
