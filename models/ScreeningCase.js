var mongoose = require("mongoose");
//var autoIncrement = require('mongoose-auto-increment');


/*  Collection Name : ScreeningCase */
var ScreeningCaseSchema = new mongoose.Schema({
	citizenId: {type: String, required: true},
	doctorId: {type: String, required: false},
	screenerId: {type: String, required: false},
	notes: {type: String, required: false},
	status: {type: Number, required: true , default: 1},
	height: {type: String, required: false},
	weight: {type: String, required: false},
	bmi: {type: String, required: false},
	bpsys: {type: String, required: false},
	arm: {type: Number, required: false},
	bpdia: {type: String, required: false},
	spo2: {type: String, required: false},
	pulse: {type: String, required: false},
	respiratory_rate: {type: String, required: false},
	temperature: {type: String, required: false},
    referDocId: {type: String, required: false},
    severity_bp: {type:Number, default:0, required:false},   //0-green, 1-amber, 2-red , 0-Default
    severity_spo2: {type:Number, default:0, required:false},   //0-green, 1-amber, 2-red , 0-Default
    severity_temperature: {type:Number, default:0, required:false},   //0-green, 1-amber, 2-red , 0-Default
    severity_pulse: {type:Number, default:0, required:false},   //0-green, 1-amber, 2-red , 0-Default
    severity_bmi: {type:Number, default:0, required:false},   //0-green, 1-amber, 2-red , 0-Default
    severity_respiratory_rate: {type:Number, default:0, required:false},   //0-green, 1-amber, 2-red , 0-Default
    severity: {type:Number, default:0, required:false},   //0-green, 1-amber, 2-red , 0-Default
    caseId:{type:String,required:true},
}, {timestamps: true});

//Severity CALCULATOR
ScreeningCaseSchema.pre("save",function(){
console.log("------------Presave-------------------------");
	if(this.temperature.length!=0 && isNaN(parseInt(this.temperature))==false)
					 { 
					   this.temperature=parseFloat(this.temperature);
					   if(this.temperature>=102.38 || this.temperature<=95) 
					   	 {
					   	 	this.severity_temperature=2;
					   	  }
					   else if(this.temperature>=100.4 || this.temperature<96.98) 
					   	 {
					   	 	this.severity_temperature=1;
					   	 }
					   else if( this.temperature>=97.7 || this.temperature<=99.5) 
					   	 {
					   	 	this.severity_temperature=0; 
					   	 }
					   
					 } 

	if(this.spo2.length!=0 && isNaN(parseInt(this.spo2))==false)
					 { 
					   this.spo2=parseFloat(this.spo2);
					   if(this.spo2>100 || this.spo2<90) 
					   	{
					   	 	this.severity_spo2=2;
					   	 }
					   else if(this.spo2>=90 && this.spo2<=94)
					   	{
					   	 	this.severity_spo2=1;
					   	 }
					   else if( this.spo2>=95 || this.spo2<=100)
					   	{
					   	 	this.severity_spo2=0;
					   	 }
					   
					 }
	if(this.pulse.length!=0 && isNaN(parseInt(this.pulse))==false)
					 { 
					   this.pulse=parseFloat(this.pulse);
					   if(this.pulse>100 || this.pulse<60) {
					   	 	this.severity_pulse=2;
					   	 }
					   else if(this.pulse>=100 || this.pulse<=60) {
					   	 	this.severity_pulse=1;
					   	 }
					   else if( this.pulse>60 || this.pulse<=99) {
					   	 	this.severity_pulse=0;
					   	 }
					   
					 }
	if(this.respiratory_rate.length!=0 && isNaN(parseInt(this.respiratory_rate))==false)
					 { this.respiratory_rate=parseFloat(this.respiratory_rate);
					   if(this.respiratory_rate>24 || this.respiratory_rate<12) {
					   	 	this.severity_respiratory_rate=2;
					   	 }
					   else if(this.respiratory_rate>=22 || this.respiratory_rate<=14) {
					   	 	this.severity_respiratory_rate=1;
					   	 }
					   else if( this.respiratory_rate>=12 || this.respiratory_rate<=20) {
					   	 	this.severity_respiratory_rate=0;
					   	 }
					   
					 }

	if(this.bpsys.length!=0 && isNaN(parseInt(this.bpsys))==false && this.bpdia.length!=0 && isNaN(parseInt(this.bpdia))==false)
					 { 
					   this.bpsys=parseInt(this.bpsys);
					   this.bpdia=parseInt(this.bpdia);
					   if(this.bpsys>=160 || this.bpdia<=70 || this.bpdia>=90 || this.bpsys<=100) {
					   	 	this.severity_bp=2;
					   	 }
					   else if(this.bpsys>=130 || this.bpdia<=75 || this.bpdia>=85 || this.bpsys<=110) {
					   	 	this.severity_bp=1;
					   	 }
					   else if(this.bpsys>=120 && this.bpdia<=80) {
					   	 	this.severity_bp=0;
					   	 }
					   
					 }
	if(this.bmi.length!=0 && isNaN(parseInt(this.bmi))==false)
					 { 
					   this.bmi=parseFloat(this.bmi);
					   if(this.bmi>=18.5 && this.bmi<=24.9) {
					   	 	this.severity_bmi=0;
					   	 }
					   else if((this.bmi>=24.9 && this.bmi<=29.9) || (this.bmi<=18.5)) {
					   	 	this.severity_bmi=1;
					   	 }
					   else {
					   	 	this.severity_bmi=2;
					   	 }
					 }
	var temp=(this.severity_bmi*4.76*0.5)+(this.severity_respiratory_rate*9.52*0.5)+(this.severity_pulse*14.28*0.5)+(this.severity_temperature*19.04*0.5)+
	(this.severity_spo2*23.80*0.5)+(this.severity_bp*28.60*0.5);

	if(temp<20){
		this.severity=0;
	}
	else if(temp<40){
		this.severity=1;
	}
	else{
		this.severity=2;
	}

})

//End of Severity Calculator


var ScreeningCaseDetailsSchema = new mongoose.Schema({
	abdomenpain: {type: String},
	fever: {type: String},
    backneckpain: {type: String},
    diarrhea: {type: String},
    hypertension: {type: String},
	caseId:{type:String,required:true}
}, {timestamps: true});

module.exports.ScreeningCaseDetails = mongoose.model("ScreeningCaseDetails", ScreeningCaseDetailsSchema);


// autoIncrement.initialize(mongoose.connection);
// ScreeningCaseSchema.plugin(autoIncrement.plugin, 'ScreeningCase');

module.exports.ScreeningCase = mongoose.model("ScreeningCase", ScreeningCaseSchema);


//Status values
//1. New case
//2. Assigned to doctor
//3. Cancelled and pullbacked to new case category
//4. E prescribed by doctor
//5. Rescreened by screener