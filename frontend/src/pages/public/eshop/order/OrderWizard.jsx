import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Hidden from '@material-ui/core/Hidden';
import withStyles from '@material-ui/styles/withStyles';
import { useLocation } from 'react-router-dom';

import CustomerForm from './steps/CustomerForm';
import DeliveryForm from './steps/DeliveryForm';
import OrderConfirmation from './steps/order-confirmation/OrderConfirmation';
import Alert from 'components/Alert';
import useDeliveryCountries from './hooks/use-delivery-countries';
import Loader from 'components/Loader';
import OrderContext from './OrderContext';

const getSteps = () => ['Zákazník', 'Doprava a platba', 'Potvrzení objednávky'];

const styles = theme => ({
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
});

const OrderWizard = ({ classes }) => {

    const location = useLocation();
    const [currentStep, setCurrentStep] = useState(0);
    const steps = getSteps();
    const { deliveryCountries, isFetching:isFetchingDeliveryCountries, error:deliveryCountriesFetchError } = useDeliveryCountries();
    const [ customerInfo, setCustomerInfo ] = useState(undefined);
    const [ customerAddress, setCustomerAddress ] = useState(undefined);
    const [ selectedDelivery, setSelectedDelivery ] = useState(undefined);
    const [error, setError] = useState(undefined);

    useEffect(() => {
        deliveryCountriesFetchError && setError('Problém komunikace se serverem.');
    }, [deliveryCountriesFetchError]);

    const getStepContent = step => {
        switch (step) {
            case 0: return (
                <CustomerForm
                    onGoToNextStep={goToNext}
                    onError={error => setError(error)}
                />
            );
            case 1: return (
                <DeliveryForm
                    onGoToNextStep={goToNext}
                    onGoToPrevStep={goToPrev}
                    onError={error => setError(error)}
                />
            );
            case 2: return (
                <OrderConfirmation
                    onGoToPrevStep={goToPrev}
                    onError={error => setError(error)}
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
            { isFetchingDeliveryCountries ? 
                <Loader /> :
                <OrderContext.Provider value={{
                    customerInfo,
                    customerAddress,
                    selectedDelivery,
                    allowedDeliveryCountries : deliveryCountries,
                    shoppingCart : [...location.state.shoppingCart],
                    setCustomerInfo,
                    setCustomerAddress,
                    setSelectedDelivery
                }}>
                    { getStepContent(currentStep) }
                </OrderContext.Provider>
            }
            { (error && currentStep === 2) && <Alert type="error">{error}</Alert> }
        </Paper>
    );
};

export default withStyles(styles)(OrderWizard);