// routes/api/user.js
const express = require( 'express' );
const bcrypt = require( 'bcryptjs' );
const secretKey = require( '../../config/keys' ).secretOrKey;
const jwt = require( 'jsonwebtoken' );
const passport = require( 'passport' );

// Load user model.
const User = require( '../../models/User' );

/**
 * express.Router() creates modular, mountable route handlers
 * A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.
 */
const router = express.Router();

// Load input validation
const validateRegisterInput = require( '../../validation/register' );
const validateLoginInput = require( '../../validation/login' );

/**
 * Because this file is used for route '/api/users', the routes we define here will be sub route of '/api/users'
 * Hence this route will be available at 'localhost:5000/api/users/test'
 * @route GET api/users/test
 * @desc Tests user route
 * @access public
 */
router.get( '/test', ( req, res ) => res.json( { msg: 'Users works' } ) );

/**
 * @route POST api/users/register
 * @desc Register user
 * @access public
 */
router.post( '/register', ( req, res ) => {

	/**
	 * validateRegisterInput() defined in register.js returns an object with the property names errors and isValid,
	 * We are creating new variables 'errors' and 'isValid' for these properties using ES6 object destructuring.
	 */
	const { errors, isValid } = validateRegisterInput( req.body );

	// If validation fails then send the response 400 with errors object
	if ( ! isValid ) {
		return res.status( 400 ).json( errors );
	}

	/**
	 * findOne() find the document with the query passed as an object.
	 * We access the input elements by req.body.nameOfTheInput
	 */
	User.findOne( { email: req.body.email } )
		.then( ( user) => {

			// If user exists then send a response as 400 with a message 'Email already exists'
			if ( user ) {
				errors.email = 'Email already exists';
				return res.status( 400 ).json( errors.email );
			}

			/**
			 * If the user does not already exists, create a new user using new User(),
			 * which takes an object containing the properties and values of the fields in the 'users' collections
			 */
			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password,
				bidCountInPack: '0',
				package: 'none',
				type: 'user',
				profileId: 'none'
			});

			/**
			 * Generate Salt with bcrypt.genSalt() and then hash the password using bcrypt.hash()
			 */
			bcrypt.genSalt( 10, ( err, salt ) => {
				bcrypt.hash( newUser.password, salt, ( err, hash ) => {
					// If there is an error throw the error, otherwise set the newUser.password equal to hash created from bcrypt.hash()
					if ( err ) throw  err;
					newUser.password = hash;

					// Then save user in the database using newUser.save() and then send the user as response on success and error on failure.
					newUser.save()
						.then( ( user )  => res.json( user ))
						.catch( ( err ) => console.log( err ) )
				} );
			} );
		} )
} );

/**
 * @route POST api/users/login
 * @desc Login User /
 * @access public
 */
router.post( '/login', ( req, res ) => {

	/**
	 * validateRegisterInput() defined in register.js returns an object with the property names errors and isValid,
	 * We are creating new variables 'errors' and 'isValid' for these properties using ES6 object destructuring.
	 */
	const { errors, isValid } = validateLoginInput( req.body );

	// If validation fails then send the response 400 with errors object
	if ( ! isValid ) {
		return res.status( 400 ).json( errors );
	}

	const email = req.body.email;
	const password = req.body.password; // password return here is plain text hence we should use bycrypt.compare()

	// Find user by email. ( Down below { email } in ES6 is same as { email: email }
	User.findOne( { email } )
		.then( ( user ) => {

			// Check for user
			if ( ! user ) {
				errors.email = 'User not found';
				return res.status( 404 ).json( errors );
			}

			/**
			 * If user found , check password,
			 * Note that the password available from req.body.password, is plain text hence
			 * we should use bycrypt.compare() which will take the plain text password 'req.body.password' as first param and
			 * hashed password 'user.password' as a second param and return true inside 'isMatch' variable if matched, false otherwise.
			 */
			bcrypt.compare( password, user.password )
				.then( ( isMatch ) => {
					// If the password matches isMatch will be true.
					if ( isMatch ) {
						// User found
						// res.json( { msg: 'Success' } );

						/**
						 * Create a jwt payload( actual data ) first containing user info to send to using jwt.sign()
						 * Since we have the user object available from then() promise callback, we can access all of its properties.
						 */
						const payload = {
							id: user.id,
							name: user.name,
							email: user.email,
							type: user.type,
							package: user.package,
							profileId: user.profileId,
							bidCountInPack: user.bidCountInPack
						};

						/**
						 * jwt.sign() takes the data passed in payload and signs it, creates a hash and returns a token value.
						 * It takes the payload data as the first param and the secret as the second and returns a token, which we will
						 * send to the user when they sign in or login.
						 * payload contains user info to be sent
						 * keys.secretOrKey is imported from config/keys.js which we can set to anything, which is sent for security
						 * expiresIn is in secs, which is when the token expires, then fourth param is the call back function.
						 */
						jwt.sign( payload, secretKey, { expiresIn: 3600 }, ( err, token ) => {
							res.json( { success: true, token: 'Bearer ' + token } );
						} );
					} else {
						errors.password = 'Password Incorrect';
						// If the password does not match
						return res.status( 400 ).json( errors );
					}
				} )
		} )
});

/**
 * /api/users/profiles
 */
router.post( '/profiles', ( req, res ) => {
	return 'test';
});


/**
 * @route GET api/users/current
 * @desc Return current User /
 * @access Private
 */
router.get( '/current', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {
	/**
	 * You have the entire user object available here in req.user
	 * so you can access all of its properties inside when setting the value of msg as an object.
	 */
	User.findById( req.user.id )
		.then( ( user ) => res.json( user ) )
		.catch( ( errors ) => res.json( errors ) );
} );

/**
 * @route POST api/profile/makeVendor/:id
 * @desc Update the user type as vendor.
 * @access private
 */
router.post( '/makeVendor/:id', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {
	const userField = {
		type: 'vendor'
	};
	User.findOneAndUpdate( { _id: req.params.id }, { $set: userField }, { new: true } )
		.then( ( user ) => res.json( user ) )
		.catch( ( errors ) => res.json( errors ) );
} );

// We export the router so that the server.js file can pick it up
module.exports = router;
