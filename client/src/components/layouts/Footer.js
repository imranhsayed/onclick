import React, { Component } from 'react';

class Footer extends Component {
	render(){
		return (
			<div>
				<footer className="footer1">
					<div className="row">
						<div className="col-md-4 onclickbiz-colm">
							<h1>Onclickbiz</h1>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do.</p>
							<a href=""><i className="fab fa-facebook"></i></a>
							<a href=""><i className="fab fa-instagram"></i></a>
							<a href=""><i className="fab fa-twitter"></i></a>
							<a href=""><i className="fab fa-google"></i></a>
						</div>
						<div className="col-md-2 latest-ad-colm">
							<h1>Latest Ad</h1>
							<img src="../img/footer/ad.jpg" alt="footer-img"/>
						</div>
						<div className="col-md-3 help-colm">
							<h1>Help and Support</h1>
							<div className="row links-row">
								<div className="col-lg-6">
									<a href=""><p>Live Chat</p></a>
								</div>
								<div className="col-lg-6">
									<a href=""><p>Support</p></a>
								</div>
								<div className="col-lg-6">
									<a href=""><p>Privacy Policy</p></a>
								</div>
								<div className="col-lg-6">
									<a href=""><p>Contact Us</p></a>
								</div>
							</div>
						</div>
						<div className="col-md-3 subscribe-colm">
							<h1>Subscribe Us</h1>

							<div className="row subscribe-colm-row">
								<div className="col-12">
									<h2>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
										tempor incididunt ut labore et dolore magna aliqua.</h2>
								</div>
								<div className="col-12 search-btn-colm email-sub-section-five">
									<form className="form-inline my-2 my-lg-0">

										<div className="col-md-6">
											<input className="form-control mr-sm-2 search-input" type="search" placeholder="Enter your email" aria-label="Search"/>
										</div>

										<div className="col-md-6">
											<button className="btn btn-primary btn-post-job btn-home-search my-2 my-sm-0" type="submit">Subscribe</button>
										</div>
									</form>
								</div>
							</div>

						</div>
					</div>
				</footer>

				<footer className="footer2">
					<div className="row">
						<div className="col-md-6 text">
							All copyrights reserved &copy; 2018 - <a href="">myrl.tech</a>
						</div>
						<div className="col-md-6 icons">
							<a href="">
								<i className="fab fa-cc-paypal"></i>
							</a>
							<a href="">
								<i className="fab fa-cc-visa"></i>
							</a>
						</div>
					</div>
				</footer>
			</div>
		);
	}
}

export default Footer;