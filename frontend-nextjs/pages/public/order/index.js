import React, { useState, useContext, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/styles';
import { useRouter }  from 'next/router';

import CustomerForm from './steps/CustomerForm';
import DeliveryForm from './steps/DeliveryForm';
import OrderConfirmation from './steps/OrderConfirmation';
import Alert from '~/components/Alert';
import ShoppingCartContext from '~/components/global-context/ShoppingCartContext';
import { Router } from 'next/router';

const getSteps = () => ['Zákazník', 'Doprava a platba', 'Potvrzení objednávky'];

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

const OrderWizard = ({ deliveryOptions }) => {
    const classes = useStyles();
    const [currentStep, setCurrentStep] = useState(0);
    const steps = getSteps();
    const { state } = useContext(ShoppingCartContext);
    const [orderData, setOrderData] = useState({...defaultOrderData, shoppingCart : state});
    const [error, setError] = useState(undefined);
    const router = useRouter();

    console.log(orderData);

    useEffect(() => {
        if (!orderData.shoppingCart || !orderData.shoppingCart.length) {
            router.push('/public/shopping-cart');
        }
    }, [orderData]);

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

OrderWizard.getInitialProps = async () => {
    const res = await fetch(`${process.env.API_URL}/order/delivery-options`);
    const deliveryOptions = await res.json();

// TODO error handling???
    return {
        deliveryOptions : deliveryOptions || []
    };
};

export default OrderWizard;