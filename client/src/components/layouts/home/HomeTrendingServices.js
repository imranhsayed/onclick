import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { getPostsByAdmin } from "../../../actions/postActions";

class HomeTrendingServices extends Component {

	componentDidMount(){
		this.props.getPostsByAdmin();
	}

	render() {

		let postContent = '';
		const { post, loading } = this.props;
		const adminPosts = post.posts;

		if ( null === adminPosts || loading ) {
			postContent = <img src="/img/spinner.gif" style={{ width: '200px', margin: 'auto', display: 'block' }}/>;
		} else {
			postContent = (
				<div className="container section-two">
					<div className="row section-two-title text-center">
						<h1>Trending Jobs</h1>
					</div>
					<div className="row section-two-row" >
					{ adminPosts.map( post => (
							<div className="col-12 col-md-6 col-lg-4 section-two-colm wow pulse" key={ post._id }>
								<div className="card">
									{/*<div className="heart-icon">*/}
										{/*<Link to={`/single-post/${post._id}`}><i className="far fa-heart"></i></Link>*/}
									{/*</div>*/}
									<img className="card-img-top" src={ ( post.postImage ) ? post.postImage : '/images/default-image.png' } alt="services"/>
									<div className="card-body">
										<Link to={`/single-post/${post._id}`}><h5 className="card-title">{ post.title }</h5></Link>
										<h3 className="card-last-update"><Moment fromNow >{ post.date }</Moment></h3>

										<div className="row card-text-row">
											<div className="col-12 col-md-12 pb-2">
												<Link to={`/single-post/${post._id}`}>
													<i className="fas fa-map-marker-alt"></i>{ post.area },{ post.city },{ post.state }
												</Link>
											</div>
										</div>
										<div className="row card-text-row">
											<div className="col-12 col-md-6 pb-2">
												<Link to={`/single-post/${post._id}`}>
													<i className="fas fa-user"></i>{ post.name }
												</Link>
											</div>
											<div className="col-12 col-md-6 pb-2">
												<Link to={`/single-post/${post._id}`}>
													<i className="fas fa-folder"></i>{post.category}
												</Link>
											</div>
										</div>
									</div>
								</div>
							</div>

					) ) }

					</div>
				</div>
			)
		}

		return (
			// Section two
			<div>
				{postContent}
			</div>
		);
	}
}

HomeTrendingServices.propTypes = {
	getPostsByAdmin: PropTypes.func.isRequired
};

const mapStateToProps = ( state ) => ({
	auth: state.auth,
	post: state.post
});

export default connect( mapStateToProps, { getPostsByAdmin } )( HomeTrendingServices );