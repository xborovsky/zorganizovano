import PropTypes from 'prop-types';

export const todoItemListItemPropTypes = PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    descriptionShort: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
    updated: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired
});

export const todoItemListRowPropTypes = PropTypes.arrayOf(todoItemListItemPropTypes);

export const editItemPropTypes = PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired
});

export const todoItemDetailPropTypes = PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
    updated: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired
});