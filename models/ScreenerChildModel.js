var mongoose = require("mongoose");
var ScreenerChildSchema = new mongoose.Schema({
	screenerId: {type: String, required: true},
	parentScreenerId: {type: String, required: true}
}, {timestamps: true});


module.exports.ScreenerChild= mongoose.model("ScreenerChilds", ScreenerChildSchema);