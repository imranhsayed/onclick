import React, { Component } from 'react';
import PostJobBanner from './layouts/post-job/PostJobBanner';
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";

class PostJob extends Component {
	render() {
		return(
			<div>
				<Navbar/>
				<PostJobBanner/>
				<div className="container forms-section">
					<div className="row forms-section-row">
						<div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
							<div className="card">
								<div className="card-header text-center">
									Post Free Job
								</div>
								<div className="card-body post-free-job-card-body">
									<form method="post" action="sign-up.php">
										<div className="form-group col-12 mb-3">
											<label for="service-name" className="service-name-label mt-2">Please tell us service you'r looking for</label>
											<i className="fas fa-search fa-post-free-job-search"></i>
											<input type="text" className="form-control" id="post-free-job-name" placeholder="eg. Carpenter, Website Developer, Interior Designer"/>
										</div>
										<div className="form-group col-12 col-sm-8 mb-4">
											<label for="budget" className="job-mobile-num-label mt-2 pl-3">What is your budget</label>
											<div className="row budget-row">
												<i className="fa fa-rupee-sign fa-job-rupee"
												></i>
												<input type="number" className="form-control col-5 mr-1" id="post-free-job-mobile-number" placeholder="Min"/>

													<i className="fa fa-rupee-sign fa-job-rupee"></i>
													<input type="number" className="form-control col-5" id="post-free-job-mobile-number" placeholder="Max"/>
											</div>
										</div>
										<div className="form-group form-check col-12 pl-5 forms-checkbox">
											<input type="checkbox" className="form-check-input" id="checkbox-any-budget"/>
												<label className="form-job-check-label" for="checkbox-any-budget">Any budget</label>
										</div>

										<div className="form-group col-12 col-sm-8 col-lg-7 mb-3">
											<label for="budget" className="job-location-label mt-2">Location</label>
											<i className="fa fa-map-marker-alt fa-job-location"></i>
											<input type="text" className="form-control" id="post-free-job-location" placeholder="Enter your location"/>
										</div>
										<div className="form-group col-12 col-sm-8 col-lg-8 mb-3">
											<label for="job-post-address">Address</label>
											<textarea className="form-control" id="job-post-address" rows="5" placeholder="Enter your address"></textarea>
										</div>
										<div className="form-group col-12 col-sm-8 col-lg-7 mb-4">
											<label for="mobile number" className="job-mobile-num-label mt-2">Mobile Number</label>
											<i className="fa fa-mobile-alt fa-job-mobile"></i>
											<input type="number" className="form-control" id="post-free-job-mobile-number" placeholder="Enter your mobile number" />
										</div>
										<div className="form-group col-12 col-sm-8 col-lg-7 mb-5 ml-2">
											<label for="upload-images-job">Upload Images</label>
											<div className="post-free-job-btn btn-post-job upload-job-button">
												<input type="file" className="form-control-file" id="post-free-job-upload-images" />
													<p><i className="fa fa-plus fa-job-upload-plus"></i>Upload</p>
											</div>
										</div>
										<div className="form-group form-check col-12 pl-5 forms-checkbox">
											<input type="checkbox" className="form-check-input" id="checkbox-free-job-post" />
												<label className="form-job-check-label" for="checkbox-free-job-post">I Agree to Terms &amp; Conditions</label>
										</div>
										<div className="col-12 send-otp-colm text-left ml-1 mb-3">
											<button type="submit" className="btn btn-primary post-free-job-btn btn-post-job">Post Free Job</button>
										</div>
									</form>

								</div>
							</div>
						</div>
					</div>
				</div>
				<Footer/>
			</div>
		);
	}
}

export default PostJob;