var mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
var FamilyHistorySchema = new mongoose.Schema({
	fatherlivingage: {type: Number, required: false},
	fatherlivinghealth: {type: String, required: false},
	fatherdeceasedage: {type: Number, required: false},
	fatherdeceasedcause: {type: String, required: false},
	motherlivingage: {type: Number, required: false},
	motherlivinghealth: {type: String, required: false},
	motherdeceasedage: {type: Number, required: false},
	motherdeceasedcause: {type: String, required: false},
	siblingslivingage: {type: Number, required: false},
	siblingslivinghealth: {type: String, required: false},
	siblingsdeceasedage: {type: Number, required: false},
	siblingsdeceasedcause: {type: String, required: false},
	childrenlivingage: {type: Number, required: false},
	childrenlivinghealth: {type: String, required: false},
	childrendeceasedage: {type: Number, required: false},
	childrendeceasedcause: {type: String, required: false},
	problemmaternal: {type: String, required: false},
	problempaternal: {type: String, required: false},
	citizenId: {type: String, required: true},
	doctorId: {type: String, required: true},
	screenerId: {type: String, required: true}
}, {timestamps: true});


module.exports.FamilyHistory = mongoose.model("FamilyHistory", FamilyHistorySchema);