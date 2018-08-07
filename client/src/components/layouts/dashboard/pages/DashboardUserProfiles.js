import React, { Component } from  'react';
import $ from "jquery";
import axios from 'axios';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import DashboardNav from './../DashboardNav';
import DashboardSidebar from './../DashboardSidebar';

class DashboardUserProfiles extends Component {

	constructor() {
		super( ...arguments );
		this.state = {
			profiles: null,
		};
		/**
		 * Get the profile of the currently logged in user.
		 */
		axios.get( '/api/profile/all', this.props.auth )
			.then( res => {
				// Once we get the response containing the currentUserProfile data, we set the state value of currentUserProfile to the received data.
				this.setState({
					profiles: res.data
				});
			} )
			.catch( ( error ) => console.log( error.response ) );
	}

	render() {
		let name = '', email = '', category = '', subCategory = '', subCatLevel2 = '', gender = '', city = '', address = '';
		const { user } = this.props.auth;
		const errors = this.state.errors;
		name = user.name;
		console.log( this.state.profiles );
		return(
			<div className="container-scroller">
				<DashboardNav/>
				<div className="container-fluid page-body-wrapper">
					<DashboardSidebar/>
					<div className="container">
						<div className="col-12 grid-margin">
							<div className="card">
								<div className="card-body">
									<h4 className="card-title">Recent Tickets</h4>
									<div className="table-responsive">
										<table className="table">
											<thead>
											<tr>
												<th>Name</th>
												<th>Email</th>
												<th>Category</th>
												<th>Sub Category</th>
												<th>Sub Category Lvl2</th>
												<th>Gender</th>
												<th>City</th>
												<th>Address</th>
											</tr>
											</thead>
											<tbody>
											{ this.state.profiles && (
												<tr>
													{
														this.profiles.map( ( item ) => {
															return (
																<td key={item}> { item }</td>
															);
														} )
													}
												</tr>
											) }
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

DashboardUserProfiles.propTypes = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = ( state ) => ({
	auth: state.auth,
	errors: state.errors
});

export default connect( mapStateToProps  )( DashboardUserProfiles );