import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DashboardNav from './layouts/dashboard/DashboardNav';
import DashboardSidebar from './layouts/dashboard/DashboardSidebar';
import { getPost } from "./../actions/postActions";
import { updatePost } from './../actions/postActions';
import classnames from "classnames";
import { getParentCats } from "../actions/categoryActions";
import { getSubCats } from "../actions/categoryActions";
import { getSubCatsLvl2 } from "../actions/categoryActions";
import $ from "jquery";

class DashboardSinglePost extends Component{

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

	/**
	 * When the component receives props, set the new state values of post items to the existing post item values. and also set state for errors, when errors are received.
	 * @param {obj} newProps
	 */
	componentWillReceiveProps(newProps) {
		let existingPost;
		if (newProps.errors) {
			this.setState({ errors: newProps.errors });
		}
		if ( newProps.post.post ) {
			existingPost = newProps.post.post;
			this.setState({
				title: existingPost.title,
				name: existingPost.name,
				email: existingPost.email,
				userId: existingPost.userId,
				category: existingPost.category,
				subCategory: existingPost.subCategory,
				subCatLevel2: existingPost.subCatLevel2,
				categoryId: existingPost.categoryId,
				subCategoryId: existingPost.subCategoryId,
				subCatLevel2Id: existingPost.subCatLevel2Id,
				description: existingPost.description,
				budgetMin: existingPost.budgetMin,
				budgetMax: existingPost.budgetMax,
				phone: existingPost.phone,
				area: existingPost.area,
				city: existingPost.city,
				state: existingPost.state,
				address: existingPost.address
			})
		}
	}

	componentDidMount() {
		this.props.getPost( this.props.match.params.id );
		this.props.getParentCats();
	}

	onSubmit(e) {
		e.preventDefault();
		let postId = this.props.match.params.id;

		const updatedPost = {
			title: this.state.title,
			category: this.state.category,
			subCategory: this.state.subCategory,
			subCatLevel2: this.state.subCatLevel2,
			categoryId: this.state.categoryId,
			subCategoryId: this.state.subCategoryId,
			subCatLevel2Id: this.state.subCatLevel2Id,
			description: this.state.description,
			budgetMin: this.state.budgetMin,
			budgetMax: this.state.budgetMax,
			phone: this.state.phone,
			area: this.state.area,
			city: this.state.city,
			state: this.state.state,
			address: this.state.address,
		};
		// console.log( 'updated post', updatedPost );
		// console.log( Object.keys( this.state.errors ).length );

		this.props.updatePost( updatedPost, postId, this.props.history );

		// If all fields are filled , show success message and remove all errors and make all input blank
		// if ( updatedPost.title && updatedPost.category && updatedPost.description && updatedPost.phone && updatedPost.area && updatedPost.city && updatedPost.state && updatedPost.address ) {
		// 	this.setState({
		// 		title: '',
		// 		name: '',
		// 		email: '',
		// 		userId: '',
		// 		category: '',
		// 		subCategory: '',
		// 		subCatLevel2: '',
		// 		categoryId: '',
		// 		subCategoryId: '',
		// 		subCatLevel2Id: '',
		// 		description: '',
		// 		budgetMin: '',
		// 		budgetMax: '',
		// 		phone: '',
		// 		area: '',
		// 		city: '',
		// 		state: '',
		// 		address: '',
		// 		errors: {}
		// 	});
		// 	this.ocShowAlert( 'Job Successfully Updated', '#3089cf' );
		// }
		this.ocShowAlert( 'Job Successfully Updated', '#3089cf' );
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

	onChange(event) {
		this.setState({ [event.target.name]: event.target.value });

		// If category is selected then call the getSubCats() to get all the subcategories for the selected parent id.
		if( 'category' === event.target.name ) {
			let categoryId = event.target.value;
			let selectedName = $( '.' + categoryId ).attr( 'data-catname' );
			console.log( categoryId, selectedName  );

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

	render(){

		const { post, loading } = this.props.post;
		const { errors } = this.state;
		const { category } = this.props;
		console.log( 'catycat', category );
		let postContent;

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

		if ( null === post || loading || ! Object.keys( post ).length ) {
			postContent = <img src="./../img/spinner.gif" style={{ width: '200px', margin: 'auto', display: 'block' }} alt="spinner"/>;
		} else {
			postContent = (
				<div className="container" style={{ marginLeft: '36px' }}>
					<div id="oc-alert-container"></div>
					<br/>
					<h4>Edit Job</h4><br/>
					<form onSubmit={this.onSubmit}>
						<div className="form-group">
							<label htmlFor="exampleSelectGender">Job Title</label>
							<input
								className={ classnames( 'form-control', {
									'is-invalid': errors.title
								} ) }
								placeholder={post.title}
								name="title"
								value={this.state.title}
								onChange={this.onChange}
							/>
							{ errors.title && ( <div className="invalid-feedback">{ errors.title }</div> ) }
						</div>
						<div className="form-group">
							<label htmlFor="exampleSelectGender">Selected Category: { post.category }</label>
							<select
								className={ classnames( 'form-control', {
									'is-invalid': errors.category
								} ) }
								onChange={ this.onChange } name="category" value={this.state.categoryId} id="exampleSelectGender">
								<option value="">Change Category</option>
								{parentCatsOptions}
							</select>
							{ errors.category && ( <div className="invalid-feedback">{ errors.category }</div> ) }
						</div>
						<div className="form-group">
							<label htmlFor="exampleSelectGender">Selected Sub Category: { post.subCategory }</label>
							<select className="form-control" onChange={ this.onChange } value={this.state.subCategoryId} name="subCategory" id="exampleSelectGender">
								<option value="">Change Sub-Category</option>
								{subCatsOptions}
							</select>
						</div>
						<div className="form-group">
							<label htmlFor="exampleSelectGender">Selected Sub Category Level2: { post.subCatLevel2 }</label>
							<select className="form-control" onChange={ this.onChange } value={this.state.subCatLevel2Id} name="subCatLevel2" id="exampleSelectGender">
								<option value="">Change Child-Category</option>
								{subCatsLvl2Options}
							</select>
						</div>
						<div className="form-group">
							<label htmlFor="exampleInputCity1">Budget Min</label>
							<input type="text" className="form-control" onChange={ this.onChange } name="budgetMin" value={this.state.budgetMin} id="exampleInputCity1" placeholder={post.budgetMin}/>

						</div>
						<div className="form-group">
							<label htmlFor="exampleInputCity1">Budget Max</label>
							<input type="text" className="form-control" onChange={ this.onChange } name="budgetMax" value={this.state.budgetMax} id="exampleInputCity1" placeholder={post.budgetMax}/>
						</div>
						<div className="form-group">
							<label htmlFor="exampleInputCity1">Business Description</label>
							<input type="text"
							       className={ classnames( 'form-control', {
								       'is-invalid': errors.description
							       } ) }
							       onChange={ this.onChange } name="description" value={this.state.description} id="exampleInputCity1" placeholder={post.description}/>
							{ errors.description && ( <div className="invalid-feedback">{ errors.description }</div> ) }
						</div>
						<div className="form-group">
							<label htmlFor="exampleInputCity1">Phone/Mobile</label>
							<input type="text"
							       className={ classnames( 'form-control', {
								       'is-invalid': errors.phone
							       } ) }
							       onChange={ this.onChange } name="phone" value={this.state.phone} id="exampleInputCity1" placeholder={post.phone}/>
							{ errors.phone && ( <div className="invalid-feedback">{ errors.phone }</div> ) }
						</div>
						<div className="form-group">
							<label htmlFor="exampleInputCity1">Area</label>
							<input type="text"
							       className={ classnames( 'form-control', {
								       'is-invalid': errors.area
							       } ) }
							       onChange={ this.onChange } name="area" value={this.state.area} id="exampleInputCity1" placeholder={post.area}/>
							{ errors.area && ( <div className="invalid-feedback">{ errors.area }</div> ) }
						</div>
						<div className="form-group">
							<label htmlFor="exampleInputCity1">City</label>
							<input type="text"
							       className={ classnames( 'form-control', {
								       'is-invalid': errors.city
							       } ) }
							       onChange={ this.onChange } name="city" value={this.state.city} id="exampleInputCity1" placeholder={post.city}/>
							{ errors.city && ( <div className="invalid-feedback">{ errors.city }</div> ) }
						</div>
						<div className="form-group">
							<label htmlFor="exampleInputCity1">State</label>
							<input type="text"
							       className={ classnames( 'form-control', {
								       'is-invalid': errors.state
							       } ) }
							       onChange={ this.onChange } name="state" value={this.state.state} id="exampleInputCity1" placeholder={post.state}/>
							{ errors.state && ( <div className="invalid-feedback">{ errors.state }</div> ) }
						</div>
						<div className="form-group">
							<label htmlFor="exampleInputCity1">Address</label>
							<input type="text"
							       className={ classnames( 'form-control', {
								       'is-invalid': errors.address
							       } ) }
							       onChange={ this.onChange } name="address" value={this.state.address} id="exampleInputCity1" placeholder={post.address}/>
							{ errors.address && ( <div className="invalid-feedback">{ errors.address }</div> ) }
						</div>
						<button type="submit" className="btn btn-dark">
							Update
						</button>
					</form>
				</div>
			)
		}

		return (
			<div className="container-scroller">
				<DashboardNav/>
				<div className="container-fluid page-body-wrapper">
					<DashboardSidebar/>
					{ postContent }
				</div>
			</div>
		);
	}
}

DashboardSinglePost.propTypes = {
	getPost: PropTypes.func.isRequired,
	updatePost: PropTypes.func.isRequired,
	getParentCats: PropTypes.func.isRequired,
	getSubCats: PropTypes.func.isRequired,
	getSubCatsLvl2: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = ( state ) => ({
	post: state.post,
	auth: state.auth,
	errors: state.errors,
	category: state.category
});

export default connect( mapStateToProps, { getPost, updatePost, getParentCats, getSubCats, getSubCatsLvl2 } )( DashboardSinglePost );