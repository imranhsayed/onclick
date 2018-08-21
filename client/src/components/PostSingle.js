import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SingleProfileBanner from './layouts/profile/SingleProfileBanner';
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import { getPost } from "../actions/postActions";
import PostSlider from './layouts/posts/PostSlider';
import PostDetails from './layouts/posts/PostDetails';
import PostDescription from './layouts/posts/PostDescription';

class PostSingle extends Component{

	componentDidMount() {
		this.props.getPost( this.props.match.params.id )
	}

	render(){

		const { post, loading } = this.props.post;
		const { user } = this.props.auth;
		let postContent;

		if ( null === post || loading || ! Object.keys( post ).length ) {
			postContent = <img src="./../img/spinner.gif" style={{ width: '200px', margin: 'auto', display: 'block' }}/>;
		} else {
			postContent = (
				<div className="container-fluid pd-section-one-container">
					<div className="row pd-section-one-row">
						<PostSlider post={ post }/>
						<PostDetails post={ post }/>
					</div>
					<PostDescription user={user} post={ post }/>
				</div>
			)
		}

		return(
			<div>
				<Navbar/>
				<SingleProfileBanner/>
				<div className="container forms-section">
					<div className="row forms-section-row" >
						{ postContent }
					</div>
				</div>
				<Footer/>
			</div>
		);
	}
}

PostSingle.propTypes = {
	getPost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = ( state ) => ({
	auth: state.auth,
	post: state.post
});

export default connect( mapStateToProps, { getPost } )( PostSingle );