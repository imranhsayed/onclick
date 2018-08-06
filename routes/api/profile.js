const express = require( 'express' );
const mongoose = require( 'mongoose' );
const passport = require( 'passport' );

// Load Profile model
const Profile = require( '../../models/Profile' );
// Load User
const User = require( '../../models/User' );

const validateProfileInput = require( '../../validation/profile' );

/**
 * express.Router() creates modular, mountable route handlers
 * A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.
 */
const router = express.Router();

/**
 * Because this file is used for route '/api/users', the routes we define here will be sub route of '/api/users'
 * Hence this route will be available at 'localhost:5000/api/users/test'
 * @route GET api/users/test/
 * @desc Tests user route
 * @access public
 */
router.get( '/test', ( req, res ) => res.json( { msg: 'Profile works' } ) );

/**
 * GET CURRENT LOGGED IN USER's PROFILE along with email and name from user's field
 * Note that we are not using api/profile:id, because this is a protected route which will be available when the user is logged in,
 * so we will anyways have the id available from web token payload.
 * Because the route '/api/profile' is already set using app.use( '/api/profile', profile ) in server.js, we '/' down below will
 * be equal to '/api/profile'
 *
 * @route GET api/profile/
 * @desc Get current users profile
 * @access private
 */
router.get( '/', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {
	const errors = {};
	/**
	 * Find the profile for the user with the user id ( req.user.id )
	 * Also you can display the properties from users collection, by using populate(),
	 * which takes first parameter as user property name, and second one containing the array of
	 * the properties you want to display into user property, in the profile object which is returned.
	 */
	Profile.findOne( { user: req.user.id } )
		.populate( 'user', ['name', 'email'] )
		.then( ( profile ) => {

			// If profile not found
			if ( ! profile ) {
				errors.noprofile = 'There is no profile for this user';
				return res.status( 400 ).json( errors.noprofile );
			}

			// if user found return user
			res.json( profile );
		} )
		.catch( ( err ) => {
			res.status( 404 ).json( err );
		} )
} );

/**
 * CREATE OR UPDATE CURRENT LOGGED IN USER's PROFILE
 * @route POST api/profile/
 * @desc Get current users profile
 * @access private
 */
router.post( '/', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {

	const { errors, isValid } = validateProfileInput( req.body );

	// Check Validation
	if ( ! isValid ) {
		return res.status( 400 ).json( errors );
	}
	
	// Get fields
	const profileFields = {};
	profileFields.user = req.user.id;
	profileFields.handle = ( req.body.handle ) ? req.body.handle : '';
	profileFields.category = ( req.body.category ) ? req.body.category : '';
	profileFields.subCategory = ( req.body.subCategory ) ? req.body.subCategory : '';
	profileFields.subCatLevel2 = ( req.body.subCatLevel2 ) ? req.body.subCatLevel2 : '';
	profileFields.gender = ( req.body.gender ) ? req.body.gender : '';
	profileFields.city = ( req.body.city ) ? req.body.city : '';
	profileFields.address = ( req.body.address ) ? req.body.address : '';


	// Find the profile for the user with the user id ( req.user.id )
	Profile.findOne( { user: req.user.id } )
		.then( ( profile ) => {

			// If profile exists that means it is a profile update request.
			if ( profile ) {
				/**
				 * Update the value
				 * findOneAndUpdate() takes
				 * first argument is the conditional query object ( in this case find user with the given id )
				 * second argument is an object containing data you want to update. Here $set is an update operator used to update the document (record)
				 */
				Profile.findOneAndUpdate( { user: req.user.id }, { $set: profileFields }, { new: true } )
					.then( ( profile ) => res.json( profile ) )
					.catch( ( errors ) => res.json( errors ) );
			} else {
				// If profile doesn't exist that means create profile.

				// Check if handle exists ( which is for seo etc ), first param is the condition
				Profile.findOne( { handle: profileFields.handle } )
					.then( ( profile ) => {
						if ( profile ) {
							errors.handle = 'Handle already exists';
							res.status( 400 ).json( errors );
						}

						// Save profile
						new Profile( profileFields ).save()
							.then( ( profile ) => res.json( profile ) )
							.catch( ( errors ) => res.json( errors ) );
					} )
					.catch( ( errors ) => res.json( errors ) );
			}
		} )
		.catch( ( errors ) => res.json( errors ) )
} );


// We export the router so that the server.js file can pick it up
module.exports = router;