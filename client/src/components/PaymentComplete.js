import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import Banner from "./layouts/banner/Banner";
import { getCurrentUser } from "../actions/authActions";


class PaymentComplete extends Component{

	componentDidMount() {
			const { user } = this.props.auth;
			console.log( 'user', user );
			this.props.getCurrentUser( user );
	}

	render(){

		return(
			<div>
				<Navbar/>
				<Banner heading={'Payment Status'}/>
				<div className="oc-bid-demo">
					<div className="container">
						<h1>Thank you for making the payment</h1>
						<p>You can bid on the jobs now</p>
						<Link to={"/job-listings"} className="btn btn-primary">Job Listings</Link>
					</div>
				</div>
				<Footer/>
			</div>
		);
	}
}

PaymentComplete.propTypes = {
	auth: PropTypes.object.isRequired,
	getCurrentUser: PropTypes.func.isRequired,
};

const mapStateToProps = ( state ) => ({
	auth: state.auth,
});

export default connect( mapStateToProps, { getCurrentUser } )( PaymentComplete );