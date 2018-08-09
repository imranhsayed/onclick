import React, { Component } from  'react';
import $ from "jquery";
import axios from 'axios';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import DashboardNav from './../DashboardNav';
import DashboardSidebar from './../DashboardSidebar';
import Moment from 'react-moment';

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
				console.log( 'camein', res.data );
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
		console.log( 'profiles', this.state.profiles );
		return(
			<div className="container-scroller">
				<DashboardNav/>
				<div className="container-fluid page-body-wrapper">
					<DashboardSidebar/>
					<div className="container">
						<div className="col-12 grid-margin">
							<div className="card">
								<div className="card-body">
									<h4 className="card-title">Users Profiles</h4>
									<div className="table-responsive">
										<table className="table">
											<thead>
											<tr>
												<th>Name</th>
												<th>Business Name</th>
												<th>Email</th>
												<th>Category</th>
												<th>Sub Category</th>
												<th>Sub Category Lvl2</th>
												<th>Phone</th>
												<th>City</th>
												<th>State</th>
												<th>Address</th>
												<th>Date</th>
												<th>Gender</th>
											</tr>
											</thead>
											<tbody>
												{ this.state.profiles && (
													this.state.profiles.map( ( item ) => {
														return (
															<tr key={item.user._id} >
																<td> { item.user.name }</td>
																<td> { item.business }</td>
																<td> { item.user.email }</td>
																<td> { item.category }</td>
																<td> { item.subCategory }</td>
																<td> { item.subCatLevel2 }</td>
																<td> { item.phone }</td>
																<td> { item.city }</td>
																<td> { item.state }</td>
																<td> { item.address }</td>
																<td> <Moment format="YYYY/MM/DD">{item.date}</Moment> </td>
																<td> { item.gender }</td>
															</tr>
														);
													} )
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