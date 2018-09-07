import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DashboardNav from './layouts/dashboard/DashboardNav';
import DashboardSidebar from './layouts/dashboard/DashboardSidebar';
import axios from 'axios';
import $ from 'jquery';

class PostGalleryUploads extends Component {


	constructor( props ) {
		super( props );
		this.state = {
			selectedFile: null
		};

	}


	fileChangedHandler = (event) => {
		this.setState({
			selectedFile: event.target.files
		});
		console.log( event.target.files );
	};

	uploadHandler = () => {
		const data = new FormData();
		const postId = this.props.match.params.postid;
		let selectedFile = this.state.selectedFile;

		// If file selected
		if ( selectedFile ) {
			for ( let i = 0; i < selectedFile.length; i++ ) {
				data.append( 'galleryImage', selectedFile[ i ], selectedFile[ i ].name );
			}

			axios.post( '/api/posts/gallery-upload', data, {
				headers: {
					'accept': 'application/json',
					'Accept-Language': 'en-US,en;q=0.8',
					'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
				}
			})
				.then( ( response ) => {
					console.log( 'res', response );

					if ( 200 === response.status ) {
						// If file size is larger than expected.
						if( response.data.error ) {
							if ( 'LIMIT_FILE_SIZE' === response.data.error.code ) {
								this.ocShowAlert( 'Max size: 2MB', 'red' );
							} else if ( 'LIMIT_UNEXPECTED_FILE' === response.data.error.code ){
								this.ocShowAlert( 'Max 4 images allowed', 'red' );
							} else {
								// If not the given ile type
								this.ocShowAlert( response.data.error, 'red' );
							}
						} else {
							// Success
							let fileName = response.data;
							console.log( 'fileName', fileName );
							this.ocShowAlert( 'File Uploaded', '#3089cf' );

							window.location.href = `/single-post/${postId}`;
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

	render() {
		return(
			<div>
				<div className="container-scroller">
					<DashboardNav/>
					<div className="container-fluid page-body-wrapper">
						<DashboardSidebar/>
						<div className="container p-5">
							<div id="oc-alert-container"></div>
							<div className="card border-light mb-3" style={{ boxShadow: '0 5px 10px 2px rgba(195,192,192,.5)' }}>
								<div className="card-header">
									<h3 style={{ color: '#555', marginLeft: '12px' }}>Upload Job's Gallery Images</h3>
									<p className="text-muted" style={{ marginLeft: '12px' }}>Upload Size: 400px x 400px ( Max 2MB )</p>
								</div>
								<div className="card-body">
									<p className="card-text">Please upload the Gallery Images for the posted job</p>
									<p className="card-text">These images will be show on the Job desc</p>
									<input type="file" multiple onChange={this.fileChangedHandler}/>
									<div className="mt-5">
										<button className="btn btn-info" onClick={this.uploadHandler}>Upload!</button>
										<Link to="/post-job-listings" className="btn btn-primary"  style={{ marginLeft: '10px' }}>Upload later</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default PostGalleryUploads;