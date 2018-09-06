import React from 'react';
import "react-image-gallery/styles/css/image-gallery-no-icon.css";
import ImageGallery from 'react-image-gallery';

export default () => {

	const images = [
		{
			original: '/gallery/original/01_b_car.jpg',
			thumbnail: '/gallery/original/01_b_car.jpg',
		},
		{
			original: '/gallery/original/02_o_car.jpg',
			thumbnail: '/gallery/original/02_o_car.jpg',
		},
		{
			original: '/gallery/original/03_r_car.jpg',
			thumbnail: '/gallery/original/03_r_car.jpg',
		},
	];

	return (
		<div style={{ width: '400px' }}>
			<ImageGallery items={images}/>
		</div>
	);
}