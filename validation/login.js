const Validator = require( 'validator' );
const isEmpty = require( './is-empty' );

// Set the validateRegisterInput() equal to module.exports so that it can be accessed in other files
module.exports = function validateLoginInput( data ) {
	let errors = {};

	/**
	 * Set the email value equal to an empty string if user has not entered the email, otherwise the Validator.isEmpty() wont work down below.
	 * Note that the isEmpty() here is our custom function defined in is-empty.js and
	 * Validator.isEmpty() down below comes from validator library.
	 * Similarly we do it for password.
	 */
	data.email = ( ! isEmpty( data.email ) ) ? data.email : '';
	data.password = ( ! isEmpty( data.password ) ) ? data.password : '';

	if ( ! Validator.isEmail( data.email ) ) {
		errors.email = 'Email is invalid';
	}
	if ( Validator.isEmpty( data.email ) ) {
		errors.email = 'Email field is required';
	}
	// If the length of the password is not between 6 to 30 char then set errors.password
	if ( ! Validator.isLength( data.password, { min: 6, max: 30 } ) ) {
		errors.password = 'Password must be 2 to 30 characters';
	}
	if ( Validator.isEmpty( data.password ) ) {
		errors.password = 'Password is empty';
	}

	return {
		errors,
		isValid: isEmpty( errors )
	}
};