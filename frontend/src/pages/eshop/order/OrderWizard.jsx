import React, { useState, useContext } from 'react';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { withStyles } from '@material-ui/core';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import CustomerForm from './steps/CustomerForm';
import DeliveryForm from './steps/DeliveryForm';
import OrderConfirmation from './steps/order-confirmation/OrderConfirmation';
import ShoppingCartContext from '../shopping-cart/state-management/ShoppingCartContext';
import Alert from 'components/Alert';
import { EMPTY_SHOPPING_CART } from '../shopping-cart/state-management/ShoppingCartActions';

const getSteps = () => ['Zákazník', 'Doprava', 'Potvrzení objednávky'];

const styles = theme => ({
    root : {
        margin : '1rem 10vw',
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        paddingLeft: theme.spacing(8),
        paddingRight: theme.spacing(8)
    },
    stepper : {
        marginBottom : '3rem'
    }
});

const defaultOrderData = {
    customerInfo : undefined,
    shoppingCart : undefined,
    shippingAddress : undefined
};

const OrderWizard = ({ classes }) => {

    const { state, dispatch } = useContext(ShoppingCartContext);
    const history = useHistory();
    const [currentStep, setCurrentStep] = useState(0);
    const steps = getSteps();
    const [orderData, setOrderData] = useState({...defaultOrderData, shoppingCart : state});
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
                    initialFormData={orderData.shippingAddress}
                    onGoToNextStep={shippingAddress => {
                        setOrderData({...orderData, ...shippingAddress});
                        goToNext();
                    }}
                    onGoToPrevStep={goToPrev}
                    onError={error => setError(error)}
                />
            );
            case 2: return (
                <OrderConfirmation
                    onOrderConfirmed={handleFinishOrder}
                    onGoToPrevStep={goToPrev}
                    onError={error => setError(error)}
                    orderData={orderData}
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

    const handleFinishOrder = event => {
        event.preventDefault();
        const serverDataShoppingCart = orderData.shoppingCart.map(item => { return {itemId : item.id, quantity : item.quantity} });
        axios.post(
            '/order/confirm', {
            ...orderData,
            shoppingCart : {
                items : serverDataShoppingCart
            }
         }).then(res => {
            dispatch({ type : EMPTY_SHOPPING_CART });
            history.push({ pathname : '/eshop/order-created', state : { order : res.data } });
         })
         .catch(err => console.error(err));
    };

    return (
        <Paper className={classes.root}>
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
            { error && <Alert type="error">{error}</Alert> }
            {getStepContent(currentStep)}
        </Paper>
    );
};

export default withStyles(styles)(OrderWizard);