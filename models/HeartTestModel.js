var mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
var HeartTestSchema = new mongoose.Schema({
	caseId: {type: String, required: true},
	ngoId :{type:String,required:false},
	url: {type: String, required: true},
	notes: {type: String, required: false},
	citizenId: {type: String, required: true},
	screenerId: {type: String, required: true}
}, {timestamps: true});


module.exports.HeartTest = mongoose.model("HeartTest", HeartTestSchema);