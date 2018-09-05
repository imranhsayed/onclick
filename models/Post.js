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
	categoryId: {
		type: String
	},
	subCategoryId: {
		type: String,
	},
	subCatLevel2Id: {
		type: String,
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
	paymentReceived: {
		type: String,
	},
	paymentId: {
		type: String,
	},
	completedBidderUserId: {
		type: String
	},
	completedBidderName: {
		type: String
	},
	jobCompleted: {
		type: String,
	},
	jobFinalAmount: {
		type: String,
	},
	bidIds: {
		type: [String]
	},
	bidUserIds: {
		type: [String]
	},
	date: {
		type: Date,
		default: Date.now()
	}
});

module.exports = Post = mongoose.model( 'post', PostSchema );