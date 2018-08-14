import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from "../../../actions/authActions";
import { getCurrentProfile } from "../../../actions/profileActions";

class DashboardSidebar extends Component {

	onLogoutClick( event ) {
		event.preventDefault();
		this.props.logoutUser();

		// Redirects the user to login page after the user logs out.
		window.location.href = '/login';
	}

	render(){

		const { isAuthenticated, user } = this.props.auth;
		console.log( 'prof', this.props.profileData.profile );
		const authLink = (
			<li className="nav-item oc-nav-item">
				<a className="nav-link" href="" onClick={ this.onLogoutClick.bind( this ) }>
					<span className="menu-title">Logout</span>
					<i className="mdi mdi-power menu-icon"></i>
				</a>
			</li>
		);

		return(
			<nav className="sidebar sidebar-offcanvas" id="sidebar">
				<ul className="nav">
					<li className="nav-item oc-nav-item nav-profile">
						<a href="" className="nav-link">
							<div className="nav-profile-image">
								<img src="images/faces/face1.jpg" alt="profile"/>
									<span className="login-status online"></span>
							</div>
							<div className="nav-profile-text d-flex flex-column">
								<span className="font-weight-bold mb-2">{ user.name }</span>
								<span className="text-secondary text-small">{ this.props.profileData.profile && this.props.profileData.profile.business }</span>
							</div>
							<i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
						</a>
					</li>
					<li className="nav-item oc-nav-item">
						<Link className="nav-link" to="/dashboard">
							<span className="menu-title">Dashboard</span>
							<i className="mdi mdi-home menu-icon"></i>
						</Link>
					</li>
					<li className="nav-item oc-nav-item">
						<Link className="nav-link" to="/">
							<span className="menu-title">Home</span>
							<i className="mdi mdi-home-variant menu-icon" style={{ color: 'white' }}></i>
						</Link>
					</li>
					<li className="nav-item oc-nav-item">
						<Link className="nav-link" to="/post-job">
							<span className="menu-title">Post Job</span>
							<i className="mdi mdi-file menu-icon"></i>
						</Link>
					</li>
					<li className="nav-item oc-nav-item">
						<Link className="nav-link" to="/post-job-listings">
							<span className="menu-title">Posted Jobs</span>
							<i className="mdi mdi-window-restore menu-icon"></i>
						</Link>
					</li>
					<li className="nav-item oc-nav-item">
						<Link className="nav-link" to="/dashboard">
							<span className="menu-title">Works</span>
							<i className="mdi mdi-worker menu-icon"></i>
						</Link>
					</li>
					<li className="nav-item oc-nav-item">
						<Link className="nav-link" to="/dashboard">
							<span className="menu-title">Bids</span>
							<i className="mdi mdi-crosshairs-gps menu-icon"></i>
						</Link>
					</li>
					<li className="nav-item oc-nav-item">
						<Link className="nav-link" to="/uploads">
							<span className="menu-title">Uploads</span>
							<i className="mdi mdi-file-image menu-icon"></i>
						</Link>
					</li>
					{/* Show Profile if its user*/}
					{('user' === user.type) &&
					<li className="nav-item oc-nav-item">
						<Link className="nav-link" to="/create-profile">
							<span className="menu-title">Profile</span>
							<i className="mdi mdi-account-card-details menu-icon"></i>
						</Link>
					</li>
					}
					{/* Show All User Profiles if its admin*/}
					{ ( 'admin' === user.type ) &&
					<li className="nav-item oc-nav-item">
						<Link className="nav-link" to="/dash-profiles">
							<span className="menu-title">User Profiles</span>
							<i className="mdi mdi-account-card-details menu-icon"></i>
						</Link>
					</li>
					}
					{/*Logoout Link*/}
					{ isAuthenticated && authLink }
				</ul>
			</nav>
		);
	}
}

DashboardSidebar.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profileData: PropTypes.object.isRequired
};

const mapStateToProps = ( state ) => ({
	auth: state.auth,
	profileData: state.profile
});

export default connect( mapStateToProps, { logoutUser, getCurrentProfile } )( DashboardSidebar );