const Validator = require( 'validator' );
const isEmpty = require( './is-empty' );

// Set the validateRegisterInput() equal to module.exports so that it can be accessed in other files
module.exports = function validateProfileInput( data ) {
	let errors = {};

	/**
	 * Set the handle value equal to an empty string if user has not entered the handle, otherwise the Validator.isEmpty() wont work down below.
	 * Note that the isEmpty() here is our custom function defined in is-empty.js and
	 * Validator.isEmpty() down below comes from validator library.
	 * Similarly we do it for password.
	 */
	data.handle = ( ! isEmpty( data.handle ) ) ? data.handle : '';
	data.business = ( ! isEmpty( data.business ) ) ? data.business : '';
	data.category = ( ! isEmpty( data.category ) ) ? data.category : '';
	data.description = ( ! isEmpty( data.description ) ) ? data.description : '';
	data.phone = ( ! isEmpty( data.phone ) ) ? data.phone : '';
	data.gender = ( ! isEmpty( data.gender ) ) ? data.gender : '';
	data.city = ( ! isEmpty( data.city ) ) ? data.city : '';
	data.state = ( ! isEmpty( data.state ) ) ? data.state : '';
	data.address = ( ! isEmpty( data.address ) ) ? data.address : '';

	// // If the length of the handle is not between 6 to 30 char then set errors.handle
	if ( ! Validator.isLength( data.handle, { min: 2, max: 40 } ) ) {
		errors.handle = 'Handle must be 2 to 40 characters';
	}
	if ( Validator.isEmpty( data.handle ) ) {
		errors.handle = 'Handle field is required';
	}
	if ( Validator.isEmpty( data.business ) ) {
		errors.business = 'Business field is required';
	}
	if ( Validator.isEmpty( data.category ) ) {
		errors.category = 'Category field is required';
	}
	if ( Validator.isEmpty( data.phone ) ) {
		errors.phone = 'Phone field is required';
	}
	if ( Validator.isEmpty( data.gender ) ) {
		errors.gender = 'Gender field is required';
	}
	if ( Validator.isEmpty( data.description ) ) {
		errors.description = 'Description field is required';
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