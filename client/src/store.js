import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};
const middleware = [thunk];

/**
 * ... is a spread operator
 * window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
 * sets up developer tools extensions on chrome browser( like Action, State, Diff tabs )
 *
 * @todo REPLACE compose( applyMiddleware( ...middleware ), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() ) WITH applyMiddleware( ...middleware )  and remove compose import for PRODUCTION
 */
const store = createStore(
    rootReducer,
    initialState,
	compose( applyMiddleware( ...middleware ), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() )
);

export default store;