var mongoose = require("mongoose");

var IssueSchema = new mongoose.Schema({
	issueNo:{type: String, required: true},
	userId: {type: String, required: true},
	issue: {type: String, required: true},
	issueDetails: {type: String, required: true},
	status: {type: Number, required: true, default: 0},
	comments: {type: String, required: false}
}, {timestamps: true});


module.exports = mongoose.model("Issue", IssueSchema);
