import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CategoriesBanner from './layouts/categories/CategoriesBanner';
import classnames from "classnames";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import { getParentCats } from './../actions/categoryActions';
import { getSubCats } from './../actions/categoryActions';
import { getSubCatsLvl2 } from './../actions/categoryActions';
import $ from 'jquery';

class Categories extends Component {

	componentDidMount() {
		this.props.getParentCats();
	}

	getSubCategories( id ) {
		this.props.getSubCats( id );
		// document.getElementById( id ).append( content );
		$( '.oc-categories-card' ).slideUp();
		$( '#' + id ).slideToggle();
	}

	render(){

		const { category } = this.props;
		console.log( 'cat', category );

		let parentCategories = '', categoryOptions = '';



		// Get Parent categories options
		if ( null !== category.parentCats && Object.keys( category.parentCats ).length ) {
			parentCategories = category.parentCats;
			categoryOptions = parentCategories.map( item => (
				<div key={item._id} className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
					<div className="card mb-4">
						<h3 className="card-header">
							<Link to={`/category-job-listing/category/${item._id}`}>{ item.categoryName }</Link>
							<i class="mdi mdi-arrow-down-bold-circle" onClick={ this.getSubCategories.bind( this, item._id ) } style={{ cursor: 'pointer', marginLeft: '14px' }}></i>
						</h3>
						<div className="card-body oc-categories-card" id={item._id}>
							{ null !== category.subCats &&
								category.subCats.map( subCat => (
									<Link key={subCat._id} to={`/category-job-listing/subCat/${subCat._id}`} style={{ display: 'block', padding: '5px 0', color: '#555' }}>{ subCat.categoryName }</Link>
								) )
							}
						</div>
					</div>
				</div>
			) );
		} else {
			categoryOptions = <img src="./../img/spinner.gif" style={{ width: '200px', margin: 'auto', display: 'block' }}/>;
		}

		// Get sub categories options
		// if ( null !== category.subCats && Object.keys( category.subCats ).length ) {
		// 	subCategories = category.subCats;
		// 	subCatsOptions = subCategories.map( item => (
		// 		<option key={item._id} value={item._id}>{ item.categoryName }</option>
		// 	) );
		// }
		//
		// // Get sub categories lvl2 options
		// if ( null !== category.subCatsLvl2 && Object.keys( category.subCatsLvl2 ).length ) {
		// 	subCategoriesLvl2 = category.subCatsLvl2;
		// 	// subCatsLvl2Options = subCategoriesLvl2.map( item => (
		// 	// 	<option key={item._id} value={item._id}>{ item.categoryName }</option>
		// 	// ) );
		// }

		return(
			<div>
				<Navbar/>
				<CategoriesBanner/>
				<div className="container forms-section">
					<div className="row forms-section-row" >
						{ categoryOptions }
					</div>
				</div>
				<Footer/>
			</div>
		);
	}
}

Categories.propTypes = {
	getParentCats: PropTypes.func.isRequired,
	getSubCats: PropTypes.func.isRequired,
	getSubCatsLvl2: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	category: state.category
});

export default connect( mapStateToProps, { getParentCats, getSubCats, getSubCatsLvl2 }  )( Categories );
