import {ADD_CATEGORY, DELETE_CATEGORY, GET_CATEGORY, GET_CATEGORIES, CATEGORY_LOADING,
	GET_PARENT_CATS, GET_SUB_CATS, GET_SUB_CATS_LVL2 } from "../actions/types";

const initialState = {
	categories: [],
	parentCats: [],
	subCats: [],
	subCatsLvl2: [],
	category: {},
	loading: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case CATEGORY_LOADING:
			return {
				...state,
				loading: true
			};
		case GET_CATEGORIES:
			return {
				...state,
				categories: action.payload,
				loading: false
			};
		case GET_PARENT_CATS:
			return {
				...state,
				parentCats: action.payload,
				loading: false
			};
		case GET_SUB_CATS:
			return {
				...state,
				subCats: action.payload,
				loading: false
			};
		case GET_SUB_CATS_LVL2:
			return {
				...state,
				subCatsLvl2: action.payload,
				loading: false
			};
		case GET_CATEGORY:
			return {
				...state,
				category: action.payload,
				loading: false
			};
		case ADD_CATEGORY:
			return {
				...state,
				category: [action.payload, ...state.category]
			};
		case DELETE_CATEGORY:
			return {
				...state,
				category: state.category.filter(category => category._id !== action.payload)
			};
		default:
			return state;
	}
}
