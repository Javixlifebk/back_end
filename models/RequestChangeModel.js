var mongoose = require("mongoose");

/* Collection Name: Ngos */
var RequestUpdatesSchema = new mongoose.Schema({
	recId: {type: String, required: true},
	userId: {type: String, required: true},
	updateQuery: {type: String, required: true},
	by: {type: String, required: true},
	roleId: {type: Number, required: true, default: 0},
	_status:{type: String, required: true,default: 0}
}, {timestamps: true});

// ngoLoginId=>{User=>userId}
module.exports.RequestUpdates = mongoose.model("RequestUpdates", RequestUpdatesSchema);
