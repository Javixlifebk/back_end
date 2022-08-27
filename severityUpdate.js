var MONGODB_URL = "mongodb://127.0.0.1:27017/javix";
var mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
	//don't show the log when it is test
	if(process.env.NODE_ENV !== "test") {
		console.log("Connected to %s", MONGODB_URL);
		console.log("App is running ... \n");
		console.log("Press CTRL + C to stop the process. \n");
	}
})
	.catch(err => {
		console.error("App starting error:", err.message);
		process.exit(1);
	});
var db = mongoose.connection;

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

ScreeningCase = mongoose.model("ScreeningCase", ScreeningCaseSchema);
ScreeningCase.find({}).then(async (docs)=>{
	if(docs!=null && docs.length>0){
		let rCount=docs.length;
		for(let i=0;i<rCount;i++){
			// Update Severity Variable
			let cDoc=docs[i];
			let severity_bp=0;
			let severity_spo2=0;
			let severity_temperature=0;
			let severity_pulse=0;
			let severity_bmi=0;
			let severity_respiratory_rate=0;
			let severity=0;
			
							if(cDoc.temperature.length!=0 && isNaN(parseInt(cDoc.temperature))==false)
							 { 
							   cDoc.temperature=parseFloat(cDoc.temperature);
							   if(cDoc.temperature>=102.38 || cDoc.temperature<=95) 
								 {
									severity_temperature=2;
								  }
							   else if(cDoc.temperature>=100.4 || cDoc.temperature<96.98) 
								 {
								    severity_temperature=1;
								 }
							   else if( cDoc.temperature>=97.7 || cDoc.temperature<=99.5) 
								 {
									severity_temperature=0; 
								 }
							   
							 } 

							if(cDoc.spo2.length!=0 && isNaN(parseInt(cDoc.spo2))==false)
											 { 
											   cDoc.spo2=parseFloat(cDoc.spo2);
											   if(cDoc.spo2>100 || cDoc.spo2<90) 
												{
													severity_spo2=2;
												 }
											   else if(cDoc.spo2>=90 && cDoc.spo2<=94)
												{
													severity_spo2=1;
												 }
											   else if( cDoc.spo2>=95 || cDoc.spo2<=100)
												{
													severity_spo2=0;
												 }
											   
											 }
							if(cDoc.pulse.length!=0 && isNaN(parseInt(cDoc.pulse))==false)
											 { 
											   cDoc.pulse=parseFloat(cDoc.pulse);
											   if(cDoc.pulse>100 || cDoc.pulse<60) {
													severity_pulse=2;
												 }
											   else if(cDoc.pulse>=100 || cDoc.pulse<=60) {
													severity_pulse=1;
												 }
											   else if( cDoc.pulse>60 || cDoc.pulse<=99) {
													severity_pulse=0;
												 }
											   
											 }
							if(cDoc.respiratory_rate.length!=0 && isNaN(parseInt(cDoc.respiratory_rate))==false)
											 { cDoc.respiratory_rate=parseFloat(cDoc.respiratory_rate);
											   if(cDoc.respiratory_rate>24 || cDoc.respiratory_rate<12) {
													severity_respiratory_rate=2;
												 }
											   else if(cDoc.respiratory_rate>=22 || cDoc.respiratory_rate<=14) {
													severity_respiratory_rate=1;
												 }
											   else if( cDoc.respiratory_rate>=12 || cDoc.respiratory_rate<=20) {
													severity_respiratory_rate=0;
												 }
											   
											 }

							if(cDoc.bpsys.length!=0 && isNaN(parseInt(cDoc.bpsys))==false && cDoc.bpdia.length!=0 && isNaN(parseInt(cDoc.bpdia))==false)
											 { 
											   cDoc.bpsys=parseInt(cDoc.bpsys);
											   cDoc.bpdia=parseInt(cDoc.bpdia);
											   if(cDoc.bpsys>=160 || cDoc.bpdia<=70 || cDoc.bpdia>=90 || cDoc.bpsys<=100) {
													severity_bp=2;
												 }
											   else if(cDoc.bpsys>=130 || cDoc.bpdia<=75 || cDoc.bpdia>=85 || cDoc.bpsys<=110) {
													severity_bp=1;
												 }
											   else if(cDoc.bpsys>=120 && cDoc.bpdia<=80) {
													severity_bp=0;
												 }
											   
											 }
							if(cDoc.bmi.length!=0 && isNaN(parseInt(cDoc.bmi))==false)
											 { 
											   cDoc.bmi=parseFloat(cDoc.bmi);
											   if(cDoc.bmi>=18.5 && cDoc.bmi<=24.9) {
													severity_bmi=0;
												 }
											   else if((cDoc.bmi>=24.9 && cDoc.bmi<=29.9) || (cDoc.bmi<=18.5)) {
													severity_bmi=1;
												 }
											   else {
													severity_bmi=2;
												 }
											 }
							var temp=(severity_bmi*4.76*0.5)+(severity_respiratory_rate*9.52*0.5)+(severity_pulse*14.28*0.5)+(severity_temperature*19.04*0.5)+
							(severity_spo2*23.80*0.5)+(severity_bp*28.60*0.5);

							if(temp<20){
								severity=0;
							}
							else if(temp<40){
								severity=1;
							}
							else{
								severity=2;
							}
			
			// Update Severity Column in Docs
			await ScreeningCase.findOneAndUpdate({_id:docs[i]._id},
				{
					severity_bp:severity_bp,         
					severity_spo2:severity_spo2,
					severity_temperature:severity_temperature,
					severity_pulse:severity_pulse,
					severity_bmi:severity_bmi,
					severity_respiratory_rate:severity_respiratory_rate,
					severity:severity
				},
				{new:true, upsert: true}
			);
		
			
		}
	}
});



