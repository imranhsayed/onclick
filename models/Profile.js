const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	handle: {
		type: String,
		required: true,
		max: 40
	},
	category: {
		type: String,
		required: true
	},
	subCategory: {
		type: String,
	},
	subCatLevel2: {
		type: String
	},
	gender: {
		type: String,
		required: true
	},
	city: {
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

module.exports = Profile = mongoose.model( 'profile', ProfileSchema );