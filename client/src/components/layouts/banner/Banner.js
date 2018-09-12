import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Banner extends Component {
	render() {

		const { heading } = this.props;
		return(
			<div>
				<header className="home-banner forms-banner" role="banner">
					<div className="overlay"></div>
					<div className="row h-100">
						<div className="col-md-12 my-auto text-center">
							<h1>
								{ heading }
							</h1>
						</div>
						<div className="col-md-12 text-left folder-path">
							<p>Home/<b className="color">{ heading }</b></p>
						</div>
					</div>
				</header>
			</div>
		);
	}
}

Banner.propTypes = {
	heading: PropTypes.object.isRequired
};



export default Banner;