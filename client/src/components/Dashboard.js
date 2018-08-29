import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DashboardNav from "./layouts/dashboard/DashboardNav";
import DashboardSidebar from "./layouts/dashboard/DashboardSidebar";
import DashboardHome from "./layouts/dashboard/DashboardHome";
import ProfileActions from './layouts/dashboard/ProfileActions';
import { logoutUser } from "./../actions/authActions";
import { getCurrentProfile } from "../actions/profileActions";
import { deleteAccount } from "../actions/profileActions";
import { makeUserAVendorRequest } from "../actions/authActions";
import $ from "jquery";

class Dashboard extends Component {

	componentDidMount() {

		this.props.getCurrentProfile();

		// If the user is not logged in
		if ( ! this.props.auth.isAuthenticated ) {
			// redirect the user to the homepage
			this.props.history.push( '/login' );
		}
	}

	onDeleteClick() {
		this.props.deleteAccount()
	}

	makeUserAVendor( userId ) {
		const { user } = this.props.auth;
		this.props.makeUserAVendorRequest( userId, user );
		this.ocShowAlert( 'Congratulations!! you are a vendor now', '#3089cf' );
	}

	// showAlert Function
	ocShowAlert = ( message, background = '#3089cf' ) => {
		let alertContainer = document.querySelector( '#oc-alert-container' ),
			alertEl = document.createElement( 'div' ),
			textNode = document.createTextNode( message );
		alertEl.setAttribute( 'class', 'oc-alert-pop-up' );
		$( alertEl ).css( 'background', background );
		alertEl.appendChild( textNode );
		alertContainer.appendChild( alertEl );
		setTimeout( function () {
			$( alertEl ).fadeOut( 'slow' );
			$( alertEl ).remove();
		}, 3000 );
	};

	render(){
		const { user } = this.props.auth;
		const { profile, loading } = this.props.profile;

		let dashboardContent;

		if ( profile === null || loading ) {
		    dashboardContent = <img src="./../img/spinner.gif" style={{ width: '200px', margin: 'auto', display: 'block' }}/>;
		} else {

			// Check if logged in user has profile ( Check if the profile object is not empty )
			if ( Object.keys( profile ) .length ) {

			    // Profile is present
				dashboardContent = (
					<div className="container">
						<p className="lead text-muted">Welcome
							<Link to="{`/profile/$profile.handle`}"> { user.name }! </Link>
							{ 'vendor' === user.type && <span>(Vendor)</span> }
						</p>
						<div className="row">
							<ProfileActions/>
							<div className="col-md-4">
								<div className="card bg-light mb-3" style={{ maxWidth: '20rem' }}>
									<div className="card-header text-center">Delete Profile</div>
									<div className="card-body text-center">
										<button onClick={ this.onDeleteClick.bind( this ) } className="btn btn-gradient-danger btn-fw">Delete Profile</button>
									</div>
								</div>
							</div>
							{ 'user' === user.type && (
								<div className="jumbotron mt-5">
									<h1 className="display-3">Become a Vendor</h1>
									<p className="lead">Why become a vendor?</p>
									<hr className="my-4"/>
									<p>Unlike, traditional distributor-vendor relationships, our partnership won’t be a one-sided affair. Becoming a vendor will give you an opportunity to compete with larger businesses and express your work to customers who are in need of it. You can also bid on multiple jobs posted by different customers and get huge number of projects to work with. So Why wait? Get registered now</p>
									<p className="lead">
										<button className="btn btn-primary btn-lg" onClick={ this.makeUserAVendor.bind( this, user.id ) } role="button">Register as Vendor</button>
									</p>
								</div>
							)}
						</div>
					</div>
				);
			} else {

				// Profile is not created
				dashboardContent = (
					<div className="container">
						<p className="lead text-muted">Welcome { user.name }!</p>
						<p className="">You have not yet set up a profile, please create your profile</p>
						<Link className="btn btn-lg btn-info" to="/create-profile">Create Profile</Link><br/><br/>
						<Link className="btn btn-lg btn-info" to="/job-listings">Job Listings</Link>
						{ 'user' === user.type && (
							<div className="jumbotron mt-5">
								<h1 className="display-3">Become a Vendor</h1>
								<p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
								<hr className="my-4"/>
								<p>It uses utility class es for typography and spacing to space content out within the larger container.</p>
								<p className="lead">
									<button className="btn btn-primary btn-lg" onClick={ this.makeUserAVendor.bind( this, user.id ) } role="button">Register as Vendor</button>
								</p>
							</div>
						)}
					</div>
				);

			}
		}


		return(
			<div className="container-scroller">
				<DashboardNav/>
				<div className="container-fluid page-body-wrapper">
					<DashboardSidebar/>
					<div id="oc-alert-container"></div>
						{/*If its user then show dashboard content*/}
						{('user' === user.type || 'vendor' === user.type) &&
							dashboardContent
						}
						{/*If its admin then show admin content*/}
						{('admin' === user.type) &&
							<DashboardHome/>
						}
				</div>
			</div>
		);
	}
}

Dashboard.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
	makeUserAVendorRequest: PropTypes.func.isRequired,
	deleteAccount: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = ( state ) => ({
	auth: state.auth,
	profile: state.profile
});

export default connect( mapStateToProps, { logoutUser, getCurrentProfile, deleteAccount, makeUserAVendorRequest }  )( Dashboard );