import React from 'react';

export default () => {
	return(
		<header className="home-banner forms-banner" role="banner" style={{ backgroundImage: 'url(img/home/home-banner-2.png)' }}>
			<div className="overlay"></div>
			<div className="row h-100">
				<div className="col-md-12 my-auto text-center">
					<h1>
						Login
					</h1>
				</div>
				<div className="col-md-12 text-left folder-path">
					<p>Home/<b className="color">Login</b></p>
				</div>
			</div>
		</header>
	);
}