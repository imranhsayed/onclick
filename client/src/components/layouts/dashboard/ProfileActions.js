import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ProfileActions extends Component{
	render() {

		const {user} = this.props;
		const userId = ( user._id ) ? user._id : user.id;

		return (
			<div className="col-md-4">
				<div className="card bg-light mb-3" style={{ maxWidth: '20rem' }}>
					<div className="card-header text-center">Profile</div>
					<div className="card-body text-center">
						<Link className="btn btn-gradient-info btn-fw" to="/create-profile">Edit Profile</Link>
						<Link to={`/profile/${ userId }`} className="btn btn-gradient-info btn-fw mt-3">View Profile</Link>
						<Link to={`/profile-image-upload/${ user.profileId }?profile_id=${ user.profileId }`} className="btn btn-gradient-info btn-fw mt-3">Upload Profile Image</Link>
						<Link to={`/business-image-upload/${ user.profileId }?profile_id=${ user.profileId }`} className="btn btn-gradient-info btn-fw mt-3">Upload Business Image</Link>
						<Link to={`/business-gallery-uploads/${ user.profileId }?profile_id=${ user.profileId }`} className="btn btn-gradient-info btn-fw mt-3">Upload Business Gallery</Link>
						<Link to="/listings" className="btn btn-gradient-info btn-fw mt-3">Profile/Business Listings</Link>
					</div>
				</div>
			</div>
		);
	}
};

ProfileActions.propTypes = {
	user: PropTypes.object.isRequired
};

export default ProfileActions;