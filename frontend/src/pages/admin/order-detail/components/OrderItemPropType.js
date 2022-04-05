import PropTypes from 'prop-types';

export const OrderItemPropType = PropTypes.shape({
    id : PropTypes.number.isRequired,
    price : PropTypes.number.isRequired,
    name : PropTypes.string.isRequired,
    subName : PropTypes.string
});