import React, { Component } from 'react';
import DashboardFooter from "./DashboardFooter";

class DashboardHome extends Component {
	render(){
		return(
			<div className="main-panel">
				<div className="content-wrapper">
					<div className="page-header">
						<h3 className="page-title">
              <span className="page-title-icon bg-gradient-primary text-white mr-2">
                <i className="mdi mdi-home"></i>
              </span>
							Dashboard
						</h3>
						<nav aria-label="breadcrumb">
							<ul className="breadcrumb">
								<li className="breadcrumb-item active" aria-current="page">
									<span></span>Overview
									<i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle"></i>
								</li>
							</ul>
						</nav>
					</div>
					<div className="row">
						<div className="col-md-4 stretch-card grid-margin">
							<div className="card bg-gradient-danger card-img-holder text-white">
								<div className="card-body">
									<img src="images/dashboard/circle.svg" className="card-img-absolute" alt="circle"/>
									<h4 className="font-weight-normal mb-3">Posted Jobs
										<i className="mdi mdi-chart-line mdi-24px float-right"></i>
									</h4>
									<h2 className="mb-5">15,0000</h2>
									<h6 className="card-text">Jobs posted on Site</h6>
								</div>
							</div>
						</div>
						<div className="col-md-4 stretch-card grid-margin">
							<div className="card bg-gradient-info card-img-holder text-white">
								<div className="card-body">
									<img src="images/dashboard/circle.svg" className="card-img-absolute" alt="circle"/>
									<h4 className="font-weight-normal mb-3">Completed Jobs
										<i className="mdi mdi-bookmark-outline mdi-24px float-right"></i>
									</h4>
									<h2 className="mb-5">45,6334</h2>
									<h6 className="card-text">Jobs Completed on Site</h6>
								</div>
							</div>
						</div>
						<div className="col-md-4 stretch-card grid-margin">
							<div className="card bg-gradient-success card-img-holder text-white">
								<div className="card-body">
									<img src="images/dashboard/circle.svg" className="card-img-absolute" alt="circle"/>
									<h4 className="font-weight-normal mb-3">Vendors on Site
										<i className="mdi mdi-diamond mdi-24px float-right"></i>
									</h4>
									<h2 className="mb-5">95,5741</h2>
									<h6 className="card-text">No of vendors</h6>
								</div>
							</div>
						</div>
					</div>
				</div>
				<DashboardFooter/>
			</div>
		);
	}
}

export default DashboardHome;