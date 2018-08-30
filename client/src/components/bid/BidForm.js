import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addBid } from "../../actions/postActions";
import { getCurrentUser } from "../../actions/authActions";
import $ from 'jquery';

class BidForm extends Component {

	constructor( props ) {
		super( props );
		this.state = {
			userId: '',
			userName: '',
			postId: '',
			postName: '',
			bidPrice: '',
			type: ''
		};
	}

	componentDidMount() {
		const { post } = this.props;
		const { user } = this.props.auth;
		// Reload the user
		this.props.getCurrentUser( user );

		this.setState({
			userId: user._id,
			userName: user.name,
			postId: post._id,
			postName: post.title
		});
	}

	onChange= ( event ) => {
		this.setState({ [event.target.name]: event.target.value });
		if ( $( event.target ).hasClass( 'oc-bid-price-input' ) ) {
			$( '.oc-your-bid' ).text( event.target.value );
			$( '.oc-project-fee' ).text( ( event.target.value * 0.05 ) );
			$( '.oc-total-applied-bid' ).text( ( event.target.value * 1.05 ) );
		}
	};

	onSubmit = ( event ) => {
		event.preventDefault();
		const { post } = this.props;
		const { user } = this.props.auth;
		// console.log( 'postok', post );
		// console.log( 'auths', user );

		const bidData = {
			userId: this.state.userId,
			userName: this.state.userName,
			postId: this.state.postId,
			postName: this.state.postName,
			bidPrice: this.state.bidPrice * 1.05,
			type: this.state.type
		};
		// Add the bid
		this.props.addBid( bidData );
		this.ocShowAlert( 'Bid Added Successfully', '#3089cf' );
		window.location.href = '/user-bids';
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

	render() {
		const { user } = this.props.auth;

		return(
			<div id="bidProposal" className="row jumbotron jumbotron-bid-proposal p-0 collapse">
				<div id="oc-alert-container"></div>
				<div className="col-12 text-left">

					<div className="row desc-and-btn pl-4 pt-4">
						<div style={{ width: '300px', paddingBottom: '31px', marginBottom: '16px' }} className="btn btn-primary send-otp-btn btn-post-job no-of-bids-btn">Number of Bids left {user.bidCountInPack}/10</div>
					</div>
					{/*Form Start*/}
					<form className="rate-row-form ml-3" onSubmit={ this.onSubmit } style={{paddingBottom: '32px', marginBottom: '16px'}}>
						<div className="row rate-row">
							<div className="col-md-12 text-left mt-3">
								<h3 style={{ marginBottom: '16px'}}>Rate( ₹ )</h3>
									<div className="form-group">
										<input type="number" className="oc-bid-price-input form-control" style={{ marginBottom: '16px'}} placeholder="10" onChange={ this.onChange } name="bidPrice" required value={this.state.bidPrice}/>
										<select className="form-control" onChange={ this.onChange } name="type" required value={ this.state.type }>
											<option value="">Select Type</option>
											<option value="hourly">Hourly</option>
											<option value="daily">Daily</option>
											<option value="one-time">One Time</option>
										</select>
									</div>
							</div>
						</div>

						<div className="row price-row" style={{ marginTop: '20px' }}>
							<div className="col-12">
								<p style={{ display: 'inline-block' }}>Your Bid: </p>
								<p style={{ display: 'inline-block', float: 'right' }}>₹<span style={{ fontWeight: '600' }} className="oc-your-bid" >0</span></p>
							</div>
							<div className="col-12">
								<p style={{ display: 'inline-block' }}>Project Fee: </p>
								<p style={{ display: 'inline-block', float: 'right' }}>₹<span style={{ fontWeight: '600' }} className="oc-project-fee" >0</span> (@5%)</p>
							</div>
							<div className="col-12">
								<p style={{ display: 'inline-block' }}>Your Total Bid: </p>
								<p style={{ display: 'inline-block', float: 'right' }}>₹<span style={{ fontWeight: '800' }} className="oc-total-applied-bid" >0</span> (Your bid + 5% of your bid)</p>
							</div>
						</div>

						<p className="note-p"><b className="blue-text">Note:</b> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

						<hr className="my-auto pb-3 pt-2"/>

						<div className="row btn-place-bid-row mb-5">
							<div className="col-12 col-md-10 text-right">
								<button style={{ width: '200px', paddingBottom: '31px', marginBottom: '16px' }} className="btn btn-primary send-otp-btn btn-post-job place-bid-btn">Place Bid</button>
							</div>
						</div>
					</form>
					{/*Form End*/}
				</div>
			</div>
		);

	}
}

BidForm.propTypes = {
	auth: PropTypes.object.isRequired,
	post: PropTypes.object.isRequired,
	addBid: PropTypes.func.isRequired,
	getCurrentUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	bid: state.bid
});

export default connect( mapStateToProps, { addBid, getCurrentUser } )( BidForm );