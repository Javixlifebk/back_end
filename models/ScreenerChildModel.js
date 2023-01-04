var mongoose = require("mongoose");
var ScreenerChildSchema = new mongoose.Schema({
	screenerId: {type: String, required: true},
	ngoId :{type:String,required:false},
	parentScreenerId: {type: String, required: true}
}, {timestamps: true});


module.exports.ScreenerChild= mongoose.model("ScreenerChilds", ScreenerChildSchema);