import axios from 'axios';
import {
	GET_PROFILE, GET_ERRORS, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, SET_CURRENT_USER, GET_PROFILES,
	GET_POSTS
} from "./types";

// Get the Current Profile
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

// Get single Profile by the handle name
export const getProfileByHandle = ( handle ) => ( dispatch ) => {
	dispatch( setProfileLoading() );
	axios.get( `/api/profile/handle/${ handle }` )
		.then( ( res ) => dispatch({
			type: GET_PROFILE,
			payload: res.data
		}) )
		.catch( ( err ) => dispatch({
			type: GET_PROFILE,
			payload: null
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

// Create a Profile
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



// Delete a Profile
export const deleteAccount = () => ( dispatch ) => {
	if ( window.confirm( 'Are you sure you want to delete your account. This cannot be undone!' ) ) {
	    axios.delete( '/api/profile' )
		    .then( ( res ) => dispatch({
			    type: SET_CURRENT_USER,
			    payload: {}
		    }) )
		    .catch( ( error ) => dispatch({
			    type: GET_ERRORS,
			    payload: error.response.data
		    }) );
	}
};

// Get all Profiles
export const getProfiles = () => ( dispatch ) => {
	dispatch( setProfileLoading() );
	axios.get( '/api/profile/all' )
		.then( ( res ) => dispatch({
			type: GET_PROFILES,
			payload: res.data
		}) )
		.catch( ( error ) => {
			dispatch({
				type: GET_PROFILES,
				payload: {}
			})

		} );
};

