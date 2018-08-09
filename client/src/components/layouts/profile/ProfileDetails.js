import React from 'react';

export default () => {
	return (
		<div className="col-md-6 pd-sec-one-details-text">
			<div className="card">
				<div className="card-body">
					<div className="row">
						<div className="col-12">
							<h5 className="card-title">Apple Salon</h5>
							<div className="row card-text-row">
								<div className="col-12 mb-1 desc">
									<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
										tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
										quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
										consequat.</p>
								</div>
								<div className="col-12 links pb-2">
									<a href="#"><i className="fas fa-map-marker-alt"></i> Shanti Nagar, Pune</a>
								</div>
								<div className="col-12 col-md-6 links pb-2">
									<a href="#"><i className="fa fa-user"></i> Satish Sharma</a>
								</div>
								<div className="col-12 col-md-6 links pb-2">
									<a href="#"><i className="fas fa-folder-open"></i> Verified</a>
								</div>
								<div className="col-12 categories pt-2">
									<p>Categories: Salon</p>
								</div>
								<div className="col-12 pt-1 fa-star-icons pb-2">
									<a href="#">
										<p><i className="fas fa-star"></i> <i className="fas fa-star"></i> <i className="fas fa-star"></i> <i className="fas fa-star"></i> <i className="fas fa-star-half-alt"></i>
											&nbsp; 1 Review</p></a>
								</div>
								<div className="col-12 social-icons">
									<p className="mb-0">Share</p>
									<a href="#"><i className="fab fa-facebook facebook"></i></a>
									<a href="#"><i className="fab fa-twitter-square twitter"></i></a>
									<a href="#"><i className="fab fa-linkedin linkedin"></i></a>
									<a href="#"><i className="fab fa-google-plus-square google-plus-square"></i></a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}