import React, { Component } from 'react';
import classnames from "classnames";
import { Link } from 'react-router-dom';
import Navbar from './../../../components/layouts/Navbar';
import Footer from './../../../components/layouts/Footer';
import Banner from "./../banner/Banner";

class ContactUs extends Component {
	render(){
		return(
			<div>
				<Navbar/>
				<Banner heading={'Contact Us'}/>
				<div className="container forms-section">
					<br/><br/>
					<div className="jumbotron">
						<h1 className="display-3">Contact Us</h1>
						<p className="lead">Akshay Sonawane</p>
						<hr className="my-4"/>
							<p>Email : akshay.sonawane@gmail.com</p>
							<p>Contact No : 99601109050</p>
							<p className="lead">
								<Link className="btn btn-primary btn-lg" to="/">Learn more</Link>
							</p>
					</div>
				</div>
				<Footer/>
			</div>
		);
	}
}

export default ContactUs;