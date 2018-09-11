import axios from 'axios';

import {
	OFFER_LOADING,
	GET_OFFERS,
	GET_OFFER,
	ADD_OFFER,
	DELETE_OFFER,
	CLEAR_OFFER_ERRORS, GET_ERRORS, ADD_POST
} from './types';


// Add Payment
export const addOffer = ( offerData ) => dispatch => {
	dispatch( clearErrors() );
	axios
		.post('/api/offer', offerData)
		.then( res => {
				dispatch({
					type: ADD_OFFER,
					payload: res.data
				});
				console.log( 'res', res.data._id );
				window.location.href = `/add-offer-image/${ res.data._id }?offer_id=${ res.data._id }`
			}
		)
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};


// Get All Bids
export const getBids = () => dispatch => {
	dispatch(setBidLoading());
	axios
		.get('/api/bids')
		.then(res =>
			dispatch({
				type: GET_OFFERS,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_OFFERS,
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
// 				type: GET_OFFER,
// 				payload: res.data
// 			})
// 		)
// 		.catch(err =>
// 			dispatch({
// 				type: GET_OFFER,
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
				type: GET_OFFERS,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_OFFERS,
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
				type: GET_OFFERS,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_OFFERS,
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
				type: GET_OFFERS,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_OFFERS,
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
				type: GET_OFFERS,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_OFFERS,
				payload: null
			})
		);
};

export const updateBidAsAccepted= ( bid ) => dispatch => {
	axios
		.post( '/api/bid/acceptBid', bid )
		.then(res =>
			dispatch({
				type: GET_OFFER,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_OFFER,
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
				type: DELETE_OFFER,
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
		type: OFFER_LOADING
	};
};

// Clear errors
export const clearErrors = () => {
	return {
		type: CLEAR_OFFER_ERRORS
	};
};