const Screening = require("./models/ScreeningCase");
var MONGODB_URL ="mongodb://127.0.0.1:27017/javix";
var mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
        const _generate=(_status)=>{

                var CURDATE=new Date();
                CURDATE.setDate(CURDATE.getDate()-1);
                var LASTDATE=new Date((CURDATE.getYear()+1900)+"-"+(CURDATE.getMonth()+1)+"-"+CURDATE.getDate()); 
 
 
 
 Screening.ScreeningCase.aggregate(
        [
        {$match:{severity_bp:2,severity_bmi:2}},
         {$lookup: {  'localField':'citizenId',
         'from':'citizendetails', 
         'foreignField':'citizenId',
         'as':'citizen'  } },
         {$lookup:
                 {  'localField':'screenerId', 
                 'from':'screeners', 
                 'foreignField':'screenerId', 
                 'as':'screeners'  } },
 {$lookup: { 
         'localField':'citizenId', 
         'from':'citizens',
          'foreignField':'citizenId',
           'as':'citizens'  } },
          {$unwind:"$citizen"},{$unwind:"$citizens"},{$unwind:"$screeners"},
           {$project:{"citizenId":1,"FirstName":"$citizens.firstName","LastName":"$citizens.lastName","Email":"$citizens.email","Gender":"$citizens.sex","Address":"$citizen.address",
           "ScreenerId":"$citizens.screenerId","ScreenerFirstName":"$screeners.firstName","ScreenerLastName":"$screeners.lastName","Mobile":"$citizens.mobile",
           Age:{$divide: [{$subtract: [ new Date(), "$citizen.dateOfBirth" ] },(365 * 24*60*60*1000)] }}},
           {$match:{Age: { $gte: 40 }}},
           {$out:"lipidcritical"}]).then(recs => {
                        if(recs){
                                console.log(recs);
                                process.exit(1);
                        }
                });

        }

        mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {

                console.log("Connected to %s", MONGODB_URL);
                console.log("App is running ... \n");
                _generate(0);



        }).catch(err => {
                console.error("App starting error:", err.message);
                process.exit(1);
        });


    

      
        
        
