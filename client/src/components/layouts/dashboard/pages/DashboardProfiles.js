import React, { Component } from  'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashboardNav from './../DashboardNav';
import DashboardSidebar from './../DashboardSidebar';

class DashboardProfiles extends Component {
	render() {

		const { isAuthenticated, user } = this.props.auth;

		return(
			<div className="container-scroller">
				<DashboardNav/>
				<div className="container-fluid page-body-wrapper">
					<DashboardSidebar/>
					<h1>{ user.name }</h1>
				</div>
			</div>
		);
	}
}

DashboardProfiles.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = ( state ) => ({
	auth: state.auth
});

export default connect( mapStateToProps  )( DashboardProfiles );