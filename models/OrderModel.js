/*
    const mongoose = require('mongoose');
    
    const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment', autopopulate: true }]
    });
    
    const commentSchema = new mongoose.Schema({
    text: String,
    author: String
    });
    
    const Post = mongoose.model('Post', postSchema);
    const Comment = mongoose.model('Comment', commentSchema);
*/

var mongoose = require("mongoose");

var OrderSchema = new mongoose.Schema({
	name: {type: String, required: true},
	description: {type: String, required: false},
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", autopopulate: true }],
    product: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product", autopopulate: true }],
}, {timestamps: true});

module.exports = mongoose.model("Order", OrderSchema);