const Screening = require("./models/ScreeningCase");
const config=require('./config')
var mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
	const _generate=(_status)=>{
		
		var CURDATE=new Date();
		CURDATE.setDate(CURDATE.getDate()-1);
		var LASTDATE=new Date((CURDATE.getYear()+1900)+"-"+(CURDATE.getMonth()+1)+"-"+CURDATE.getDate());
		Screening.ScreeningCase.aggregate([
				{$sort:{'createdAt':-1}},
				{
					$lookup:{
					from:"screeners",
					localField: "screenerId",
					foreignField:"screenerId",
					as:"result"
				}	
				},
				{"$unwind":"$result"},
				{
                                        $lookup:{
                                        from:"citizens",
                                        localField: "citizenId",
                                        foreignField:"citizenId",
                                        as:"citizen"
                                        }
                                },
				
			        {
                                        $lookup:{
                                        from:"citizendetails",
                                        localField: "citizenId",
                                        foreignField:"citizenId",
                                        as:"citizendetails"
                                        }
                                },
			
				{ "$project": {
					'_id':1, 
					'notes':1,
					'doctorId':1,
					'status':1,
					'screenerId':1,
					'height':1,
					'weight':1,
					'bmi':1,
					'bpsys':1,
					'bpdia':1,
					'arm':1,
					'spo2':1,
					'caseId':1,
					'pulse':1,
					'respiratory_rate':1,
					'temperature':1,
					'citizenId':1,
					'referDocId':1,
					'createdAt':1,
					'severity_bp':1,
					'severity_bmi':1,
					'severity_spo2':1,
					'severity_pulse':1,
					'severity_temperature':1,
					'severity_respiratory_rate':1,
					'severity':1,
					"firstName":"$result.firstName" ,
					"lastName": "$result.lastName",
					"citizenLastName":"$citizen.lastName",
					"citizenFirstName":"$citizen.firstName",
					"citizenEmail":"$citizen.email",
					"citizenSex":"$citizen.sex",
					"citizenAadhaar":"$citizen.aadhaar",
					"citizenPhone":"$citizen.mobile",
					"citizenAddress":"$citizendetails.address",
					"citizenDOB":"$citizendetails.dateOfBirth",
					"issubscreener":"$result.issubscreener",
				}},
				{$match:{
						issubscreener:_status	
							
						}
				},
				{$out:"tmp_out"+_status}
		
		]).then(recs => {
			if(recs){
				if(_status==0){
				_generate(_status+1);}
				else process.exit(1);
			}
		});
		
	}

	mongoose.connect(config.databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
	
		_generate(0);
		
		
	
	}).catch(err => {
		console.error("App starting error:", err.message);
		process.exit(1);
	});





