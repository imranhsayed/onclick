import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CategoriesBanner from './layouts/categories/CategoriesBanner';
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import { getProfiles } from './../actions/profileActions'
import ProfileItems from "./layouts/profile/ProfileItems";

class ProfileListings extends Component {

	componentDidMount() {
		this.props.getProfiles();
	}

	render(){

		const { profiles, loading } = this.props.profile;
		console.log( 'myprof', profiles );
		let profileItems = '';
		if ( null === profiles || loading ) {
			profileItems = <img src="./../img/spinner.gif" style={{ width: '200px', margin: 'auto', display: 'block' }}/>;
		} else {
			if ( profiles.length ) {
				profileItems = profiles.map( ( profile ) => (
					<ProfileItems key={ profile._id } profile={profile }/>
				) );
			} else {
				profileItems = <h4>No Profiles found</h4>;
			}
		}

		return(
			<div>
				<Navbar/>
				<CategoriesBanner/>
				<div className="container forms-section">
					<div className="row forms-section-row" >
						<h1 className="display-4 text-center">Developers Profile</h1>
						{profileItems}
					</div>
				</div>
				<Footer/>
			</div>
		);
	}
}

ProfileListings.propTypes = {
	auth: PropTypes.object.isRequired,
	getProfiles: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = ( state ) => ({
	auth: state.auth,
	profile: state.profile,
});

export default connect( mapStateToProps, { getProfiles } )( ProfileListings );