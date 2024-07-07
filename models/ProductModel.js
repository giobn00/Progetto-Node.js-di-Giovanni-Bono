var mongoose = require("mongoose");

var ProductSchema = new mongoose.Schema({
	name: {type: String, required: true},
	description: {type: String, required: false},
}, {timestamps: true});

module.exports = mongoose.model("Product", ProductSchema);