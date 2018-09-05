import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import DashboardNav from './layouts/dashboard/DashboardNav';
import DashboardSidebar from './layouts/dashboard/DashboardSidebar';
import { getCurrentUser } from "../actions/authActions";
import { getAcceptedBidsByUserId } from "../actions/bidActions";
import $ from 'jquery';
import axios from "axios/index";

class DashboardVendorAcceptedBids extends Component {

	componentDidMount() {
		const { user } = this.props.auth;
		const userId = ( user.id ) ? user.id : user._id;
		const userData = { userId: userId };
		this.props.getCurrentUser( user );
		this.props.getAcceptedBidsByUserId( userData );
	}

	onPayOnclick = ( event ) => {
		const bidId = $( event.target ).attr( 'data-bidid' ),
			postUserId = $( event.target ).attr( 'data-postuserid' ),
			postId = $( event.target ).attr( 'data-postid' ),
			bidderName = $( event.target ).attr( 'data-biddername' ),
			amountWithDecimal = $( event.target ).attr( 'data-amount' ),
			amount = Math.round( amountWithDecimal ),
			{ user } = this.props.auth;

			let userId = ( user.id ) ? user.id : user._id;

		const data = {
			purpose: 'Job Payment',
			amount: amount,
			buyer_name: user.name,
			email: user.email,
			postId: postId,
			postUserId: postUserId,
			bidderName: bidderName,
			bidId: bidId,
			phone: '9960119040',
			user_id: userId,
			redirect_url: `http://localhost:5000/api/bid/postjobpaycallback?post_id=${postId}`,
			webhook_url: '/webhook/',

		};

		console.log( data );

		axios.post( '/api/bid/payforjob/', data )
			.then( res => {
				console.log( 'resp', res.data );
				window.location.href = res.data;

			} )
			.catch( ( error ) => console.log( error.response.data ) );
	};

	render(){
		const { bid, loading } = this.props;
		const { user } = this.props.auth;
		const postUserId = ( user.id ) ? user.id : user._id;
		const userBids = bid.bids;
		let content = '';

		if ( null !== userBids && Object.keys( userBids ).length ) {
			content = (
				<div>
					<table className="table table-hover" style={{ textAlign: 'center', padding: '20px', margin: '30px' }}>
						<thead>
						<tr>
							<th scope="col">Job Title</th>
							<th scope="col">Project Budget</th>
							<th scope="col">Bid Amount</th>
							<th scope="col">Type</th>
							<th scope="col">By</th>
							<th scope="col">When</th>
							<th scope="col">Bidder's Profile</th>
							<th scope="col">Job Details</th>
							<th scope="col">Status</th>
							<th scope="col">Make Payment</th>
						</tr>
						</thead>
						<tbody>
						{
							userBids.map( ( item ) => {
								return (
									<tr key={item._id} >
										<td>{ item.postName }</td>
										<td>₹{ item.projectBudget }</td>
										<td>₹{ item.bidPrice.toFixed(2) }</td>
										<td>{ item.type }</td>
										<td>{ item.userName }</td>
										<td><Moment fromNow>{item.date}</Moment></td>
										<td><Link to={`/bidders-profile/${ item.userId }`} className="btn-sm btn-primary">View</Link></td>
										<td><Link to={`/dashboard-single-post/${ item.postId }`} className="btn-sm btn-primary">View</Link></td>
										<td><span style={{ color: 'green' }}>Accepted</span></td>
										{ 'unpaid' === item.jobMoneyPaidByVendor &&
										<td><button onClick={ this.onPayOnclick }
										            data-bidid={item._id} data-postid={item.postId}
										            data-postuserid={postUserId} data-amount={item.bidPrice.toFixed(2)}
										            data-biddername ={item.userName}
										            className="btn btn-primary btn-sm">Pay Onclick</button></td>
										}
										{'paid' === item.jobMoneyPaidByVendor &&
										<td>Paid Already</td>
										}
									</tr>
								);
							} )
						}
						</tbody>
					</table>
				</div>
			)
		} else if ( ! loading && null == userBids ) {
			content = '';
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

DashboardVendorAcceptedBids.propTypes = {
	getCurrentUser: PropTypes.func.isRequired,
	getAcceptedBidsByUserId: PropTypes.func.isRequired,
	bid: PropTypes.object.isRequired
};

const mapStateToProps = ( state ) => ({
	auth: state.auth,
	bid: state.bid,
});

export default connect( mapStateToProps, { getCurrentUser, getAcceptedBidsByUserId } )( DashboardVendorAcceptedBids );