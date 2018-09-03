import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import { getCategories } from './../actions/categoryActions';
import _ from 'lodash';
import Banner from "./layouts/banner/Banner";

class Categories extends Component {

	componentDidMount() {
		const { category } = this.props;
		console.log( 'categoryOk', category );
		this.props.getCategories();
	}

	/**
	 * Build an object of Categories with sub categories
	 * nestedCats : will contain the parent categories, inside of which you will have 'child' categories
	 * inside of which you will have its child categories.
	 * @param categories
	 * @return {Array}
	 */
	nestCategories( categories ) {
		const nestedCats = [];
		const addedCats = [];

		// Get parent cats.
		_.each( categories, ( cat ) => {
			if ( '0' === cat.parentCatId ) {
				nestedCats.push( cat );
				addedCats[ cat._id ] = true;
			}
		} );

		// Set child loop
		_.each( categories, ( cat ) => {
			if ( '0' !== cat.parentCatId ) {
				_.each ( nestedCats, ( parentCat, index ) => {
					if ( cat.parentCatId === parentCat._id ) {
					    nestedCats[ index ].child = nestedCats[ index ].child || [];
						nestedCats[ index ].child.push( cat );
						addedCats[ cat._id ] = true;
					}
				} );
			}
		} );

		// Set grand children.
		_.each( categories, ( cat ) => {
			if ( ! addedCats[ cat._id ] ) {
			    _.each( nestedCats, ( parentCat ) => {
			    	if ( parentCat.child ) {
					    _.each( parentCat.child, ( childCat ) => {
							if ( cat.parentCatId === childCat._id ) {
								childCat.child = childCat.child || [];
								childCat.child.push( cat );
							}
					    } )
			    	}
			    } )
			}
		} );

		return nestedCats;
	}

	render(){
		const { category } = this.props;
		let nestedCats, categoryOptions = '';
		nestedCats = this.nestCategories( category.categories );

		// Get Parent categories options markup.
		if ( null !== nestedCats && Object.keys( nestedCats ).length ) {
			categoryOptions = nestedCats.map( parentCategory => (
				<div key={parentCategory._id} className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
					<div className="card mb-4">
						<h3 className="card-header">
							<Link to={`/category-job-listing/category/${parentCategory.categoryName}/${parentCategory._id}`}>{ parentCategory.categoryName }</Link>
						</h3>
						<ul className="card-body oc-categories-card" id={parentCategory._id}>
							{ parentCategory.child &&
							parentCategory.child.map( subCat => (
									<li key={subCat._id} >
										<Link to={`/category-job-listing/subCat/${subCat.categoryName}/${subCat._id}`} style={{ display: 'block', padding: '5px 0', color: '#555' }}>
											{ subCat.categoryName }
										</Link>
										<ul>
											{ subCat.child &&
												subCat.child.map( grandChild => (
													<li key={grandChild._id}>
														<Link to={`/category-job-listing/grandChild/${grandChild.categoryName}/${grandChild._id}`} style={{ display: 'block', padding: '5px 0', color: '#555' }}>
															{ grandChild.categoryName }
														</Link>
													</li>
												) )
											}
										</ul>
									</li>
								) )
							}
						</ul>
					</div>
				</div>
			) );
		} else {
			categoryOptions = <img src="./../img/spinner.gif" style={{ width: '200px', margin: 'auto', display: 'block' }}/>;
		}

		return(
			<div>
				<Navbar/>
				<Banner heading={'Categories'}/>
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
	getCategories: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	category: state.category
});

export default connect( mapStateToProps, { getCategories }  )( Categories );
