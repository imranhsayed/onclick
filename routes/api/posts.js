const express = require( 'express' );

/**
 * express.Router() creates modular, mountable route handlers
 * A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.
 */
const router = express.Router();
const mongoose = require( 'mongoose' );
const passport = require( 'passport' );

const Post = require( '../../models/Post' );
const Profile = require( '../../models/Profile' );

// Validation.
const validatePostInput = require( '../../validation/post' );

/**
 * Because this file is used for route '/api/posts', the routes we define here will be sub route of '/api/users'
 * Hence this route will be available at 'localhost:5000/api/users/test'
 * @route GET api/users/test/
 * @desc Tests user route
 * @access public
 */
router.get( '/test', ( req, res ) => res.json( { msg: 'Post works' } ) );

/**
 * @route GET api/posts/
 * @desc Get all the posts
 * @access public
 */
router.get( '/', ( req, res ) => {
	Post.find()
		.sort( { date: -1 } )
		.populate( 'user', [ 'name', 'email' ] )
		.then( ( posts ) => res.json( posts ) )
		.catch( ( error ) => res.json( { noPostsFound: 'No posts found' } ) );
} );

/**
 * @route GET api/posts/category/:id
 * @desc Get all the posts that belongs to a given category id
 * @access public
 */
router.get( '/category/:id', ( req, res ) => {
	Post.find( {  } )
		.sort( { date: -1 } )
		.populate( 'user', [ 'name', 'email' ] )
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