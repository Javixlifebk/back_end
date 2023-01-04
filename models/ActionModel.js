var mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
var ActionSchema = new mongoose.Schema({
	itemId:{type: String, required: true},
	roleId:{type: Number, required: true,default: 0},
	linkName:{type: String, required: true},
	linkURL:{type: String, required: true},
	parentId:{type: String,required:true},
	ngoId :{type:String,required:false},
	type:{type: String,required:true},
	isActive: {type: Boolean, required: true, default: 1},
}, {timestamps: true});
var ActionModel= mongoose.model("Actions", ActionSchema);
module.exports =ActionModel;
