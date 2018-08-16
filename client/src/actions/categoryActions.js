import axios from 'axios';

import {
	ADD_CATEGORY,
	GET_ERRORS,
	CLEAR_CATEGORY_ERRORS,
	GET_CATEGORIES,
	GET_CATEGORY,
	CATEGORY_LOADING,
	DELETE_CATEGORY
} from './types';

// Add Category
export const addCategory = ( categoryData, history ) => dispatch => {
	dispatch(clearErrors());
	axios
		.post('/api/categories', categoryData)
		.then(res =>
			history.push( '/list-categories' )
		)
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// Add Category
export const updateCategory = ( postData, id, history ) => dispatch => {
	dispatch(clearErrors());
	axios
		.post( `/api/categories/update/${id}`, postData )
		.then(res =>
			// dispatch({
			// 	type: ADD_CATEGORY,
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

// Get Categorys
export const getCategoryies = () => dispatch => {
	dispatch(setCategoryLoading());
	axios
		.get('/api/categories')
		.then(res =>
			dispatch({
				type: GET_CATEGORIES,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_CATEGORIES,
				payload: null
			})
		);
};

// Get Category
export const getCategory = id => dispatch => {
	dispatch(setCategoryLoading());
	axios
		.get(`/api/categories/${id}`)
		.then(res =>
			dispatch({
				type: GET_CATEGORY,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_CATEGORY,
				payload: null
			})
		);
};

// Delete Category
export const deleteCategory = id => dispatch => {
	axios
		.delete(`/api/categories/${id}`)
		.then(res =>
			dispatch({
				type: DELETE_CATEGORY,
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
export const setCategoryLoading = () => {
	return {
		type: CATEGORY_LOADING
	};
};

// Clear errors
export const clearErrors = () => {
	return {
		type: CLEAR_CATEGORY_ERRORS
	};
};