import React, { Component } from 'react';
import {connect} from 'react-redux';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import DashboardNav from './DashboardNav';
import DashboardSidebar from './DashboardSidebar';
import { getAllBidByUserId } from "../../../actions/bidActions";
import { getCurrentUser } from "../../../actions/authActions";

class DashboardShowUserBids extends Component {

	componentDidMount() {
		const { user } = this.props.auth;
		this.props.getCurrentUser( user );
		console.log( 'userid', user._id );
		this.props.getAllBidByUserId( user._id );
	}

	render(){
		const { user } = this.props.auth;
		const { bid } = this.props;
		const userBids = bid.bids;
		console.log( 'userbids', userBids );
		let content = '';

		if ( null !== userBids && Object.keys( userBids ).length ) {
			content = (
				<div>
					<table className="table table-hover" style={{ padding: '20px', margin: '30px' }}>
						<thead>
						<tr>
							<th scope="col">Job Title</th>
							<th scope="col">Your Bid</th>
							<th scope="col">Type</th>
							<th scope="col">Date</th>
						</tr>
						</thead>
						<tbody>
						{
							userBids.map( ( item ) => {
								return (
									<tr key={item._id} >
										<td>{ item.postName }</td>
										<td>{ item.bidPrice }</td>
										<td>{ item.type }</td>
										<td><Moment fromNow>{item.date}</Moment></td>
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

DashboardShowUserBids.propTypes = {
	getAllBidByUserId: PropTypes.func.isRequired,
	getCurrentUser: PropTypes.func.isRequired,
	bid: PropTypes.object.isRequired
};

const mapStateToProps = ( state ) => ({
	auth: state.auth,
	bid: state.bid,
});

export default connect( mapStateToProps, { getAllBidByUserId, getCurrentUser } )( DashboardShowUserBids );