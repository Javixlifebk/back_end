var mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
var HemoglobinSchema = new mongoose.Schema({
	caseId: {type: String, required: true},
	hemoglobin: {type: String, required: true},
	notes: {type: String, required: false},
	citizenId: {type: String, required: true},
	screenerId: {type: String, required: true},
	severity: {type:Number, default:3, required:false},   //0-green, 1-amber, 2-red , 3-Default
}, {timestamps: true});

let model=mongoose.model("Hemoglobin", HemoglobinSchema);

//Severity CALCULATOR
HemoglobinSchema.pre("save",function(){
console.log("------------Presave-------------------------");
	if(this.hemoglobin.length!=0 && isNaN(this.hemoglobin)==false)
					 { 
					   this.hemoglobin=parseFloat(this.hemoglobin);
					   
					   if(this.hemoglobin>16 ||  this.hemoglobin<11)
					    {this.severity=2; }
					   else if(this.hemoglobin>=15.5 ||  this.hemoglobin<12) 
					   	{this.severity=1; }
					   else if(this.hemoglobin>=12 ||  this.hemoglobin<=16)
					   	{this.severity=0; }
					   
					   console.log("------------Presave Done-------------------------");
					   
					 } 

})

//End of Severity Calculator


module.exports.Hemoglobin = model;