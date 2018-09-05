import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import DashboardNav from './DashboardNav';
import DashboardSidebar from './DashboardSidebar';
import { getCurrentUser } from "../../../actions/authActions";
import { getProfileByHandle } from "../../../actions/profileActions";

class BiddersProfile extends Component {

	componentDidMount() {
		const { user } = this.props.auth;
		const bidderUserId = this.props.match.params.bidderUserId;
		this.props.getCurrentUser( user );
		this.props.getProfileByHandle( bidderUserId );
	}

	render(){
		const { user } = this.props.auth;
		const { profile } = this.props.profile;
		console.log( 'profle', profile );
		let content = '';

		if ( null !== profile && Object.keys( profile ).length ) {
			console.log( 'camecamecame' );
			content = (
				<div className="card" style={{ width: '400px', boxShadow: '0 5px 10px 2px rgba(195,192,192,.5)', textAlign: 'center' }}>
					<img src="./../img/profile-default.png" alt="Profile" style={{ width: '100%' }}/>
						<h1 style={{ marginTop: '16px' }}>{ profile.user.name }</h1>
						<p className="title">Business: {profile.business}</p>
						<div style={{ margin: '20px 0' }}>
							<p>Category: {profile.category} ,{profile.subCategory}, {profile.subCatLevel2}</p>
							<p>Description: {profile.description}</p>
							<p>Gender: { profile.gender }</p>
							<p>City: { profile.city }</p>
							<p>State: { profile.state }</p>
						</div>
				</div>
			)
		} else {
			content = <img src="./../img/spinner.gif" style={{ width: '200px', margin: 'auto', display: 'block' }} alt="spinner"/>;
		}

		return(
			<div>
				<div className="container-scroller">
					<DashboardNav/>
					<div className="container-fluid page-body-wrapper">
						<DashboardSidebar/>
						<div className="container">
							{ content }
						</div>
					</div>
				</div>
			</div>
		);
	}
}

BiddersProfile.propTypes = {
	getCurrentUser: PropTypes.func.isRequired,
	getProfileByHandle: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = ( state ) => ({
	auth: state.auth,
	profile: state.profile
});

export default connect( mapStateToProps, { getCurrentUser, getProfileByHandle } )( BiddersProfile );