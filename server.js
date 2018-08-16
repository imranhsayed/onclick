const express = require( 'express' );
const mongoose = require('./mongoose/mongoose');
const bodyParser = require( 'body-parser' );
const path = require( 'path' );
const passport = require( 'passport' );

// Load user route
const users = require( './routes/api/users' );
const profile = require( './routes/api/profile' );
const posts = require( './routes/api/posts' );
const category = require( './routes/api/category' );

/**
 * express.Router() creates modular, mountable route handlers
 * A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.
 */
const router = express.Router();

// Set app equal to the object returned by express();
const app = express();

/**
 * Configure the middleware.
 * bodyParser.json() returns a function that is passed as a param to app.use() as middleware
 * With the help of this method, we can now send JSON to our express application.
 */
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( bodyParser.json() );

// Set homepage route
// app.get( '/', ( req, res ) => res.send( 'hellos' ) );

app.use( '/api/users', users );
app.use( '/api/profile', profile );
app.use( '/api/posts', posts );
app.use( '/api/categories', category );

// Passport middleware
app.use( passport.initialize() );

// Include Passport Config
require( './config/passport' )( passport );


// We export the router so that the server.js file can pick it up
module.exports = router;

if ( process.env.NODE_ENV === 'production' ) {
    // Set a static folder
	app.use( express.static( 'client/build' ) );
	app.get( '*', ( req, res ) => res.sendFile( path.resolve( __dirname, 'client', 'build', 'index.html' ) ) );

}

// Set up a port
const port = process.env.PORT || 5000;

app.listen( port, () => console.log( `Server running on port: ${port}` ) );