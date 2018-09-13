import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HomeIcons extends Component {
	render() {
		return (
			// section one icons
			<div className="container-fluid section-one">
				<div className="row section-one-row">
					<div className="col-6 col-sm-4 col-md-3 col-lg-2 section-one-colm">
						<Link to="/category-business-listing/5b7fb2a4838b0e0014b4d31a?category=Automotive%20&%20Vehicles">
							<div className="fa-icons">
								<i className="fas fa-taxi"></i>
							</div>
							<p>Automotive & Vehicles</p>
						</Link>
					</div>
					<div className="col-6 col-sm-4 col-md-3 col-lg-2 section-one-colm">
						<Link to="/category-business-listing/5b7fac2fa1a9ee69a6e26230?category=Arts%20&%20Entertainment">
							<div className="fa-icons">
								<i className="fas fa-tv"></i>
							</div>
							<p>Arts & Entertainments</p>
						</Link>
					</div>
					<div className="col-6 col-sm-4 col-md-3 col-lg-2 section-one-colm">
						<Link to="/category-business-listing/5b83a59e8bc5460014686767?category=Professionals%20&%20Services">
							<div className="fa-icons">
								<i className="far fa-building"></i>
							</div>
							<p>Professionals & Services</p>
						</Link>
					</div>
					<div className="col-6 col-sm-4 col-md-3 col-lg-2 section-one-colm">
						<Link to="/category-business-listing/5b83e97c184ef50014ef19ca?subCat=%20Air%20Travel">
							<div className="fa-icons">
								<i className="fas fa-fighter-jet"></i>
							</div>
							<p>Air Travel</p>
						</Link>
					</div>
					<div className="col-6 col-sm-4 col-md-3 col-lg-2 section-one-colm">
						<Link to="/job-listings">
							<div className="fa-icons">
								<i className="fas fa-briefcase"></i>
							</div>
							<p>Jobs</p>
						</Link>
					</div>
					<div className="col-6 col-sm-4 col-md-3 col-lg-2 section-one-colm">
						<Link to="/category-business-listing/5b83eb4bf172740014847cbc?subCat=%20Trains">
							<div className="fa-icons">
								<i className="fas fa-subway"></i>
							</div>
							<p>Train</p>
						</Link>
					</div>
					<div className="col-6 col-sm-4 col-md-3 col-lg-2 section-one-colm">
						<Link to="/category-business-listing/5b7fcd1b2475bd0014165289?subCat=Life%20Insurance">
							<div className="fa-icons">
								<i className="fas fa-umbrella"></i>
							</div>
							<p>Insurance</p>
						</Link>
					</div>
					<div className="col-6 col-sm-4 col-md-3 col-lg-2 section-one-colm">
						<Link to="/category-business-listing/5b838f158bc546001468667c?category=Food%20&%20Drink">
							<div className="fa-icons">
								<i className="fas fa-hotel"></i>
							</div>
							<p>Hotel</p>
						</Link>
					</div>
					<div className="col-6 col-sm-4 col-md-3 col-lg-2 section-one-colm">
						<Link to="/category-business-listing/5b7fe6b72475bd0014165361?category=Education">
							<div className="fa-icons">
								<i className="fas fa-graduation-cap"></i>
							</div>
							<p>Education</p>
						</Link>
					</div>
					<div className="col-6 col-sm-4 col-md-3 col-lg-2 section-one-colm">
						<Link to="/category-business-listing/5b839a578bc54600146866f1?category=Healthcare">
							<div className="fa-icons">
								<i className="fas fa-dumbbell"></i>
							</div>
							<p>Fitness</p>
						</Link>
					</div>
					<div className="col-6 col-sm-4 col-md-3 col-lg-2 section-one-colm">
						<Link to="/category-business-listing/5b83c59501fb8800141f4bcd?category=Real%20Estate">
							<div className="fa-icons">
								<i className="fas fa-door-open"></i>
							</div>
							<p>Real Estate</p>
						</Link>
					</div>
					<div className="col-6 col-sm-4 col-md-3 col-lg-2 section-one-colm">
						<Link to="/category-job-listing/5b839a578bc54600146866f1?category=Healthcare">
							<div className="fa-icons">
								<i className="fas fa-briefcase-medical"></i>
							</div>
							<p>Doctor</p>
						</Link>
					</div>

					<div className="col-12 categories-link-colm text-center">
					<div className="d-block">
						<Link to="/categories" className="btn btn-primary" style={{ float: 'none' }}>
							View A to Z Categories <i className="fas fa-arrow-right"></i>
						</Link>
					</div>
					</div>
				</div>
			</div>
		);
	}
}

export default HomeIcons;