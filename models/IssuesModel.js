var mongoose = require("mongoose");
// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
var IssueSchema = new mongoose.Schema({
	issueNo:{type: String, required: true},
	userId: {type: String, required: true},
	ngoId :{type:String,required:false},
	issue: {type: String, required: true},
	issueDetails: {type: String, required: true},
	status: {type: Number, required: true, default: 0},
	comments: {type: String, required: false}
}, {timestamps: true});


module.exports = mongoose.model("Issue", IssueSchema);
