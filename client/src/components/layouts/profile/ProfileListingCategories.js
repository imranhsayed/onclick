import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProfileListingCategories extends Component {
	render() {
		return (

				<div className="col-12 col-md-4 col-lg-3 listing-categories">
					<div className="jumbotron">
						{/* Left side */}
						<div className="col-12">
							<h3 className="cat-main-title">All Categories</h3>
							<form className="filter-form">
								{/*Arts & Entertainment*/}
								<div className="row p-0">
									<div className="col-12 p-0">
										{/*Arts & Entertainment*/}
										<button className="btn filter-list-btn listing-cat-link-btn text-left" type="button" data-toggle="collapse" data-target="#list-cat-arts" aria-expanded="false" aria-controls="colors-filter">
											<h5>Arts &amp; Entertainment</h5>
										</button>
										<div className="collapse" id="list-cat-arts">
											<div className="card card-body">
												{/*Cinema*/}
												<button className="btn filter-list-btn listing-cat-link-btn" type="button" data-toggle="collapse" data-target="#sub-list-cat-cinema" aria-expanded="false" aria-controls="colors-filter">
													<h5>Cinema</h5>
												</button>
												<div className="collapse" id="sub-list-cat-cinema">
													<div className="card card-body sub-cat-card-body">
														<Link to="/"><p>Film Festivals &amp Organizations</p></Link>
														<Link to="/"><p>Movie Theaters</p></Link>
														<Link to="/"><p>Dance Groups &amp Organizations</p></Link>
														<Link to="/"><p>Family Entertainment Centers</p></Link>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>

								{/*Travel*/}
								<div className="row p-0">
									<div className="col-12 p-0">
										{/*Travel*/}
										<button className="btn filter-list-btn listing-cat-link-btn text-left" type="button" data-toggle="collapse" data-target="#list-cat-travel" aria-expanded="false" aria-controls="colors-filter">
											<h5>Travel </h5>
										</button>
										<div className="collapse" id="list-cat-travel">
											<div className="card card-body">
												{/*Air Travel*/}
												<button className="btn filter-list-btn listing-cat-link-btn" type="button" data-toggle="collapse" data-target="#sub-list-cat-air-travel" aria-expanded="false" aria-controls="colors-filter">
													<h5>Air Travel </h5>
												</button>
												<div className="collapse" id="sub-list-cat-air-travel">
													<div className="card card-body sub-cat-card-body">
														<Link to="/"><p> Airlines </p></Link>
														<Link to="/"><p> Airports </p></Link>
														<Link to="/"><p> Helicopter Charters </p></Link>
														<Link to="/"><p>Campgrounds</p></Link>
														<Link to="/"><p>Cruises</p></Link>
														<Link to="/"><p>Ferries</p></Link>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
		);
	}
}

export default ProfileListingCategories;