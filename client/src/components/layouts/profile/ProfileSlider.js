import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "react-image-gallery/styles/css/image-gallery-no-icon.css";
import ImageGallery from 'react-image-gallery';

class ProfileSlider extends Component {

	render() {
		let imageGallery = '', images = [];
		const { profile } = this.props;
		const galleryImages = profile.businessGalleryImages;

		if ( null !== profile && Object.keys( profile ).length ) {
			// If user has added the gallery Images
			if ( galleryImages.length ) {

				galleryImages.map( imgSrc => {
					images.push( {
						original: imgSrc,
						thumbnail: imgSrc,
					} );
				} );

				imageGallery = <ImageGallery items={images}/>;
			} else {
				// If user has not added the gallery images show default image.
				images = [
					{
						original: '/images/default-image.png',
						thumbnail: '/images/default-image.png',
					},
				];

				imageGallery = <ImageGallery items={images}/>;
			}
		} else {
			imageGallery = <img src="/img/spinner.gif" style={{ width: '200px', margin: 'auto', display: 'block' }} alt="spinner"/>;
		}


		return (
			<div style={{ width: '400px' }}>
				{ imageGallery }
			</div>
		);
	}
}

ProfileSlider.propTypes = {
	profile: PropTypes.object.isRequired
};

export default ProfileSlider;