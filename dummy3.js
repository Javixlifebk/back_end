const GeneralSurvey = require("./models/GeneralSurveyModel");
var MONGODB_URL ="mongodb+srv://admin123:Jzfq2n6b4n15@localhost:27017/javix";
var mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
	const _generate=()=>{
		
		var CURDATE=new Date();
		CURDATE.setDate(CURDATE.getDate()-1);
		var LASTDATE=new Date((CURDATE.getYear()+1900)+"-"+(CURDATE.getMonth()+1)+"-"+CURDATE.getDate());
		GeneralSurvey.aggregate([
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
					"familyId":1,
					"citizenId":1,
					"noOfFamilyMembers":1,
					"nameHead":1,
					"ageHead":1,
					"NoOfAdultMales":1,
					"NoOfAdultFemales":1,
					"NoOfChildrenMales":1,
					"NoOfChildrenFemales":1,
					"createdAt":1,
					"updatedAt":1,
					"screenerId":1,
					"citizenFirstName":"$citi.firstName",
					"firstName":"$result.firstName" ,
					"lastName": "$result.lastName",
					"issubscreener":"$result.issubscreener"
				}},
				{$out:"tmp_out_gs"}
		
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





