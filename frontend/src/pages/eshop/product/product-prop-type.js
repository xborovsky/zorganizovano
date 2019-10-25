import PropTypes from 'prop-types';

export const productShape = PropTypes.shape({
    id : PropTypes.number.isRequired,
    name : PropTypes.string.isRequired,
    subName : PropTypes.string,
    descriptionShort : PropTypes.string.isRequired,
    price : PropTypes.number.isRequired,
    discountPrice : PropTypes.number,
    stockQuantity : PropTypes.number.isRequired
});

export const productDetailShape = PropTypes.shape({
    id : PropTypes.number.isRequired,
    name : PropTypes.string.isRequired,
    subName : PropTypes.string.isRequired,
    description : PropTypes.string.isRequired,
    price : PropTypes.number.isRequired,
    discountPrice : PropTypes.number,
    stockQuantity : PropTypes.number.isRequired,
    dimensions : PropTypes.string,
    shippingDimensions : PropTypes.string,
    weightGrams : PropTypes.number
});