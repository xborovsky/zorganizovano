import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const ShoppingCartButton = ({ onClick }) => (
    <Button variant="contained" color="primary" size="large" onClick={onClick} title="Vložit do košíku">
        <FontAwesomeIcon icon={faShoppingCart} />
    </Button>
);

ShoppingCartButton.propTypes = {
    onClick : PropTypes.func.isRequired
};

export default ShoppingCartButton;