import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashboardNav from './layouts/dashboard/DashboardNav';
import DashboardSidebar from './layouts/dashboard/DashboardSidebar';
import { getCategories } from "../actions/categoryActions";
import { deleteCategory } from "../actions/categoryActions";
import $ from "jquery";

class DashboardListCategories extends Component {

	componentDidMount() {
		this.props.getCategories();
	}

	onDeleteClick( id ) {
		this.props.deleteCategory( id, this.props.history );
		this.ocShowAlert( 'Category Deleted Successfully', '#3089cf' );
		window.location.href = '/list-categories'
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

	render() {
		const { categories } = this.props.category;
		let categoryContent;
		if ( null === categories || ! Object.keys( categories ).length ) {
			categoryContent = <img src="./../img/spinner.gif" style={{ width: '200px', margin: 'auto', display: 'block' }}/>;
		} else {
			categoryContent = (
				<div className="container">
					<div id="oc-alert-container"></div>
					<br/><h4>Categories Listing</h4><br/>
					<table className="table table-hover">
						<thead>
						<tr>
							<th scope="col">Category Name</th>
							<th scope="col">Parent Category Name</th>
							<th scope="col">Category Id</th>
							<th scope="col">Delete</th>
						</tr>
						</thead>
						<tbody>
							{ categories.map( item => (
								<tr key={ item._id } className="">
									<td>{ item.categoryName }</td>
									<td>{ item.parentCatName }</td>
									<td>{ item._id }</td>
									<td><button onClick={this.onDeleteClick.bind( this, item._id )} className="btn btn-danger btn-sm" style={{ padding: '10px' }}>Delete</button></td>
								</tr>
							) ) }
						</tbody>
					</table>
				</div>
			)
		}
		return(
			<div className="container-scroller">
				<DashboardNav/>
				<div className="container-fluid page-body-wrapper">
					<DashboardSidebar/>
					{/*Show Categories*/}
					{ categoryContent }
				</div>
			</div>
		);
	}
}

DashboardListCategories.propTypes = {
	getCategories: PropTypes.func.isRequired,
	deleteCategory: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth,
	category: state.category
});

export default connect( mapStateToProps, { getCategories, deleteCategory } )( DashboardListCategories );