import React, { Component } from 'react';

class HomeBestServices extends Component {
	render(){
		return(
			<div className="container-fluid section-four-container-fluid">
				<div className="container section-four-container">
					<div className="row section-four-row">
						<div className="col-md-4 wow zoomIn mb-3">
							<div className="card">
								<div className="card-body text-center">
									<i className="fas fa-certificate"></i>
									<h5 className="card-title">Best Services</h5>
									<p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, eiusmod
										tempor incididunt ut labore.</p>
								</div>
							</div>
						</div>
						<div className="col-md-4 wow zoomIn mb-3">
							<div className="card">
								<div className="card-body text-center">
									<i className="fas fa-paint-brush"></i>
									<h5 className="card-title">Best Services</h5>
									<p className="card-text">Lorem ipsum dolor sit amet,consectetur adipisicing elit, eiusmod
										tempor incididunt ut labore.</p>
								</div>
							</div>
						</div>
						<div className="col-md-4 wow zoomIn mb-3">
							<div className="card">
								<div className="card-body text-center">
									<i className="fas fa-headset"></i>
									<h5 className="card-title">Best Services</h5>
									<p className="card-text">Lorem ipsum dolor sit amet,consectetur adipisicing elit, eiusmod
										tempor incididunt ut labore.</p>
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