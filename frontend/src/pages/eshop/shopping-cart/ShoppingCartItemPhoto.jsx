import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';

import DataFetcher from 'components/DataFetcher';

const ShoppingCartItemPhoto = ({ itemId }) => (
    <DataFetcher url={`/picture-item/${itemId}/shopping-cart-thumbnail`}>
        { data => (
            <Avatar src={`/img/products/${data}`} />
        )}
    </DataFetcher>
);

ShoppingCartItemPhoto.propTypes = {
    itemId : PropTypes.number.isRequired
};

export default ShoppingCartItemPhoto;