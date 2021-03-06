import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

class DashboardPostItem extends Component {
	render() {
		const { post, user } = this.props;
		let imgSrc;
		if ( post.postImage ) {
			// If User has uploaded image for the job
			imgSrc = post.postImage;
		} else {
			// If no image uploaded for the job
			imgSrc = '/images/default-image.png';
		}

		return (
			(
				<div className="jumbotron listing-services-jumbotron p-0 wow pulse">
					<div className="row">
						<img src={ imgSrc } className="col-12 col-sm-6" style={{ maxWidth:'420px', maxHeight: '337px' }}/>
						<div className="col-12 col-sm-6 listing-services-text">
							<h5>
								<i className="far fa-folder-open"></i> { post.category }
								<div className="heart-icon">
									<Link to="/"><i className="far fa-heart"></i></Link>
								</div>
							</h5>
							<Link to={`/single-post/${post._id}`}><h3>{ post.title }</h3></Link>
							<div className="text-muted">
								{ post.subCategory && post.subCategory }
								{ post.subCatLevel2 && ', ' + post.subCatLevel2 }
							</div>
							<div className="row">
								<div className="col-12">
									<Link to={`/single-post/${post._id}`}>
										<p style={{ fontSize: '13px' }}>
											Posted <Moment fromNow>{post.date}</Moment>
										</p>
									</Link>
								</div>
								<div className="col-12 col-md-6">
									<Link to={`/single-post/${post._id}`}>
										<p>
											<i className="fas fa-map-marker-alt"></i> { post.city }, { post.state }
										</p>
									</Link>
								</div>
								<div className="col-12 col-md-6">
									<Link to={`/single-post/${post._id}`}>
										<p>
											<i className="far fa-user"></i> {post.name}
										</p>
									</Link>
								</div>
								<div className="col-12 col-md-6">
									<Link to={`/single-post/${post._id}`}>
										<p style={{ width: '200px' }}>
											<i className="far fa-user"></i> Budget: ₹{post.budgetMin} - ₹{ post.budgetMax }
										</p>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			)
		);
	}
}

DashboardPostItem.propTypes = {
	post: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired
};

const mapStateToProps = ( state ) => ({
	auth: state.auth
});

export default connect( mapStateToProps )( DashboardPostItem );