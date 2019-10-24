import PropTypes from 'prop-types';

export const paymentPropTypes = PropTypes.shape({
    accountNumber : PropTypes.string.isRequired,
    bankCode : PropTypes.string.isRequired,
    variableSymbol : PropTypes.string.isRequired,
    amount : PropTypes.number.isRequired,
    currency : PropTypes.number.isRequired,
    message : PropTypes.string.isRequired,
    date : PropTypes.string.isRequired
}).isRequired;