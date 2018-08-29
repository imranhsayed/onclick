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
	bidPrice: {
		type: String,
		required: true
	},
	type: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now()
	}
});

module.exports = Bid = mongoose.model( 'bid', BidSchema );