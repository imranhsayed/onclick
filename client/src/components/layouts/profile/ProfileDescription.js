import React from 'react';

export default () => {
	return (
		<div className="container-fluid pd-section-two-container">
			<div className="row pd-section-two-row">
				<div className="col-12 col-md-8 pd-left-desc">
					<div className="card h-100">
						<div className="card-body">
							<h1 className="card-title">Description</h1>
							<p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
								tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
								quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
								consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
								cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
								proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
							<a href="detail-product.php">
								<button type="button" className="btn btn-primary send-otp-btn btn-post-job product-bid-on-project-btn">Bid on This Project</button>
							</a>
						</div>
					</div>
				</div>
				<div className="col-12 col-md-4 pd-right-desc">
					<div className="card h-100">
						<div className="card-body">
							<h1>Short Info</h1>
							<p className="pt-2"><a href="#"><i className="fas fa-file-signature"></i> &nbsp; More services</a></p>
							<p><a href="#"><i className="fas fa-print"></i> &nbsp; Print this</a></p>
							<p><a href="#"><i className="fas fa-share-square"></i> &nbsp; Send to friend</a></p>
							<p><a href="#"><i className="fas fa-flag"></i> &nbsp; Report this</a></p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}