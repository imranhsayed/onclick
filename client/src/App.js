import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './actions/authActions';
import Home from "./components/Home";
import Login from './components/Login';
import { Provider } from 'react-redux';
import { logoutUser } from "./actions/authActions";
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';

import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import DashboardProfiles from './components/layouts/dashboard/pages/DashboardProfiles';
import DashboardUserProfiles from "./components/layouts/dashboard/pages/DashboardUserProfiles";
import Categories from "./components/Categories";
import ProfileListings from "./components/ProfileListings";
import SingleProfile from "./components/SingleProfile";
import DashboardUploads from './components/DashboardUploads';
import Posts from './components/Posts';
import {clearCurrentProfile} from "./actions/profileActions";
import DashboardPostsListing from "./components/DashboardPostsListing";
import PostJobListings from "./components/PostJobListings";
import DashboardSinglePost from "./components/DashboardSinglePost";
import DashboardAddCategory from './components/layouts/categories/DashboardAddCategory';
import PostSingle from "./components/PostSingle";
import DashboardListCategories from "./components/DashboardListCategories";
import BuyBid from "./components/bid/BuyBid";
import PaymentComplete from "./components/PaymentComplete";

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
		store.dispatch( clearCurrentProfile() );

		// Todo: Clear Current profile and redirect to login
		// store.dispatch( clearCurrentProfile() );

		// Redirects the user to login page when the token is expired and the user logs out.
		window.location.href = '/login';
	}
}


class App extends Component {
  render() {
    return (
    	// Provide provides the store to its child components inside of it.
    	<Provider store={ store }>
			<Router>
				<div className="App">
					<Route exact path="/" component={Home}/>
					<Route exact path="/login" component={Login} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/categories" component={Categories} />
					<Switch><PrivateRoute exact path="/dashboard" component={Dashboard} /></Switch>
					<Route exact path="/profile/:handle" component={SingleProfile} />
					<Route exact path="/listings" component={ProfileListings} />
					<Route exact path="/payment-complete" component={PaymentComplete} />
					{/* Dashboard Routes */}
					<Switch><PrivateRoute exact path="/create-profile" component={DashboardProfiles} /></Switch>
					<Switch><PrivateRoute exact path="/post-job" component={Posts} /></Switch>
					<Switch><PrivateRoute exact path="/post-job-listings" component={DashboardPostsListing} /></Switch>
					<Switch><PrivateRoute exact path="/dashboard-post/:id" component={DashboardSinglePost} /></Switch>
					<Switch><PrivateRoute exact path="/add-category" component={DashboardAddCategory} /></Switch>
					<Switch><PrivateRoute exact path="/list-categories" component={DashboardListCategories} /></Switch>

					{/*Front End*/}
					<Switch><PrivateRoute exact path="/buy-bid" component={BuyBid} /></Switch>
					<Route exact path="/job-listings" component={PostJobListings}/>
					<Route exact path="/category-job-listing/:type/:name/:id" component={PostJobListings}/>
					<Route exact path="/single-post/:id" component={PostSingle}/>
					<Route exact path="/uploads" component={DashboardUploads}/>
					<Route exact path="/dash-profiles" component={DashboardUserProfiles}/>
				</div>
			</Router>
	    </Provider>
    );
  }
}



export default App;
