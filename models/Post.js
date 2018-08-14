const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

// Create Schema
const PostSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	title: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	userId: {
		type: String,
		required: true
	},
	category: {
		type: String,
		required: true
	},
	subCategory: {
		type: String,
	},
	subCatLevel2: {
		type: String,
	},
	description: {
		type: String,
		required: true
	},
	budgetMin: {
		type: String,
	},
	budgetMax: {
		type: String,
	},
	phone: {
		type: String,
		required: true
	},
	area: {
		type: String,
		required: true
	},
	city: {
		type: String,
		required: true
	},
	state: {
		type: String,
		required: true
	},
	address: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now()
	}
});

module.exports = Post = mongoose.model( 'post', PostSchema );