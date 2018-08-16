const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

// Create Schema
const CategorySchema = new Schema({
	categoryName: {
		type: String,
		required: true
	},
	parentCatId: {
		type: String,
		required: true
	},
	parentCatName: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now()
	}
});

module.exports = Category = mongoose.model( 'category', CategorySchema );