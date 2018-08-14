const Validator = require( 'validator' );
const isEmpty = require( './is-empty' );

// Set the validatePostInput() equal to module.exports so that it can be accessed in other files
module.exports = function validatePostInput( data ) {
	let errors = {};

	/**
	 * Set the handle value equal to an empty string if user has not entered the handle, otherwise the Validator.isEmpty() wont work down below.
	 * Note that the isEmpty() here is our custom function defined in is-empty.js and
	 * Validator.isEmpty() down below comes from validator library.
	 * Similarly we do it for password.
	 */
	data.title = ( ! isEmpty( data.title ) ) ? data.title : '';
	data.category = ( ! isEmpty( data.category ) ) ? data.category : '';
	data.description = ( ! isEmpty( data.description ) ) ? data.description : '';
	data.phone = ( ! isEmpty( data.phone ) ) ? data.phone : '';
	data.area = ( ! isEmpty( data.area ) ) ? data.area : '';
	data.city = ( ! isEmpty( data.city ) ) ? data.city : '';
	data.state = ( ! isEmpty( data.state ) ) ? data.state : '';
	data.address = ( ! isEmpty( data.address ) ) ? data.address : '';

	// // If the length of the title is not between 6 to 30 char then set errors.title
	if ( ! Validator.isLength( data.title, { min: 2, max: 40 } ) ) {
		errors.title = 'Job Title must be 2 to 40 characters';
	}
	if ( Validator.isEmpty( data.title ) ) {
		errors.title = 'Job Title field is required';
	}
	if ( Validator.isEmpty( data.category ) ) {
		errors.category = 'Category field is required';
	}
	if ( Validator.isEmpty( data.phone ) ) {
		errors.phone = 'Phone field is required';
	}
	if ( Validator.isEmpty( data.description ) ) {
		errors.description = 'Description field is required';
	}
	if ( Validator.isEmpty( data.area ) ) {
		errors.area = 'Area field is required';
	}
	if ( Validator.isEmpty( data.city ) ) {
		errors.city = 'City field is required';
	}
	if ( Validator.isEmpty( data.state ) ) {
		errors.state = 'State field is required';
	}
	if ( Validator.isEmpty( data.address ) ) {
		errors.address = 'Address field is required';
	}

	return {
		errors,
		isValid: isEmpty( errors )
	}
};