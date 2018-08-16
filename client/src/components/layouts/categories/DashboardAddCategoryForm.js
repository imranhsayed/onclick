import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from "classnames";
import {addCategory} from "../../../actions/categoryActions";
import $ from "jquery";


class DashboardAddCategoryForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			categoryName: '',
			parentCatId: '',
			parentCatName: '',
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

		const newCategory = {
			categoryName: this.state.categoryName,
			parentCatId: this.state.parentCatId,
			parentCatName: this.state.parentCatName,
		};
		// console.log( Object.keys( this.state.errors ).length );

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

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	render(){

		const { errors } = this.state;

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
							<option value="shopping">Shopping</option>
							<option value="spa-and-saloon">Spa & Saloon</option>
							<option value="health-fitness">Health fitness</option>
							<option value="restraunt">Restraunt</option>
							<option value="movies">Movies</option>
							<option value="repairs">Repairs</option>
							<option value="real-estate">Real Estate</option>
							<option value="automobile">Automobile</option>
						</select>
						{ errors.parentCatId && ( <div className="invalid-feedback">{ errors.parentCatId }</div> ) }
					</div>
					<div className="form-group">
						<label htmlFor="exampleInputCity1">Parent Category Name</label>
						<input type="text"
								className="form-control"
						       onChange={ this.onChange } name="parentCatName" value={this.state.parentCatName} id="exampleInputCity1" placeholder="Parent Cat Name"/>
					</div>
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
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, { addCategory })(DashboardAddCategoryForm);