import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { withStyles } from '@material-ui/core';

import CustomerForm from './steps/CustomerForm';
import DeliveryForm from './steps/DeliveryForm';
import OrderConfirmation from './steps/OrderConfirmation';

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

const OrderWizard = ({ classes }) => {

    const [currentStep, setCurrentStep] = useState(0);
    const steps = getSteps();

    const getStepContent = step => {
        switch (step) {
            case 0: return <CustomerForm onGoToNextStep={goToNext} />;
            case 1: return <DeliveryForm />;
            case 2: return <OrderConfirmation />;
            default: throw new Error('Unknown step!');
        }
    };

    const goToNext = () => {
        setCurrentStep(prevStep => prevStep + 1);
    };

    const goToPrev = () => {
        setCurrentStep(prevStep => prevStep - 1);
    };

    const handleFinishOrder = () => {
        console.log('TODO handleFinishOrder');
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
            {getStepContent(currentStep)}
        </Paper>
    );
};

export default withStyles(styles)(OrderWizard);