import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import DashboardNav from './DashboardNav';
import DashboardSidebar from './DashboardSidebar';
import { getAllBidByPostId } from "../../../actions/bidActions";
import { getCurrentUser } from "../../../actions/authActions";
import { updateBidAsAccepted } from "../../../actions/bidActions";
import $ from 'jquery';

class BidsByPost extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			postId: ''
		}
	}

	componentDidMount() {
		const { user } = this.props.auth;
		const postId = this.props.match.params.postId;
		this.setState = {
			postId: this.props.match.params.postId
		};
		this.props.getCurrentUser( user );
		this.props.getAllBidByPostId( postId, user._id );
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
							<th scope="col">Bid Id</th>
							<th scope="col">Bid Amount</th>
							<th scope="col">Type</th>
							<th scope="col">By</th>
							<th scope="col">When</th>
							<th scope="col">Job Details</th>
							<th scope="col">Bidder's Profile</th>
							<th scope="col">Action</th>
						</tr>
						</thead>
						<tbody>
						{
							userBids.map( ( item ) => {
								return (
									<tr key={item._id} >
										<td>{ item.postName }</td>
										<td>{ item._id }</td>
										<td>₹{ item.bidPrice.toFixed(2) }</td>
										<td>{ item.type }</td>
										<td>{ item.userName }</td>
										<td><Moment fromNow>{item.date}</Moment></td>
										<td><Link to={`/dashboard-single-post/${ item.postId }`} className="btn-sm btn-primary">View</Link></td>
										<td><Link to={`/bidders-profile/${ item.userId }`} className="btn-sm btn-primary">View</Link></td>
										{/*Pending and not admin*/}
										{ ( 'no' === item.accepted && 'admin' !== user.type ) &&
											<td><button className="btn-sm btn-primary" style={{ cursor: 'pointer' }} data-bidid={item._id} data-postid={item.postId} onClick={ this.onClick }>Accept</button></td>
										}
										{/*Pending and admin*/}
										{ ( 'no' === item.accepted && 'admin' === user.type ) &&
										<td><span>Pending</span></td>
										}
										{/*Accepted and not admin*/}
										{ ( 'yes' === item.accepted && 'admin' !== user.type ) &&
										<td><button className="btn-sm btn-secondary" style={{ cursor: 'pointer', background: 'green' }} disabled >Accepted</button></td>
										}
										{/*Accepted and admin*/}
										{ ( 'yes' === item.accepted && 'admin' === user.type ) &&
										<td><span style={{ color: 'green' }}>Accepted</span></td>
										}
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

BidsByPost.propTypes = {
	getAllBidByPostId: PropTypes.func.isRequired,
	getCurrentUser: PropTypes.func.isRequired,
	updateBidAsAccepted: PropTypes.func.isRequired,
	bid: PropTypes.object.isRequired
};

const mapStateToProps = ( state ) => ({
	auth: state.auth,
	bid: state.bid,
});

export default connect( mapStateToProps, { getAllBidByPostId, updateBidAsAccepted, getCurrentUser } )( BidsByPost );