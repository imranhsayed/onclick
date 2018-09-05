import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deletePost } from "../../../actions/postActions";
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import $ from "jquery";

class DashboardPostItem extends Component {

	onDeleteClick( id ) {
		this.props.deletePost( id );
		this.ocShowAlert( 'Post Deleted Successfully', '#3089cf' );
	}

	// showAlert Function
	ocShowAlert = ( message, background = '#3089cf' ) => {
		let alertContainer = document.querySelector( '#oc-alert-container' ),
			alertEl = document.createElement( 'div' ),
			textNode = document.createTextNode( message );
		alertEl.setAttribute( 'class', 'oc-alert-pop-up' );
		$( alertEl ).css( 'background', background );
		alertEl.appendChild( textNode );
		alertContainer.appendChild( alertEl );
		setTimeout( function () {
			$( alertEl ).fadeOut( 'slow' );
			$( alertEl ).remove();
		}, 3000 );
	};

	render() {
		const { post, user } = this.props;
		let postItem = '',
			userId = ( user.id ) ? user.id : user._id;
		console.log( user );

		// If its not admin display posts conditionally, else display them all.
		if ( 'admin' !== user.type ) {
			if ( userId === post.userId ) {
				console.log( 'camcam' );
				postItem = (
					<div className="col-md-12" style={{ boxShadow: '0 5px 10px 2px rgba(195,192,192,.5) !important' }}>
						<div id="oc-alert-container"></div>
						<div className="card bg-light mb-5 oc-dash-post-box s" style={{ maxWidth: '100%' }}>
							{/*Header*/}
							<div className="card-header" style={{ color: '#8D8D8D' }}>
								<h5>{ post.title }</h5>
								<div className="d-flex">
									<div className="d-flex align-items-center mr-4 text-muted font-weight-light" style={{ color: '#8D8D8D' }}>
										<i className="mdi mdi-account-outline icon-sm mr-2"></i>
										<span>{ post.name }</span>
									</div>
									<div className="d-flex align-items-center mr-3 text-muted font-weight-light">
										<i className="mdi mdi-clock icon-sm mr-2"></i>
										<span><Moment format="YYYY/MM/DD">{post.date}</Moment></span>
									</div>
									<div className="d-flex align-items-center text-muted font-weight-light">
										<i className="mdi mdi-arrow-right-bold-hexagon-outline icon-sm mr-2"></i>
										<span>{post.category}, { post.subCategory }, { post.subCatLevel2 }</span>
									</div>
								</div>
							</div>
							{/*Body*/}
							<div className="card-body" style={{ color: '#8D8D8D' }}>
								<h6 className="card-title"> Job Description</h6>
								<p className="card-text"><strong>Job Id: </strong>{ post._id }</p>
								<p className="card-text">{ post.description }</p>
								<button onClick={this.onDeleteClick.bind( this, post._id )} className="btn btn-danger btn-sm">Delete</button>
								<Link to={`/dashboard-post/${post._id}`} className="btn btn-primary btn-sm float-right">View/Edit</Link>
								{/* If this post was bid then show the 'View Bid' Link*/}
								{ ( 0 !== post.bidUserIds.length ) &&
								<Link to={`/view-post-bids/${post._id}`} className="btn btn-primary btn-sm float-right" style={{ marginRight: '10px' }}>View Bids</Link>
								}
							</div>
							{/*Footer*/}
							<div className="card-footer text-muted p-4">
								<div className="float-left">
									<i className="mdi mdi-google-maps icon-sm mr-2"></i>
									<span>{post.area}, {post.city}, {post.state}</span>
								</div>
								<div className="float-right">
									<span>Budget: ₹ {post.budgetMin} - {post.budgetMax}</span>
								</div>
							</div>
						</div>
					</div>
				);
			} else {
				postItem = '';
			}
		} else {
			postItem = (
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
							<p className="card-text"><strong>Job Id: </strong>{ post._id }</p>
							<p className="card-text">{ post.description }</p>
							<button onClick={this.onDeleteClick.bind( this, post._id )} className="btn btn-danger btn-sm">Delete</button>
							<Link to={`/dashboard-post/${post._id}`} className="btn btn-primary btn-sm float-right">View/Edit</Link>
							{/* If this post was bid then show the 'View Bid' Link*/}
							{ ( 0 !== post.bidUserIds.length ) &&
							<Link to={`/view-post-bids/${post._id}`} className="btn btn-primary btn-sm float-right" style={{ marginRight: '10px' }}>View Bids</Link>
							}
						</div>
					</div>
				</div>
			);
		}

		return postItem ;
	}
}

DashboardPostItem.propTypes = {
	deletePost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired
};

const mapStateToProps = ( state ) => ({
	auth: state.auth
});

export default connect( mapStateToProps, { deletePost } )( DashboardPostItem );