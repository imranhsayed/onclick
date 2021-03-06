import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DashboardNav from "./layouts/dashboard/DashboardNav";
import DashboardSidebar from "./layouts/dashboard/DashboardSidebar";
import DashboardHome from "./layouts/dashboard/DashboardHome";
import ProfileActions from './layouts/dashboard/ProfileActions';
import { logoutUser } from "./../actions/authActions";
import { getCurrentProfile } from "../actions/profileActions";
import axios from "axios";
import { post } from 'axios';

class DashboardUploads extends Component {

	// constructor( props ) {
	// 	super( props );
	// 	this.state = {
	// 		profileImg: null,
	// 	};
	// }

	componentDidMount() {

		this.props.getCurrentProfile();

		// If the user is not logged in
		if ( ! this.props.auth.isAuthenticated ) {
			// redirect the user to the homepage
			this.props.history.push( '/login' );
		}
	}
	state = {
		selectedFile: null,
	};

	fileSelectedHandler = ( event ) => {
		console.log( event.target.files[0] );
		this.setState({
			selectedFile: event.target.files[0]
		});
	};

	fileUploadHandler = ( event ) => {
		const fd = new FormData();
		fd.append( 'image', this.state.selectedFile, this.state.selectedFile.name );
		axios.post( '/api/profile/uploads', fd )
			.then( res => {
				console.log( res );
			} ).then( error => console.log( error ) );

	};


	render(){
		const { user } = this.props.auth;
		const { profile, loading } = this.props.profile;

		let dashboardContent;

		if ( profile === null || loading ) {
			dashboardContent = <img src="./../img/spinner.gif" style={{ width: '200px', margin: 'auto', display: 'block' }}/>;
		} else {

			// Check if logged in user has profile ( Check if the profile object is not empty )
			if ( Object.keys( profile ) .length ) {

				// Profile is present
				dashboardContent = (
					<div className="container">
						<p className="lead text-muted">Please Upload your profile Image</p>
							<div className="form-group">
								<label>File upload</label><br/>
								<input type="file" name="profileImg" onChange={this.fileSelectedHandler} className=""/>
							</div>
							<button onClick={this.fileUploadHandler} >Upload</button>
					</div>
				);
			} else {

				// Profile is not created
				dashboardContent = (
					<div className="container">
						<p className="lead text-muted">Welcome { user.name }!</p>
						<p className="">You have not yet set up a profile, please create your profile</p>
						<Link className="btn btn-lg btn-info" to="/create-profile">Create Profile</Link>
					</div>
				);

			}
		}


		return(
			<div className="container-scroller">
				<DashboardNav/>
				<div className="container-fluid page-body-wrapper">
					<DashboardSidebar/>
					{/*If its user then show dashboard content*/}
					{('user' === user.type) &&
					dashboardContent
					}
					{/*If its admin then show admin content*/}
					{('admin' === user.type) &&
					<DashboardHome/>
					}
				</div>
			</div>
		);
	}
}

DashboardUploads.propTypes = {
	auth: PropTypes.object.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = ( state ) => ({
	auth: state.auth,
	profile: state.profile,
});

export default connect( mapStateToProps, { logoutUser, getCurrentProfile }  )( DashboardUploads );