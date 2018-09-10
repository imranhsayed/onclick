const express = require( 'express' );
const mongoose = require( 'mongoose' );
const passport = require( 'passport' );
const multer = require('multer');
const path = require( 'path' );
const url = require('url');

/**
 * express.Router() creates modular, mountable route handlers
 * A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.
 */
const router = express.Router();

// Load Profile model
const Profile = require( '../../models/Profile' );
// Load User
const User = require( '../../models/User' );

const validateProfileInput = require( '../../validation/profile' );

/**
 * PROFILE IMAGE STORING STARTS
 */

// Set The Storage Engine for single image
const profileImageStorage = multer.diskStorage({
	destination: './client/public/uploads/profile_image/',
	filename: function( req, file, cb ){
		cb( null,
			path.basename( file.originalname, path.extname(file.originalname) ) + '-' + Date.now() + path.extname( file.originalname )
		);
	}
});

// Single Upload
const profileImgUpload = multer({
	storage: profileImageStorage,
	limits:{ fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
	fileFilter: function( req, file, cb ){
		checkFileType( file, cb );
	}
}).single('profileImage');

// Check File Type
function checkFileType(file, cb){
	// Allowed ext
	const filetypes = /jpeg|jpg|png|gif/;
	// Check ext
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	// Check mime
	const mimetype = filetypes.test(file.mimetype);

	if( mimetype && extname ){
		return cb(null,true);
	} else {
		cb('Error: Images Only!');
	}
}

/**
 * @route POST api/profile/profile-img-upload
 * @desc Upload profile image
 * @access public
 */
router.post('/profile-img-upload', ( req, res ) => {

	profileImgUpload( req, res, ( error ) => {

		if( error ){
			console.log( 'errors', error );
			res.json( { error: error } );
		} else {
			// If File not found
			if( req.file === undefined ){
				console.log( 'Error: No File Selected!' );
				res.json( 'Error: No File Selected' );
			} else {
				// If Success
				let data = req.file.filename,
					requestUrl = req.headers.referer,
					// Parse the url and get the post id from http://localhost:3000/post-image-uploads?post_id=5b90ffe062d9781599c45c4e
					url_parts = url.parse( requestUrl, true),
					responseData = url_parts.query,
					profileId = responseData.profile_id;

				const profileImageField = {};
				profileImageField.profileImage = '/uploads/profile_image/' + req.file.filename;

				// Save the file name into database into profile model
				Profile.findOneAndUpdate( { _id: profileId }, { $set: profileImageField }, { new: true } )
					.then( profile => {

						// Save the file name into database into user model as well
						const userId = ( profile.user._id ) ? profile.user._id : profile.user.id,
							userImageField = {};
							userImageField.profileImage = profileImageField.profileImage;
							console.log( 'userid', userId );
						User.findOneAndUpdate( { _id: userId }, { $set: userImageField }, { new: true } )
							.then( user => console.log( user ) )
							.catch( error => console.log( error ) );
					} )
					.catch( error => console.log( error ) );



				res.json( data );
			}
		}
	});
});

// * PROFILE IMAGE STORING ENDS

/**
 * BUSINESS IMAGE STORING STARTS
 */
// Set The Storage Engine for single image
const businessImageStorage = multer.diskStorage({
	destination: './client/public/uploads/profile_business_image/',
	filename: function( req, file, cb ){
		cb( null,
			path.basename( file.originalname, path.extname(file.originalname) ) + '-' + Date.now() + path.extname( file.originalname )
		);
	}
});

// Single Upload
const businessImgUpload = multer({
	storage: businessImageStorage,
	limits:{ fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
	fileFilter: function( req, file, cb ){
		checkFileType( file, cb );
	}
}).single('businessImage');

/**
 * @route POST api/profile/business-img-upload
 * @desc Upload post image
 * @access public
 */
router.post('/business-img-upload', ( req, res ) => {

	businessImgUpload( req, res, ( error ) => {

		if( error ){
			console.log( 'errors', error );
			res.json( { error: error } );
		} else {
			// If File not found
			if( req.file === undefined ){
				console.log( 'Error: No File Selected!' );
				res.json( 'Error: No File Selected' );
			} else {
				// If Success
				let data = req.file.filename,
					requestUrl = req.headers.referer,
					// Parse the url and get the post id from http://localhost:3000/post-image-uploads?post_id=5b90ffe062d9781599c45c4e
					url_parts = url.parse( requestUrl, true),
					responseData = url_parts.query,
					profileId = responseData.profile_id;

				const profileBusinessImgField = {};
				profileBusinessImgField.businessImage = '/uploads/profile_business_image/' + req.file.filename;

				// Save the file name into database into profile model
				Profile.findOneAndUpdate( { _id: profileId }, { $set: profileBusinessImgField }, { new: true } )
					.then( profile => console.log( profile ) )
					.catch( error => console.log( error ) );

				res.json( data );
			}
		}
	});
});


// * BUSINESS IMAGE STORING ENDS

/**
 * BUSINESS GALLERY IMAGES
 * MULTIPLE FILE UPLOADS
 */

/**
 * Set The Storage Engine for multiple image
 * We are using path module method here : path.basename( file.originalname, path.extname(file.originalname) ),
 * which will give us the filename without its extension
 * path.extname( file.originalname ) will give us the extension name of the file.
 */
const businessGalleryStorage = multer.diskStorage({
	destination: './client/public/uploads/profile_business_gallery/',
	filename: function( req, file, cb ){
		cb( null,
			path.basename( file.originalname, path.extname(file.originalname) ) + '-' + Date.now() + path.extname( file.originalname )
		);
	}
});

// Multiple File Uploads ( max 4 )
const uploadsBusinessGallery = multer({
	storage: businessGalleryStorage,
	limits:{ fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
	fileFilter: function( req, file, cb ){
		checkFileType( file, cb );
	}
}).array( 'businessGalleryImage', 4 );

/**
 * @route POST /api/profile/business-gallery-upload
 * @desc Upload business Gallery images
 * @access public
 */
router.post('/business-gallery-upload', ( req, res ) => {

	uploadsBusinessGallery( req, res, ( error ) => {
		if( error ){
			console.log( 'errors', error );
			res.json( { error: error } );
		} else {
			// If File not found
			if( req.files === undefined ){
				console.log( 'Error: No File Selected!' );
				res.json( 'Error: No File Selected' );
			} else {
				// If Success
				let data = req.files,
					fileName,
					requestUrl = req.headers.referer,
					// Parse the url and get the post id from http://localhost:3000/post-image-uploads?post_id=5b90ffe062d9781599c45c4e
					url_parts = url.parse( requestUrl, true),
					responseData = url_parts.query,
					profileId = responseData.profile_id;

				const profileBusinessGalleryField = {};
				profileBusinessGalleryField.businessGalleryImages = [];
				for ( let i = 0; i < data.length; i++ ) {
					fileName = '/uploads/profile_business_gallery/' + data[ i ].filename;
					console.log( 'filenm', fileName );
					profileBusinessGalleryField.businessGalleryImages.push( fileName )
				}
				// Save the file name into database
				Profile.findOneAndUpdate( { _id: profileId }, { $set: profileBusinessGalleryField }, { new: true } )
					.then( profile => console.log( profile ) )
					.catch( error => console.log( error ) );

				res.json( req.files );
			}
		}
	});
});



/**
 * Because this file is used for route '/api/users', the routes we define here will be sub route of '/api/users'
 * Hence this route will be available at 'localhost:5000/api/users/test'
 * @route GET api/profile/test/
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
 * @route GET api/profile/handle/:handle
 * @desc Profile by handle
 * @access public
 */
router.get( '/handle/:handle', ( req, res ) => {
	const errors = {};
	Profile.findOne( { handle: req.params.handle } )
		.populate( 'user', [ 'name', 'email' ] )
		.then( ( profile ) => {

			// If profile not found
			if ( ! profile ) {
				errors.noprofile = 'Profile not found';
				return res.status( 400 ).json( errors.noprofile );
			}

			// If profile found
			res.status( 200 ).json( profile );
		} )
		.catch( ( err ) => {
			res.status( 404 ).json( err );
		} )
} );

/**
 * @route GET api/profile/category/:category
 * @desc Profile by category
 * @access public
 */
router.get( '/category/:category', ( req, res ) => {
	const errors = {};
	Profile.find( { category: req.params.category } )
		.populate( 'user', [ 'name', 'email' ] )
		.then( ( profile ) => {

			// If profile not found
			if ( ! profile ) {
				errors.noprofile = 'Profile not found';
				return res.status( 400 ).json( errors.noprofile );
			}

			// If profile found
			res.status( 200 ).json( profile );
		} )
		.catch( ( err ) => {
			res.status( 404 ).json( err );
		} )
} );

/**
 * @route GET api/profile/subCategory/:subCategory
 * @desc Profile by handle
 * @access public
 */
router.get( '/subCategory/:subCategory', ( req, res ) => {
	const errors = {};
	Profile.find( { subCategory: req.params.subCategory } )
		.populate( 'user', [ 'name', 'email' ] )
		.then( ( profile ) => {

			// If profile not found
			if ( ! profile ) {
				errors.noprofile = 'Profile not found';
				return res.status( 400 ).json( errors.noprofile );
			}

			// If profile found
			res.status( 200 ).json( profile );
		} )
		.catch( ( err ) => {
			res.status( 404 ).json( err );
		} )
} );


/**
 * @route GET api/profile/user/:user_id
 * @desc Profile by user id
 * @access public
 */
router.get( '/user/:user_id', ( req, res ) => {
	const errors = {};
	Profile.findOne( { user: req.params.user_id } )
		.populate( 'user', [ 'name', 'email' ] )
		.then( ( profile ) => {

			// If profile not found
			if ( ! profile ) {
				errors.noprofile = 'Profile not found';
				return res.status( 400 ).json( errors.noprofile );
			}

			// If profile found
			res.status( 200 ).json( profile );
		} )
		.catch( ( err ) => {
			res.status( 404 ).json( { profileError: 'There is no profile for this user' } );
		} )
} );

/**
 * @route GET api/profile/all
 * @desc Get all Profiles
 * @access public
 */
router.get( '/all', ( req, res ) => {
	const errors = {};
	Profile.find()
		.populate( 'user', [ 'name', 'email' ] )
		.then( ( profiles ) => {

			// If profiles not found
			if ( ! profiles ) {
				errors.noprofile = 'Profiles not found';
				return res.status( 400 ).json( errors.noprofile );
			}

			// If profile found
			res.status( 200 ).json( profiles );
		} )
		.catch( ( err ) => {
			res.status( 404 ).json( { profileError: 'There is no profile available' } );
		} )
} );

/**
 * CREATE OR UPDATE CURRENT LOGGED IN USER's PROFILE
 * @route POST api/profile/
 * @desc Create profile
 * @access private
 */
router.post( '/', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {

	const { errors, isValid } = validateProfileInput( req.body );

	// Check Validation
	if ( ! isValid ) {
		return res.status( 400 ).json( errors );
	}

	const profileFields = {};
	profileFields.user = req.user.id;
	profileFields.handle = ( req.body.handle ) ? req.body.handle : '';

	// Find the profile for the user with the user id ( req.user.id )
	Profile.findOne( { user: req.user.id } )
		.then( ( profile ) => {

			// If profile exists that means it is a profile update request.
			if ( profile ) {

				// Get fields
				profileFields.business = ( req.body.business ) ? req.body.business : profile.business;
				profileFields.category = ( req.body.category ) ? req.body.category : profile.category;
				profileFields.subCategory = ( req.body.subCategory ) ? req.body.subCategory : profile.subCategory;
				profileFields.subCatLevel2 = ( req.body.subCatLevel2 ) ? req.body.subCatLevel2 : profile.subCatLevel2;
				profileFields.description = ( req.body.description ) ? req.body.description : profile.description;
				profileFields.phone = ( req.body.phone ) ? req.body.phone : profile.phone;
				profileFields.gender = ( req.body.gender ) ? req.body.gender : profile.gender;
				profileFields.city = ( req.body.city ) ? req.body.city : profile.city;
				profileFields.state = ( req.body.state ) ? req.body.state : profile.state;
				profileFields.address = ( req.body.address ) ? req.body.address : profile.address;

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
				profileFields.profileImage = '';
				profileFields.businessImage = '';
				profileFields.businessGalleryImages = [];
				profileFields.business = ( req.body.business ) ? req.body.business : '';
				profileFields.category = ( req.body.category ) ? req.body.category : '';
				profileFields.subCategory = ( req.body.subCategory ) ? req.body.subCategory : '';
				profileFields.subCatLevel2 = ( req.body.subCatLevel2 ) ? req.body.subCatLevel2 : '';
				profileFields.description = ( req.body.description ) ? req.body.description : '';
				profileFields.phone = ( req.body.phone ) ? req.body.phone : '';
				profileFields.gender = ( req.body.gender ) ? req.body.gender : '';
				profileFields.city = ( req.body.city ) ? req.body.city : '';
				profileFields.state = ( req.body.state ) ? req.body.state : '';
				profileFields.address = ( req.body.address ) ? req.body.address : '';

				// Check if handle exists ( which is for seo etc ), first param is the condition
				Profile.findOne( { handle: profileFields.handle } )
					.then( ( profile ) => {
						if ( profile ) {
							errors.handle = 'Handle already exists';
							res.status( 400 ).json( errors );
						}

						// Save profile
						new Profile( profileFields ).save()
							.then( ( profile ) => {
								// Update the user table with his profile id meaning that his profile is created.
								const userFields = {};
								console.log( profile );
								userFields.profileId = profile._id;
								User.findOneAndUpdate( { _id: req.user.id }, { $set: userFields }, { new: true } )
									.then( user => console.log( 'User Updated' ) )
									.catch( error => console.log( error )  );
								res.json( profile )
							} )
							.catch( ( errors ) => res.json( errors ) );
					} )
					.catch( ( errors ) => res.json( errors ) );
			}
		} )
		.catch( ( errors ) => res.json( errors ) )
} );

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Profile.findOneAndRemove({ user: req.user.id }).then(() => {
			User.findOneAndRemove({ _id: req.user.id }).then(() =>
				res.json({ success: true })
			);
		});
	}
);


// We export the router so that the server.js file can pick it up
module.exports = router;