import React, { Component } from 'react';
import { connect } from 'react-redux';
import DashboardNav from './../layouts/dashboard/DashboardNav';
import DashboardSidebar from './../layouts/dashboard/DashboardSidebar';
import PropTypes from 'prop-types';
import { getOffersByUserId } from "../../actions/offerActions";
import { deleteOffer } from "../../actions/offerActions";
import Moment from 'react-moment';
import $ from 'jquery';


class DashboardOfferListings extends Component {

	componentDidMount() {
		const { user } = this.props.auth;
		const userId = ( user._id ) ? user._id : user.id;

		this.props.getOffersByUserId( userId );
	}

	onClickDelete = ( event ) => {
		const offerId = $( event.target ).attr( 'data-target-id' );
		this.props.deleteOffer( offerId );
		console.log( 'offerid', offerId );
	};

	render(){

		const { offer } = this.props,
			   offers = offer.offers;
		let offerContent = '';

		if ( null !== offers && Object.keys( offers ).length ) {
			offerContent = (
				offers.map( offer => (
					<div key={offer._id} className="card text-white bg-white mb-3" style={{ boxShadow: '0 5px 10px 2px rgba(195,192,192,.5) !important', border: '1px solid rgba(68, 83, 91, 0.33)' }}>
						<div className="card-header" style={{ color: '#555' }}>{ offer.title }</div>
						<div className="card-body">
							<div className="row" style={{ color: '#555' }}>
								<div className="col-md-3">
									<img src={ offer.offerImage ? offer.offerImage : '/images/default-image.png' } style={{ maxWidth: '200px', maxHeight: '150px' }} alt=""/>
								</div>
								<div className="col-md-9">
									{ offer.description }
								</div>
							</div>
						</div>
						<div className="card-footer text-muted" style={{ color: '#555', fontSize: '10px', fontStyle: 'italic' }}>
							<p className="float-left">Posted <Moment fromNow>{offer.date}</Moment></p>
							<button onClick={ this.onClickDelete } data-target-id={ offer._id } className="float-right btn btn-danger btn-sm">Delete</button>
						</div>
					</div>
				) )
			)
		} else {
			offerContent = <img src="/img/spinner.gif" style={{ width: '200px', margin: 'auto', display: 'block' }} alt="spinner"/>;
		}

		return(
			<div className="container-scroller">
				<DashboardNav/>
				<div className="container-fluid page-body-wrapper">
					<DashboardSidebar/>
					<div className="container p-5">
						<h3>Offer Listings</h3><br/>
						{ offerContent }
					</div>
				</div>
			</div>
		);
	}
}

DashboardOfferListings.propTypes = {
	getOffersByUserId: PropTypes.func.isRequired,
	deleteOffer: PropTypes.func.isRequired,
	offer: PropTypes.object.isRequired
};

const mapStateToProps = ( state ) => ({
	auth: state.auth,
	offer: state.offer
});

export default connect( mapStateToProps, { getOffersByUserId, deleteOffer } )( DashboardOfferListings );