import React, { Component } from  'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";

class Navbar extends Component {

	onLogoutClick( event ) {
		event.preventDefault();
		this.props.logoutUser();
		this.props.clearCurrentProfile();

		// Redirects the user to login page after the user logs out.
		window.location.href = '/login';
	}

	render() {

		const { isAuthenticated, user } = this.props.auth;
		const signUpLink = (
				<li className="nav-item">
					<Link to="/register" className="nav-link">Sign Up</Link>
				</li>
		);
		const loginLink = (
			<li className="nav-item">
				<Link to="/login" className="nav-link">Login</Link>
			</li>
		);
		const userNameLink = (
			<li className="nav-item user-name-home">
				<span>Welcome </span>
				<span>{ user.name } !!</span>
			</li>
		);
		const dashboardLink = (
			<li className="nav-item">
				<Link to="/dashboard" className="nav-link">Dashboard</Link>
			</li>
		);
		const logoutLink = (
			<li className="nav-item">
				<a href="" className="nav-link" onClick={this.onLogoutClick.bind( this )} >Logout</a>
			</li>
		);

		return (
			<div>
				<nav className="navbar navbar-expand-lg navbar-light onclick-navbar">

					<div id="onclick-logo col-md-1 text-center">
						<Link to="/" className="navbar-brand">
							<img src="./../../../img/header/onclickbiz-logo.png" className="img-fluid home-header-logo" alt="test"/>
						</Link>
					</div>

					<button className="navbar-toggler onclick-navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>

					<div className="collapse navbar-collapse onclick-navbar-collapse col-md-9 col-md-offset-2" id="navbarNavDropdown">
						<ul className="navbar-nav onclick-navbar-nav">
							<li className="nav-item  active ml-1 mr-3">
								<Link className="nav-link" to="/">HOME</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/categories">CATEGORIES</Link>
							</li>
							<li className="nav-item dropdown">
								<a className="nav-link dropdown-toggle onclick-dropdown-toggle" href="" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									PAGES
								</a>
								<div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
									<Link className="dropdown-item" to="/register">Sign Up</Link>
									<Link className="dropdown-item" to="/login">Login</Link>
									<Link className="dropdown-item" to="/post-job">Post Free Job</Link>
									<Link className="dropdown-item" to="/job-listings">Job Listings</Link>
									<Link className="dropdown-item" to="/search-job">Search Job</Link>
									<Link className="dropdown-item" to="/listings">Product Listings</Link>
									<Link className="dropdown-item" to="/product">Product</Link>
									<Link className="dropdown-item" to="/detail-product">Detail Product</Link>
									<Link className="dropdown-item" to="/categories">Categories</Link>
								</div>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="">BLOG</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="">CONTACTs</a>
							</li>

							<Link to="/post-job" className="btn btn-primary btn-post-job btn-post-job-header ml-5 mr-2">Post Job</Link>

							{/*Auth Links*/}
							{ isAuthenticated && userNameLink }
							{ isAuthenticated ? dashboardLink : signUpLink }
							{ isAuthenticated ?  logoutLink : loginLink }
						</ul>
					</div>
				</nav>
			</div>
		);
	}
}

Navbar.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	clearCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = ( state ) => ({
	auth: state.auth
});


export default connect( mapStateToProps, { logoutUser, clearCurrentProfile } )( Navbar );