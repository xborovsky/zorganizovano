import React from 'react';
import PropTypes from 'prop-types';
import ImageGallery from 'react-image-gallery';
import { AdvancedImage, responsive, lazyload, placeholder } from '@cloudinary/react';
import { fill } from "@cloudinary/base/actions/resize";
import { auto } from "@cloudinary/base/qualifiers/format";
import { format, quality } from "@cloudinary/base/actions/delivery";
import { auto as qAuto } from "@cloudinary/base/qualifiers/quality";

import DataFetcher from 'components/DataFetcher';
import { getCloudinaryImageName } from 'util/img-util';
import useCloudinary from 'hooks/use-cloudinary';

import "react-image-gallery/styles/css/image-gallery.css";

const EMPTY_PICTURES = {
    original : '/img/icons/image-square-outline.svg',
    thumbnail : '/img/icons/image-square-outline.svg'
};

const ProductGallery = ({ productId }) => {
    const cloudinary = useCloudinary();

    const getCloudinaryImages = pictureSrcArray =>
        pictureSrcArray.map(pictureSrc => {
            const src = getCloudinaryImageName(pictureSrc.src);
            const thumbnail = cloudinary
                .image(src)
                .resize(fill().width(200))
                .delivery(format(auto()))
                .delivery(quality(qAuto()))
                .toURL();
            const original = cloudinary
                .image(src)
                .delivery(format(auto()))
                .delivery(quality(qAuto()))
                .toURL();

            return { thumbnail, original };
        });

    return (
        <DataFetcher url={`/picture-item/${productId}`}>
            { data => {
                console.log(getCloudinaryImages(data));
                const images = data.length ?
                    getCloudinaryImages(data) :
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