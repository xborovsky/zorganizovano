import PropTypes from 'prop-types';

export const productShape = PropTypes.shape({
    id : PropTypes.number.isRequired,
    name : PropTypes.string.isRequired,
    subName : PropTypes.string,
    descriptionShort : PropTypes.string.isRequired,
    price : PropTypes.number.isRequired,
    discountPrice : PropTypes.number,
    stockQuantity : PropTypes.number.isRequired,
    thumbnailLocation : PropTypes.string
});

export const productDetailShape = PropTypes.shape({
    id : PropTypes.number.isRequired,
    name : PropTypes.string.isRequired,
    subName : PropTypes.string.isRequired,
    description : PropTypes.string.isRequired,
    price : PropTypes.number.isRequired,
    discountPrice : PropTypes.number,
    stockQuantity : PropTypes.number.isRequired,
    details : PropTypes.arrayOf(
        PropTypes.shape({
            id : PropTypes.number.isRequired,
            key : PropTypes.string.isRequired,
            value : PropTypes.string.isRequired,
            priorityOrder : PropTypes.number.isRequired
        })
    ).isRequired
});