import React from 'react';
import PropTypes from 'prop-types';
import ImageGallery from 'react-image-gallery';

import DataFetcher from 'components/DataFetcher';
import { getImgServerUrl } from 'util/img-util';

import "react-image-gallery/styles/css/image-gallery.css";

const EMPTY_PICTURES = {
    original : '/img/icons/image-square-outline.svg',
    thumbnail : '/img/icons/image-square-outline.svg'
};

const ProductGallery = ({ productId }) => (
    <DataFetcher url={`/picture-item/${productId}`}>
        { data => {
            const images = data.length ?
                data.map(picture => ({
                    thumbnail : getImgServerUrl(picture.src, 25),
                    original : getImgServerUrl(picture.src)
                })) :
                [EMPTY_PICTURES];

            return (
                <ImageGallery
                    items={images}
                    showPlayButton={false}
                />
            );
        } }
    </DataFetcher>
);

ProductGallery.propTypes = {
    productId : PropTypes.number.isRequired
};

export default ProductGallery;