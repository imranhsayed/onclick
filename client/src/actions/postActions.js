import axios from 'axios';

import {
	ADD_POST,
	GET_ERRORS,
	CLEAR_ERRORS,
	GET_POSTS,
	GET_POST,
	POST_LOADING,
	DELETE_POST
} from './types';

// Add Post
export const addPost = postData => dispatch => {
	dispatch(clearErrors());
	axios
		.post('/api/posts', postData)
		.then(res =>
			dispatch({
				type: ADD_POST,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// Add Post
export const updatePost = ( postData, id, history ) => dispatch => {
	dispatch(clearErrors());
	axios
		.post( `/api/posts/update/${id}`, postData )
		.then(res =>
			// dispatch({
			// 	type: ADD_POST,
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

// Get Posts
export const getPosts = () => dispatch => {
	dispatch(setPostLoading());
	axios
		.get('/api/posts')
		.then(res =>
			dispatch({
				type: GET_POSTS,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_POSTS,
				payload: null
			})
		);
};

// Get Post
export const getPost = id => dispatch => {
	dispatch(setPostLoading());
	axios
		.get(`/api/posts/${id}`)
		.then(res =>
			dispatch({
				type: GET_POST,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_POST,
				payload: null
			})
		);
};

// Get Post by CategoryId
export const getPostByCategoryId = id => dispatch => {
	dispatch(setPostLoading());
	axios
		.get(`/api/posts/categoryId/${id}`)
		.then(res =>
			dispatch({
				type: GET_POSTS,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_POSTS,
				payload: null
			})
		);
};

// Get Post by subCategoryId
export const getPostBySubCategoryId = id => dispatch => {
	dispatch(setPostLoading());
	axios
		.get(`/api/posts/subCategoryId/${id}`)
		.then(res =>
			dispatch({
				type: GET_POSTS,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_POSTS,
				payload: null
			})
		);
};

// Get Post by subCatLevel2Id
export const getPostBySubCatLevel2Id = id => dispatch => {
	dispatch(setPostLoading());
	axios
		.get(`/api/posts/subCatLevel2Id/${id}`)
		.then(res =>
			dispatch({
				type: GET_POSTS,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_POSTS,
				payload: null
			})
		);
};

// Add Bid
export const addBid = ( bidData, history ) => dispatch => {
	dispatch(clearErrors());
	axios
		.post('/api/bid', bidData)
		.then(res =>
			dispatch({
				type: GET_POST,
				payload: res.data
			})
		)
		.catch(err => console.log( err )
			// dispatch({
			// 	type: GET_ERRORS,
			// 	payload: err.response.data
			// })
		);
};

// Delete Post
export const deletePost = id => dispatch => {
	axios
		.delete(`/api/posts/${id}`)
		.then(res =>
			dispatch({
				type: DELETE_POST,
				payload: id
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// Set loading state
export const setPostLoading = () => {
	return {
		type: POST_LOADING
	};
};

// Clear errors
export const clearErrors = () => {
	return {
		type: CLEAR_ERRORS
	};
};
