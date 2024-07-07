const User = require("../models/UserModel");
const { body,validationResult } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
const auth = require("../middlewares/jwt");
var mongoose = require("mongoose");

// User Schema
function UserData(data) {
	this.id = data._id;
	this.firstName= data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
	this.createdAt = data.createdAt;
}

/**
 * User List.
 * 
 * @returns {Object}
 */
exports.userList = [
	auth,
	function (req, res) {
		try {
			User.find({},"_id firstName lastName email createdAt").then((users)=>{
				if(users.length > 0){
					return apiResponse.successResponseWithData(res, "Operation success", users);
				}else{
					return apiResponse.successResponseWithData(res, "Operation success", []);
				}
			});
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

/**
 * User Detail.
 * 
 * @param {string}      id
 * 
 * @returns {Object}
 */
exports.userDetail = [
	auth,
	function (req, res) {
		if(!mongoose.Types.ObjectId.isValid(req.params.id)){
			return apiResponse.successResponseWithData(res, "Operation success", {});
		}
		try {
			User.findOne({_id: req.params.id},"_id name description createdAt").then((user)=>{                
				if(user !== null){
					let userData = new UserData(user);
					return apiResponse.successResponseWithData(res, "Operation success", userData);
				}else{
					return apiResponse.successResponseWithData(res, "Operation success", {});
				}
			});
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

/**
 * User store.
 * 
 * @param {string}      firstName
 * @param {string}      lastName
 * @param {string}      email
 * 
 * @returns {Object}
 */
exports.userStore = [
	auth,
	body("firstName", "firstName must not be empty.").isLength({ min: 1 }).trim(),
    body("lastName", "lastName must not be empty.").isLength({ min: 1 }).trim(),
    body("email").isLength({ min: 1 }).trim().withMessage("Email must be specified.")
		.isEmail().withMessage("Email must be a valid email address."),
	body("*").escape(),
	(req, res) => {
		try {
			const errors = validationResult(req);
			var user = new User(
				{   firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
				});

			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}
			else {
				//Save user.
				user.save(function (err) {
					if (err) { return apiResponse.ErrorResponse(res, err); }
					let userData = new UserData(user);
					return apiResponse.successResponseWithData(res,"User add Success.", userData);
				});
			}
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

/**
 * User update.
 * 
 * @param {string}      firstName
 * @param {string}      lastName
 * @param {string}      email
 * 
 * @returns {Object}
 */
exports.userUpdate = [
	auth,
	body("firstName", "firstName must not be empty.").isLength({ min: 1 }).trim(),
    body("lastName", "lastName must not be empty.").isLength({ min: 1 }).trim(),
    body("email").isLength({ min: 1 }).trim().withMessage("Email must be specified.")
		.isEmail().withMessage("Email must be a valid email address."),
	body("*").escape(),
	(req, res) => {
		try {
			const errors = validationResult(req);
			var user = new User(
				{ firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
					_id:req.params.id
				});

			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}
			else {
				if(!mongoose.Types.ObjectId.isValid(req.params.id)){
					return apiResponse.validationErrorWithData(res, "Invalid Error.", "Invalid ID");
				}else{
					User.findById(req.params.id, function (err, foundUser) {
						if(foundUser === null){
							return apiResponse.notFoundResponse(res,"User not exists with this id");
                        }else{
								//update user.
								User.findByIdAndUpdate(req.params.id, user, {},function (err) {
									if (err) { 
										return apiResponse.ErrorResponse(res, err); 
									}else{
										let userData = new UserData(user);
										return apiResponse.successResponseWithData(res,"User update Success.", userData);
									}
								});
							
						}
					});
				}
			}
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

/**
 * User Delete.
 * 
 * @param {string}      id
 * 
 * @returns {Object}
 */
exports.userDelete = [
	auth,
	function (req, res) {
		if(!mongoose.Types.ObjectId.isValid(req.params.id)){
			return apiResponse.validationErrorWithData(res, "Invalid Error.", "Invalid ID");
		}
		try {
			User.findById(req.params.id, function (err, foundUser) {
				if(foundUser === null){
					return apiResponse.notFoundResponse(res,"User not exists with this id");
				}else{
                    //delete user.
                    User.findByIdAndRemove(req.params.id,function (err) {
                        if (err) { 
                            return apiResponse.ErrorResponse(res, err); 
                        }else{
                            return apiResponse.successResponse(res,"User delete Success.");
                        }
                    });
				}
			});
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];