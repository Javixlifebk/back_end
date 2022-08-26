const DoctorModel = require("../models/DoctorModel");
const UserDetailsModel = require("../models/UserDetailsModel");
const LoggedInDoctors = require("../models/LoggedInDoctors");
const { body,query,validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");
const utility = require("../helpers/utility");
const jwt = require("jsonwebtoken");
const { constants } = require("../helpers/constants");

var dayMapping = {1:"Sunday",2:"Monday",3:"Tuesday",4:"Wednesday",5:"Thursday",6:"Friday",7:"Saturday"};
var timeslotsMapping ={
	1:"0:00-0:30",
2:"0:30-1:00",
3:"1:00-1:30",
4:"1:30-2:00",
5:"2:00-2:30",
6:"2:30-3:00",
7:"3:00-3:30",
8:"3:30-4:00",
9:"4:00-4:30",
10:"4:30-5:00",
11:"5:00-5:30",
12:"5:30-6:00",
13:"6:00-6:30",
14:"6:30-7:00",
15:"7:00-7:30",
16:"7:30-8:00",
17:"8:00-8:30",
18:"8:30-9:00",
19:"9:00-9:30",
20:"9:30-10:00",
21:"10:00-10:30",
22:"10:30-11:00",
23:"11:00-11:30",
24:"11:30-12:00",
25:"12:00-12:30",
26:"12:30-13:00",
27:"13:00-13:30",
28:"13:30-14:00",
29:"14:00-14:30",
30:"14:30-15:00",
31:"15:00-15:30",
32:"15:30-16:00",
33:"16:00-16:30",
34:"16:30-17:00",
35:"17:00-17:30",
36:"17:30-18:00",
37:"18:00-18:30",
38:"18:30-19:00",
39:"19:00-19:30",
40:"19:30-20:00",
41:"20:00-20:30",
42:"20:30-21:00",
43:"21:00-21:30",
44:"21:30-22:00",
45:"22:00-22:30",
46:"22:30-23:00",
47:"23:00-23:30",
48:"23:30-0:00"
}

exports.addProfile = [
    
	body("userId").isLength({ min: 3 }).trim().withMessage("Invalid Credential!"),
	body("token").isLength({ min: 3 }).trim().withMessage("Invalid Token!"),
	body("firstName").isLength({ min: 3 }).trim().withMessage("Enter First Name!"),
	body("lastName").isLength({ min: 3 }).trim().withMessage("Enter Last Name!"),
	body("sex").isLength({ min: 3 }).trim().withMessage("Enter Sex!"),
	body("mobileNo").isLength({ min: 10,max:10 }).trim().withMessage("Mobile no can't be empty!")
					.isNumeric().withMessage("Mobile no must be 10 digits!"),
	body("email").isLength({ min: 3 }).trim().withMessage("Enter email")
				  .isEmail().withMessage("Email must be a valid email address.").custom((value) => {
			return DoctorModel.Doctor.findOne({email : value}).then((user) => {
				if (user) {
					return Promise.reject("E-mail already in use");
				}
			});
		}),
	
	body("dateOfBirth").isLength({ min: 10, max:10 }).trim().withMessage("Enter Date of birth format 'yyyy-mm-dd' !").custom((value) => {
			return utility.isDate(value);
		}),
	body("dateOfOnBoarding").isLength({ min: 10, max:10 }).trim().withMessage("Enter Onboarding Date format 'yyyy-mm-dd' !").custom((value) => {
			return utility.isDate(value);
		}).withMessage("Enter Onboarding Date format 'yyyy-mm-dd' !"),
	body("qualification").isLength({ min: 2 }).trim().withMessage("Enter Qualification !"),	
	body("specialisation").isLength({ min: 2 }).trim().withMessage("Enter Specialization !"),
	
	body("country").isLength({ min: 2 }).trim().withMessage("Enter Country !").isAlpha().withMessage("Country name must not contain number !"),	
	body("state").isLength({ min: 2 }).trim().withMessage("Enter State !"),	
	body("district").isLength({ min: 2 }).trim().withMessage("Enter District !"),	
	body("address").isLength({ min: 3 }).trim().withMessage("Enter Address !"),	
	body("experience").isLength({ min: 3 }).trim().withMessage("Enter Experiece as X Years !"),	
	body("medicalRegNo").isLength({ min: 3 }).trim().withMessage("Enter Vailid (length 3+) medical Registration No !"),	


	// medicalRegNo: {type:String,required:true},
 //    yearOfReg: {type:String,required:false},
 //    statteMedicalCouncil: {type:String,required:false},
 //    experience: {type:String,required:true},
 //    referenceName: {type:String,required:false}
	//body("signature").isLength({ min: 3 }).trim().withMessage("Enter Signature !"),	
	
	sanitizeBody("userId").escape(),
	sanitizeBody("ngoName").escape(),
	sanitizeBody("firstName").escape(),
	sanitizeBody("lastName").escape(),
	sanitizeBody("sex").escape(),
	sanitizeBody("mobileNo").escape(),
	sanitizeBody("email").escape(),
	sanitizeBody("signature").escape(),
	
	sanitizeBody("dateOfBirth").escape(),
	sanitizeBody("dateOfOnBoarding").escape(),
	sanitizeBody("qualification").escape(),
	sanitizeBody("specialisation").escape(),
	sanitizeBody("country").escape(),
	sanitizeBody("state").escape(),
	sanitizeBody("district").escape(),
	sanitizeBody("address").escape(),
	sanitizeBody("pincode").escape(),
	sanitizeBody("photo").escape(),
	sanitizeBody("medicalRegNo").escape(),
	sanitizeBody("yearOfReg").escape(),
	sanitizeBody("statteMedicalCouncil").escape(),
	sanitizeBody("experience").escape(),
	sanitizeBody("referenceName").escape(),
	sanitizeBody("type").escape(),

	(req, res) => { 
			
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
				    var dobEscape=req.body.dateOfBirth.replace(/-/g, ''); 
					var ngoRowNo="00";
					var randThree=utility.randomNumber(3);
					var doctorLoginId=req.body.state+"/"+req.body.district.substring(0, 2)+"/"+ngoRowNo+"/"+req.body.firstName.substring(0, 1)+""+req.body.lastName.substring(0, 1)+""+dobEscape+"/"+randThree;
					var ID=utility.uID();
					
					
					var recDoctor={
							doctorId:ID,
							firstName:req.body.firstName,
							lastName: req.body.lastName,
							sex: req.body.sex,
							mobile:req.body.mobileNo,
							email:req.body.email,
							doctorLoginId:req.body.userId,
							signature:req.body.signature,
							medicalRegNo:req.body.medicalRegNo,
							yearOfReg:req.body.yearOfReg,
							statteMedicalCouncil:req.body.statteMedicalCouncil,
							experience:req.body.experience,
							referenceName:req.body.referenceName,
							type:req.body.type
					};
					var actionDoctor=new DoctorModel.Doctor(recDoctor);
					actionDoctor.save(function(_error)
					{
						if(_error){ apiResponse.ErrorResponse(res, "Sorry-A:"+_error);}
						else
						{
								var iID=utility.uID();
								var recDetails = {
									doctorDetailId: iID,
									dateOfBirth: req.body.dateOfBirth,
									dateOfOnBoarding:req.body.dateOfOnBoarding ,
									qualification:req.body.qualification ,
									specialisation:req.body.specialisation ,
									country:req.body.country  ,
									state:req.body.state  ,
									district:req.body.district  ,
									address: req.body.address ,
									pincode:req.body.pincode,
									rating : 0,
									doctorId: ID,
									photo: req.body.photo
								};
								var actionDoctorDetails=new DoctorModel.DoctorDetails(recDetails);
								actionDoctorDetails.save(function(_ierror)
								{
									if(_ierror){ apiResponse.ErrorResponse(res, "Sorry-B:"+_ierror);}
									else
									{
										return apiResponse.successResponseWithData(res,"Successfully Submitted");
									}
								});
						}
					}
					);
					
			}
		} catch (err) {
			
			return apiResponse.ErrorResponse(res,err);
		}
	}];


exports.updateSignature = [
   
    body("doctorId").isLength({ min: 3 }).trim().withMessage("Invalid doctors ID!").custom((value) => {
			return DoctorModel.Doctor.findOne({doctorId : value}).then((user) => {
				if (user) {}
				else return Promise.reject("Invalid Doctor id");
			});
		}),
		
	body("signature").isLength({ min: 3 }).trim().withMessage("Enter Signature!"),
	
	sanitizeBody("doctorId").escape(),
	//sanitizeBody("signature").escape(),
	
	
	(req, res) => { 
			
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
					
				DoctorModel.Doctor.findOneAndUpdate(
											{ doctorId :req.body.doctorId},
											{$set: {'signature':req.body.signature}
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



exports.doctorList=[
    body("userId").isLength({ min: 3 }).trim().withMessage("Invalid Credential!"),
	// body("ngoId").isLength({ min: 3 }).trim().withMessage("Invalid Credential!"),
	body("token").isLength({ min: 3 }).trim().withMessage("Invalid Token!"),
	sanitizeBody("userId").escape(),
	
    (req, res) => { 
			
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
			DoctorModel.Doctor.aggregate([
							{'$match':{'doctorId':{$ne:"-1"}}},
							{'$limit':100000},
							{'$lookup': {
								'localField':'doctorId',
								'from':'doctordetails',
								'foreignField':'doctorId',
								'as':'info'	
							 }
							 },
							 {'$lookup': {
								'localField':'doctorLoginId',
								'from':'loggedindoctors',
								'foreignField':'doctorId',
								'as':'online'	
							 }
							},
							{'$unwind':'$info'},
							{'$project':{
								 
								 'doctorId':1,
								 'firstName':1,
								 'lastName':1,
								 'sex':1,
								 'mobile':1,
								 'email':1,
								 'doctorLoginId':1,
								 'signature':1,
								 'medicalRegNo':1,
								 'yearOfReg':1,
								 'statteMedicalCouncil':1,
								 'experience':1,
								 'referenceName':1,
								 'type':1,
								 'createdAt':1,
								 'info.dateOfBirth':1,
								 'info.dateOfOnBoarding':1,
								 'info.qualification':1,
								 'info.specialisation':1,
								 'info.country':1,
								 'info.state':1,
								 'info.district':1,
								 'info.address':1,
								 'info.pincode':1,
								 'info.rating':1,
								 'info.rating':1,
								 'online.isLoggedIn':1
								 
								}
							}
						]
				).then(users => {
					
					let user=users[0];
					if (user) {
						for(var i=0;i<users.length;i++){
							users[i].createdAt=utility.toDDmmyy(users[i].createdAt);
							users[i].info.dateOfOnBoarding=utility.toDDmmyy(users[i].info.dateOfOnBoarding);
							users[i].info.dateOfBirth=utility.toDDmmyy(users[i].info.dateOfBirth);
						}
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

exports.doctorById=[
    //body("doctorId").isLength({ min: 3 }).trim().withMessage("Invalid Credential!"),
    //body("userid").isLength({ min: 3 }).trim().withMessage("Enter userId"),
	body("token").isLength({ min: 3 }).trim().withMessage("Invalid Token!"),
	sanitizeBody("doctorId").escape(),
	sanitizeBody("userId").escape(),
	sanitizeBody("token").escape(),
	
    (req, res) => { 
			
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
			DoctorModel.Doctor.aggregate([
							{'$match':{'$or':[{'doctorId':req.body.doctorId},{'doctorLoginId':req.body.userId}]}},
							{'$lookup': {
								'localField':'doctorId',
								'from':'doctordetails',
								'foreignField':'doctorId',
								'as':'info'	
							 }
							},
							{'$unwind':'$info'},
							{'$project':{
								 
								 'doctorId':1,
								 'firstName':1,
								 'lastName':1,
								 'sex':1,
								 'mobile':1,
								 'email':1,
								 'doctorLoginId':1,
								 'signature':1,
								 'medicalRegNo':1,
								 'yearOfReg':1,
								 'statteMedicalCouncil':1,
								 'experience':1,
								 'referenceName':1,
								 'type':1,
								 'createdAt':1,
								 'info.dateOfBirth':1,
								 'info.dateOfOnBoarding':1,
								 'info.qualification':1,
								 'info.specialisation':1,
								 'info.country':1,
								 'info.state':1,
								 'info.district':1,
								 'info.address':1,
								 'info.pincode':1,
								 'info.rating':1,
								 'info.photo':1
								 
								}
							}
						]
				).then(users => {
					
					let user=users[0];
					if (user) {
						for(var i=0;i<users.length;i++){
							users[i].createdAt=utility.toDDmmyy(users[i].createdAt);
							users[i].info.dateOfOnBoarding=utility.toDDmmyy(users[i].info.dateOfOnBoarding);
							users[i].info.dateOfBirth=utility.toDDmmyy(users[i].info.dateOfBirth);
						}
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

exports.doctorMapped=[
    //body("doctorId").isLength({ min: 3 }).trim().withMessage("Invalid Credential!"),
    body("userId").isLength({ min: 3 }).trim().withMessage("Enter userId"),
	body("token").isLength({ min: 3 }).trim().withMessage("Invalid Token!"),
	sanitizeBody("doctorId").escape(),
	sanitizeBody("userId").escape(),
	sanitizeBody("token").escape(),
	
    (req, res) => { 
			
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
			DoctorModel.Doctor.aggregate([
							{'$match':{'$or':[{'doctorId':req.body.doctorId},{'ngoId':req.body.ngoId},{'ismapped':req.body.ismapped}]}},
							{'$lookup': {
								'localField':'doctorId',
								'from':'doctordetails',
								'foreignField':'doctorId',
								'as':'info'	
							 }
							},
							{'$unwind':'$info'},
							{'$project':{
								 
								 'doctorId':1,
								 'ngoId':1,
								 'ismapped':1,
								 'firstName':1,
								 'lastName':1,
								 'sex':1,
								 'mobile':1,
								 'email':1,
								 'doctorLoginId':1,
								 'signature':1,
								 'medicalRegNo':1,
								 'yearOfReg':1,
								 'statteMedicalCouncil':1,
								 'experience':1,
								 'referenceName':1,
								 'type':1,
								 'createdAt':1,
								 'info.dateOfBirth':1,
								 'info.dateOfOnBoarding':1,
								 'info.qualification':1,
								 'info.specialisation':1,
								 'info.country':1,
								 'info.state':1,
								 'info.district':1,
								 'info.address':1,
								 'info.pincode':1,
								 'info.rating':1,
								 'info.photo':1
								 
								}
							}
						]
				).then(users => {
					
					let user=users[0];
					if (user) {
						for(var i=0;i<users.length;i++){
							users[i].createdAt=utility.toDDmmyy(users[i].createdAt);
							users[i].info.dateOfOnBoarding=utility.toDDmmyy(users[i].info.dateOfOnBoarding);
							users[i].info.dateOfBirth=utility.toDDmmyy(users[i].info.dateOfBirth);
						}
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


exports.addDoctorSchedules = [
    
	body("token").isLength({ min: 3 }).trim().withMessage("Invalid Token!"),
	
	body("doctorId").isLength({ min: 3 }).trim().withMessage("Invalid Doctor Id!").custom((value) => {
			return DoctorModel.Doctor.findOne({doctorId : value}).then((user) => {
				if (user) {}
				else{
					return Promise.reject("Doctor Not Found !");
				}
			});
		}),
	body("day").isLength({ min: 1,max:1 }).trim().withMessage("Enter Day[1-7], where 1 is sunday !"),	
	body("timeslots").isLength({ min: 1,max:2 }).trim().withMessage("Enter Timeslots[1-48] , where 1 is 00:00-00:30 !"),
	sanitizeBody("token").escape(),
	sanitizeBody("doctorId").escape(),
	sanitizeBody("day").escape(),
	sanitizeBody("timeslots").escape(),
	
	(req, res) => { 
			
		try {
			var isalready=false;
			DoctorModel.DoctorAvailability.find({
							doctorId:req.body.doctorId,
							day:req.body.day,
							timeslots: req.body.timeslots
					}).then((user) => {
						console.log(user[0]);

						if(user[0]){
							return apiResponse.ErrorResponse(res,"Timeslot already Exists");	
						}
						else {
					
					var recDoctor={
							doctorId:req.body.doctorId,
							day:req.body.day,
							timeslots: req.body.timeslots
					};
					var actionDoctor=new DoctorModel.DoctorAvailability(recDoctor);
					
					actionDoctor.save(function(_error)
					{
						if(_error){ apiResponse.ErrorResponse(res, "Sorry-A:"+_error);}
						else
						{
							var responseSlot={
								doctorId:recDoctor.doctorId,
								timeslots:timeslotsMapping[recDoctor.timeslots],
								day:dayMapping[recDoctor.day]
							};	
							return apiResponse.successResponseWithData(res,"Successfully Submitted",responseSlot);
						}
					}
					);
					
			}
						 
					});

					
						
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}
			
			
		} catch (err) {
			
			return apiResponse.ErrorResponse(res,err);
		}
	}];





exports.getDoctorScheduleList=[


	sanitizeBody("doctorId").escape(),
	sanitizeBody("day").escape(),
	sanitizeBody("timeslots").escape(),
    (req, res) => { 
			
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {



					
					var doctorId,day,timeslots;
					var matchfield={};
					var arraymatch=[];
					//console.log(req.body.recordId);

					
					if(req.body.doctorId!=null && req.body.doctorId!=undefined && req.body.doctorId!="" ){
						doctorId=req.body.doctorId;
						matchfield["doctorId"]=doctorId;
						arraymatch.push(matchfield);
						matchfield={};
					}
					if(req.body.day!=null && req.body.day!=undefined && req.body.day!=""){
						day=req.body.day;
						matchfield["day"]=day;
						arraymatch.push(matchfield);
						matchfield={};
					}
					if(req.body.timeslots!=null && req.body.timeslots!=undefined && req.body.timeslots!=""){
						timeslots=req.body.timeslots;
						matchfield["timeslots"]=timeslots;
						arraymatch.push(matchfield);
						matchfield={};
					}

					
					var andcond={'$match':{'$and':arraymatch}};
					console.log(arraymatch);
					if (arraymatch.length===0){
						andcond={'$match':{}};

					}
					console.dir(andcond);




			DoctorModel.DoctorAvailability.aggregate([
							andcond,
							{'$lookup': {
								'localField':'doctorId',
								'from':'doctors',
								'foreignField':'doctorId',
								'as':'doctors'	
							 }
							},
							{'$project':{
								'timeslots':1,
								'day':1,
								'doctorId':1,
								'createdAt':1,
								'doctors.firstName':1,
								'doctors.lastName':1,
								'doctors.email':1,
								'doctors.mobile':1,
								'doctors.sex':1
							}}
				]).then(users => {
					
					let user=users[0];
					if (user) {
						for(i=0;i<users.length;i++){
						let temp=users[i];
						//console.log(temp.createdAt);
						var timeslotss="";
						
					  	if(temp.timeslots!=null && temp.timeslots!=undefined && temp.timeslots!=""){

					  		temp.timeslots=timeslotsMapping[temp.timeslots];
					  		temp.day=dayMapping[temp.day];
					  		
					  		users[i]=temp;
					  		
					  	}
					  	
					  }
					
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

exports.updateDoctor = [
   
    body("doctorId").isLength({ min: 3 }).trim().withMessage("Invalid doctors ID!").custom((value) => {
			return DoctorModel.Doctor.findOne({doctorId : value}).then((user) => {
				if (user) {}
				else return Promise.reject("Invalid Doctor id");
			});
		}),
	body("firstName").isLength({ min: 3 }).trim().withMessage("Enter First Name!"),
	body("lastName").isLength({ min: 3 }).trim().withMessage("Enter Last Name!"),
	body("mobileNo").isLength({ min: 10,max:10 }).trim().withMessage("Mobile no can't be empty!")
					.isNumeric().withMessage("Mobile no must be 10 digits!"),
	body("email").isLength({ min: 3 }).trim().withMessage("Enter email")
				  .isEmail().withMessage("Email must be a valid email address."),
	body("experience").isLength({ min: 3 }).trim().withMessage("Enter Experiece as X Years !"),		
    sanitizeBody("doctorId").escape(),
	
    sanitizeBody("firstName").escape(),
    sanitizeBody("lastName").escape(),
    sanitizeBody("mobileNo").escape(),
    sanitizeBody("email").escape(),
    sanitizeBody("experience").escape(),
	
	(req, res) => { 
			
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
					var recDoctor={
							
							firstName:req.body.firstName,
							lastName: req.body.lastName,
							
							mobile:req.body.mobileNo,
							email:req.body.email,
							experience:req.body.experience
							
					};
				DoctorModel.Doctor.findOneAndUpdate(
											{ doctorId :req.body.doctorId},
											{$set: recDoctor},
											
											{new: true},
												function(_error,newrecs)
												{
												if(_error) {return  apiResponse.ErrorResponse(res, "Sorry:"+_error);}
												else if(newrecs!=null) { return apiResponse.successResponseWithData(res,"Success",newrecs);}
												else {
													var userRec={   firstName:req.body.firstName,
																	lastName: req.body.lastName,
																	phoneNo:req.body.mobileNo,
																	email:req.body.email
																	
																};
													UserDetailsModel.findOneAndUpdate({ userId :req.body.doctorId},{$set: userRec},function(_derr,_dnewrecs){});
													return apiResponse.successResponseWithData(res,"Successfully Updated");


												}
												}
					);
					
					
					
					
					
					
					
			}
		} catch (err) {
			
			return apiResponse.ErrorResponse(res,"EXp:"+err);
		}
	}];
exports.updateDoctorAddress = [
   
    body("doctorId").isLength({ min: 3 }).trim().withMessage("Invalid doctors ID!").custom((value) => {
			return DoctorModel.Doctor.findOne({doctorId : value}).then((user) => {
				if (user) {}
				else return Promise.reject("Invalid Doctor id");
			});
		}),
		
	body("country").isLength({ min: 2 }).trim().withMessage("Enter Country !").isAlpha().withMessage("Country name must not contain number !"),	
	body("state").isLength({ min: 2 }).trim().withMessage("Enter State !"),	
	body("district").isLength({ min: 2 }).trim().withMessage("Enter District !"),	
	body("address").isLength({ min: 3 }).trim().withMessage("Enter Address !"),	
	
    sanitizeBody("doctorId").escape(),
	
    sanitizeBody("country").escape(),
    sanitizeBody("state").escape(),
    sanitizeBody("district").escape(),
    sanitizeBody("address").escape(),
    sanitizeBody("pincode").escape(),
	
	(req, res) => { 
			
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
					var recDetails = {
									
									
									country:req.body.country  ,
									state:req.body.state  ,
									district:req.body.district  ,
									address: req.body.address ,
									pincode:req.body.pincode
									
									
									
								};
				DoctorModel.DoctorDetails.findOneAndUpdate(
											{ doctorId :req.body.doctorId},
											{$set: recDetails
										    },
											
											{new: true},
												function(_error,newrecs)
												{
												if(_error) {return  apiResponse.ErrorResponse(res, "Sorry:"+_error);}
												else if(newrecs!=null) { return apiResponse.successResponseWithData(res,"Success",newrecs);}
												else {

													return apiResponse.successResponseWithData(res,"Successfully Updated");


												}
												}
					);
					
					
					
					
					
					
					
			}
		} catch (err) {
			
			return apiResponse.ErrorResponse(res,"EXp:"+err);
		}
	}];	
//  ====================updated ismapped true false=====================
exports.updateDoctorMapAuth = [
   
    
	body("doctorId").isLength({ min: 3 }).trim().withMessage("Invalid doctors ID!").custom((value) => {
		return DoctorModel.Doctor.findOne({doctorId : value}).then((user) => {
			if (user) {}
			else return Promise.reject("Invalid Doctor id");
		});
	}),
		// body("status").isLength({ min: 1,max:1 }).trim().withMessage("Invalid Status!").isNumeric().withMessage("status 0-9"),
		// body("pstatus").isLength({ min: 1,max:1 }).trim().withMessage("Blocked Status 0|1!").isNumeric().withMessage("isBlocked should be 0|1"),
		// body("isInstant").isLength({ min: 1,max:1 }).trim().withMessage("Expired Status 0|1!").isNumeric().withMessage("isExpired should be 0|1"),
		// body("isUnrefer").isLength({ min: 1,max:1 }).trim().withMessage("nActive Status 0|1!").isNumeric().withMessage("isUnActive should be 0|1"),
		
		sanitizeBody("doctorId").escape(),
		// sanitizeBody("status").escape(),
		// sanitizeBody("pstatus").escape(),
		// sanitizeBody("isInstant").escape(),
		// sanitizeBody("ismapped").escape(),
		
		(req, res) => { 
				
			try {
				const errors = validationResult(req);
				if (!errors.isEmpty()) {
					return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
				}else {
						
						
					DoctorModel.Doctor.findOneAndUpdate({'doctorId':req.body.doctorId},{'$set':{'status':req.body.status}},function(err,resDoc)
									{
										 if (err) {
											return apiResponse.ErrorResponse(res, err); 
										 }
										 else
										 {  
											if(resDoc)
											{
												
												DoctorModel.Doctor.findOneAndUpdate({'doctorId':req.body.doctorId},{'$set':{'ismapped':req.body.ismapped}},function(ierr,iresDoc)
													{
														 if (ierr) {
															return apiResponse.ErrorResponse(res, ierr); 
														 }
														 else
														 {  
															if(iresDoc)
															{
																
																return apiResponse.successResponse(res,"Updated Successfullly.");
															}
															else apiResponse.ErrorResponse(res, "Invalid User"); 
														 }
													});
											}
											else apiResponse.ErrorResponse(res, "Invalid User"); 
										 }
									});
									
								
						
				}
			} catch (err) {
				
				return apiResponse.ErrorResponse(res,"EXp:"+err);
			}
		}];
		
exports.updateAddmapped= [
			(req, res) => { 
				
				// let id = req.params.id;
		
	
				// const annoucement = await Announcements.updateOne(req.body, { where: { id: id }})
			  
				DoctorModel.Doctor.update({},{$set : {"ismapped": false}}, {upsert:false, multi:true})
	
			  
				  .then((note) => {
					if (!note) {
					  return res.status(404).send({
						message: "data not found with id " + req.params.id,
					  });
					}
					res.send(note);
				  })
				  .catch((err) => {
				  
					if (err.kind === "ObjectId") {
					  return res.status(404).send({
						message: "data not found with id ",
					  });
					}
					return res.status(500).send({
					  message: "Error updating note with id ",
					});
				  });
				   
			}
	
			// (req, res) => { 
					
			// 	try {
			// 		const errors = validationResult(req);
			// 		if (!errors.isEmpty()) {
			// 			return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			// 		}else {
							
							
			// 			CitizenModel.Citizen.update({},{$set : {"isUnrefer": false}}, {upsert:false, multi:true})
						
	
			// 			return apiResponse.successResponseWithData(res,"Successfully Updated");
							
							
			// 		}
			// 	} catch (err) {
					
			// 		return apiResponse.ErrorResponse(res,"EXp:"+err);
			// 	}
			// }
		];

		exports.doctorUnMappedList=[
			body("token").isLength({ min: 3 }).trim().withMessage("Invalid Token!"),
			// body("isUnrefer").isLength({ min: 1,max:1 }).trim().withMessage("nActive Status 0|1!").isNumeric().withMessage("isUnActive should be 0|1"),
			// sanitizeBody("isUnrefer").escape(),
			(req, res) => { 
					
				try {
					const errors = validationResult(req);
					if (!errors.isEmpty()) {
						return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
					}else {
					
						DoctorModel.Doctor.aggregate([
						 {'$match':{'ismapped':false}},
									{'$sort':{'createdAt':-1}},
									{'$limit':100},

									{'$project':{
										'doctorId':1,
										'ngoId':1,
										'ismapped':1,
										'firstName':1,
										'lastName':1,
										'sex':1,
										'mobile':1,
										'email':1,
										'doctorLoginId':1,
										'signature':1,
										'medicalRegNo':1,
										'yearOfReg':1,
										'statteMedicalCouncil':1,
										'experience':1,
										'referenceName':1,
										'type':1,
										'createdAt':1,
		 
									}
									}
								]
								).then(users => {
					
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
		exports.doctorMappedList=[
			body("token").isLength({ min: 3 }).trim().withMessage("Invalid Token!"),
			// body("isUnrefer").isLength({ min: 1,max:1 }).trim().withMessage("nActive Status 0|1!").isNumeric().withMessage("isUnActive should be 0|1"),
			// sanitizeBody("isUnrefer").escape(),
			(req, res) => { 
					
				try {
					const errors = validationResult(req);
					if (!errors.isEmpty()) {
						return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
					}else {
					
						DoctorModel.Doctor.aggregate([
						 {'$match':{'ismapped':true}},
									{'$sort':{'createdAt':-1}},
									{'$limit':100},

									{'$project':{
										'doctorId':1,
										'ngoId':1,
										'ismapped':1,
										'firstName':1,
										'lastName':1,
										'sex':1,
										'mobile':1,
										'email':1,
										'doctorLoginId':1,
										'signature':1,
										'medicalRegNo':1,
										'yearOfReg':1,
										'statteMedicalCouncil':1,
										'experience':1,
										'referenceName':1,
										'type':1,
										'createdAt':1,
		 
									}
									}
								]
								).then(users => {
					
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