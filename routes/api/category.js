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

/**
 * @route GET api/categories/
 * @desc Get all the categories
 * @access public
 */
router.get( '/', ( req, res ) => {
	Category.find()
		.sort( { date: -1 } )
		.then( ( category ) => res.json( category ) )
		.catch( ( error ) => res.json( { noPostsFound: 'No category found' } ) );
} );

/**
 * @route GET api/categories/parentCats
 * @desc Get all the parent categories
 * @access public
 */
router.get( '/parentCats', ( req, res ) => {
	Category.find()
		.sort( { categoryName: -1 } )
		.then( ( category ) => res.json( category ) )
		.catch( ( error ) => res.json( { noPostsFound: 'No category found' } ) );
} );

/**
 * @route GET api/categories/subCats/:id
 * @desc Get Sub Categories by category id.
 * @access public
 */
router.get( '/subCats/:id', ( req, res ) => {
	const errors = {};
	Category.find( { parentCatId: req.params.id } )
		.then( ( category ) => {

			// If category not found
			if ( ! category ) {
				errors.nocategory = 'Sub Category not found';
				return res.status( 400 ).json( errors.nocategory );
			}

			// If category found
			res.status( 200 ).json( category );
		} )
		.catch( ( err ) => {
			res.status( 404 ).json( err );
		} )
} );

/**
 * @route GET api/categories/subCatsLvlTwo/:id
 * @desc Get Sub Categories Lvl2 by category id.
 * @access public
 */
router.get( '/subCatsLvlTwo/:id', ( req, res ) => {
	const errors = {};
	Category.find( { parentCatId: req.params.id } )
		.then( ( category ) => {

			// If category not found
			if ( ! category ) {
				errors.nocategory = 'Sub Category Lvl2 not found';
				return res.status( 400 ).json( errors.nocategory );
			}

			// If category found
			res.status( 200 ).json( category );
		} )
		.catch( ( err ) => {
			res.status( 404 ).json( err );
		} )
} );


/**
 * @route GET api/categories/:id
 * @desc Get a single category by Id
 * @access public
 */
router.get( '/:id', ( req, res ) => {
	Category.findById( req.params.id )
		.then( ( category ) => res.json( category ) )
		.catch( ( error ) => res.json( { noPostFound: 'No category found' } ) );
} );

/**
 * @route DELETE api/categories/:id
 * @desc Delete a category by its id.
 * @access private
 */
router.delete( '/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
		// Profile.findOne({ user: req.user.id }).then( profile => {
		Category.findById( req.params.id )
			.then( category => {
				// Delete
				category.remove().then(() => res.json({ success: true }));
			})
			.catch( err => res.status(404).json({ categorynotfound: 'No category found' }));
	}
);

// We export the router so that the server.js file can pick it up
module.exports = router;