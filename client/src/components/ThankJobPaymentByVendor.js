import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DashboardNav from './layouts/dashboard/DashboardNav';
import DashboardSidebar from './layouts/dashboard/DashboardSidebar';

class ThankJobPaymentByVendor extends Component {
	render() {
		return(
			<div>
				<div className="container-scroller">
					<DashboardNav/>
					<div className="container-fluid page-body-wrapper">
						<DashboardSidebar/>
						<div className="container p-5">
							<h2 className="mb-3">Thank you for making the payment</h2>
							<Link to="/vendor-accepted-bids" className="btn btn-primary">View Accepted Bids</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default ThankJobPaymentByVendor;