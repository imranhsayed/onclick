import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addBid } from "../../actions/bidActions";

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
		this.setState({
			userId: user.id,
			userName: user.name,
			postId: post._id,
			postName: post.title
		});
	}

	onChange= (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	onSubmit = ( event ) => {
		event.preventDefault();
		const { post } = this.props;
		console.log( 'postok', post );
		console.log( 'state', this.state );

		const bidData = {
			userId: this.state.userId,
			userName: this.state.userName,
			postId: this.state.postId,
			postName: this.state.postName,
			bidPrice: this.state.bidPrice,
			type: this.state.type
		};
		this.props.addBid( bidData );
	};

	render() {

		return(
			<div id="bidProposal" className="row jumbotron jumbotron-bid-proposal p-0 collapse">
				<div className="col-12 text-left">

					<div className="row desc-and-btn pl-4 pt-4">
						<button type="button" style={{ width: '300px', paddingBottom: '31px', marginBottom: '16px' }} className="btn btn-primary send-otp-btn btn-post-job no-of-bids-btn">Number of Bids left 2/8</button>
					</div>
					{/*Form Start*/}
					<form className="rate-row-form ml-3" onSubmit={ this.onSubmit } style={{paddingBottom: '32px', marginBottom: '16px'}}>
						<div className="row rate-row">
							<div className="col-md-12 text-left mt-3">
								<h3 style={{ marginBottom: '16px'}}>Rate( ₹ )</h3>
									<div className="form-group">
										<input type="number" style={{ marginBottom: '16px'}} placeholder="10" onChange={ this.onChange } name="bidPrice" className=" form-control" required value={this.state.bidPrice}/>
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
								<p style={{ display: 'inline-block', float: 'right' }}>₹<span className="oc-your-bid" >100</span> (@5%)</p>
							</div>
							<div className="col-12">
								<p style={{ display: 'inline-block' }}>Project Fee: </p>
								<p style={{ display: 'inline-block', float: 'right' }}>₹<span className="oc-project-fee" >5</span> (@5%)</p>
							</div>
							<div className="col-12">
								<p style={{ display: 'inline-block' }}>Your Total Bid: </p>
								<p style={{ display: 'inline-block', float: 'right' }}>₹<span className="oc-total-applied-bid" >105</span> (Your bid + 5% of your bid)</p>
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
	addBid: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	bid: state.bid
});

export default connect( mapStateToProps, { addBid } )( BidForm );