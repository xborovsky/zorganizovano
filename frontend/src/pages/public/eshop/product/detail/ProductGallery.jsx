import React from 'react';
import PropTypes from 'prop-types';
import ImageGallery from 'react-image-gallery';

import DataFetcher from 'components/DataFetcher';

import "react-image-gallery/styles/css/image-gallery.css";
import './ProductGallery.css';

const EMPTY_PICTURES = {
    original : '/img/icons/image-square-outline.svg',
    thumbnail : '/img/icons/image-square-outline.svg'
};

const IMAGE_SIZES = [200, 600, 900, 1200, 1536, 2000];

const URL = `${process.env.NODE_ENV === "production" ? 'https://zorganizovano.cz' : 'http://localhost:3000'}/img/product-details`;

const ProductGallery = ({ productId }) => {

    const getImages = images => images.map(image => {
        const imageName = image.src.substring(0, image.src.lastIndexOf('.'));
        const imageFileExt = image.src.substring(image.src.lastIndexOf('.'));
        let srcSet = '';

        IMAGE_SIZES.reverse().forEach(imageSize => srcSet += `${URL}/${imageName}_w${imageSize}${imageFileExt} ${imageSize}w, `);

        return {
            srcSet : srcSet.substring(0, srcSet.length - 2),
            thumbnail : `${URL}/${imageName}_w${200}${imageFileExt}`
        };
    });

    return (
        <DataFetcher queryId={['item-picture', productId]} url={`/picture-item/${productId}`}>
            { data => {
                const images = data.length ?
                    getImages(data) :
                    [EMPTY_PICTURES];

                return (
                    <ImageGallery
                        items={images}
                        showPlayButton={false}
                        originalHeight="50vh"
                    />
                );
            } }
        </DataFetcher>
    );
};

ProductGallery.propTypes = {
    productId : PropTypes.number.isRequired
};

export default ProductGallery;