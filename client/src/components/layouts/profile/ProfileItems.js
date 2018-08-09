import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../../validation/is-empty';

class ProfileItems extends Component {
	render() {

		const { profile } = this.props;

		return (
			<div className="card card-body bg-light mb-3">
				<div className="row">
					<div className="col-2">
						<img src="./../img/home/card-gym.jpg" alt="" className="rounded-circle"/>
					</div>
				</div>
				<div className="col-lg-6 col-md-4 col-8">
					<h3>{profile.user.name}</h3>
					<p>
						{ profile.business }
						{ isEmpty( profile.phone ) ? null : ( <span>{ profile.phone }</span> ) }
					</p>
					<Link to={ `/profile/${profile.handle}` }>View Profile</Link>
				</div>
			</div>
		);
	}
}

ProfileItems.propTypes = {
	profile: PropTypes.object.isRequired
};

export default ProfileItems;