import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import DashboardNav from './../../../layouts/dashboard/DashboardNav';
import DashboardSidebar from './../../../layouts/dashboard/DashboardSidebar';
import { getCurrentUser } from "./../../../../actions/authActions";
import { getBidPackagePayments } from "./../../../../actions/paymentActions";

class BidPackagePayments extends Component {

	componentDidMount() {
		const { user } = this.props.auth;
		this.props.getCurrentUser( user );
		this.props.getBidPackagePayments();
	}

	render(){
		const { payment } = this.props;
		const { user } = this.props.auth;
		const payments = payment.payments;
		let content = '';

		console.log( 'payments', payments );

		if ( null !== payments && Object.keys( payments ).length ) {
			content = (
				<div>
					<table className="table table-hover" style={{ textAlign: 'center', padding: '20px', margin: '30px' }}>
						<thead>
						<tr>
							<th scope="col">Title</th>
							<th scope="col">For</th>
							<th scope="col">Paid By</th>
							<th scope="col">Amount</th>
							<th scope="col">Payment Request Id</th>
							<th scope="col">When</th>
							<th scope="col">Payment Status</th>
						</tr>
						</thead>
						<tbody>
						{
							payments.map( ( item ) => {
								return (
									<tr key={item._id} >
										<td>{ item.title }</td>
										<td>{ item.for }</td>
										<td>{ item.payerName }</td>
										<td>₹{ item.amount }</td>
										<td>{ item.paymentRequestId }</td>
										<td><Moment fromNow>{item.date}</Moment></td>
										<td><span>paid</span></td>
									</tr>
								);
							} )
						}
						</tbody>
					</table>
				</div>
			)
		} else {
			content = <img src="./../img/spinner.gif" style={{ width: '200px', margin: 'auto', display: 'block' }} alt="spinner"/>;
		}

		return(
			<div>
				<div className="container-scroller">
					<div id="oc-alert-container"></div>
					<DashboardNav/>
					<div className="container-fluid page-body-wrapper">
						<DashboardSidebar/>
						{ content }
					</div>
				</div>
			</div>
		);
	}
}

BidPackagePayments.propTypes = {
	getCurrentUser: PropTypes.func.isRequired,
	getBidPackagePayments: PropTypes.func.isRequired,
	payment: PropTypes.object.isRequired
};

const mapStateToProps = ( state ) => ({
	auth: state.auth,
	payment: state.payment,
});

export default connect( mapStateToProps, { getCurrentUser, getBidPackagePayments } )( BidPackagePayments );