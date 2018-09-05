const express = require( 'express' );

/**
 * express.Router() creates modular, mountable route handlers
 * A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a "mini-app".
 */
const router = express.Router();
const mongoose = require( 'mongoose' );
const passport = require( 'passport' );

const Payment = require( '../../models/Payment' );
const User = require( '../../models/User' );
const Bid = require( '../../models/Bid' );
const Post = require( '../../models/Post' );

/**
 * @route GET api/payments/bidPayments
 * @desc Get all payments made for buy bid package
 * @access private
 */
router.get( '/bidPayments', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {
	Payment.find( { for: 'Bid Package' } )
		.sort( { date: -1 } )
		.then( payment => res.json( payment ) )
		.catch( error => res.json( error ) );
} );

/**
 * @route GET api/payments/vendorJobPayments
 * @desc Get all payments made for buy bid package
 * @access private
 */
router.get( '/vendorJobPayments', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {
	Payment.find( { for: 'job' } )
		.sort( { date: -1 } )
		.then( payment => res.json( payment ) )
		.catch( error => res.json( error ) );
} );

/**
 * @route GET api/payments/totalPaymentsReceived
 * @desc Get sum of total payments received
 * @access public
 */
router.get( '/totalPaymentsReceived', ( req, res ) => {
	// Payment.find()
	// 	.then( payment => res.json( payment ) )
	// 	.catch( error => res.json( error ) );
	const amount = {};
	Payment.aggregate( { total: { $sum: 'amount' } } )
		.then( payment => res.json( payment ) )
		.catch( error => res.json( error ) );
} );



// We export the router so that the server.js file can pick it up
module.exports = router;