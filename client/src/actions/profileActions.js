import axios from 'axios';
import { GET_PROFILE, GET_ERRORS, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from "./types";

// Get Current Profile
export const getCurrentProfile = () => ( dispatch ) => {
	dispatch( setProfileLoading() );
	axios.get( '/api/profile' )
		.then( ( res ) => dispatch({
			type: GET_PROFILE,
			payload: res.data
		}) )
		.catch( ( err ) => dispatch({
			type: GET_PROFILE,
			payload: {}
		}) )
};

// Profile Loading
export const setProfileLoading = () => {
	return {
		type: PROFILE_LOADING
	}
};

// Clear Current Profile
export const clearCurrentProfile = () => {
	return {
		type: CLEAR_CURRENT_PROFILE
	}
};

// Create Profile
export const createProfile = ( profileData, history ) => ( dispatch ) => {
	axios.post( '/api/profile', profileData )
		.then( res => {
			console.log( res );
			if ( 200 === res.status ) {
				this.setState({
					errors: {}
				});
				}
				history.push( '/dashboard' );
		} )
		.catch( ( error ) => {
			dispatch({
				type: GET_ERRORS,
				payload: error.response.data
			})

		} );
};