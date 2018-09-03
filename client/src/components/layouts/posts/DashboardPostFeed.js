import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DashboardPostItem from "./DashboardPostItem";

class DashboardPostFeed extends Component {
	render() {
		const { posts, user } = this.props;
		console.log( 'postsposting', posts );
		return (
			<div className="container">
				<br/><h3>Posted Jobs</h3><br/>
				<div className="row">
					{ posts.map( ( post ) => <DashboardPostItem key={ post._id } user={ user } post={post}/> ) }
				</div>
			</div>
		)
	}
}

DashboardPostFeed.propTypes = {
	posts: PropTypes.array.isRequired,
	user: PropTypes.object.isRequired
};

export default DashboardPostFeed