import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { addPost } from '../actions/postActions';
import $ from "jquery";

class PostForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			name: '',
			email: '',
			userId: '',
			category: '',
			subCategory: '',
			subCatLevel2: '',
			description: '',
			budgetMin: '',
			budgetMax: '',
			phone: '',
			area: '',
			city: '',
			state: '',
			address: '',
			errors: {}
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentWillReceiveProps(newProps) {
		if (newProps.errors) {
			this.setState({ errors: newProps.errors });
		}
	}

	onSubmit(e) {
		e.preventDefault();
		const { user } = this.props.auth;

		const newPost = {
			title: this.state.title,
			name: user.name,
			email: user.email,
			userId: user.id,
			category: this.state.category,
			subCategory: this.state.subCategory,
			subCatLevel2: this.state.subCatLevel2,
			description: this.state.description,
			budgetMin: this.state.budgetMin,
			budgetMax: this.state.budgetMax,
			phone: this.state.phone,
			area: this.state.area,
			city: this.state.city,
			state: this.state.state,
			address: this.state.address,
		};
		console.log( newPost );
		console.log( Object.keys( this.state.errors ).length );

		this.props.addPost(newPost);

		// If all fields are filled , show success message and remove all errors and make all input blank
		if ( newPost.title && newPost.category && newPost.description && newPost.phone && newPost.area && newPost.city && newPost.state && newPost.address ) {
			this.setState({
				title: '',
				name: '',
				email: '',
				userId: '',
				category: '',
				subCategory: '',
				subCatLevel2: '',
				description: '',
				budgetMin: '',
				budgetMax: '',
				phone: '',
				area: '',
				city: '',
				state: '',
				address: '',
				errors: {}
			});
			this.ocShowAlert( 'Job Successfully Posted', '#3089cf' );
		}
	}

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

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		const { errors } = this.state;

		return (
			<div className="container" style={{ marginLeft: '36px' }}>
				<div id="oc-alert-container"></div>
				<br/>
				<h4>Post a new Job</h4><br/>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label htmlFor="exampleSelectGender">Job Title</label>
						<input
							className={ classnames( 'form-control', {
								'is-invalid': errors.title
							} ) }
							placeholder="Job Title"
							name="title"
							value={this.state.title}
							onChange={this.onChange}
						/>
						{ errors.title && ( <div className="invalid-feedback">{ errors.title }</div> ) }
					</div>
					<div className="form-group">
						<label htmlFor="exampleSelectGender">Category</label>
						<select
							className={ classnames( 'form-control', {
								'is-invalid': errors.category
							} ) }
							onChange={ this.onChange } name="category" value={this.state.category} id="exampleSelectGender">
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
						<select className="form-control" onChange={ this.onChange } value={this.state.subCategory} name="subCategory" id="exampleSelectGender">
							<option value="">Select Sub-Category</option>
							<option value="shopping-sub">Shopping Sub</option>
							<option value="spa-sub">Spa Sub</option>
						</select>
					</div>
					<div className="form-group">
						<label htmlFor="exampleSelectGender">Sub Category Level2</label>
						<select className="form-control" onChange={ this.onChange } value={this.state.subCatLevel2} name="subCatLevel2" id="exampleSelectGender">
							<option value="">Select Child-Category</option>
							<option value="shopping-sub-level2">Shopping Sub Level2</option>
							<option value="spa-sub-level2">Spa Sub Level2</option>
						</select>
					</div>
					<div className="form-group">
						<label htmlFor="exampleInputCity1">Budget Min</label>
						<input type="text" className="form-control" onChange={ this.onChange } name="budgetMin" value={this.state.budgetMin} id="exampleInputCity1" placeholder="Budget Min"/>

					</div>
					<div className="form-group">
						<label htmlFor="exampleInputCity1">Budget Max</label>
						<input type="text" className="form-control" onChange={ this.onChange } name="budgetMax" value={this.state.budgetMax} id="exampleInputCity1" placeholder="Budget Max"/>
					</div>
					<div className="form-group">
						<label htmlFor="exampleInputCity1">Business Description</label>
						<input type="text"
						       className={ classnames( 'form-control', {
							       'is-invalid': errors.description
						       } ) }
						       onChange={ this.onChange } name="description" value={this.state.description} id="exampleInputCity1" placeholder="Business Description"/>
						{ errors.description && ( <div className="invalid-feedback">{ errors.description }</div> ) }
					</div>
					<div className="form-group">
						<label htmlFor="exampleInputCity1">Phone/Mobile</label>
						<input type="text"
						       className={ classnames( 'form-control', {
							       'is-invalid': errors.phone
						       } ) }
						       onChange={ this.onChange } name="phone" value={this.state.phone} id="exampleInputCity1" placeholder="Phone/Mobile No"/>
						{ errors.phone && ( <div className="invalid-feedback">{ errors.phone }</div> ) }
					</div>
					<div className="form-group">
						<label htmlFor="exampleInputCity1">Area</label>
						<input type="text"
						       className={ classnames( 'form-control', {
							       'is-invalid': errors.area
						       } ) }
						       onChange={ this.onChange } name="area" value={this.state.area} id="exampleInputCity1" placeholder="Location"/>
						{ errors.area && ( <div className="invalid-feedback">{ errors.area }</div> ) }
					</div>
					<div className="form-group">
						<label htmlFor="exampleInputCity1">City</label>
						<input type="text"
						       className={ classnames( 'form-control', {
							       'is-invalid': errors.city
						       } ) }
						       onChange={ this.onChange } name="city" value={this.state.city} id="exampleInputCity1" placeholder="Location"/>
						{ errors.city && ( <div className="invalid-feedback">{ errors.city }</div> ) }
					</div>
					<div className="form-group">
						<label htmlFor="exampleInputCity1">State</label>
						<input type="text"
						       className={ classnames( 'form-control', {
							       'is-invalid': errors.state
						       } ) }
						       onChange={ this.onChange } name="state" value={this.state.state} id="exampleInputCity1" placeholder="State"/>
						{ errors.state && ( <div className="invalid-feedback">{ errors.state }</div> ) }
					</div>
					<div className="form-group">
						<label htmlFor="exampleInputCity1">Address</label>
						<input type="text"
						       className={ classnames( 'form-control', {
							       'is-invalid': errors.address
						       } ) }
						       onChange={ this.onChange } name="address" value={this.state.address} id="exampleInputCity1" placeholder="Address"/>
						{ errors.address && ( <div className="invalid-feedback">{ errors.address }</div> ) }
					</div>
					<button type="submit" className="btn btn-dark">
						Submit
					</button>
				</form>
			</div>
		);
	}
}

PostForm.propTypes = {
	addPost: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, { addPost })(PostForm);
