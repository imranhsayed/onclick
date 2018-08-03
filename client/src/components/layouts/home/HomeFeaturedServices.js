import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HomeFeaturedServices extends Component {
	render() {
		return(
			// Featured Services
			<div className="container section-two pd-section-two-container">
				<div className="row section-two-title text-center">
					<h1>Featured Services</h1>
				</div>
				<div className="row section-two-row">
					<div className="col-12 col-md-6 col-lg-4 section-two-colm wow pulse">
						<div className="card">
							<img className="card-img-top" src="./img/home/card-world.jpg" alt="services" />
								<div className="card-body">
									<div className="row">
										<div className="col-12 col-md-8">
											<Link to="#"><h5 className="card-title">Travel World</h5></Link>
											<div className="row card-text-row">
												<div className="col-12 mb-1">
													<Link to="#">
														Lorem ipsum dolor sit
													</Link>
												</div>
												<div className="col-12 pt-1 fa-star-icons pb-2">
													<Link to="#">
														<p><i className="fas fa-star"></i> <i className="fas fa-star"></i> <i className="fas fa-star"></i> <i className="fas fa-star"></i> <i className="fas fa-star-half-alt"></i>
															&nbsp; 1 Review</p></Link>
												</div>
											</div>
										</div>
										<div className="col-12 col-md-4 my-auto pl-0 pb-2">
											<h3 className="price">3000 <i className="fas fa-rupee-sign fa-price-rupee"></i></h3>
										</div>
									</div>
									<div className="row card-text-row">
										<div className="col-12 fs-location-text">
											<hr className="mt-0 mb-3" />
												<Link to="#"><i className="fas fa-map-marker-alt"></i> Shanti Nagar, Pune</Link>
										</div>
									</div>
								</div>
						</div>
					</div>

					<div className="col-12 col-md-6 col-lg-4 section-two-colm wow pulse">
						<div className="card">
							<img className="card-img-top" src="img/home/card-clinic.jpg" alt="services" />
								<div className="card-body">
									<div className="row">
										<div className="col-12 col-md-8">
											<Link to="#"><h5 className="card-title">Royal Clinic</h5></Link>
											<div className="row card-text-row">
												<div className="col-12 mb-1">
													<Link to="#">
														Lorem ipsum dolor sit
													</Link>
												</div>
												<div className="col-12 pt-1 fa-star-icons pb-2">
													<Link to="#">
														<p><i className="fas fa-star"></i> <i className="fas fa-star"></i> <i className="fas fa-star"></i> <i className="fas fa-star"></i> <i className="fas fa-star-half-alt"></i>
															&nbsp; 1 Review</p></Link>
												</div>
											</div>
										</div>
										<div className="col-12 col-md-4 my-auto pl-0 pb-2">
											<h3 className="price">300 <i className="fas fa-rupee-sign fa-price-rupee"></i></h3>
										</div>
									</div>
									<div className="row card-text-row">
										<div className="col-12 fs-location-text">
											<hr className="mt-0 mb-3"/>
												<Link to="#"><i className="fas fa-map-marker-alt"></i> Shanti Nagar, Pune</Link>
										</div>
									</div>
								</div>
						</div>
					</div>

					<div className="col-12 col-md-6 col-lg-4 section-two-colm wow pulse">
						<div className="card">
							<img className="card-img-top"
							     src="img/home/card-gym.jpg" alt="services"/>
								<div className="card-body">
									<div className="row">
										<div className="col-12 col-md-8">
											<Link to="#"><h5 className="card-title">Golds Gym</h5></Link>
											<div className="row card-text-row">
												<div className="col-12 mb-1">
													<Link to="#">
														Lorem ipsum dolor sit
													</Link>
												</div>
												<div className="col-12 pt-1 fa-star-icons pb-2">
													<Link to="#">
														<p><i className="fas fa-star"></i> <i className="fas fa-star"></i> <i className="fas fa-star"></i> <i className="fas fa-star"></i> <i className="fas fa-star-half-alt"></i>
															&nbsp; 1 Review</p></Link>
												</div>
											</div>
										</div>
										<div className="col-12 col-md-4 my-auto pl-0 pb-2">
											<h3 className="price">3000 <i className="fas fa-rupee-sign fa-price-rupee"></i></h3>
										</div>
									</div>
									<div className="row card-text-row">
										<div className="col-12 fs-location-text">
											<hr className="mt-0 mb-3"/>
												<Link to="#"><i className="fas fa-map-marker-alt"></i> Shanti Nagar, Pune</Link>
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

export default HomeFeaturedServices;