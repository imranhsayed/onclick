const Validator = require( 'validator' );
const isEmpty = require( './is-empty' );

// Set the validatePostInput() equal to module.exports so that it can be accessed in other files
module.exports = function validateCategoryInput( data ) {
	let errors = {};

	/**
	 * Set the handle value equal to an empty string if user has not entered the handle, otherwise the Validator.isEmpty() wont work down below.
	 * Note that the isEmpty() here is our custom function defined in is-empty.js and
	 * Validator.isEmpty() down below comes from validator library.
	 * Similarly we do it for password.
	 */
	data.categoryName = ( ! isEmpty( data.categoryName ) ) ? data.categoryName : '';
	data.parentCatId = ( ! isEmpty( data.parentCatId ) ) ? data.parentCatId : '';

	// // If the length of the categoryName is not between 6 to 30 char then set errors.categoryName
	if ( ! Validator.isLength( data.categoryName, { min: 2, max: 40 } ) ) {
		errors.categoryName = 'Category Title must be 2 to 40 characters';
	}
	if ( Validator.isEmpty( data.categoryName ) ) {
		errors.categoryName = 'Category Title field is required';
	}
	if ( Validator.isEmpty( data.parentCatId ) ) {
		errors.parentCatId = 'Parent Category field is required';
	}

	return {
		errors,
		isValid: isEmpty( errors )
	}
};