import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostForm from './PostForm';
import DashboardNav from './layouts/dashboard/DashboardNav';
import DashboardSidebar from './layouts/dashboard/DashboardSidebar';
import { getPosts } from '../actions/postActions';

class Posts extends Component {
	componentDidMount() {
		this.props.getPosts();
	}

	render() {
		return (
			<div className="container-scroller">
				<DashboardNav/>
				<div className="container-fluid page-body-wrapper">
					<DashboardSidebar/>
					<PostForm/>
				</div>
			</div>
		);
	}
}

Posts.propTypes = {
	getPosts: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);
