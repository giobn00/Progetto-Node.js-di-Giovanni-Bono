const Order = require("../models/OrderModel");
const { body,validationResult } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
const auth = require("../middlewares/jwt");
var mongoose = require("mongoose");

// Order Schema
function OrderData(data) {
	this.id = data._id;
	this.name= data.name;
	this.description = data.description;
    this.user = data.user;
    this.product = data.product;
	this.createdAt = data.createdAt;
}

/**
 * Order List.
 * 
 * @returns {Object}
 */
exports.orderList = [
	auth,
	function (req, res) {
		try {
			Order.find({},"_id name description user product createdAt").then((orders)=>{
				if(orders.length > 0){
					return apiResponse.successResponseWithData(res, "Operation success", orders);
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
 * Order Detail.
 * 
 * @param {string}      id
 * 
 * @returns {Object}
 */
exports.orderDetail = [
	auth,
	function (req, res) {
		if(!mongoose.Types.ObjectId.isValid(req.params.id)){
			return apiResponse.successResponseWithData(res, "Operation success", {});
		}
		try {
			Order.findOne({_id: req.params.id},"_id name description createdAt").then((order)=>{                
				if(order !== null){
					let orderData = new OrderData(order);
					return apiResponse.successResponseWithData(res, "Operation success", orderData);
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
 * Order store.
 * 
 * @param {string}      name 
 * @param {string}      description
 * @param {string}      user
 * @param {string}      product
 * 
 * @returns {Object}
 */
exports.orderStore = [
	auth,
	body("name", "Name must not be empty.").isLength({ min: 1 }).trim(),
	body("description").isLength({ min: 1 }).trim(),
    body("user").isArray().withMessage('user must be an array').notEmpty().withMessage('user must not be empty'),
    body("product").isArray().withMessage('product must be an array').notEmpty().withMessage('product must not be empty'),
	body("*").escape(),
	(req, res) => {
		try {
			const errors = validationResult(req);
			var order = new Order(
				{ name: req.body.name, 
					description: req.body.description,
                    user: req.body.user,
                    product: req.body.product
				});

			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}
			else {
				//Save order.
				order.save(function (err) {
					if (err) { return apiResponse.ErrorResponse(res, err); }
					let orderData = new OrderData(order);
					return apiResponse.successResponseWithData(res,"Order add Success.", orderData);
				});
			}
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

/**
 * Order update.
 * 
 * @param {string}      name 
 * @param {string}      description
 * 
 * @returns {Object}
 */
exports.orderUpdate = [
	auth,
	body("name", "Name must not be empty.").isLength({ min: 1 }).trim(),
	body("description").isLength({ min: 1 }).trim(),
	body("*").escape(),
	(req, res) => {
		try {
			const errors = validationResult(req);
			var order = new Order(
				{ name: req.body.name,
					description: req.body.description,
					_id:req.params.id
				});

			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}
			else {
				if(!mongoose.Types.ObjectId.isValid(req.params.id)){
					return apiResponse.validationErrorWithData(res, "Invalid Error.", "Invalid ID");
				}else{
					Order.findById(req.params.id, function (err, foundOrder) {
						if(foundOrder === null){
							return apiResponse.notFoundResponse(res,"Order not exists with this id");
                        }else{
								//update order.
								Order.findByIdAndUpdate(req.params.id, order, {},function (err) {
									if (err) { 
										return apiResponse.ErrorResponse(res, err); 
									}else{
										let orderData = new OrderData(order);
										return apiResponse.successResponseWithData(res,"Order update Success.", orderData);
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
 * Order Delete.
 * 
 * @param {string}      id
 * 
 * @returns {Object}
 */
exports.orderDelete = [
	auth,
	function (req, res) {
		if(!mongoose.Types.ObjectId.isValid(req.params.id)){
			return apiResponse.validationErrorWithData(res, "Invalid Error.", "Invalid ID");
		}
		try {
			Order.findById(req.params.id, function (err, foundOrder) {
				if(foundOrder === null){
					return apiResponse.notFoundResponse(res,"Order not exists with this id");
				}else{
                    //delete order.
                    Order.findByIdAndRemove(req.params.id,function (err) {
                        if (err) { 
                            return apiResponse.ErrorResponse(res, err); 
                        }else{
                            return apiResponse.successResponse(res,"Order delete Success.");
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