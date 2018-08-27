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
 * @route GET api/bid/pay/
 * @desc Tests user route
 * @access public
 */
router.get( '/test', ( req, res ) => res.json( { msg: 'Bid works' } ) );
let Insta = require('instamojo-nodejs');
router.post( '/pay', ( req, res ) => {
	Insta.setKeys('test_26d6db7fdb9cf8319c5413c8454', 'test_5c2bc0dd788ecd74e17052e5541');

	let data = new Insta.PaymentData();
	Insta.isSandboxMode( true );

		data.purpose =  req.body.purpose;
		data.amount = req.body.amount;
		data.buyer_name =  req.body.buyer_name;
		data.redirect_url =  req.body.redirect_url;
		data.email =  req.body.email;
		data.phone =  req.body.phone;
		data.send_email =  false;
		data.webhook= 'http://www.example.com/webhook/';
		data.send_sms= false;
		data.allow_repeated_payments =  false;

	Insta.createPayment(data, function(error, response) {
		if (error) {
			// some error
		} else {
			// Payment redirection link at response.payment_request.longurl
			const responseData = JSON.parse( response );
			const redirectUrl = responseData.payment_request.longurl;
			res.status( 200 ).json( redirectUrl );
		}
	});
} );

/**
 * @route GET api/bid/callback/
 * @desc Call back url for instamojo
 * @access public
 */
router.get( '/callback/', ( req, res ) => {
	const url = require('url');
	let url_parts = url.parse( req.url, true),
		responseData = url_parts.query;
	console.log( responseData );
	if ( responseData.payment_id ) {
		console.log( 'came' );
		return res.redirect('localhost:3000/' );
	}
	console.log( url_parts );
	res.status( 200 ).json( url_parts.query );
} );



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