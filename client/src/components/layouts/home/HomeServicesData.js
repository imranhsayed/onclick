import React, { Component } from 'react';

class HomeServicesData extends Component {
	render() {
		return(
			<div className="container-fluid section-three">
				<div className="row section-three-row">
					<div className="col-md-3 text-center">
						<i className="fas fa-folder-open"></i>
						<h1>12090</h1>
						<p>Regular Service</p>
					</div>
					<div className="col-md-3 text-center">
						<i className="fas fa-map-marker-alt"></i>
						<h1>960</h1>
						<p>Locations</p>
					</div>
					<div className="col-md-3 text-center">
						<i className="fas fa-user"></i>
						<h1>234562</h1>
						<p>Regular Members</p>
					</div>
					<div className="col-md-3 text-center">
						<i className="fas fa-briefcase"></i>
						<h1>250</h1>
						<p>Permium Ads</p>
					</div>
				</div>
			</div>
		);
	}
}

export default HomeServicesData;