import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/styles/withStyles';

import WizardButtons from '../../components/WizardButtons';
import ShoppingCart from './components/ShoppingCart';
import CustomerInfo from './components/CustomerInfo';
import Section from './components/Section';
import DataFetcher from 'components/DataFetcher';

const styles = theme => ({
    header : {
        marginBottom : '2rem',
        fontSize : '2.3rem'
    },
    totalPrice : {
        textAlign : 'right',
        fontWeight : 'bold',
        fontSize : '1.8rem',
        marginTop : '2rem'
    }
});

const OrderConfirmation = ({
    onGoToPrevStep,
    onOrderConfirmed,
    onError,
    orderData,
    classes
}) => (
    <DataFetcher url='/order/delivery-options'>
        { data => {
            // TODO jeste jednou komplet validace na serveru
            const selectedDelivery = data.find(deliveryOption => deliveryOption.name.toLowerCase() === orderData.shipmentType.toLowerCase());
            return (
                <form onSubmit={onOrderConfirmed}>
                    <div>
                        <Section title='Objednáváte si tyto položky'>
                            <ShoppingCart
                                items={orderData.shoppingCart}
                                selectedDelivery={selectedDelivery} />
                        </Section>
                        <Section title='Zkontrolujte, prosím, Vaše kontaktní údaje a doručovací adresu'>
                            <CustomerInfo
                                data={orderData.customerInfo}
                                shipment={{
                                    shipmentType : orderData.shipmentType,
                                    shippingAddress : orderData.shippingAddress
                                }} />
                        </Section>
                        <Section className={classes.totalPrice}>
                            Celková cena: {
                                orderData.shoppingCart.reduce((a, b) => a + (b.quantity * b.priceSingle), 0) +
                                selectedDelivery.price
                            },- Kč
                        </Section>
                    </div>
                    <WizardButtons
                        prev={{
                            show : true,
                            onClick : onGoToPrevStep
                        }}
                        next={{
                            finishOrder : true
                        }}
                        showNext={false}
                        showFinishOrder={true}
                        onPrevClick={onGoToPrevStep}
                    />
                </form>
            );
        } }
    </DataFetcher>
);

OrderConfirmation.propTypes = {
    onGoToPrevStep : PropTypes.func.isRequired,
    onOrderConfirmed : PropTypes.func.isRequired,
    onError : PropTypes.func.isRequired,
    orderData : PropTypes.shape({}).isRequired // TODO
};

export default withStyles(styles)(OrderConfirmation);