import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Navbar from "./../layouts/Navbar";
import Footer from "./../layouts/Footer";
import Banner from "../layouts/banner/Banner";
import axios from "axios/index";

class BuyBid extends Component{

	// componentDidMount() {
	// 	this.props.getPost( this.props.match.params.id )
	// }

	onBuyNowClick = () => {

		const { user } = this.props.auth;
		console.log( user );

		const data = {
			purpose: 'Bid Payment',
			amount: '100',
			buyer_name: user.name,
			email: user.email,
			phone: '9960119040',
			user_id: user.id,
			redirect_url: 'http://localhost:5000/api/bid/callback/',
			webhook_url: '/webhook/',

		};

		axios.post( '/api/bid/pay/', data )
			.then( res => {
				console.log( 'resp', res.data );
				window.location.href = res.data;

			} )
			.catch( ( error ) => console.log( error.response.data ) );
	};

	render(){
		const { user } = this.props.auth;


		return(
			<div>
				<Navbar/>
				<Banner heading={'Buy Bid'}/>
				<div className="oc-bid-demo">
					<div className="container">
						<div className="row" style={{ display: 'flex', justifyContent: 'center' }}>
							<div className="col-md-4 col-sm-6">
								<div className="oc-bid-pricingTable">
									<div className="oc-bid-pricingTable-header">
										<svg x="0px" y="0px" viewBox="0 0 260 180">
											<path fill="#34454d" strokeDasharray="5,5" stroke="#fff" d="M0,180.928c0,0,0-108.489,0-143.333C1.637,23.582,8.907,0,42.088,0C75.271,0,260,0,260,0v72.841
                            c0,0-2.667,37.424-43.877,45.563C177.693,125.992,6.26,130.42,0,180.928z"></path>
											<text transform="matrix(1.0078 0 0 1 75.9497 33.8887)" fill="#fff" style={{ fontSize: '23.726px'}}>BUY BID</text>
											<g>
												<text transform="matrix(1.0078 0 0 1 98.5996 65.9434)" fill="#fff" style={{ fontSize: '23.726px'}}>₹</text>
												<text transform="matrix(1.076 0 0 1 112.0176 88.458)" fill="#fff" style={{ fontSize: '58.1472px', fontWeight: '600' }}>100</text>
												<text transform="matrix(1.0078 0 0 1 107.9326 106.832)" fill="#fff" style={{ fontSize: '16.2415px'}}>/one time</text>
											</g>
										</svg>
									</div>
									<ul className="pricing-content">
										<li>10 Bids</li>
										<li className="disable">Validity: No expiry</li>
									</ul>
									<div className="oc-bid-pricingTable-signup">
										{/*<svg x="0" y="0" viewBox="-35 0 160 30">*/}
											{/*<button >*/}
												{/*<path fill="#fff" d="M13.12,5.867c17.786-0.834,68.654-5.473,68.654-5.473s8.203-1.945,7.445,5.473*/}
                                {/*c-0.757,7.417-4.037,16.782-4.037,16.782s-1.667,5.881-9.719,6.932c-8.961,0.852-50.858-0.983-67.771,0*/}
                                {/*c-2.718,0.158-9.935,0.256-7.446-7.66c2.736-9.18,3.408-10.459,3.408-10.459S5.647,5.86,13.12,5.867z"></path>*/}
												{/*<text transform="matrix(1 0 0 1 15.5055 21.0098)" fill="#34454D" style={{ fontSize: '10px', fontWeight: '600' }}>BUY NOW</text>*/}
											{/*</button>*/}
										{/*</svg>*/}
										<button style={{ background: '#34454d' }} onClick={ this.onBuyNowClick } className="btn btn-info">BUY NOW</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<Footer/>
			</div>
		);
	}
}

BuyBid.propTypes = {
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = ( state ) => ({
	auth: state.auth,
});

export default connect( mapStateToProps   )( BuyBid );