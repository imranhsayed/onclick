const express = require( 'express' );

/**
 * express.Router() creates modular, mountable route handlers
 * A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.
 */
const router = express.Router();

/**
 * Because this file is used for route '/api/users', the routes we define here will be sub route of '/api/users'
 * Hence this route will be available at 'localhost:5000/api/users/test'
 * @route GET api/users/test/
 * @desc Tests user route
 * @access public
 */
router.get( '/test', ( req, res ) => res.json( { msg: 'Post works' } ) );

// We export the router so that the server.js file can pick it up
module.exports = router;