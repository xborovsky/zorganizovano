import React from 'react';
import PropTypes from 'prop-types';

const PaymentQR = ({ paymentData }) => (
    <img src={`https://api.paylibo.com/paylibo/generator/czech/image?accountNumber=${paymentData.accountNumber}&bankCode=${paymentData.bankCode}&vs=${paymentData.variableSymbol}&amount=${paymentData.amount}&currency=${paymentData.currency}&message=${paymentData.message}`}
         alt="QR kód"
         title="QR kód pro platbu"
    />
);

PaymentQR.propTypes = {
    paymentData : PropTypes.shape({
        accountNumber : PropTypes.string.isRequired,
        bankCode : PropTypes.string.isRequired,
        variableSymbol : PropTypes.string.isRequired,
        amount : PropTypes.number.isRequired,
        currency : PropTypes.number.isRequired,
        message : PropTypes.string.isRequired
    }).isRequired
};

export default PaymentQR;