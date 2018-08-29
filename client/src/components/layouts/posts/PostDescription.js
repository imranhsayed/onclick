import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BidForm from './../../bid/BidForm';

class PostDescription extends Component {
	render() {

		const { post } = this.props;
		const { user } = this.props;
		let bidLink = '';

		if ( 'vendor' === user.type ) {
			// If its a vendor and on a package
		    if ( 'none' !== user.package ) {
			    bidLink = (
			    	<div>
					    <button type="button" style={{ width: '200px', paddingBottom: '31px', marginBottom: '16px' }} data-toggle="collapse" data-target="#bidProposal" aria-expanded="false" className="btn btn-primary send-otp-btn btn-post-job detail-project-btn">Bid on This Project</button>
					    <BidForm post={ post }/>
				    </div>
			    )
		    } else {
			    // If its a vendor not on a package
		    	bidLink = <Link to="/buy-bid" className="btn btn-primary send-otp-btn btn-post-job product-bid-on-project-btn">Buy Bids to Bid on This Project</Link>
		    }
		} else {
			// If its a user
			bidLink = (
				<div>
					<p>You need to register as a vendor to bid on this project</p>
					<Link to="/dashboard" style={{ width: '275px' }} className="btn btn-primary send-otp-btn btn-post-job product-bid-on-project-btn">Register as a Vendor to Bid</Link>
				</div>
			)
		}

		return (
			<div className="container-fluid pd-section-two-container">
				<div className="row pd-section-two-row">
					<div className="col-12 col-md-8 pd-left-desc">
						<div className="card h-100">
							<div className="card-body">
								<h1 className="card-title">Description</h1>
								<p className="card-text">{ post.description }</p>
								{ bidLink }
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
	post: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired
};

export default PostDescription;