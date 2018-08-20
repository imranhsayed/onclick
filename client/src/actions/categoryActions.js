import axios from 'axios';

import {
	ADD_CATEGORY,
	GET_ERRORS,
	CLEAR_CATEGORY_ERRORS,
	GET_CATEGORIES,
	GET_PARENT_CATS,
	GET_SUB_CATS,
	GET_SUB_CATS_LVL2,
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
		.catch(err => console.log( err )
			// dispatch({
			// 	type: GET_ERRORS,
			// 	payload: err.response.data
			// })
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

// Get Categories
export const getCategories = () => dispatch => {
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

// Get all parent Categories.
export const getParentCats = () => dispatch => {
	dispatch(setCategoryLoading());
	axios
		.get('/api/categories/parentCats')
		.then(res =>
			dispatch({
				type: GET_PARENT_CATS,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_PARENT_CATS,
				payload: null
			})
		);
};

// Get all Sub Categories for a given parentCatId.
export const getSubCats = ( id ) => dispatch => {
	dispatch(setCategoryLoading());
	axios
		.get( `api/categories/subCats/${id}` )
		.then(res =>
			dispatch({
				type: GET_SUB_CATS,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_SUB_CATS,
				payload: null
			})
		);
};

// Get all Sub Categories Lvl2 for a given parentCatId.
export const getSubCatsLvl2 = ( id ) => dispatch => {
	dispatch(setCategoryLoading());
	axios
		.get( `api/categories/subCatsLvlTwo/${id}` )
		.then(res =>
			dispatch({
				type: GET_SUB_CATS_LVL2,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_SUB_CATS_LVL2,
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
export const deleteCategory = ( id, history ) => dispatch => {
	axios
		.delete(`/api/categories/${id}`)
		.then(res =>
			dispatch({
				type: DELETE_CATEGORY,
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