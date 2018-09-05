import { SET_CURRENT_USER, GET_VENDOR_COUNT, GET_USER_COUNT } from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {
	isAuthenticated: false,
	user: {},
	vendorCount: null,
	userCount: null
};

export default function ( state = initialState, action ) {
	/**
	 * If action.payload is filled with the user, that mean we should be authenticated.
	 * So the value of isAuthenticated will be true is action.payload has the value, false otherwise.
	 * isEmpty() is our custom function defined in validation/isEmpty.js
	 */
	switch ( action.type ) {
		case SET_CURRENT_USER:
			return {
				...state,
				isAuthenticated: ! isEmpty( action.payload ),
				user: action.payload
			};
		case GET_VENDOR_COUNT:
			return {
				...state,
				vendorCount: action.payload
			};
		case GET_USER_COUNT:
			return {
				...state,
				userCount: action.payload
			};
		default: return state;
	}
}