import axios from 'axios';

import {
	ADD_BID,
	GET_ERRORS,
	CLEAR_BID_ERRORS,
	GET_BIDS,
	GET_BID,
	BID_LOADING,
	DELETE_BID
} from './types';

// Add Bid
export const addBid = ( bidData, history ) => dispatch => {
	dispatch(clearErrors());
	axios
		.post('/api/bid', bidData)
		.then(res =>
			console.log( res.data )
			// history.push( '/list-categories' )
		)
		.catch(err => console.log( err )
			// dispatch({
			// 	type: GET_ERRORS,
			// 	payload: err.response.data
			// })
		);
};

// Update Bid
// export const updateBid = ( postData, id, history ) => dispatch => {
// 	dispatch(clearErrors());
// 	axios
// 		.post( `/api/categories/update/${id}`, postData )
// 		.then(res =>
// 			// dispatch({
// 			// 	type: ADD_BID,
// 			// 	payload: res.data
// 			// })
// 			history.push( '/post-job-listings' )
// 		)
// 		.catch(err => console.log( 'error in updating' )
// 			// dispatch({
// 			// 	type: GET_ERRORS,
// 			// 	payload: err.response.data
// 			// })
// 		);
// };

// Get All Bids
export const getBids = () => dispatch => {
	dispatch(setBidLoading());
	axios
		.get('/api/bids')
		.then(res =>
			dispatch({
				type: GET_BIDS,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_BIDS,
				payload: null
			})
		);
};


// Get Bid
export const getBid = id => dispatch => {
	dispatch(setBidLoading());
	axios
		.get(`/api/bid/${id}`)
		.then(res =>
			dispatch({
				type: GET_BID,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_BID,
				payload: null
			})
		);
};

// Delete Bid
export const deleteBid = ( id, history ) => dispatch => {
	axios
		.delete(`/api/bid/${id}`)
		.then(res =>
			dispatch({
				type: DELETE_BID,
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
export const setBidLoading = () => {
	return {
		type: BID_LOADING
	};
};

// Clear errors
export const clearErrors = () => {
	return {
		type: CLEAR_BID_ERRORS
	};
};