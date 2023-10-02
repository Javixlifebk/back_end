const RoleModel = require("../models/RoleModel");
const UserModel = require("../models/UserModel");
const ActionModel = require("../models/ActionModel");
const { body,validationResult } = require("express-validator");
// const {sanitizeBody } = require("express-validator");
//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");
const utility = require("../helpers/utility");
const jwt = require("jsonwebtoken");
const { constants } = require("../helpers/constants");


exports.mymenulist = [
	body("email").isLength({ min: 5,max:99 }).trim().withMessage("Email must be specified.")
		.isEmail().withMessage("Email must be a valid email address."),
	
	// sanitizeBody("email").escape(),
	
	(req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
				var query = {email : req.body.email};
				// find RoleId to get all Active Menu for this domain
				UserModel.findOne(query).then(user => {
					if (user) {
								// list Menu
								let roleId=user.roleId;
									ActionModel.find({roleId:roleId}).sort({'type':-1}).then(menus => {
										if (menus) {
											let menuObj=utility.getMenuClassObject(menus); 
											let menuList=menuObj.getMenuList(); 
											
											if(menuList!=null)
											return apiResponse.successResponseWithData(res,"found",menuList);
										    else
												return apiResponse.unauthorizedResponse(res, "Menu Exception");
										}else{
											return apiResponse.unauthorizedResponse(res, "Menu not found");
										}
									});

					
					}else{
						return apiResponse.unauthorizedResponse(res, "Specified email not found.");
					}
				});
			}
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	}];
	
exports.addRole = [
	body("roleId").isLength({ min: 1,max:2 }).trim().withMessage("Role Id must be in between 1-99"),
	
	body("roleName").isLength({ min: 1,max:30 }).trim().withMessage("Fill Role Name"),	
	// sanitizeBody("roleId").escape(),
	// sanitizeBody("roleName").escape(),
	(req, res) => {
		try { 
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
				var resData = {roleId : req.body.roleId,roleName:req.body.roleName};
				var roleModel = new RoleModel(
						{
							roleId : req.body.roleId,
							roleName:req.body.roleName,
							ngoId:req.body.ngoId,

						}
					);
				roleModel.save(function (err) {
							if (err) { return apiResponse.ErrorResponse(res, err); }
							
			
							return apiResponse.successResponseWithData(res,"Role enrty Success.", resData);

						}); 
				
			}
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	}];		
exports.addAction = [
	body("roleId").isLength({ min: 1,max:2 }).trim().withMessage("Role Id must be in between 1-99"),
	body("linkName").isLength({ min: 1,max:30 }).trim().withMessage("Fill Link Name"),	
	body("linkURL").isLength({ min: 1,max:256 }).trim().withMessage("Fill URL <=256 chars"),
    body("type").isLength({ min: 1,max:1 }).trim().withMessage("Select menu type"),
	body("parentId").isLength({ min: 1 }).trim().withMessage("Select Parent Id ,# in case of no parent"),	
	// sanitizeBody("roleId").escape(),
	// sanitizeBody("linkName").escape(),
	// sanitizeBody("linkURL").escape(),
	// sanitizeBody("parentId").escape(),
	
	(req, res) => {
		try { 
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
				var resData = {roleId : req.body.roleId,roleName:req.body.roleName};
				var ID=utility.uID();
				var pID=req.body.parentId;
				var type=req.body.type;
				var actionModel = new ActionModel(
						{
							itemId:ID,
							roleId : req.body.roleId,
							linkName:req.body.linkName,
							linkURL:req.body.linkURL,
							parentId:pID,
							type:type,
							ngoId:req.body.ngoId,
							
						}
					);
				actionModel.save(function (err) {
							if (err) { return apiResponse.ErrorResponse(res, err); }
							
			
							return apiResponse.successResponseWithData(res,"Action enrty Success.", resData);

						}); 
				
			}
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	}];			