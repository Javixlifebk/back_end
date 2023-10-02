var mongoose = require("mongoose");
var RoleDetailsSchema = new mongoose.Schema({
	roleId: {type: Number, required: true, unique: true},
	ngoId :{type:String,required:false},
	roleName: {type: String, required: true},
	isActive: {type: Boolean, required: true, default: 0},
}, {timestamps: true});


var RoleModel= mongoose.model("RoleDetails", RoleDetailsSchema);

module.exports =RoleModel;
