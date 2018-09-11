import { OFFER_LOADING, GET_OFFERS, GET_OFFER, ADD_OFFER, DELETE_OFFER, CLEAR_OFFER_ERRORS } from "../actions/types";

const initialState = {
	offers: [],
	offer: {},
	loading: false
};

export default function( state = initialState, action ) {
	switch ( action.type ) {
		case OFFER_LOADING:
			return {
				...state,
				loading: true
			};
		case GET_OFFERS:
			return {
				...state,
				offers: action.payload,
				loading: false
			};
		case GET_OFFER:
			return {
				...state,
				offer: action.payload,
				loading: false
			};
		case ADD_OFFER:
			return {
				...state,
				offer: [action.payload, ...state.offer]
			};
		case DELETE_OFFER:
			return {
				...state,
				offer: state.offer.filter(offer => offer._id !== action.payload)
			};
		default:
			return state;
	}
}
