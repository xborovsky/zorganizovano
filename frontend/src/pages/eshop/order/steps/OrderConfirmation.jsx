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
            <Typography variant="h4">Objednáváte si tyto položky</Typography>
            TODO - shopping cart

            <Typography variant="h4">Zkontrolujte, prosím, Vaše kontaktní údaje</Typography>
            <Typography>
                {orderData.customerInfo.firstName} {orderData.customerInfo.lastName}<br />
                {orderData.customerInfo.email}<br />
                {orderData.customerInfo.phoneNo}<br />
                {orderData.customerInfo.address.street}<br />
                {orderData.customerInfo.address.township}<br />
                {orderData.customerInfo.address.zipCode}<br />
                {orderData.customerInfo.address.country}<br />
            </Typography>
            <br /><br />

            <Typography variant="h4">Pro doručení jste zvolili tuto službu</Typography>
            {
                orderData.shipmentType === 'CESKA_POSTA' &&
                    <Typography variant="h5">
                        Česká pošta 89,-                
                    </Typography>
            }
            {
                orderData.shipmentType === 'ZASILKOVNA' &&
                    <>
                        <Typography variant="h5">
                            Zásilkovna 89,-                
                        </Typography>
                        <Typography>
                            {orderData.shipmentType}
                            {orderData.shippingAddress.street}<br />
                            {orderData.shippingAddress.township}<br />
                            {orderData.shippingAddress.zipCode}<br />
                            {orderData.shippingAddress.country}<br />
                        </Typography>
                    </>
            }
            <br /><br />
            <Typography variant="h3">
                Celková cena: XXX,-
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