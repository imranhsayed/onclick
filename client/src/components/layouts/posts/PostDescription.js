import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class PostDescription extends Component {
	render() {

		const { post } = this.props;

		return (
			<div className="container-fluid pd-section-two-container">
				<div className="row pd-section-two-row">
					<div className="col-12 col-md-8 pd-left-desc">
						<div className="card h-100">
							<div className="card-body">
								<h1 className="card-title">Description</h1>
								<p className="card-text">{ post.description }</p>
								<Link to="/">
									<button type="button" className="btn btn-primary send-otp-btn btn-post-job product-bid-on-project-btn">Bid on This Project</button>
								</Link>
							</div>
						</div>
					</div>
					<div className="col-12 col-md-4 pd-right-desc">
						<div className="card h-100">
							<div className="card-body">
								<h1>Short Info</h1>
								<p className="pt-2"><Link to="/listings"><i className="fas fa-file-signature"></i> &nbsp; More services</Link></p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

PostDescription.propTypes = {
	post: PropTypes.object.isRequired
};

export default PostDescription;