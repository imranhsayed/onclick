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
	profileImage: {
		type: String
	},
	businessImage: {
		type: String
	},
	businessGalleryImages: {
		type: [String]
	},
	business: {
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
		type: String
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
	description: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: true
	},
	gender: {
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

module.exports = Profile = mongoose.model( 'profile', ProfileSchema );