import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from './../../components/layouts/Navbar';
import { Link } from 'react-router-dom';
import { getAllOffers } from "../../actions/offerActions";
import Banner from '../layouts/banner/Banner';
import Footer from '../layouts/Footer';
import Moment from 'react-moment';

class OfferListings extends Component {

	componentDidMount() {
		this.props.getAllOffers();
	}

	render() {

		const { offer } = this.props,
			{ user } = this.props.auth,
				offers = offer.offers;
		let offerContent = '', userImageSrc = '',
			userName = ( user.name ) ? user.name : 'Guest';

		if ( user.name ) {
		    userImageSrc = ( user.profileImage ) ? user.profileImage : '/images/default-avatar.png';
		} else {
			userImageSrc = '/images/default-avatar.png';
		}

		if ( null !== offers && Object.keys( offers ). length ) {
			offerContent = offers.map( offer => (
				<div key={ offer._id } className="card mb-5 front-end-offer-listing-card">
					<div className="card-header">
						<div className="row">
							<div className="col-2">
								<img src={ offer.userImage ? offer.userImage : '/images/default-avatar.png' } className="offer-listing-front-end-user-img" style={{ width: '50px', height: '50px' }} alt=""/>
							</div>
							<div className="col-10" style={{ marginLeft: '-10px', paddingLeft: '0' }}>
								<p>{ offer.userName }</p>
								<p className="text-muted" style={{ marginTop: '-12px' }}><Moment fromNow>{offer.date}</Moment></p>
							</div>
						</div>
					</div>
					<img className="card-img-top" src={ offer.offerImage } alt="Card image cap"/>
						<div className="card-body">
							<p className="card-title">{ offer.title }</p>
							<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
						</div>
				</div>
			) );
		} else {
			offerContent = <img src="/img/spinner.gif" style={{ width: '200px', margin: 'auto', display: 'block' }} alt="spinner"/>;
		}

		return(
			<div>
				<Navbar/>
				<Banner heading={ 'Offer Listings' }/>
				<div className="container forms-section" style={{ maxWidth: '920px', margin: '0 auto' }}>
					<div className="row forms-section-row" >
						<div className="col-md-4 col-sm-12 col-xs-12">
							{/*Sidebar*/}
							<div className="card front-end-offer-listing-card">
								<div className="card-body">
									<div className="text-center">
										<img src={userImageSrc} className="offer-listing-front-end-user-img mb-3" style={{ width: '50px', height: '50px' }} alt=""/>
										<h4 className="card-title">{userName}</h4>
									</div>
									<hr/>
									<div className="text-center">
										<Link to="/job-listings" className="card-link">Jobs</Link>
										<Link to="/listings" className="card-link">Business Listings</Link>
									</div>
								</div>
							</div>
						</div>
						<div className="col-md-8 col-sm-12 col-xs-12">
							{offerContent}
						</div>

					</div>
				</div>
				<Footer/>
			</div>
		);
	}
}

OfferListings.propTypes = {
	getAllOffers: PropTypes.func.isRequired,
	offer: PropTypes.object.isRequired
};

const mapStateToProps = ( state ) => ({
	auth: state.auth,
	offer: state.offer
});

export default connect( mapStateToProps, { getAllOffers } )( OfferListings );