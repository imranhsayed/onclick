const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

// Create Schema
const BidSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	userId: {
		type: String
	},
	userName: {
		type: String
	},
	postId: {
		type: String,
	},
	postName: {
		type: String
	},
	postedByUserId: {
		type: String
	},
	postedByUserName: {
		type: String
	},
	postedByUserPhone: {
		type: String
	},
	projectBudget: {
		type: String
	},
	bidPrice: {
		type: Number,
		required: true
	},
	type: {
		type: String,
		required: true
	},
	jobMoneyPaidByVendor: {
		type: String
	},
	accepted: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now()
	}
});

module.exports = Bid = mongoose.model( 'bid', BidSchema );