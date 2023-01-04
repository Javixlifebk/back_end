const PrescriptionModel = require("../models/PrescriptionModel");
const ScreeningModel = require("../models/ScreeningCase");
const CitizenModel = require("../models/CitizenModel");
const { body,query,validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");
const utility = require("../helpers/utility");
const jwt = require("jsonwebtoken");
const { constants } = require("../helpers/constants");

exports.addPrescription = [
    
	body("citizenId").isLength({ min: 1 }).trim().withMessage("Invalid citizenId!"),
	body("recordId").isLength({ min: 1 }).trim().withMessage("Invalid Record Id!"),
	body("doctorId").isLength({ min: 1 }).trim().withMessage("Enter Doctor Id !"),
	body("status").isLength({ min: 1,max:1 }).trim().withMessage("Enter Status code !"),
	body("screenerId").isLength({ min: 1 }).trim().withMessage("Enter ScreenerId!"),
	body("caseId").isLength({ min: 1 }).trim().withMessage("Invalid caseId!"),
	// body("medicine").isLength({ min: 1 }).trim().withMessage("Enter Medicine separated by ,,,!"),
	//body("cause").isLength({ min: 1 }).trim().withMessage("Invalid Cause!"),
	// body("strength").isLength({ min: 1 }).trim().withMessage("Enter strength separated by ,,,!"),
	// body("quantity").isLength({ min: 1 }).trim().withMessage("Enter quantity separated by ,,,!"),
	// body("duaration").isLength({ min: 1 }).trim().withMessage("Enter duaration separated by ,,,!"),
	// body("direction").isLength({ min: 1 }).trim().withMessage("Enter direction separated by ,,,!"),
	// body("frequency").isLength({ min: 1 }).trim().withMessage("Enter frequency separated by ,,,!"),
	// body("dose").isLength({ min: 1 }).trim().withMessage("Enter dose separated by ,,,!"),
	// body("preparation").isLength({ min: 1 }).trim().withMessage("Enter preparation separated by ,,,!"),
	// body("route").isLength({ min: 1 }).trim().withMessage("Enter Route separated by ,,,!"),
	//body("comments").isLength({ min: 1 }).trim().withMessage("Enter Comments separated by ,,,!"),

	

	
	// sanitizeBody("citizenId").escape(),
	// sanitizeBody("recordId").escape(),
	// sanitizeBody("doctorId").escape(),
	// sanitizeBody("status").escape(),
	// sanitizeBody("screenerId").escape(),
	// sanitizeBody("caseId").escape(),
	// sanitizeBody("comments").escape(),
	// sanitizeBody("medicine").escape(),
	// sanitizeBody("strength").escape(),
	// sanitizeBody("duaration").escape(),
	// sanitizeBody("quantity").escape(),
	// sanitizeBody("direction").escape(),
	// sanitizeBody("frequency").escape(),
	// sanitizeBody("dose").escape(),
	// sanitizeBody("preparation").escape(),
	// sanitizeBody("route").escape(),
	
	
	(req, res) => { 
			
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
				    
				    var ID=utility.uID();
					
					var userId=req.body.userId;
					
					var recPrescription={
							citizenId:req.body.citizenId,
							recordId:req.body.recordId,
							doctorId:req.body.doctorId,
							status:req.body.status,
							prescriptionId:ID,
							screenerId:req.body.screenerId,
							caseId:req.body.caseId,
							comments:req.body.comments,
							medicine:req.body.medicine,
							strength:req.body.strength,
							duaration:req.body.duaration,
							tests:req.body.tests,
							quantity:req.body.quantity,
							direction:req.body.direction,
							frequency:req.body.frequency,
							dose:req.body.dose,
							preparation:req.body.preparation,
							route:req.body.route,
							cause:req.body.cause,
							ngoId:req.body.ngoId,

					};
					var actionPrescription=new PrescriptionModel.Prescription(recPrescription);
					actionPrescription.save(function(_error)
					{
						if(_error){ apiResponse.ErrorResponse(res, "Sorry:"+_error);}
						else
						{
								ScreeningModel.ScreeningCase.findOneAndUpdate(
											{ caseId :req.body.caseId},
											{$set: {status:3}
										    },
												function(_error,newrecs)
												{
												if(_error) {return  apiResponse.ErrorResponse(res, "Sorry:"+_error);}
												}
					);
								CitizenModel.Citizen.findOneAndUpdate(
											{ citizenId :req.body.citizenId},
											{$set: {pstatus:3}
										    },
												function(_error,newrecs)
												{
												if(_error) {return  apiResponse.ErrorResponse(res, "Sorry:"+_error);}
												}
					);
								return apiResponse.successResponseWithData(res,"Successfully Submitted");
						}
					}
					);
					
			}
			} catch (err) {
			
			return apiResponse.ErrorResponse(res,err);
		}
	}];






exports.updatePrescriptionDetails = [
   
    // Validate fields.
	//body("status").isLength({ min: 1,max:1 }).trim().withMessage("Enter valid Status code !"),
	body("prescriptionId").isLength({ min: 1 }).trim().withMessage("Enter Non Empty Prescription Id  !"),


	// Sanitize fields.
	// sanitizeBody("recordId").escape(),
	// sanitizeBody("prescriptionId").escape(),
	// sanitizeBody("status").escape(),
	// sanitizeBody("comments").escape(),
	// sanitizeBody("medicine").escape(),
	// sanitizeBody("tests").escape(),
	// sanitizeBody("quantity").escape(),
	// sanitizeBody("duaration").escape(),
	// sanitizeBody("frequency").escape(),
	// sanitizeBody("days").escape(),

	(req, res) => { 
			
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
					
					

					var recordId,comments,medicine,status,tests,quantity,time,mealtype,days;
					
					var setfield={};
					
					
					if(req.body.recordId!=null){
						recordId=req.body.recordId;
						setfield["recordId"]=recordId;
					}
					if(req.body.medicine!=null){
						medicine=req.body.medicine;
						setfield["medicine"]=medicine;
					}
					if(req.body.comments!=null){
						comments=req.body.comments;
						setfield["comments"]=comments;
					}
					if(req.body.status!=null){
						status=req.body.status;
						setfield["status"]=status;
					}
					if(req.body.tests!=null){
						tests=req.body.tests;
						setfield["tests"]=tests;
					}
					if(req.body.quantity!=null){
						quantity=req.body.quantity;
						setfield["quantity"]=quantity;
					}
					if(req.body.direction!=null){
						direction=req.body.direction;
						setfield["direction"]=direction;
					}
					if(req.body.duaration!=null){
						duaration=req.body.duaration;
						setfield["duaration"]=duaration;
					}
					if(req.body.route!=null){
						route=req.body.route;
						setfield["route"]=route;
					}

					if(req.body.strength!=null){
						strength=req.body.strength;
						setfield["strength"]=strength;
					}
					if(req.body.frequency!=null){
						frequency=req.body.frequency;
						setfield["frequency"]=frequency;
					}
					if(req.body.dose!=null){
						dose=req.body.dose;
						setfield["dose"]=dose;
					}
					if(req.body.preparation!=null){
						preparation=req.body.preparation;
						setfield["preparation"]=preparation;
					}

					
					

				
					
					PrescriptionModel.Prescription.findOneAndUpdate(
											{ prescriptionId :prescriptionId},
											{$set: setfield
										    },
											
											{new: true},
												function(_error,newrecs)
												{
												if(_error) {return  apiResponse.ErrorResponse(res, "Sorry:"+_error);}
												else if(newrecs!=null) { return apiResponse.successResponseWithData(res,"Success",newrecs);}
												else {

													return apiResponse.successResponseWithData(res,"Successfully Submitted");


												}
												}
					);
				
					
			}
		} catch (err) {
			
			return apiResponse.ErrorResponse(res,"EXp:"+err);
		}
	}];	

exports.countPrescriptionDetails=[


	
		(req, res) => { 
				
			try {
				const errors = validationResult(req);
				if (!errors.isEmpty()) {
					return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
				}else {
	
	
					PrescriptionModel.Prescription.aggregate( [
								{'$group':{
									'_id' : "$severity",
									'count': { '$sum': 1 }
								}
	  }
						] ).then(users => {
						
						let user=users[0];
						if (user) {
								return apiResponse.successResponseWithData(res,"Found", users);
						}
						else return apiResponse.ErrorResponse(res,"Not Found");
						
					});
				}
			} catch (err) {
				
				return apiResponse.ErrorResponse(res,"EXp:"+err);
			}
		}
	
	];
// exports.countPrescriptionDetails = [
   
		
	
// 		(req, res) => { 
				
// 			try {
			
// 						PrescriptionModel.Prescription.count()
												
						

// 							let precount= PrescriptionModel.Prescription.find({})
// 							let precount1= PrescriptionModel.Prescription.countDocuments();
						  
// 							//banner.length;
// 							// BasicDetails.forEach(function(element, i, BasicDetails){ 
// 							//     BasicDetails[i]['mh_incorparate_doc'] =  req.protocol + '://' + req.get('host')+'/'+ element['mh_incorparate_doc'];
// 							//     BasicDetails[i]['general_pitch_deck_file'] =  req.protocol + '://' + req.get('host')+'/'+ element['general_pitch_deck_file'];
// 							//     BasicDetails[i]['cancelled_cheque'] =  req.protocol + '://' + req.get('host')+'/'+ element['cancelled_cheque'];
						  
								
// 							// });
// 							// res.status(200).send(BasicDetails)
// 							res.status(200).json({
// 							  // status: "success",
// 							  count: precount1.length,
// 							  // page,
// 							  // pages,
// 							  precount
						  
// 						  })
						  
						
				
// 			} catch (err) {
				
// 				return apiResponse.ErrorResponse(res,"EXp:"+err);
// 			}
// 		}];	
	

exports.prescriptionList=[
	
	sanitizeBody("prescriptionId").escape(),
	sanitizeBody("recordId").escape(),
	sanitizeBody("recordId").escape(),
	sanitizeBody("doctorId").escape(),
	sanitizeBody("screenerId").escape(),
	sanitizeBody("status").escape(),
	sanitizeBody("caseId").escape(),

    (req, res) => { 
			
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
					var recordId,doctorId,prescriptionId,screenerId,status,caseId,citizenId;
					var matchfield={};
					var arraymatch=[];

					
					if(req.body.recordId!=null && req.body.recordId!=undefined && req.body.recordId!="" ){
						recordId=req.body.recordId;
						matchfield["recordId"]=recordId;
						arraymatch.push(matchfield);
						matchfield={};
					}
					if(req.body.doctorId!=null && req.body.doctorId!=undefined && req.body.doctorId!=""){
						doctorId=req.body.doctorId;
						matchfield["doctorId"]=doctorId;
						arraymatch.push(matchfield);
						matchfield={};
					}
					if(req.body.prescriptionId!=null && req.body.prescriptionId!=undefined && req.body.prescriptionId!=""){
						prescriptionId=req.body.prescriptionId;
						matchfield["prescriptionId"]=prescriptionId;
						arraymatch.push(matchfield);
						matchfield={};
					}
					if(req.body.screenerId!=null && req.body.screenerId!=undefined && req.body.screenerId!=""){
						screenerId=req.body.screenerId;
						matchfield["screenerId"]=screenerId;
						arraymatch.push(matchfield);
						matchfield={};
					}
					if(req.body.status!=null && req.body.status!=undefined && req.body.status!=""){
						status=req.body.status;
						matchfield["status"]=status;
						arraymatch.push(matchfield);
						matchfield={};
					}
					if(req.body.caseId!=null && req.body.caseId!=undefined && req.body.caseId!=""){
						caseId=req.body.caseId;
						matchfield["caseId"]=caseId;
						arraymatch.push(matchfield);
						matchfield={};
					}
					if(req.body.citizenId!=null && req.body.citizenId!=undefined && req.body.citizenId!=""){
						citizenId=req.body.citizenId;
						matchfield["citizenId"]=citizenId;
						arraymatch.push(matchfield);
						matchfield={};
					}
					var andcond={'$match':{'$and':arraymatch}};
					if (arraymatch.length===0){
						andcond={'$match':{}};

					}



			PrescriptionModel.Prescription.aggregate([
							andcond,
							{$match:{ngoId:req.body.ngoId}},
							{'$lookup': {
								'localField':'doctorId',
								'from':'doctors',
								'foreignField':'doctorId',
								'as':'doctors'	
							 }
							},
							{'$lookup': {
								'localField':'citizenId',
								'from':'citizens',
								'foreignField':'citizenId',
								'as':'citizens'	
							 }
							},
							{'$lookup': {
								'localField':'citizenId',
								'from':'citizendetails',
								'foreignField':'citizenId',
								'as':'citizendetails'	
							 }
							},
							{'$lookup': {
								'localField':'doctorId',
								'from':'doctordetails',
								'foreignField':'doctorId',
								'as':'doctordetails'	
							 }
							},
							{'$lookup': {
								'localField':'screenerId',
								'from':'screeners',
								'foreignField':'screenerId',
								'as':'screeners'	
							 }
							},
							{'$lookup': {
								'localField':'ngoId',
								'from':'logos',
								'foreignField':'ngoId',
								'as':'logo'	
							 }
							},
							{$unwind:"$citizens"},
							{$unwind:"$logo"},
							{'$project':{
								'prescriptionId':1,
								'citizenId':1,
								'recordId':1,
								'doctorId':1,
								'ngoId':1,
								'status':1,
								'screenerId':1,
								'comments':1,
								'medicine':1,
								'quantity':1,
                                'caseId':1,
                                'cause':1,
								'preparation':1,
								'duaration':1,
								'direction':1,
								'route':1,
								'frequency':1,
								'dose':1,
								'strength':1,
								'createdAt':1,
								'tests':1,
								'doctors.firstName':1,
								'doctors.lastName':1,
								'doctors.email':1,
								'doctors.mobile':1,
								'doctors.signature':1,
								'doctors.medicalRegNo':1,
								 'doctors.yearOfReg':1,
								 'doctors.statteMedicalCouncil':1,
								 'doctors.experience':1,
								 'doctors.referenceName':1,
								'doctors.sex':1,
								firstName:'$citizens.firstName',
								lastname:'$citizens.lastName',
								'citizens.email':1,
								'citizens.mobile':1,
								'citizens.sex':1,
								'citizendetails.dateOfBirth':1,
								'screeners.firstName':1,
								'screeners.lastName':1,
								'screeners.email':1,
								'screeners.mobile':1,
								'screeners.sex':1,
								'screeners.ngoId':1,
								'doctordetails.qualification':1,
								'doctordetails.specialisation':1,
								'doctordetails.state':1,
								'doctordetails.district':1,
								// 'logo.client_logo':1,
								client_logo: {$concat: ["http://",req.headers.host,"/profile/","$logo.client_logo"]}
							}}
				]).then(users => {
					
					let user=users[0];
					if (user) {
							for(var i=0;i<users.length;i++){
								temp=users[i];
								temp.createdAt=utility.toDDmmyy(temp.createdAt);
								var allmedicines=[];
								var medicines=temp.medicine.split(",,,");
								console.dir(temp);


								var strengths=temp.strength.split(",,,");
								var quantities=temp.quantity.split(",,,");
								var duarations=temp.duaration.split(",,,");
								var directions=temp.direction.split(",,,");
								var frequencies=temp.frequency.split(",,,");
								var doses=temp.dose.split(",,,");
								var preparations=temp.preparation.split(",,,");
								var routes=temp.route.split(",,,");
								
								for(var j=0;j<medicines.length;j++){
									if(strengths[j]=='N/A' || strengths[j]=='Unit' || strengths[j]==''){
										strengths[j]="-"
									}
									if(duarations[j]=='N/A' || duarations[j]=='Unit' || duarations[j]==''){
										duarations[j]="-"
									}
									if(quantities[j]=='N/A' || quantities[j]==''){
										quantities[j]="-"
									}
									if(directions[j]=='N/A' || directions[j]=='Direction' || directions[j]==''){
										directions[j]="-"
									}
									if(frequencies[j]=='N/A' || frequencies[j]=='Frequency' || frequencies[j]==''){
										frequencies[j]="-"
									}
									if(doses[j]=='N/A' || doses[j]=='Unit' || doses[j]==''){
										doses[j]="-"
									}
									if(preparations[j]=='N/A' || preparations[j]=='Preparation' || preparations[j]==''){
										preparations[j]="-"
									}
									if(routes[j]=='N/A' || routes[j]=='Route' || routes[j]==''){
										routes[j]="-"
									}
									var med={'medicine':medicines[j],
										'strength':strengths[j],
										'duaration':duarations[j],
										'quantity':quantities[j],
										'direction':directions[j],
										'frequency':frequencies[j],
										'dose':doses[j],
										'preparation':preparations[j],
										'route':routes[j]


									}
									allmedicines[j]=med;
								}
								temp['allmedicines']=allmedicines;
								users[i]=temp;
							}
							console.dir(users);
							return apiResponse.successResponseWithData(res,"Found", users);
					}
					else return apiResponse.ErrorResponse(res,"Not Found");
					
				});
			}
		} catch (err) {
			
			return apiResponse.ErrorResponse(res,"EXp:"+err);
		}
	}

];

