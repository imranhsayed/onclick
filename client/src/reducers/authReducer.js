import { SET_CURRENT_USER } from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {
	isAuthenticated: false,
	user: {}
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
		default: return state;
	}
}