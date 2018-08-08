import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashboardNav from "./layouts/dashboard/DashboardNav";
import DashboardSidebar from "./layouts/dashboard/DashboardSidebar";
import DashboardHome from "./layouts/dashboard/DashboardHome";
import { logoutUser } from "./../actions/authActions";

class Dashboard extends Component {

	componentDidMount() {
		// If the user is not logged in
		if ( ! this.props.auth.isAuthenticated ) {
			// redirect the user to the homepage
			this.props.history.push( '/login' );
		}
	}

	render(){
		console.log( this.props.auth );
		return(
			<div className="container-scroller">
				<DashboardNav/>
				<div className="container-fluid page-body-wrapper">
					<DashboardSidebar/>
					{('admin' === this.props.auth.user.type) &&
					<DashboardHome/>
					}
				</div>
			</div>
		);
	}
}

Dashboard.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = ( state ) => ({
	auth: state.auth
});

export default connect( mapStateToProps, { logoutUser } )( Dashboard );