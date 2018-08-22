import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from "react-redux";
import {getCategories} from "../../../actions/categoryActions";
import PropTypes from "prop-types";
import _ from 'lodash';

class ProfileListingCategories extends Component {

	componentDidMount() {
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

	render() {

		const { category } = this.props;
		let nestedCats, categoryOptions = '';
		nestedCats = this.nestCategories( category.categories );
		console.log( 'nestedCats', nestedCats );

		if ( null !== nestedCats && Object.keys( nestedCats ).length ) {
		    categoryOptions = nestedCats &&

			    nestedCats.map( parentCategory => (
				    <div key={parentCategory._id} className="row p-0" style={{width: '510px'}}>
					    <div className="col-12 p-0">
						    <Link to={`/category-job-listing/category/${parentCategory.categoryName}/${parentCategory._id}`} style={{ color: '#00a7e0'}}>{ parentCategory.categoryName }</Link>
						    <button className="btn filter-list-btn listing-cat-link-btn text-left" type="button" data-toggle="collapse" data-target={`#${parentCategory._id}`} style={{ marginLeft: '5px', marginTop: '5px', color: '#555' }} aria-expanded="false" aria-controls="colors-filter">
							     +</button>
						    <div className="collapse" id={parentCategory._id}>
								    { parentCategory.child && (

								    	parentCategory.child.map( subCat => (
											<ul key={subCat._id} style={{ margin: '0 0 0 10px' }}>
												<li style={{ lineHeight: '0.8' }}>
													<Link to={`/category-job-listing/subCat/${subCat.categoryName}/${subCat._id}`} style={{ display: 'block', padding: '5px 0', color: '#555' }}>
														{ subCat.categoryName }
													</Link>
												</li>
												{subCat.child &&
												<button className="btn filter-list-btn listing-cat-link-btn" type="button"
												        data-toggle="collapse" data-target={`#${subCat._id}`}
												        style={{ marginTop: '-5px', color: '#555' }}
												        aria-expanded="false" aria-controls="colors-filter">+</button>
												}
												<div className="collapse" id={subCat._id}>
													{ subCat.child && (

														subCat.child.map( grandChild => (
															<li key={grandChild._id} style={{ lineHeight: '0.8' }}>
																<Link to={`/category-job-listing/grandChild/${subCat.categoryName}/${grandChild._id}`} style={{ display: 'block', padding: '5px 0', color: '#555' }}>
																	{ grandChild.categoryName }
																</Link>
															</li>
														) )
													) }
												</div>
											</ul>
									    ) )
								    ) }
						    </div>
					    </div>
				    </div>
			    ) )
		} else {
			categoryOptions = <img src="./../../img/spinner.gif" style={{ width: '200px', margin: 'auto', display: 'block' }} alt="spinner"/>;
		}

		return (

				<div className="col-12 col-md-4 col-lg-3 listing-categories">
					<div className="jumbotron">
						{/* Left side */}
						<div className="col-12">
							<h3 className="cat-main-title"><Link to="/job-listings">All Categories</Link></h3>
							<div className="filter-form">
								{ categoryOptions }
							</div>
						</div>
					</div>
				</div>
		);
	}
}

ProfileListingCategories.propTypes = {
	getCategories: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	category: state.category
});

export default connect( mapStateToProps, { getCategories }  )( ProfileListingCategories );
