var mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
var UserSchema = new mongoose.Schema({
	userName: {type: String, required: true},
	userId: {type: String, required: true, index: true},
	ngoId: {type: String},
	roleId: {type: Number, required: true, default: 0},
	password: {type: String, required: true},
	email: {type: String},
	isConfirmed: {type: Boolean, required: true, default: 0},
	confirmOTP: {type: String, required:false},
	otpTries: {type: Number, required:false, default: 0},
	status: {type: Number, required: true, default: 0},
	// logo:{type: String, required: false},
	// client_logo:{type: String, required: false},
}, {timestamps: true});

// Virtual for user's full name
UserSchema
	.virtual("user_name")
	.get(function () {
		return this.userName;
	});

module.exports = mongoose.model("User", UserSchema);
