import React from 'react';
import PropTypes from 'prop-types';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

import DataFetcher from 'components/DataFetcher';
import { getImgServerUrl } from 'util/img-util';

import './ProductGallery.css';

const EMPTY_PICTURES = {
    original : '/img/icons/image-square-outline.svg',
    thumbnail : '/img/icons/image-square-outline.svg'
};

const ProductGallery = ({ productId }) => (
    <DataFetcher url={`/picture-item/${productId}`}>
        { data => (
            <ImageGallery
                items={
                    data.length ?
                        data.map(picture => {
                            return {
                                thumbnail : getImgServerUrl(picture.src, 25),
                                original : getImgServerUrl(picture.src)
                            };
                        }) : [EMPTY_PICTURES]
                }
                showPlayButton={false}
            />
        ) }
    </DataFetcher>
);

ProductGallery.propTypes = {
    productId : PropTypes.number.isRequired
};

export default ProductGallery;