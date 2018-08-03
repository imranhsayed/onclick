import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from "./../actions/authActions";
import { Link } from 'react-router-dom';
import LoginBanner from './layouts/login/LoginBanner';
import classnames from "classnames";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";

class Login extends Component {

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
			// After he is authenticated and his logs in , redirect him to dashboard
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
				<LoginBanner/>
				<div className="container forms-section">
					<div className="row forms-section-row">
						<div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
							<div className="card">
								<div className="card-header text-center">
									Login Now
								</div>
								<div className="card-body">
									<form onSubmit={ this.onSubmit }>
										<div className="form-group col-12 mb-3">
											<i className="fa fa-user fa-forms-user"></i>
											<input type="text" id="login-name" name="email"
											       className={ classnames( 'form-control', {
												       'is-invalid': errors.email
											       } ) }
											       onChange={ this.onChange }
											       placeholder="Enter your email"/>
											{ errors.email && ( <div className="invalid-feedback">{ errors.email }</div> ) }
										</div>
										<div className="form-group col-12 mb-3">
											<i className="fa fa-lock fa-forms-lock"></i>
											<input type="password" id="login-password" name="password" style={{ paddingLeft: '40px' }}
											       className={ classnames( 'form-control', {
												       'is-invalid': errors.password
											       } ) }
											       onChange={ this.onChange }
											       placeholder="Enter your password"/>
											{ errors.password && ( <div className="invalid-feedback">{ errors.password }</div> ) }
										</div>
										<div className="row checkbox-row">
											<div className="form-group form-check col-12 col-md-6 pl-5 forms-checkbox text-center">
												<input type="checkbox" className="form-check-input" id="checkbox-login"/>
													<label className="checkbox-login" htmlFor="exampleCheck1">Keep me logged in</label>
											</div>
											<div className="col-12 col-md-6 forgot-password pl-5 pb-2 text-center">
												<a href="">Forgot Password?</a>
											</div>
										</div>
										<div className="col-12 send-otp-colm text-center pb-1">
											<button type="submit" className="btn btn-primary send-otp-btn btn-post-job">Login</button>
										</div>
									</form>

									<div className="row or-row pt-3 new-user-sign-up-link">
										<div className="col-4 col-sm-4 pr-0">
											<hr/>
										</div>
										<div className="col-4 col-sm-4 text-center pt-1">
											<p>New to Onclickbiz? <Link to="/register">Create account</Link></p>
										</div>
										<div className="col-4 col-sm-4 pl-0">
											<hr/>
										</div>
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

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.isRequired
};

const mapStateToProps = ( state ) => ({
	auth: state.auth,
	errors: state.errors
});

export default connect( mapStateToProps, { loginUser } )( Login );