import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostItem from "./PostItem";

class PostFeed extends Component {
	render() {
		const { posts, user } = this.props;
		return (
			<div>
				{ posts.map( ( post ) => <PostItem key={ post._id } user={ user } post={post}/> ) }
			</div>
		)
	}
}

PostFeed.propTypes = {
	posts: PropTypes.array.isRequired,
	user: PropTypes.object.isRequired
};

export default PostFeed