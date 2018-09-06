import React, { Component } from 'react';
import DashboardNav from './layouts/dashboard/DashboardNav';
import DashboardSidebar from './layouts/dashboard/DashboardSidebar';
import axios from 'axios';

class PostFileUploads extends Component {


	constructor( props ) {
		super( props );
		this.state = {
			selectedFile: null
		};

	}


	fileChangedHandler = (event) => {
		this.setState({
			selectedFile: event.target.files[0]
		});
	};

	uploadHandler = () => {
		const data = new FormData();

		if ( this.state.selectedFile ) {
			const postId = this.props.match.params.postId;

			data.append( 'myImage', this.state.selectedFile, this.state.selectedFile.name );

			axios.post( '/api/posts/upload', data, {
				headers: {
					'accept': 'application/json',
					'Accept-Language': 'en-US,en;q=0.8',
					'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
				}
			})
				.then( ( response ) => {

					if ( 200 === response.status ) {
						// If file size is larger than expected.
						if ( response.data.code && 'LIMIT_FILE_SIZE' === response.data.code ) {
						    console.log( 'error', 'File size must be below 2MB' );
						} else {
							// success
							let fileName = response.data;
							console.log( 'fileName', fileName );
						}
					}
				}).catch( ( error ) => {
				//handle error
				console.log( 'err', error );
			});
		} else {

		}
	};

	render() {
		return(
			<div>
				<div className="container-scroller">
					<DashboardNav/>
					<div className="container-fluid page-body-wrapper">
						<DashboardSidebar/>
						<div className="container p-5">
							<div className="card border-light mb-3" style={{ boxShadow: '0 5px 10px 2px rgba(195,192,192,.5)' }}>
								<div className="card-header">
									<h3 style={{ color: '#555', marginLeft: '12px' }}>Job File Upload</h3>
								</div>
								<div className="card-body">
									<p className="card-text">Please upload the Image for the posted job</p>
									<input type="file" onChange={this.fileChangedHandler}/>
									<div className="mt-5">
										<button className="btn btn-info" onClick={this.uploadHandler}>Upload!</button>
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
export default PostFileUploads;