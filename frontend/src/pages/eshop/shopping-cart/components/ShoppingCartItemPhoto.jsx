import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';

import DataFetcher from 'components/DataFetcher';

const ShoppingCartItemPhoto = ({ itemId, className }) => (
    <DataFetcher url={`/picture-item/${itemId}/shopping-cart-thumbnail`}>
        { data => (
            <Avatar src={`/img/products/${data}`} className={className} />
        )}
    </DataFetcher>
);

ShoppingCartItemPhoto.propTypes = {
    itemId : PropTypes.number.isRequired
};

export default ShoppingCartItemPhoto;