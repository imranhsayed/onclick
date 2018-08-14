import React, { Component } from  'react';
import $ from "jquery";
import axios from 'axios';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import DashboardNav from './../DashboardNav';
import DashboardSidebar from './../DashboardSidebar';

class DashboardProfiles extends Component {

	constructor() {
		super( ...arguments );
		this.state = {
			selectedFile: null,
			currentUserProfile: null,
			errors: {}
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

	componentWillReceiveProps( nextProps ) {
		if ( nextProps ) {
			this.setState( { errors: nextProps.errors } );
		}
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
		let name = '', email = '', business = '', category = '', subCategory = '', subCatLevel2 = '',
			description = '', state = '', gender = '', phone = '', city = '', address = '';
		event.preventDefault();
		const formData = new FormData();
		// console.log( this.state.selectedFile );
		// formData.append( 'image', this.state.selectedFile, this.state.selectedFile.name );
		// console.log( formData );

		// If we have previous profile get the previous profile data
		if ( ( null !== this.state.currentUserProfile ) ) {
			name = this.state.currentUserProfile.user.name;
			business = this.state.currentUserProfile.business;
			description = this.state.currentUserProfile.description;
			phone = this.state.currentUserProfile.phone;
			gender = this.state.currentUserProfile.gender;
			city = this.state.currentUserProfile.city;
			address = this.state.currentUserProfile.address;
			state = this.state.currentUserProfile.state;
			category = this.state.currentUserProfile.category;
			subCategory = this.state.currentUserProfile.subCategory;
			subCatLevel2 = this.state.currentUserProfile.subCatLevel2;
		}

		// Create an object profile whose property values will be equal to the new one if user has entered or the existing one if he hasn't.
		const profile = {
			handle: this.props.auth.user.id,
			business: ( this.state.business ) ? this.state.business : business,
			phone: ( this.state.phone ) ? this.state.phone : phone,
			gender: ( this.state.gender ) ? this.state.gender : gender,
			city: ( this.state.city ) ? this.state.city : city,
			state: ( this.state.state ) ? this.state.state : state,
			address: ( this.state.address ) ? this.state.address : address,
			category: ( this.state.category ) ? this.state.category : category,
			subCategory: ( this.state.subCategory ) ? this.state.subCategory : subCategory,
			subCatLevel2: ( this.state.subCatLevel2 ) ? this.state.subCatLevel2 : subCatLevel2,
			description: ( this.state.description ) ? this.state.description : description,
		};
		console.log( profile );

		// Save or update the data.
		axios.post( '/api/profile', profile )
			.then( res => {
				console.log( res );
				if ( 200 === res.status ) {
					console.log( 'came' );
					this.ocShowAlert( 'Profile Updated', '#3089cf' );
					this.setState({
						errors: {}
					});
					this.props.history.push( '/dashboard' );
				}
			} )
			.catch( ( error ) => {
				// console.log( error.response );

				this.ocShowAlert( 'Required fields missing', 'red' );
				this.setState( {
					errors: error.response.data
				} );
				console.log( 'errors', this.state.errors );
			} );

	};

	// showAlert Function
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
		let name = '', email = '', business = '', category = '', subCategory = '', subCatLevel2 = '',
			description = '', gender = '', city = '', phone = '', state = '', address = '';
		const { user } = this.props.auth;
		const errors = this.state.errors;
		name = user.name;
		email = user.email;
		if ( ( null !== this.state.currentUserProfile ) ) {
			business = this.state.currentUserProfile.business;
			phone = this.state.currentUserProfile.phone;
			gender = this.state.currentUserProfile.gender;
			city = this.state.currentUserProfile.city;
			state = this.state.currentUserProfile.state;
			address = this.state.currentUserProfile.address;
			category = this.state.currentUserProfile.category;
			subCategory = this.state.currentUserProfile.subCategory;
			subCatLevel2 = this.state.currentUserProfile.subCatLevel2;
			description = this.state.currentUserProfile.description;
		}
		return(
			<div className="container-scroller">
				<div id="oc-alert-container"></div>
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
										<input type="text" className="form-control" id="exampleInputName1" placeholder="Name" defaultValue={ name } readOnly/>
									</div>
									<div className="form-group">
										<label htmlFor="exampleInputName1">Email</label>
										<input type="email" className="form-control" id="exampleInputName1" placeholder="Name" defaultValue={ email } readOnly/>
									</div>

									<div className="form-group">
										<label htmlFor="exampleInputCity1">Business Name</label>
										<input type="text"
										       className={ classnames( 'form-control', {
											       'is-invalid': errors.business
										       } ) }
										       onChange={ this.onChange } name="business" defaultValue={business} id="exampleInputCity1" placeholder="Business Name"/>
										{ errors.business && ( <div className="invalid-feedback">{ errors.business }</div> ) }
									</div>

									<div className="form-group">
										<label htmlFor="exampleSelectGender">Category</label>
										<select
											className={ classnames( 'form-control', {
												'is-invalid': errors.category
											} ) }
											onChange={ this.onChange } name="category" id="exampleSelectGender">
											<option value="">Select Category</option>
											<option value="shopping">Shopping</option>
											<option value="spa-and-saloon">Spa & Saloon</option>
											<option value="health-fitness">Health fitness</option>
											<option value="restraunt">Restraunt</option>
											<option value="movies">Movies</option>
											<option value="repairs">Repairs</option>
											<option value="real-estate">Real Estate</option>
											<option value="automobile">Automobile</option>
										</select>
										{ errors.category && ( <div className="invalid-feedback">{ errors.category }</div> ) }
									</div>
									<div className="form-group">
										<label htmlFor="exampleSelectGender">Sub Category</label>
										<select className="form-control" onChange={ this.onChange } name="subCategory" id="exampleSelectGender">
											<option value="">Select Sub-Category</option>
											<option value="shopping-sub">Shopping Sub</option>
											<option value="spa-sub">Spa Sub</option>
										</select>
									</div>
									<div className="form-group">
										<label htmlFor="exampleSelectGender">Sub Category Level2</label>
										<select className="form-control" onChange={ this.onChange } name="subCatLevel2" id="exampleSelectGender">
											<option value="">Select Child-Category</option>
											<option value="shopping-sub-level2">Shopping Sub Level2</option>
											<option value="spa-sub-level2">Spa Sub Level2</option>
										</select>
									</div>
									<div className="form-group">
										<label htmlFor="exampleInputCity1">Business Description</label>
										<input type="text"
										       className={ classnames( 'form-control', {
											       'is-invalid': errors.description
										       } ) }
										       onChange={ this.onChange } name="description" defaultValue={description} id="exampleInputCity1" placeholder="Business Description"/>
										{ errors.description && ( <div className="invalid-feedback">{ errors.description }</div> ) }
									</div>
									<div className="form-group">
										<label htmlFor="exampleInputCity1">Phone/Mobile</label>
										<input type="text"
										       className={ classnames( 'form-control', {
											       'is-invalid': errors.phone
										       } ) }
										       onChange={ this.onChange } name="phone" defaultValue={phone} id="exampleInputCity1" placeholder="Phone/Mobile No"/>
										{ errors.phone && ( <div className="invalid-feedback">{ errors.phone }</div> ) }
									</div>
									<div className="form-group">
										<label htmlFor="exampleSelectGender">Gender</label>
										<select
											className={ classnames( 'form-control', {
												'is-invalid': errors.gender
											} ) }
											onChange={ this.onChange } name="gender" defaultValue={ gender } id="exampleSelectGender">
											<option value="">Select Gender</option>
											<option value="male">Male</option>
											<option value="female">Female</option>
										</select>
										{ errors.gender && ( <div className="invalid-feedback">{ errors.gender }</div> ) }
									</div>
									<div className="form-group">
										<label htmlFor="exampleInputCity1">City</label>
										<input type="text"
										       className={ classnames( 'form-control', {
											       'is-invalid': errors.city
										       } ) }
										       onChange={ this.onChange } name="city" defaultValue={city} id="exampleInputCity1" placeholder="Location"/>
										{ errors.city && ( <div className="invalid-feedback">{ errors.city }</div> ) }
									</div>
									<div className="form-group">
										<label htmlFor="exampleInputCity1">State</label>
										<input type="text"
										       className={ classnames( 'form-control', {
											       'is-invalid': errors.state
										       } ) }
										       onChange={ this.onChange } name="state" defaultValue={state} id="exampleInputCity1" placeholder="State"/>
										{ errors.state && ( <div className="invalid-feedback">{ errors.state }</div> ) }
									</div>
									<div className="form-group">
										<label htmlFor="exampleInputCity1">Address</label>
										<input type="text"
										       className={ classnames( 'form-control', {
											       'is-invalid': errors.address
										       } ) }
										       onChange={ this.onChange } name="address" defaultValue={address} id="exampleInputCity1" placeholder="Address"/>
										{ errors.address && ( <div className="invalid-feedback">{ errors.address }</div> ) }
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
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = ( state ) => ({
	auth: state.auth,
	profile: state.profile,
	errors: state.errors
});

export default connect( mapStateToProps  )( DashboardProfiles );