import React, { Component } from 'react';

class HomeSubscribe extends Component {
	render() {
		return(
			// section five subscribe
			<div className="containe-fluid section-five">
				<div className="row section-five-row">
					<div className="col-md-6">
						<h1>Join our 10,000+ subscribers and get access to the latest templates, freebies, announcements and resources!</h1>
					</div>
					<div className="col-md-6 search-btn-colm email-sub-section-five">
						<form className="form-inline my-2 my-lg-0">

							<input className="form-control mr-sm-2 search-input" type="search" placeholder="Enter your email" aria-label="Search"/>

								<button className="btn btn-primary btn-post-job btn-home-search my-2 my-sm-0" type="submit">Subscribe</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default HomeSubscribe;