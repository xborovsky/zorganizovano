import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import WizardButtons from '../components/WizardButtons';

const OrderConfirmation = ({
    onGoToPrevStep,
    onOrderConfirmed,
    onError,
    orderData
}) => {
    // TODO jeste jednou komplet validace na serveru
    console.log(orderData);
    return (
        <form onSubmit={onOrderConfirmed}>
            <Typography variant="h2">Potvrzení objednávky</Typography>
            <Typography variant="h4">Zákazník</Typography>
            <Typography>
                {orderData.customerInfo.firstName} {orderData.customerInfo.lastName}<br />
                {orderData.customerInfo.email}<br />
                {orderData.customerInfo.phoneNo}<br />
            </Typography>
                <br /><br />
            <Typography variant="h4">Fakturační adresa</Typography>
            <Typography>
                {orderData.customerInfo.address.street}<br />
                {orderData.customerInfo.address.township}<br />
                {orderData.customerInfo.address.zipCode}<br />
                {orderData.customerInfo.address.country}<br />
            </Typography>
                <br /><br />
            <Typography variant="h4">Doručovací adresa</Typography>
            <Typography>
                {orderData.shipmentType}
                {orderData.shippingAddress.street}<br />
                {orderData.shippingAddress.township}<br />
                {orderData.shippingAddress.zipCode}<br />
                {orderData.shippingAddress.country}<br />
            </Typography>
            <WizardButtons
                showNext={false}
                showFinishOrder={true}
                onPrevClick={onGoToPrevStep}
            />
        </form>
    );
};

OrderConfirmation.propTypes = {
    onGoToPrevStep : PropTypes.func.isRequired,
    onOrderConfirmed : PropTypes.func.isRequired,
    onError : PropTypes.func.isRequired,
    orderData : PropTypes.shape({}).isRequired // TODO
};

export default OrderConfirmation;