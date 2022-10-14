const HealthSurvey = require("./models/HealthSurveyModel");
var MONGODB_URL ="mongodb://admin123:Jzfq2n6b4n15@localhost:27017/javix?authSource=admin";
var mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
	const _generate=()=>{
		
		var CURDATE=new Date();
		CURDATE.setDate(CURDATE.getDate()-1);
		var LASTDATE=new Date((CURDATE.getYear()+1900)+"-"+(CURDATE.getMonth()+1)+"-"+CURDATE.getDate());
		HealthSurvey.aggregate([
				{$sort:{'createdAt':-1}},
				{
					$lookup:{
					from:"screeners",
					localField: "screenerId",
					foreignField:"screenerId",
					as:"result"
				}	
				},
				{
                                        $lookup:{
                                        from:"citizens",
                                        localField: "citizenId",
                                        foreignField:"citizenId",
                                        as:"citi"
                                }
                                },
				{"$unwind":"$result"},
			
				{ "$project": {
					"healthsurveyId":1,
"citizenId":1,
"familyId":1,
"drinkingWaterSource":1,
"drinkingWaterDistance":1,
"isdrinkingWaterTreatmentRequired":1,
"NoOfPersonUsingToilets":1,
"NonUsageOfToilets":1,
"DistanceOfSubcenters":1,
"DistanceOfPrimaryHealthcenters":1,
"DistanceOfCommunityHealthcenters":1,
"DistanceOfDistrictHospitals":1,
"DistanceOfPathologyLab":1,
"DistanceOfMedicalStore":1,
"StatusOfDeliveryOfChildren":1,
"StatusOfVaccinationOfChildren":1,
"StatusOfFemaleRelatedProblem":1,
"CentrallyIssuedHealthInsurance":1,
"StateIssuedHealthInsurance":1,
"PersonalHealthInsurance":1,
"bpStatus":1,
"hbTestStatusFemale":1,
"sugarTestStatus":1,
"smokingStatus":1,
"alcoholStatus":1,
"tobaccoStatus":1,
"createdAt":1,
"updatedAt":1,
					"screenerId":1,
					"citizenFirstName":"$citi.firstName",
					"firstName":"$result.firstName" ,
					"lastName": "$result.lastName",
					"issubscreener":"$result.issubscreener"
				}},
				{$match:{
							
							
						}
				},
				{$out:"tmp_out_hs"}
		
		]).then(recs => {
			if(recs){
				
				
				process.exit(1);
			}
		});
		
	}

	mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true ,useFindAndModify:false}).then(() => {
	
		_generate();
		
		
	
	}).catch(err => {
		console.error("App starting error:", err.message);
		process.exit(1);
	});





