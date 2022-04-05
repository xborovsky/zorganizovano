import React from 'react';
import PropTypes from 'prop-types';
import ImageGallery from 'react-image-gallery';

import DataFetcher from 'components/DataFetcher';
import { buildCdnUrl } from 'components/CdnImage';

import "react-image-gallery/styles/css/image-gallery.css";

const EMPTY_PICTURES = {
    original : '/img/icons/image-square-outline.svg',
    thumbnail : '/img/icons/image-square-outline.svg'
};

const ProductGallery = ({ productId }) => {
    const getCdnImages = images => images.map(image => ({
        original : buildCdnUrl(image.src, window.screen.height),
        thumbnail : buildCdnUrl(image.src)
    }));

    return (
        <DataFetcher queryId={['item-picture', productId]} url={`/picture-item/${productId}`}>
            { data => {
                const images = data.length ?
                    getCdnImages(data) :
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
};

ProductGallery.propTypes = {
    productId : PropTypes.number.isRequired
};

export default ProductGallery;