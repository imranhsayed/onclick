import {
	ADD_POST,
	GET_POSTS,
	GET_POST,
	DELETE_POST,
	POST_LOADING,
	GET_POSTS_COUNT,
	GET_COMPLETED_POST_COUNT
} from '../actions/types';

const initialState = {
	posts: [],
	post: {},
	postCount: null,
	completedPostCount: null,
	loading: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case POST_LOADING:
			return {
				...state,
				loading: true
			};
		case GET_POSTS:
			return {
				...state,
				posts: action.payload,
				loading: false
			};
		case GET_POSTS_COUNT:
			return {
				...state,
				postCount: action.payload,
				loading: false
			};
		case GET_COMPLETED_POST_COUNT:
			return {
				...state,
				completedPostCount: action.payload,
				loading: false
			};
		case GET_POST:
			return {
				...state,
				post: action.payload,
				loading: false
			};
		case ADD_POST:
			return {
				...state,
				posts: [action.payload, ...state.posts]
			};
		case DELETE_POST:
			return {
				...state,
				posts: state.posts.filter(post => post._id !== action.payload)
			};
		default:
			return state;
	}
}
