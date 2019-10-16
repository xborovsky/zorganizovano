import PropTypes from 'prop-types';

export const productShape = PropTypes.shape({
    id : PropTypes.number.isRequired,
    name : PropTypes.string.isRequired,
    description : PropTypes.string.isRequired,
    price : PropTypes.number.isRequired
});

export const productDetailShape = PropTypes.shape({
    id : PropTypes.number.isRequired,
    name : PropTypes.string.isRequired,
    description : PropTypes.string.isRequired,
    price : PropTypes.number.isRequired,
    dimensionX : PropTypes.number.isRequired,
    dimensionY : PropTypes.number.isRequired,
    dimensionZ : PropTypes.number.isRequired
});