import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DashboardNav from './../dashboard/DashboardNav';
import DashboardSidebar from './../dashboard/DashboardSidebar';
import axios from 'axios';
import $ from 'jquery';

class ProfileImageUpload extends Component {

	constructor( props ) {
		super( props );
		this.state = {
			selectedFile: null
		}
	}

	fileChangedHandler = ( event ) => {
		this.setState({
			selectedFile: event.target.files[0]
		});
	};

	uploadHandler = (  ) => {
		const data = new FormData();
		const profileId = this.props.match.params.profileid;

		// If file selected
		if ( this.state.selectedFile ) {

			data.append( 'profileImage', this.state.selectedFile, this.state.selectedFile.name );

			axios.post( '/api/profile/profile-img-upload', data, {
				headers: {
					'accept': 'application/json',
					'Accept-Language': 'en-US,en;q=0.8',
					'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
				}
			})
				.then( ( response ) => {

					if ( 200 === response.status ) {
						// If file size is larger than expected.
						if( response.data.error ) {
							if ( 'LIMIT_FILE_SIZE' === response.data.error.code ) {
								this.ocShowAlert( 'Max size: 2MB', 'red' );
							} else {
								console.log( response.data );

								// If not the given file type
								this.ocShowAlert( response.data.error, 'red' );
							}
						} else {
							// Success
							let fileName = response.data;
							console.log( 'fileName', fileName );
							this.ocShowAlert( 'File Uploaded', '#3089cf' );
							window.location.href = `/business-image-upload/${ profileId }?profile_id=${ profileId }`;
						}
					}
				}).catch( ( error ) => {
				// If another error
				this.ocShowAlert( error, 'red' );
			});
		} else {
			// if file not selected throw error
			this.ocShowAlert( 'Please upload file', 'red' );
		}

	};

	// ShowAlert Function
	ocShowAlert = ( message, background = '#3089cf' ) => {
		let alertContainer = document.querySelector( '#oc-alert-container' ),
			alertEl = document.createElement( 'div' ),
			textNode = document.createTextNode( message );
		alertEl.setAttribute( 'class', 'oc-alert-pop-up' );
		$( alertEl ).css( 'background', background );
		alertEl.appendChild( textNode );
		alertContainer.appendChild( alertEl );
		setTimeout( function () {
			$( alertEl ).fadeOut( 'slow' );
			$( alertEl ).remove();
		}, 3000 );
	};



	render(){
		return(
			<div className="container-scroller">
				<DashboardNav/>
				<div className="container-fluid page-body-wrapper">
					<DashboardSidebar/>
					<div className="container p-5">
						<div id="oc-alert-container"></div>
						<div className="card border-light mb-3" style={{ boxShadow: '0 5px 10px 2px rgba(195,192,192,.5)' }}>
							<div className="card-header">
								<h3 style={{ color: '#555', marginLeft: '12px' }}>Profile Image Upload</h3>
								<p className="text-muted" style={{ marginLeft: '12px' }}>Upload Size: 250px x 250px ( Max 2MB )</p>
							</div>
							<div className="card-body">
								<p className="card-text">Please upload an image for your profile</p>
								<input type="file" onChange={this.fileChangedHandler}/>
								<div className="mt-5">
									<button className="btn btn-info" onClick={this.uploadHandler}>Upload!</button>
									<Link to="/dashboard" className="btn btn-primary"  style={{ marginLeft: '10px' }}>Upload later</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ProfileImageUpload;