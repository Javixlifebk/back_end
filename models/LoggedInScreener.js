var mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
var LoggedInScreenerSchema = new mongoose.Schema({
	screenerId: {type: String, required: true},
	isLoggedIn: {type: Boolean, required: true, default: false},
	inDate: {type: Date, required: true, default: Date.now()},
	outDate: {type: Date, required: true, default: Date.now()}
}, {timestamps: true});


module.exports.LoggedInScreener = mongoose.model("LoggedInScreener", LoggedInScreenerSchema);
