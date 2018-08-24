const express = require( 'express' );

/**
 * express.Router() creates modular, mountable route handlers
 * A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.
 */
const router = express.Router();
const mongoose = require( 'mongoose' );
const passport = require( 'passport' );

// const Post = require( '../../models/Post' );


/**
 * Because this file is used for route '/api/posts', the routes we define here will be sub route of '/api/users'
 * Hence this route will be available at 'localhost:5000/api/users/test'
 * @route GET api/bid/test/
 * @desc Tests user route
 * @access public
 */
router.get( '/test', ( req, res ) => res.json( { msg: 'Bid works' } ) );


/**
 * @route POST api/posts/update/:id
 * @desc Update the existing post job
 * @access private
 */
// router.post( '/update/:id', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {
//
// 	const { errors, isValid } = validatePostInput( req.body );
//
// 	// Check Validation
// 	if ( ! isValid ) {
// 		// If any errors
// 		return res.status( 400 ).json( errors );
// 	}
//
// 	const postFields = {};
// 	postFields.title = req.body.title;
// 	postFields.category = req.body.category;
// 	postFields.subCategory = req.body.subCategory;
// 	postFields.subCatLevel2 = req.body.subCatLevel2;
// 	postFields.categoryId = req.body.categoryId;
// 	postFields.subCategoryId = req.body.subCategoryId;
// 	postFields.subCatLevel2Id = req.body.subCatLevel2Id;
// 	postFields.description = req.body.description;
// 	postFields.budgetMin = req.body.budgetMin;
// 	postFields.budgetMax = req.body.budgetMax;
// 	postFields.phone = req.body.phone;
// 	postFields.area = req.body.area;
// 	postFields.city = req.body.city;
// 	postFields.state = req.body.state;
// 	postFields.address = req.body.address;
//
// 	Post.findOneAndUpdate( { _id: req.params.id }, { $set: postFields }, { new: true } )
// 		.then( ( post ) => res.json( post ) )
// 		.catch( ( errors ) => res.json( errors ) );
// } );


// We export the router so that the server.js file can pick it up
module.exports = router;