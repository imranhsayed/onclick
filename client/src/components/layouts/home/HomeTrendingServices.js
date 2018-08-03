import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HomeTrendingServices extends Component {
	render() {
		return (
			// Section two
			<div className="container section-two">
				<div className="row section-two-title text-center">
					<h1>Trending Services</h1>
				</div>
				<div className="row section-two-row">
					<div className="col-12 col-md-6 col-lg-4 section-two-colm wow pulse">
						<div className="card">
							<div className="heart-icon">
								<Link to="#"><i className="far fa-heart"></i></Link>
							</div>
							<img className="card-img-top" src="img/home/card-hotel.jpg" alt="services"/>
								<div className="card-body">
									<Link to="#"><h5 className="card-title">Best Hotel Room</h5></Link>
									<h3 className="card-last-update">Last update: 1 hr ago</h3>

									<div className="row card-text-row">
										<div className="col-12 col-md-6 pb-2">
											<Link to="#">
												<i className="fas fa-map-marker-alt"></i>Kurla, Mumbai
											</Link>
										</div>
										<div className="col-12 col-md-6 pb-2">
											<Link to="#">
												<i className="fas fa-clock"></i>Feb 14, 2018
											</Link>
										</div>
									</div>
									<div className="row card-text-row">
										<div className="col-12 col-md-6 pb-2">
											<Link to="#">
												<i className="fas fa-user"></i>Satish Sharma
											</Link>
										</div>
										<div className="col-12 col-md-6 pb-2">
											<Link to="#">
												<i className="fas fa-folder"></i>Verified
											</Link>
										</div>
									</div>
								</div>
						</div>
					</div>

					<div className="col-12 col-md-6 col-lg-4 section-two-colm wow pulse">
						<div className="card">
							<div className="heart-icon">
								<Link to="#"><i className="far fa-heart"></i></Link>
							</div>
							<img className="card-img-top" src="img/home/card-cab.jpg" alt="services"/>
								<div className="card-body">
									<Link to="#"><h5 className="card-title">Go Cab</h5></Link>
									<h3 className="card-last-update">Last update: 1 hr ago</h3>

									<div className="row card-text-row">
										<div className="col-12 col-md-6 pb-2">
											<Link to="#">
												<i className="fas fa-map-marker-alt"></i>Kurla, Mumbai
											</Link>
										</div>
										<div className="col-12 col-md-6 pb-2">
											<Link to="#">
												<i className="fas fa-clock"></i>Feb 14, 2018
											</Link>
										</div>
									</div>
									<div className="row card-text-row">
										<div className="col-12 col-md-6 pb-2">
											<Link to="#">
												<i className="fas fa-user"></i>Satish Sharma
											</Link>
										</div>
										<div className="col-12 col-md-6 pb-2">
											<Link to="#">
												<i className="fas fa-folder"></i>Verified
											</Link>
										</div>
									</div>
								</div>
						</div>
					</div>

					<div className="col-12 col-md-6 col-lg-4 section-two-colm wow pulse">
						<div className="card">
							<div className="heart-icon">
								<Link to="#"><i className="far fa-heart"></i></Link>
							</div>
							<img className="card-img-top" src="img/home/card-teaching.jpg" alt="services" />
								<div className="card-body">
									<Link to="#"><h5 className="card-title">Teaching Typing</h5></Link>
									<h3 className="card-last-update">Last update: 1 hr ago</h3>

									<div className="row card-text-row">
										<div className="col-12 col-md-6 pb-2">
											<Link to="#">
												<i className="fas fa-map-marker-alt"></i>Kurla, Mumbai
											</Link>
										</div>
										<div className="col-12 col-md-6 pb-2">
											<Link to="#">
												<i className="fas fa-clock"></i>Feb 14, 2018
											</Link>
										</div>
									</div>
									<div className="row card-text-row">
										<div className="col-12 col-md-6 pb-2">
											<Link to="#">
												<i className="fas fa-user"></i>Satish Sharma
											</Link>
										</div>
										<div className="col-12 col-md-6 pb-2">
											<Link to="#">
												<i className="fas fa-folder"></i>Verified
											</Link>
										</div>
									</div>
								</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default HomeTrendingServices;