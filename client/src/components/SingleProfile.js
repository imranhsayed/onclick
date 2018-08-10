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

	render(){
		const { profile, loading } = this.props.profile;
		let profileContent;

		if ( null === profile || loading ) {
			profileContent = <img src="./../img/spinner.gif" style={{ width: '200px', margin: 'auto', display: 'block' }}/>;
		} else {
			profileContent = (
				<div className="container-fluid pd-section-one-container">
					<div className="row pd-section-one-row">
						<ProfileSlider profile={ profile }/>
						<ProfileDetails profile={ profile }/>
					</div>
					<ProfileDescription profile={ profile }/>
				</div>
			);
		}

		return(
			<div>
				<Navbar/>
				<SingleProfileBanner/>
				<div className="container forms-section">
					<div className="row forms-section-row" >
						{ profileContent }
					</div>
				</div>
				<Footer/>
			</div>
		);
	}
}

SingleProfile.propTypes = {
	getProfileByHandle: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = ( state ) => ({
	profile: state.profile
});

export default connect( mapStateToProps, { getProfileByHandle }  )( SingleProfile );