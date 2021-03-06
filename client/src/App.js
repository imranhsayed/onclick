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
import DashboardShowUserBids from "./components/layouts/dashboard/DashboardShowUserBids";
import BidsByPost from "./components/layouts/dashboard/BidsByPost";
import BiddersProfile from "./components/layouts/dashboard/BiddersProfile";
import DashboardAcceptedBids from "./components/DashboardAcceptedBids";
import DashboardAdminSinglePost from "./components/DashboardAdminSinglePost";
import DashboardVendorAcceptedBids from "./components/DashboardVendorAcceptedBids";
import ThankJobPaymentByVendor from "./components/ThankJobPaymentByVendor";
import BidPackagePayments from "./components/layouts/dashboard/pages/BidPackagePayments";
import VendorJobPayments from "./components/layouts/dashboard/pages/VendorJobPayments";
import PostFileUploads from "./components/PostFileUploads";
import PostGalleryUploads from "./components/PostGalleryUploads";
import ProfileImageUpload from "./components/layouts/profile/ProfileImageUpload";
import ProfileBusinessImageUpload from "./components/layouts/profile/ProfileBusinessImageUpload";
import ProfileBusinessGalleryUpload from "./components/layouts/profile/ProfileBusinessGalleryUploads";
import AddOffer from "./components/offer/AddOffer";
import OfferImageUpload from "./components/offer/OfferImageUpload";
import DashboardOfferListings from "./components/offer/DashboardOfferListings";
import OfferListings from "./components/offer/OfferListings";
import ContactUs from './components/layouts/contact-us/ContactUs';


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
					<Switch><PrivateRoute exact path="/user-bids" component={DashboardShowUserBids} /></Switch>
					<Switch><PrivateRoute exact path="/view-post-bids/:postId" component={BidsByPost} /></Switch>
					<Switch><PrivateRoute exact path="/bidders-profile/:bidderUserId" component={BiddersProfile} /></Switch>
					<Switch><PrivateRoute exact path="/all-accepted-bids" component={DashboardAcceptedBids} /></Switch>
					<Switch><PrivateRoute exact path="/dashboard-single-post/:postId" component={DashboardAdminSinglePost} /></Switch>
					<Switch><PrivateRoute exact path="/vendor-accepted-bids" component={DashboardVendorAcceptedBids} /></Switch>
					<Switch><PrivateRoute exact path="/thankyou-vendor-job-payment" component={ThankJobPaymentByVendor} /></Switch>
					<Switch><PrivateRoute exact path="/bid-package-payments" component={BidPackagePayments} /></Switch>
					<Switch><PrivateRoute exact path="/vendor-job-payments" component={VendorJobPayments} /></Switch>
					<Switch><PrivateRoute exact path="/profile-image-upload/:profileid" component={ProfileImageUpload} /></Switch>
					<Switch><PrivateRoute exact path="/business-image-upload/:profileid" component={ProfileBusinessImageUpload} /></Switch>
					<Switch><PrivateRoute exact path="/business-gallery-uploads/:profileid" component={ProfileBusinessGalleryUpload} /></Switch>
					<Switch><PrivateRoute exact path="/post-image-uploads/:postid" component={PostFileUploads} /></Switch>
					<Switch><PrivateRoute exact path="/post-gallery-uploads/:postid" component={PostGalleryUploads} /></Switch>
					<Switch><PrivateRoute exact path="/add-offer" component={AddOffer} /></Switch>
					<Switch><PrivateRoute exact path="/add-offer-image/:offerid" component={OfferImageUpload} /></Switch>
					<Switch><PrivateRoute exact path="/dashboard-user-offer-listing" component={DashboardOfferListings} /></Switch>
					{/*Front End*/}
					<Switch><PrivateRoute exact path="/buy-bid" component={BuyBid} /></Switch>
					<Route exact path="/job-listings" component={PostJobListings}/>
					<Route exact path="/category-job-listing/:catid" component={PostJobListings}/>
					<Route exact path="/category-business-listing/:catid" component={ProfileListings}/>
					<Route exact path="/single-post/:id" component={PostSingle}/>
					<Route exact path="/uploads" component={DashboardUploads}/>
					<Route exact path="/dash-profiles" component={DashboardUserProfiles}/>
					<Route exact path="/offer-listings" component={OfferListings}/>
					<Route exact path="/contact-us" component={ContactUs}/>
				</div>
			</Router>
	    </Provider>
    );
  }
}



export default App;
