import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import postReducer from './postReducer';
import categoryReducer from './categoryReducer';
import bidReducer from './bidReducer';
import paymentReducer from './paymentReducer'
import offerReducer from "./offerReducer";

export default combineReducers({
	auth: authReducer,
	errors: errorReducer,
	profile: profileReducer,
	post: postReducer,
	category: categoryReducer,
	bid: bidReducer,
	payment: paymentReducer,
	offer: offerReducer
});