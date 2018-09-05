import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import RegisterBanner from "./layouts/register/RegisterBanner";
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from './../actions/authActions';
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";

class Register extends Component {

	constructor() {
		super();
		this.state = {
			name: '',
			email: '',
			password: '',
			password2: '',
			errors: {}
		};

		this.onChange = this.onChange.bind( this );
		this.onSubmit = this.onSubmit.bind( this );
	}

	/**
	 * This will run when this Register component receives props/
	 * We will set the state to errors property in this.state() define above in constructor() to nextProps.errors, which will contain
	 * the errors received from redux state.
	 * @param nextProps
	 */
	componentWillReceiveProps( nextProps ) {
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

	/**
	 * When the form is submitted, prevent its default action and,
	 * Store the input values stored in state object, into a new object newUser.
	 * @param event
	 */
	onSubmit( event ) {
		event.preventDefault();
		const newUser = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2,
			errors: this.state.errors
		};

		console.log( newUser );

		/**
		 * Call the registerUser() which is imported from actions/authActions.js
		 * this.props.history allows us to redirect from registerUser action
		 */
		this.props.registerUser( newUser, this.props.history );

	}


	render(){
		/**
		 * We are using object destructuring here by setting the property name of the state object( within curly braces ),
		 * equal to the state object, which is same as const errors = this.state.errors
		 */
		const { errors } = this.state;

		return(
			<div>
				<Navbar/>
				<RegisterBanner/>
				<div className="container forms-section">
					<div className="row forms-section-row">
						<div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
							<div className="card">
								<div className="card-header text-center">
									Sign Up
								</div>
								<div className="card-body">
									<form onSubmit={ this.onSubmit } >
										<div className="form-group col-12 mb-3">
											<i className="fa fa-user fa-forms-email-mobile"></i>
											<input type="text" id="sign-up-name" style={{ paddingLeft: '40px' }} name="name"
											       className={ classnames( 'form-control', {
											       	'is-invalid': errors.name
											       } ) }
											       value={ this.state.name }
											       onChange={ this.onChange }
											       aria-describedby="sign-up-email-mobile" placeholder="Enter your Name"/>
											{ errors.name && ( <div className="invalid-feedback">{ errors.name }</div> ) }
										</div>
										<div className="form-group col-12 mb-3">
											<i className="fa fa-user fa-forms-email-mobile"></i>
											<input type="email" id="sign-up-email-mobile" name="email"
											       className={ classnames( 'form-control', {
												       'is-invalid': errors.email
											       } ) }
											       value={ this.state.email }
											       onChange={ this.onChange }
											       aria-describedby="sign-up-email-mobile" placeholder="Enter your email"/>
											{ errors.email && ( <div className="invalid-feedback">{ errors.email }</div> ) }
										</div>
										<div className="form-group col-12 mb-3">
											<i className="fa fa-lock fa-forms-lock"></i>
											<input type="password" id="sign-up-password" name="password"
											       className={ classnames( 'form-control', {
												       'is-invalid': errors.password
											       } ) }
											       value={ this.state.password }
											       onChange={ this.onChange }
											       placeholder="Enter your password"/>
											{ errors.password && ( <div className="invalid-feedback">{ errors.password }</div> ) }
										</div>

										<div className="form-group col-12 mb-3">
											<i className="fa fa-lock fa-forms-lock"></i>
											<input type="password" id="sign-up-confirm-password" name="password2"
											       className={ classnames( 'form-control', {
												       'is-invalid': errors.password2
											       } ) }
											       value={ this.state.password2 }
											       onChange={ this.onChange }
											       placeholder="Confirm your password"/>
											{ errors.password2 && ( <div className="invalid-feedback">{ errors.password2 }</div> ) }
										</div>

										<div className="row checkbox-row">
											<div className="form-group form-check col-12 forms-checkbox text-center">
												<input type="checkbox" style={{ marginTop: '1px' }} className="form-check-input" id="checkbox-sign-up"/>
													<label className="" htmlFor="checkbox-sign-up">By registering, you accept our Terms &amp; Conditions</label>
											</div>
										</div>
										<div className="col-12 send-otp-colm text-center">
											<button type="submit" className="btn btn-primary send-otp-btn btn-post-job">Submit</button>
										</div>
									</form>

									<div className="row or-row pt-3 new-user-sign-up-link">
										<div className="col-4 col-sm-3 pr-0">
											<hr/>
										</div>
										<div className="col-4 col-sm-6 text-center pt-1">
											<p>Already have an account? <Link to="/login">Login</Link></p>
										</div>
										<div className="col-4 col-sm-3 pl-0">
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

Register.propTypes = {
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = ( state ) => ({
	auth: state.auth,
	errors: state.errors
});

export default connect( mapStateToProps, { registerUser } )( withRouter( Register ) );