const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

// Create Schema
const PaymentSchema = new Schema({
	paymentRequestId: {
		type: String,
		required: true
	},
	itemId: {
		type: String
	},
	title: {
		type: String
	},
	amount: {
		type: String
	},
	for: {
		type: String
	},
	payerName: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now()
	}
});

module.exports = Payment = mongoose.model( 'payment', PaymentSchema );