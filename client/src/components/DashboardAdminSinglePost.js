import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import DashboardNav from './layouts/dashboard/DashboardNav';
import DashboardSidebar from './layouts/dashboard/DashboardSidebar';
import { getCurrentUser } from "../actions/authActions";
import { getPost } from "../actions/postActions";

class DashboardAdminSinglePost extends Component {

	componentDidMount() {
		const { user } = this.props.auth;
		const postId = this.props.match.params.postId;
		this.props.getCurrentUser( user );
		this.props.getPost( postId );
		console.log( 'postid', postId );
	}

	render(){
		const { user } = this.props.auth;
		const { post } = this.props.post;
		console.log( 'single post', post );
		let content = '';

		if ( null !== post && Object.keys( post ).length ) {
			content = (
				<div className="container">
					<br/><br/>
					<div className="col-md-12">
						<div id="oc-alert-container"></div>
						<div className="card bg-light mb-5" style={{ maxWidth: '100%' }}>
							<div className="card-header">
								<h5>{ post.title }</h5>
								<div className="d-flex">
									<div className="d-flex align-items-center mr-4 text-muted font-weight-light">
										<i className="mdi mdi-account-outline icon-sm mr-2"></i>
										<span>{ post.name }</span>
									</div>
									<div className="d-flex align-items-center text-muted font-weight-light">
										<i className="mdi mdi-clock icon-sm mr-2"></i>
										<span><Moment format="YYYY/MM/DD">{post.date}</Moment></span>
									</div>
									<div className="d-flex align-items-center text-muted font-weight-light">
										<i className="mdi mdi-arrow-right-bold-hexagon-outline icon-sm mr-2"></i>
										<span>{post.category}, { post.subCategory }, { post.subCatLevel2 }</span>
									</div>
								</div>
							</div>
							<div className="card-body">
								<h6 className="card-title"> Job Description</h6>
								<p className="card-text">{ post.description }</p>
								<Link to={`/dashboard-post/${post._id}`} className="btn btn-primary btn-sm float-right">View/Edit</Link>
								{/* If this post was bid then show the 'View Bid' Link*/}
								{ ( 0 !== post.bidUserIds.length ) &&
								<Link to={`/view-post-bids/${post._id}`} className="btn btn-primary btn-sm float-right" style={{ marginRight: '10px' }}>View Bids</Link>
								}
							</div>
						</div>
					</div>
				</div>
			)
		} else {
			content = <img src="./../img/spinner.gif" style={{ width: '200px', margin: 'auto', display: 'block' }} alt="spinner"/>;
		}

		return(
			<div>
				<div className="container-scroller">
					<div id="oc-alert-container"></div>
					<DashboardNav/>
					<div className="container-fluid page-body-wrapper">
						<DashboardSidebar/>
						{ content }
					</div>
				</div>
			</div>
		);
	}
}

DashboardAdminSinglePost.propTypes = {
	getCurrentUser: PropTypes.func.isRequired,
	getPost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired
};

const mapStateToProps = ( state ) => ({
	auth: state.auth,
	post: state.post,
});

export default connect( mapStateToProps, { getCurrentUser, getPost } )( DashboardAdminSinglePost );