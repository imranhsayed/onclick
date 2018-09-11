const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

// Create Schema
const OfferSchema = new Schema({
	userId: {
		type: String
	},
	userName: {
		type: String
	},
	userImage: {
		type: String
	},
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	offerImage: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now()
	}
});

module.exports = Offer = mongoose.model( 'offer', OfferSchema );