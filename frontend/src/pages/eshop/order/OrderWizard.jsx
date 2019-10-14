import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { withStyles } from '@material-ui/core';

import CustomerForm from './steps/CustomerForm';
import PaymentForm from './steps/PaymentForm';
import OrderConfirmation from './steps/OrderConfirmation';
import WizardButtons from './components/WizardButtons';

const getSteps = () => ['Adresa', 'Platba', 'Potvrzení objednávky'];

const getStepContent = step => {
    switch (step) {
        case 0: return <CustomerForm />;
        case 1: return <PaymentForm />;
        case 2: return <OrderConfirmation />;
        default: throw new Error('Unknown step!');
    }
};

const styles = theme => ({
    root : {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(3),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        }
    }
});

const OrderWizard = ({ classes }) => {

    const [currentStep, setCurrentStep] = useState(0);
    const steps = getSteps();

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
            <Stepper activeStep={currentStep}>
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
            <WizardButtons
                showPrev={currentStep > 0}
                showNext={currentStep < steps.length - 1}
                showFinishOrder={currentStep === steps.length - 1}
                onPrevClick={goToPrev}
                onNextClick={goToNext}
                onFinishOrderClick={handleFinishOrder}
            />
        </Paper>
    );
};

export default withStyles(styles)(OrderWizard);