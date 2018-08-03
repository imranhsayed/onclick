import React, { Component } from 'react';

class HomeBanner extends Component {
	render() {
		return (
			<header className="home-banner" role="banner">
				<div className="overlay"></div>
				<div className="row h-100">
					<div className="col-md-12 my-auto text-center">
						<h1>
							WELCOME TO <b>ONCLICKBIZ</b>
						</h1>
						<h2>
							Your Search for best Service Ends here
						</h2>
						<div className="row">
							<div className="col-lg-12 search-btn-colm">
								<form className="form-inline my-2 my-lg-0">
									<input className="form-control mr-sm-2 search-input" type="search" placeholder="Enter Services" aria-label="Search"/>
									<button className="btn btn-primary btn-post-job btn-home-search my-2 my-sm-0" type="submit"><i className="fas fa-search"></i>Search</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</header>
		);
	}
}

export default HomeBanner;