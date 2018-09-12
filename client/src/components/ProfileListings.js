import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../validation/is-empty';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import { getProfiles } from './../actions/profileActions';
import ProfileItems from "./layouts/profile/ProfileItems";
import ProfileListingCategories from "./layouts/profile/ProfileListingCategories";
import { getProfilesByCategoryId } from "../actions/profileActions";
import { getProfilesBySubCategoryId } from "../actions/profileActions";
import { getProfilesBySubCatLevel2Id } from "../actions/profileActions";
import Banner from "./layouts/banner/Banner";
import queryString from "query-string";

class ProfileListings extends Component {

	componentDidMount() {
		// this.props.getProfiles();
		const queryStringValues = queryString.parse( this.props.location.search );
		console.log( 'querystring', queryStringValues );
		let paramId = this.props.match.params.catid;
		console.log( 'paramid', paramId );
		if ( paramId ) {
			if ( queryStringValues.category ) {
				console.log( 'cme cat' );
				this.props.getProfilesByCategoryId( paramId );
			}
			if ( queryStringValues.subCat ) {
				console.log( 'cme subcat' );
				this.props.getProfilesBySubCategoryId( paramId );
			}
			if ( queryStringValues.grandChild ) {
				console.log( 'cme grndchild' );
				this.props.getProfilesBySubCatLevel2Id( paramId );
			}
		} else{
			this.props.getProfiles();
		}
	}

	render(){

		const { profiles, loading } = this.props.profile;
		let profileItems = '', profileCount = '';
		if ( null === profiles || loading ) {
			profileItems = <img src="./../img/spinner.gif" style={{ width: '200px', margin: 'auto', display: 'block' }}/>;
		} else {
			if ( profiles.length ) {
				profileCount = profiles.length;
				profileItems = profiles.map( ( profile ) => (
					<ProfileItems key={ profile._id } profile={ profile }/>
				) );
			} else {
				profileItems = <h4>No Profiles found</h4>;
			}
		}

		return(
			<div>
				<Navbar/>
				<Banner heading={ 'Business Listing' }/>
				<div className="container listing-container my-3">
					<div className="row mb-3 mt-5 listing-search-services-row">
						<div className="col-12 col-lg-3">
							<form className="form-inline my-2 my-lg-0 search-page-form listing-page-form text-center">
								<input className="form-control mr-sm-2 search-input-search-page search-input-listing-page" type="search" placeholder="Enter service(s)" aria-label="Search"/>
									<button className="btn btn-post-job search-btn-search-page search-btn-listing-page my-2 my-sm-0" type="submit"><i className="fas fa-search"></i></button>
							</form>
						</div>
						<div className="col-12 col-lg-9">
							<div className="jumbotron p-0">
								{ ! isEmpty( profileCount ) ? ( <p>Showing(1 - { profileCount } Services of 7585 Services)</p> ) : '' }
							</div>
						</div>
					</div>
					<div className="row">
						<ProfileListingCategories/>

						{/*listing*/}
						<div className="col-12 col-md-8 col-lg-9 listing-services">
							{ profileItems }
							{/*Pagination*/}
							<div className="row mt-5">
								<div className="col-12 text-center">
									<Link to="/"><button type="button" className="btn-post-job btn-post-job-header listing-btn-active">1</button></Link>
									<Link to="/"><button type="button" className="btn-post-job btn-post-job-header listing-btn-active listing-border-btn">2</button></Link>
									<Link to="/"><button type="button" className="btn-post-job btn-post-job-header listing-btn-active listing-border-btn">3</button></Link>
									<Link to="/"><button type="button" className="btn-post-job btn-post-job-header listing-btn-active listing-border-btn listing-border-next-btn">Next</button></Link>
								</div>
							</div>
						</div>

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
	getProfilesByCategoryId: PropTypes.func.isRequired,
	getProfilesBySubCategoryId: PropTypes.func.isRequired,
	getProfilesBySubCatLevel2Id: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = ( state ) => ({
	auth: state.auth,
	profile: state.profile,
});

export default connect( mapStateToProps, { getProfiles, getProfilesByCategoryId, getProfilesBySubCategoryId, getProfilesBySubCatLevel2Id } )( ProfileListings );