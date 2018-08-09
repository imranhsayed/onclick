import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from "./../actions/authActions";
import { Link } from 'react-router-dom';
import SingleProfileBanner from './layouts/profile/SingleProfileBanner';
import classnames from "classnames";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import ProfileSlider from './layouts/profile/ProfileSlider';
import ProfileDetails from './layouts/profile/ProfileDetails';
import ProfileDescription from './layouts/profile/ProfileDescription';

class SingleProfile extends Component {

	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			errors: {}
		};

		this.onChange = this.onChange.bind( this );
		this.onSubmit = this.onSubmit.bind( this );
	}

	// Redirect the user to dashboard if he is logged in
	componentDidMount() {
		// If the user is logged in
		if ( this.props.auth.isAuthenticated ) {
			// redirect the user to the dashboard
			this.props.history.push( '/dashboard' );
		}
	}

	componentWillReceiveProps( nextProps ) {
		if ( nextProps.auth.isAuthenticated ) {
			// After he is authenticated and he logs in , redirect him to dashboard
			this.props.history.push( '/dashboard' );
		}
		if ( nextProps.errors ) {
			this.setState( { errors: nextProps.errors } )
		}
	}

	/**
	 * Whenever user types something in the input element, we will grab that value and set the
	 * state variables to that value, using this function.
	 * this.setState() changes the state of a component
	 * Note that name here is the 'name' attribute and 'value' here is the value attribute of the form.
	 * meaning event.target.name is equal to the value of the 'name' attribute of that element, and
	 * event.target.value is equal to the value of the 'value' attribute of that element
	 *
	 * @param event
	 */
	onChange( event ) {
		/**
		 * Change the state of name property.
		 * event.target.name will give you the name of the input element, and
		 * event.target.value will give you the value of the input element.
		 */
		this.setState( { [ event.target.name ]: event.target.value } );
	}

	onSubmit( event ) {
		event.preventDefault();
		const user = {
			email: this.state.email,
			password: this.state.password
		};

		// axios.post( '/api/users/login', user )
		// 	.then( ( res ) => console.log( res.data ) )
		// 	.catch( ( error ) => this.setState( { errors: error.response.data } ) );

		console.log( user );

		// Call the loginUser() action from actions/authActions.js
		this.props.loginUser( user );
	}

	render(){

		const { errors } = this.state;
		return(
			<div>
				<Navbar/>
				<SingleProfileBanner/>
				<div className="container forms-section">
					<div className="row forms-section-row" >
						<div className="container-fluid pd-section-one-container">
							<div className="row pd-section-one-row">
								<ProfileSlider/>
								<ProfileDetails/>
							</div>
							<ProfileDescription/>
						</div>
					</div>
				</div>
				<Footer/>
			</div>
		);
	}
}

SingleProfile.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.isRequired
};

const mapStateToProps = ( state ) => ({
	auth: state.auth,
	errors: state.errors
});

export default connect( mapStateToProps, { loginUser } )( SingleProfile );