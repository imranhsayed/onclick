const express = require( 'express' );
const router = express.Router();
const mongoose = require( 'mongoose' );
const passport = require( 'passport' );
const multer = require( 'multer' );
const path = require( 'path' );
const url = require('url');

// Offer model
const Offer = require( './../../models/Offer' );

// Validation.
const validateOfferInput = require( '../../validation/offer' );


// Set The Storage Engine for single image
const offerImgStorage = multer.diskStorage({
	destination: './client/public/uploads/offer_image/',
	filename: function( req, file, cb ){
		cb( null,
			path.basename( file.originalname, path.extname(file.originalname) ) + '-' + Date.now() + path.extname( file.originalname )
		);
	}
});

// Single Upload
const upload = multer({
	storage: offerImgStorage,
	limits:{ fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
	fileFilter: function( req, file, cb ){
		checkFileType( file, cb );
	}
}).single( 'offerImage' );

// Check File Type
function checkFileType( file, cb ){
	// Allowed ext
	const filetypes = /jpeg|jpg|png|gif/;
	// Check ext
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	// Check mime
	const mimetype = filetypes.test(file.mimetype);

	if( mimetype && extname ){
		return cb( null, true );
	} else {
		cb('Error: Images Only!');
	}
}

/**
 * @route POST /api/offer/offer-img-upload
 * @desc Upload offer image
 * @access public
 */
router.post( '/offer-img-upload', ( req, res ) => {

	upload( req, res, ( error ) => {

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
					offerId = responseData.offer_id;

				const offerImageField = {};
				offerImageField.offerImage = '/uploads/offer_image/' + req.file.filename;

				// Save the file name into database
				Offer.findOneAndUpdate( { _id: offerId }, { $set: offerImageField }, { new: true } )
					.then( offer => console.log( offer ) )
					.catch( error => console.log( error ) );
				console.log( 'request', req );
				console.log( 'data', data );
				res.json( data );
			}
		}
	});
});


/**
 * Post: /api/offer/
 * Create a new offer
 * private
 */
router.post( '/', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {

	const { errors, isValid } = validateOfferInput( req.body );

	// Check Validation
	if ( ! isValid ) {
		// If any errors
		return res.status( 400 ).json( errors );
	}

	// Save the data in the database.
	const offer = new Offer({
		userId: req.body.userId,
		title: req.body.title,
		description: req.body.description,
		offerImage: ''
	});

	offer.save()
		.then( offer => res.status( 200 ).json( offer )  )
		.catch( error => res.status( 400 ).json( error ) );
} );

// We export the router so that the server.js file can pick it up
module.exports = router;