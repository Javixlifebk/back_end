const Socio = require("./models/SocioEconomicSurveyModel");
var MONGODB_URL ="mongodb://admin123:Jzfq2n6b4n15@localhost:27017/javix?authSource=admin";
var mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
	const _generate=()=>{
		
		var CURDATE=new Date();
		CURDATE.setDate(CURDATE.getDate()-1);
		var LASTDATE=new Date((CURDATE.getYear()+1900)+"-"+(CURDATE.getMonth()+1)+"-"+CURDATE.getDate());
		Socio.aggregate([
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
					"socioeconomicsurveyId":1,
"citizenId":1,
"familyId":1,
"noOfEarners":1,
"nameOfEarners":1,
"ageOfEarners":1,
"occupationOfEarners":1,
"isBankAccount":1,
"statusOfHouse":1,
"totalIncome":1,
"foodExpense":1,
"healthExpense":1,
"educationExpense":1,
"intoxicationExpense":1,
"conveyanceExpense":1,
"cultivableLand":1,
"createdAt":1,
					"updatedAt":1,
					"screenerId":1,
					"citizenFirstName":"$citi.firstName" ,
					"firstName":"$result.firstName" ,
					"lastName": "$result.lastName",
					"issubscreener":"$result.issubscreener"
				}},
				{$match:{
							
							
						}
				},
				{$out:"tmp_out_ss"}
		
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





