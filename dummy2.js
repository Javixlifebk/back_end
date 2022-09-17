const Citizen = require("./models/CitizenModel");
var MONGODB_URL ="mongodb://127.0.0.1:27017/javix";
var mongoose = require("mongoose");
	const _generate=()=>{
		
		var CURDATE=new Date();
		CURDATE.setDate(CURDATE.getDate()-1);
		var LASTDATE=new Date((CURDATE.getYear()+1900)+"-"+(CURDATE.getMonth()+1)+"-"+CURDATE.getDate());
		Citizen.Citizen.aggregate([
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
                                        from:"citizendetails",
                                        localField: "citizenId",
                                        foreignField:"citizenId",
                                        as:"citizendetails"
                                        }
                                },
			
				{ "$project": {
					"firstName":1,
					"lastName":1,
					"sex":1,
					"mobile":1,
					"email":1,
					"pstatus":1,
					"isInstant":1,
					"citizenId":1,
					"javixId":1,
                                        "aadhaar":1,
                                        "raadhaar":1,
					"citizenLoginId":1,
					"createdAt":1,
					"screenerId":1,
					"ScreenerfirstName":"$result.firstName" ,
					"ScreenerlastName": "$result.lastName",
					"citizenAddress":"$citizendetails.address",
					"citizenDOB":"$citizendetails.dateOfBirth",
					"issubscreener":"$result.issubscreener",
				}},
				{$match:{
						pstatus:0	
							
						}
				},
				{$out:"tmp_out_citizens"}
		
		]).then(recs => {
			if(recs){
				
				
				process.exit(1);
			}
		});
		
	}

	mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false }).then(() => {
	
		
		_generate();
		
		
	
	}).catch(err => {
		console.error("App starting error:", err.message);
		process.exit(1);
	});





