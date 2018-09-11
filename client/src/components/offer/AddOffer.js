import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DashboardNav from './../../components/layouts/dashboard/DashboardNav';
import DashboardSidebar from './../../components/layouts/dashboard/DashboardSidebar';
import { addOffer } from "../../actions/offerActions";
import classnames from "classnames";
import $ from "jquery";

class AddOffer extends Component {

	constructor( props ) {
		super( props );

		this.state = {
			title: '',
			description: '',
			errors: {}
		}
	}

	componentWillReceiveProps( newProps ) {
		if ( newProps.errors ) {
			this.setState({ errors: newProps.errors });
		}
	}

	onSubmit = ( event ) => {
		event.preventDefault();
		const { user } = this.props.auth;
		const userId = ( user.id ) ? user.id : user._id;

		const offerData = {
			userId: userId,
			title: this.state.title,
			description: this.state.description
		};

		this.props.addOffer( offerData );

		if ( this.state.title && this.state.description ) {
			this.ocShowAlert( 'Offer Successfully Added', '#3089cf' );
			this.setState( {
				title: '',
				description: ''
			} );
			this.setState({
				errors: { title: '', description: '' }
			} );
			console.log( 'myeirr', this.state.errors );
		} else {
			this.ocShowAlert( 'Missing fields', 'red' );
		}

	};

	onChange = ( event ) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	// ShowAlert Function
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
		const { errors } = this.state;

		return(
			<div className="container-scroller">
				<DashboardNav/>
				<div className="container-fluid page-body-wrapper">
					<DashboardSidebar/>
					<div id="oc-alert-container"></div>

					<form onSubmit={ this.onSubmit } style={ { padding: '24px', width: '100%' } }>
						<h3>Add New Offer</h3>
						<br/>
						<div className="form-group">
							<label htmlFor="title">Title</label>
							<input
								className={ classnames( 'form-control', {
									'is-invalid': errors.title
								} ) }
								placeholder="Offer Title"
								name="title"
								value={this.state.title}
								onChange={this.onChange}
							/>
							{ errors.title && ( <div className="invalid-feedback">{ errors.title }</div> ) }
						</div>
						<div className="form-group">
							<label htmlFor="description">Description</label>
							<input
								className={ classnames( 'form-control', {
									'is-invalid': errors.description
								} ) }
								placeholder="Description"
								name="description"
								value={this.state.description}
								onChange={this.onChange}
							/>
							{ errors.description && ( <div className="invalid-feedback">{ errors.description }</div> ) }
						</div>
						<button type="submit" className="btn btn-primary">Add Offer</button>
					</form>
				</div>
			</div>
		);
	}
}

AddOffer.propTypes = {
	addOffer: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired
};


const mapStateToProps = ( state ) => ({
	auth: state.auth,
	errors: state.errors
});

export default connect( mapStateToProps, { addOffer } )( AddOffer );