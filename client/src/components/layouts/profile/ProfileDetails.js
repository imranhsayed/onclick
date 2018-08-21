import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../../validation/is-empty';

class ProfileDetails extends Component {
	render() {
		const { profile } = this.props;
		console.log( 'profile', profile );

		return (
			<div className="col-md-6 pd-sec-one-details-text">
				<div className="card">
					<div className="card-body">
						<div className="row">
							<div className="col-12">
								<h5 className="card-title">{ profile.business }</h5>
								<div className="row card-text-row">
									<div className="col-12 mb-1 desc">
										<p>{ profile.description }</p>
									</div>
									<div className="col-12 links pb-2">
										<Link to="/"><i className="fas fa-map-marker-alt"></i> { profile.city }, { profile.state }</Link>
									</div>
									<div className="col-12 col-md-6 links pb-2">
										<Link to="/"><i className="fa fa-user"></i>{ profile.user.name }</Link>
									</div>
									<div className="col-12 col-md-6 links pb-2">
										<Link to="/"><i className="fas fa-folder-open"></i> Verified</Link>
									</div>
									<div className="col-12 categories pt-2">
										<p>Categories: { profile.category }</p>
									</div>
									<div className="col-12 pt-1 fa-star-icons pb-2">
										<Link to="/">
											<p><i className="fas fa-star"></i> <i className="fas fa-star"></i> <i className="fas fa-star"></i> <i className="fas fa-star"></i> <i className="fas fa-star-half-alt"></i>
												&nbsp; 1 Review</p></Link>
									</div>
									<div className="col-12 social-icons">
										<p className="mb-0">Share</p>
										<Link to="/"><i className="fab fa-facebook facebook"></i></Link>
										<Link to="/"><i className="fab fa-twitter-square twitter"></i></Link>
										<Link to="/"><i className="fab fa-linkedin linkedin"></i></Link>
										<Link to="/"><i className="fab fa-google-plus-square google-plus-square"></i></Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

ProfileDetails.propTypes = {
	profile: PropTypes.object.isRequired
};

export default ProfileDetails;