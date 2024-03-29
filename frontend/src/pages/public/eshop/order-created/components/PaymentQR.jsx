import React from 'react';

import { paymentPropTypes } from './payment.prop-types';

const PaymentQR = ({ paymentData }) => (
    <img src={`https://api.paylibo.com/paylibo/generator/czech/image?accountNumber=${paymentData.accountNumber}&bankCode=${paymentData.bankCode}&vs=${paymentData.variableSymbol}&amount=${paymentData.amount}&currency=${paymentData.currency}&message=${encodeURI('zorganizovano.cz')}&date=${paymentData.dateFormattedForQRCode}&size=200`}
         alt="QR kód"
         title="QR kód pro platbu"
    />
);

PaymentQR.propTypes = {
    paymentPropTypes
};

export default PaymentQR;