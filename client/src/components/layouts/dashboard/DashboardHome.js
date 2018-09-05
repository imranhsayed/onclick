import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DashboardFooter from "./DashboardFooter";
import { getPostCount } from './../../../actions/postActions';
import { getCompletedPostCount } from './../../../actions/postActions';
import { getVendorCount } from "../../../actions/authActions";
import { getUserCount } from "../../../actions/authActions";

class DashboardHome extends Component {

	componentDidMount() {
		this.props.getPostCount();
		this.props.getCompletedPostCount();
		this.props.getVendorCount();
		this.props.getUserCount();

	}

	render(){

		const postCount = this.props.post.postCount;
		const completedPostCount = this.props.post.completedPostCount;
		const vendorCount = this.props.auth.vendorCount;
		const userCount = this.props.auth.userCount;

		let  postCountContent = '', completedPostCountContent = '', vendorCountContent = '', userCountContent = '';
		if ( null === postCount ) {
			postCountContent = <img src="./../img/transparent-loading.gif" style={{ width: '32px', margin: 'auto', display: 'block' }} alt="spinner"/>;
		} else {
			postCountContent = postCount;
		}

		if ( null === completedPostCount ) {
			completedPostCountContent = <img src="./../img/transparent-loading.gif" style={{ width: '32px', margin: 'auto', display: 'block' }} alt="spinner"/>;
		} else {
			completedPostCountContent = completedPostCount;
		}

		if ( null === vendorCount ) {
			vendorCountContent = <img src="./../img/transparent-loading.gif" style={{ width: '32px', margin: 'auto', display: 'block' }} alt="spinner"/>;
		} else {
			vendorCountContent = vendorCount;
		}

		if ( null === userCount ) {
			userCountContent = <img src="./../img/transparent-loading.gif" style={{ width: '32px', margin: 'auto', display: 'block' }} alt="spinner"/>;
		} else {
			userCountContent = userCount;
		}

		return(
			<div className="main-panel">
				<div className="content-wrapper">
					<div className="page-header">
						<h3 className="page-title">
              <span className="page-title-icon bg-gradient-primary text-white mr-2">
                <i className="mdi mdi-home"></i>
              </span>
							Dashboard
						</h3>
						<nav aria-label="breadcrumb">
							<ul className="breadcrumb">
								<li className="breadcrumb-item active" aria-current="page">
									<span></span>Overview
									<i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle"></i>
								</li>
							</ul>
						</nav>
					</div>
					<div className="row">
						<div className="col-md-4 stretch-card grid-margin">
							<div className="card bg-gradient-danger card-img-holder text-white">
								<div className="card-body">
									<img src="images/dashboard/circle.svg" className="card-img-absolute" alt="circle"/>
									<h4 className="font-weight-normal mb-3">Posted Jobs
										<i className="mdi mdi-chart-line mdi-24px float-right"></i>
									</h4>
									<h2 className="mb-5">{postCountContent}</h2>
									<h6 className="card-text">Jobs posted on Site</h6>
								</div>
							</div>
						</div>
						<div className="col-md-4 stretch-card grid-margin">
							<div className="card bg-gradient-info card-img-holder text-white">
								<div className="card-body">
									<img src="images/dashboard/circle.svg" className="card-img-absolute" alt="circle"/>
									<h4 className="font-weight-normal mb-3">Completed Jobs
										<i className="mdi mdi-bookmark-outline mdi-24px float-right"></i>
									</h4>
									<h2 className="mb-5">{completedPostCountContent}</h2>
									<h6 className="card-text">Jobs for which payment is received</h6>
								</div>
							</div>
						</div>
						<div className="col-md-4 stretch-card grid-margin">
							<div className="card bg-gradient-success card-img-holder text-white">
								<div className="card-body">
									<img src="images/dashboard/circle.svg" className="card-img-absolute" alt="circle"/>
									<h4 className="font-weight-normal mb-3">Vendors on Site
										<i className="mdi mdi-diamond mdi-24px float-right"></i>
									</h4>
									<h2 className="mb-5">{vendorCountContent}</h2>
									<h6 className="card-text">No of vendors</h6>
								</div>
							</div>
						</div>
						<div className="col-md-4 stretch-card grid-margin">
							<div className="card bg-gradient-info card-img-holder text-white">
								<div className="card-body">
									<img src="images/dashboard/circle.svg" className="card-img-absolute" alt="circle"/>
									<h4 className="font-weight-normal mb-3">Users on Site
										<i className="mdi mdi-diamond mdi-24px float-right"></i>
									</h4>
									<h2 className="mb-5">{userCountContent}</h2>
									<h6 className="card-text">No of Users</h6>
								</div>
							</div>
						</div>
					</div>
				</div>
				<DashboardFooter/>
			</div>
		);
	}
}

DashboardHome.propTypes = {
	getPostCount: PropTypes.func.isRequired,
	getCompletedPostCount: PropTypes.func.isRequired,
	getUserCount: PropTypes.func.isRequired,
	getVendorCount: PropTypes.func.isRequired
};

const mapStateToProps = ( state ) => ({
	auth: state.auth,
	post: state.post
});

export default connect( mapStateToProps, { getPostCount, getCompletedPostCount, getVendorCount, getUserCount } )( DashboardHome ) ;