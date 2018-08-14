import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deletePost } from "../../../actions/postActions";
import classnames from 'classnames';
import { Link } from 'react-router-dom';

class DashboardPostItem extends Component {

	onDeleteClick( id ) {
		this.props.deletePost( id );
	}

	render() {
		const { post, user } = this.props;
		let postItem = '',
			postFound = '';
		console.log( post );

		if ( user.id === post.userId ) {
			postFound = true;
			postItem = (
				<div className="col-md-12">
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
							<button onClick={this.onDeleteClick.bind( this, post._id )} className="btn btn-danger btn-sm">Delete</button>
						</div>
					</div>
				</div>
			);
		} else {
			postItem = '';
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