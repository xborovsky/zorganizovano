import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/styles/withStyles';

import WizardButtons from '../../components/WizardButtons';
import ShoppingCart from './components/ShoppingCart';
import CustomerInfo from './components/CustomerInfo';
import Transport from './components/Transport';
import withLoading from 'components/hoc/WithLoading';
import Section from './components/Section';

const styles = theme => ({
    header : {
        marginBottom : '2rem',
        fontSize : '2.3rem'
    },
    padLeft : {
        marginLeft : '2rem'
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
    data, // ajax
    classes
}) => {
    // TODO jeste jednou komplet validace na serveru
    const selectedDelivery = data.find(deliveryOption => deliveryOption.name.toLowerCase() === orderData.shipmentType.toLowerCase());

    return (
        <form onSubmit={onOrderConfirmed}>
            <Typography variant="h1" className={classes.header}>Potvrzení objednávky</Typography>
            <div className={classes.padLeft}>
                <Section title='Objednáváte si tyto položky'>
                    <ShoppingCart items={orderData.shoppingCart} />
                </Section>
                <Section title='Zkontrolujte, prosím, Vaše kontaktní údaje'>
                    <CustomerInfo data={orderData.customerInfo} />
                </Section>
                <Section title='Pro doručení jste zvolili tuto službu'>
                    <Transport
                        title={`${selectedDelivery.readableName} ${selectedDelivery.price},-`}
                        additionalInfo={orderData.shippingAddress && {
                            shipmentType : orderData.shipmentType,
                            shippingAddress : orderData.shippingAddress
                        }}
                    />
                </Section>
                <Section className={classes.totalPrice}>
                    Celková cena: {
                        orderData.shoppingCart.reduce((a, b) => a + (b.quantity * b.price), 0) +
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
};

OrderConfirmation.propTypes = {
    onGoToPrevStep : PropTypes.func.isRequired,
    onOrderConfirmed : PropTypes.func.isRequired,
    onError : PropTypes.func.isRequired,
    orderData : PropTypes.shape({}).isRequired // TODO
};

const DeliveryFormWithLoading = withLoading('/order/delivery-options')(OrderConfirmation);

export default withStyles(styles)(DeliveryFormWithLoading);