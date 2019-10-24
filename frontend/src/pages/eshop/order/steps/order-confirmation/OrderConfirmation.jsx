import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/styles/withStyles';

import WizardButtons from '../../components/WizardButtons';
import ShoppingCart from './components/ShoppingCart';
import CustomerInfo from './components/CustomerInfo';
import Transport from './components/Transport';

const styles = theme => ({
    header : {
        marginBottom : '2rem',
        fontSize : '2.3rem'
    },
    subHeader : {
        marginTop : '2rem',
        marginBottom : '1.5rem',
        fontSize : '1.8rem'
    },
    padLeft : {
        marginLeft : '2rem'
    },
    totalPrice : {
        textAlign : 'right',
        fontWeight : 'bold'
    }
});

const OrderConfirmation = ({
    onGoToPrevStep,
    onOrderConfirmed,
    onError,
    orderData,
    classes
}) => {
    // TODO jeste jednou komplet validace na serveru
    console.log(orderData);

    const createSection = (title, data) => (
        <>
            <Typography variant="h2" className={classes.subHeader}>{ title }</Typography>
            <div className={classes.padLeft}>{ data }</div>
        </>
    );

    return (
        <form onSubmit={onOrderConfirmed}>
            <Typography variant="h1" className={classes.header}>Potvrzení objednávky</Typography>
            <div className={classes.padLeft}>
                {
                    createSection(
                        'Objednáváte si tyto položky',
                        <ShoppingCart items={orderData.shoppingCart} />
                    )
                }
                {
                    createSection(
                        'Zkontrolujte, prosím, Vaše kontaktní údaje',
                        <CustomerInfo data={orderData.customerInfo} />
                    )
                }
                {
                    createSection(
                        'Pro doručení jste zvolili tuto službu',
                        <>
                            {
                                orderData.shipmentType === 'CESKA_POSTA' &&
                                    <Transport title='Česká pošta 89,-' /> // TODO natahnout ceny z backendu
                            }
                            {
                                orderData.shipmentType === 'ZASILKOVNA' &&
                                    <Transport
                                        title='Zásilkovna 70,-'
                                        additionalInfo={{
                                            shipmentType : orderData.shipmentType,
                                            shippingAddress : orderData.shippingAddress
                                        }}
                                    />
                            }
                        </>
                    )
                }

                <Typography variant="h2" className={[classes.subHeader, classes.totalPrice].join(' ')}>
                    Celková cena: {
                        orderData.shoppingCart.reduce((a, b) => a + (b.quantity * b.price), 0) +
                        (orderData.shipmentType === 'CESKA_POSTA' ? 89 : 70) // TODO natahnout z backendu
                        },- Kč
                </Typography>
            </div>
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

export default withStyles(styles)(OrderConfirmation);