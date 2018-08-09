import React from 'react';

export default () => {
	return (
			<div className="xzoom-container">
				<img className="xzoom4" id="xzoom-fancy" src="../images/gallery/preview/01_b_car.jpg" xoriginal="../images/gallery/original/01_b_car.jpg" />
				<div className="xzoom-thumbs">
					<a href="../images/gallery/original/01_b_car.jpg"><img className="xzoom-gallery4" width="80" src="../images/gallery/thumbs/01_b_car.jpg"  xpreview="images/gallery/preview/01_b_car.jpg"/></a>
					<a href="../images/gallery/original/02_o_car.jpg"><img className="xzoom-gallery4" width="80" src="../images/gallery/preview/02_o_car.jpg" /></a>
					<a href="../images/gallery/original/03_r_car.jpg"><img className="xzoom-gallery4" width="80" src="../images/gallery/preview/03_r_car.jpg" /></a>
					<a href="../images/gallery/original/04_g_car.jpg"><img className="xzoom-gallery4" width="80" src="../images/gallery/preview/04_g_car.jpg" /></a>
				</div>
			</div>
	);
}