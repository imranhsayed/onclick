const express = require( 'express' );

/**
 * express.Router() creates modular, mountable route handlers
 * A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.
 */
const router = express.Router();
const mongoose = require( 'mongoose' );
const passport = require( 'passport' );
const multer = require('multer');
const path = require( 'path' );
const url = require('url');

const Post = require( '../../models/Post' );

// Validation.
const validatePostInput = require( '../../validation/post' );

/**
 * IMAGE STORING STARTS
 */

// Set The Storage Engine for single image
const storage = multer.diskStorage({
	destination: './client/public/uploads/post_image/',
	filename: function( req, file, cb ){
		cb( null,
			path.basename( file.originalname, path.extname(file.originalname) ) + '-' + Date.now() + path.extname( file.originalname )
		);
	}
});

// Single Upload
const upload = multer({
	storage: storage,
	limits:{ fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
	fileFilter: function( req, file, cb ){
		checkFileType( file, cb );
	}
}).single('postImage');

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
 * @route POST api/posts/upload
 * @desc Upload post image
 * @access public
 */
router.post('/upload', ( req, res ) => {

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
					postId = responseData.post_id;

				const postImageField = {};
				postImageField.postImage = '/uploads/post_image/' + req.file.filename;

				// Save the file name into database
				Post.findOneAndUpdate( { _id: postId }, { $set: postImageField }, { new: true } )
					.then( post => console.log( post ) )
					.catch( error => console.log( error ) );

				res.json( data );
			}
		}
	});
});

/**
 * MULTIPLE FILE UPLOADS FOR JOB GALLERY
 */

/**
 * Set The Storage Engine for multiple image
 * We are using path module method here : path.basename( file.originalname, path.extname(file.originalname) ),
 * which will give us the filename without its extension
 * path.extname( file.originalname ) will give us the extension name of the file.
 */
const storageMultiple = multer.diskStorage({
	destination: './client/public/uploads/post_gallery/',
	filename: function( req, file, cb ){
		cb( null,
			path.basename( file.originalname, path.extname(file.originalname) ) + '-' + Date.now() + path.extname( file.originalname )
		);
	}
});

// Multiple File Uploads ( max 4 )
const uploads = multer({
	storage: storageMultiple,
	limits:{ fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
	fileFilter: function( req, file, cb ){
		checkFileType( file, cb );
	}
}).array( 'galleryImage', 4 );

/**
 * @route POST api/posts/gallery-upload
 * @desc Upload post image
 * @access public
 */
router.post('/gallery-upload', ( req, res ) => {

	uploads( req, res, ( error ) => {
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
					postId = responseData.post_id;
				console.log( 'postid', postId );
				console.log( 'imglength', data.length );

				const postGalleryImgField = {};
				postGalleryImgField.postGalleryImages = [];
				for ( let i = 0; i < data.length; i++ ) {
					fileName = '/uploads/post_gallery/' + data[ i ].filename;
					console.log( 'filenm', fileName );
					postGalleryImgField.postGalleryImages.push( fileName )
				}
				// Save the file name into database
				Post.findOneAndUpdate( { _id: postId }, { $set: postGalleryImgField }, { new: true } )
					.then( post => console.log( post ) )
					.catch( error => console.log( error ) );

				res.json( req.files );
			}
		}
	});
});

/**
 * MULTIPLE FILE UPLOADS FOR JOB GALLERY ENDS
 */

/**
 * Because this file is used for route '/api/posts', the routes we define here will be sub route of '/api/users'
 * Hence this route will be available at 'localhost:5000/api/users/test'
 * @route GET api/users/test/
 * @desc Tests user route
 * @access public
 */
router.get( '/test', ( req, res ) => res.json( { msg: 'Post works' } ) );

/**
 * @route GET api/posts/postCount
 * @desc Get the count of total post
 * @access public
 */
router.get( '/postCount', ( req, res ) => {
	Post.find()
		.count()
		.then( ( post ) => res.json( post ) )
		.catch( ( error ) => res.json( { noPostFound: 'No post found' } ) );
} );

/**
 * @route GET api/posts/completedPostCount
 * @desc Get the count of total post where payment has been received
 * @access public
 */
router.get( '/completedPostCount', ( req, res ) => {
	Post.find( { paymentReceived: 'paid' } )
		.count()
		.then( ( post ) => res.json( post ) )
		.catch( ( error ) => res.json( { noPostFound: 'No post found' } ) );
} );

/**
 * @route GET api/posts/
 * @desc Get all the posts
 * @access public
 */
router.get( '/', ( req, res ) => {
	Post.find()
		.sort( { date: -1 } )
		.then( ( posts ) => res.json( posts ) )
		.catch( ( error ) => res.json( { noPostsFound: 'No posts found' } ) );
} );

/**
 * @route GET api/posts/parentCat/:id
 * @desc Get all the posts that belongs to a given categoryId id
 * @access public
 */
router.get( '/categoryId/:id', ( req, res ) => {
	Post.find( { categoryId: req.params.id } )
		.sort( { date: -1 } )
		.then( ( posts ) => res.json( posts ) )
		.catch( ( error ) => res.json( { noPostsFound: 'No posts found' } ) );
} );

/**
 * @route GET api/posts/subCategoryId/:id
 * @desc Get all the posts that belongs to a given subCategoryId id
 * @access public
 */
router.get( '/subCategoryId/:id', ( req, res ) => {
	Post.find( { subCategoryId: req.params.id } )
		.sort( { date: -1 } )
		.then( ( posts ) => res.json( posts ) )
		.catch( ( error ) => res.json( { noPostsFound: 'No posts found' } ) );
} );

/**
 * @route GET api/posts/subCatLevel2Id/:id
 * @desc Get all the posts that belongs to a given subCatLevel2Id id
 * @access public
 */
router.get( '/subCatLevel2Id/:id', ( req, res ) => {
	Post.find( { subCatLevel2Id: req.params.id } )
		.sort( { date: -1 } )
		.then( ( posts ) => res.json( posts ) )
		.catch( ( error ) => res.json( { noPostsFound: 'No posts found' } ) );
} );



/**
 * @route GET api/posts/:id
 * @desc Get a single post by Id
 * @access public
 */
router.get( '/:id', ( req, res ) => {
	Post.findById( req.params.id )
		.then( ( post ) => res.json( post ) )
		.catch( ( error ) => res.json( { noPostFound: 'No post found' } ) );
} );


// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete(
	'/:id',
	passport.authenticate('jwt', { session: false }), (req, res) => {
		// Profile.findOne({ user: req.user.id }).then( profile => {
			Post.findById( req.params.id )
				.then( post => {
					// Delete
					post.remove().then(() => res.json({ success: true }));
				})
				.catch( err => res.status(404).json({ postnotfound: 'No post found' }));
	}
);


/**
 * @route POST api/posts/
 * @desc Create a new post job
 * @access private
 */
router.post( '/', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {

	const { errors, isValid } = validatePostInput( req.body );

	// Check Validation
	if ( ! isValid ) {
	    // If any errors
		return res.status( 400 ).json( errors );
	}

	const newPost = new Post({
		title: req.body.title,
		name: req.body.name,
		email: req.body.email,
		userId: req.body.userId,
		category: req.body.category,
		subCategory: req.body.subCategory,
		subCatLevel2: req.body.subCatLevel2,
		categoryId: req.body.categoryId,
		subCategoryId: req.body.subCategoryId,
		subCatLevel2Id: req.body.subCatLevel2Id,
		description: req.body.description,
		budgetMin: req.body.budgetMin,
		budgetMax: req.body.budgetMax,
		phone: req.body.phone,
		area: req.body.area,
		city: req.body.city,
		state: req.body.state,
		address: req.body.address,
		paymentReceived: 'no',
		paymentId: '',
		jobCompleted: 'no',
		jobFinalAmount: '',
		completedBidderUserId: '',
		completedBidderName: '',
		bidIds: [],
		bidUserIds: []
	});

	newPost.save().then( post => res.json( post ) ).catch( errors => res.json( errors ) )
} );

/**
 * @route POST api/posts/update/:id
 * @desc Update the existing post job
 * @access private
 */
router.post( '/update/:id', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {

	const { errors, isValid } = validatePostInput( req.body );

	// Check Validation
	if ( ! isValid ) {
		// If any errors
		return res.status( 400 ).json( errors );
	}

	const postFields = {};
	postFields.title = req.body.title;
	postFields.category = req.body.category;
	postFields.subCategory = req.body.subCategory;
	postFields.subCatLevel2 = req.body.subCatLevel2;
	postFields.categoryId = req.body.categoryId;
	postFields.subCategoryId = req.body.subCategoryId;
	postFields.subCatLevel2Id = req.body.subCatLevel2Id;
	postFields.description = req.body.description;
	postFields.budgetMin = req.body.budgetMin;
	postFields.budgetMax = req.body.budgetMax;
	postFields.phone = req.body.phone;
	postFields.area = req.body.area;
	postFields.city = req.body.city;
	postFields.state = req.body.state;
	postFields.address = req.body.address;

	Post.findOneAndUpdate( { _id: req.params.id }, { $set: postFields }, { new: true } )
		.then( ( post ) => res.json( post ) )
		.catch( ( errors ) => res.json( errors ) );
} );


// We export the router so that the server.js file can pick it up
module.exports = router;