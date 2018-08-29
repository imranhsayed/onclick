import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

// jwt-decode module is used to decode the user data from auth token
import jwt_decode from 'jwt-decode';
import {GET_ERRORS, GET_POSTS, SET_CURRENT_USER} from './types';

/**
 * Register User: registerUser()
 * Note this is being exported as registerUser const in App.js
 * @param userData
 * @param history
 * @return {function(*)}
 */
export const registerUser =  ( userData, history ) => dispatch => {
	/**
	 * axios.post() makes a post request at 'http://localhost:5000/api/users/register',
	 * which in turn will will call the router.post( '/register'..) function in node js backend,
	 * which will check validation and on no errors will register the user and save it into database
	 * router.post( '/register'..) returns a new user object which will be available in result.data
	 * accessible in then().
	 * And if there will be any errors it will be available in err.response.data down below.
	 * Note that we didn't have to prefix 'http://localhost:5000' in the url down below, because
	 * we have set proxy value in package.json to 'http://localhost:5000'.
	 * We set the state of the errors object to the new error object that we receive from err.response.data
	 * If on successful registration, inside then(), history.push( '/login' ) will redirect the user to the login page.
	 */
	axios.post( '/api/users/register', userData )
		.then( ( result ) => history.push( '/login' ) )
		.catch( ( err ) => dispatch( {
			type: GET_ERRORS,
			payload: err.response.data
		} ) );
};

// Login - Get User Token. This is loginUser() Action
export const loginUser = ( userData ) => dispatch => {

	axios.post( '/api/users/login', userData )
		.then( ( result ) => {
			/**
			 * Once you get the response , save the data received from result.data to localStorage
			 * We are using object destructuring here, below code is equivalent to const token = result.data.token
			 */
			const { token } = result.data;

			// Store token in localStorage
			localStorage.setItem( 'jwtToken', token );

			// Set token to Auth Header using a custom function setAuthToken
			setAuthToken( token );

			// Use jwt-decode to decode the auth token and get the user data from it( install jwt-decode in clients dir )
			const decoded = jwt_decode( token );

			// Set current user
			dispatch( setCurrentUser( decoded ) );
		} )
		.catch( ( err ) => dispatch( {
			type: GET_ERRORS,
			payload: err.response.data
		} ) );
};

// Set logged in user
export const setCurrentUser = ( decoded ) => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	}
};

// Log User Out
export const logoutUser = () => dispatch => {
	// Remove token from localStorage
	localStorage.removeItem( 'jwtToken' );

	// When we pass the token value as false, setAuthToken() removes the Authorization token from the header of http request because user is logged out,
	setAuthToken( false );

	// Set the current user to an empty object, which will set the isAuthenticated state of redux store to false.
	dispatch( setCurrentUser( {} ) );
};

// Update user as a vendor
export const makeUserAVendorRequest = ( id, userData  ) => dispatch => {
	axios
		.post(`/api/users/makeVendor/${id}`, userData)
		.then( res => dispatch({
				type: SET_CURRENT_USER,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// Update user as a vendor
export const getCurrentUser = ( auth  ) => dispatch => {
	axios
		.get('/api/users/current')
		.then( res => dispatch({
				type: SET_CURRENT_USER,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};
