import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from "classnames";
import { addCategory } from "../../../actions/categoryActions";
import { getCategories } from '../../../actions/categoryActions';
import { getCategory } from '../../../actions/categoryActions';
import $ from "jquery";


class DashboardAddCategoryForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			categoryName: '',
			parentCatId: '',
			parentCatName: '',
			existingCategories: '',
			errors: {}
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentWillReceiveProps(newProps) {
		if (newProps.errors) {
			this.setState({ errors: newProps.errors });
		}
		if (newProps.category.category) {
			this.setState({ parentCatName: newProps.category.category.categoryName });
		}
	}
	
	componentDidMount() {
		this.props.getCategories();
	}

	onSubmit(e) {
		e.preventDefault();

		const newCategory = {
			categoryName: this.state.categoryName,
			parentCatId: ( this.state.parentCatId ) ? this.state.parentCatId : '0',
			parentCatName: this.state.parentCatName,
		};

		this.props.addCategory( newCategory, this.props.history );

		// If all fields are filled , show success message and remove all errors and make all input blank
		if ( newCategory.categoryName && newCategory.parentCatId ) {
			this.setState({
				categoryName: '',
				parentCatId: '',
				parentCatName: '',
				errors: {}
			});
			this.ocShowAlert( 'New Category Added', '#3089cf' );
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

	onChange( event ) {
		// When the parent cat id is selected call the getCategory() to get category for this id.
		if ( 'parentCatId' === event.target.name ) {
			let selectedCatId = event.target.value;
			this.props.getCategory( selectedCatId );
		}
		this.setState({ [event.target.name]: event.target.value });
	}

	render(){

		const { errors } = this.state;
		let categoryOptions = '', selectedParentCatName;

		// Pull the category out of the props, which contains existing categories.
		const { categories } = this.props.category;
		const { parentCatName } = this.state;

		if ( null === categories || ! Object.keys( categories ).length ) {
			categoryOptions = '';
		} else {
			categoryOptions = categories.map( ( item ) => (
				<option key={ item._id } value={item._id}>{item.categoryName}</option>
			) );
		}

		return(
			<div className="container" style={{ marginLeft: '36px' }}>
				<div id="oc-alert-container"></div>
				<br/>
				<h4>Add a new Category</h4><br/>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label htmlFor="exampleSelectGender">Category Title</label>
						<input
							className={ classnames( 'form-control', {
								'is-invalid': errors.categoryName
							} ) }
							placeholder="Category Title"
							name="categoryName"
							value={this.state.categoryName}
							onChange={this.onChange}
						/>
						{ errors.categoryName && ( <div className="invalid-feedback">{ errors.categoryName }</div> ) }
					</div>
					<div className="form-group">
						<label htmlFor="exampleSelectGender">Parent Category</label>
						<select
							className={ classnames( 'form-control', {
								'is-invalid': errors.parentCatId
							} ) }
							onChange={ this.onChange } name="parentCatId" value={this.state.parentCatId} id="exampleSelectGender">
							<option value="">Select Category</option>
							{categoryOptions}
						</select>
						{ errors.parentCatId && ( <div className="invalid-feedback">{ errors.parentCatId }</div> ) }
					</div>
					{/*<div className="form-group">*/}
						{/*<label htmlFor="exampleInputCity1">Parent Category Name</label>*/}
						{/*<input type="text"*/}
								{/*className="form-control"*/}
						       {/*onChange={ this.onChange } name="parentCatName" value={this.state.parentCatName} id="exampleInputCity1" placeholder="Parent Cat Name"/>*/}
					{/*</div>*/}
					<button type="submit" className="btn btn-dark">
						Submit
					</button>
				</form>
			</div>
		);
	};
}

DashboardAddCategoryForm.propTypes = {
	addCategory: PropTypes.func.isRequired,
	getCategories: PropTypes.func.isRequired,
	getCategory: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	category: state.category,
	errors: state.errors
});

export default connect(mapStateToProps, { addCategory, getCategories, getCategory })( DashboardAddCategoryForm );