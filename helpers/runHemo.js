const LabTestCaseModel = require("../models/LabTestModel");
const SickleCellModel = require("../models/SickleCellModel");
const ThalassemiaModel = require("../models/ThalassemiaModel");
const LungFunctionTest = require("../models/LungFunctionTest");
const EyeTest = require("../models/EyeTestModel");
const HemoglobinModel = require("../models/HemoglobinModel");

const { body,query,validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");
const utility = require("../helpers/utility");
const jwt = require("jsonwebtoken");
const { constants } = require("../helpers/constants");
var ObjectID = require('mongodb').ObjectID;

exports.updateHemo = [
    
	
	(req, res) => { 
			
		try {
			
			HemoglobinModel.Hemoglobin.find({},function(err,docs){

				if(err){}
				else{
					let rl=docs.length;
					for(var i=0;i<rl;i++){
							try{
								let hemoglobin=parseFloat(docs[i].hemoglobin);
								
								let id=new ObjectID(docs[i]._id);
								
								var severity_data=0;

								if(hemoglobin>16.0 ||  hemoglobin<11.0){
									severity_data=2;
								}
								
								else if(hemoglobin>=15.5 ||  hemoglobin<12.0) {
									severity_data=1;
								}
								else{
								    severity_data=0;
								}
								HemoglobinModel.Hemoglobin.findOneAndUpdate(
									{_id:id},
									{$set:{"severity":severity_data}},
										
									function(err,recs){}
									);
									
							}catch(ex){}
				    }
				    return apiResponse.successResponse(res,"Done");
			}
			});
			} catch (err) {
			
			return apiResponse.ErrorResponse(res,err);
		}
	}];




exports.updateEye = [
    
	
	(req, res) => { 
			
		try {
			
			EyeTest.EyeTest.find({},function(err,docs){

				if(err){}
				else{
					let rl=docs.length;
					for(var i=0;i<rl;i++){
							try{
								let reye=docs[i].reyetest;
								let leye=docs[i].leyetest;
								let id=new ObjectID(docs[i]._id);
								
								var severity_reye=0;
								var severity_leye=0;
								if( reye==="6/6" || reye==="6/9"){
									severity_reye=0;
								}
								
								else if (reye==="6/12" || reye==="6/5"){
									severity_reye=1;
								}
								
								else {
								    severity_reye=2;
								}

								if( leye==="6/6" || leye==="6/9"){
									severity_leye=0;
								}
								
								
								else if(leye==="6/12" || leye==="6/5") {
									severity_leye=1;
								}
								
								else {
								    severity_leye=2;
								}
								
								EyeTest.EyeTest.findOneAndUpdate(
									{_id:id},
									{$set:{"severity_reye":severity_reye,"severity_leye":severity_leye}},
									
									function(err,recs){}
									);
									
							}catch(ex){}
				    }
				    return apiResponse.successResponse(res,"Done");
			}
			});
			} catch (err) {
			
			return apiResponse.ErrorResponse(res,err);
		}
	}];


	exports.updateLipid = [
    
	
	(req, res) => { 
			
		try {
			
			LabTestCaseModel.LipidPanelTest.find({},function(err,docs){

				if(err){}
				else{
					let rl=docs.length;
					for(var i=0;i<rl;i++){
							try{
								let cholesterol=parseFloat(docs[i].cholesterol);
								let hdlcholesterol=parseFloat(docs[i].hdlcholesterol);
								let triglycerides=parseFloat(docs[i].triglycerides);
								let ldl=parseFloat(docs[i].ldl);

								let id=new ObjectID(docs[i]._id);
								
								var severity_cholesterol=0;
								var severity_hdlcholesterol=0;
								var severity_triglycerides=0;
								var severity_ldl=0;

								if( cholesterol>=240){
									severity_cholesterol=2;
								}else if( cholesterol>200){
									severity_cholesterol=1;
								}else {
								    severity_cholesterol=0;
								}

								if( hdlcholesterol<40){
									severity_hdlcholesterol=2;
								}else if( hdlcholesterol<50){
									severity_hdlcholesterol=1;
								}else {
								    severity_hdlcholesterol=0;
								}

								if( triglycerides>=200){
									severity_triglycerides=2;
								}else if( triglycerides<200 || triglycerides>=150){
									severity_triglycerides=1;
								}else {
								    severity_triglycerides=0;
								}

								if( ldl>=130){
									severity_ldl=2;
								}else if( ldl>=100){
									severity_ldl=1;
								}else {
								    severity_ldl=0;
								}
								
								LabTestCaseModel.LipidPanelTest.findOneAndUpdate(
									{_id:id},
									{$set:{"severity_ldl":severity_ldl,"severity_triglycerides":severity_triglycerides,
									"severity_hdlcholesterol":severity_hdlcholesterol,"severity_cholesterol":severity_cholesterol
								}},
									
									function(err,recs){}
									);
									
							}catch(ex){}
				    }
				    return apiResponse.successResponse(res,"Done");
			}
			});
			} catch (err) {
			
			return apiResponse.ErrorResponse(res,err);
		}
	}];


