const Validator = require( 'validator' );
const isEmpty = require( './is-empty' );

// Set the validatePostInput() equal to module.exports so that it can be accessed in other files
module.exports = function validateOfferInput( data ) {
	let errors = {};

	/**
	 * Set the handle value equal to an empty string if user has not entered the handle, otherwise the Validator.isEmpty() wont work down below.
	 * Note that the isEmpty() here is our custom function defined in is-empty.js and
	 * Validator.isEmpty() down below comes from validator library.
	 * Similarly we do it for password.
	 */
	data.title = ( ! isEmpty( data.title ) ) ? data.title : '';
	data.description = ( ! isEmpty( data.description ) ) ? data.description : '';

	// // If the length of the categoryName is not between 6 to 30 char then set errors.categoryName
	if ( ! Validator.isLength( data.description, { min: 2, max: 2000 } ) ) {
		errors.description = 'Offer Title must be 2 to 2000 characters';
	}
	if ( Validator.isEmpty( data.description ) ) {
		errors.description = 'Offer Description field is required';
	}
	if ( Validator.isEmpty( data.title ) ) {
		errors.title = 'Offer title field is required';
	}

	return {
		errors,
		isValid: isEmpty( errors )
	}
};