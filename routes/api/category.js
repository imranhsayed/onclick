const express = require( 'express' );

/**
 * express.Router() creates modular, mountable route handlers
 * A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.
 */
const router = express.Router();
const mongoose = require( 'mongoose' );
const passport = require( 'passport' );

// Category model.
const Category = require( '../../models/Category' );

// Validation.
const validateCategoryInput = require( '../../validation/category' );

/**
 * @route POST api/categories/
 * @desc Create a Category
 * @access private
 */
router.post( '/', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {

	const { errors, isValid } = validateCategoryInput( req.body );

	// Check Validation
	if ( ! isValid ) {
		// If any errors
		return res.status( 400 ).json( errors );
	}

	const newCategory = new Category({
		categoryName: req.body.categoryName,
		parentCatId: req.body.parentCatId,
		parentCatName: req.body.parentCatName
	});

	newCategory.save().then( category => res.json( category ) ).catch( errors => res.json( errors ) )
} );

// We export the router so that the server.js file can pick it up
module.exports = router;