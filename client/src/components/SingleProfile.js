import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SingleProfileBanner from './layouts/profile/SingleProfileBanner';
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import ProfileSlider from './layouts/profile/ProfileSlider';
import ProfileDetails from './layouts/profile/ProfileDetails';
import ProfileDescription from './layouts/profile/ProfileDescription';
import { getProfileByHandle } from './../actions/profileActions';

class SingleProfile extends Component {

	componentDidMount() {

		// If the url has the handle id.
		let handle = this.props.match.params.handle;
		if ( handle ) {
			this.props.getProfileByHandle( handle );
		}
	}
	//
	// componentWillReceiveProps( nextProps ) {
	// 	if ( nextProps.auth.isAuthenticated ) {
	// 		// After he is authenticated and he logs in , redirect him to dashboard
	// 		this.props.history.push( '/dashboard' );
	// 	}
	// 	if ( nextProps.errors ) {
	// 		this.setState( { errors: nextProps.errors } )
	// 	}
	// }



	render(){

		return(
			<div>
				<Navbar/>
				<SingleProfileBanner/>
				<div className="container forms-section">
					<div className="row forms-section-row" >
						<div className="container-fluid pd-section-one-container">
							<div className="row pd-section-one-row">
								<ProfileSlider/>
								<ProfileDetails/>
							</div>
							<ProfileDescription/>
						</div>
					</div>
				</div>
				<Footer/>
			</div>
		);
	}
}

SingleProfile.propTypes = {
	getProfileByHandle: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = ( state ) => ({
	profile: state.profile,
});

export default connect( mapStateToProps, { getProfileByHandle }  )( SingleProfile );