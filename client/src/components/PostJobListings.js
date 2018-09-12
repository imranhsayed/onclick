import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PostListingCategories from "./layouts/posts/PostListingCategories";
import PostFeed from './layouts/posts/PostFeed';
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import { getPosts } from '../actions/postActions';
import { getPostByCategoryId } from "../actions/postActions";
import { getPostBySubCategoryId } from "../actions/postActions";
import { getPostBySubCatLevel2Id } from "../actions/postActions";
import isEmpty from "../validation/is-empty";
import Banner from "./layouts/banner/Banner";

class DashboardPostsListing extends Component {
	componentDidMount() {
		const queryStringValues = queryString.parse( this.props.location.search );
		console.log( 'querystring', queryStringValues );
		let paramId = this.props.match.params.catid;
		console.log( 'paramid', paramId );
		if ( paramId ) {
			if ( queryStringValues.category ) {
				this.props.getPostByCategoryId( paramId );
			}
			if ( queryStringValues.subCat ) {
				this.props.getPostBySubCategoryId( paramId );
			}
			if ( queryStringValues.grandChild ) {
				this.props.getPostBySubCatLevel2Id( paramId );
			}
		} else{
			this.props.getPosts();
		}
	}

	render() {
		const { posts, loading } = this.props.post;
		const { user } = this.props.auth;
		const queryStringValues = queryString.parse( this.props.location.search );
		let postContent, postCount,
			paramName = this.props.match.params.name;

		console.log( 'posts', posts );

		if ( posts === null || loading) {
			postContent = <img src="/img/spinner.gif" style={{ width: '200px', margin: 'auto', display: 'block' }} alt="spinner"/>;
		} else {
			postCount = posts.length;
			if ( postCount ) {
				postContent = <PostFeed posts={posts} user={user} />;
			} else {
				postContent = <h3 className="text-center">No Jobs found. Please select another filter</h3>;
			}
		}

		return (
			<div>
				<Navbar/>
				<Banner heading={ 'Job Listings' }/>
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
								{ queryStringValues.category && (<p>Showing results for <strong>Category: { queryStringValues.category }</strong></p>) }
								{ queryStringValues.subCat && (<p>Showing results for <strong>SubCategory: { queryStringValues.subCat }</strong></p>) }
								{ queryStringValues.grandChild && (<p>Showing results for <strong>Child Category: { queryStringValues.grandChild }</strong></p>) }
								{ ! isEmpty( postCount ) ? ( <p>Showing(1 - { postCount } Services of 7585 Services)</p> ) : '' }
							</div>
						</div>
					</div>
					<div className="row">
						<PostListingCategories/>

						{/*listing*/}
						<div className="col-12 col-md-8 col-lg-9 listing-services">
							{ postContent }
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

DashboardPostsListing.propTypes = {
	getPosts: PropTypes.func.isRequired,
	getPostByCategoryId: PropTypes.func.isRequired,
	getPostBySubCategoryId: PropTypes.func.isRequired,
	getPostBySubCatLevel2Id: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	post: state.post
});

export default connect(mapStateToProps, { getPosts, getPostByCategoryId, getPostBySubCategoryId, getPostBySubCatLevel2Id })(DashboardPostsListing);
