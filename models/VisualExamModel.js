var mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
var VisualExamsSchema = new mongoose.Schema({
	caseId: {type: String, required: true},
	// video: {
	// 	type:String
	// 	},
	visual_exam_file1:{type:String},
	visual_exam_file2:{type:String},
	image: {type: String, required: true},
	ngoId :{type:String,required:false},
	notes: {type: String, required: false},
	citizenId: {type: String, required: true},
	screenerId: {type: String, required: true},
}, {timestamps: true});


module.exports.VisualExam = mongoose.model("VisualExam", VisualExamsSchema);