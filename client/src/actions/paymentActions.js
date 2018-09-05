import axios from 'axios';

import {
	ADD_PAYMENT,
	GET_ERRORS,
	CLEAR_PAYMENT_ERRORS,
	GET_PAYMENTS,
	GET_PAYMENT,
	PAYMENT_LOADING,
	DELETE_PAYMENT
} from './types';

// Add Payment
export const addPayment = ( paymentData, history ) => dispatch => {
	dispatch(clearErrors());
	axios
		.post('/api/payments', paymentData)
		.then(res =>
			history.push( '/list-payments' )
		)
		.catch(err => console.log( err )
			// dispatch({
			// 	type: GET_ERRORS,
			// 	payload: err.response.data
			// })
		);
};

// Add Payment
export const updatePayment = ( postData, id, history ) => dispatch => {
	dispatch(clearErrors());
	axios
		.post( `/api/payments/update/${id}`, postData )
		.then(res =>
			// dispatch({
			// 	type: ADD_PAYMENT,
			// 	payload: res.data
			// })
			history.push( '/post-job-listings' )
		)
		.catch(err => console.log( 'error in updating' )
			// dispatch({
			// 	type: GET_ERRORS,
			// 	payload: err.response.data
			// })
		);
};

// Get Payments made to buy the bid package
export const getBidPackagePayments = () => dispatch => {
	dispatch(setPaymentLoading());

	axios
		.get('/api/payments/bidPayments')
		.then(res =>
			dispatch({
				type: GET_PAYMENTS,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_PAYMENTS,
				payload: null
			})
		);
};

// Get Payments made by the vendor for the job when they accept a bid on it.
export const getVendorJobPayments = () => dispatch => {
	dispatch(setPaymentLoading());

	axios
		.get('/api/payments/vendorJobPayments')
		.then(res =>
			dispatch({
				type: GET_PAYMENTS,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_PAYMENTS,
				payload: null
			})
		);
};

// Get Payment
export const getPayment = id => dispatch => {
	dispatch(setPaymentLoading());
	axios
		.get(`/api/payments/${id}`)
		.then(res =>
			dispatch({
				type: GET_PAYMENT,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_PAYMENT,
				payload: null
			})
		);
};

// Delete Payment
export const deletePayment = ( id, history ) => dispatch => {
	axios
		.delete(`/api/payments/${id}`)
		.then(res =>
			dispatch({
				type: DELETE_PAYMENT,
				payload: id
			})
		)
		.catch(err => console.log( 'error' )
			// dispatch({
			// 	type: GET_ERRORS,
			// 	payload: err.response.data
			// })
		);
};

// Set loading state
export const setPaymentLoading = () => {
	return {
		type: PAYMENT_LOADING
	};
};

// Clear errors
export const clearErrors = () => {
	return {
		type: CLEAR_PAYMENT_ERRORS
	};
};