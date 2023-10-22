var pdf = require("pdf-creator-node");
var fs = require('fs');
const PDFMerger = require('pdf-merger-js');
var path = require('path');
var phantomjs = require('phantomjs-prebuilt')
var binPath = phantomjs.path

// console.log("phantomjs",phantomjs)
// console.log("binPath",binPath)

const { body,query,validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const he = require('he');
//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");
const utility = require("../helpers/utility");
const mailer = require("../helpers/mailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { constants } = require("../helpers/constants");

var request = require("request");
const config = require('../config');
const { S3, S3Client, PutObjectCommand, ListObjectsCommand, GetObjectCommand, headObject } = require('@aws-sdk/client-s3');
const pdf2img = require('pdf-img-convert');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const ecgtest = require("../models/ECGTestModel");
const { exec } = require('child_process');



// Configure AWS SDK
const s3Client = new S3Client({
	region: config.region,
	credentials: {
		accessKeyId: config.accessKeyId,
		secretAccessKey: config.secretAccessKey,
	},
});
// const { Logo } = require("../models/logoModel");
// const Logo = db.Logo
var users;
var global_labs=[];

var mapOfTrueFalse={
	1:"Yes",
	0:"No",
	"": "N/A",
	"N/A": "N/A"
}

var mapOfWorking={
	1:"Working",
	0:"Not Working",
	"": "N/A"
}

var urineDescription={
"leukocytes":"If either nitrites or leukocyte esterase - a product of white blood cells - is detected in your urine, it may be a sign of a urinary tract infection.",
"nitrite":"If either nitrites or leukocyte esterase - a product of white blood cells - is detected in your urine, it may be a sign of a urinary tract infection.",
"urobilinogen":"A small amount of urobilinogen is normally found in urine but significant amounts suggest that further assessment for red blood cell breakdown or liver disease is indicated",
"protein":"Low levels of protein in urine are normal. Small increases in protein in urine usually aren't a cause for concern, but larger amounts may indicate a kidney problem.",
"blood":"Blood in your urine requires additional testing - it may be a sign of kidney damage, infection, kidney or bladder stones, kidney or bladder cancer, or blood disorders.",
"specificGravity":"A measure of concentration, or specific gravity, shows how concentrated particles are in your urine. Higher than normal concentration often is a result of not drinking enough fluids.",
"ketone":"As with sugar, any amount of ketones detected in your urine could be a sign of diabetes and requires follow-up testing.",
"bilirubin":"Bilirubin is a product of red blood cell breakdown. Normally bilirubin is carried in the blood and passes into your liver, where it's removed and becomes part of bile. Bilirubin in your urine may indicate liver damage or disease.",
"glucose":"Normally the amount of sugar (glucose) in urine is too low to be detected. Any detection of sugar on this test usually calls for follow-up testing for diabetes.",
"ph":"The pH level indicates the amount of acid in urine. Abnormal pH levels may indicate a kidney or urinary tract disorder."
}


var mapOfTests={
	1:"Positive",
	0:"Negative",
	2:"Inconclusive",
	3:"None",
	null:"None",
	"":"None",
	"null":"None",
	"1":"Positive",
	"0":"Negative",
	"2":"Inconclusive",
	"3":"None"

}

var mapreckey={
"ageoffirstperiod":"Age Of First Period" ,
"pregnancies":"Number of Pregnancies" ,
"miscarriages": "Number of Miscarriage/Abortion" ,
"children":"Number of Children" ,
"menopauseage":"Have you reached Menopause" ,
"bornraised":"Where were you born and raised?" ,
"birthproblem":"Birth History" ,
"lastmenstrualperiod":"Last menstrual period?",
"numberofdaysbleeding":"Number of days bleeding",
"intervalbetweenperiods":"Interval between periods",
"isregular":"Regular or irregular",
"flow":"Flow Intensity",
"painwithmenstruation":"Pain with menstruation",
"useofmedicationforpain":"Use of medication for pain",
"misseddays":"Missed days of school or work due to period ",
"highesteducation":"What is your highest education?" ,
"maritalstatus":"Marital Status?" ,
"ocupation":"What is your current or past occupation?" ,
"iscurrentlyworking":"Are you currently working?" ,
"hoursweek":"Hrs/week?" ,
"notworking":"status" ,
"isdisability":"Do you receive disability or SSI?" ,
"disabilitydetails":"If so for what disability, how long?" ,
"legalproblems":"Have you ever had legal problems?" ,
"religion":"Religion?" ,
"fatherlivingage":"Age of father if he is living" ,
"fatherlivinghealth":"Health/Psychiatric of father if he is living" ,
"fatherdeceasedage":"Age of father if he is deceased" ,
"fatherdeceasedcause":"Cause of death of father" ,
"motherlivingage":"Age of mother if he is living" ,
"motherlivinghealth":"Health/Psychiatric of mother if he is living" ,
"motherdeceasedage":"Age of mother if she is deceased" ,
"motherdeceasedcause":"Cause of death of mother" ,
"siblingslivingage":"Age of siblings if he is living" ,
"siblingslivinghealth":"Health/Psychiatric of siblings if he is living" ,
"siblingsdeceasedage":"Age of siblings if he is deceased" ,
"siblingsdeceasedcause":"Cause of death of siblings" ,
"childrenlivingage":"Age of children if he is living" ,
"childrenlivinghealth":"Health/Psychiatric of children if he is living" ,
"childrendeceasedage":"Age of children if he is deceased" ,
"childrendeceasedcause":"Cause of death of children" ,
"problemmaternal":"Extended Family Psychiatric Problems Past & Present (Maternal)" ,
"problempaternal":"Extended Family Psychiatric Problems Past & Present (Paternal)" 
};


var mappRes={
"women":{
"Age Of First Period" : "N/A",
"Number of Pregnancies" : "N/A",
"Number of Miscarriage/Abortion" : "N/A",
"Number of Children" : "N/A",
"Have you reached Menopause" : "N/A",
"Last menstrual period?": "N/A",
"Number of days bleeding": "N/A",
"Interval between periods": "N/A",
"Regular or irregular": "N/A",
"Flow Intensity": "N/A",
"Pain with menstruation": "N/A",
"Use of medication for pain": "N/A",
"Missed days of school or work due to period ": "N/A"
},
"personal":{
"Where were you born and raised?" : "N/A",
"Birth History" : "N/A",
"What is your highest education?" : "N/A",
"Marital Status?" : "N/A",
"What is your current or past occupation?" : "N/A",
"Are you currently working?" : "N/A",
"Have you ever had legal problems?" : "N/A"
},
"family":{
"Age of father if he is living" : "N/A",
"Health/Psychiatric of father if he is living" : "N/A",
"Age of father if he is deceased" : "N/A",
"Cause of death of father" : "N/A",
"Age of mother if he is living" : "N/A",
"Health/Psychiatric of mother if he is living" : "N/A",
"Age of mother if he is deceased" : "N/A",
"Cause of death of mother" : "N/A",
"Age of siblings if he is living" : "N/A",
"Health/Psychiatric of siblings if he is living" : "N/A",
"Age of siblings if he is deceased" : "N/A",
"Cause of death of siblings" : "N/A",
"Age of children if he is living" : "N/A",
"Health/Psychiatric of children if he is living" : "N/A",
"Age of children if he is deceased" : "N/A",
"Cause of death of children" : "N/A",
"Extended Family Psychiatric Problems Past & Present (Maternal)" : "N/A",
"Extended Family Psychiatric Problems Past & Present (Paternal)" : "N/A"
},
"medical":{
"diabetes": "N/A",
"high_bp": "N/A",
"high_cholestrol": "N/A",
"goiter": "N/A",
"cancer": "N/A",
"leukemia": "N/A",
"psoriasis": "N/A",
"agina": "N/A",
"type_of_cancer": "N/A",
"heart_problems": "N/A",
"heart_murmur": "N/A",
"pneumonia": "N/A",
"pulmonary_embolism": "N/A",
"asthma": "N/A",
"emphysema": "N/A",
"stroke": "N/A",
"epilepsy": "N/A",
"cataracts": "N/A",
"kidney_disease": "N/A",
"kidney_stones": "N/A",
"chrohns_disease": "N/A",
"colitis": "N/A",
"anemia": "N/A",
"jaundice": "N/A",
"hepatitis": "N/A",
"stomach": "N/A",
"rheumatic_fever": "N/A",
"tuberculosis": "N/A",
"hiv_aids": "N/A",
"other": "N/A",
},
"drugs":{
"allergies": "N/A",
"allergydate": "N/A",
"allergyType": "N/A",
}
};

//var html = fs.readFileSync(process.cwd()+'/helpers/templates/screenerProfile.html', 'utf8');


exports.createProfileReport = [
    	
	body("roleId").isLength({ min: 1 }).trim().withMessage("Enter RoleID !"),	
	body("token").isLength({ min: 3 }).trim().withMessage("Enter Token !"),
	body("userId").isLength({ min: 3 }).trim().withMessage("Enter Actor Id !"),

	sanitizeBody("roleId").escape(),
	sanitizeBody("userId").escape(),
	sanitizeBody("token").escape(),

	(req, res) => { 
			
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
					
					if(req.body.roleId==='2'){

						var screenerId=req.body.userId;
						var ngoId=req.body.ngoId;
					
						var html = fs.readFileSync(process.cwd()+'/helpers/templates/screenerProfile.html', 'utf8');
						var token=req.body.token;


					var options = { method: 'POST',
					  url: 'https://javixlife.org/api/ngo/screenerById',
					  headers: 
					   { 'content-type': 'application/x-www-form-urlencoded' },
					  form: 
					   { userId: screenerId,
					   token: token ,
					ngoId:ngoId} };

					request(options, function (error, response, body) {
					  if (error) return apiResponse.ErrorResponse(res, error);

					  //console.log(JSON.parse(body).status);
					  status=JSON.parse(body).status;
					  if(status==1){
					  	users=JSON.parse(body).data.data;
					  	console.log(users);
					  	var document = {
					    html: html,
					    data: {
					        users: users
					    },
					    path: "./uploads/delete_created_files/"+"profile_report_"+screenerId+".pdf"
					};

					var options = {
					        format: "A3",
					        orientation: "portrait",
					        border: "10mm",
					        header: {
					            height: "45mm",
					            contents: '<div style="text-align: center;">Author: Javix Life</div>'
					        },
					        "footer": {
					            "height": "28mm",
					            "contents": {
					            first: '',
					            2: '', // Any page number is working. 1-based index
					            default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
					            last: 'Last Page'
					        }
					    }
					};
					process.env.OPENSSL_CONF = '/dev/null';
					  	pdf.create(document, options)
					    .then(val => {
					        // console.log("Response is : -   "+val.filename);
					        var temp = val.filename.split("\\");
					        val.filename="http://18.60.238.252:3010/reports/"+"profile_report_"+screenerId+".pdf"
					        
					        return apiResponse.successResponseWithData(res,"Success",val);

					    })
					    .catch(error => {
					        return apiResponse.ErrorResponse(res, error);
					    });
					  }
					});


					}

					if(req.body.roleId==='3'){

						var ngoId=req.body.userId;
					
						var html = fs.readFileSync(process.cwd()+'/helpers/templates/ngoProfile.html', 'utf8');
						var token=req.body.token;


					var options = { method: 'POST',
					  url: 'https://javixlife.org/api/ngo/ngoById',
					  headers: 
					   { 'content-type': 'application/x-www-form-urlencoded' },
					  form: 
					   { userId: ngoId,
						ngoId: ngoId,
					   token: token } };

					request(options, function (error, response, body) {
					  if (error) return apiResponse.ErrorResponse(res, error);

					  //console.log(JSON.parse(body).status);
					  status=JSON.parse(body).status;
					  if(status==1){
					  	users=JSON.parse(body).data.data;
					  	console.log(users);
					  	var document = {
					    html: html,
					    data: {
					        users: users
					    },
					    path: "./uploads/delete_created_files/"+"profile_report_"+ngoId+".pdf"
					};

					var options = {
					        format: "A3",
					        orientation: "portrait",
					        border: "10mm",
					        header: {
					            height: "45mm",
					            contents: '<div style="text-align: center;">Author: Javix Life</div>'
					        },
					        "footer": {
					            "height": "28mm",
					            "contents": {
					            first: '',
					            2: '', // Any page number is working. 1-based index
					            default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
					            last: 'Last Page'
					        }
					    }
					};
					process.env.OPENSSL_CONF = '/dev/null';
					  	pdf.create(document, options)
					    .then(val => {
					        // console.log("Response is : -   "+val.filename);
					        var temp = val.filename.split("\\");
					        val.filename="http://18.60.238.252:3010/reports/"+"profile_report_"+ngoId+".pdf"
					        
					        return apiResponse.successResponseWithData(res,"Success",val);

					    })
					    .catch(error => {
					        return apiResponse.ErrorResponse(res, error);
					    });
					  }
					});


					}


					if(req.body.roleId==='1'){

						var doctorId=req.body.userId;
						var ngoId=req.body.ngoId;
					
						var html = fs.readFileSync(process.cwd()+'/helpers/templates/doctorProfile.html', 'utf8');
						var token=req.body.token;


					var options = { method: 'POST',
					  url: 'https://javixlife.org/api/doctor/doctorById',
					  headers: 
					   { 'content-type': 'application/x-www-form-urlencoded' },
					  form: 
					   { userId: doctorId,
					   token: token ,
					ngoId:ngoId} };

					request(options, function (error, response, body) {
					  if (error) return apiResponse.ErrorResponse(res, error);

					  //console.log(JSON.parse(body).status);
					  status=JSON.parse(body).status;
					  if(status==1){
					  	users=JSON.parse(body).data.data;
					  	console.log(users);
					  	var document = {
					    html: html,
					    data: {
					        users: users
					    },
					    path: "./uploads/delete_created_files/"+"profile_report_"+doctorId+".pdf"
					};

					var options = {
					        format: "A3",
					        orientation: "portrait",
					        border: "10mm",
					        header: {
					            height: "45mm",
					            contents: '<div style="text-align: center;">Author: Javix Life</div>'
					        },
					        "footer": {
					            "height": "28mm",
					            "contents": {
					            first: '',
					            2: '', // Any page number is working. 1-based index
					            default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
					            last: 'Last Page'
					        }
					    }
					};
					process.env.OPENSSL_CONF = '/dev/null';
					  	pdf.create(document, options)
					    .then(val => {
					        // console.log("Response is : -   "+val.filename);
					        var temp = val.filename.split("\\");
					        val.filename="http://18.60.238.252:3010/reports/"+"profile_report_"+doctorId+".pdf"
					        
					        return apiResponse.successResponseWithData(res,"Success",val);

					    })
					    .catch(error => {
					        return apiResponse.ErrorResponse(res, error);
					    });
					  }
					});


					}


if(req.body.roleId==='4'){

						var pharmacyId=req.body.userId;
						var ngoId=req.body.ngoId;
					
						var html = fs.readFileSync(process.cwd()+'/helpers/templates/pharmacyProfile.html', 'utf8');
						var token=req.body.token;


					var options = { method: 'POST',
					  url: 'https://javixlife.org/api/pharmacy/pharmacyById',
					  headers: 
					   { 'content-type': 'application/x-www-form-urlencoded' },
					  form: 
					   { userId: pharmacyId,
					   token: token ,
					   ngoId: ngoId} };

					request(options, function (error, response, body) {
					  if (error) return apiResponse.ErrorResponse(res, error);

					  //console.log(JSON.parse(body).status);
					  status=JSON.parse(body).status;
					  if(status==1){
					  	users=JSON.parse(body).data.data;
					  	console.log(users);
					  	var document = {
					    html: html,
					    data: {
					        users: users
					    },
					    path: "./uploads/delete_created_files/"+"profile_report_"+pharmacyId+".pdf"
					};

					var options = {
					        format: "A3",
					        orientation: "portrait",
					        border: "10mm",
					        header: {
					            height: "45mm",
					            contents: '<div style="text-align: center;">Author: Javix Life</div>'
					        },
					        "footer": {
					            "height": "28mm",
					            "contents": {
					            first: '',
					            2: '', // Any page number is working. 1-based index
					            default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
					            last: 'Last Page'
					        }
					    }
					};
					process.env.OPENSSL_CONF = '/dev/null';
					  	pdf.create(document, options)
					    .then(val => {
					        // console.log("Response is : -   "+val.filename);
					        var temp = val.filename.split("\\");
					        val.filename="http://18.60.238.252:3010/reports/"+"profile_report_"+pharmacyId+".pdf"
					        
					        return apiResponse.successResponseWithData(res,"Success",val);

					    })
					    .catch(error => {
					        return apiResponse.ErrorResponse(res, error);
					    });
					  }
					});


					}


if(req.body.roleId==='6'){

						var citizenId=req.body.userId;
						var ngoId=req.body.ngoId;
					
						var html = fs.readFileSync(process.cwd()+'/helpers/templates/citizenProfile.html', 'utf8');
						var token=req.body.token;


					var options = { method: 'POST',
					  url: 'https://javixlife.org/api/citizen/citizenById',
					  headers: 
					   { 'content-type': 'application/x-www-form-urlencoded' },
					  form: 
					   { userId: citizenId,
					   token: token ,
					   ngoId: ngoId} };

					request(options, function (error, response, body) {
					  if (error) return apiResponse.ErrorResponse(res, error);

					  //console.log(JSON.parse(body).status);
					  status=JSON.parse(body).status;
					  if(status==1){
					  	users=JSON.parse(body).data.data;
					  	console.log(users);
					  	var document = {
					    html: html,
					    data: {
					        users: users
					    },
					    path: "./uploads/delete_created_files/"+"profile_report_"+citizenId+".pdf"
					};

					var options = {
					        format: "A3",
					        orientation: "portrait",
					        border: "10mm",
					        header: {
					            height: "45mm",
					            contents: '<div style="text-align: center;">PortaClinic By JavixLife</div>'
					        },
					        "footer": {
					            "height": "28mm",
					            "contents": {
					            first: '',
					            2: '', // Any page number is working. 1-based index
					            default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
					            last: 'Last Page'
					        }
					    }
					};
					process.env.OPENSSL_CONF = '/dev/null';
					  	pdf.create(document, options)
					    .then(val => {
					        // console.log("Response is : -   "+val.filename);
					        var temp = val.filename.split("/");
					        val.filename="http://18.60.238.252:3010/reports/"+"profile_report_"+citizenId+".pdf"
					        
					        return apiResponse.successResponseWithData(res,"Success",val);

					    })
					    .catch(error => {
					        return apiResponse.ErrorResponse(res, error);
					    });
					  }
					});


					}


				
					
			}
		} catch (err) {
			
			return apiResponse.ErrorResponse(res,"EXp:"+err);
		}
	}];





exports.createCaseReport = [
    	
	body("caseId").isLength({ min: 1 }).trim().withMessage("Enter Case ID !"),	

	sanitizeBody("caseId").escape(),

	(req, res) => { 
			
		try {
			// console.log("Hello i am creating report");
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
					var caseId=req.body.caseId;
					var citizenId = req.body.citizenId;
					var ngoId=req.body.ngoId;
					var html = fs.readFileSync(process.cwd()+'/helpers/templates/screening.html', 'utf8');
					var token="hgaghsagf";


					var options = { method: 'POST',
					  url: 'https://javixlife.org/api/screening/getCaseDetails',
					  headers: 
					   { 'content-type': 'application/x-www-form-urlencoded' },
					  form: 
					   { caseId: caseId,
						ngoId: ngoId
					   } };

					   //LaBtESTS



					   var options1 = { method: 'POST',
					  url: 'https://javixlife.org/api/labtest/getHemoglobinList',
					  headers: 
					   { 'content-type': 'application/x-www-form-urlencoded' },
					  form: 
					   { caseId: caseId,token:token,
						ngoId: ngoId
					   } };

					   var options2 = { method: 'POST',
					  url: 'https://javixlife.org/api/labtest/getEyeTestList',
					  headers: 
					   { 'content-type': 'application/x-www-form-urlencoded' },
					  form: 
					   { caseId: caseId,token:token,
						ngoId: ngoId
					   } };

					   var options3 = { method: 'POST',
					  url: 'https://javixlife.org/api/labtest/getVisualExamList',
					  headers: 
					   { 'content-type': 'application/x-www-form-urlencoded' },
					  form: 
					   { caseId: caseId,token:token,
						ngoId: ngoId
					   } };

					   var options4 = { method: 'POST',
					  url: 'https://javixlife.org/api/labtest/getBloodGlucoseTestList',
					  headers: 
					   { 'content-type': 'application/x-www-form-urlencoded' },
					  form: 
					   { caseId: caseId,token:token,
						ngoId: ngoId
					   } };

					   var options5 = { method: 'POST',
					  url: 'https://javixlife.org/api/labtest/getLipidPanelTestList',
					  headers: 
					   { 'content-type': 'application/x-www-form-urlencoded' },
					  form: 
					   { caseId: caseId,token:token,
						ngoId: ngoId
					   } };

					   var options6 = { method: 'POST',
					  url: 'https://javixlife.org/api/labtest/getDrugTestList',
					  headers: 
					   { 'content-type': 'application/x-www-form-urlencoded' },
					  form: 
					   { caseId: caseId,token:token,
						ngoId: ngoId
					   } };

					   var options7 = { method: 'POST',
					  url: 'https://javixlife.org/api/labtest/getLabTestList',
					  headers: 
					   { 'content-type': 'application/x-www-form-urlencoded' },
					  form: 
					   { caseId: caseId,token:token,
						ngoId: ngoId
					   } };

					   var options8 = { method: 'POST',
					  url: 'https://javixlife.org/api/labtest/getSickleCell',
					  headers: 
					   { 'content-type': 'application/x-www-form-urlencoded' },
					  form: 
					   { caseId: caseId,
						ngoId: ngoId
					   } };

					   var options9 = { method: 'POST',
					  url: 'https://javixlife.org/api/labtest/getThalassemia',
					  headers: 
					   { 'content-type': 'application/x-www-form-urlencoded' },
					  form: 
					   { caseId: caseId,
						ngoId: ngoId
					   } };

					   var options10 = { method: 'POST',
					  url: 'https://javixlife.org/api/labtest/getLungTest',
					  headers: 
					   { 'content-type': 'application/x-www-form-urlencoded' },
					  form: 
					   { caseId: caseId,
						ngoId: ngoId
					   } };

					   var options11 = { method: 'POST',
					  url: 'https://javixlife.org/api/labtest/getHeartTestList',
					  headers: 
					   { 'content-type': 'application/x-www-form-urlencoded' },
					  form: 
					   { caseId: caseId,token:'adsdasdadasda',
					   ngoId: ngoId
					   } };

					   var options12 = { method: 'POST',
					  url: 'https://javixlife.org/api/labtest/getUrineTestList',
					  headers: 
					   { 'content-type': 'application/x-www-form-urlencoded' },
					  form: 
					   { caseId: caseId,token:'adsdasdadasda',
					   ngoId: ngoId
					   } };

					   var options13 = { method: 'POST',
					  url: 'https://javixlife.org/api/screening/SymptomsList',
					  headers: 
					   { 'content-type': 'application/x-www-form-urlencoded' },
					  form: 
					   { caseId: caseId,token:'adsdasdadasda',
					   ngoId: ngoId
					   } };
					   var options14 = { method: 'POST',
					   url: 'https://javixlife.org/api/test/getByCaseId',
					   headers: 
						{ 'content-type': 'application/x-www-form-urlencoded' },
					   form: 
						{ caseId: caseId,
						ngoId: ngoId
						} };


					   //eND lAB tESTS


					   var labs={'hemo':"",
					  				'eye':"",
					  				'visual':"",
					  				'glucose':"",
					  				'lipid':"",
					  				'lung':"",
					  				'heart':"",
					  				'sickle':"",
					  				'thalassemia':"",
					  				'drug':"",
					  				'rapid':"",
					  				'symptoms':"",
					  				'urine':"",
								       "breasttest":""};
					   request( options1, function (error1, response1, body1) {
					  		if (error1) return apiResponse.ErrorResponse(res, error1);
					  			status1=JSON.parse(body1).status;
					  			if(status1==1){
					  				labs.hemo=JSON.parse(body1).data.data;
					  			}
					  		request(options2, function (error2, response2, body2) {
					  		if (error2) return apiResponse.ErrorResponse(res, error2);
					  			status2=JSON.parse(body2).status;
					  			if(status2==1){
					  				labs.eye=JSON.parse(body2).data.data;
					  				}
							 request(options14, function (error2, response2, body2) {
									if (error2) return apiResponse.ErrorResponse(res, error2);
										status2=JSON.parse(body2).status;
										if(status2==1){
										labs.breasttest=JSON.parse(body2).data.data;

										console.log(labs.breasttest);
												}
					  				request(options3, function (error3, response3, body3) {
					  		if (error3) return apiResponse.ErrorResponse(res, error3);
					  			status3=JSON.parse(body3).status;
					  			if(status3==1){
					  				labs.visual=JSON.parse(body3).data.data;
					  				}
					  				request(options4, function (error4, response4, body4) {
					  		if (error4) return apiResponse.ErrorResponse(res, error4);
					  			status4=JSON.parse(body4).status;
					  			if(status4==1){
					  				labs.glucose=JSON.parse(body4).data.data;
					  			}
					  			request(options5, function (error5, response5, body5) {
					  		if (error5) return apiResponse.ErrorResponse(res, error5);
					  			status5=JSON.parse(body5).status;
					  			if(status5==1){
					  				labs.lipid=JSON.parse(body5).data.data;	
					  			}

					  			request(options8, function (error8, response8, body8) {
					  		if (error8) return apiResponse.ErrorResponse(res, error8);
					  			status8=JSON.parse(body8).status;
					  			if(status8==1){
					  				labs.sickle=JSON.parse(body8).data.data;
					  				for(var i=0;i<labs.sickle.length;i++){
					  				labs.sickle[i]['SickleCell']= mapOfTests[labs.sickle[i]['SickleCell']];
					  				labs.sickle[i]['createdAt']= utility.toDDmmyy(labs.sickle[i]['createdAt']);

					  			}
					  				}
					  				request(options9, function (error9, response9, body9) {
					  		if (error9) return apiResponse.ErrorResponse(res, error9);
					  			status9=JSON.parse(body9).status;
					  			if(status9==1){
					  				labs.thalassemia=JSON.parse(body9).data.data;
					  				for(var i=0;i<labs.thalassemia.length;i++){
					  				labs.thalassemia[i]['Thalassemia']= mapOfTests[labs.thalassemia[i]['Thalassemia']];
					  				labs.thalassemia[i]['createdAt']= utility.toDDmmyy(labs.thalassemia[i]['createdAt']);

					  			}
					  			}
					  			request(options10, function (error10, response10, body10) {
					  		if (error10) return apiResponse.ErrorResponse(res, error10);
					  			status10=JSON.parse(body10).status;
					  			if(status10==1){
					  				labs.lung=JSON.parse(body10).data.data;	
					  				for(var i=0;i<labs.lung.length;i++){
					  				labs.lung[i]['createdAt']= utility.toDDmmyy(labs.lung[i]['createdAt']);

					  			}
					  			}

					  			request(options11, function (error11, response11, body11) {
					  		if (error11) return apiResponse.ErrorResponse(res, error11);
					  			status11=JSON.parse(body11).status;
					  			if(status11==1){
					  				labs.heart=JSON.parse(body11).data.data;	
					  				for(var i=0;i<labs.heart.length;i++){
					  				labs.heart[i]['createdAt']= utility.toDDmmyy(labs.heart[i]['createdAt']);

					  			}
					  			}

					  			request(options12, function (error12, response12, body12) {
					  		if (error12) return apiResponse.ErrorResponse(res, error12);
					  			status12=JSON.parse(body12).status;
					  			if(status12==1){
					  				labs.urine=JSON.parse(body12).data.data;	
					  				for(var i=0;i<labs.urine.length;i++){
					  				labs.urine[i]['description']=urineDescription;
					  				labs.urine[i]['createdAt']= utility.toDDmmyy(labs.urine[i]['createdAt']);

					  			}
					  			}

					  			request(options13, function (error13, response13, body13) {
					  		if (error13) return apiResponse.ErrorResponse(res, error13);
					  			status13=JSON.parse(body13).status;
					  			if(status13==1){
					  				labs.symptoms=JSON.parse(body13).data.data;	
					  				console.dir(labs.symptoms);
					  				for(var i=0;i<labs.symptoms.length;i++){
					  					// console.log("Val");
					  					 //console.dir(labs.symptoms[0]['data']);
					  				labs.symptoms[i].data=JSON.parse(labs.symptoms[i]['data']);
					  				console.dir(labs.symptoms);
					  				labs.symptoms[i]['createdAt']= utility.toDDmmyy(labs.symptoms[i]['createdAt']);

					  			}
					  			}

					  			request(options6, function (error6, response6, body6) {
					  		if (error6) return apiResponse.ErrorResponse(res, error6);
					  			status6=JSON.parse(body6).status;
					  			if(status6==1){
					  				labs.drug=JSON.parse(body6).data.data;

									for(var i=0;i<labs.drug.length;i++){
									labs.drug[i]['Amphetamine']= mapOfTests[labs.drug[i]['Amphetamine']];
									labs.drug[i]['Barbiturates']= mapOfTests[labs.drug[i]['Barbiturates']];
									labs.drug[i]['Buprenorphine']= mapOfTests[labs.drug[i]['Buprenorphine']];
									labs.drug[i]['Benzodiazepines']= mapOfTests[labs.drug[i]['Benzodiazepines']];
									labs.drug[i]['Cocaine']= mapOfTests[labs.drug[i]['Cocaine']];
									labs.drug[i]['Marijuana']= mapOfTests[labs.drug[i]['Marijuana']];
									labs.drug[i]['Methamphetamine']= mapOfTests[labs.drug[i]['Methamphetamine']];
									labs.drug[i]['Methylenedioxymethamphetamine']= mapOfTests[labs.drug[i]['Methylenedioxymethamphetamine']];
									labs.drug[i]['Methadone']= mapOfTests[labs.drug[i]['Methadone']];
									labs.drug[i]['Opiate']= mapOfTests[labs.drug[i]['Opiate']];
									labs.drug[i]['Oxycodone']= mapOfTests[labs.drug[i]['Oxycodone']];
									labs.drug[i]['Phencyclidine']= mapOfTests[labs.drug[i]['Phencyclidine']];
									labs.drug[i]['Propoxyphene']= mapOfTests[labs.drug[i]['Propoxyphene']];
									labs.drug[i]['TricyclicAntidepressant']= mapOfTests[labs.drug[i]['TricyclicAntidepressant']];
									}
					  			}
					  			console.dir(labs.lipid);
					  			
					  			request(options7, function (error7, response7, body7) {
					  		if (error7) return apiResponse.ErrorResponse(res, error7);
					  			status7=JSON.parse(body7).status;
					  			if(status7==1){
					  				labs.rapid=JSON.parse(body7).data.data;
					  				for(var i=0;i<labs.rapid.length;i++){
									labs.rapid[i]['ChagasAb']= mapOfTests[labs.rapid[i]['ChagasAb']];
									labs.rapid[i]['Chikungunya']= mapOfTests[labs.rapid[i]['Chikungunya']];
									labs.rapid[i]['Chlamydia']= mapOfTests[labs.rapid[i]['Chlamydia']];
									labs.rapid[i]['Cholera']= mapOfTests[labs.rapid[i]['Cholera']];
									labs.rapid[i]['Dengue']= mapOfTests[labs.rapid[i]['Dengue']];
									labs.rapid[i]['FecalOccultBloodTest']= mapOfTests[labs.rapid[i]['FecalOccultBloodTest']];
									labs.rapid[i]['HPylori']= mapOfTests[labs.rapid[i]['HPylori']];
									labs.rapid[i]['HantaanVirus']= mapOfTests[labs.rapid[i]['HantaanVirus']];
									labs.rapid[i]['HepatitisA']= mapOfTests[labs.rapid[i]['HepatitisA']];
									labs.rapid[i]['HepatitisB']= mapOfTests[labs.rapid[i]['HepatitisB']];
									labs.rapid[i]['HepatitisC']= mapOfTests[labs.rapid[i]['HepatitisC']];
									labs.rapid[i]['HIV']= mapOfTests[labs.rapid[i]['HIV']];
									labs.rapid[i]['HumanAfricanTrypanosomiasis']= mapOfTests[labs.rapid[i]['HumanAfricanTrypanosomiasis']];
									labs.rapid[i]['HumanChorionicGonadotropin']= mapOfTests[labs.rapid[i]['HumanChorionicGonadotropin']];
									labs.rapid[i]['Influenza']= mapOfTests[labs.rapid[i]['Influenza']];
									labs.rapid[i]['LegionellaAg']= mapOfTests[labs.rapid[i]['LegionellaAg']];
									labs.rapid[i]['Leptospira']= mapOfTests[labs.rapid[i]['Leptospira']];
									labs.rapid[i]['Malaria']= mapOfTests[labs.rapid[i]['Malaria']];
									labs.rapid[i]['Myoglobin']= mapOfTests[labs.rapid[i]['Myoglobin']];
									labs.rapid[i]['Norovirus']= mapOfTests[labs.rapid[i]['Norovirus']];
									labs.rapid[i]['OnchoLFlgG4Biplex']= mapOfTests[labs.rapid[i]['OnchoLFlgG4Biplex']];
									labs.rapid[i]['RespiratorySynctialVirus']= mapOfTests[labs.rapid[i]['RespiratorySynctialVirus']];
									labs.rapid[i]['RotaAdeno']= mapOfTests[labs.rapid[i]['RotaAdeno']];
									labs.rapid[i]['Rotavirus']= mapOfTests[labs.rapid[i]['Rotavirus']];
									labs.rapid[i]['Covid']= mapOfTests[labs.rapid[i]['Covid']];
									labs.rapid[i]['StrepA']= mapOfTests[labs.rapid[i]['StrepA']];
									labs.rapid[i]['Syphilis']= mapOfTests[labs.rapid[i]['Syphilis']];
									labs.rapid[i]['Salmonella']= mapOfTests[labs.rapid[i]['Salmonella']];
									labs.rapid[i]['Tetanus']= mapOfTests[labs.rapid[i]['Tetanus']];
									labs.rapid[i]['Troponin']= mapOfTests[labs.rapid[i]['Troponin']];
									labs.rapid[i]['Tsutsugamushi']= mapOfTests[labs.rapid[i]['Tsutsugamushi']];
									labs.rapid[i]['Tuberculosis']= mapOfTests[labs.rapid[i]['Tuberculosis']];
									labs.rapid[i]['TyphoidFever']= mapOfTests[labs.rapid[i]['TyphoidFever']];
									labs.rapid[i]['YellowFever']= mapOfTests[labs.rapid[i]['YellowFever']];
									labs.rapid[i]['Others']= mapOfTests[labs.rapid[i]['Others']];
									}
					  			}
					  			
					  			request(options, function (error, response, body) {
					  if (error) return apiResponse.ErrorResponse(res, error);
					  //console.log(JSON.parse(body).status);
					  status=JSON.parse(body).status;
					  if(status==1){
					  	users=JSON.parse(body).data.data;
						console.log("users",users)
					  	var cdob="";
					  	if(users[0].citizendetails[0].dateOfBirth!=null && users[0].citizendetails[0].dateOfBirth!=undefined && users[0].citizendetails[0].dateOfBirth!=""){
					  		cdob=users[0].citizendetails[0].dateOfBirth.split('T')[0];
					  		var bdate=new Date(cdob);
					  		users[0].citizendetails[0].dob=bdate.getDate()+"-"+(bdate.getMonth()+1)+"-"+(bdate.getYear()+1900);
					  	}
					  	else{
					  		users[0].citizendetails[0].dob=cdob;
					  	}

					  	if(users[0].notes==null || users[0].notes==undefined || users[0].notes==""){
					  		users[0].notes="N/A";
					  	}
					  	if(users[0].arm==null || users[0].arm==undefined || users[0].arm==""){
					  		users[0].arm="N/A";
					  	}
					  	
					  	
						users[0].labs=labs;
						global_labs=labs;
						users[0].bpsysFun=function() { if(this.bpsys>=110 && this.bpsys<=120)
													{ return("<span class='green'>__________</span>");}
													else if(this.bpsys>=120 && this.bpsys<=160)
													{ return("<span class='yellow'>__________</span>");}
												    else if(this.bpsys>=160 && this.bpsys<=180)
													{ return("<span class='orange'>__________</span>");}
													else if (this.bpsys>=180)
													{ return("<span class='red'>__________</span>");}
												    else return("<span class='red'>"+this.bpsys+"</span>");
												 }
						console.dir(users[0].labs);						 
					  	var document = {
					    html: html,
					    data: {
					        users: users
					    },
					    path: "./uploads/delete_created_files/"+"case_report_"+caseId+".pdf"
					};
                   
						var options = {
								phantomPath: binPath,
									format: "A3",
									orientation: "portrait",
									border: "10mm"
								
						};
						  
						//   console.log("inhere");


						// Create a GetObjectCommand with the bucket and key
						const ecg_from_aws = "./uploads/delete_created_files/ecg_report_" + caseId + ".pdf";
						// Download the S3 file and merge it

						const bucketName = "javixtest";
						const filePath ='userDocuments/ecgTest/'+citizenId+"_"+caseId+".pdf";
					
						const downloadParams = {
						Bucket: bucketName,
						Key: filePath,
						};

						try {
						var ecg_test_perform = ecgtest.find({ caseId: caseId});
						} catch (error) {
									console.error("Error downloading or merging PDF:", error);
						}


						if (ecg_test_perform.length >0) {
							(async () => {
								try {
									const getObjectCommand = new GetObjectCommand(downloadParams);
									const { Body } = await s3Client.send(getObjectCommand);
									const writeStream = fs.createWriteStream(ecg_from_aws);
									// Pipe the received data to the writable stream
									Body.pipe(writeStream);
									// Wait for the write stream to finish
									await new Promise((resolve, reject) => {
										writeStream.on("finish", async () => {
										});
										writeStream.on("error", reject);
									});
								} catch (error) {
									console.error("Error downloading or merging PDF:", error);
								}
							})();

						}



						process.env.OPENSSL_CONF = '/dev/null';
					  	pdf.create(document, options)
					    .then(val => {

								var filename="./uploads/delete_created_files/"+"case_report_"+caseId+".pdf";
								(async () => {
								var merger = new PDFMerger();
								merger.add(filename); 


								
							
								// // Create a GetObjectCommand with the bucket and key
								// const ecg_from_aws = "./uploads/delete_created_files/ecg_report_" + caseId + ".pdf";
								// const ecg_file_path ="./uploads/delete_created_files/case_report_ecg_"+caseId+".pdf";
								// // Download the S3 file and merge it

								// const bucketName = "javixtest";
								// const filePath ='userDocuments/ecgTest/'+citizenId+"_"+caseId+".pdf";
							
								// const downloadParams = {
								// Bucket: bucketName,
								// Key: filePath,
								// };

								// try {
								// var ecg_test_perform =await  ecgtest.find({ caseId: caseId});
								// } catch (error) {
								// 			console.error("Error downloading or merging PDF:", error);
								// }
								
								// if (ecg_test_perform.length >0) {
								// 	(async () => {
								// 		try {

										

								// 			const getObjectCommand = new GetObjectCommand(downloadParams);
								// 			const { Body } = await s3Client.send(getObjectCommand);
								// 			const writeStream = fs.createWriteStream(ecg_from_aws);
								// 			// Pipe the received data to the writable stream
								// 			Body.pipe(writeStream);
								// 			// Wait for the write stream to finish
								// 			await new Promise((resolve, reject) => {
								// 				writeStream.on("finish", async () => {

								// 						imagePaths = "./uploads/delete_created_files/ecg_png_"+caseId+".png";
								// 						const file = ecg_from_aws;
								// 						(async function () {
								// 							pdfArray = await pdf2img.convert(file);
								// 							console.log("saving");
								// 							for (i = 0; i < pdfArray.length; i++) {
								// 							fs.writeFile(imagePaths, pdfArray[i], function (error) {
								// 								if (error) { console.error("Error: " + error); }
								// 							}); //writeFile
								// 							} // for
								// 						})();
								// 				});
								// 				writeStream.on("error", reject);
								// 			});
								// 		} catch (error) {
								// 			console.error("Error downloading or merging PDF:", error);
								// 		}
								// 	})();

								// }

								// setTimeout( async () => {
								// 	if (ecg_test_perform.length >0) {
								// 		try {
								// 			// Read the PDF file
								// 			const pdfBytes = await fs.promises.readFile(filename);
								// 			// Read the image file
								// 			const imageBytes = await fs.promises.readFile(imagePaths);
								// 			// Create a PDF document
								// 			const pdfDoc = await PDFDocument.load(pdfBytes);
								// 			// Embed the image in the PDF document
								// 			const image = await pdfDoc.embedPng(imageBytes);
								// 			// Add a new page to the PDF
								// 			const page = pdfDoc.addPage([image.width, image.height]);
								// 			// Draw the image on the page
								// 			// const { width, height } = image.scale(0.5);
								// 			const pageWidth = page.getWidth();
								// 			const pageHeight = page.getHeight();
								// 			const xPercentage = 0.1; // 10% of the page width
								// 			const yPercentage = 0.1; // 10% of the page height
								// 			const widthPercentage = 0.9; // 50% of the page width
								// 			const heightPercentage = 0.9; // 50% of the page height

								// 			page.drawImage(image, {
								// 			x: xPercentage * pageWidth,
								// 			y: yPercentage * pageHeight,
								// 			width: widthPercentage * pageWidth,
								// 			height: heightPercentage * pageHeight,
								// 			});
								// 				// Save the modified PDF to a file
								// 				const modifiedPdfBytes = await pdfDoc.save();
								// 				await fs.promises.writeFile(ecg_file_path, modifiedPdfBytes);
								// 		} catch (error) {
								// 			console.error(error);
								// 			res.status(500).send('Error adding image to PDF');
								// 		}
								// 		merger.add(ecg_file_path); 
								// 	}

								// 	var filename2="./uploads/documents/DISCLAIMER.pdf";
									
								// 	merger.add(filename2); 
								// 	var file="./uploads/delete_created_files/"+"case_report_final_"+caseId+".pdf";
								// 	await merger.save(file);
								// 	val.filename="http://18.60.238.252:3010/reports/"+"case_report_final_"+caseId+".pdf";
								// 	return apiResponse.successResponseWithData(res,"Success",val);
									
								// }, 3000);


							
					        	
							})();


							
							var  sh_file_content = "pdftk case_report_"+caseId+".pdf"
							if (ecg_test_perform.length >0) {
								sh_file_content = sh_file_content +" ecg_report_" + caseId + ".pdf DISCLAIMER.pdf cat output case_report_final_"+caseId+".pdf";
							} else {
								sh_file_content = sh_file_content +" DISCLAIMER.pdf cat output case_report_final_"+caseId+".pdf";
							}

							var sh_file_name = "./uploads/delete_created_files/"+"sh_file_" + caseId + ".sh"
							fs.appendFile(sh_file_name, sh_file_content, function (err) {
								if (err) throw err;
								console.log('Saved!');
							});

							fs.chmod(sh_file_name, 0o777, (err) => {
								if (err) {
								  console.error(err);
								  return res.status(500).send('Error changing file permissions');
								}

							});
							fs.close();

							setTimeout( async () => {

									exec("sh "+process.cwd()+"/uploads/delete_created_files/"+"sh_file_" + caseId + ".sh", (error, stdout, stderr) => {
										if (error) {
										console.error(`Error: ${error}`);
										res.status(500).send('Error executing the .sh file');
										} else {
											val.filename="http://18.60.238.252:3010/reports/"+"case_report_final_"+caseId+".pdf";
											return apiResponse.successResponseWithData(res,"Success",val);
										
										}
									});
								
							}, 6000);

					    })
					    .catch(error => {
					        return apiResponse.ErrorResponse(res, error);
					    });
					  }
					});

					  		});


					  		});


					  		});

					  		});
					  			

					  		});
					  			

					  		});

							});
					  			

					  		});

							});
						});
					  			

					  		});

					  			

					  		});	
							});	

							});	


				
					
			}
		
		} catch (err) {
			
			return apiResponse.ErrorResponse(res,"EXp:"+err);
		}
	}
];


//  function awsBucketFile() {
// 	async() => {
// 			const bucketName = 'javixtest';
// 			const filePath = 'userDocuments/ecgTest/'+citizenId+"_"+caseId+".pdf";

// 			const downloadParams = {
// 			Bucket: bucketName,
// 			Key: filePath,
// 			};

			

// 			const command = new GetObjectCommand(downloadParams);
// 			const response = await s3Client.send(command);
// 			if(response) {

// 				// Save the file to disk.
// 				const savePath = './uploads/case_ecg_report_'+citizenId+"_"+caseId+'.pdf';
// 				const writeStream = fs.createWriteStream(savePath);
// 				response.Body.pipe(writeStream);

// 				// Wait for the file to be saved before continuing.
// 				await writeStream.finished;
// 			}
// 		}
// }

exports.createMedicalHistoryReport = [
    	
	body("citizenId").isLength({ min: 1 }).trim().withMessage("Enter citizen ID !"),	

	sanitizeBody("citizenId").escape(),

	(req, res) => { 
			
		try {
			// console.log("Hello i am creating Medical History report");
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
						var citizenId=req.body.citizenId;
						var ngoId=req.body.ngoId;
						var html = fs.readFileSync(process.cwd()+'/helpers/templates/history.html', 'utf8');
						//var token="hgaghsagf";


					var options = { method: 'POST',
					  url: 'https://javixlife.org/api/citizen/getHistoryAllergy',
					  headers: 
					   { 'content-type': 'application/x-www-form-urlencoded' },
					  form: 
					   { citizenId: citizenId,
						ngoId: ngoId
					   } };

					   //LaBtESTS



					   var options1 = { method: 'POST',
					  url: 'https://javixlife.org/api/citizen/getHistoryMedical',
					  headers: 
					   { 'content-type': 'application/x-www-form-urlencoded' },
					  form: 
					   { citizenId: citizenId,
						ngoId: ngoId
					   } };

					   var options2 = { method: 'POST',
					  url: 'https://javixlife.org/api/citizen/getHistoryWomen',
					  headers: 
					   { 'content-type': 'application/x-www-form-urlencoded' },
					  form: 
					   { citizenId: citizenId,
						ngoId: ngoId
					   } };

					   var options3 = { method: 'POST',
					  url: 'https://javixlife.org/api/citizen/getHistoryFamily',
					  headers: 
					   { 'content-type': 'application/x-www-form-urlencoded' },
					  form: 
					   { citizenId: citizenId,
						ngoId: ngoId
					   } };

					   var options4 = { method: 'POST',
					  url: 'https://javixlife.org/api/citizen/getHistoryPersonal',
					  headers: 
					   { 'content-type': 'application/x-www-form-urlencoded' },
					  form: 
					   { citizenId: citizenId,
						ngoId: ngoId
					   } };



					   //eND lAB tESTS


					   var history={'Citizen':"",
					   				'Personal':"",
					  				'Reproductive':"",
					  				'Medical':"",
					  				'Drugs':""
					  				};
					   request(options1, function (error1, response1, body1) {
					  		if (error1) return apiResponse.ErrorResponse(res, error1);
					  			status1=JSON.parse(body1).status;
					  			if(status1==1){
					  				//console.dir(JSON.parse(body1).data.data);
					  				history.Medical=JSON.parse(body1).data.data;
					  				history.Medical['createdAt']=JSON.parse(body1).data.data.createdAt;
					  				//history.medical['doctor']=JSON.parse(body1).data.data.doctor;
					  				var ctemp=JSON.parse(body1).data.data[0].citizen;
					  				if( ctemp!=null && ctemp!=undefined){
					  					history.Citizen=JSON.parse(body1).data.data[0].citizen[0];
					  				}
					  			}
					  		request(options2, function (error2, response2, body2) {
					  		if (error2) return apiResponse.ErrorResponse(res, error2);
					  			status2=JSON.parse(body2).status;
					  			if(status2==1){
					  				history.Reproductive=JSON.parse(body2).data.data;
					  				history.Reproductive['createdAt']=JSON.parse(body2).data.data[0].createdAt;
					  				//history.women['doctor']=JSON.parse(body2).data.data[0].doctor;
					  				//console.dir(JSON.parse(body2).data.data[0].doctor);

					  				var ctemp=JSON.parse(body2).data.data[0].citizen;
					  				if( ctemp!=null && ctemp!=undefined){
					  					history.Citizen=JSON.parse(body2).data.data[0].citizen[0];
					  				}
					  				}
					  		// 		request(options3, function (error3, response3, body3) {
					  		// if (error3) return apiResponse.ErrorResponse(res, error3);
					  		// 	status3=JSON.parse(body3).status;
					  		// 	if(status3==1){
					  		// 		history.Family=JSON.parse(body3).data.data;
					  		// 		history.Family['createdAt']=JSON.parse(body3).data.data.createdAt;
					  		// 		//history.family['doctor']=JSON.parse(body3).data.data.doctor;
					  		// 		var ctemp=JSON.parse(body3).data.data[0].citizen;
					  		// 		if( ctemp!=null && ctemp!=undefined){
					  		// 			history.Citizen=JSON.parse(body3).data[0].data.citizen;
					  		// 		}
					  				
					  		// 		}
					  				request(options4, function (error4, response4, body4) {
					  		if (error4) return apiResponse.ErrorResponse(res, error4);
					  			status4=JSON.parse(body4).status;
					  			if(status4==1){
					  				history.Personal=JSON.parse(body4).data.data;
					  				history.Personal['createdAt']=JSON.parse(body4).data.data.createdAt;
					  				//history.personal['doctor']=JSON.parse(body4).data.data.doctor;
					  				var ctemp=JSON.parse(body4).data.data[0].citizen;
					  				if( ctemp!=null && ctemp!=undefined){
					  					history.Citizen=JSON.parse(body4).data.data[0].citizen[0];
					  				}
					  			}
					  			
					  			
					  			request(options, function (error, response, body) {
					  if (error) return apiResponse.ErrorResponse(res, error);
					  //console.log(JSON.parse(body).status);
					  status=JSON.parse(body).status;
					  //drugs[0].history=history;
					  //var tempr={};
					  if (history.Reproductive.length===0){
					  	history.Reproductive=mappRes['women'];
					  }
					  else{
					  	
					  	var tempwomen=mappRes['women'];
					  	var t1=mapreckey['ageoffirstperiod'];
					  	tempwomen[t1]=history.Reproductive[0]['ageoffirstperiod'];
					  	var t2=mapreckey['pregnancies'];
					  	tempwomen[t2]=history.Reproductive[0]['pregnancies'];
					  	var t3=mapreckey['miscarriages'];
					  	tempwomen[t3]=history.Reproductive[0]['miscarriages'];
					  	var t4=mapreckey['children'];
					  	tempwomen[t4]=history.Reproductive[0]['children'];
					  	var t5=mapreckey['menopauseage'];
					  	tempwomen[t5]=history.Reproductive[0]['menopauseage'];
					  	var t6=mapreckey['lastmenstrualperiod']; tempwomen[t6]=history.Reproductive[0]['lastmenstrualperiod'];
						var t7=mapreckey['numberofdaysbleeding']; tempwomen[t7]=history.Reproductive[0]['numberofdaysbleeding'];
						var t8=mapreckey['intervalbetweenperiods']; tempwomen[t8]=history.Reproductive[0]['intervalbetweenperiods'];
						var t9=mapreckey['isregular']; tempwomen[t9]=history.Reproductive[0]['isregular'];
						var t10=mapreckey['flow']; tempwomen[t10]=history.Reproductive[0]['flow'];
						var t11=mapreckey['painwithmenstruation']; tempwomen[t11]=history.Reproductive[0]['painwithmenstruation'];
						var t12=mapreckey['useofmedicationforpain']; tempwomen[t12]=history.Reproductive[0]['useofmedicationforpain'];
						var t13=mapreckey['misseddays']; tempwomen[t13]=history.Reproductive[0]['misseddays'];
					  	tempwomen['createdAt']=utility.toDDmmyy(history.Reproductive[0]['createdAt'].split('T')[0]);
					  	//tempwomen['doctor']=history.women[0]['doctor'];
    					history.Reproductive=tempwomen;

					  }
					  if (history.Personal.length===0){
					  	history.Personal=mappRes['personal'];
					  }
					  else{
					  	var temppersonal=mappRes['personal'];
					  	var t1=mapreckey['bornraised'];
					  	temppersonal[t1]=history.Personal[0]['bornraised'];
					  	var t2=mapreckey['birthproblem'];
					  	temppersonal[t2]=history.Personal[0]['birthproblem'];
					  	var t3=mapreckey['highesteducation'];
					  	temppersonal[t3]=history.Personal[0]['highesteducation'];
					  	var t4=mapreckey['maritalstatus'];
					  	temppersonal[t4]=history.Personal[0]['maritalstatus'];
					  	var t5=mapreckey['iscurrentlyworking'];
					  	temppersonal[t5]=mapOfTrueFalse[history.Personal[0]['iscurrentlyworking']];
					  	var t6=mapreckey['occupation'];
					  	temppersonal[t6]=history.Personal[0]['occupation'];
					  	var t11=mapreckey['legalproblems'];
					  	temppersonal[t11]=history.Personal[0]['legalproblems'];
					  	temppersonal['createdAt']=utility.toDDmmyy(history.Personal[0]['createdAt'].split('T')[0]);
					  	//temppersonal['doctor']=history.personal[0]['doctor'];

    					history.Personal=temppersonal;
					  }
					  

					  if (history.Medical.length===0){
					  	history.Medical=mappRes['medical'];
					  }
					  else{
					  	var tempmedical=mappRes['medical'];
					  	tempmedical['diabetes']=mapOfTrueFalse[history.Medical[0]['diabetes']];
						tempmedical['high_bp']=mapOfTrueFalse[history.Medical[0]['high_bp']];
						tempmedical['high_cholestrol']=mapOfTrueFalse[history.Medical[0]['high_cholestrol']];
						tempmedical['goiter']=mapOfTrueFalse[history.Medical[0]['goiter']];
						tempmedical['cancer']=mapOfTrueFalse[history.Medical[0]['cancer']];
						tempmedical['leukemia']=mapOfTrueFalse[history.Medical[0]['leukemia']];
						tempmedical['psoriasis']=mapOfTrueFalse[history.Medical[0]['psoriasis']];
						tempmedical['agina']=mapOfTrueFalse[history.Medical[0]['agina']];
						tempmedical['type_of_cancer']=mapOfTrueFalse[history.Medical[0]['type_of_cancer']];
						tempmedical['heart_problems']=mapOfTrueFalse[history.Medical[0]['heart_problems']];
						tempmedical['heart_murmur']=mapOfTrueFalse[history.Medical[0]['heart_murmur']];
						tempmedical['pneumonia']=mapOfTrueFalse[history.Medical[0]['pneumonia']];
						tempmedical['pulmonary_embolism']=mapOfTrueFalse[history.Medical[0]['pulmonary_embolism']];
						tempmedical['asthma']=mapOfTrueFalse[history.Medical[0]['asthma']];
						tempmedical['emphysema']=mapOfTrueFalse[history.Medical[0]['emphysema']];
						tempmedical['stroke']=mapOfTrueFalse[history.Medical[0]['stroke']];
						tempmedical['epilepsy']=mapOfTrueFalse[history.Medical[0]['epilepsy']];
						tempmedical['cataracts']=mapOfTrueFalse[history.Medical[0]['cataracts']];
						tempmedical['kidney_disease']=mapOfTrueFalse[history.Medical[0]['kidney_disease']];
						tempmedical['kidney_stones']=mapOfTrueFalse[history.Medical[0]['kidney_stones']];
						tempmedical['chrohns_disease']=mapOfTrueFalse[history.Medical[0]['chrohns_disease']];
						tempmedical['colitis']=mapOfTrueFalse[history.Medical[0]['colitis']];
						tempmedical['anemia']=mapOfTrueFalse[history.Medical[0]['anemia']];
						tempmedical['jaundice']=mapOfTrueFalse[history.Medical[0]['jaundice']];
						tempmedical['hepatitis']=mapOfTrueFalse[history.Medical[0]['hepatitis']];
						tempmedical['stomach']=mapOfTrueFalse[history.Medical[0]['stomach']];
						tempmedical['rheumatic_fever']=mapOfTrueFalse[history.Medical[0]['rheumatic_fever']];
						tempmedical['tuberculosis']=mapOfTrueFalse[history.Medical[0]['tuberculosis']];
						tempmedical['hiv_aids']=mapOfTrueFalse[history.Medical[0]['hiv_aids']];
						tempmedical['other']=mapOfTrueFalse[history.Medical[0]['other']];
					  	tempmedical['createdAt']=utility.toDDmmyy(history.Medical[0]['createdAt'].split('T')[0]);
					  	//tempfamily ['doctor']=history.family[0]['doctor'];

    					history.Medical=tempmedical;
					  }
					  if(status==1){
					  	var drugstemp=JSON.parse(body).data.data;
					  	history.Drugs=drugstemp;
					  	var ctemp=JSON.parse(body).data.data[0].citizen;
					  				if( ctemp!=null && ctemp!=undefined){
					  					history.Citizen=JSON.parse(body).data.data[0].citizen[0];
					  	}
					  }
					  if (history.Drugs.length===0  ){
					  	history.Drugs=mappRes['drugs'];
					  	}
					  else{
					  	var tempdrugs=mappRes['drugs'];
					  	tempdrugs['allergies']=history.Drugs[0]['allergies'];
					  	tempdrugs['allergyType']=history.Drugs[0]['allergyType'];
						tempdrugs['allergydate']=history.Drugs[0]['allergydate'].split('T')[0];
					  	tempdrugs['createdAt']=utility.toDDmmyy(history.Drugs[0]['createdAt'].split('T')[0]);
					  	history.Drugs=tempdrugs;
					  }
						console.dir(history);						 
					  	var document = {
					    html: html,
					    data: {
					        history: history
					    },
					    path: "./uploads/delete_created_files/"+"medical_history_report_"+citizenId+".pdf"
					};
					

					var options = {
					        format: "A3",
					        orientation: "portrait",
					        border: "10mm"
					    //     header: {
					    //         height: "45mm",
					    //         contents: '<div style="text-align: center;">PortaClinic By JaviX Life </div>'
					    //     },
					    //     "footer": {
					    //         "height": "28mm",
					    //         "contents": {
					           
					    //         default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
					           
					    //     }
					    // }
					};
					process.env.OPENSSL_CONF = '/dev/null';
					  	pdf.create(document, options)
					    .then(val => {
					        // console.log("Response is : -   "+val.filename);
					        var temp = val.filename.split("/");
					        val.filename="http://18.60.238.252:3010/reports/"+"medical_history_report_"+citizenId+".pdf"
					        
					        return apiResponse.successResponseWithData(res,"Success",val);

					    })
					    .catch(error => {
					        return apiResponse.ErrorResponse(res, error);
					    });
					  
					});

					  		});


					  		});


					  		});

					  	
				
					
			}
		} catch (err) {
			
			return apiResponse.ErrorResponse(res,"EXp:"+err);
		}
	}];

exports.createPrescriptionReport = [
    	
	body("caseId").isLength({ min: 1 }).trim().withMessage("Enter Case ID !"),	

	sanitizeBody("caseId").escape(),

	(req, res) => { 
			
		try {
			// console.log("Hello i am creating Prescription report");
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
						var caseId=req.body.caseId;
						var ngoId=req.body.ngoId;
						var html = fs.readFileSync(process.cwd()+'/helpers/templates/prescription.html', 'utf8');
						//var token="hgaghsagf";
						// console.log(html);

					var options = { method: 'POST',
					  url: 'https://javixlife.org/api/doctor/prescriptionlist',
					  headers: 
					   { 'content-type': 'application/x-www-form-urlencoded' },
					  form: 
					   { caseId: caseId,
						ngoId: ngoId
					   } };

					  			
					  			request(options, function (error, response, body) {
					  if (error) return apiResponse.ErrorResponse(res, error);
					  //console.log(JSON.parse(body).status);
					  status=JSON.parse(body).status;
					  
					  if(status==1){
					  	prescription=JSON.parse(body).data.data;
					  	for(var i=0;i<prescription.length;i++){
					  		prescription[i]['dob']=utility.toDDmmyy(prescription[i].citizendetails[0]['dateOfBirth']);
					  	}
					  	
					  	
					  	
					  	// var cdate="";
					  	// console.log(users[0].createdAt);
					  	// if(users[0].createdAt!=null && users[0].createdAt!=undefined && users[0].createdAt!=""){
					  	// 	cdate=users[0].createdAt.toISOString().split('T')[0];
					  	// 	var adate=new Date(cdate);
					  	// 	users[0].createdAt=adate.getDate()+"-"+(adate.getMonth()+1)+"-"+(adate.getYear()+1900);
					  	// }
					  	// else{
					  	// 	users[0].createdAt=cdate;
					  	// }
						
						//console.log("DOB="+users[0].citizendetails[0].dob);
						//console.log("Cdate="+users[0].createdAt);
						//drugs[0].history=history;
						console.dir(prescription);
						// drugs[0].bpsysFun=function() { if(this.bpsys>=110 && this.bpsys<=120)
						// 							{ return("<span class='green'>__________</span>");}
						// 							else if(this.bpsys>=120 && this.bpsys<=160)
						// 							{ return("<span class='yellow'>__________</span>");}
						// 						    else if(this.bpsys>=160 && this.bpsys<=180)
						// 							{ return("<span class='orange'>__________</span>");}
						// 							else if (this.bpsys>=180)
						// 							{ return("<span class='red'>__________</span>");}
						// 						    else return("<span class='red'>"+this.bpsys+"</span>");
						// 						 }
						//console.dir(users[0].labs);						 
					  	var document = {
					    html: html,
					    data: {
					        prescription: prescription
					    },
					    path: "./uploads/delete_created_files/"+"prescription_report_"+caseId+".pdf"
					};

					var options = {
						phantomPath: binPath,
					        format: "A3",
					        orientation: "portrait",
					        border: "10mm"
					    //     header: {
					    //         height: "45mm",
					    //         contents: '<div style="text-align: center;">PortaClinic By JaviX Life</div>'
					    //     },
					    //     "footer": {
					    //         "height": "28mm",
					    //         "contents": {
					           
					    //         default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
					           
					    //     }
					    // }
					};
					process.env.OPENSSL_CONF = '/dev/null';
					  	pdf.create(document, options)
					    .then(val => {
					        // console.log("Response is : -   "+val.filename);
					        var temp = val.filename.split("/");
					        val.filename="http://18.60.238.252:3010/reports/"+"prescription_report_"+caseId+".pdf"
					        
					        return apiResponse.successResponseWithData(res,"Success",val);

					    })
					    .catch(error => {
					        return apiResponse.ErrorResponse(res, error);
					    });
					  }
					});

					
			}
		} catch (err) {
			
			return apiResponse.ErrorResponse(res,"EXp:"+err);
		}
	}];

