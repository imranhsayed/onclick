import React from 'react';
import { Link } from 'react-router-dom';

const ProfileActions = () => {
	return (
		<div className="col-md-4">
			<div className="card bg-light mb-3" style={{ maxWidth: '20rem' }}>
				<div className="card-header text-center">Edit Profile</div>
				<div className="card-body text-center">
					<Link className="btn btn-gradient-info btn-fw" to="/create-profile">Edit Profile</Link>
				</div>
			</div>
		</div>
);
};

export default ProfileActions;