import {ADD_BID, DELETE_BID, GET_BIDS, GET_BID, BID_LOADING } from "../actions/types";

const initialState = {
	bids: [],
	bid: {},
	loading: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case BID_LOADING:
			return {
				...state,
				loading: true
			};
		case GET_BIDS:
			return {
				...state,
				bids: action.payload,
				loading: false
			};
		case GET_BID:
			return {
				...state,
				bid: action.payload,
				loading: false
			};
		case ADD_BID:
			return {
				...state,
				bid: [action.payload, ...state.bid]
			};
		case DELETE_BID:
			return {
				...state,
				bid: state.bid.filter(bid => bid._id !== action.payload)
			};
		default:
			return state;
	}
}
