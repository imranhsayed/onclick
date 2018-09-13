import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HomeBestServices extends Component {
	render(){
		return(
			<div className="container-fluid section-four-container-fluid">
				<div className="container section-four-container">
					<div className="row section-four-row">
						<div className="col-md-4 wow zoomIn mb-3">
							<div className="card">
								<div className="card-body text-center">
									<i className="fas fa-certificate"></i><br/><br/>
									<Link to="/job-listings" className="card-title mb-2">Job Listings</Link><br/>
									<p className="card-text">You can find the best jobs here that suits your needs. You get a quick and reliable service with Onclick</p>
								</div>
							</div>
						</div>
						<div className="col-md-4 wow zoomIn mb-3">
							<div className="card">
								<div className="card-body text-center">
									<i className="fas fa-paint-brush"></i><br/><br/>
									<Link to="/listings" className="card-title mb-2">Business Listings</Link><br/>
									<p className="card-text">You can register your own business as well as find the best business of your requirements on Onclick.</p>
								</div>
							</div>
						</div>
						<div className="col-md-4 wow zoomIn mb-3">
							<div className="card">
								<div className="card-body text-center">
									<i className="fas fa-headset"></i><br/><br/>
									<Link to="/offer-listings" className="card-title mb-2">Offers</Link><br/>
									<p className="card-text">Onclick has offers for everyone. You can add your own offers as well as see the one's that are listed</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	};
}

export default HomeBestServices;