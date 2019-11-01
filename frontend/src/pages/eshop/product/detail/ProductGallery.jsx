import React from 'react';
import PropTypes from 'prop-types';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

import DataFetcher from 'components/DataFetcher';

const EMPTY_PICTURES = {
    original : '/img/icons/image-square-outline.svg',
    thumbnail : '/img/icons/image-square-outline.svg'
};

const BASE_URL = '/img/products';

const ProductGallery = ({ productId }) => (
    <DataFetcher url={`/picture-item/${productId}`}>
        { data => (
            <ImageGallery
                items={
                    data.length ?
                        data.map(picture => {
                            const srcSetWithBaseUrls = picture.srcSet.split(',').map(src => `${BASE_URL}/${src.trim()}`).join(', ');
                            return {
                                thumbnail : `${BASE_URL}/${picture.thumbnail}`,
                                original : `${BASE_URL}/${picture.src}`,
                                srcSet : `${srcSetWithBaseUrls}`
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