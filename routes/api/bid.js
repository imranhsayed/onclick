const express = require( 'express' );

/**
 * express.Router() creates modular, mountable route handlers
 * A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a "mini-app".
 */
const router = express.Router();
const mongoose = require( 'mongoose' );
const passport = require( 'passport' );

const User = require( '../../models/User' );
const Bid = require( '../../models/Bid' );
const Post = require( '../../models/Post' );

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

	console.log( 'data received' , data );

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
		let userId = responseData.user_id;
		console.log( 'userid', userId );

		// Save the info that user has purchased the bid.
		const bidData = {};
		bidData.package = 'Bid100';
		bidData.bidCountInPack = '10';
		bidData.paymentRequestId = responseData.payment_id;

		User.findOneAndUpdate( { _id: userId }, { $set: bidData }, { new: true } )
			.then( ( user ) => res.json( user ) )
			.catch( ( errors ) => res.json( errors ) );

		// Redirect the user to payment complete page.
		return res.redirect('http://localhost:3000/payment-complete' );
	}
	console.log( url_parts );
	res.status( 200 ).json( url_parts.query );
} );

/**
 * @route POST api/bid/
 * @desc Create/Add a Bid
 * @access private
 */
router.post( '/', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {
	let user;
	const newBid = new Bid({
		userId: req.body.userId,
		userName: req.body.userName,
		postId: req.body.postId,
		postName: req.body.postName,
		bidPrice: req.body.bidPrice,
		type: req.body.type
	});

	// Update his bid Count in the User model
	User.findById( req.body.userId )
		.then( user => {
			let bidCountInPack = user.bidCountInPack;
				updatedBidCountInPack = bidCountInPack - 1;

				const updatedUserFields = {};
				updatedUserFields.bidCountInPack = updatedBidCountInPack;

				User.findOneAndUpdate( { _id: user._id }, { $set: updatedUserFields }, { new: true } )
					.then( ( user ) => console.log( user ) );
		} )
		.catch( error => res.json( error ) );

	// console.log( 'users', user );

	// Save bid into the database.
	newBid.save()
		.then( bid => {

			/**
			 * Add the bid id to the Post collection in bidIds document.
			 */
			Post.find( { _id: req.body.postId } )
				.then( post => {
					// Push the new bidId into the bidIds array of the post.
					let bidIds = post[0].bidIds;
					bidIds.push( bid._id );

					// Push the userId into the bidUserIds array of the post.
					let bidUserIds = post[0].bidUserIds;
					bidUserIds.push( req.body.userId );

					const updatedPostFields = {};
					updatedPostFields.bidIds = bidIds;
					updatedPostFields.bidUserIds = bidUserIds;

					// Update the post with new bidsIds
					Post.findOneAndUpdate( { _id: post[0]._id }, { $set: updatedPostFields }, { new: true } )
						.then( ( post ) => res.json( post ) )
						.catch( ( errors ) => res.json( errors ) );

				} ).catch( err => res.status(404).json({ postnotfound: 'No post found' }));

			// res.json( bid )
		} )
		.catch( errors => res.json( errors ) );
} );

/**
 * @route GET api/bid/:postId/:userId
 * @desc Get a bid by post id and user id
 * @access private
 */
router.get( '/:postId/:userId', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {
	Bid.findOne( { postId: req.params.postId, userId: req.params.userId } )
		.then( bid => res.json( bid ) )
		.catch( error => res.json( error ) );
} );

/**
 * @route GET api/bid/:userId
 * @desc Get all bids by user id
 * @access private
 */
router.get( '/:userId', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {
	Bid.find( { userId: req.params.userId } )
		.then( bid => res.json( bid ) )
		.catch( error => res.json( error ) );
} );


// We export the router so that the server.js file can pick it up
module.exports = router;