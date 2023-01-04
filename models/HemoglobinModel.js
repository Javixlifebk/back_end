var mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
var HemoglobinSchema = new mongoose.Schema({
	caseId: {type: String, required: true},
	hemoglobin: {type: String, required: true},
	ngoId :{type:String,required:false},
	notes: {type: String, required: false},
	citizenId: {type: String, required: true},
	screenerId: {type: String, required: true},
	severity: {type:Number, default:0, required:false},   //0-green, 1-amber, 2-red , 3-Default
}, {timestamps: true});

let model=mongoose.model("Hemoglobin", HemoglobinSchema);

//Severity CALCULATOR
HemoglobinSchema.pre("save",function(){
	if(this.hemoglobin.length!=0 && isNaN(this.hemoglobin)==false)
					 { 
					   this.hemoglobin=parseFloat(this.hemoglobin);
					   
					//    if(this.hemoglobin>16 ||  this.hemoglobin<11)
					//     {this.severity=2; }//red
					//    else if(this.hemoglobin>=15.5 ||  this.hemoglobin<12) 
					//    	{this.severity=1; }//amber
					//    else if(this.hemoglobin>=12 ||  this.hemoglobin<=16)
					//    	{this.severity=0; } //green


						   if((this.hemoglobin>=3 && this.hemoglobin<=6.9) || (this.hemoglobin>=18.1 &&  this.hemoglobin<=24))
						   {this.severity=2; }//red
						  else if((this.hemoglobin>=7 &&  this.hemoglobin<=11.5) || (this.hemoglobin>=16.7 &&  this.hemoglobin<=18)) 
							  {this.severity=1; }//amber
						  else if(this.hemoglobin>=11.6 &&  this.hemoglobin<=16.6)
							  {this.severity=0; } //green
					   
					   
					 } 

})

//End of Severity Calculator


module.exports.Hemoglobin = model;