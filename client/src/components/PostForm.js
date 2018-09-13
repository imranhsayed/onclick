import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { addPost } from '../actions/postActions';
import { getParentCats } from '../actions/categoryActions';
import { getSubCats } from '../actions/categoryActions';
import { getSubCatsLvl2 } from '../actions/categoryActions';
import { getPost } from "../actions/postActions";
import $ from "jquery";

class PostForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			name: '',
			email: '',
			userId: '',
			userType: '',
			category: '',
			subCategory: '',
			subCatLevel2: '',
			categoryId: '',
			subCategoryId: '',
			subCatLevel2Id: '',
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

	componentDidMount() {
		this.props.getParentCats();
		this.props.getPost();
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
			userId: ( user.id ) ? user.id : user._id,
			userType: user.type,
			category: this.state.category,
			subCategory: this.state.subCategory,
			subCatLevel2: this.state.subCatLevel2,
			categoryId: this.state.categoryId,
			subCategoryId: this.state.subCategoryId,
			subCatLevel2Id: this.state.subCatLevel2Id,
			description: this.state.description,
			budgetMin: this.state.budgetMin,
			budgetMax: this.state.budgetMax,
			bidIds: [],
			bidUserIds: [],
			phone: this.state.phone,
			area: this.state.area,
			city: this.state.city,
			state: this.state.state,
			address: this.state.address,
		};
		console.log( 'newpost', newPost );
		// console.log( Object.keys( this.state.errors ).length );

		this.props.addPost(newPost);

		// If all fields are filled , show success message and remove all errors and make all input blank
		if ( newPost.title && newPost.category && newPost.description && newPost.phone && newPost.area && newPost.city && newPost.state && newPost.address ) {
			this.setState({
				title: '',
				name: '',
				email: '',
				userId: '',
				userType: '',
				category: '',
				subCategory: '',
				subCatLevel2: '',
				categoryId: '',
				subCategoryId: '',
				subCatLevel2Id: '',
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

		// window.location.href = '/post-job-listings';
		// window.location.href = `/post-job-listings/${}`;

	}

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

	onChange(event) {

		this.setState({ [event.target.name]: event.target.value });

		// If category is selected then call the getSubCats() to get all the subcategories for the selected parent id.
		if( 'category' === event.target.name ) {
			let categoryId = event.target.value;
			let selectedName = $( '.' + categoryId ).attr( 'data-catname' );

			this.setState( {
				category: selectedName,
				categoryId: categoryId
			} );

			this.props.getSubCats( categoryId );
		}

		// If subCategory is selected then call the getSubCatsLvl2() to get all the subcategories lvl2 for the selected parent id.
		if( 'subCategory' === event.target.name ) {
			let subCatId = event.target.value,
				selectedName = $( '.' + subCatId ).attr( 'data-catname' );
			this.setState( {
				subCategory: selectedName,
				subCategoryId: subCatId
			} );
			this.props.getSubCatsLvl2( subCatId );
		}
		// If subCategory is selected then set the state for the subCatLevel2Id to the id of the subCatLevel2 selected.
		if( 'subCatLevel2' === event.target.name ) {
			let subCatLvl2Id = event.target.value,
				selectedName = $( '.' + subCatLvl2Id ).attr( 'data-catname' );
			this.setState( {
				subCatLevel2: selectedName,
				subCatLevel2Id: subCatLvl2Id
			} );
		}
	}

	render() {
		const { errors } = this.state;
		const { category } = this.props;

		let parentCategories = '', parentCatsOptions = '', subCategories = '', subCatsOptions = '', subCategoriesLvl2 = '', subCatsLvl2Options = '';

		// Get Parent categories options
		if ( null !== category.parentCats && Object.keys( category.parentCats ).length ) {
			parentCategories = category.parentCats;
			parentCatsOptions = parentCategories.map( item => (
				<option key={item._id} className={item._id} value={item._id} data-catname={ item.categoryName }>{ item.categoryName }</option>
			) );
		}

		// Get sub categories options
		if ( null !== category.subCats && Object.keys( category.subCats ).length ) {
			subCategories = category.subCats;
			subCatsOptions = subCategories.map( item => (
				<option key={item._id} className={item._id} value={item._id} data-catname={ item.categoryName }>{ item.categoryName }</option>
			) );
		}

		// Get sub categories lvl2 options
		if ( null !== category.subCatsLvl2 && Object.keys( category.subCatsLvl2 ).length ) {
			subCategoriesLvl2 = category.subCatsLvl2;
			subCatsLvl2Options = subCategoriesLvl2.map( item => (
				<option key={item._id} className={item._id} value={item._id} data-catname={ item.categoryName }>{ item.categoryName }</option>
			) );
		}

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
							onChange={ this.onChange } name="category" value={this.state.categoryId} id="exampleSelectCat">
							<option value="">Select Category</option>
							{parentCatsOptions}
						</select>
						{ errors.category && ( <div className="invalid-feedback">{ errors.category }</div> ) }
					</div>
					<div className="form-group">
						<label htmlFor="exampleSelectGender">Sub Category</label>
						<select className="form-control" onChange={ this.onChange } value={this.state.subCategoryId} name="subCategory" id="exampleSelectSubCat">
							<option value="">Select Sub-Category</option>
							{subCatsOptions}
						</select>
					</div>
					<div className="form-group">
						<label htmlFor="exampleSelectGender">Sub Category Level2</label>
						<select className="form-control" onChange={ this.onChange } value={this.state.subCatLevel2Id} name="subCatLevel2" id="exampleSelectSubCatLvl2">
							<option value="">Select Child-Category</option>
							{subCatsLvl2Options}
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
	getParentCats: PropTypes.func.isRequired,
	getSubCats: PropTypes.func.isRequired,
	getSubCatsLvl2: PropTypes.func.isRequired,
	getPost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
	category: state.category,
	post: state.post
});

export default connect( mapStateToProps, { addPost, getParentCats, getSubCats, getSubCatsLvl2, getPost } )( PostForm );
