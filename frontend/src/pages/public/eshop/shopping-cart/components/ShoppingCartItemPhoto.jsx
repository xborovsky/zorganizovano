import React from 'react';
import PropTypes from 'prop-types';
import { AdvancedImage, responsive, lazyload, placeholder } from '@cloudinary/react';
import { pad } from "@cloudinary/base/actions/resize";
import { auto } from "@cloudinary/base/qualifiers/format";
import { format, quality } from "@cloudinary/base/actions/delivery";
import { auto as qAuto } from "@cloudinary/base/qualifiers/quality";
import {max} from "@cloudinary/base/actions/roundCorners";

import { getCloudinaryImageName } from 'util/img-util';
import useFetch from 'hooks/use-fetch';
import Loader from 'components/Loader';
import useCloudinary from 'hooks/use-cloudinary';

const ShoppingCartItemPhoto = ({ itemId, className }) => {
    const cloudinary = useCloudinary();
    const { data, isLoading, error } = useFetch(`/picture-item/${itemId}/shopping-cart-thumbnail`);
    const image = data && cloudinary
        .image(getCloudinaryImageName(data))
        .resize(pad().height(40).width(40))
        .roundCorners(max())
        .delivery(format(auto()))
        .delivery(quality(qAuto()));
    
    if (isLoading) {
        return <Loader />;
    }

    if (!data || !image) {
        return null;
    }

    return (
        <AdvancedImage 
            cldImg={image} 
            plugins={[lazyload('30px 0px 30px 0px', 0.1), responsive(), placeholder('blur')]}
            width="40"
            className={className}
        />
    );
};

ShoppingCartItemPhoto.propTypes = {
    itemId : PropTypes.number.isRequired
};

export default ShoppingCartItemPhoto;