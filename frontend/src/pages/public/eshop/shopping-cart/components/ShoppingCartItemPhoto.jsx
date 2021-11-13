import React from 'react';
import PropTypes from 'prop-types';

import useFetch from 'hooks/use-fetch';
import Loader from 'components/Loader';
import CdnImage from 'components/CdnImage';

const ShoppingCartItemPhoto = ({ itemId, className }) => {
    const { data, isLoading, error } = useFetch(`/picture-item/${itemId}/shopping-cart-thumbnail`);

    if (isLoading) {
        return <Loader />;
    }

    if (!data) {
        return null;
    }

    return (
        <CdnImage 
            name={data}
            alt={data}
            className={className}
            height={40}
        />
    );
};

ShoppingCartItemPhoto.propTypes = {
    itemId : PropTypes.number.isRequired
};

export default ShoppingCartItemPhoto;