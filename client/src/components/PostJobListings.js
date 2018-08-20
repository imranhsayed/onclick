import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ProfileListingCategories from "./layouts/profile/ProfileListingCategories";
import PostFeed from './layouts/posts/PostFeed';
import PostJobListingBanner from "./layouts/posts/PostJobListingBanner";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import { getPosts } from '../actions/postActions';
import isEmpty from "../validation/is-empty";

class DashboardPostsListing extends Component {
	componentDidMount() {
		if ( this.props.match.params.id ) {

			this.props.getPosts();
		} else{
			this.props.getPosts();
		}
	}

	render() {
		const { posts, loading } = this.props.post;
		const { user } = this.props.auth;
		let postContent, postCount;

		if ( posts === null || loading) {
			postContent = <img src="./../img/spinner.gif" style={{ width: '200px', margin: 'auto', display: 'block' }}/>;
		} else {
			postCount = posts.length;
			postContent = <PostFeed posts={posts} user={user} />;
		}

		return (
			<div>
				<Navbar/>
				<PostJobListingBanner/>
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
								{ ! isEmpty( postCount ) ? ( <p>Showing(1 - { postCount } Services of 7585 Services)</p> ) : '' }
							</div>
						</div>
					</div>
					<div className="row">
						<ProfileListingCategories/>

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
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	post: state.post
});

export default connect(mapStateToProps, { getPosts })(DashboardPostsListing);
