var mongoose = require("mongoose");
var EyeTestSchema = new mongoose.Schema({
	caseId: {type: String, required: true},
	leyetest: {type: String, required: true},
	reyetest: {type: String, required: true},
	notes: {type: String, required: false},
	citizenId: {type: String, required: true},
	screenerId: {type: String, required: true},
	severity_reye: {type:Number, default:3, required:false},   //0-green, 1-amber, 2-red , 3-Default
	severity_leye: {type:Number, default:3, required:false},   //0-green, 1-amber, 2-red , 3-Default
}, {timestamps: true});

EyeTestSchema.pre("save",function(){
console.log("------------Presave-------------------------");
	if(this.reyetest.length!=0)
					 {
					   
					   if( this.reyetest=="6/6" || this.reyetest=="6/9")
					    {this.severity_reye=0; }
					   else if (this.reyetest=="6/12" || this.reyetest=="6/5") 
					   	{this.severity_reye=1; }
					   else
					   	{this.severity_reye=0; }
					   
					   console.log("------------Presave Done-------------------------");
					   
					 }
	if(this.leyetest.length!=0)
					 {
					   
					   if( this.leyetest=="6/6" || this.leyetest=="6/9")
					    {this.severity_leye=0; }
					   else if (this.leyetest=="6/12" || this.leyetest=="6/5") 
					   	{this.severity_leye=1; }
					   else
					   	{this.severity_leye=2; }
					   
					   console.log("------------Presave Done-------------------------");
					   
					 } 

})


module.exports.EyeTest = mongoose.model("EyeTest", EyeTestSchema);