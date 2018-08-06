import React, { Component } from  'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashboardNav from './../DashboardNav';
import DashboardSidebar from './../DashboardSidebar';

class DashboardProfiles extends Component {

	constructor() {
		super( ...arguments );
		this.state = {
			selectedFile: null,
			currentUserProfile: null
		};
		this.onChange = this.onChange.bind( this );
		/**
		 * Get the profile of the currently logged in user.
		 */
		axios.get( '/api/profile', this.props.auth )
			.then( res => {
				// Once we get the response containing the currentUserProfile data, we set the state value of currentUserProfile to the received data.
				this.setStateForExistingProfile( res.data );
			} )
			.catch( ( error ) => console.log( error.response.data ) );

	}

	onChange( event ) {
		/**
		 * Change the state of name property.
		 * event.target.name will give you the name of the input element, and
		 * event.target.value will give you the value of the input element.
		 */
		this.setState( { [ event.target.name ]: event.target.value } );
	}

	/**
	 * Sets the state of currentUserProfile to the existingProfileData received from axios.get()
	 * @param existingProfileData
	 */
	setStateForExistingProfile = ( existingProfileData ) => {
		this.setState({
			currentUserProfile: existingProfileData
		})
	};

	fileSelectedHandler = ( event ) => {
		this.setState( {
			selectedFile: event.target.files[0]
		} )
	};
	// https://www.youtube.com/watch?v=XeiOnkEI7XI
	fileUploadHandler = ( event ) => {
		event.preventDefault();
		const formData = new FormData();
		// console.log( this.state.selectedFile );
		// formData.append( 'image', this.state.selectedFile, this.state.selectedFile.name );
		// console.log( formData );
		

		const profile = {
			name: this.state.name,
			email: this.state.email,
			gender: this.state.gender,
			city: this.state.city,
			address: this.state.address,
			subCategory: this.state.subCategory,
			subCatLevel2: this.state.subCatLevel2,
		};
		console.log( profile );
		
		// Save or update the data.
		// axios.post( '/api/profile', profile )
		// 	.then( res => {
		// 		console.log( res );
		// 	} )
		// 	.catch( ( error ) => console.log( error.response.data ) );

	};




	render() {
		let name = '', email = '', category = '', subCategory = '', subCatLevel2 = '', gender = '', city = '', address = '';
		const { user } = this.props.auth;
		console.log( 'mystate', this.state.currentUserProfile );
		if ( ( null !== this.state.currentUserProfile ) ) {
		    name = this.state.currentUserProfile.user.name;
			email = this.state.currentUserProfile.user.email;
			gender = this.state.currentUserProfile.gender;
			city = this.state.currentUserProfile.city;
			address = this.state.currentUserProfile.address;
			subCategory = this.state.currentUserProfile.subCategory;
			subCatLevel2 = this.state.currentUserProfile.subCatLevel2;
		}
		return(
			<div className="container-scroller">
				<DashboardNav/>
				<div className="container-fluid page-body-wrapper">
					<DashboardSidebar/>
					<div className="col-9 grid-margin stretch-card">
						<div className="card">
							<div className="card-body">
								<h4 className="card-title">Profile</h4>
								<p className="card-description">
									Create or Update Profile
								</p>
								<form className="forms-sample" onSubmit={ this.fileUploadHandler } encType="multipart/form-data">
									<div className="form-group">
										<label htmlFor="exampleInputName1">Name</label>
										<input type="text" onChange={ this.onChange } className="form-control" id="exampleInputName1" placeholder="Name" defaultValue={ name } readOnly/>
									</div>
									<div className="form-group">
										<label htmlFor="exampleInputEmail3">Email address</label>
										<input type="email" onChange={ this.onChange } className="form-control" id="exampleInputEmail3" placeholder="Email" defaultValue={email} readOnly/>
									</div>
									<div className="form-group">
										<label htmlFor="exampleSelectGender">Category</label>
										<select className="form-control" onChange={ this.onChange } name="category" id="exampleSelectGender">
											<option value="shopping">Shopping</option>
											<option value="spa-and-saloon">Spa & Saloon</option>
											<option value="health-fitness">Health fitness</option>
											<option value="restraunt">Restraunt</option>
											<option value="movies">Movies</option>
											<option value="repairs">Repairs</option>
											<option value="real-estate">Real Estate</option>
											<option value="automobile">Automobile</option>
										</select>
									</div>
									<div className="form-group">
										<label htmlFor="exampleSelectGender">Sub Category</label>
										<select className="form-control" onChange={ this.onChange } name="subCategory" id="exampleSelectGender">
											<option value="shopping-sub">Shopping Sub</option>
											<option value="spa-sub">Spa Sub</option>
										</select>
									</div>
									<div className="form-group">
										<label htmlFor="exampleSelectGender">Sub Category Level2</label>
										<select className="form-control" onChange={ this.onChange } name="subCatLevel2" id="exampleSelectGender">
											<option value="shopping-sub-level2">Shopping Sub Level2</option>
											<option value="spa-sub-level2">Spa Sub Level2</option>
										</select>
									</div>
									<div className="form-group">
										<label htmlFor="exampleSelectGender">Gender</label>
										<select className="form-control" onChange={ this.onChange } name="gender" defaultValue={ gender } id="exampleSelectGender">
											<option>Male</option>
											<option>Female</option>
										</select>
									</div>
									<div className="form-group">
										<label>File upload</label><br/>
										<input type="file" name="img[]" onChange={this.fileSelectedHandler} className=""/>
									</div>
									<div className="form-group">
										<label htmlFor="exampleInputCity1">City</label>
										<input type="text" className="form-control" onChange={ this.onChange } name="city" defaultValue={city} id="exampleInputCity1" placeholder="Location"/>
									</div>
									<div className="form-group">
										<label htmlFor="exampleTextarea1">Address</label>
										<textarea className="form-control" onChange={ this.onChange } name="address" id="exampleTextarea1" rows="4" value={address}></textarea>
									</div>
									<button type="submit" className="btn btn-gradient-primary mr-2">Submit</button>
									<button className="btn btn-light">Cancel</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

DashboardProfiles.propTypes = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = ( state ) => ({
	auth: state.auth,
	errors: state.errors
});

export default connect( mapStateToProps  )( DashboardProfiles );