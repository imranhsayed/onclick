import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './actions/authActions';
import Home from "./components/Home";
import Login from './components/Login';
import { Provider } from 'react-redux';
import { logoutUser } from "./actions/authActions";
import store from './store';

import Register from "./components/Register";
import PostJob from "./components/PostJob";
import Dashboard from "./components/Dashboard";
import DashboardProfiles from './components/layouts/dashboard/pages/DashboardProfiles';

/**
 * To ensure the authenticate state stays true even on page reload, we do the following:
 * Check if the auth token exists in localStorage('jwtToken') , If it does mean user is logged in
 */
if ( localStorage.jwtToken ) {
	/**
	 * Set Auth token header Authorization, setAuthToken is define in utils/setAuthToken,
	 * which provides the auth token stored in local storage to the header of http request.
	 */
	setAuthToken( localStorage.jwtToken );

	// Decode the token( localStorage.jwtToken ) and get user info and exp
	const decoded = jwt_decode( localStorage.jwtToken );

	/**
	 * Set user and isAuthenticated values in the redux store, using setCurrentUser() defined in
	 * authActions.js, which takes the decoded value of the token.
	 */
	store.dispatch( setCurrentUser( decoded ) );

	/**
	 * Check if the token is expired
	 * decoded.exp contains the expiration timestamp of the token.
	 * So if the expiration time is less than the current time
	 * decoded.exp
	 * @type {number}
	 */
	const currentTime = Date.now() / 1000;
	if ( decoded.exp < currentTime ) {
		store.dispatch( logoutUser() );

		// Todo: Clear Current profile and redirect to login
		// store.dispatch( clearCurrentProfile() );

		// Redirects the user to login page when the token is expired and the user logs out.
		window.location.href = '/login';
	}
}


class App extends Component {
  render() {
    return (
    	<Provider store={ store }>
			<Router>
				<div className="App">
					<Route exact path="/" component={Home}/>
					<Route exact path="/login" component={Login} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/post-job" component={PostJob} />
					<Route exact path="/dashboard" component={Dashboard} />
					{/*Dashboard Routes*/}
					<Route exact path="/dash-profile" component={DashboardProfiles}/>
				</div>
			</Router>
	    </Provider>
    );
  }
}



export default App;
