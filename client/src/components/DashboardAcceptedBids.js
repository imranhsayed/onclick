import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import DashboardNav from './layouts/dashboard/DashboardNav';
import DashboardSidebar from './layouts/dashboard/DashboardSidebar';
import { getCurrentUser } from "../actions/authActions";
import { getAllAcceptedBids } from "../actions/bidActions";
import $ from 'jquery';

class DashboardAcceptedBids extends Component {

	componentDidMount() {
		const { user } = this.props.auth;
		this.props.getCurrentUser( user );
		this.props.getAllAcceptedBids();
	}

	onClick = ( event ) => {
		const bidId = $( event.target ).attr( 'data-bidid' ),
			bid = { bidId },
			postId = $( event.target ).attr( 'data-postid' );
		this.props.updateBidAsAccepted( bid );
		this.ocShowAlert( 'Bid Accepted Successfully', '#3089cf' );
		window.location.href = '/post-job-listings';
	};

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

	render(){
		const { bid } = this.props;
		const { user } = this.props.auth;
		const userBids = bid.bids;
		let content = '';

		if ( null !== userBids && Object.keys( userBids ).length ) {
			content = (
				<div>
					<table className="table table-hover" style={{ textAlign: 'center', padding: '20px', margin: '30px' }}>
						<thead>
						<tr>
							<th scope="col">Job Title</th>
							<th scope="col">Bid Amount</th>
							<th scope="col">Type</th>
							<th scope="col">By</th>
							<th scope="col">When</th>
							<th scope="col">Bidder's Profile</th>
							<th scope="col">Job Details</th>
							<th scope="col">Status</th>
							<th scope="col">Payment Status</th>
						</tr>
						</thead>
						<tbody>
						{
							userBids.map( ( item ) => {
								return (
									<tr key={item._id} >
										<td>{ item.postName }</td>
										<td>₹{ item.bidPrice.toFixed(2) }</td>
										<td>{ item.type }</td>
										<td>{ item.userName }</td>
										<td><Moment fromNow>{item.date}</Moment></td>
										<td><Link to={`/bidders-profile/${ item.userId }`} className="btn-sm btn-primary">View</Link></td>
										<td><Link to={`/dashboard-single-post/${ item.postId }`} className="btn-sm btn-primary">View</Link></td>
										<td><span style={{ color: 'green' }}>Accepted</span></td>
										<td><span>{ item.jobMoneyPaidByVendor }</span></td>
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

DashboardAcceptedBids.propTypes = {
	getCurrentUser: PropTypes.func.isRequired,
	getAllAcceptedBids: PropTypes.func.isRequired,
	bid: PropTypes.object.isRequired
};

const mapStateToProps = ( state ) => ({
	auth: state.auth,
	bid: state.bid,
});

export default connect( mapStateToProps, { getCurrentUser, getAllAcceptedBids } )( DashboardAcceptedBids );