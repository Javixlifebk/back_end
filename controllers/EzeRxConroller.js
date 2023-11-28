
const eze_rx = require("../models/EzeRxModel");
const apiResponse = require("../helpers/apiResponse");


exports.addRecord = [

		// sanitizeBody("screenerId").escape(),
		(req, res) => { 
		try {
			let final_token ='Bearer 4u1Ky@g6RvQSLpSjm$WiLACSX7UxAGRo0&AMZ^yFNUDkHP3YZk&kMRF3!eRBCVoZH%BLounjE$TmOpDOgVXqx$o&fuAExzMYMT'
			if(req.header('authorization') != final_token) {
				return apiResponse.successResponse(res, "Invalid user trying to access !");
			} else {
				data_all = req.body.deviceData;
				let ord_data = req.body.orderNumber;
				array_raw_data = ord_data.split("_"); //case_id citizen_id screener_id

				let info = { 
					caseId:array_raw_data[1],
					citizen_id:array_raw_data[2],
					screener_id:array_raw_data[3],
					ngo_id:array_raw_data[4],
					deviceIdentifier:req.body.deviceIdentifier,
				}

				data_all.forEach(element => {
					console.log("element ",element)
					if(element.name = 'Non-Invasive Hemoglobin') {
						info['non_invasive_hemoglobin_value'] = element.value
						info['non_invasive_hemoglobin_range'] = element.range
					}

					if(element.name = 'Non-Invasive Bilirubin') {
						info['non_invasive_bilirubin_value'] = element.value
						info['non_invasive_bilirubin_range'] = element.range
					}

					if(element.name = 'Oxygen Saturation') {
						info['oxygen_saturation_value'] = element.value
						info['oxygen_saturation_range'] = element.range
					}

					if(element.name = 'Non-Invasive Creatinine') {
						info['non_invasive_creatinine_value'] = element.value
						info['non_invasive_creatinine_range'] = element.range
					}

					if(element.name = 'Non-Invasive Estimated Blood Sugar') {
						info['non_invasive_estimated_blood_sugar_value'] = element.value
						info['non_invasive_estimated_blood_sugar_range'] = element.range
					}
				});

				info['raw_content'] = JSON.stringify(req.body)
					
				eze_rx.create(info)
					.then(() => {
						// Successfully created the record, send a response
						return apiResponse.successResponse(res, "Information created successfully");
					})
					.catch((err) => {
						// Handle any database-related errors
						return apiResponse.ErrorResponse(res, err);
					});
				

			}
			
		} catch (err) {
			return apiResponse.ErrorResponse(res,err);
		}
}];

exports.getRecord=[

	(req, res) => { 
		try {

			let final_token ='Bearer 4u1Ky@g6RvQSLpSjm$WiLACSX7UxAGRo0&AMZ^yFNUDkHP3YZk&kMRF3!eRBCVoZH%BLounjE$TmOpDOgVXqx$o&fuAExzMYMT'
			if(req.header('authorization') != final_token) {
				return apiResponse.successResponse(res, "Invalid user trying to access !");
			} else {
				

				eze_rx.find()
					.then((all_test_data) => {
							return apiResponse.successResponseWithData(res,"All data fetch successfully", all_test_data);
					})
					.catch((err) => {
						// Handle any database-related errors
						return apiResponse.ErrorResponse(res, err);
					});
				

				
			}
			
		} catch (err) {
			return apiResponse.ErrorResponse(res,err);
		}
}];

