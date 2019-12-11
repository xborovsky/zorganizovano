import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/styles';

import CustomerForm from './steps/CustomerForm';
import DeliveryForm from './steps/DeliveryForm';
import OrderConfirmation from './steps/OrderConfirmation';
import Alert from '~/components/Alert';

const getSteps = () => ['Zákazník', 'Doprava a platba', 'Potvrzení objednávky'];

// TODO tu by to chcelo skontrolovat ci ma nieco v kosiku a ak nie tak mu zobrazit ze objednavka nejde vytvorit!

const useStyles = makeStyles(theme => ({
    root : {
        margin : '1rem 10vw',
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        paddingLeft: theme.spacing(8),
        paddingRight: theme.spacing(8),
        [theme.breakpoints.down('sm')] : {
            margin : '0 1vw 2vh',
            padding : '10px 20px'
        }
    },
    stepper : {
        marginBottom : '3rem',
        [theme.breakpoints.down('xs')] : {
            marginBottom : '1rem',
        }
    }
}));

const defaultOrderData = {
    customerInfo : undefined,
    shoppingCart : undefined,
    selectedZasilkovna : undefined
};

const OrderWizard = ({ deliveryOptions, shoppingCartItems }) => {
    const classes = useStyles();
    const [currentStep, setCurrentStep] = useState(0);
    const steps = getSteps();
    const [orderData, setOrderData] = useState({...defaultOrderData, shoppingCart : shoppingCartItems ? [...shoppingCartItems] : undefined});
    const [error, setError] = useState(undefined);

    const getStepContent = step => {
        switch (step) {
            case 0: return (
                <CustomerForm
                    initialFormData={orderData.customerInfo}
                    onGoToNextStep={customerInfo => {
                        setOrderData({...orderData, ...customerInfo});
                        goToNext();
                    }}
                    onError={error => setError(error)}
                />
            );
            case 1: return (
                <DeliveryForm
                    initialFormData={{
                        deliveryOption : orderData.shipmentType,
                        selectedZasilkovna : orderData.selectedZasilkovna,
                        paymentType : 'bankTransfer'
                    }}
                    deliveryOptions={deliveryOptions}
                    onGoToNextStep={shipping => {
                        setOrderData({...orderData, ...shipping});
                        goToNext();
                    }}
                    onGoToPrevStep={goToPrev}
                    onError={error => setError(error)}
                />
            );
            case 2: return (
                <OrderConfirmation
                    onGoToPrevStep={goToPrev}
                    onError={error => setError(error)}
                    orderData={orderData}
                    deliveryOptions={deliveryOptions}
                />
            );
            default: throw new Error('Unknown step!');
        }
    };

    const goToNext = () => {
        setCurrentStep(prevStep => prevStep + 1);
    };

    const goToPrev = () => {
        setCurrentStep(prevStep => prevStep - 1);
    };

    return (
        <Paper className={classes.root}>
            <Hidden xsDown>
                <Stepper activeStep={currentStep} className={classes.stepper}>
                    {
                        steps.map(label => {
                            return (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            );
                        })
                    }
                </Stepper>
            </Hidden>
            <Hidden smUp>
                <Stepper activeStep={currentStep} className={classes.stepper} orientation="vertical">
                    {
                        steps.map(label => {
                            return (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            );
                        })
                    }
                </Stepper>
            </Hidden>
            { error && <Alert type="error">{error}</Alert> }
            {getStepContent(currentStep)}
            { error && <Alert type="error">{error}</Alert> }
        </Paper>
    );
};

OrderWizard.getInitialProps = async (ctx) => {
    const { res } = ctx;
    const [res1, res2] = await Promise.all([
        fetch(`${process.env.API_URL}/order/delivery-options`),
        fetch(`${process.env.API_URL}/shopping-cart/items`)
    ]);

    const deliveryOptions = await res1.json();
    const shoppingCartItems = await res2.json();

    if (!shoppingCartItems || !shoppingCartItems.length) {
        res.writeHead(302, {
            Location: '/public/shopping-cart'
        })
        res.end();
    }

// TODO error handling???
    return {
        deliveryOptions : deliveryOptions || [],
        shoppingCartItems
    };
};

export default OrderWizard;