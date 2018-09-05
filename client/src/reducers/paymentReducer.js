import {ADD_PAYMENT, DELETE_PAYMENT, GET_PAYMENT, GET_PAYMENTS, PAYMENT_LOADING } from "../actions/types";

const initialState = {
	payments: [],
	payment: {},
	loading: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case PAYMENT_LOADING:
			return {
				...state,
				loading: true
			};
		case GET_PAYMENTS:
			return {
				...state,
				payments: action.payload,
				loading: false
			};
		case GET_PAYMENT:
			return {
				...state,
				payment: action.payload,
				loading: false
			};
		case ADD_PAYMENT:
			return {
				...state,
				payment: [action.payload, ...state.payment]
			};
		case DELETE_PAYMENT:
			return {
				...state,
				payment: state.payment.filter(payment => payment._id !== action.payload)
			};
		default:
			return state;
	}
}
