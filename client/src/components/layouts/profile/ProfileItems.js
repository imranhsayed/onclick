import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../../validation/is-empty';

class ProfileItems extends Component {
	render() {

		const { profile } = this.props;
		let businessGalleryImages = '';

		// Use default image for business image if its not uploaded.
		if ( ! profile.businessImage ) {
			businessGalleryImages = '/images/default-image.png';
		} else {
			businessGalleryImages = profile.businessImage;
		}

		return (
			<div>
				<div className="jumbotron listing-services-jumbotron p-0 wow pulse">
					<div className="row">
						<img src={ businessGalleryImages } className="col-12 col-sm-6" style={{ maxWidth:'420px', maxHeight: '337px' }}/>
						<div className="col-12 col-sm-6 listing-services-text">
							<h5>
								<i className="far fa-folder-open"></i> { profile.category }
								<div className="heart-icon">
									<Link to="/"><i className="far fa-heart"></i></Link>
								</div>
							</h5>
							<Link to={ `/profile/${profile.handle}` }><h3>{ profile.business }</h3></Link>
							<div className="row">
								<div className="col-12 col-md-6">
									<Link to={ `/profile/${profile.handle}` }>
										<p>
											<i className="fas fa-map-marker-alt"></i> { profile.city }, { profile.state }
										</p>
									</Link>
								</div>
								<div className="col-12 col-md-6">
									<Link to={ `/profile/${profile.handle}` }>
										<p>
											<i className="far fa-user"></i> {profile.user.name}
										</p>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

ProfileItems.propTypes = {
	profile: PropTypes.object.isRequired
};

export default ProfileItems;