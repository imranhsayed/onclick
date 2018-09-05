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


// Get a Single Bid by its id
// export const getBid = id => dispatch => {
// 	dispatch(setBidLoading());
// 	axios
// 		.get(`/api/bid/${id}`)
// 		.then(res =>
// 			dispatch({
// 				type: GET_BID,
// 				payload: res.data
// 			})
// 		)
// 		.catch(err =>
// 			dispatch({
// 				type: GET_BID,
// 				payload: null
// 			})
// 		);
// };

// Get All Bid of a particular user by his user id
export const getAllBidByUserId = id => dispatch => {
	dispatch(setBidLoading());
	axios
		.get(`/api/bid/${id}`)
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

// Get All accepted Bid of a particular user by his user id
export const getAcceptedBidsByUserId = ( userData ) => dispatch => {
	dispatch(setBidLoading());
	axios
		.post('/api/bid/acceptedBidsByUserId', userData )
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

export const getAllBidByPostId= ( postId, userId ) => dispatch => {
	dispatch(setBidLoading());
	axios
		.get(`/api/bid/${postId}/${userId}`)
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

export const getAllAcceptedBids= () => dispatch => {
	dispatch(setBidLoading());
	axios
		.get('/api/bid/acceptedbids')
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

export const updateBidAsAccepted= ( bid ) => dispatch => {
	axios
		.post( '/api/bid/acceptBid', bid )
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